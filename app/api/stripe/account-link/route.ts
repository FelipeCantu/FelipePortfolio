import Stripe from 'stripe'

function unauthorized() {
  return Response.json({ error: 'Unauthorized' }, { status: 401 })
}

export async function POST(request: Request) {
  const adminKey = request.headers.get('x-admin-key')
  if (!adminKey || adminKey !== process.env.ADMIN_SECRET) return unauthorized()

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const { accountId, appUrl } = await request.json()

  if (!accountId) return Response.json({ error: 'accountId is required' }, { status: 400 })

  try {
    const baseUrl = appUrl ?? 'https://felipecantujr.com'
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
