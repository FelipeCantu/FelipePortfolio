'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import {
  changeOrders, createContact, getClient, getContact, getProject, getSettings, logActivity, newId, previews, proposals,
  removeContact, resetContactCode, saveProject, saveSettings, tickets,
} from '@/lib/portal/db'
import { requireAdmin, siteOrigin } from '@/lib/portal/session'
import { emailEnabled, sendEmail } from '@/lib/portal/notify'
import { emailPeople } from '@/lib/portal/people'
import { disableAutopay } from '@/lib/portal/payments'
import { sendWeeklyUpdate } from '@/lib/portal/weekly'
import { money } from '@/lib/portal/format'
import type { EmailPrefs, Proposal, ProposalOption, TicketStatus } from '@/lib/portal/types'
import type { FormState } from '@/app/portal/actions'
import type { CredentialState } from '@/app/portal/admin/actions'

const str = (form: FormData, key: string) => String(form.get(key) ?? '').trim()
const opt = (form: FormData, key: string) => str(form, key) || undefined
const cents = (raw: string) => Math.round(Number(raw.replace(/[$,\s]/g, '')) * 100)
const lines = (raw: string, max = 12) => raw.split('\n').map((l) => l.trim()).filter(Boolean).slice(0, max).map((l) => l.slice(0, 200))
const first = (name: string) => name.split(' ')[0]

function refreshProject(projectId: string) {
  revalidatePath(`/portal/admin/projects/${projectId}`)
  revalidatePath(`/portal/projects/${projectId}`)
  revalidatePath('/portal')
  revalidatePath('/portal/admin')
}

/* ───────────── proposals ───────────── */

function parseOptions(form: FormData, existing: ProposalOption[] = []) {
  const options: ProposalOption[] = []
  let problem: string | undefined
  for (let i = 0; i < 3; i++) {
    const name = str(form, `name${i}`)
    const priceRaw = str(form, `price${i}`)
    if (!name && !priceRaw) continue
    const price = cents(priceRaw)
    if (!name || !Number.isFinite(price) || price <= 0) {
      problem = `Option ${i + 1} needs a name and a price.`
      continue
    }
    options.push({
      id: existing[options.length]?.id ?? newId(),
      name: name.slice(0, 80),
      price,
      timeline: opt(form, `timeline${i}`)?.slice(0, 80),
      description: opt(form, `description${i}`)?.slice(0, 600),
      includes: lines(str(form, `includes${i}`), 15),
      recommended: str(form, 'recommended') === String(i),
    })
  }
  return { options, problem }
}

async function sendProposal(proposal: Proposal) {
  const project = await getProject(proposal.projectId)
  const client = await getClient(proposal.clientId)
  if (!project || !client) return
  await proposals.save({ ...proposal, status: 'sent', sentAt: new Date().toISOString(), decidedAt: undefined, declineNote: undefined })
  await logActivity({ clientId: client.id, projectId: project.id, actor: 'admin', text: `Proposal ready for you: ${proposal.title}`, href: `/portal/projects/${project.id}/proposals/${proposal.id}` })
  const from = Math.min(...proposal.options.map((o) => o.price))
  await emailPeople(
    client.id,
    'billing',
    `Your proposal: ${proposal.title}`,
    `Hi ${first(client.name)},\n\nYour proposal for ${project.name} is ready${proposal.options.length > 1 ? `, with ${proposal.options.length} options starting at ${money(from)}` : ` (${money(from)})`}. You can read it and accept it online${proposal.validUntil ? `. It's valid until ${proposal.validUntil}` : ''}.\n\nQuestions or want something adjusted? Just send me a message in the portal.`,
    `${await siteOrigin()}/portal/projects/${project.id}/proposals/${proposal.id}`,
    'View proposal'
  )
}

/** Creates a proposal (proposalId empty) or updates a draft, and optionally sends it. */
export async function saveProposalAction(projectId: string, proposalId: string, _: FormState, form: FormData): Promise<FormState> {
  await requireAdmin()
  const project = await getProject(projectId)
  if (!project) return { error: 'Project not found.' }
  const existing = proposalId ? await proposals.get(projectId, proposalId) : null
  if (proposalId && !existing) return { error: 'Proposal not found.' }
  if (existing && existing.status !== 'draft') return { error: 'Only drafts can be edited. Withdraw it first to make changes.' }

  const title = str(form, 'title').slice(0, 140)
  const { options, problem } = parseOptions(form, existing?.options)
  if (!title) return { error: 'Give the proposal a title.' }
  if (problem) return { error: problem }
  if (!options.length) return { error: 'Add at least one option with a name and a price.' }
  const validUntil = opt(form, 'validUntil')
  if (validUntil && !/^\d{4}-\d{2}-\d{2}$/.test(validUntil)) return { error: 'Use a valid date for "valid until".' }

  const proposal: Proposal = {
    id: existing?.id ?? newId(),
    clientId: project.clientId,
    projectId,
    title,
    intro: opt(form, 'intro')?.slice(0, 4000),
    options,
    validUntil,
    autoContract: form.get('autoContract') === 'on',
    autoDeposit: form.get('autoDeposit') === 'on',
    status: 'draft',
    createdAt: existing?.createdAt ?? new Date().toISOString(),
  }
  await proposals.save(proposal)
  if (form.get('intent') === 'send') await sendProposal(proposal)
  refreshProject(projectId)
  redirect(`/portal/admin/projects/${projectId}/proposals/${proposal.id}`)
}

export async function sendProposalAction(projectId: string, proposalId: string) {
  await requireAdmin()
  const proposal = await proposals.get(projectId, proposalId)
  if (!proposal || proposal.status !== 'draft') return
  await sendProposal(proposal)
  refreshProject(projectId)
  revalidatePath(`/portal/admin/projects/${projectId}/proposals/${proposalId}`)
}

/** Pulls a sent (or declined) proposal back to a draft so it can be edited and re-sent. */
export async function withdrawProposalAction(projectId: string, proposalId: string) {
  await requireAdmin()
  const proposal = await proposals.get(projectId, proposalId)
  if (!proposal || (proposal.status !== 'sent' && proposal.status !== 'declined')) return
  await proposals.save({ ...proposal, status: 'draft', sentAt: undefined, decidedAt: undefined })
  refreshProject(projectId)
  revalidatePath(`/portal/admin/projects/${projectId}/proposals/${proposalId}`)
}

export async function deleteProposalAction(projectId: string, proposalId: string) {
  await requireAdmin()
  const proposal = await proposals.get(projectId, proposalId)
  if (!proposal || proposal.status === 'accepted') return // accepted proposals are kept as a record
  await proposals.remove(projectId, proposalId)
  refreshProject(projectId)
  redirect(`/portal/admin/projects/${projectId}`)
}

/* ───────────── change requests ───────────── */

export async function createChangeAction(projectId: string, _: FormState, form: FormData): Promise<FormState> {
  await requireAdmin()
  const project = await getProject(projectId)
  if (!project) return { error: 'Project not found.' }
  const title = str(form, 'title').slice(0, 140)
  const description = str(form, 'description').slice(0, 3000)
  const price = cents(str(form, 'price') || '0')
  if (!title || description.length < 5) return { error: 'Add a title and describe the extra work.' }
  if (!Number.isFinite(price) || price < 0) return { error: 'Enter the price as a number, e.g. 350 (0 for no charge).' }
  const addDays = Math.max(0, Math.min(365, Math.round(Number(str(form, 'addDays')) || 0)))
  const change = await changeOrders.save({
    id: newId(),
    clientId: project.clientId,
    projectId,
    title,
    description,
    price,
    addDays: addDays || undefined,
    billing: str(form, 'billing') === 'now' ? 'now' : 'balance',
    status: 'sent',
    createdAt: new Date().toISOString(),
  })
  await logActivity({ clientId: project.clientId, projectId, actor: 'admin', text: `Change request for your approval: ${title} (${money(price)})`, href: `/portal/projects/${projectId}#changes` })
  const client = await getClient(project.clientId)
  if (client) {
    await emailPeople(
      client.id,
      'billing',
      `Please approve: ${title}`,
      `Hi ${first(client.name)},\n\nThe work below is outside what we originally agreed for ${project.name}, so I've priced it separately. Nothing happens until you approve it.\n\n${title}\n${description}\n\nPrice: ${money(price)}${change.addDays ? `\nAdds about ${change.addDays} day${change.addDays === 1 ? '' : 's'} to the timeline` : ''}\n${change.billing === 'now' ? 'Invoiced when you approve.' : 'Added to your remaining balance.'}`,
      `${await siteOrigin()}/portal/projects/${projectId}#changes`,
      'Approve or decline'
    )
  }
  refreshProject(projectId)
  return { ok: 'sent' }
}

export async function deleteChangeAction(projectId: string, changeId: string) {
  await requireAdmin()
  const change = await changeOrders.get(projectId, changeId)
  if (!change || change.status === 'approved') return // approved changes are part of the price
  await changeOrders.remove(projectId, changeId)
  refreshProject(projectId)
}

/* ───────────── site previews ───────────── */

export async function createPreviewAction(projectId: string, _: FormState, form: FormData): Promise<FormState> {
  await requireAdmin()
  const project = await getProject(projectId)
  if (!project) return { error: 'Project not found.' }
  const title = str(form, 'title').slice(0, 120)
  const url = str(form, 'url')
  if (!title) return { error: 'Give the preview a name, e.g. “Homepage, second pass”.' }
  if (!/^https:\/\/[^\s]+$/i.test(url)) return { error: 'Paste the full preview link, starting with https://' }
  const preview = await previews.save({
    id: newId(),
    projectId,
    title,
    url,
    note: opt(form, 'note')?.slice(0, 1500),
    status: 'pending',
    createdAt: new Date().toISOString(),
  })
  // The newest preview is also the project's "Preview site" link
  await saveProject({ ...project, stagingUrl: url })
  await logActivity({ clientId: project.clientId, projectId, actor: 'admin', text: `New preview to look at: ${title}`, href: `/portal/projects/${projectId}/preview/${preview.id}` })
  const client = await getClient(project.clientId)
  if (client) {
    await emailPeople(
      client.id,
      'files',
      `Take a look: ${title}`,
      `Hi ${first(client.name)},\n\nA new preview of ${project.name} is ready: “${title}”. This is the site before it goes live, so nothing here is public yet.${preview.note ? `\n\nWhat to look at: ${preview.note}` : ''}\n\nYou can see how it looks on a computer, tablet and phone, then approve it or tell me what to change.`,
      `${await siteOrigin()}/portal/projects/${projectId}/preview/${preview.id}`,
      'Open the preview'
    )
  }
  refreshProject(projectId)
  return { ok: 'shared' }
}

export async function deletePreviewAction(projectId: string, previewId: string) {
  await requireAdmin()
  await previews.remove(projectId, previewId)
  refreshProject(projectId)
}

/* ───────────── support requests ───────────── */

const TICKET_STATUSES: TicketStatus[] = ['open', 'in_progress', 'waiting', 'done']

/** Reply and/or change the status of a support request. */
export async function updateTicketAction(projectId: string, ticketId: string, _: FormState, form: FormData): Promise<FormState> {
  await requireAdmin()
  const project = await getProject(projectId)
  const ticket = project ? await tickets.get(projectId, ticketId) : null
  if (!project || !ticket) return { error: 'Request not found.' }
  const body = str(form, 'body').slice(0, 5000)
  const status = TICKET_STATUSES.find((s) => s === str(form, 'status')) ?? ticket.status
  if (!body && status === ticket.status) return { error: 'Write a reply or change the status.' }
  const at = new Date().toISOString()
  await tickets.save({
    ...ticket,
    status,
    closedAt: status === 'done' ? ticket.closedAt ?? at : undefined,
    updatedAt: at,
    replies: body ? [...ticket.replies, { from: 'admin', name: 'Felipe', body, at }] : ticket.replies,
  })
  const client = await getClient(project.clientId)
  if (client && (body || (status === 'done' && ticket.status !== 'done'))) {
    const done = status === 'done' && ticket.status !== 'done'
    await emailPeople(
      client.id,
      'messages',
      done ? `Resolved: ${ticket.title} (#${ticket.number})` : `Update on your request #${ticket.number}: ${ticket.title}`,
      `Hi ${first(client.name)},\n\n${body || 'This request is finished.'}${done && body ? '\n\nI’ve marked this request as resolved. Reply in the portal if anything still isn’t right.' : ''}`,
      `${await siteOrigin()}/portal/projects/${projectId}#support`,
      'View request'
    )
  }
  if (status === 'done' && ticket.status !== 'done') {
    await logActivity({ clientId: project.clientId, projectId, actor: 'admin', text: `Support request #${ticket.number} resolved: ${ticket.title}` })
  }
  refreshProject(projectId)
  return { ok: 'saved' }
}

export async function deleteTicketAction(projectId: string, ticketId: string) {
  await requireAdmin()
  await tickets.remove(projectId, ticketId)
  refreshProject(projectId)
}

/* ───────────── extra contacts ───────────── */

async function inviteLink(email: string, code: string) {
  return `${await siteOrigin()}/portal/access?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`
}

async function sendContactInvite(name: string, email: string, code: string, link: string, owner: string) {
  await sendEmail(
    email,
    'You have access to the client portal',
    `Hi ${first(name)},\n\n${owner} added you to their project portal with Felipe Cantu Jr. You can follow progress, review work, send messages and see invoices there.\n\nClick the button below. The first time, you'll create your own password, and after that you'll sign in at ${link.split('/portal')[0]}/portal with your email and password.\n\nIf the button doesn't work, go to the sign-in page and enter:\nEmail: ${email}\nOne-time code: ${code}`,
    link,
    'Open the portal'
  )
}

const PREF_PRESETS: Record<string, EmailPrefs | undefined> = {
  all: undefined,
  billing: { messages: false, files: false, updates: false, billing: true },
  project: { billing: false },
}

export async function addContactAction(clientId: string, _: CredentialState, form: FormData): Promise<CredentialState> {
  await requireAdmin()
  const client = await getClient(clientId)
  if (!client) return { error: 'Client not found.' }
  const name = str(form, 'name')
  const email = str(form, 'email')
  if (!name || !/^\S+@\S+\.\S+$/.test(email)) return { error: 'Name and a valid email are required.' }
  try {
    const { contact, code } = await createContact(clientId, { name, email, emailPrefs: PREF_PRESETS[str(form, 'emails')] })
    const link = await inviteLink(contact.email, code)
    if (form.get('sendInvite') === 'on' && emailEnabled()) await sendContactInvite(contact.name, contact.email, code, link, client.name)
    revalidatePath(`/portal/admin/clients/${clientId}`)
    return { email: contact.email, code, link }
  } catch (err) {
    return { error: (err as Error).message }
  }
}

export async function resetContactAction(contactId: string, _: CredentialState, form: FormData): Promise<CredentialState> {
  await requireAdmin()
  const existing = await getContact(contactId)
  const client = existing ? await getClient(existing.clientId) : null
  if (!existing || !client) return { error: 'Contact not found.' }
  const { contact, code } = await resetContactCode(contactId)
  const link = await inviteLink(contact.email, code)
  if (form.get('sendInvite') === 'on' && emailEnabled()) await sendContactInvite(contact.name, contact.email, code, link, client.name)
  return { email: contact.email, code, link }
}

export async function removeContactAction(contactId: string) {
  await requireAdmin()
  const contact = await getContact(contactId)
  if (!contact) return
  await removeContact(contactId)
  revalidatePath(`/portal/admin/clients/${contact.clientId}`)
}

/* ───────────── weekly progress emails ───────────── */

export async function sendWeeklyNowAction(projectId: string): Promise<FormState> {
  await requireAdmin()
  const project = await getProject(projectId)
  if (!project) return { error: 'Project not found.' }
  if (!emailEnabled()) return { error: 'Email isn’t set up, so nothing was sent.' }
  const sent = await sendWeeklyUpdate(project, await siteOrigin())
  refreshProject(projectId)
  return sent ? { ok: `Sent to ${sent} ${sent === 1 ? 'person' : 'people'}.` } : { error: 'Everyone on this account has progress emails switched off.' }
}

export async function setProjectWeeklyAction(projectId: string, on: boolean) {
  await requireAdmin()
  const project = await getProject(projectId)
  if (!project) return
  await saveProject({ ...project, weeklyUpdates: on })
  refreshProject(projectId)
}

export async function setWeeklyUpdatesAction(on: boolean) {
  await requireAdmin()
  await saveSettings({ ...(await getSettings()), weeklyUpdates: on })
  revalidatePath('/portal/admin/settings')
}

/* ───────────── care plan auto-pay ───────────── */

export async function adminStopAutopayAction(projectId: string) {
  await requireAdmin()
  const project = await getProject(projectId)
  if (!project) return
  if (await disableAutopay(projectId)) {
    await logActivity({ clientId: project.clientId, projectId, actor: 'admin', text: 'Auto-pay for the care plan was turned off' })
  }
  refreshProject(projectId)
}
