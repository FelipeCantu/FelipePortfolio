import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FiArrowLeft, FiBell, FiCheck, FiSend, FiSlash, FiTrash2 } from 'react-icons/fi'
import { getClient, getInvoice, getProject } from '@/lib/portal/db'
import InvoiceDocument from '@/components/portal/InvoiceDocument'
import PrintButton from '@/components/portal/PrintButton'
import { deleteInvoiceAction, sendReminderNowAction, setInvoiceStatusAction } from '@/app/portal/admin/actions'
import { reminderStage } from '@/lib/portal/reminders'
import { fmtDate } from '@/lib/portal/format'

const REMINDER_LABEL: Record<string, string> = { before: '3 days before due', due: 'On the due date', late3: '3 days overdue', late7: '7 days overdue' }

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
            <form action={sendReminderNowAction.bind(null, id)}>
              <button className="btn btn-ghost btn-sm"><FiBell aria-hidden="true" /> Send reminder now</button>
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
      {invoice.status === 'open' && (
        <div className="card p-4 text-small print:hidden">
          <p className="font-semibold text-fg">Payment reminders</p>
          {invoice.dueDate ? (
            <p className="mt-1 text-muted">
              Sent automatically 3 days before the due date, on it, and 3 and 7 days after (each only once).
              {reminderStage(invoice) ? ' The next one goes out with the next daily run (about 9–10am Central).' : ''}
            </p>
          ) : (
            <p className="mt-1 text-muted">This invoice has no due date, so no automatic reminders. You can still send one now.</p>
          )}
          {!!invoice.reminders?.length && (
            <ul className="mt-2 grid gap-0.5 text-subtle">
              {invoice.reminders.map((r) => (
                <li key={r}>✓ {r.startsWith('manual:') ? `Sent by you ${fmtDate(r.slice(7), { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}` : REMINDER_LABEL[r] ?? r}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      <InvoiceDocument invoice={invoice} client={client} project={project} />
    </div>
  )
}
