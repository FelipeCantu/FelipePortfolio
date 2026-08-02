import Stripe from 'stripe'

function unauthorized() {
  return Response.json({ error: 'Unauthorized' }, { status: 401 })
}

export async function GET(request: Request) {
  const adminKey = request.headers.get('x-admin-key')
  if (!adminKey || adminKey !== process.env.ADMIN_SECRET) return unauthorized()

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  try {
    const balance = await stripe.balance.retrieve()
    const available = balance.available.reduce((sum, b) => sum + b.amount, 0)
    const pending = balance.pending.reduce((sum, b) => sum + b.amount, 0)
    return Response.json({
      available: available / 100,
      pending: pending / 100,
      currency: balance.available[0]?.currency ?? 'usd',
    })
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 500 })
  }
}
