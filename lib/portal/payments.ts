import 'server-only'
import Stripe from 'stripe'
import { getClient, getProject, invoiceTotal, logActivity, markInvoicePaid, saveProject, setStripeCustomer } from './db'
import { notifyAdmin } from './notify'
import type { Client, Invoice, Project } from './types'
import { money } from './format'

export const paymentsEnabled = () => Boolean(process.env.STRIPE_SECRET_KEY)

function stripe() {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error('Online payments are not set up yet (STRIPE_SECRET_KEY missing).')
  return new Stripe(process.env.STRIPE_SECRET_KEY)
}

export async function createCheckoutUrl(invoice: Invoice, email: string, origin: string) {
  const session = await stripe().checkout.sessions.create({
    mode: 'payment',
    customer_email: email,
    client_reference_id: invoice.id,
    metadata: { portalInvoiceId: invoice.id, invoiceNumber: invoice.number },
    payment_intent_data: {
      description: `Invoice ${invoice.number} — ${invoice.title}`,
      metadata: { portalInvoiceId: invoice.id },
    },
    line_items: invoice.items.map((item) => {
      // Stripe needs whole quantities; fold fractional ones (2.5 hours) into one line
      const whole = Number.isInteger(item.quantity) && item.quantity > 0
      return {
        quantity: whole ? item.quantity : 1,
        price_data: {
          currency: 'usd',
          unit_amount: whole ? item.unitAmount : Math.round(item.unitAmount * item.quantity),
          product_data: { name: (whole ? item.description : `${item.description} (${item.quantity} × ${money(item.unitAmount)})`).slice(0, 250) || invoice.title },
        },
      }
    }),
    success_url: `${origin}/portal/invoices/${invoice.id}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/portal/invoices/${invoice.id}`,
  })
  if (session.amount_total != null && session.amount_total !== invoiceTotal(invoice)) {
    console.warn('[portal] checkout total differs from invoice total', invoice.id, session.amount_total)
  }
  return session.url!
}

async function settle(invoiceId: string, sessionId: string) {
  const changed = await markInvoicePaid(invoiceId, sessionId)
  if (changed) {
    await notifyAdmin(
      `Payment received: ${changed.number}`,
      `Invoice ${changed.number} (${changed.title}) for ${money(invoiceTotal(changed))} was paid online.`
    )
  }
}

/** Verifies a Checkout session on the client's return from Stripe. */
export async function confirmCheckout(invoiceId: string, sessionId: string) {
  if (!paymentsEnabled()) return false
  try {
    const session = await stripe().checkout.sessions.retrieve(sessionId)
    if (session.payment_status === 'paid' && session.metadata?.portalInvoiceId === invoiceId) {
      await settle(invoiceId, session.id)
      return true
    }
  } catch (err) {
    console.error('[portal] confirm checkout failed', err)
  }
  return false
}

/** Webhook path: covers clients who close the tab before the redirect. */
export async function handleStripeWebhook(rawBody: string, signature: string | null) {
  const secret = process.env.STRIPE_PORTAL_WEBHOOK_SECRET
  if (!secret || !signature) return { status: 400, message: 'Webhook not configured' }
  let event: Stripe.Event
  try {
    event = stripe().webhooks.constructEvent(rawBody, signature, secret)
  } catch {
    return { status: 400, message: 'Bad signature' }
  }
  if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
    const session = event.data.object as Stripe.Checkout.Session
    const invoiceId = session.metadata?.portalInvoiceId
    if (invoiceId && session.payment_status === 'paid') await settle(invoiceId, session.id)
    const autopayProject = session.metadata?.portalAutopayProjectId
    if (session.mode === 'setup' && autopayProject) await confirmAutopaySetup(autopayProject, session.id)
  }
  return { status: 200, message: 'ok' }
}

/* ───────────── care plan auto-pay (saved card, charged monthly) ───────────── */

/** Stripe-hosted page where the client saves a card for their monthly care plan. Nothing is charged here. */
export async function createAutopaySetupUrl(viewer: Client, project: Project, origin: string) {
  const owner = await getClient(viewer.id)
  if (!owner) throw new Error('Client not found')
  let customer = owner.stripeCustomerId
  if (!customer) {
    const created = await stripe().customers.create({
      email: owner.email,
      name: owner.company ? `${owner.name} (${owner.company})` : owner.name,
      metadata: { portalClientId: owner.id },
    })
    customer = created.id
    await setStripeCustomer(owner.id, customer)
  }
  const back = `${origin}/portal/projects/${project.id}`
  const session = await stripe().checkout.sessions.create({
    mode: 'setup',
    customer,
    payment_method_types: ['card'],
    metadata: { portalAutopayProjectId: project.id, enabledBy: viewer.name.slice(0, 100) },
    success_url: `${back}?autopay={CHECKOUT_SESSION_ID}#care`,
    cancel_url: `${back}#care`,
  })
  return session.url!
}

/**
 * Stores the saved card on the care plan once Stripe confirms it. Safe to call
 * from both the return redirect and the webhook. Returns true when auto-pay is on.
 */
export async function confirmAutopaySetup(projectId: string, sessionId: string) {
  if (!paymentsEnabled()) return false
  try {
    const session = await stripe().checkout.sessions.retrieve(sessionId, { expand: ['setup_intent.payment_method'] })
    if (session.mode !== 'setup' || session.status !== 'complete' || session.metadata?.portalAutopayProjectId !== projectId) return false
    const intent = session.setup_intent
    const pm = intent && typeof intent !== 'string' ? intent.payment_method : null
    if (!pm || typeof pm === 'string') return false
    const project = await getProject(projectId)
    const owner = project ? await getClient(project.clientId) : null
    // The card must belong to this client's Stripe customer
    if (!project?.carePlan || !owner?.stripeCustomerId || session.customer !== owner.stripeCustomerId) return false
    if (project.carePlan.autopay?.paymentMethodId === pm.id) return true
    const enabledBy = session.metadata?.enabledBy || owner.name
    await saveProject({
      ...project,
      carePlan: {
        ...project.carePlan,
        autopay: { paymentMethodId: pm.id, brand: pm.card?.brand ?? 'card', last4: pm.card?.last4 ?? '', enabledAt: new Date().toISOString(), enabledBy },
        autopayError: undefined,
      },
    })
    await logActivity({ clientId: project.clientId, projectId, actor: 'client', text: `${enabledBy} turned on auto-pay for the care plan`, href: `/portal/admin/projects/${projectId}#care` })
    await notifyAdmin(`Auto-pay turned on: ${project.name}`, `${enabledBy} saved a card (${pm.card?.brand ?? 'card'} ending ${pm.card?.last4 ?? '????'}) for the ${project.name} care plan. Monthly invoices will now be charged automatically.`)
    return true
  } catch (err) {
    console.error('[portal] confirm auto-pay failed', err)
    return false
  }
}

/** Turns auto-pay off and removes the saved card from Stripe. */
export async function disableAutopay(projectId: string) {
  const project = await getProject(projectId)
  const autopay = project?.carePlan?.autopay
  if (!project?.carePlan || !autopay) return false
  await saveProject({ ...project, carePlan: { ...project.carePlan, autopay: undefined, autopayError: undefined } })
  if (paymentsEnabled()) await stripe().paymentMethods.detach(autopay.paymentMethodId).catch((err) => console.error('[portal] detach card failed', err))
  return true
}

/**
 * Charges a care-plan invoice to the saved card. The idempotency key means a
 * retry can never charge the same invoice twice.
 */
export async function chargeSavedCard(inv: Invoice, project: Project): Promise<{ ok: boolean; reason?: string }> {
  const autopay = project.carePlan?.autopay
  const owner = await getClient(project.clientId)
  if (!autopay || !owner?.stripeCustomerId || !paymentsEnabled()) return { ok: false, reason: 'No saved card.' }
  const amount = invoiceTotal(inv)
  if (amount < 50) return { ok: false, reason: 'Amount is below the card minimum.' }
  try {
    const intent = await stripe().paymentIntents.create(
      {
        amount,
        currency: 'usd',
        customer: owner.stripeCustomerId,
        payment_method: autopay.paymentMethodId,
        off_session: true,
        confirm: true,
        description: `Invoice ${inv.number} — ${inv.title}`,
        metadata: { portalInvoiceId: inv.id, invoiceNumber: inv.number, autopay: '1' },
      },
      { idempotencyKey: `care-${inv.id}` }
    )
    if (intent.status !== 'succeeded') return { ok: false, reason: `Payment is ${intent.status.replace(/_/g, ' ')}.` }
    await markInvoicePaid(inv.id, intent.id)
    return { ok: true }
  } catch (err) {
    const reason = err instanceof Stripe.errors.StripeCardError ? err.message : 'The card could not be charged.'
    console.error('[portal] auto-pay charge failed', inv.number, err)
    return { ok: false, reason }
  }
}
