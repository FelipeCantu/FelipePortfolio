import { handleStripeWebhook } from '@/lib/portal/payments'

/** Stripe → checkout.session.completed. Set STRIPE_PORTAL_WEBHOOK_SECRET. */
export async function POST(request: Request) {
  const { status, message } = await handleStripeWebhook(await request.text(), request.headers.get('stripe-signature'))
  return Response.json({ message }, { status })
}
