import 'server-only'
import { createHash, randomBytes, randomInt, scryptSync, timingSafeEqual } from 'crypto'
import { kv } from './kv'
import type {
  AccessItem, Activity, ChangeOrder, Client, ClientTask, Contact, Contract, EmailPrefs, FileItem, Invoice, InvoiceItem, Lead,
  Message, Milestone, PortalSettings, Preview, Project, Proposal, Review, Role, Ticket,
} from './types'
import type { IntakeData } from './intake'

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
  contract: (id: string) => `portal:contract:${id}`,
  projectContracts: (projectId: string) => `portal:project:${projectId}:contracts`,
  review: (id: string) => `portal:review:${id}`,
  reviews: 'portal:reviews',
  projectReview: (projectId: string) => `portal:project:${projectId}:review`,
  invoices: 'portal:invoices',
  settings: 'portal:settings',
  lead: (id: string) => `portal:lead:${id}`,
  leads: 'portal:leads',
  contact: (id: string) => `portal:contact:${id}`,
  clientContacts: (clientId: string) => `portal:client:${clientId}:contacts`,
  contactByEmail: (email: string) => `portal:contact-email:${email}`,
  proposals: (projectId: string) => `portal:project:${projectId}:proposals`,
  changes: (projectId: string) => `portal:project:${projectId}:changes`,
  previews: (projectId: string) => `portal:project:${projectId}:previews`,
  tickets: (projectId: string) => `portal:project:${projectId}:tickets`,
  ticketSeq: 'portal:seq:ticket',
  demoTicketSeq: 'portal:seq:demo-ticket',
  demoInvoiceSeq: 'portal:seq:demo-invoice',
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
  if (await emailTaken(email)) throw new Error('A client with that email already exists.')
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
    if (await emailTaken(email)) throw new Error('Another client already uses that email.')
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
export async function setClientPassword(id: string, password: string, contactId?: string): Promise<Client> {
  const client = await getClient(id)
  if (!client) throw new Error('Client not found')
  if (contactId) {
    const contact = await getContact(contactId)
    if (!contact || contact.clientId !== id) throw new Error('Contact not found')
    const updated: Contact = { ...contact, passwordHash: hashSecret(password), codeHash: undefined, sessionVersion: contact.sessionVersion + 1 }
    await kv().set(K.contact(contact.id), updated)
    return asViewer(client, updated)
  }
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

export async function createResetToken(clientId: string, contactId?: string) {
  const token = randomBytes(32).toString('base64url')
  const key = K.resetToken(sha256(token))
  await kv().set(key, contactId ? `${clientId}:${contactId}` : clientId)
  await kv().expire(key, 60 * 60)
  return token
}

export async function peekResetToken(token: string) {
  if (!token) return null
  const value = await kv().get<string>(K.resetToken(sha256(token)))
  if (!value) return null
  const [clientId, contactId] = String(value).split(':')
  const client = await getClient(clientId)
  if (!client || !contactId) return client
  const contact = await getContact(contactId)
  return contact && contact.clientId === client.id ? asViewer(client, contact) : null
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
  for (const inv of await listInvoices(id)) {
    await kv().srem(K.invoices, inv.id)
    await kv().del(K.invoice(inv.id))
  }
  for (const c of await listContacts(id)) await removeContact(c.id)
  // Drop their entries from the admin activity feed so it has no dead links
  const feed = await kv().lrange<Activity>(K.globalActivity, 0, -1)
  if (feed.some((a) => a.clientId === id)) {
    await kv().del(K.globalActivity)
    for (const a of feed.filter((a) => a.clientId !== id)) await kv().rpush(K.globalActivity, a)
  }
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
  const contact = client ? null : await getContactByEmail(email)
  const who = client ?? contact
  // Always run the hashes so response time doesn't reveal whether the email exists
  const byPassword = verifySecret(secret, who?.passwordHash)
  const byCode = !byPassword && verifyCode(secret, who?.passwordHash ? undefined : who?.codeHash)
  if (!who || (!byPassword && !byCode)) return null
  const needsPassword = !who.passwordHash
  if (contact) {
    const owner = await getClient(contact.clientId)
    if (!owner) return null
    const updated: Contact = { ...contact, lastLoginAt: now() }
    await kv().set(K.contact(contact.id), updated)
    return { client: asViewer(owner, updated), needsPassword }
  }
  const updated: Client = { ...client!, lastLoginAt: now() }
  await kv().set(K.client(updated.id), updated)
  return { client: updated, needsPassword }
}

/* ───────────────────────── extra contacts ───────────────────────── */

/**
 * The signed-in person when they are an extra contact: the client's account
 * (same projects and invoices) with the contact's own name, email and password.
 * Never save this object back as the client record.
 */
export function asViewer(client: Client, contact: Contact): Client {
  return {
    ...client,
    name: contact.name,
    email: contact.email,
    codeHash: contact.codeHash,
    passwordHash: contact.passwordHash,
    sessionVersion: contact.sessionVersion,
    lastLoginAt: contact.lastLoginAt,
    emailPrefs: contact.emailPrefs,
    contactId: contact.id,
  }
}

async function emailTaken(email: string) {
  const e = email.trim().toLowerCase()
  return Boolean((await kv().get(K.clientByEmail(e))) || (await kv().get(K.contactByEmail(e))))
}

export async function getContact(id: string) {
  return kv().get<Contact>(K.contact(id))
}

export async function getContactByEmail(email: string) {
  const id = await kv().get<string>(K.contactByEmail(email.trim().toLowerCase()))
  return id ? getContact(id) : null
}

export async function listContacts(clientId: string) {
  const ids = await kv().smembers(K.clientContacts(clientId))
  return compact(await Promise.all(ids.map(getContact))).sort((a, b) => a.createdAt.localeCompare(b.createdAt))
}

export async function createContact(clientId: string, input: { name: string; email: string; emailPrefs?: EmailPrefs }) {
  const email = input.email.trim().toLowerCase()
  if (await emailTaken(email)) throw new Error('That email already has a portal sign-in.')
  const code = generateAccessCode()
  const contact: Contact = {
    id: newId(), clientId, name: input.name.trim(), email, codeHash: hashCode(code), sessionVersion: 1,
    emailPrefs: input.emailPrefs, createdAt: now(),
  }
  await kv().set(K.contact(contact.id), contact)
  await kv().set(K.contactByEmail(email), contact.id)
  await kv().sadd(K.clientContacts(clientId), contact.id)
  return { contact, code }
}

/** New one-time code for a contact; clears their password and signs them out. */
export async function resetContactCode(id: string) {
  const contact = await getContact(id)
  if (!contact) throw new Error('Contact not found')
  const code = generateAccessCode()
  await kv().set(K.contact(id), { ...contact, codeHash: hashCode(code), passwordHash: undefined, sessionVersion: contact.sessionVersion + 1 })
  return { contact, code }
}

export async function removeContact(id: string) {
  const contact = await getContact(id)
  if (!contact) return
  await kv().del(K.contactByEmail(contact.email))
  await kv().srem(K.clientContacts(contact.clientId), id)
  await kv().del(K.contact(id))
}

/** Saves email preferences for whoever is signed in (the client or one of their contacts). */
export async function saveEmailPrefs(viewer: Client, prefs: EmailPrefs) {
  if (viewer.contactId) {
    const contact = await getContact(viewer.contactId)
    if (contact) await kv().set(K.contact(contact.id), { ...contact, emailPrefs: prefs })
    return
  }
  const client = await getClient(viewer.id)
  if (client) await kv().set(K.client(client.id), { ...client, emailPrefs: prefs })
}

export async function setStripeCustomer(clientId: string, stripeCustomerId: string) {
  const client = await getClient(clientId)
  if (client) await kv().set(K.client(clientId), { ...client, stripeCustomerId })
}

/** The client or contact with this sign-in email, as a viewer (used by "forgot password"). */
export async function getViewerByEmail(email: string) {
  const client = await getClientByEmail(email)
  if (client) return client
  const contact = await getContactByEmail(email)
  const owner = contact ? await getClient(contact.clientId) : null
  return contact && owner ? asViewer(owner, contact) : null
}

/* ───────────────────────── projects ───────────────────────── */

export async function getProject(id: string) {
  const p = await kv().get<Project>(K.project(id))
  return p ? { ...p, milestones: p.milestones ?? [], clientTasks: p.clientTasks ?? [], access: p.access ?? [] } : null
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
    price: input.price,
    brief: input.brief,
    access: input.access,
    carePlan: input.carePlan,
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
    kv().del(K.proposals(id)),
    kv().del(K.changes(id)),
    kv().del(K.previews(id)),
    kv().del(K.tickets(id)),
  ])
  for (const c of await listContracts(id)) await kv().del(K.contract(c.id))
  await kv().del(K.projectContracts(id))
  const review = await getProjectReview(id)
  if (review) {
    await kv().srem(K.reviews, review.id)
    await kv().del(K.review(review.id))
  }
  await kv().del(K.projectReview(id))
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
export const newAccessItem = (key: string, name: string): AccessItem => ({ id: newId(), key, name, status: 'todo' })

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

/** `at` backdates the message (demo data); normally it's now. */
export async function addMessage(projectId: string, from: Role, body: string, at = now()) {
  const msg: Message = { id: newId(), projectId, from, body: body.trim().slice(0, 5000), at }
  await kv().rpush(K.messages(projectId), msg)
  await markRead(projectId, from, at)
  return msg
}

export async function markRead(projectId: string, role: Role, at = now()) {
  await kv().set(K.readMark(projectId, role), at)
}

/** Messages from the *other* party since `role` last looked. */
export async function unreadCount(projectId: string, role: Role) {
  const [mark, msgs] = await Promise.all([kv().get<string>(K.readMark(projectId, role)), listMessages(projectId)])
  return msgs.filter((m) => m.from !== role && (!mark || m.at > mark)).length
}

/* ───────────────────────── activity ───────────────────────── */

export async function logActivity(a: Omit<Activity, 'id' | 'at'> & { at?: string }) {
  const entry: Activity = { ...a, id: newId(), at: a.at ?? now() }
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
  /** demo invoices get their own numbers so real ones stay sequential */
  number?: string
}) {
  // Anything the demo client triggers (accepting a proposal, approving a change) gets a DEMO- number too
  const demo = !input.number && isDemoAddress((await getClient(input.clientId))?.email)
  const number =
    input.number ??
    (demo
      ? `DEMO-${String(100 + (await kv().incr(K.demoInvoiceSeq))).padStart(4, '0')}`
      : `FC-${new Date().getFullYear()}-${String(await kv().incr(K.invoiceSeq)).padStart(4, '0')}`)
  const inv: Invoice = {
    id: newId(),
    number,
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
  await kv().sadd(K.invoices, inv.id)
  return inv
}

/** Every invoice across clients (used by the daily reminder job). */
export async function listAllInvoices() {
  const ids = new Set(await kv().smembers(K.invoices))
  // Invoices created before this index existed
  for (const c of await listClients()) for (const id of await kv().smembers(K.clientInvoices(c.id))) ids.add(id)
  return compact(await Promise.all([...ids].map(getInvoice)))
}

export async function saveInvoice(inv: Invoice) {
  await kv().set(K.invoice(inv.id), inv)
  return inv
}

export async function deleteInvoice(id: string) {
  const inv = await getInvoice(id)
  if (!inv) return
  await kv().srem(K.clientInvoices(inv.clientId), id)
  await kv().srem(K.invoices, id)
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

/* ───────────────────────── billing helpers ───────────────────────── */

/** Totals for a project's invoices (drafts and voids excluded). */
export function billingSummary(project: Project, invoices: Invoice[]) {
  const mine = invoices.filter((i) => i.projectId === project.id && i.status !== 'void' && i.status !== 'draft')
  const invoiced = mine.reduce((s, i) => s + invoiceTotal(i), 0)
  const paid = mine.filter((i) => i.status === 'paid').reduce((s, i) => s + invoiceTotal(i), 0)
  const price = project.price ?? 0
  return { price, invoiced, paid, outstanding: invoiced - paid, remaining: Math.max(0, price - invoiced) }
}

/* ───────────────────────── contracts ───────────────────────── */

export async function getContract(id: string) {
  return kv().get<Contract>(K.contract(id))
}

export async function listContracts(projectId: string) {
  const ids = await kv().smembers(K.projectContracts(projectId))
  return compact(await Promise.all(ids.map(getContract))).sort(byDateDesc)
}

export async function createContract(input: { clientId: string; projectId: string; title: string; body: string }) {
  const c: Contract = { id: newId(), ...input, status: 'draft', createdAt: now() }
  await kv().set(K.contract(c.id), c)
  await kv().sadd(K.projectContracts(input.projectId), c.id)
  return c
}

export async function saveContract(c: Contract) {
  await kv().set(K.contract(c.id), c)
  return c
}

export async function deleteContract(id: string) {
  const c = await getContract(id)
  if (!c) return
  await kv().srem(K.projectContracts(c.projectId), id)
  await kv().del(K.contract(id))
}

export const contractHash = (c: Pick<Contract, 'title' | 'body'>) =>
  createHash('sha256').update(`${c.title}\n\n${c.body}`).digest('hex')

/* ───────────────────────── reviews ───────────────────────── */

export async function getReview(id: string) {
  return kv().get<Review>(K.review(id))
}

export async function getProjectReview(projectId: string) {
  const id = await kv().get<string>(K.projectReview(projectId))
  return id ? getReview(id) : null
}

export async function listReviews() {
  const ids = await kv().smembers(K.reviews)
  return compact(await Promise.all(ids.map(getReview))).sort(byDateDesc)
}

/** One review per project; submitting again updates it. */
export async function upsertReview(input: Omit<Review, 'id' | 'createdAt' | 'published'>) {
  const existing = await getProjectReview(input.projectId)
  const review: Review = existing
    ? { ...existing, ...input, published: existing.published && input.allowPublish }
    : { ...input, id: newId(), createdAt: now(), published: false }
  await kv().set(K.review(review.id), review)
  await kv().set(K.projectReview(input.projectId), review.id)
  await kv().sadd(K.reviews, review.id)
  return review
}

export async function saveReview(r: Review) {
  await kv().set(K.review(r.id), r)
  return r
}

export async function deleteReview(id: string) {
  const r = await getReview(id)
  if (!r) return
  await kv().srem(K.reviews, id)
  await kv().del(K.projectReview(r.projectId))
  await kv().del(K.review(id))
}

/* ───────────────────────── settings ───────────────────────── */

export async function getSettings(): Promise<PortalSettings> {
  return (await kv().get<PortalSettings>(K.settings)) ?? {}
}

export async function saveSettings(patch: PortalSettings) {
  const next = { ...(await getSettings()), ...patch }
  await kv().set(K.settings, next)
  return next
}

/* ───────────────────────── leads (Get Started requests) ───────────────────────── */

export async function createLead(data: IntakeData, ip?: string) {
  const lead: Lead = { id: newId(), status: 'new', data, createdAt: now(), ip }
  await kv().set(K.lead(lead.id), lead)
  await kv().sadd(K.leads, lead.id)
  return lead
}

export async function getLead(id: string) {
  return kv().get<Lead>(K.lead(id))
}

export async function listLeads() {
  const ids = await kv().smembers(K.leads)
  return compact(await Promise.all(ids.map(getLead))).sort(byDateDesc)
}

export async function saveLead(lead: Lead) {
  await kv().set(K.lead(lead.id), lead)
  return lead
}

export async function deleteLead(id: string) {
  await kv().srem(K.leads, id)
  await kv().del(K.lead(id))
}

/* ───────────────────────── per-project collections ───────────────────────── */

function collection<T extends { id: string; projectId: string; createdAt: string }>(key: (projectId: string) => string) {
  return {
    list: async (projectId: string) => Object.values(await kv().hgetall<T>(key(projectId))).sort(byDateDesc),
    get: (projectId: string, id: string) => kv().hget<T>(key(projectId), id),
    save: async (item: T) => {
      await kv().hset(key(item.projectId), item.id, item)
      return item
    },
    remove: (projectId: string, id: string) => kv().hdel(key(projectId), id),
  }
}

/** Quotes, scope changes, site previews and support requests, each stored with its project. */
export const proposals = collection<Proposal>(K.proposals)
export const changeOrders = collection<ChangeOrder>(K.changes)
export const previews = collection<Preview>(K.previews)
export const tickets = collection<Ticket>(K.tickets)

/** Demo addresses use example.com, a reserved domain (same rule as isDemoEmail in notify.ts). */
export const isDemoAddress = (email?: string) => !!email && /@example\.com$/i.test(email.trim())
export const isDemoInvoice = (inv: { number: string }) => inv.number.startsWith('DEMO-')

/** Real clients share one running number; the demo client counts on its own so it never uses one up. */
export const nextTicketNumber = (demo = false) => kv().incr(demo ? K.demoTicketSeq : K.ticketSeq)

/** Today as YYYY-MM-DD in Felipe's time zone. */
export const todayIso = (d = new Date()) => d.toLocaleDateString('en-CA', { timeZone: 'America/Chicago' })

/** A sent proposal whose "valid until" date has passed can no longer be accepted. */
export const proposalExpired = (p: Pick<Proposal, 'status' | 'validUntil'>) =>
  p.status === 'sent' && !!p.validUntil && p.validUntil < todayIso()
