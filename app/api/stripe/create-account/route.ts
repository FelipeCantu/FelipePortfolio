import Stripe from 'stripe'
import { requireAdmin, serverError, safeBaseUrl } from '@/lib/adminAuth'

export async function POST(request: Request) {
  const denied = requireAdmin(request)
  if (denied) return denied

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const body = await request.json().catch(() => null)
  if (!body) return Response.json({ error: 'Invalid JSON body' }, { status: 400 })

  const clientName = typeof body.clientName === 'string' ? body.clientName.trim().slice(0, 100) : ''
  const clientEmail = typeof body.clientEmail === 'string' ? body.clientEmail.trim() : ''
  const appUrl = body.appUrl
  if (clientEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) {
    return Response.json({ error: 'clientEmail is not a valid email address' }, { status: 400 })
  }

  try {
    const account = await stripe.accounts.create({
      type: 'express',
      email: clientEmail || undefined,
      business_profile: { name: clientName || undefined },
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    })

    const baseUrl = safeBaseUrl(appUrl)
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${baseUrl}/admin?refresh=${account.id}`,
      return_url: `${baseUrl}/admin?connected=${account.id}`,
      type: 'account_onboarding',
    })

    return Response.json({ accountId: account.id, onboardingUrl: accountLink.url })
  } catch (err) {
    return serverError('create-account', err)
  }
}
