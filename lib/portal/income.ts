import 'server-only'
import { getProject, invoiceTotal, isDemoInvoice, listAllInvoices, listClients } from './db'
import type { Invoice } from './types'

const TZ = 'America/Chicago'
/** YYYY-MM-DD an invoice was paid, in Felipe's time zone (so December 31 evening stays in December). */
export const paidDay = (inv: Invoice) => (inv.paidAt ? new Date(inv.paidAt).toLocaleDateString('en-CA', { timeZone: TZ }) : '')

export interface IncomeRow {
  invoice: Invoice
  clientName: string
  company?: string
  projectName?: string
  total: number
  paidOn: string
  method: 'Online (Stripe)' | 'Marked paid (cash, Zelle, check…)'
}

/** Everything needed for the income page and the CSV export. */
export async function incomeReport(year: number) {
  const [everyInvoice, clients] = await Promise.all([listAllInvoices(), listClients()])
  // The demo client's invoices are made up, so they never count as income
  const invoices = everyInvoice.filter((i) => !isDemoInvoice(i))
  const byId = new Map(clients.map((c) => [c.id, c]))
  const projectNames = new Map<string, string>()
  for (const id of new Set(invoices.map((i) => i.projectId).filter((x): x is string => !!x))) {
    projectNames.set(id, (await getProject(id))?.name ?? '')
  }

  const paid = invoices.filter((i) => i.status === 'paid' && i.paidAt)
  const years = [...new Set([...paid.map((i) => Number(paidDay(i).slice(0, 4))), new Date().getFullYear()])].sort((a, b) => b - a)
  const rows: IncomeRow[] = paid
    .filter((i) => paidDay(i).startsWith(String(year)))
    .map((invoice) => ({
      invoice,
      clientName: byId.get(invoice.clientId)?.name ?? 'Deleted client',
      company: byId.get(invoice.clientId)?.company,
      projectName: invoice.projectId ? projectNames.get(invoice.projectId) || undefined : undefined,
      total: invoiceTotal(invoice),
      paidOn: paidDay(invoice),
      method: invoice.stripeSessionId ? ('Online (Stripe)' as const) : ('Marked paid (cash, Zelle, check…)' as const),
    }))
    .sort((a, b) => b.paidOn.localeCompare(a.paidOn))

  const months = Array.from({ length: 12 }, (_, m) => {
    const key = `${year}-${String(m + 1).padStart(2, '0')}`
    const mine = rows.filter((r) => r.paidOn.startsWith(key))
    return { key, label: new Date(Date.UTC(year, m, 15)).toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' }), total: mine.reduce((s, r) => s + r.total, 0), count: mine.length }
  })
  const perClient = [...rows.reduce((map, r) => map.set(r.clientName, (map.get(r.clientName) ?? 0) + r.total), new Map<string, number>())]
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total)

  const open = invoices.filter((i) => i.status === 'open')
  return {
    year,
    years,
    rows,
    months,
    perClient,
    total: rows.reduce((s, r) => s + r.total, 0),
    online: rows.filter((r) => r.invoice.stripeSessionId).reduce((s, r) => s + r.total, 0),
    outstanding: open.reduce((s, i) => s + invoiceTotal(i), 0),
    openCount: open.length,
  }
}

const cell = (v: string | number) => {
  let s = String(v)
  // Stop spreadsheet apps from running a cell that starts like a formula
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export function incomeCsv(rows: IncomeRow[]) {
  const head = ['Date paid', 'Invoice', 'Client', 'Company', 'Project', 'Description', 'Amount (USD)', 'How it was paid', 'Invoice date']
  const body = rows.map((r) => [
    r.paidOn, r.invoice.number, r.clientName, r.company ?? '', r.projectName ?? '', r.invoice.title, (r.total / 100).toFixed(2), r.method, r.invoice.createdAt.slice(0, 10),
  ])
  return [head, ...body].map((line) => line.map(cell).join(',')).join('\r\n') + '\r\n'
}
