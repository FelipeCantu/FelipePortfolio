import Stripe from 'stripe'
import { requireAdmin, serverError } from '@/lib/adminAuth'

export async function GET(request: Request) {
  const denied = requireAdmin(request)
  if (denied) return denied

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
    return serverError('balance', err)
  }
}
