import { NextResponse } from 'next/server'
import { authenticateClient, rateLimit } from '@/lib/portal/db'
import { startClientSession } from '@/lib/portal/session'

/**
 * One-click sign-in link Felipe sends to a client:
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
  const client = email && code ? await authenticateClient(email, code) : null
  if (!client) return NextResponse.redirect(fail, 303)

  await startClientSession(client.id, client.sessionVersion)
  return NextResponse.redirect(new URL('/portal', url), 303)
}
