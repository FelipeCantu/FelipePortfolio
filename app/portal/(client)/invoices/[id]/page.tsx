import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FiArrowLeft, FiCheckCircle, FiCreditCard, FiLock } from 'react-icons/fi'
import { requireClientInvoice } from '@/lib/portal/session'
import { getInvoice, getProject, invoiceTotal } from '@/lib/portal/db'
import { confirmCheckout, paymentsEnabled } from '@/lib/portal/payments'
import { money } from '@/lib/portal/format'
import { payInvoiceAction } from '@/app/portal/actions'
import InvoiceDocument from '@/components/portal/InvoiceDocument'
import PrintButton from '@/components/portal/PrintButton'

export const metadata = { title: 'Invoice' }

export default async function InvoicePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ session_id?: string }> }) {
  const { id } = await params
  const { session_id } = await searchParams
  const found = await requireClientInvoice(id)
  if (!found.invoice) notFound()

  let invoice = found.invoice
  let justPaid = false
  if (session_id && invoice.status === 'open') {
    justPaid = await confirmCheckout(id, session_id)
    if (justPaid) invoice = (await getInvoice(id)) ?? invoice
  }
  const project = invoice.projectId ? await getProject(invoice.projectId) : null

  return (
    <div className="mx-auto grid max-w-3xl gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link href="/portal/invoices" className="btn btn-ghost btn-sm !pl-2">
          <FiArrowLeft aria-hidden="true" /> All invoices
        </Link>
        <PrintButton />
      </div>

      {(justPaid || invoice.status === 'paid') && (
        <div className="flex items-center gap-3 rounded-card border border-success/30 bg-success/10 p-4 text-success print:hidden" role="status">
          <FiCheckCircle size={20} aria-hidden="true" />
          <p className="text-small font-medium">{justPaid ? 'Payment received. Thank you! A receipt is on its way to your email.' : 'This invoice is paid. Thank you!'}</p>
        </div>
      )}

      {invoice.status === 'open' && (
        <div className="card flex flex-wrap items-center justify-between gap-4 border-gold/30 p-5 print:hidden">
          <div>
            <p className="text-small text-muted">Amount due</p>
            <p className="font-display text-2xl font-bold text-fg">{money(invoiceTotal(invoice))}</p>
          </div>
          {paymentsEnabled() ? (
            <form action={payInvoiceAction.bind(null, invoice.id)}>
              <button type="submit" className="btn btn-gold">
                <FiCreditCard aria-hidden="true" /> Pay now
              </button>
              <p className="mt-1.5 flex items-center justify-center gap-1 text-[0.7rem] text-subtle">
                <FiLock aria-hidden="true" /> Secure checkout by Stripe
              </p>
            </form>
          ) : (
            <p className="text-small text-muted">Contact Felipe for payment options.</p>
          )}
        </div>
      )}

      <InvoiceDocument invoice={invoice} client={found.client} project={project} />
    </div>
  )
}
