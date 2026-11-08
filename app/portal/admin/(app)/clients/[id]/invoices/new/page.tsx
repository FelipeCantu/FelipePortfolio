import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FiArrowLeft } from 'react-icons/fi'
import { getClient, listProjects } from '@/lib/portal/db'
import { PageHeader } from '@/components/portal/ui'
import InvoiceForm from '@/components/portal/admin/InvoiceForm'
import { createInvoiceAction } from '@/app/portal/admin/actions'

export const metadata = { title: 'New invoice' }

export default async function NewInvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const client = await getClient(id)
  if (!client) notFound()
  const projects = await listProjects(id)
  return (
    <div className="mx-auto grid max-w-3xl gap-6">
      <Link href={`/portal/admin/clients/${id}`} className="btn btn-ghost btn-sm w-fit !pl-2">
        <FiArrowLeft aria-hidden="true" /> {client.name}
      </Link>
      <PageHeader eyebrow="Billing" title={`New invoice for ${client.name}`} />
      <div className="card p-5 sm:p-8">
        <InvoiceForm action={createInvoiceAction.bind(null, id)} projects={projects.map((p) => ({ id: p.id, name: p.name }))} />
      </div>
    </div>
  )
}
