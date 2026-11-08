'use server'

import { timingSafeEqual } from 'crypto'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { del } from '@vercel/blob'
import {
  addFile, addMessage, createClient, createInvoice, createProject, deleteClient, deleteInvoice, deleteProject,
  getClient, getFile, getInvoice, getProject, invoiceTotal, logActivity, newClientTask, newMilestone, rateLimit,
  listFiles, removeFile, resetClientCode, saveFile, saveInvoice, saveProject, updateClient,
} from '@/lib/portal/db'
import { endSession, requireAdmin, siteOrigin, startAdminSession } from '@/lib/portal/session'
import { sendEmail } from '@/lib/portal/notify'
import { isBlobUrl } from '@/lib/portal/blob'
import { money } from '@/lib/portal/format'
import type { InvoiceItem, InvoiceStatus, MilestoneStatus, ProjectStatus } from '@/lib/portal/types'
import type { FormState } from '@/app/portal/actions'

export type CredentialState = { error?: string; email?: string; code?: string; link?: string } | undefined

const str = (form: FormData, key: string) => String(form.get(key) ?? '').trim()
const opt = (form: FormData, key: string) => str(form, key) || undefined

async function accessLink(email: string, code: string) {
  return `${await siteOrigin()}/portal/access?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`
}

function refresh(...paths: string[]) {
  for (const p of paths) revalidatePath(p)
}

/* ───────────── admin auth ───────────── */

export async function adminLoginAction(_: FormState, form: FormData): Promise<FormState> {
  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local'
  if (!(await rateLimit(`admin:${ip}`, 8, 15 * 60))) return { error: 'Too many attempts. Try again in 15 minutes.' }

  const secret = process.env.ADMIN_SECRET
  const given = Buffer.from(str(form, 'password'))
  const ok = !!secret && given.length === Buffer.byteLength(secret) && timingSafeEqual(given, Buffer.from(secret))
  if (!ok) return { error: 'Wrong password.' }

  await startAdminSession()
  redirect('/portal/admin')
}

export async function adminLogoutAction() {
  await endSession('admin')
  redirect('/portal/admin/login')
}

/* ───────────── clients ───────────── */

export async function createClientAction(_: CredentialState, form: FormData): Promise<CredentialState> {
  await requireAdmin()
  const name = str(form, 'name')
  const email = str(form, 'email')
  if (!name || !/^\S+@\S+\.\S+$/.test(email)) return { error: 'Name and a valid email are required.' }
  try {
    const { client, code } = await createClient({ name, email, company: opt(form, 'company'), phone: opt(form, 'phone') })
    const projectName = opt(form, 'project')
    if (projectName) await createProject(client.id, { name: projectName, status: 'planning' })
    const link = await accessLink(client.email, code)
    if (form.get('sendInvite') === 'on') await sendInvite(client.name, client.email, code, link)
    refresh('/portal/admin')
    return { email: client.email, code, link }
  } catch (err) {
    return { error: (err as Error).message }
  }
}

async function sendInvite(name: string, email: string, code: string, link: string) {
  await sendEmail(
    email,
    'Your client portal is ready',
    `Hi ${name.split(' ')[0]},\n\nI've set up a private portal for our project. You can follow progress, review and approve work, share files, message me and pay invoices there.\n\nClick the button below to create your password. After that, you'll sign in at ${link.split('/portal')[0]}/portal with your email and password.\n\nIf the button doesn't work, go to the sign-in page and enter:\nEmail: ${email}\nOne-time code: ${code}\n\nTalk soon,\nFelipe`,
    link,
    'Create your password'
  )
}

export async function updateClientAction(clientId: string, _: FormState, form: FormData): Promise<FormState> {
  await requireAdmin()
  try {
    await updateClient(clientId, { name: str(form, 'name'), email: str(form, 'email'), company: opt(form, 'company'), phone: opt(form, 'phone') })
  } catch (err) {
    return { error: (err as Error).message }
  }
  refresh(`/portal/admin/clients/${clientId}`, '/portal/admin')
  return { ok: 'saved' }
}

export async function resetCodeAction(clientId: string, _: CredentialState, form: FormData): Promise<CredentialState> {
  await requireAdmin()
  const client = await getClient(clientId)
  if (!client) return { error: 'Client not found' }
  const code = await resetClientCode(clientId)
  const link = await accessLink(client.email, code)
  if (form.get('sendInvite') === 'on') await sendInvite(client.name, client.email, code, link)
  return { email: client.email, code, link }
}

export async function deleteClientAction(clientId: string, form: FormData) {
  await requireAdmin()
  if (str(form, 'confirm') !== 'DELETE') return
  await deleteClient(clientId)
  refresh('/portal/admin')
  redirect('/portal/admin')
}

/* ───────────── projects ───────────── */

export async function createProjectAction(clientId: string, form: FormData) {
  await requireAdmin()
  const name = str(form, 'name')
  if (!name) return
  const template = str(form, 'template')
  const milestones = TEMPLATES[template]?.map((t) => newMilestone(t)) ?? []
  const project = await createProject(clientId, {
    name,
    summary: opt(form, 'summary'),
    startDate: opt(form, 'startDate'),
    dueDate: opt(form, 'dueDate'),
    status: 'planning',
    milestones,
    clientTasks: template ? DEFAULT_CLIENT_TASKS.map(newClientTask) : [],
  })
  await logActivity({ clientId, projectId: project.id, actor: 'admin', text: `Project “${name}” was created` })
  redirect(`/portal/admin/projects/${project.id}`)
}

const TEMPLATES: Record<string, string[]> = {
  website: ['Kickoff & discovery', 'Sitemap & wireframes', 'Visual design', 'Development', 'Content & SEO', 'Review & revisions', 'Launch'],
  webapp: ['Kickoff & requirements', 'UX flows & wireframes', 'UI design', 'Build: core features', 'Testing & QA', 'Beta review', 'Launch & handoff'],
  redesign: ['Audit of current site', 'Design direction', 'Page designs', 'Development', 'Content migration', 'Review & revisions', 'Launch'],
}
const DEFAULT_CLIENT_TASKS = ['Send logo and brand assets', 'Share website copy / content', 'Provide domain & hosting access']

export async function updateProjectAction(projectId: string, _: FormState, form: FormData): Promise<FormState> {
  await requireAdmin()
  const project = await getProject(projectId)
  if (!project) return { error: 'Not found' }
  const status = str(form, 'status') as ProjectStatus
  const next = await saveProject({
    ...project,
    name: str(form, 'name') || project.name,
    summary: opt(form, 'summary'),
    status,
    startDate: opt(form, 'startDate'),
    dueDate: opt(form, 'dueDate'),
    stagingUrl: opt(form, 'stagingUrl'),
    liveUrl: opt(form, 'liveUrl'),
  })
  if (status !== project.status) {
    await logActivity({ clientId: project.clientId, projectId, actor: 'admin', text: `Project status changed to ${status.replace('_', ' ')}` })
    if (status === 'completed' || status === 'review') await emailClient(project.clientId, projectId, status === 'completed' ? `${next.name} is complete!` : `${next.name} is ready for your review`, status === 'completed' ? `Great news — ${next.name} is complete. Thank you for working with me!` : `${next.name} is ready for your review. Take a look in your portal and let me know what you think.`)
  }
  refresh(`/portal/admin/projects/${projectId}`, `/portal/projects/${projectId}`)
  return { ok: 'saved' }
}

export async function deleteProjectAction(projectId: string, form: FormData) {
  await requireAdmin()
  const project = await getProject(projectId)
  if (!project || str(form, 'confirm') !== 'DELETE') return
  const blobs = (await listFiles(projectId)).filter((f) => f.kind === 'upload').map((f) => f.url)
  if (blobs.length) await del(blobs).catch(() => {})
  await deleteProject(projectId)
  redirect(`/portal/admin/clients/${project.clientId}`)
}

/* milestones */

export async function addMilestoneAction(projectId: string, form: FormData) {
  await requireAdmin()
  const project = await getProject(projectId)
  const title = str(form, 'title')
  if (!project || !title) return
  const m = { ...newMilestone(title, opt(form, 'dueDate')), description: opt(form, 'description') }
  await saveProject({ ...project, milestones: [...project.milestones, m] })
  refresh(`/portal/admin/projects/${projectId}`)
}

export async function setMilestoneStatusAction(projectId: string, milestoneId: string, status: MilestoneStatus) {
  await requireAdmin()
  const project = await getProject(projectId)
  const m = project?.milestones.find((x) => x.id === milestoneId)
  if (!project || !m) return
  await saveProject({ ...project, milestones: project.milestones.map((x) => (x.id === milestoneId ? { ...x, status } : x)) })
  if (status === 'done') {
    await logActivity({ clientId: project.clientId, projectId, actor: 'admin', text: `Milestone completed: ${m.title}` })
    await emailClient(project.clientId, projectId, `Milestone complete: ${m.title}`, `“${m.title}” is done on ${project.name}. See the latest progress in your portal.`)
  } else if (status === 'in_progress') {
    await logActivity({ clientId: project.clientId, projectId, actor: 'admin', text: `Started: ${m.title}` })
  }
  refresh(`/portal/admin/projects/${projectId}`, `/portal/projects/${projectId}`)
}

export async function moveMilestoneAction(projectId: string, milestoneId: string, dir: -1 | 1) {
  await requireAdmin()
  const project = await getProject(projectId)
  if (!project) return
  const list = [...project.milestones]
  const i = list.findIndex((m) => m.id === milestoneId)
  const j = i + dir
  if (i < 0 || j < 0 || j >= list.length) return
  ;[list[i], list[j]] = [list[j], list[i]]
  await saveProject({ ...project, milestones: list })
  refresh(`/portal/admin/projects/${projectId}`)
}

export async function deleteMilestoneAction(projectId: string, milestoneId: string) {
  await requireAdmin()
  const project = await getProject(projectId)
  if (!project) return
  await saveProject({ ...project, milestones: project.milestones.filter((m) => m.id !== milestoneId) })
  refresh(`/portal/admin/projects/${projectId}`)
}

/* client to-dos */

export async function addClientTaskAction(projectId: string, form: FormData) {
  await requireAdmin()
  const project = await getProject(projectId)
  const title = str(form, 'title')
  if (!project || !title) return
  await saveProject({ ...project, clientTasks: [...project.clientTasks, newClientTask(title)] })
  await logActivity({ clientId: project.clientId, projectId, actor: 'admin', text: `New request: ${title}` })
  refresh(`/portal/admin/projects/${projectId}`)
}

export async function deleteClientTaskAction(projectId: string, taskId: string) {
  await requireAdmin()
  const project = await getProject(projectId)
  if (!project) return
  await saveProject({ ...project, clientTasks: project.clientTasks.filter((t) => t.id !== taskId) })
  refresh(`/portal/admin/projects/${projectId}`)
}

/* ───────────── messages & files ───────────── */

export async function adminMessageAction(projectId: string, _: FormState, form: FormData): Promise<FormState> {
  await requireAdmin()
  const project = await getProject(projectId)
  const body = str(form, 'body')
  if (!project) return { error: 'Not found' }
  if (!body) return { error: 'Write a message first.' }
  await addMessage(projectId, 'admin', body)
  await logActivity({ clientId: project.clientId, projectId, actor: 'admin', text: 'Felipe sent a message' })
  await emailClient(project.clientId, projectId, `New message from Felipe — ${project.name}`, body, '#messages')
  refresh(`/portal/admin/projects/${projectId}`)
  return { ok: 'sent' }
}

export async function adminRecordUploadAction(
  projectId: string,
  file: { url: string; name: string; size: number; contentType: string; note?: string; requiresApproval?: boolean }
): Promise<FormState> {
  await requireAdmin()
  const project = await getProject(projectId)
  if (!project) return { error: 'Not found' }
  if (!isBlobUrl(file.url)) return { error: 'Upload failed.' }
  await addFile({
    projectId,
    name: file.name.slice(0, 200),
    url: file.url,
    kind: 'upload',
    size: file.size,
    contentType: file.contentType,
    uploadedBy: 'admin',
    requiresApproval: !!file.requiresApproval,
  })
  await afterAdminFile(project.clientId, projectId, project.name, file.name, !!file.requiresApproval)
  return { ok: 'uploaded' }
}

export async function adminShareLinkAction(projectId: string, _: FormState, form: FormData): Promise<FormState> {
  await requireAdmin()
  const project = await getProject(projectId)
  if (!project) return { error: 'Not found' }
  const url = str(form, 'url')
  const name = str(form, 'name') || url
  if (!/^https?:\/\//i.test(url)) return { error: 'Use a full https:// link.' }
  const requiresApproval = form.get('requiresApproval') === 'on'
  await addFile({ projectId, name: name.slice(0, 200), url, kind: 'link', uploadedBy: 'admin', requiresApproval })
  await afterAdminFile(project.clientId, projectId, project.name, name, requiresApproval)
  return { ok: 'shared' }
}

async function afterAdminFile(clientId: string, projectId: string, projectName: string, name: string, approval: boolean) {
  await logActivity({ clientId, projectId, actor: 'admin', text: approval ? `“${name}” is ready for your review` : `Felipe shared “${name}”` })
  await emailClient(
    clientId,
    projectId,
    approval ? `Ready for your review: ${name}` : `New file: ${name}`,
    approval
      ? `“${name}” is ready for your review on ${projectName}. You can approve it or request changes right from your portal.`
      : `I shared “${name}” on ${projectName}.`,
    '#files'
  )
  refresh(`/portal/admin/projects/${projectId}`, `/portal/projects/${projectId}`)
}

export async function deleteFileAction(projectId: string, fileId: string) {
  await requireAdmin()
  const file = await getFile(projectId, fileId)
  if (!file) return
  if (file.kind === 'upload') await del(file.url).catch(() => {})
  await removeFile(projectId, fileId)
  refresh(`/portal/admin/projects/${projectId}`, `/portal/projects/${projectId}`)
}

export async function resetApprovalAction(projectId: string, fileId: string) {
  await requireAdmin()
  const file = await getFile(projectId, fileId)
  if (!file) return
  await saveFile({ ...file, requiresApproval: true, approval: { status: 'pending' } })
  refresh(`/portal/admin/projects/${projectId}`, `/portal/projects/${projectId}`)
}

/* ───────────── invoices ───────────── */

function parseItems(form: FormData): InvoiceItem[] {
  const desc = form.getAll('itemDescription').map(String)
  const qty = form.getAll('itemQuantity').map(Number)
  const rate = form.getAll('itemRate').map(Number)
  return desc
    .map((d, i) => ({ description: d.trim(), quantity: qty[i] || 0, unitAmount: Math.round((rate[i] || 0) * 100) }))
    .filter((it) => it.description && it.quantity > 0 && it.unitAmount > 0)
}

export async function createInvoiceAction(clientId: string, _: FormState, form: FormData): Promise<FormState> {
  await requireAdmin()
  const items = parseItems(form)
  const title = str(form, 'title')
  if (!title) return { error: 'Give the invoice a title.' }
  if (!items.length) return { error: 'Add at least one line item with a quantity and rate.' }
  const send = form.get('intent') === 'send'
  const inv = await createInvoice({ clientId, projectId: opt(form, 'projectId'), title, items, dueDate: opt(form, 'dueDate'), notes: opt(form, 'notes'), send })
  if (send) await afterInvoiceSent(inv.id)
  redirect(`/portal/admin/invoices/${inv.id}`)
}

async function afterInvoiceSent(invoiceId: string) {
  const inv = await getInvoice(invoiceId)
  if (!inv) return
  await logActivity({ clientId: inv.clientId, projectId: inv.projectId, actor: 'admin', text: `Invoice ${inv.number} issued (${money(invoiceTotal(inv))})`, href: `/portal/invoices/${inv.id}` })
  const client = await getClient(inv.clientId)
  if (client) {
    await sendEmail(
      client.email,
      `Invoice ${inv.number} from Felipe Cantu Jr`,
      `Hi ${client.name.split(' ')[0]},\n\nInvoice ${inv.number} for ${inv.title} (${money(invoiceTotal(inv))}) is ready. You can view and pay it securely online.`,
      `${await siteOrigin()}/portal/invoices/${inv.id}`
    )
  }
}

export async function setInvoiceStatusAction(invoiceId: string, status: InvoiceStatus) {
  await requireAdmin()
  const inv = await getInvoice(invoiceId)
  if (!inv) return
  const now = new Date().toISOString()
  await saveInvoice({
    ...inv,
    status,
    sentAt: status === 'open' ? inv.sentAt ?? now : inv.sentAt,
    paidAt: status === 'paid' ? inv.paidAt ?? now : status === 'open' ? undefined : inv.paidAt,
  })
  if (status === 'open' && inv.status === 'draft') await afterInvoiceSent(invoiceId)
  if (status === 'paid' && inv.status !== 'paid') {
    await logActivity({ clientId: inv.clientId, projectId: inv.projectId, actor: 'admin', text: `Invoice ${inv.number} marked as paid` })
  }
  refresh(`/portal/admin/invoices/${invoiceId}`, `/portal/admin/clients/${inv.clientId}`, '/portal/invoices')
}

export async function deleteInvoiceAction(invoiceId: string) {
  await requireAdmin()
  const inv = await getInvoice(invoiceId)
  if (!inv) return
  await deleteInvoice(invoiceId)
  redirect(`/portal/admin/clients/${inv.clientId}`)
}

/* ───────────── helpers ───────────── */

async function emailClient(clientId: string, projectId: string, subject: string, text: string, hash = '') {
  const client = await getClient(clientId)
  if (!client) return
  await sendEmail(client.email, subject, text, `${await siteOrigin()}/portal/projects/${projectId}${hash}`)
}
