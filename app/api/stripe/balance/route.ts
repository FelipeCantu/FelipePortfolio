import Stripe from 'stripe'
import { isAdmin, unauthorized } from '@/lib/adminAuth'

export async function GET(request: Request) {
  if (!isAdmin(request)) return unauthorized()

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
