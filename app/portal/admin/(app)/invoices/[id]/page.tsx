import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FiArrowLeft, FiCheck, FiSend, FiSlash, FiTrash2 } from 'react-icons/fi'
import { getClient, getInvoice, getProject } from '@/lib/portal/db'
import InvoiceDocument from '@/components/portal/InvoiceDocument'
import PrintButton from '@/components/portal/PrintButton'
import { deleteInvoiceAction, setInvoiceStatusAction } from '@/app/portal/admin/actions'

export const metadata = { title: 'Invoice' }

export default async function AdminInvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const invoice = await getInvoice(id)
  if (!invoice) notFound()
  const [client, project] = await Promise.all([getClient(invoice.clientId), invoice.projectId ? getProject(invoice.projectId) : null])
  if (!client) notFound()

  return (
    <div className="mx-auto grid max-w-3xl gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link href={`/portal/admin/clients/${client.id}`} className="btn btn-ghost btn-sm !pl-2">
          <FiArrowLeft aria-hidden="true" /> {client.name}
        </Link>
        <div className="flex flex-wrap gap-2">
          {invoice.status === 'draft' && (
            <form action={setInvoiceStatusAction.bind(null, id, 'open')}>
              <button className="btn btn-gold btn-sm"><FiSend aria-hidden="true" /> Send to client</button>
            </form>
          )}
          {invoice.status === 'open' && (
            <form action={setInvoiceStatusAction.bind(null, id, 'paid')}>
              <button className="btn btn-secondary btn-sm" title="For cash, Zelle, check, etc."><FiCheck aria-hidden="true" /> Mark paid</button>
            </form>
          )}
          {(invoice.status === 'open' || invoice.status === 'draft') && (
            <form action={setInvoiceStatusAction.bind(null, id, 'void')}>
              <button className="btn btn-ghost btn-sm"><FiSlash aria-hidden="true" /> Void</button>
            </form>
          )}
          {invoice.status !== 'paid' && (
            <form action={deleteInvoiceAction.bind(null, id)}>
              <button className="btn btn-ghost btn-sm hover:!text-danger"><FiTrash2 aria-hidden="true" /> Delete</button>
            </form>
          )}
          <PrintButton />
        </div>
      </div>
      {invoice.status === 'draft' && <p className="text-small text-muted print:hidden">Draft: the client can&apos;t see this until you send it.</p>}
      <InvoiceDocument invoice={invoice} client={client} project={project} />
    </div>
  )
}
