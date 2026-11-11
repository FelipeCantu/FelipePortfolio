import 'server-only'
import { getClient, invoiceTotal, listAllInvoices, logActivity, saveInvoice } from './db'
import { emailPeople } from './people'
import { fmtDate, money } from './format'
import type { Invoice } from './types'

/**
 * Friendly payment reminders, each sent at most once per invoice:
 *   before  → 3 days before the due date
 *   due     → on the due date
 *   late3   → 3 days overdue
 *   late7   → 7 days overdue (last automatic one)
 * If a run is missed, only the most recent applicable stage is sent, so a
 * client never gets several reminders at once.
 */
const STAGES = [
  { key: 'before', from: -3 },
  { key: 'due', from: 0 },
  { key: 'late3', from: 3 },
  { key: 'late7', from: 7 },
] as const

/** Whole days from the due date to today, in Felipe's time zone (negative = not due yet). */
function daysPastDue(dueDate: string, now = new Date()) {
  const today = now.toLocaleDateString('en-CA', { timeZone: 'America/Chicago' }) // YYYY-MM-DD
  return Math.round((Date.parse(`${today}T00:00:00Z`) - Date.parse(`${dueDate.slice(0, 10)}T00:00:00Z`)) / 86400000)
}

export function reminderStage(inv: Invoice, now = new Date()) {
  if (inv.status !== 'open' || !inv.dueDate) return null
  const days = daysPastDue(inv.dueDate, now)
  const applicable = STAGES.filter((s) => days >= s.from)
  const latest = applicable[applicable.length - 1]
  if (!latest || inv.reminders?.includes(latest.key)) return null
  return { stage: latest.key, skipped: applicable.slice(0, -1).map((s) => s.key), days }
}

function copy(stage: string, inv: Invoice, days: number) {
  const amount = money(invoiceTotal(inv))
  const due = fmtDate(inv.dueDate)
  if (stage === 'before') return { subject: `Reminder: invoice ${inv.number} is due ${due}`, text: `Just a friendly heads-up that invoice ${inv.number} for ${inv.title} (${amount}) is due on ${due}. You can pay it securely online in a few clicks.` }
  if (stage === 'due') return { subject: `Invoice ${inv.number} is due today`, text: `Invoice ${inv.number} for ${inv.title} (${amount}) is due today. You can pay it securely online in a few clicks. Thank you!` }
  if (stage.startsWith('manual')) return { subject: `Reminder: invoice ${inv.number}`, text: `A quick reminder about invoice ${inv.number} for ${inv.title} (${amount})${inv.dueDate ? `, due ${due}` : ''}. You can pay it securely online. If you've already sent payment, thank you, and please ignore this note.` }
  return { subject: `Invoice ${inv.number} is past due`, text: `Invoice ${inv.number} for ${inv.title} (${amount}) was due on ${due} and is now ${days} days past due. Could you take care of it when you get a chance? If you've already paid or something's holding it up, just reply in the portal and let me know.` }
}

export async function sendInvoiceReminder(inv: Invoice, stage: string, origin: string, days = 0, skipped: string[] = []) {
  const client = await getClient(inv.clientId)
  if (!client) return false
  const { subject, text } = copy(stage, inv, days)
  await emailPeople(client.id, 'billing', subject, `Hi ${client.name.split(' ')[0]},\n\n${text}`, `${origin}/portal/invoices/${inv.id}`, 'View & pay invoice')
  await saveInvoice({ ...inv, reminders: [...new Set([...(inv.reminders ?? []), ...skipped, stage])] })
  await logActivity({
    clientId: inv.clientId,
    projectId: inv.projectId,
    actor: 'admin',
    text: `Payment reminder sent for ${inv.number}`,
    href: `/portal/admin/invoices/${inv.id}`,
  })
  return true
}

/** Called once a day by the Vercel cron job. */
export async function runReminders(origin: string, now = new Date()) {
  const sent: string[] = []
  for (const inv of await listAllInvoices()) {
    const due = reminderStage(inv, now)
    if (!due) continue
    if (await sendInvoiceReminder(inv, due.stage, origin, due.days, due.skipped)) sent.push(`${inv.number}:${due.stage}`)
  }
  return sent
}
