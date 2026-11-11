import clsx from 'clsx'
import { FiCheck, FiClock } from 'react-icons/fi'
import type { Proposal } from '@/lib/portal/types'
import { fmtDate, money } from '@/lib/portal/format'
import { Badge } from './ui'

/** The proposal as the client reads it: intro, then the options side by side. */
export default function ProposalDocument({ proposal, clientName, projectName }: { proposal: Proposal; clientName: string; projectName: string }) {
  const many = proposal.options.length > 1
  return (
    <article className="card p-6 sm:p-8">
      <header className="border-b border-line/15 pb-5">
        <p className="eyebrow">Proposal</p>
        <h1 className="mt-2 text-h2 text-fg [overflow-wrap:anywhere]">{proposal.title}</h1>
        <p className="mt-2 text-small text-muted">
          Prepared for {clientName} · {projectName} · {fmtDate(proposal.sentAt ?? proposal.createdAt)}
          {proposal.validUntil ? ` · valid until ${fmtDate(proposal.validUntil)}` : ''}
        </p>
      </header>
      {proposal.intro && <p className="mt-5 max-w-prose-lg whitespace-pre-line text-fg/90">{proposal.intro}</p>}
      <div className={clsx('mt-6 grid gap-4', many && (proposal.options.length === 2 ? 'md:grid-cols-2' : 'lg:grid-cols-3'))}>
        {proposal.options.map((o) => {
          const chosen = proposal.acceptedOptionId === o.id
          return (
            <section
              key={o.id}
              className={clsx(
                'flex flex-col rounded-card border p-5',
                chosen ? 'border-success/50 bg-success/[0.06]' : o.recommended && !proposal.acceptedOptionId ? 'border-gold/45 bg-gold/[0.05]' : 'border-line/20 bg-bg/40'
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-bold text-fg">{o.name}</h2>
                {chosen ? <Badge tone="success">Accepted</Badge> : o.recommended && many ? <Badge tone="warning">Recommended</Badge> : null}
              </div>
              <p className="mt-2 font-display text-3xl font-bold tracking-tight text-fg">{money(o.price)}</p>
              {o.timeline && (
                <p className="mt-1 flex items-center gap-1.5 text-small text-muted">
                  <FiClock aria-hidden="true" /> {o.timeline}
                </p>
              )}
              {o.description && <p className="mt-3 whitespace-pre-line text-small text-muted">{o.description}</p>}
              {o.includes.length > 0 && (
                <ul className="mt-4 grid gap-1.5">
                  {o.includes.map((line) => (
                    <li key={line} className="flex items-start gap-2 text-small text-fg">
                      <FiCheck className="mt-0.5 flex-shrink-0 text-success" aria-hidden="true" /> {line}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )
        })}
      </div>
      {proposal.acceptedBy && (
        <p className="mt-6 border-t border-line/15 pt-4 text-[0.8rem] text-subtle">
          Accepted by {proposal.acceptedBy.name} ({proposal.acceptedBy.email}) on {fmtDate(proposal.decidedAt, { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}.
        </p>
      )}
    </article>
  )
}
