import 'server-only'
import {
  changeOrders, createContract, createInvoice, getClient, getProject, getSettings, invoiceTotal, logActivity, proposals,
  saveContract, saveProject,
} from './db'
import { defaultContract } from './contractTemplate'
import { emailPeople } from './people'
import { notifyAdmin } from './notify'
import { money } from './format'
import type { ChangeOrder, Client, Proposal } from './types'

const plusDays = (days: number, from = new Date()) => new Date(from.getTime() + days * 86400000).toISOString().slice(0, 10)

/**
 * The client accepted one option of a proposal: the project takes that price,
 * and (if Felipe left them switched on) the agreement goes out for signature
 * and the deposit invoice is issued.
 */
export async function acceptProposal(proposal: Proposal, optionId: string, viewer: Client, signedName: string, ip: string, origin: string) {
  const option = proposal.options.find((o) => o.id === optionId)
  const project = await getProject(proposal.projectId)
  const owner = await getClient(proposal.clientId)
  if (!option || !project || !owner) return null

  const updated = await saveProject({ ...project, price: option.price })
  const settings = await getSettings()
  const pct = settings.depositPercent ?? 50
  let next: Proposal = {
    ...proposal,
    status: 'accepted',
    decidedAt: new Date().toISOString(),
    acceptedOptionId: option.id,
    acceptedBy: { name: signedName, email: viewer.email, ip },
  }
  // Save the decision first so a double click can't accept twice
  await proposals.save(next)

  if (proposal.autoContract) {
    const draft = defaultContract(owner, updated, pct)
    const scope = option.includes.length ? `\n\nAccepted option: ${option.name} (${money(option.price)})\n${option.includes.map((l) => `   - ${l}`).join('\n')}` : ''
    const contract = await createContract({ clientId: owner.id, projectId: project.id, title: draft.title, body: draft.body + scope })
    await saveContract({ ...contract, status: 'sent', sentAt: new Date().toISOString() })
    next = { ...next, contractId: contract.id }
  }
  if (proposal.autoDeposit && option.price > 0) {
    const amount = Math.round((option.price * pct) / 100)
    const inv = await createInvoice({
      clientId: owner.id,
      projectId: project.id,
      title: `${project.name} — ${pct}% deposit`,
      items: [{ description: `${pct}% deposit to begin work (${option.name})`, quantity: 1, unitAmount: amount }],
      dueDate: plusDays(3),
      notes: 'Work begins once the deposit is received. Thank you!',
      send: true,
    })
    next = { ...next, invoiceId: inv.id }
    await emailPeople(
      owner.id,
      'billing',
      `Invoice ${inv.number} from Felipe Cantu Jr`,
      `Hi ${owner.name.split(' ')[0]},\n\nThanks for accepting the proposal for ${project.name}. The deposit invoice (${money(invoiceTotal(inv))}) is ready, and work begins once it's paid.`,
      `${origin}/portal/invoices/${inv.id}`,
      'View & pay invoice'
    )
  }
  if (next.contractId || next.invoiceId) await proposals.save(next)

  await logActivity({ clientId: owner.id, projectId: project.id, actor: 'client', text: `${viewer.name} accepted the proposal “${proposal.title}” (${option.name}, ${money(option.price)})`, href: `/portal/admin/projects/${project.id}/proposals/${proposal.id}` })
  await notifyAdmin(
    `Proposal accepted: ${proposal.title}`,
    `${viewer.name} accepted “${option.name}” for ${money(option.price)} on ${project.name}.${next.contractId ? '\n\nThe agreement was sent for signature.' : ''}${next.invoiceId ? '\nThe deposit invoice was issued.' : ''}`,
    `${origin}/portal/admin/projects/${project.id}`
  )
  return next
}

/** The client approved a scope change: add it to the price (and timeline), and invoice it now if that's how it's billed. */
export async function approveChange(change: ChangeOrder, viewer: Client, origin: string, note?: string) {
  const project = await getProject(change.projectId)
  const owner = await getClient(change.clientId)
  if (!project || !owner) return null
  let next: ChangeOrder = { ...change, status: 'approved', decidedAt: new Date().toISOString(), decidedBy: viewer.name, note }
  await changeOrders.save(next)

  const dueDate = change.addDays && project.dueDate ? plusDays(change.addDays, new Date(`${project.dueDate}T12:00:00Z`)) : project.dueDate
  await saveProject({ ...project, price: (project.price ?? 0) + change.price, dueDate })

  if (change.billing === 'now' && change.price > 0) {
    const inv = await createInvoice({
      clientId: owner.id,
      projectId: project.id,
      title: `${project.name} — ${change.title}`,
      items: [{ description: `Change request: ${change.title}`.slice(0, 500), quantity: 1, unitAmount: change.price }],
      dueDate: plusDays(7),
      notes: `Approved by ${viewer.name} in the client portal.`,
      send: true,
    })
    next = { ...next, invoiceId: inv.id }
    await changeOrders.save(next)
    await emailPeople(
      owner.id,
      'billing',
      `Invoice ${inv.number} from Felipe Cantu Jr`,
      `Hi ${owner.name.split(' ')[0]},\n\nThanks for approving “${change.title}”. The invoice for it (${money(invoiceTotal(inv))}) is ready to view and pay online.`,
      `${origin}/portal/invoices/${inv.id}`,
      'View & pay invoice'
    )
  }
  await logActivity({ clientId: owner.id, projectId: project.id, actor: 'client', text: `${viewer.name} approved the change request “${change.title}” (+${money(change.price)})`, href: `/portal/admin/projects/${project.id}#changes` })
  await notifyAdmin(
    `Change approved: ${change.title}`,
    `${viewer.name} approved “${change.title}” (+${money(change.price)}${change.addDays ? `, +${change.addDays} days` : ''}) on ${project.name}.${note ? `\n\nNote: ${note}` : ''}`,
    `${origin}/portal/admin/projects/${project.id}#changes`
  )
  return next
}
