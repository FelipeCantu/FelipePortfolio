import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FiArrowLeft, FiRotateCcw, FiSend, FiTrash2 } from 'react-icons/fi'
import { getClient, getProject, getSettings, proposalExpired, proposals } from '@/lib/portal/db'
import { PROPOSAL_STATUS, fmtDate } from '@/lib/portal/format'
import { Badge, PageHeader } from '@/components/portal/ui'
import ProposalDocument from '@/components/portal/ProposalDocument'
import ProposalEditor from '@/components/portal/admin/ProposalEditor'
import PrintButton from '@/components/portal/PrintButton'
import { deleteProposalAction, saveProposalAction, sendProposalAction, withdrawProposalAction } from '@/app/portal/admin/more-actions'

export const metadata = { title: 'Proposal' }

export default async function AdminProposalPage({ params }: { params: Promise<{ id: string; proposalId: string }> }) {
  const { id, proposalId } = await params
  const [project, proposal] = await Promise.all([getProject(id), proposals.get(id, proposalId)])
  if (!project || !proposal) notFound()
  const client = await getClient(project.clientId)
  if (!client) notFound()
  const expired = proposalExpired(proposal)
  const st = PROPOSAL_STATUS[expired ? 'expired' : proposal.status]

  return (
    <div className="mx-auto grid max-w-5xl gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link href={`/portal/admin/projects/${id}`} className="btn btn-ghost btn-sm !pl-2">
          <FiArrowLeft aria-hidden="true" /> {project.name}
        </Link>
        <PrintButton />
      </div>
      <div className="print:hidden">
        <PageHeader eyebrow={`Proposal · ${client.name}`} title={proposal.title}>
          <span className="flex flex-wrap items-center gap-3 text-small">
            <Badge tone={st.tone}>{st.label}</Badge>
            {proposal.sentAt && <span>Sent {fmtDate(proposal.sentAt)}</span>}
            {proposal.validUntil && <span>Valid until {fmtDate(proposal.validUntil)}</span>}
          </span>
        </PageHeader>
      </div>

      {proposal.status === 'declined' && (
        <p className="rounded-card border border-danger/30 bg-danger/[0.06] p-4 text-small text-fg print:hidden">
          <span className="font-semibold">Declined{proposal.decidedAt ? ` ${fmtDate(proposal.decidedAt)}` : ''}.</span> {proposal.declineNote ? `They said: “${proposal.declineNote}”` : 'No reason given.'} Withdraw it to edit and send a new version.
        </p>
      )}
      {proposal.status === 'accepted' && (
        <p className="rounded-card border border-success/30 bg-success/10 p-4 text-small text-fg print:hidden">
          Accepted. The project price was set to the accepted option.
          {proposal.contractId && <> <Link href={`/portal/admin/contracts/${proposal.contractId}`} className="text-accent-light">Agreement sent for signature</Link>.</>}
          {proposal.invoiceId && <> <Link href={`/portal/admin/invoices/${proposal.invoiceId}`} className="text-accent-light">Deposit invoice issued</Link>.</>}
        </p>
      )}

      {proposal.status === 'draft' ? (
        <div className="card p-5 sm:p-8">
          <ProposalEditor
            action={saveProposalAction.bind(null, id, proposalId)}
            proposal={proposal}
            depositPercent={(await getSettings()).depositPercent ?? 50}
            defaults={{ title: proposal.title, intro: proposal.intro ?? '', validUntil: proposal.validUntil ?? '' }}
          />
        </div>
      ) : (
        <ProposalDocument proposal={proposal} clientName={client.company ? `${client.name}, ${client.company}` : client.name} projectName={project.name} />
      )}

      <div className="flex flex-wrap gap-2 print:hidden">
        {proposal.status === 'draft' && (
          <form action={sendProposalAction.bind(null, id, proposalId)}>
            <button className="btn btn-ghost btn-sm"><FiSend aria-hidden="true" /> Send as saved</button>
          </form>
        )}
        {(proposal.status === 'sent' || proposal.status === 'declined') && (
          <form action={withdrawProposalAction.bind(null, id, proposalId)}>
            <button className="btn btn-secondary btn-sm"><FiRotateCcw aria-hidden="true" /> Withdraw to edit</button>
          </form>
        )}
        {proposal.status !== 'accepted' && (
          <form action={deleteProposalAction.bind(null, id, proposalId)}>
            <button className="btn btn-ghost btn-sm hover:!text-danger"><FiTrash2 aria-hidden="true" /> Delete</button>
          </form>
        )}
      </div>
    </div>
  )
}
