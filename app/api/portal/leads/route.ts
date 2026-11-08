import { createLead, rateLimit } from '@/lib/portal/db'
import { cleanIntake, intakeSummary, PROJECT_TYPE_LABELS } from '@/lib/portal/intake'
import { notifyAdmin } from '@/lib/portal/notify'

/**
 * Public endpoint for the Get Started wizard. Saves the answers as a request
 * in the portal admin and emails Felipe.
 */
export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local'
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 })
  }
  // Honeypot: real visitors never see or fill this field. Pretend success.
  if (typeof body.website_url === 'string' && body.website_url.trim()) return Response.json({ ok: true })

  const { data, error } = cleanIntake(body)
  if (!data) return Response.json({ error }, { status: 400 })

  try {
    if (!(await rateLimit(`lead:${ip}`, 5, 60 * 60))) {
      return Response.json({ error: 'Too many submissions. Please email me directly.' }, { status: 429 })
    }
    const lead = await createLead(data, ip)
    const origin = new URL(request.url).origin
    await notifyAdmin(
      `New project request: ${data.name}${data.company ? ` (${data.company})` : ''} — ${PROJECT_TYPE_LABELS[data.projectType]}`,
      intakeSummary(data),
      `${origin}/portal/admin/requests/${lead.id}`
    )
    return Response.json({ ok: true })
  } catch (err) {
    console.error('[portal] lead save failed', err)
    return Response.json({ error: 'Could not save your request' }, { status: 500 })
  }
}
