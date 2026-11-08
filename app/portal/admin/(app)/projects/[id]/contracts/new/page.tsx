import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FiArrowLeft } from 'react-icons/fi'
import { getClient, getProject, getSettings } from '@/lib/portal/db'
import { defaultContract } from '@/lib/portal/contractTemplate'
import { PageHeader } from '@/components/portal/ui'
import ContractEditor from '@/components/portal/admin/ContractEditor'
import { createContractAction } from '@/app/portal/admin/actions'

export const metadata = { title: 'New agreement' }

export default async function NewContractPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getProject(id)
  if (!project) notFound()
  const client = await getClient(project.clientId)
  if (!client) notFound()
  const draft = defaultContract(client, project, (await getSettings()).depositPercent)

  return (
    <div className="mx-auto grid max-w-3xl gap-6">
      <Link href={`/portal/admin/projects/${id}`} className="btn btn-ghost btn-sm w-fit !pl-2">
        <FiArrowLeft aria-hidden="true" /> {project.name}
      </Link>
      <PageHeader eyebrow={`Agreement · ${client.name}`} title="New agreement">
        Pre-filled from the project&apos;s price, dates and milestones. Edit anything before sending.
      </PageHeader>
      <div className="card p-5 sm:p-8">
        <ContractEditor action={createContractAction.bind(null, id)} title={draft.title} body={draft.body} />
      </div>
    </div>
  )
}
