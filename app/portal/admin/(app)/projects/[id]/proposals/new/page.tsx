import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FiArrowLeft } from 'react-icons/fi'
import { getClient, getProject, getSettings } from '@/lib/portal/db'
import { PageHeader } from '@/components/portal/ui'
import ProposalEditor from '@/components/portal/admin/ProposalEditor'
import { saveProposalAction } from '@/app/portal/admin/more-actions'

export const metadata = { title: 'New proposal' }

export default async function NewProposalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getProject(id)
  if (!project) notFound()
  const client = await getClient(project.clientId)
  if (!client) notFound()
  const settings = await getSettings()
  const validUntil = new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10)
  const goals = project.brief?.goals ? `\n\nYour goals, as I understood them: ${project.brief.goals}` : ''

  return (
    <div className="mx-auto grid max-w-5xl gap-6">
      <Link href={`/portal/admin/projects/${id}`} className="btn btn-ghost btn-sm w-fit !pl-2">
        <FiArrowLeft aria-hidden="true" /> {project.name}
      </Link>
      <PageHeader eyebrow={`Proposal · ${client.name}`} title="New proposal">
        A priced quote the client accepts in their portal. Nothing is sent until you choose “Send to client”.
      </PageHeader>
      <div className="card p-5 sm:p-8">
        <ProposalEditor
          action={saveProposalAction.bind(null, id, '')}
          depositPercent={settings.depositPercent ?? 50}
          defaults={{
            title: `${project.name} — Proposal`,
            intro: `Hi ${client.name.split(' ')[0]},\n\nThanks for talking through ${project.name} with me. Here's what I'd build and what it costs.${goals}`,
            validUntil,
            price: project.price ? (project.price / 100).toFixed(2) : undefined,
          }}
        />
      </div>
    </div>
  )
}
