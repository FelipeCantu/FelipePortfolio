import Stripe from 'stripe'
import { isAdmin, unauthorized, safeBaseUrl } from '@/lib/adminAuth'

export async function POST(request: Request) {
  if (!isAdmin(request)) return unauthorized()

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const { accountId, appUrl } = await request.json()

  if (!accountId) return Response.json({ error: 'accountId is required' }, { status: 400 })

  try {
    const baseUrl = safeBaseUrl(appUrl)
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${baseUrl}/admin?refresh=${accountId}`,
      return_url: `${baseUrl}/admin?connected=${accountId}`,
      type: 'account_onboarding',
    })
    return Response.json({ onboardingUrl: accountLink.url })
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 500 })
  }
}
