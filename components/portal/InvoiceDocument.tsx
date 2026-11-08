import type { Client, Invoice, Project } from '@/lib/portal/types'
import { INVOICE_STATUS, fmtDate, money } from '@/lib/portal/format'
import { invoiceTotal } from '@/lib/portal/db'
import { Badge } from './ui'

/** The invoice itself. Styled to print cleanly on white paper. */
export default function InvoiceDocument({ invoice, client, project }: { invoice: Invoice; client: Client; project?: Project | null }) {
  const st = INVOICE_STATUS[invoice.status]
  const total = invoiceTotal(invoice)
  return (
    <article className="invoice-doc card p-6 sm:p-10">
      <header className="flex flex-wrap items-start justify-between gap-6 border-b border-line/15 pb-6">
        <div>
          <p className="font-display text-xl font-bold text-fg">Felipe Cantu Jr</p>
          <p className="text-small text-muted">Full Stack Web Developer · Dallas, TX</p>
          <p className="text-small text-muted">cantujr.felipe@gmail.com · felipecantujr.com</p>
        </div>
        <div className="text-right">
          <p className="eyebrow">Invoice</p>
          <p className="mt-1 font-mono text-lg font-medium text-fg">{invoice.number}</p>
          <div className="mt-2">
            <Badge tone={st.tone}>{st.label}</Badge>
          </div>
        </div>
      </header>

      <div className="grid gap-6 border-b border-line/15 py-6 sm:grid-cols-3">
        <div>
          <p className="text-[0.75rem] font-semibold uppercase tracking-wider text-subtle">Billed to</p>
          <p className="mt-1 font-medium text-fg">{client.name}</p>
          {client.company && <p className="text-small text-muted">{client.company}</p>}
          <p className="text-small text-muted">{client.email}</p>
        </div>
        <div>
          <p className="text-[0.75rem] font-semibold uppercase tracking-wider text-subtle">Issued</p>
          <p className="mt-1 text-fg">{fmtDate(invoice.sentAt ?? invoice.createdAt)}</p>
          <p className="mt-3 text-[0.75rem] font-semibold uppercase tracking-wider text-subtle">{invoice.status === 'paid' ? 'Paid' : 'Due'}</p>
          <p className="mt-1 text-fg">{invoice.status === 'paid' ? fmtDate(invoice.paidAt) : invoice.dueDate ? fmtDate(invoice.dueDate) : 'On receipt'}</p>
        </div>
        <div>
          <p className="text-[0.75rem] font-semibold uppercase tracking-wider text-subtle">For</p>
          <p className="mt-1 text-fg">{invoice.title}</p>
          {project && <p className="text-small text-muted">{project.name}</p>}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[28rem] text-left text-small">
          <thead>
            <tr className="border-b border-line/15 text-[0.75rem] uppercase tracking-wider text-subtle">
              <th className="py-3 pr-4 font-semibold">Description</th>
              <th className="py-3 pr-4 text-right font-semibold">Qty</th>
              <th className="py-3 pr-4 text-right font-semibold">Rate</th>
              <th className="py-3 text-right font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((it, i) => (
              <tr key={i} className="border-b border-line/10">
                <td className="py-3 pr-4 text-fg">{it.description}</td>
                <td className="py-3 pr-4 text-right font-mono text-muted">{it.quantity}</td>
                <td className="py-3 pr-4 text-right font-mono text-muted">{money(it.unitAmount)}</td>
                <td className="py-3 text-right font-mono text-fg">{money(Math.round(it.quantity * it.unitAmount))}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="pt-5 text-right font-semibold text-fg">Total</td>
              <td className="pt-5 text-right font-display text-xl font-bold text-fg">{money(total)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {invoice.notes && <p className="mt-8 whitespace-pre-line border-t border-line/15 pt-6 text-small text-muted">{invoice.notes}</p>}
      <p className="mt-8 text-center text-[0.8rem] text-subtle">Thank you for your business!</p>
    </article>
  )
}
