'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import {
  addFile, addMessage, authenticateClient, getFile, logActivity, rateLimit, saveFile, saveProject,
} from '@/lib/portal/db'
import { createCheckoutUrl } from '@/lib/portal/payments'
import {
  endSession, requireClientInvoice, requireClientProject, siteOrigin, startClientSession,
} from '@/lib/portal/session'
import { notifyAdmin } from '@/lib/portal/notify'
import { isBlobUrl } from '@/lib/portal/blob'

export type FormState = { error?: string; ok?: string } | undefined

async function clientIp() {
  const h = await headers()
  return h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local'
}

/* ───────────── auth ───────────── */

export async function loginAction(_: FormState, form: FormData): Promise<FormState> {
  const email = String(form.get('email') ?? '').trim()
  const code = String(form.get('code') ?? '')
  if (!email || !code) return { error: 'Enter your email and access code.' }

  if (!(await rateLimit(`login:${await clientIp()}`, 10, 15 * 60))) {
    return { error: 'Too many attempts. Please wait 15 minutes and try again.' }
  }
  const client = await authenticateClient(email, code)
  if (!client) return { error: "That email and access code don't match. Check the code Felipe sent you." }

  await startClientSession(client.id, client.sessionVersion)
  redirect('/portal')
}

export async function logoutAction() {
  await endSession('client')
  redirect('/portal/login')
}

/* ───────────── project collaboration ───────────── */

export async function sendMessageAction(projectId: string, _: FormState, form: FormData): Promise<FormState> {
  const { client, project } = await requireClientProject(projectId)
  if (!project) return { error: 'Project not found.' }
  const body = String(form.get('body') ?? '').trim()
  if (!body) return { error: 'Write a message first.' }
  if (!(await rateLimit(`msg:${client.id}`, 30, 60 * 10))) return { error: 'Slow down a little and try again shortly.' }

  await addMessage(projectId, 'client', body)
  await logActivity({ clientId: client.id, projectId, actor: 'client', text: `${client.name} sent a message`, href: `/portal/admin/projects/${projectId}#messages` })
  await notifyAdmin(
    `New message from ${client.name} — ${project.name}`,
    `${client.name} wrote:\n\n${body}`,
    `${await siteOrigin()}/portal/admin/projects/${projectId}#messages`
  )
  revalidatePath(`/portal/projects/${projectId}`)
  return { ok: 'sent' }
}

export async function reviewFileAction(projectId: string, fileId: string, _: FormState, form: FormData): Promise<FormState> {
  const { client, project } = await requireClientProject(projectId)
  if (!project) return { error: 'Project not found.' }
  const file = await getFile(projectId, fileId)
  if (!file || !file.requiresApproval) return { error: 'File not found.' }

  const decision = form.get('decision') === 'approve' ? 'approved' : 'changes_requested'
  const note = String(form.get('note') ?? '').trim().slice(0, 2000) || undefined
  if (decision === 'changes_requested' && !note) return { error: 'Tell Felipe what you would like changed.' }

  await saveFile({ ...file, approval: { status: decision, note, at: new Date().toISOString() } })
  const verb = decision === 'approved' ? 'approved' : 'requested changes on'
  await logActivity({ clientId: client.id, projectId, actor: 'client', text: `${client.name} ${verb} “${file.name}”`, href: `/portal/admin/projects/${projectId}#files` })
  await notifyAdmin(
    `${client.name} ${verb} ${file.name}`,
    `${client.name} ${verb} “${file.name}” on ${project.name}.${note ? `\n\nNote: ${note}` : ''}`,
    `${await siteOrigin()}/portal/admin/projects/${projectId}#files`
  )
  revalidatePath(`/portal/projects/${projectId}`)
  revalidatePath('/portal')
  return { ok: decision }
}

export async function toggleClientTaskAction(projectId: string, taskId: string) {
  const { client, project } = await requireClientProject(projectId)
  if (!project) return
  const task = project.clientTasks.find((t) => t.id === taskId)
  if (!task) return
  const done = !task.done
  await saveProject({
    ...project,
    clientTasks: project.clientTasks.map((t) => (t.id === taskId ? { ...t, done, doneAt: done ? new Date().toISOString() : undefined } : t)),
  })
  if (done) {
    await logActivity({ clientId: client.id, projectId, actor: 'client', text: `${client.name} completed “${task.title}”`, href: `/portal/admin/projects/${projectId}` })
  }
  revalidatePath(`/portal/projects/${projectId}`)
  revalidatePath('/portal')
}

/** Called after a browser upload to Vercel Blob finishes. */
export async function recordClientUploadAction(
  projectId: string,
  file: { url: string; name: string; size: number; contentType: string; note?: string }
): Promise<FormState> {
  const { client, project } = await requireClientProject(projectId)
  if (!project) return { error: 'Project not found.' }
  if (!isBlobUrl(file.url)) return { error: 'Upload failed. Please try again.' }

  await addFile({
    projectId,
    name: file.name.slice(0, 200),
    url: file.url,
    kind: 'upload',
    size: file.size,
    contentType: file.contentType,
    uploadedBy: 'client',
    note: file.note?.slice(0, 1000),
    requiresApproval: false,
  })
  await logActivity({ clientId: client.id, projectId, actor: 'client', text: `${client.name} uploaded “${file.name}”`, href: `/portal/admin/projects/${projectId}#files` })
  await notifyAdmin(`${client.name} uploaded a file`, `${client.name} uploaded “${file.name}” to ${project.name}.`, `${await siteOrigin()}/portal/admin/projects/${projectId}#files`)
  revalidatePath(`/portal/projects/${projectId}`)
  return { ok: 'uploaded' }
}

export async function shareLinkAction(projectId: string, _: FormState, form: FormData): Promise<FormState> {
  const { client, project } = await requireClientProject(projectId)
  if (!project) return { error: 'Project not found.' }
  const url = String(form.get('url') ?? '').trim()
  const name = String(form.get('name') ?? '').trim() || url
  if (!/^https?:\/\//i.test(url)) return { error: 'Paste a full link starting with https://' }

  await addFile({ projectId, name: name.slice(0, 200), url, kind: 'link', uploadedBy: 'client', requiresApproval: false })
  await logActivity({ clientId: client.id, projectId, actor: 'client', text: `${client.name} shared a link: “${name}”`, href: `/portal/admin/projects/${projectId}#files` })
  revalidatePath(`/portal/projects/${projectId}`)
  return { ok: 'shared' }
}

/* ───────────── payments ───────────── */

export async function payInvoiceAction(invoiceId: string) {
  const { client, invoice } = await requireClientInvoice(invoiceId)
  if (!invoice || invoice.status !== 'open') redirect('/portal/invoices')
  const url = await createCheckoutUrl(invoice, client.email, await siteOrigin())
  redirect(url)
}
