import Stripe from 'stripe'

function unauthorized() {
  return Response.json({ error: 'Unauthorized' }, { status: 401 })
}

export async function POST(request: Request) {
  const adminKey = request.headers.get('x-admin-key')
  if (!adminKey || adminKey !== process.env.ADMIN_SECRET) return unauthorized()

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

    const baseUrl = appUrl ?? 'https://felipecantujr.com'
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
