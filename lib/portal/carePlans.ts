import 'server-only'
import { createInvoice, getClient, getProject, invoiceTotal, listClients, listProjects, logActivity, saveProject } from './db'
import { sendEmail } from './notify'
import { money } from './format'
import type { Project } from './types'

/** First month automatic billing applies to, when a plan is switched on today. */
export function firstBillingMonth(billingDay: number, now = new Date()) {
  const t = today(now)
  return t.day <= billingDay ? t.ym : addMonth(t.ym)
}

export const CARE_DEFAULT_INCLUDES = [
  'Software, plugin and security updates',
  'Daily backups',
  'Uptime monitoring — Felipe is alerted if your site goes down',
  'Up to 2 hours of small changes each month',
  'A short monthly report',
]

const TZ = 'America/Chicago'

/** Today in Felipe's time zone: { ym: '2026-11', day: 8 } */
export function today(now = new Date()) {
  const iso = now.toLocaleDateString('en-CA', { timeZone: TZ }) // YYYY-MM-DD
  return { iso, ym: iso.slice(0, 7), day: Number(iso.slice(8, 10)) }
}

const monthName = (ym: string) =>
  new Date(`${ym}-15T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })

const addMonth = (ym: string) => {
  const [y, m] = ym.split('-').map(Number)
  return m === 12 ? `${y + 1}-01` : `${y}-${String(m + 1).padStart(2, '0')}`
}

/** Next date an invoice will go out (YYYY-MM-DD), or undefined when paused. */
export function nextBillingDate(project: Project, now = new Date()) {
  const plan = project.carePlan
  if (!plan?.active) return undefined
  const t = today(now)
  const day = String(plan.billingDay).padStart(2, '0')
  if (plan.startsFrom && plan.startsFrom > t.ym) return `${plan.startsFrom}-${day}`
  if (plan.lastBilled === t.ym || (plan.lastBilled && plan.lastBilled > t.ym)) return `${addMonth(t.ym)}-${day}`
  return t.day >= plan.billingDay ? t.iso : `${t.ym}-${day}`
}

/** Creates, emails and records this month's care-plan invoice. Returns the invoice, or null if already billed. */
export async function billCarePlan(projectId: string, origin: string, now = new Date()) {
  const project = await getProject(projectId)
  const plan = project?.carePlan
  if (!project || !plan || plan.amount <= 0) return null
  const { ym, iso } = today(now)
  if (plan.lastBilled === ym) return null

  // Mark first so a retry or a second cron run can never double-bill
  await saveProject({ ...project, carePlan: { ...plan, lastBilled: ym } })

  const due = new Date(`${iso}T12:00:00Z`)
  due.setUTCDate(due.getUTCDate() + 7)
  const inv = await createInvoice({
    clientId: project.clientId,
    projectId,
    title: `${project.name} — care plan, ${monthName(ym)}`,
    items: [{ description: `Monthly care plan (${monthName(ym)})${plan.includes.length ? `: ${plan.includes.join('; ')}` : ''}`.slice(0, 500), quantity: 1, unitAmount: plan.amount }],
    dueDate: due.toISOString().slice(0, 10),
    notes: 'Thank you for trusting me with your site every month!',
    send: true,
  })
  await logActivity({ clientId: inv.clientId, projectId, actor: 'admin', text: `Care plan invoice ${inv.number} issued (${money(invoiceTotal(inv))})`, href: `/portal/invoices/${inv.id}` })
  const client = await getClient(project.clientId)
  if (client) {
    await sendEmail(
      client.email,
      `Your ${monthName(ym)} care plan invoice`,
      `Hi ${client.name.split(' ')[0]},\n\nYour monthly care plan invoice for ${project.name} (${money(invoiceTotal(inv))}) is ready. You can view and pay it securely online.`,
      `${origin}/portal/invoices/${inv.id}`,
      'View & pay invoice'
    )
  }
  return inv
}

/** Called once a day by the Vercel cron job. */
export async function runCarePlans(origin: string, now = new Date()) {
  const billed: string[] = []
  const t = today(now)
  for (const c of await listClients()) {
    for (const p of await listProjects(c.id)) {
      const plan = p.carePlan
      if (!plan?.active || plan.amount <= 0 || plan.lastBilled === t.ym || t.day < plan.billingDay || (plan.startsFrom && plan.startsFrom > t.ym)) continue
      const inv = await billCarePlan(p.id, origin, now)
      if (inv) billed.push(inv.number)
    }
  }
  return billed
}
