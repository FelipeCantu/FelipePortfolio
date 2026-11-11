import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FiArrowLeft, FiArrowRight, FiCheckCircle, FiClock, FiCreditCard, FiPenTool } from 'react-icons/fi'
import { requireClientProject } from '@/lib/portal/session'
import { getClient, getContract, getInvoice, getSettings, proposalExpired, proposals } from '@/lib/portal/db'
import { money } from '@/lib/portal/format'
import ProposalDocument from '@/components/portal/ProposalDocument'
import ProposalAnswer from '@/components/portal/ProposalAnswer'
import PrintButton from '@/components/portal/PrintButton'
import { acceptProposalAction, declineProposalAction } from '@/app/portal/actions'

export const metadata = { title: 'Proposal' }

export default async function ClientProposalPage({ params }: { params: Promise<{ id: string; proposalId: string }> }) {
  const { id, proposalId } = await params
  const { client, project } = await requireClientProject(id)
  const proposal = project ? await proposals.get(id, proposalId) : null
  if (!project || !proposal || proposal.status === 'draft') notFound()

  const owner = (await getClient(client.id)) ?? client
  const expired = proposalExpired(proposal)
  const pct = (await getSettings()).depositPercent ?? 50
  const [contract, invoice] = await Promise.all([
    proposal.contractId ? getContract(proposal.contractId) : null,
    proposal.invoiceId ? getInvoice(proposal.invoiceId) : null,
  ])
  const steps = [
    proposal.autoContract && 'the agreement appears here for you to sign',
    proposal.autoDeposit && `the ${pct}% deposit invoice is sent`,
  ].filter(Boolean)

  return (
    <div className="mx-auto grid max-w-5xl gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link href={`/portal/projects/${id}`} className="btn btn-ghost btn-sm !pl-2">
          <FiArrowLeft aria-hidden="true" /> Back to project
        </Link>
        <PrintButton />
      </div>

      {proposal.status === 'accepted' && (
        <div className="grid gap-3 rounded-card border border-success/30 bg-success/10 p-4 print:hidden" role="status">
          <p className="flex items-center gap-3 text-small font-medium text-success">
            <FiCheckCircle size={20} aria-hidden="true" /> Accepted. Thank you! {contract?.status === 'sent' || invoice?.status === 'open' ? 'Two quick things to get started:' : 'Felipe will be in touch about next steps.'}
          </p>
          <div className="flex flex-wrap gap-2">
            {contract?.status === 'sent' && (
              <Link href={`/portal/contracts/${contract.id}`} className="btn btn-gold btn-sm">
                <FiPenTool aria-hidden="true" /> Sign the agreement <FiArrowRight aria-hidden="true" />
              </Link>
            )}
            {invoice?.status === 'open' && (
              <Link href={`/portal/invoices/${invoice.id}`} className="btn btn-secondary btn-sm">
                <FiCreditCard aria-hidden="true" /> Pay the deposit
              </Link>
            )}
          </div>
        </div>
      )}
      {proposal.status === 'declined' && (
        <p className="rounded-card border border-line/20 bg-white/[0.03] p-4 text-small text-muted print:hidden" role="status">
          You declined this proposal. Changed your mind? Send Felipe a message and he can reopen it.
        </p>
      )}
      {expired && (
        <p className="flex items-center gap-3 rounded-card border border-warning/30 bg-warning/10 p-4 text-small text-warning print:hidden" role="status">
          <FiClock size={18} aria-hidden="true" /> This proposal has expired. Message Felipe for an updated one.
        </p>
      )}

      <ProposalDocument proposal={proposal} clientName={owner.company ? `${owner.name}, ${owner.company}` : owner.name} projectName={project.name} />

      {proposal.status === 'sent' && !expired && (
        <ProposalAnswer
          accept={acceptProposalAction.bind(null, id, proposalId)}
          decline={declineProposalAction.bind(null, id, proposalId)}
          options={proposal.options.map((o) => ({ id: o.id, name: o.name, priceLabel: money(o.price), recommended: o.recommended }))}
          defaultName={client.name}
          nextSteps={steps.length ? `Once you accept, ${steps.join(' and ')}. Questions first? Send Felipe a message.` : 'Questions first? Send Felipe a message before accepting.'}
        />
      )}
    </div>
  )
}
