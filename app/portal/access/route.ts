import { NextResponse } from 'next/server'
import { authenticateClient, rateLimit } from '@/lib/portal/db'
import { startClientSession } from '@/lib/portal/session'

/**
 * One-click invite link Felipe sends to a client. Works until they've set a
 * password, then it's retired (they sign in with email + password):
 *   /portal/access?email=jane@acme.com&code=ABCD-2345
 */
export async function GET(request: Request) {
  const url = new URL(request.url)
  const email = url.searchParams.get('email') ?? ''
  const code = url.searchParams.get('code') ?? ''
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local'

  const fail = new URL('/portal/login', url)
  fail.searchParams.set('email', email)
  fail.searchParams.set('error', 'link')

  if (!(await rateLimit(`login:${ip}`, 10, 15 * 60))) return NextResponse.redirect(fail, 303)
  const result = email && code ? await authenticateClient(email, code) : null
  if (!result) return NextResponse.redirect(fail, 303)

  await startClientSession(result.client.id, result.client.sessionVersion, result.client.contactId)
  return NextResponse.redirect(new URL(result.needsPassword ? '/portal/set-password' : '/portal', url), 303)
}
