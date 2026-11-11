import Link from 'next/link'
import { FiClipboard, FiExternalLink, FiEye, FiMail, FiPlus, FiPlusCircle, FiTrash2 } from 'react-icons/fi'
import { Badge, Panel } from '@/components/portal/ui'
import StateForm from '@/components/portal/admin/StateForm'
import { APPROVAL_STATUS, CHANGE_STATUS, PROPOSAL_STATUS, fmtDate, money } from '@/lib/portal/format'
import { proposalExpired } from '@/lib/portal/db'
import type { ChangeOrder, Preview, Project, Proposal } from '@/lib/portal/types'
import {
  createChangeAction, createPreviewAction, deleteChangeAction, deletePreviewAction, sendWeeklyNowAction, setProjectWeeklyAction,
} from '@/app/portal/admin/more-actions'

const iconBtn = 'inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-subtle transition-colors hover:bg-white/[0.06] hover:!text-danger'

export function AdminProposalsPanel({ projectId, proposals }: { projectId: string; proposals: Proposal[] }) {
  return (
    <Panel
      id="proposals"
      title={<span className="flex items-center gap-2"><FiClipboard aria-hidden="true" /> Proposals</span>}
      action={<Link href={`/portal/admin/projects/${projectId}/proposals/new`} className="btn btn-secondary btn-sm"><FiPlus aria-hidden="true" /> New proposal</Link>}
    >
      {proposals.length ? (
        <ul className="grid gap-1">
          {proposals.map((q) => {
            const st = PROPOSAL_STATUS[proposalExpired(q) ? 'expired' : q.status]
            const accepted = q.options.find((o) => o.id === q.acceptedOptionId)
            return (
              <li key={q.id}>
                <Link href={`/portal/admin/projects/${projectId}/proposals/${q.id}`} className="flex items-center gap-3 rounded-control px-2 py-2 no-underline hover:bg-white/[0.04]">
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-small text-fg">{q.title}</span>
                    <span className="block text-[0.75rem] text-subtle">
                      {accepted ? `${accepted.name} · ${money(accepted.price)}` : q.options.map((o) => money(o.price)).join(' / ')}
                      {q.validUntil && q.status === 'sent' ? ` · valid until ${fmtDate(q.validUntil, { month: 'short', day: 'numeric' })}` : ''}
                    </span>
                  </span>
                  <Badge tone={st.tone}>{st.label}</Badge>
                </Link>
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="text-small text-muted">Send a priced quote with up to three options. When the client accepts, the agreement and deposit invoice go out on their own.</p>
      )}
    </Panel>
  )
}

export function AdminChangesPanel({ project, changes }: { project: Project; changes: ChangeOrder[] }) {
  return (
    <Panel id="changes" title={<span className="flex items-center gap-2"><FiPlusCircle aria-hidden="true" /> Change requests</span>}>
      <p className="mb-3 text-small text-muted">Work outside the agreed scope. The client approves the price first; once approved it’s added to the project price.</p>
      {changes.length > 0 && (
        <ul className="mb-4 grid gap-2">
          {changes.map((c) => (
            <li key={c.id} className="flex items-start gap-2 rounded-control border border-line/15 bg-bg/40 p-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="min-w-0 flex-1 text-small font-medium text-fg">{c.title}</p>
                  <Badge tone={CHANGE_STATUS[c.status].tone}>{c.status === 'sent' ? 'Awaiting client' : CHANGE_STATUS[c.status].label}</Badge>
                </div>
                <p className="mt-1 text-[0.75rem] text-subtle">
                  +{money(c.price)}
                  {c.addDays ? ` · +${c.addDays} days` : ''} · {c.billing === 'now' ? 'invoice on approval' : 'added to balance'} · sent {fmtDate(c.createdAt, { month: 'short', day: 'numeric' })}
                  {c.decidedBy ? ` · ${c.status} by ${c.decidedBy}` : ''}
                </p>
                {c.note && <p className="mt-1 text-small text-muted">“{c.note}”</p>}
                {c.invoiceId && <Link href={`/portal/admin/invoices/${c.invoiceId}`} className="mt-1 inline-block text-[0.8rem] text-accent-light no-underline">View invoice →</Link>}
              </div>
              {c.status !== 'approved' && (
                <form action={deleteChangeAction.bind(null, project.id, c.id)}>
                  <button className={iconBtn} aria-label={`Delete ${c.title}`}><FiTrash2 /></button>
                </form>
              )}
            </li>
          ))}
        </ul>
      )}
      <details className="rounded-control border border-line/15 p-4 [&[open]>summary]:mb-4">
        <summary className="flex cursor-pointer items-center gap-2 font-semibold text-fg"><FiPlus aria-hidden="true" /> New change request</summary>
        <StateForm action={createChangeAction.bind(null, project.id)} submitLabel="Send to client" okLabel="Sent" resetOnOk>
          <div className="grid gap-3">
            <label className="text-small text-muted">What’s being added<input name="title" required maxLength={140} placeholder="e.g. Add a booking calendar" className="field mt-1" /></label>
            <label className="text-small text-muted">Details (the client reads this)<textarea name="description" required className="field mt-1 !min-h-[5rem]" placeholder="What you’ll do and why it wasn’t part of the original plan." /></label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-small text-muted">Price ($)<input name="price" inputMode="decimal" required placeholder="e.g. 350" className="field mt-1" /></label>
              <label className="text-small text-muted">Extra days (optional)<input name="addDays" type="number" min={0} max={365} placeholder="0" className="field mt-1" /></label>
            </div>
            <label className="text-small text-muted">
              Billing
              <select name="billing" defaultValue="balance" className="field mt-1">
                <option value="balance">Add to the remaining balance</option>
                <option value="now">Invoice as soon as they approve</option>
              </select>
            </label>
          </div>
        </StateForm>
      </details>
    </Panel>
  )
}

export function AdminPreviewsPanel({ project, previews }: { project: Project; previews: Preview[] }) {
  return (
    <Panel id="previews" title={<span className="flex items-center gap-2"><FiEye aria-hidden="true" /> Site previews</span>}>
      <p className="mb-3 text-small text-muted">
        Share the site before it goes live. The client opens it inside their portal at computer, tablet and phone sizes, then approves it or asks for changes.
      </p>
      {previews.length > 0 && (
        <ul className="mb-4 grid gap-2">
          {previews.map((p) => (
            <li key={p.id} className="flex items-start gap-2 rounded-control border border-line/15 bg-bg/40 p-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="min-w-0 flex-1 text-small font-medium text-fg">{p.title}</p>
                  <Badge tone={APPROVAL_STATUS[p.status].tone}>{p.status === 'pending' ? 'Awaiting client' : p.status === 'approved' ? 'Approved to go live' : APPROVAL_STATUS[p.status].label}</Badge>
                </div>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-1 flex items-center gap-1 break-all text-[0.75rem] text-accent-light no-underline">
                  <FiExternalLink className="flex-shrink-0" aria-hidden="true" /> {p.url}
                </a>
                <p className="mt-1 text-[0.75rem] text-subtle">
                  Shared {fmtDate(p.createdAt, { month: 'short', day: 'numeric' })}
                  {p.decidedBy ? ` · ${p.status === 'approved' ? 'approved' : 'feedback'} by ${p.decidedBy} ${fmtDate(p.decidedAt, { month: 'short', day: 'numeric' })}` : ''}
                </p>
                {p.feedback && (
                  <p className="mt-2 rounded-control border-l-2 border-danger/60 bg-danger/[0.06] px-3 py-2 text-small text-fg/90">
                    <span className="font-semibold">{p.status === 'approved' ? 'Note' : 'Feedback'}:</span> <span className="whitespace-pre-line">{p.feedback}</span>
                  </p>
                )}
              </div>
              <form action={deletePreviewAction.bind(null, project.id, p.id)}>
                <button className={iconBtn} aria-label={`Delete ${p.title}`}><FiTrash2 /></button>
              </form>
            </li>
          ))}
        </ul>
      )}
      <details className="rounded-control border border-line/15 p-4 [&[open]>summary]:mb-4" open={!previews.length}>
        <summary className="flex cursor-pointer items-center gap-2 font-semibold text-fg"><FiPlus aria-hidden="true" /> Share a preview</summary>
        <StateForm action={createPreviewAction.bind(null, project.id)} submitLabel="Share with client" okLabel="Shared" resetOnOk>
          <div className="grid gap-3">
            <label className="text-small text-muted">Name<input name="title" required maxLength={120} placeholder="e.g. Homepage, second pass" className="field mt-1" /></label>
            <label className="text-small text-muted">
              Preview link
              <input name="url" type="url" required defaultValue={previews.length ? '' : project.stagingUrl} placeholder="https://your-project-git-branch.vercel.app" className="field mt-1" />
              <span className="field-hint block">
                A Vercel preview or staging URL. It has to open without a login: for a protected Vercel preview, use its shareable link, or turn off Deployment Protection for that project.
              </span>
            </label>
            <label className="text-small text-muted">What to look at (optional)<textarea name="note" className="field mt-1 !min-h-[4.5rem]" placeholder="e.g. New hero section and the pricing page. The blog isn’t styled yet." /></label>
          </div>
        </StateForm>
      </details>
    </Panel>
  )
}

export function AdminWeeklyPanel({ project, globallyOn, emailReady }: { project: Project; globallyOn: boolean; emailReady: boolean }) {
  const on = project.weeklyUpdates !== false
  return (
    <Panel
      id="weekly"
      title={<span className="flex items-center gap-2"><FiMail aria-hidden="true" /> Weekly progress email</span>}
      action={<Badge tone={on && globallyOn ? 'success' : 'neutral'}>{on && globallyOn ? 'On' : 'Off'}</Badge>}
    >
      <p className="mb-3 text-small text-muted">
        {!globallyOn
          ? 'Weekly emails are switched off in Settings.'
          : on
            ? 'Every Monday morning the client gets a summary: what got done, what’s next, and what you’re waiting on from them. Skipped when there’s nothing to report or the project is completed or on hold.'
            : 'This project is left out of the Monday emails.'}
        {project.weeklySentOn ? ` Last sent ${fmtDate(project.weeklySentOn)}.` : ''}
      </p>
      {!emailReady && <p className="mb-3 text-small text-warning">Email isn’t set up (RESEND_API_KEY), so nothing will send.</p>}
      <div className="flex flex-wrap items-start gap-2">
        <StateForm action={sendWeeklyNowAction.bind(null, project.id)} submitLabel="Send an update now" pendingLabel="Sending…" submitClass="btn btn-secondary btn-sm" className="grid gap-2" okLabel="Sent">
          <span className="sr-only">Send this week’s progress summary to the client now</span>
        </StateForm>
        <form action={setProjectWeeklyAction.bind(null, project.id, !on)}>
          <button className="btn btn-ghost btn-sm">{on ? 'Turn off for this project' : 'Turn on for this project'}</button>
        </form>
      </div>
    </Panel>
  )
}
