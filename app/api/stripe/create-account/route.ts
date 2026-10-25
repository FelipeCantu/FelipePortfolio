import Stripe from 'stripe'
import { isAdmin, unauthorized, safeBaseUrl } from '@/lib/adminAuth'

export async function POST(request: Request) {
  if (!isAdmin(request)) return unauthorized()

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const { clientName, clientEmail, appUrl } = await request.json()

  try {
    const account = await stripe.accounts.create({
      type: 'express',
      email: clientEmail ?? undefined,
      business_profile: { name: clientName ?? undefined },
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
    return Response.json({ error: (err as Error).message }, { status: 500 })
  }
}
