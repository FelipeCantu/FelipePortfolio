import { FiLifeBuoy, FiTrash2 } from 'react-icons/fi'
import type { Role, Ticket, TicketStatus } from '@/lib/portal/types'
import { TICKET_KIND, TICKET_PRIORITY, TICKET_STATUS, fmtDate, timeAgo } from '@/lib/portal/format'
import type { FormState } from '@/app/portal/actions'
import StateForm from './admin/StateForm'
import { Badge, Panel } from './ui'

type Action = (s: FormState, f: FormData) => Promise<FormState>

/**
 * Support requests for a project, shared by both sides. Clients open and
 * reply to requests; Felipe replies and moves them through the statuses.
 */
export default function SupportSection({
  tickets,
  viewer,
  clientName,
  create,
  reply,
  resolve,
  remove,
}: {
  tickets: Ticket[]
  viewer: Role
  clientName?: string
  /** client only: open a new request */
  create?: Action
  reply: (ticketId: string) => Action
  /** client only: close a request that's sorted */
  resolve?: (ticketId: string) => () => Promise<void>
  /** admin only */
  remove?: (ticketId: string) => () => Promise<void>
}) {
  const open = tickets.filter((t) => t.status !== 'done')
  const done = tickets.filter((t) => t.status === 'done')
  const statusLabel = (s: TicketStatus) => (viewer === 'admin' && s === 'waiting' ? 'Waiting on client' : TICKET_STATUS[s].label)

  const row = (t: Ticket) => (
    <li key={t.id}>
      <details className="group rounded-control border border-line/15 bg-bg/40 open:border-line/30">
        <summary className="flex cursor-pointer list-none flex-wrap items-center gap-2 px-3 py-3 sm:px-4">
          <span className="font-mono text-[0.75rem] text-subtle">#{t.number}</span>
          <span className="min-w-0 flex-1 truncate font-medium text-fg">{t.title}</span>
          {t.priority === 'urgent' && <Badge tone="danger">Urgent</Badge>}
          <Badge tone={TICKET_STATUS[t.status].tone}>{statusLabel(t.status)}</Badge>
        </summary>
        <div className="grid gap-3 border-t border-line/10 px-3 py-4 sm:px-4">
          <p className="text-[0.75rem] text-subtle">
            {TICKET_KIND[t.kind]} · {TICKET_PRIORITY[t.priority].label} priority · opened by {viewer === 'client' && t.openedBy === clientName ? 'you' : t.openedBy} {timeAgo(t.createdAt)}
          </p>
          <p className="whitespace-pre-wrap text-small text-fg [overflow-wrap:anywhere]">{t.body}</p>
          {t.pageUrl && (
            <p className="text-small">
              <span className="text-subtle">Page: </span>
              <a href={t.pageUrl} target="_blank" rel="noopener noreferrer" className="break-all text-accent-light">{t.pageUrl}</a>
            </p>
          )}
          {t.replies.length > 0 && (
            <ol className="grid gap-2 border-l-2 border-line/15 pl-3">
              {t.replies.map((r, i) => (
                <li key={i}>
                  <p className="whitespace-pre-wrap text-small text-fg [overflow-wrap:anywhere]">{r.body}</p>
                  <p className="text-[0.7rem] text-subtle">
                    {r.from === viewer ? (viewer === 'admin' ? 'You' : r.name === clientName ? 'You' : r.name) : r.name} · {fmtDate(r.at, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                  </p>
                </li>
              ))}
            </ol>
          )}
          <StateForm action={reply(t.id)} submitLabel={viewer === 'admin' ? 'Save' : 'Send reply'} okLabel={viewer === 'admin' ? 'Saved' : 'Sent'} resetOnOk className="grid gap-2">
            <label className="sr-only" htmlFor={`reply-${t.id}`}>Reply</label>
            <textarea id={`reply-${t.id}`} name="body" rows={2} className="field !min-h-[4.5rem] text-small" placeholder={viewer === 'admin' ? 'Reply to the client (emailed to them)…' : 'Add a reply or more detail…'} required={viewer === 'client'} />
            {viewer === 'admin' && (
              <label className="flex items-center gap-2 text-small text-muted">
                Status
                <select name="status" defaultValue={t.status} className="field !min-h-[2.25rem] !w-auto !py-1 text-small">
                  <option value="open">Open</option>
                  <option value="in_progress">In progress</option>
                  <option value="waiting">Waiting on client</option>
                  <option value="done">Resolved</option>
                </select>
              </label>
            )}
          </StateForm>
          <div className="flex flex-wrap gap-2">
            {resolve && t.status !== 'done' && (
              <form action={resolve?.(t.id)}>
                <button className="btn btn-ghost btn-sm">This is sorted, close it</button>
              </form>
            )}
            {remove && (
              <form action={remove(t.id)}>
                <button className="btn btn-ghost btn-sm hover:!text-danger"><FiTrash2 aria-hidden="true" /> Delete</button>
              </form>
            )}
          </div>
        </div>
      </details>
    </li>
  )

  return (
    <Panel
      id="support"
      title={
        <span className="flex items-center gap-2">
          <FiLifeBuoy aria-hidden="true" /> Support requests {open.length > 0 && <Badge tone="warning">{open.length} open</Badge>}
        </span>
      }
    >
      {viewer === 'client' && (
        <p className="mb-4 text-small text-muted">Found a bug or need a small change? Open a request so it’s tracked until it’s done. For a quick chat, use Messages.</p>
      )}
      {open.length > 0 && <ul className="grid gap-2">{open.map(row)}</ul>}
      {!tickets.length && viewer === 'admin' && <p className="text-small text-muted">No support requests yet. Clients open them from their project page.</p>}
      {done.length > 0 && (
        <details className="mt-3">
          <summary className="cursor-pointer text-small text-accent-light">Resolved ({done.length})</summary>
          <ul className="mt-2 grid gap-2">{done.map(row)}</ul>
        </details>
      )}
      {create && (
        <details className="mt-4 rounded-control border border-line/15 p-4 [&[open]>summary]:mb-4" open={!tickets.length}>
          <summary className="cursor-pointer font-semibold text-fg">New request</summary>
          <StateForm action={create} submitLabel="Send request" okLabel="Sent. Felipe has been notified." resetOnOk>
            <div className="grid gap-3">
              <label className="text-small text-muted">
                What do you need?
                <input name="title" required maxLength={140} placeholder="e.g. Contact form isn’t sending" className="field mt-1" />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-small text-muted">
                  Type
                  <select name="kind" defaultValue="bug" className="field mt-1">
                    <option value="bug">Something is broken</option>
                    <option value="change">Small change</option>
                    <option value="question">Question</option>
                  </select>
                </label>
                <label className="text-small text-muted">
                  How urgent?
                  <select name="priority" defaultValue="normal" className="field mt-1">
                    <option value="low">Low: whenever you get to it</option>
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent: it’s hurting my business</option>
                  </select>
                </label>
              </div>
              <label className="text-small text-muted">
                Details
                <textarea name="body" required maxLength={5000} placeholder="What happened, and what did you expect? Steps to see it help a lot." className="field mt-1 !min-h-[6rem]" />
              </label>
              <label className="text-small text-muted">
                Page link (optional)
                <input name="pageUrl" type="url" placeholder="https://" className="field mt-1" />
              </label>
            </div>
          </StateForm>
        </details>
      )}
    </Panel>
  )
}
