import { timingSafeEqual } from 'crypto'
import { runReminders } from '@/lib/portal/reminders'
import { runCarePlans } from '@/lib/portal/carePlans'
import { runWeeklyUpdates } from '@/lib/portal/weekly'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

/**
 * Daily job: monthly care-plan invoices (and auto-pay charges), payment reminders, and on Mondays
 * the weekly progress emails (scheduled in vercel.json). Vercel sends
 * `Authorization: Bearer $CRON_SECRET` when CRON_SECRET is set; without it,
 * the job only runs for Vercel's cron user agent. Safe to re-run: each
 * reminder stage is sent at most once per invoice.
 */
function authorized(request: Request) {
  const secret = process.env.CRON_SECRET
  if (secret) {
    const given = Buffer.from(request.headers.get('authorization') ?? '')
    const want = Buffer.from(`Bearer ${secret}`)
    return given.length === want.length && timingSafeEqual(given, want)
  }
  return (request.headers.get('user-agent') ?? '').startsWith('vercel-cron/')
}

export async function GET(request: Request) {
  if (!authorized(request)) return new Response('Unauthorized', { status: 401 })
  const origin = process.env.PORTAL_BASE_URL?.replace(/\/$/, '') ?? 'https://felipecantujr.com'
  const billed = await runCarePlans(origin)
  const sent = await runReminders(origin)
  const weekly = await runWeeklyUpdates(origin)
  return Response.json({ billed, sent, weekly })
}
