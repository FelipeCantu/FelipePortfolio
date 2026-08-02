import Stripe from 'stripe'

function unauthorized() {
  return Response.json({ error: 'Unauthorized' }, { status: 401 })
}

export async function GET(request: Request) {
  const adminKey = request.headers.get('x-admin-key')
  if (!adminKey || adminKey !== process.env.ADMIN_SECRET) return unauthorized()

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  try {
    const accounts = await stripe.accounts.list({ limit: 100 })
    const enriched = accounts.data.map((account) => ({
      id: account.id,
      name: account.business_profile?.name ?? account.settings?.dashboard?.display_name ?? null,
      email: account.email,
      chargesEnabled: account.charges_enabled,
      payoutsEnabled: account.payouts_enabled,
      detailsSubmitted: account.details_submitted,
      created: account.created,
      country: account.country,
    }))
    return Response.json({ accounts: enriched })
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 500 })
  }
}
