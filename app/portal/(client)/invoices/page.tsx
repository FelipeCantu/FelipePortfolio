import Link from 'next/link'
import { FiArrowRight, FiFileText } from 'react-icons/fi'
import { requireClient } from '@/lib/portal/session'
import { invoiceTotal, listInvoices } from '@/lib/portal/db'
import { INVOICE_STATUS, fmtDate, isOverdue, money } from '@/lib/portal/format'
import { Badge, Empty, PageHeader, Stat } from '@/components/portal/ui'

export const metadata = { title: 'Invoices' }

export default async function InvoicesPage() {
  const client = await requireClient()
  const invoices = (await listInvoices(client.id)).filter((i) => i.status !== 'draft')
  const due = invoices.filter((i) => i.status === 'open')
  const paid = invoices.filter((i) => i.status === 'paid')

  return (
    <div>
      <PageHeader eyebrow="Billing" title="Invoices">Pay securely online with card, Apple Pay or Google Pay.</PageHeader>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat label="Balance due" value={money(due.reduce((s, i) => s + invoiceTotal(i), 0))} tone={due.length ? 'warning' : 'success'} />
        <Stat label="Paid to date" value={money(paid.reduce((s, i) => s + invoiceTotal(i), 0))} />
        <Stat label="Invoices" value={invoices.length} />
      </div>
      {invoices.length ? (
        <ul className="grid gap-2">
          {invoices.map((inv) => {
            const late = inv.status === 'open' && isOverdue(inv.dueDate)
            const st = INVOICE_STATUS[inv.status]
            return (
              <li key={inv.id}>
                <Link href={`/portal/invoices/${inv.id}`} className="card-interactive group flex flex-wrap items-center gap-4 p-4 no-underline sm:p-5">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-control bg-accent/10 text-accent-light" aria-hidden="true">
                    <FiFileText />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-fg">{inv.title}</p>
                    <p className="font-mono text-[0.75rem] text-subtle">
                      {inv.number} · {inv.status === 'paid' ? `Paid ${fmtDate(inv.paidAt)}` : inv.dueDate ? `Due ${fmtDate(inv.dueDate)}` : 'Due on receipt'}
                    </p>
                  </div>
                  <Badge tone={late ? 'danger' : st.tone}>{late ? 'Overdue' : st.label}</Badge>
                  <p className="w-24 text-right font-display text-lg font-bold text-fg">{money(invoiceTotal(inv))}</p>
                  <FiArrowRight className="text-subtle transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </li>
            )
          })}
        </ul>
      ) : (
        <Empty icon={<FiFileText />} title="No invoices yet">Invoices will appear here when they&apos;re issued.</Empty>
      )}
    </div>
  )
}
