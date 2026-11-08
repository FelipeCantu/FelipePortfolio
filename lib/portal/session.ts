import 'server-only'
import { createHmac, timingSafeEqual } from 'crypto'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getClient, getProject, getInvoice } from './db'
import { safeBaseUrl } from '@/lib/adminAuth'
import type { Role } from './types'

const COOKIE = 'fc_portal'
const ADMIN_COOKIE = 'fc_portal_admin'
const CLIENT_TTL = 60 * 60 * 24 * 30 // 30 days
const ADMIN_TTL = 60 * 60 * 12 // 12 hours

interface Payload {
  r: Role
  id: string
  v: number
  exp: number
}

function secret() {
  const s = process.env.PORTAL_SECRET
  if (!s || s.length < 32) throw new Error('PORTAL_SECRET must be set to a random string of at least 32 characters.')
  return s
}

const sign = (data: string) => createHmac('sha256', secret()).update(data).digest('base64url')

function encode(p: Payload) {
  const data = Buffer.from(JSON.stringify(p)).toString('base64url')
  return `${data}.${sign(data)}`
}

function decode(token: string | undefined): Payload | null {
  if (!token) return null
  const [data, sig] = token.split('.')
  if (!data || !sig) return null
  const expected = Buffer.from(sign(data))
  const given = Buffer.from(sig)
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null
  try {
    const p = JSON.parse(Buffer.from(data, 'base64url').toString()) as Payload
    return p.exp > Date.now() / 1000 ? p : null
  } catch {
    return null
  }
}

const cookieOpts = (maxAge: number) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge,
})

export async function startClientSession(clientId: string, version: number) {
  const exp = Math.floor(Date.now() / 1000) + CLIENT_TTL
  ;(await cookies()).set(COOKIE, encode({ r: 'client', id: clientId, v: version, exp }), cookieOpts(CLIENT_TTL))
}

export async function startAdminSession() {
  const exp = Math.floor(Date.now() / 1000) + ADMIN_TTL
  ;(await cookies()).set(ADMIN_COOKIE, encode({ r: 'admin', id: 'admin', v: 1, exp }), cookieOpts(ADMIN_TTL))
}

export async function endSession(role: Role) {
  ;(await cookies()).delete(role === 'admin' ? ADMIN_COOKIE : COOKIE)
}

/** The signed-in client, or null. Sessions die when the access code is reset. */
export async function currentClient() {
  const p = decode((await cookies()).get(COOKIE)?.value)
  if (!p || p.r !== 'client') return null
  const client = await getClient(p.id)
  return client && client.sessionVersion === p.v ? client : null
}

export async function isAdminSession() {
  const p = decode((await cookies()).get(ADMIN_COOKIE)?.value)
  return p?.r === 'admin'
}

export async function requireClient() {
  const client = await currentClient()
  if (!client) redirect('/portal/login')
  return client
}

export async function requireAdmin() {
  if (!(await isAdminSession())) redirect('/portal/admin/login')
}

/** Loads a project the current client owns (404 otherwise). */
export async function requireClientProject(projectId: string) {
  const client = await requireClient()
  const project = await getProject(projectId)
  if (!project || project.clientId !== client.id) return { client, project: null }
  return { client, project }
}

export async function requireClientInvoice(invoiceId: string) {
  const client = await requireClient()
  const invoice = await getInvoice(invoiceId)
  if (!invoice || invoice.clientId !== client.id || invoice.status === 'draft') return { client, invoice: null }
  return { client, invoice }
}

/** Origin of this request, limited to the site's known origins. */
export async function siteOrigin() {
  const h = await headers()
  const host = h.get('x-forwarded-host') ?? h.get('host')
  const proto = h.get('x-forwarded-proto') ?? (host?.startsWith('localhost') ? 'http' : 'https')
  const fromEnv = process.env.PORTAL_BASE_URL
  if (fromEnv) return fromEnv.replace(/\/$/, '')
  return safeBaseUrl(host ? `${proto}://${host}` : undefined)
}
