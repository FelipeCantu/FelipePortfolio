import { timingSafeEqual } from 'crypto'

const SITE_URL = 'https://felipecantujr.com'

// Origins Stripe onboarding may redirect back to. Anything else falls back to SITE_URL,
// so a request can't turn the onboarding link into a redirect to an arbitrary site.
const ALLOWED_ORIGINS = new Set([
  SITE_URL,
  'https://www.felipecantujr.com',
  ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
])

export function unauthorized() {
  return Response.json({ error: 'Unauthorized' }, { status: 401 })
}

/** Constant-time check of the x-admin-key header against ADMIN_SECRET. */
export function isAdmin(request: Request): boolean {
  const secret = process.env.ADMIN_SECRET
  const key = request.headers.get('x-admin-key')
  if (!secret || !key) return false

  const a = Buffer.from(key)
  const b = Buffer.from(secret)
  return a.length === b.length && timingSafeEqual(a, b)
}

export function safeBaseUrl(appUrl: unknown): string {
  if (typeof appUrl !== 'string') return SITE_URL
  try {
    const origin = new URL(appUrl).origin
    return ALLOWED_ORIGINS.has(origin) ? origin : SITE_URL
  } catch {
    return SITE_URL
  }
}
