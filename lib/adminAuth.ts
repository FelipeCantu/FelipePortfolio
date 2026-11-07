import { timingSafeEqual } from 'crypto'

const SITE_URL = 'https://felipecantujr.com'

// Origins Stripe onboarding may redirect back to. Anything else falls back to SITE_URL,
// so a request can't turn the onboarding link into a redirect to an arbitrary site.
const ALLOWED_ORIGINS = new Set([
  SITE_URL,
  'https://www.felipecantujr.com',
  ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
])

const NO_STORE = { 'Cache-Control': 'no-store' }

export function unauthorized() {
  return Response.json({ error: 'Unauthorized' }, { status: 401, headers: NO_STORE })
}

export function tooManyRequests() {
  return Response.json({ error: 'Too many attempts. Try again later.' }, { status: 429, headers: { ...NO_STORE, 'Retry-After': '900' } })
}

/** Logs the real error server-side and returns a generic message to the browser. */
export function serverError(context: string, err: unknown) {
  console.error(`[admin:${context}]`, err)
  return Response.json({ error: 'Something went wrong. Check the server logs.' }, { status: 500, headers: NO_STORE })
}

/** Stripe connected-account ids look like acct_ followed by letters/digits. */
export function isStripeAccountId(value: unknown): value is string {
  return typeof value === 'string' && /^acct_[A-Za-z0-9]{8,64}$/.test(value)
}

// ── Failed-attempt throttle ─────────────────────────────────────────────────
// Best-effort and per server instance (serverless instances are reused, not
// shared), so it slows down guessing but is not a hard limit. For a hard limit,
// add a Vercel Firewall rate-limit rule on /api/stripe/*.
const WINDOW_MS = 15 * 60 * 1000
const MAX_FAILURES = 10
const failures = new Map<string, { count: number; first: number }>()

function clientIp(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
}

function isThrottled(ip: string): boolean {
  const entry = failures.get(ip)
  if (!entry) return false
  if (Date.now() - entry.first > WINDOW_MS) {
    failures.delete(ip)
    return false
  }
  return entry.count >= MAX_FAILURES
}

function recordFailure(ip: string) {
  const now = Date.now()
  const entry = failures.get(ip)
  if (!entry || now - entry.first > WINDOW_MS) failures.set(ip, { count: 1, first: now })
  else entry.count++
  if (failures.size > 5000) failures.clear() // bound memory
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

/**
 * Gate for every admin route. Returns a Response to send back when the caller
 * is throttled or not authorised, or null when the request may proceed.
 */
export function requireAdmin(request: Request): Response | null {
  const ip = clientIp(request)
  if (isThrottled(ip)) return tooManyRequests()
  if (!isAdmin(request)) {
    recordFailure(ip)
    return unauthorized()
  }
  failures.delete(ip)
  return null
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
