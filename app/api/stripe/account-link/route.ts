import Stripe from 'stripe'
import { requireAdmin, serverError, safeBaseUrl, isStripeAccountId } from '@/lib/adminAuth'

export async function POST(request: Request) {
  const denied = requireAdmin(request)
  if (denied) return denied

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const body = await request.json().catch(() => null)
  const accountId = body?.accountId
  const appUrl = body?.appUrl

  if (!isStripeAccountId(accountId)) {
    return Response.json({ error: 'A valid accountId is required' }, { status: 400 })
  }

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
    return serverError('account-link', err)
  }
}
