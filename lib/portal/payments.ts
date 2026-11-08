import 'server-only'
import Stripe from 'stripe'
import { markInvoicePaid } from './db'
import { notifyAdmin } from './notify'
import type { Invoice } from './types'
import { money } from './format'
import { invoiceTotal } from './db'

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
  }
  return { status: 200, message: 'ok' }
}
