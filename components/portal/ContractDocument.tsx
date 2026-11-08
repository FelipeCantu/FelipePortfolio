import type { Client, Contract } from '@/lib/portal/types'
import { fmtDate } from '@/lib/portal/format'
import { Badge } from './ui'

const STATUS = {
  draft: { label: 'Draft', tone: 'muted' },
  sent: { label: 'Awaiting signature', tone: 'warning' },
  signed: { label: 'Signed', tone: 'success' },
  void: { label: 'Void', tone: 'muted' },
} as const

const when = (iso?: string) => fmtDate(iso, { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' })

/** The agreement as both parties see it; prints cleanly like invoices do. */
export default function ContractDocument({ contract, client }: { contract: Contract; client: Client }) {
  const st = STATUS[contract.status]
  return (
    <article className="invoice-doc card p-6 sm:p-10">
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-line/15 pb-6">
        <div>
          <p className="eyebrow">Agreement</p>
          <h1 className="mt-2 text-h3 text-fg">{contract.title}</h1>
          <p className="mt-1 text-small text-muted">
            Felipe Cantu Jr &amp; {client.name}
            {client.company ? ` (${client.company})` : ''}
          </p>
        </div>
        <Badge tone={st.tone}>{st.label}</Badge>
      </header>

      <div className="whitespace-pre-line py-6 text-[0.95rem] leading-[1.75] text-fg/90 [overflow-wrap:anywhere]">{contract.body}</div>

      <footer className="grid gap-6 border-t border-line/15 pt-6 sm:grid-cols-2">
        <div>
          <p className="text-[0.75rem] font-semibold uppercase tracking-wider text-subtle">Developer</p>
          <p className="mt-2 font-display text-xl italic text-fg">Felipe Cantu Jr</p>
          <p className="text-small text-muted">Issued {fmtDate(contract.sentAt ?? contract.createdAt)}</p>
        </div>
        <div>
          <p className="text-[0.75rem] font-semibold uppercase tracking-wider text-subtle">Client</p>
          {contract.signature ? (
            <>
              <p className="mt-2 font-display text-xl italic text-fg">{contract.signature.name}</p>
              <p className="text-small text-muted">Signed electronically {when(contract.signedAt)}</p>
              <p className="mt-2 text-[0.7rem] leading-relaxed text-subtle [overflow-wrap:anywhere]">
                {contract.signature.email} · IP {contract.signature.ip}
                <br />
                Document fingerprint {contract.signature.contentHash.slice(0, 16)}
              </p>
            </>
          ) : (
            <p className="mt-2 text-small text-muted">{contract.status === 'void' ? 'This agreement was voided.' : 'Not signed yet'}</p>
          )}
        </div>
      </footer>
    </article>
  )
}
