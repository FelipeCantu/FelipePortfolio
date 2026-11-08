import 'server-only'
import { createHash, randomBytes, randomInt, scryptSync, timingSafeEqual } from 'crypto'
import { kv } from './kv'
import type {
  Activity, Client, ClientTask, FileItem, Invoice, InvoiceItem, Message, Milestone, Project, Role,
} from './types'

/* ───────────────────────── helpers ───────────────────────── */

export const newId = () => randomBytes(9).toString('base64url')
const now = () => new Date().toISOString()

// No 0/O/1/I/L so codes are easy to read aloud or type from a text message
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
export function generateAccessCode() {
  const pick = () => Array.from({ length: 4 }, () => CODE_ALPHABET[randomInt(CODE_ALPHABET.length)]).join('')
  return `${pick()}-${pick()}`
}
const normalizeCode = (code: string) => code.toUpperCase().replace(/[^A-Z0-9]/g, '')

function hashSecret(secret: string) {
  const salt = randomBytes(16).toString('hex')
  return `${salt}:${scryptSync(secret, salt, 32).toString('hex')}`
}
function verifySecret(secret: string, stored: string | undefined) {
  const [salt, hash] = (stored ?? `${'0'.repeat(32)}:${'0'.repeat(64)}`).split(':')
  if (!salt || !hash) return false
  const a = scryptSync(secret, salt, 32)
  const b = Buffer.from(hash, 'hex')
  return a.length === b.length && timingSafeEqual(a, b) && stored !== undefined
}
const hashCode = (code: string) => hashSecret(normalizeCode(code))
const verifyCode = (code: string, stored: string | undefined) => verifySecret(normalizeCode(code), stored)

export const PASSWORD_MIN = 8
export function passwordProblem(password: string, confirm?: string) {
  if (password.length < PASSWORD_MIN) return `Use at least ${PASSWORD_MIN} characters.`
  if (password.length > 200) return 'That password is too long.'
  if (confirm !== undefined && password !== confirm) return "The two passwords don't match."
  return null
}

const K = {
  client: (id: string) => `portal:client:${id}`,
  clients: 'portal:clients',
  clientByEmail: (email: string) => `portal:client-email:${email}`,
  project: (id: string) => `portal:project:${id}`,
  clientProjects: (clientId: string) => `portal:client:${clientId}:projects`,
  files: (projectId: string) => `portal:project:${projectId}:files`,
  messages: (projectId: string) => `portal:project:${projectId}:messages`,
  activity: (projectId: string) => `portal:project:${projectId}:activity`,
  globalActivity: 'portal:activity',
  readMark: (projectId: string, role: Role) => `portal:project:${projectId}:read:${role}`,
  invoice: (id: string) => `portal:invoice:${id}`,
  clientInvoices: (clientId: string) => `portal:client:${clientId}:invoices`,
  invoiceSeq: 'portal:seq:invoice',
  rateLimit: (bucket: string) => `portal:rl:${bucket}`,
  resetToken: (tokenHash: string) => `portal:reset:${tokenHash}`,
}

const byDateDesc = <T extends { createdAt: string }>(a: T, b: T) => b.createdAt.localeCompare(a.createdAt)
const compact = <T,>(xs: (T | null)[]) => xs.filter((x): x is T => x != null)

/** Returns false once `bucket` has been hit more than `max` times in `windowSec`. */
export async function rateLimit(bucket: string, max: number, windowSec: number) {
  const key = K.rateLimit(bucket)
  const n = await kv().incr(key)
  if (n === 1) await kv().expire(key, windowSec)
  return n <= max
}

/* ───────────────────────── clients ───────────────────────── */

export async function getClient(id: string) {
  return kv().get<Client>(K.client(id))
}

export async function listClients() {
  const ids = await kv().smembers(K.clients)
  const clients = compact(await Promise.all(ids.map(getClient)))
  return clients.sort(byDateDesc)
}

export async function createClient(input: { name: string; email: string; company?: string; phone?: string }) {
  const email = input.email.trim().toLowerCase()
  if (await kv().get(K.clientByEmail(email))) throw new Error('A client with that email already exists.')
  const code = generateAccessCode()
  const client: Client = {
    id: newId(),
    name: input.name.trim(),
    email,
    company: input.company?.trim() || undefined,
    phone: input.phone?.trim() || undefined,
    codeHash: hashCode(code),
    sessionVersion: 1,
    createdAt: now(),
  }
  await kv().set(K.client(client.id), client)
  await kv().set(K.clientByEmail(email), client.id)
  await kv().sadd(K.clients, client.id)
  return { client, code }
}

export async function updateClient(id: string, patch: Partial<Pick<Client, 'name' | 'email' | 'company' | 'phone'>>) {
  const client = await getClient(id)
  if (!client) throw new Error('Client not found')
  if (patch.email && patch.email.toLowerCase() !== client.email) {
    const email = patch.email.trim().toLowerCase()
    if (await kv().get(K.clientByEmail(email))) throw new Error('Another client already uses that email.')
    await kv().del(K.clientByEmail(client.email))
    await kv().set(K.clientByEmail(email), id)
    patch.email = email
  }
  const next = { ...client, ...patch }
  await kv().set(K.client(id), next)
  return next
}

/**
 * New one-time setup code. Clears the client's password and signs them out
 * everywhere, so they pick a new password on their next sign-in.
 */
export async function resetClientCode(id: string) {
  const client = await getClient(id)
  if (!client) throw new Error('Client not found')
  const code = generateAccessCode()
  await kv().set(K.client(id), {
    ...client,
    codeHash: hashCode(code),
    passwordHash: undefined,
    sessionVersion: client.sessionVersion + 1,
  })
  return code
}

/** Sets the client's password, retires the setup code and signs out other sessions. */
export async function setClientPassword(id: string, password: string) {
  const client = await getClient(id)
  if (!client) throw new Error('Client not found')
  const next: Client = {
    ...client,
    passwordHash: hashSecret(password),
    codeHash: undefined,
    sessionVersion: client.sessionVersion + 1,
  }
  await kv().set(K.client(id), next)
  return next
}

export function checkClientPassword(client: Client, password: string) {
  return verifySecret(password, client.passwordHash)
}

export async function getClientByEmail(email: string) {
  const id = await kv().get<string>(K.clientByEmail(email.trim().toLowerCase()))
  return id ? getClient(id) : null
}

/* password reset links (single use, 1 hour) */
const sha256 = (s: string) => createHash('sha256').update(s).digest('hex')

export async function createResetToken(clientId: string) {
  const token = randomBytes(32).toString('base64url')
  const key = K.resetToken(sha256(token))
  await kv().set(key, clientId)
  await kv().expire(key, 60 * 60)
  return token
}

export async function peekResetToken(token: string) {
  if (!token) return null
  const id = await kv().get<string>(K.resetToken(sha256(token)))
  return id ? getClient(id) : null
}

export async function consumeResetToken(token: string) {
  const client = await peekResetToken(token)
  if (client) await kv().del(K.resetToken(sha256(token)))
  return client
}

export async function deleteClient(id: string) {
  const client = await getClient(id)
  if (!client) return
  for (const p of await listProjects(id)) await deleteProject(p.id)
  for (const inv of await listInvoices(id)) await kv().del(K.invoice(inv.id))
  await kv().del(K.clientInvoices(id))
  await kv().del(K.clientProjects(id))
  await kv().del(K.clientByEmail(client.email))
  await kv().srem(K.clients, id)
  await kv().del(K.client(id))
}

/**
 * Signs a client in with their password, or with the one-time setup code
 * from their invite (only until they've chosen a password).
 * `needsPassword` tells the caller to send them to "create your password".
 */
export async function authenticateClient(email: string, secret: string) {
  const client = await getClientByEmail(email)
  // Always run the hashes so response time doesn't reveal whether the email exists
  const byPassword = verifySecret(secret, client?.passwordHash)
  const byCode = !byPassword && verifyCode(secret, client?.passwordHash ? undefined : client?.codeHash)
  if (!client || (!byPassword && !byCode)) return null
  const updated = { ...client, lastLoginAt: now() }
  await kv().set(K.client(client.id), updated)
  return { client: updated, needsPassword: !client.passwordHash }
}

/* ───────────────────────── projects ───────────────────────── */

export async function getProject(id: string) {
  const p = await kv().get<Project>(K.project(id))
  return p ? { ...p, milestones: p.milestones ?? [], clientTasks: p.clientTasks ?? [] } : null
}

export async function listProjects(clientId: string) {
  const ids = await kv().smembers(K.clientProjects(clientId))
  return compact(await Promise.all(ids.map(getProject))).sort(byDateDesc)
}

export async function createProject(clientId: string, input: Partial<Project> & { name: string }) {
  const project: Project = {
    id: newId(),
    clientId,
    name: input.name.trim(),
    summary: input.summary,
    status: input.status ?? 'planning',
    startDate: input.startDate,
    dueDate: input.dueDate,
    stagingUrl: input.stagingUrl,
    liveUrl: input.liveUrl,
    milestones: input.milestones ?? [],
    clientTasks: input.clientTasks ?? [],
    createdAt: now(),
    updatedAt: now(),
  }
  await kv().set(K.project(project.id), project)
  await kv().sadd(K.clientProjects(clientId), project.id)
  return project
}

export async function saveProject(project: Project) {
  const next = { ...project, updatedAt: now() }
  await kv().set(K.project(project.id), next)
  return next
}

export async function deleteProject(id: string) {
  const p = await getProject(id)
  if (!p) return
  await Promise.all([
    kv().del(K.files(id)),
    kv().del(K.messages(id)),
    kv().del(K.activity(id)),
    kv().del(K.readMark(id, 'client')),
    kv().del(K.readMark(id, 'admin')),
  ])
  await kv().srem(K.clientProjects(p.clientId), id)
  await kv().del(K.project(id))
}

export function projectProgress(p: Project) {
  if (p.status === 'completed') return 100
  if (!p.milestones.length) return p.status === 'planning' ? 5 : 0
  const score = p.milestones.reduce((s, m) => s + (m.status === 'done' ? 1 : m.status === 'in_progress' ? 0.5 : 0), 0)
  return Math.round((score / p.milestones.length) * 100)
}

export function nextMilestone(p: Project): Milestone | undefined {
  return p.milestones.find((m) => m.status !== 'done')
}

export const newMilestone = (title: string, dueDate?: string): Milestone => ({ id: newId(), title, dueDate, status: 'todo' })
export const newClientTask = (title: string): ClientTask => ({ id: newId(), title, done: false })

/* ───────────────────────── files ───────────────────────── */

export async function listFiles(projectId: string) {
  const all = await kv().hgetall<FileItem>(K.files(projectId))
  return Object.values(all).sort(byDateDesc)
}

export async function getFile(projectId: string, fileId: string) {
  return kv().hget<FileItem>(K.files(projectId), fileId)
}

export async function addFile(input: Omit<FileItem, 'id' | 'createdAt' | 'approval'>) {
  const file: FileItem = {
    ...input,
    id: newId(),
    createdAt: now(),
    approval: input.requiresApproval ? { status: 'pending' } : undefined,
  }
  await kv().hset(K.files(input.projectId), file.id, file)
  return file
}

export async function saveFile(file: FileItem) {
  await kv().hset(K.files(file.projectId), file.id, file)
}

export async function removeFile(projectId: string, fileId: string) {
  await kv().hdel(K.files(projectId), fileId)
}

/* ───────────────────────── messages ───────────────────────── */

export async function listMessages(projectId: string) {
  return kv().lrange<Message>(K.messages(projectId), 0, -1)
}

export async function addMessage(projectId: string, from: Role, body: string) {
  const msg: Message = { id: newId(), projectId, from, body: body.trim().slice(0, 5000), at: now() }
  await kv().rpush(K.messages(projectId), msg)
  await markRead(projectId, from)
  return msg
}

export async function markRead(projectId: string, role: Role) {
  await kv().set(K.readMark(projectId, role), now())
}

/** Messages from the *other* party since `role` last looked. */
export async function unreadCount(projectId: string, role: Role) {
  const [mark, msgs] = await Promise.all([kv().get<string>(K.readMark(projectId, role)), listMessages(projectId)])
  return msgs.filter((m) => m.from !== role && (!mark || m.at > mark)).length
}

/* ───────────────────────── activity ───────────────────────── */

export async function logActivity(a: Omit<Activity, 'id' | 'at'>) {
  const entry: Activity = { ...a, id: newId(), at: now() }
  if (a.projectId) {
    await kv().lpush(K.activity(a.projectId), entry)
    await kv().ltrim(K.activity(a.projectId), 0, 99)
  }
  await kv().lpush(K.globalActivity, entry)
  await kv().ltrim(K.globalActivity, 0, 299)
}

export const listProjectActivity = (projectId: string, n = 20) => kv().lrange<Activity>(K.activity(projectId), 0, n - 1)
export const listGlobalActivity = (n = 40) => kv().lrange<Activity>(K.globalActivity, 0, n - 1)

/* ───────────────────────── invoices ───────────────────────── */

export const invoiceTotal = (inv: Pick<Invoice, 'items'>) =>
  inv.items.reduce((s, i) => s + Math.round(i.quantity * i.unitAmount), 0)

export async function getInvoice(id: string) {
  return kv().get<Invoice>(K.invoice(id))
}

export async function listInvoices(clientId: string) {
  const ids = await kv().smembers(K.clientInvoices(clientId))
  return compact(await Promise.all(ids.map(getInvoice))).sort(byDateDesc)
}

export async function createInvoice(input: {
  clientId: string
  projectId?: string
  title: string
  items: InvoiceItem[]
  dueDate?: string
  notes?: string
  send: boolean
}) {
  const seq = await kv().incr(K.invoiceSeq)
  const inv: Invoice = {
    id: newId(),
    number: `FC-${new Date().getFullYear()}-${String(seq).padStart(4, '0')}`,
    clientId: input.clientId,
    projectId: input.projectId || undefined,
    title: input.title.trim(),
    items: input.items,
    dueDate: input.dueDate || undefined,
    notes: input.notes?.trim() || undefined,
    status: input.send ? 'open' : 'draft',
    createdAt: now(),
    sentAt: input.send ? now() : undefined,
  }
  await kv().set(K.invoice(inv.id), inv)
  await kv().sadd(K.clientInvoices(inv.clientId), inv.id)
  return inv
}

export async function saveInvoice(inv: Invoice) {
  await kv().set(K.invoice(inv.id), inv)
  return inv
}

export async function deleteInvoice(id: string) {
  const inv = await getInvoice(id)
  if (!inv) return
  await kv().srem(K.clientInvoices(inv.clientId), id)
  await kv().del(K.invoice(id))
}

/**
 * Idempotent: safe to call from both the Stripe redirect and the webhook.
 * Returns the invoice only when this call changed it to paid.
 */
export async function markInvoicePaid(id: string, stripeSessionId?: string) {
  const inv = await getInvoice(id)
  if (!inv || inv.status === 'paid') return null
  const next: Invoice = { ...inv, status: 'paid', paidAt: now(), stripeSessionId: stripeSessionId ?? inv.stripeSessionId }
  await saveInvoice(next)
  await logActivity({
    clientId: inv.clientId,
    projectId: inv.projectId,
    actor: 'client',
    text: `Paid invoice ${inv.number}`,
    href: `/portal/admin/invoices/${inv.id}`,
  })
  return next
}
