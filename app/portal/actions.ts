'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import {
  addFile, addMessage, authenticateClient, checkClientPassword, consumeResetToken, contractHash, createResetToken,
  getViewerByEmail, getContract, getFile, logActivity, passwordProblem, rateLimit, saveContract, saveFile,
  saveProject, setClientPassword, upsertReview, changeOrders, nextTicketNumber, previews, proposalExpired, proposals,
  saveEmailPrefs, tickets, newId,
} from '@/lib/portal/db'
import { createAutopaySetupUrl, createCheckoutUrl, disableAutopay, paymentsEnabled } from '@/lib/portal/payments'
import { acceptProposal, approveChange } from '@/lib/portal/deals'
import { money } from '@/lib/portal/format'
import type { EmailPrefs, TicketKind, TicketPriority } from '@/lib/portal/types'
import {
  currentClient, endSession, requireClientInvoice, requireClientProject, siteOrigin, startClientSession,
} from '@/lib/portal/session'
import { emailEnabled, notifyAdmin, sendEmail } from '@/lib/portal/notify'
import { isBlobUrl } from '@/lib/portal/blob'

export type FormState = { error?: string; ok?: string } | undefined

async function clientIp() {
  const h = await headers()
  return h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local'
}

/* ───────────── auth ───────────── */

export async function loginAction(_: FormState, form: FormData): Promise<FormState> {
  const email = String(form.get('email') ?? '').trim()
  const secret = String(form.get('password') ?? '')
  if (!email || !secret) return { error: 'Enter your email and password.' }

  if (!(await rateLimit(`login:${await clientIp()}`, 10, 15 * 60))) {
    return { error: 'Too many attempts. Please wait 15 minutes and try again.' }
  }
  const result = await authenticateClient(email, secret)
  if (!result) return { error: "That email and password don't match." }

  await startClientSession(result.client.id, result.client.sessionVersion, result.client.contactId)
  redirect(result.needsPassword ? '/portal/set-password' : '/portal')
}

/** First sign-in: the client picks the password they'll use from now on. */
export async function setPasswordAction(_: FormState, form: FormData): Promise<FormState> {
  const client = await currentClient()
  if (!client) redirect('/portal/login')
  const password = String(form.get('password') ?? '')
  const problem = passwordProblem(password, String(form.get('confirm') ?? ''))
  if (problem) return { error: problem }

  const updated = await setClientPassword(client.id, password, client.contactId)
  await startClientSession(updated.id, updated.sessionVersion, updated.contactId)
  redirect('/portal')
}

export async function changePasswordAction(_: FormState, form: FormData): Promise<FormState> {
  const client = await currentClient()
  if (!client) redirect('/portal/login')
  if (!(await rateLimit(`pwchange:${client.id}`, 10, 15 * 60))) return { error: 'Too many attempts. Try again later.' }
  if (!checkClientPassword(client, String(form.get('current') ?? ''))) return { error: 'Your current password is incorrect.' }
  const password = String(form.get('password') ?? '')
  const problem = passwordProblem(password, String(form.get('confirm') ?? ''))
  if (problem) return { error: problem }

  const updated = await setClientPassword(client.id, password, client.contactId)
  await startClientSession(updated.id, updated.sessionVersion, updated.contactId)
  return { ok: 'Password updated. Other devices have been signed out.' }
}

export async function forgotPasswordAction(_: FormState, form: FormData): Promise<FormState> {
  const email = String(form.get('email') ?? '').trim()
  if (!/^\S+@\S+\.\S+$/.test(email)) return { error: 'Enter the email you use for the portal.' }
  if (!emailEnabled()) return { error: 'Password reset by email isn’t available. Please contact Felipe for a new access code.' }
  if (!(await rateLimit(`forgot:${await clientIp()}`, 5, 15 * 60))) return { error: 'Too many requests. Try again in 15 minutes.' }

  const client = await getViewerByEmail(email)
  if (client) {
    const token = await createResetToken(client.id, client.contactId)
    await sendEmail(
      client.email,
      'Reset your portal password',
      `Hi ${client.name.split(' ')[0]},\n\nSomeone (hopefully you) asked to reset your client portal password. Use the button below within the next hour to choose a new one.\n\nIf you didn't ask for this, you can ignore this email.`,
      `${await siteOrigin()}/portal/reset?token=${token}`,
      'Choose a new password'
    )
  }
  // Same answer either way, so this can't be used to discover who is a client
  return { ok: 'If that email has a portal account, a reset link is on its way. Check your inbox (and spam).' }
}

export async function resetPasswordAction(token: string, _: FormState, form: FormData): Promise<FormState> {
  const password = String(form.get('password') ?? '')
  const problem = passwordProblem(password, String(form.get('confirm') ?? ''))
  if (problem) return { error: problem }
  const client = await consumeResetToken(token)
  if (!client) return { error: 'This reset link has expired or was already used. Request a new one.' }

  const updated = await setClientPassword(client.id, password, client.contactId)
  await startClientSession(updated.id, updated.sessionVersion, updated.contactId)
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

/* ───────────── agreements ───────────── */

export async function signContractAction(contractId: string, _: FormState, form: FormData): Promise<FormState> {
  const client = await currentClient()
  if (!client) redirect('/portal/login')
  const contract = await getContract(contractId)
  if (!contract || contract.clientId !== client.id) return { error: 'Agreement not found.' }
  if (contract.status === 'signed') return { ok: 'Already signed.' }
  if (contract.status !== 'sent') return { error: 'This agreement is no longer open for signing.' }

  const name = String(form.get('name') ?? '').trim().replace(/\s+/g, ' ')
  if (form.get('agree') !== 'on') return { error: 'Tick the box to confirm you agree.' }
  if (name.length < 3) return { error: 'Type your full name to sign.' }

  const h = await headers()
  const signedAt = new Date().toISOString()
  await saveContract({
    ...contract,
    status: 'signed',
    signedAt,
    signature: {
      name,
      email: client.email,
      ip: h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown',
      userAgent: (h.get('user-agent') ?? '').slice(0, 300),
      contentHash: contractHash(contract),
    },
  })
  await logActivity({ clientId: client.id, projectId: contract.projectId, actor: 'client', text: `${client.name} signed “${contract.title}”`, href: `/portal/admin/contracts/${contract.id}` })
  const link = `${await siteOrigin()}/portal/contracts/${contract.id}`
  await notifyAdmin(`${client.name} signed ${contract.title}`, `${client.name} signed “${contract.title}” as “${name}”.`, `${await siteOrigin()}/portal/admin/contracts/${contract.id}`)
  await sendEmail(
    client.email,
    `Signed: ${contract.title}`,
    `Hi ${client.name.split(' ')[0]},\n\nThanks for signing “${contract.title}”. A copy is always available in your portal, where you can print it or save it as a PDF.`,
    link,
    'View signed agreement'
  )
  revalidatePath(`/portal/contracts/${contractId}`)
  revalidatePath(`/portal/projects/${contract.projectId}`)
  revalidatePath('/portal')
  return { ok: 'signed' }
}

/* ───────────── reviews ───────────── */

export async function submitReviewAction(projectId: string, _: FormState, form: FormData): Promise<FormState> {
  const { client, project } = await requireClientProject(projectId)
  if (!project) return { error: 'Project not found.' }
  const rating = Math.round(Number(form.get('rating')))
  const text = String(form.get('text') ?? '').trim().slice(0, 1200)
  if (!(rating >= 1 && rating <= 5)) return { error: 'Pick a star rating.' }
  if (text.length < 10) return { error: 'Add a sentence or two about your experience.' }
  if (!(await rateLimit(`review:${client.id}`, 10, 60 * 60))) return { error: 'Please try again later.' }

  const allowPublish = form.get('allowPublish') === 'on'
  const displayName = String(form.get('displayName') ?? '').trim().slice(0, 80) || client.name
  await upsertReview({
    clientId: client.id,
    projectId,
    rating,
    text,
    displayName,
    role: String(form.get('role') ?? '').trim().slice(0, 80) || undefined,
    company: client.company,
    allowPublish,
  })
  await logActivity({ clientId: client.id, projectId, actor: 'client', text: `${client.name} left a ${rating}-star review`, href: '/portal/admin/reviews' })
  await notifyAdmin(
    `New ${rating}-star review from ${client.name}`,
    `${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}\n\n“${text}”\n\n${allowPublish ? 'They are happy for it to appear on your website.' : 'They asked to keep it private.'}`,
    `${await siteOrigin()}/portal/admin/reviews`
  )
  revalidatePath(`/portal/projects/${projectId}`)
  revalidatePath('/portal')
  return { ok: 'thanks' }
}


/* ───────────── accounts & access ───────────── */

export async function markAccessInvitedAction(projectId: string, itemId: string) {
  const { client, project } = await requireClientProject(projectId)
  if (!project) return
  const item = project.access?.find((a) => a.id === itemId)
  if (!item || item.status !== 'todo') return
  await saveProject({
    ...project,
    access: project.access!.map((a) => (a.id === itemId ? { ...a, status: 'invited' as const, invitedAt: new Date().toISOString() } : a)),
  })
  await logActivity({ clientId: client.id, projectId, actor: 'client', text: `${client.name} sent you access to ${item.name}`, href: `/portal/admin/projects/${projectId}#access` })
  await notifyAdmin(
    `${client.name} gave you access: ${item.name}`,
    `${client.name} says they've ${item.records?.length ? 'added the DNS records' : 'sent you an invite'} for ${item.name} on ${project.name}. Check your email for the invite, accept it, then mark it confirmed in the portal.`,
    `${await siteOrigin()}/portal/admin/projects/${projectId}#access`
  )
  revalidatePath(`/portal/projects/${projectId}`)
  revalidatePath('/portal')
}


/* ───────────── proposals ───────────── */

export async function acceptProposalAction(projectId: string, proposalId: string, _: FormState, form: FormData): Promise<FormState> {
  const { client, project } = await requireClientProject(projectId)
  const proposal = project ? await proposals.get(projectId, proposalId) : null
  if (!project || !proposal || proposal.status === 'draft') return { error: 'Proposal not found.' }
  if (proposal.status === 'accepted') return { ok: 'accepted' }
  if (proposal.status !== 'sent') return { error: 'This proposal is no longer open.' }
  if (proposalExpired(proposal)) return { error: 'This proposal has expired. Message Felipe for an updated one.' }

  const optionId = String(form.get('option') ?? '')
  if (!proposal.options.some((o) => o.id === optionId)) return { error: 'Choose one of the options first.' }
  const name = String(form.get('name') ?? '').trim().replace(/\s+/g, ' ')
  if (form.get('agree') !== 'on') return { error: 'Tick the box to confirm you accept.' }
  if (name.length < 3) return { error: 'Type your full name to accept.' }

  await acceptProposal(proposal, optionId, client, name, await clientIp(), await siteOrigin())
  revalidatePath(`/portal/projects/${projectId}`)
  revalidatePath('/portal')
  redirect(`/portal/projects/${projectId}/proposals/${proposalId}`)
}

export async function declineProposalAction(projectId: string, proposalId: string, _: FormState, form: FormData): Promise<FormState> {
  const { client, project } = await requireClientProject(projectId)
  const proposal = project ? await proposals.get(projectId, proposalId) : null
  if (!project || !proposal || proposal.status !== 'sent') return { error: 'This proposal is no longer open.' }
  const note = String(form.get('note') ?? '').trim().slice(0, 2000) || undefined
  await proposals.save({ ...proposal, status: 'declined', decidedAt: new Date().toISOString(), declineNote: note })
  await logActivity({ clientId: client.id, projectId, actor: 'client', text: `${client.name} declined the proposal “${proposal.title}”`, href: `/portal/admin/projects/${projectId}/proposals/${proposalId}` })
  await notifyAdmin(
    `Proposal declined: ${proposal.title}`,
    `${client.name} declined “${proposal.title}” on ${project.name}.${note ? `\n\nThey said: ${note}` : ''}`,
    `${await siteOrigin()}/portal/admin/projects/${projectId}/proposals/${proposalId}`
  )
  revalidatePath(`/portal/projects/${projectId}`)
  revalidatePath('/portal')
  return { ok: 'declined' }
}

/* ───────────── change requests ───────────── */

export async function decideChangeAction(projectId: string, changeId: string, _: FormState, form: FormData): Promise<FormState> {
  const { client, project } = await requireClientProject(projectId)
  const change = project ? await changeOrders.get(projectId, changeId) : null
  if (!project || !change) return { error: 'Change request not found.' }
  if (change.status !== 'sent') return { ok: change.status }
  const note = String(form.get('note') ?? '').trim().slice(0, 2000) || undefined

  if (form.get('decision') === 'approve') {
    await approveChange(change, client, await siteOrigin(), note)
  } else {
    await changeOrders.save({ ...change, status: 'declined', decidedAt: new Date().toISOString(), decidedBy: client.name, note })
    await logActivity({ clientId: client.id, projectId, actor: 'client', text: `${client.name} declined the change request “${change.title}”`, href: `/portal/admin/projects/${projectId}#changes` })
    await notifyAdmin(`Change declined: ${change.title}`, `${client.name} declined “${change.title}” (${money(change.price)}) on ${project.name}.${note ? `\n\nNote: ${note}` : ''}`, `${await siteOrigin()}/portal/admin/projects/${projectId}#changes`)
  }
  revalidatePath(`/portal/projects/${projectId}`)
  revalidatePath('/portal')
  return { ok: 'done' }
}

/* ───────────── site previews ───────────── */

export async function reviewPreviewAction(projectId: string, previewId: string, _: FormState, form: FormData): Promise<FormState> {
  const { client, project } = await requireClientProject(projectId)
  const preview = project ? await previews.get(projectId, previewId) : null
  if (!project || !preview) return { error: 'Preview not found.' }
  const approved = form.get('decision') === 'approve'
  const note = String(form.get('note') ?? '').trim().slice(0, 3000) || undefined
  if (!approved && !note) return { error: 'Tell Felipe what you would like changed.' }

  await previews.save({ ...preview, status: approved ? 'approved' : 'changes_requested', feedback: note, decidedAt: new Date().toISOString(), decidedBy: client.name })
  const verb = approved ? 'approved the preview' : 'requested changes on the preview'
  await logActivity({ clientId: client.id, projectId, actor: 'client', text: `${client.name} ${verb} “${preview.title}”`, href: `/portal/admin/projects/${projectId}#previews` })
  await notifyAdmin(
    approved ? `Approved to go live: ${preview.title}` : `Changes requested: ${preview.title}`,
    `${client.name} ${verb} “${preview.title}” on ${project.name}.${note ? `\n\n${approved ? 'Note' : 'What to change'}: ${note}` : ''}`,
    `${await siteOrigin()}/portal/admin/projects/${projectId}#previews`
  )
  revalidatePath(`/portal/projects/${projectId}`)
  revalidatePath(`/portal/projects/${projectId}/preview/${previewId}`)
  revalidatePath('/portal')
  return { ok: approved ? 'approved' : 'changes_requested' }
}

/* ───────────── support requests ───────────── */

const TICKET_KINDS: TicketKind[] = ['bug', 'change', 'question']
const TICKET_PRIORITIES: TicketPriority[] = ['low', 'normal', 'urgent']

export async function createTicketAction(projectId: string, _: FormState, form: FormData): Promise<FormState> {
  const { client, project } = await requireClientProject(projectId)
  if (!project) return { error: 'Project not found.' }
  const title = String(form.get('title') ?? '').trim().slice(0, 140)
  const body = String(form.get('body') ?? '').trim().slice(0, 5000)
  if (title.length < 3 || body.length < 5) return { error: 'Add a short title and describe what you need.' }
  if (!(await rateLimit(`ticket:${client.id}`, 20, 60 * 60))) return { error: 'Slow down a little and try again shortly.' }
  const kind = TICKET_KINDS.find((k) => k === form.get('kind')) ?? 'question'
  const priority = TICKET_PRIORITIES.find((p) => p === form.get('priority')) ?? 'normal'
  const pageUrl = String(form.get('pageUrl') ?? '').trim().slice(0, 500)
  const at = new Date().toISOString()
  const ticket = await tickets.save({
    id: newId(),
    number: await nextTicketNumber(),
    clientId: client.id,
    projectId,
    title,
    body,
    pageUrl: /^https?:\/\//i.test(pageUrl) ? pageUrl : undefined,
    kind,
    priority,
    status: 'open',
    openedBy: client.name,
    createdAt: at,
    updatedAt: at,
    replies: [],
  })
  await logActivity({ clientId: client.id, projectId, actor: 'client', text: `${client.name} opened support request #${ticket.number}: ${title}`, href: `/portal/admin/projects/${projectId}#support` })
  await notifyAdmin(
    `${priority === 'urgent' ? 'URGENT: ' : ''}Support request #${ticket.number} — ${title}`,
    `${client.name} opened a ${kind === 'bug' ? 'bug report' : kind === 'change' ? 'change request' : 'question'} on ${project.name} (priority: ${priority}).\n\n${body}${ticket.pageUrl ? `\n\nPage: ${ticket.pageUrl}` : ''}`,
    `${await siteOrigin()}/portal/admin/projects/${projectId}#support`
  )
  revalidatePath(`/portal/projects/${projectId}`)
  return { ok: 'sent' }
}

export async function replyTicketAction(projectId: string, ticketId: string, _: FormState, form: FormData): Promise<FormState> {
  const { client, project } = await requireClientProject(projectId)
  const ticket = project ? await tickets.get(projectId, ticketId) : null
  if (!project || !ticket) return { error: 'Request not found.' }
  const body = String(form.get('body') ?? '').trim().slice(0, 5000)
  if (!body) return { error: 'Write a reply first.' }
  if (!(await rateLimit(`msg:${client.id}`, 30, 60 * 10))) return { error: 'Slow down a little and try again shortly.' }
  await tickets.save({
    ...ticket,
    // A reply on a finished request reopens it
    status: ticket.status === 'done' || ticket.status === 'waiting' ? 'open' : ticket.status,
    closedAt: undefined,
    updatedAt: new Date().toISOString(),
    replies: [...ticket.replies, { from: 'client', name: client.name, body, at: new Date().toISOString() }],
  })
  await notifyAdmin(`Reply on support request #${ticket.number} — ${ticket.title}`, `${client.name} wrote:\n\n${body}`, `${await siteOrigin()}/portal/admin/projects/${projectId}#support`)
  revalidatePath(`/portal/projects/${projectId}`)
  return { ok: 'sent' }
}

export async function resolveTicketAction(projectId: string, ticketId: string) {
  const { client, project } = await requireClientProject(projectId)
  const ticket = project ? await tickets.get(projectId, ticketId) : null
  if (!project || !ticket || ticket.status === 'done') return
  const at = new Date().toISOString()
  await tickets.save({ ...ticket, status: 'done', closedAt: at, updatedAt: at })
  await logActivity({ clientId: client.id, projectId, actor: 'client', text: `${client.name} marked support request #${ticket.number} as resolved`, href: `/portal/admin/projects/${projectId}#support` })
  revalidatePath(`/portal/projects/${projectId}`)
}

/* ───────────── email settings ───────────── */

export async function saveEmailPrefsAction(_: FormState, form: FormData): Promise<FormState> {
  const client = await currentClient()
  if (!client) redirect('/portal/login')
  const prefs: EmailPrefs = {
    messages: form.get('messages') === 'on',
    files: form.get('files') === 'on',
    // The account owner always gets invoices and agreements
    billing: client.contactId ? form.get('billing') === 'on' : true,
    updates: form.get('updates') === 'on',
  }
  await saveEmailPrefs(client, prefs)
  revalidatePath('/portal/account')
  return { ok: 'saved' }
}

/* ───────────── care plan auto-pay ───────────── */

export async function startAutopayAction(projectId: string) {
  const { client, project } = await requireClientProject(projectId)
  if (!project?.carePlan?.active || !paymentsEnabled()) redirect(`/portal/projects/${projectId}#care`)
  redirect(await createAutopaySetupUrl(client, project, await siteOrigin()))
}

export async function stopAutopayAction(projectId: string) {
  const { client, project } = await requireClientProject(projectId)
  if (!project?.carePlan?.autopay) return
  if (await disableAutopay(projectId)) {
    await logActivity({ clientId: client.id, projectId, actor: 'client', text: `${client.name} turned off auto-pay for the care plan`, href: `/portal/admin/projects/${projectId}#care` })
    await notifyAdmin(`Auto-pay turned off: ${project.name}`, `${client.name} turned off auto-pay for the ${project.name} care plan. Monthly invoices will be emailed for them to pay by hand again.`)
  }
  revalidatePath(`/portal/projects/${projectId}`)
}
