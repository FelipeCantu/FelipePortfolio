import { FiCheck, FiPlus, FiRotateCcw, FiSend, FiTrash2, FiUserMinus, FiZap } from 'react-icons/fi'
import type { Project } from '@/lib/portal/types'
import { ACCESS_SERVICES, ACCESS_STATUS } from '@/lib/portal/access'
import { fmtDate, timeAgo } from '@/lib/portal/format'
import { Badge, Panel } from '../ui'
import StateForm from './StateForm'
import {
  addAccessAction, deleteAccessAction, saveAccessDetailsAction, sendHandoffSummaryAction, setAccessStatusAction, suggestAccessAction,
} from '@/app/portal/admin/actions'

const iconBtn = 'inline-flex h-8 w-8 items-center justify-center rounded-full text-subtle transition-colors hover:bg-white/[0.06] hover:text-fg'

/** Felipe's view: track access per service and step out cleanly at launch. */
export default function AdminAccessPanel({ project }: { project: Project }) {
  const items = project.access ?? []
  const id = project.id
  const stillHas = items.filter((a) => a.status === 'confirmed')
  const removed = items.filter((a) => a.status === 'removed')
  const showHandoff = stillHas.length + removed.length > 0 && (project.status === 'review' || project.status === 'completed' || removed.length > 0)

  return (
    <Panel id="access" title="Accounts & access">
      <p className="mb-3 text-small text-muted">Clients invite you as a team member — no passwords. They see a plain-English guide for each service.</p>

      {items.length > 0 && (
        <ul className="mb-4 grid gap-2">
          {items.map((a) => {
            const st = ACCESS_STATUS[a.status]
            return (
              <li key={a.id} className="rounded-control border border-line/15 bg-bg/40 p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="min-w-0 flex-1 text-small font-semibold text-fg">{a.name}</span>
                  <Badge tone={st.tone}>{st.label}</Badge>
                </div>
                <p className="mt-1 text-[0.75rem] text-subtle">
                  {a.status === 'invited' && a.invitedAt && `Client says they sent it ${timeAgo(a.invitedAt)} — check your email and accept.`}
                  {a.status === 'confirmed' && a.confirmedAt && `Confirmed ${fmtDate(a.confirmedAt)}.`}
                  {a.status === 'removed' && a.removedAt && `You removed your access ${fmtDate(a.removedAt)}.`}
                  {a.status === 'todo' && 'Waiting on the client.'}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-1">
                  {(a.status === 'todo' || a.status === 'invited') && (
                    <form action={setAccessStatusAction.bind(null, id, a.id, 'confirmed')}>
                      <button className="btn btn-ghost btn-sm !min-h-8 !px-3"><FiCheck aria-hidden="true" /> Mark access confirmed</button>
                    </form>
                  )}
                  {a.status === 'confirmed' && (
                    <form action={setAccessStatusAction.bind(null, id, a.id, 'removed')}>
                      <button className="btn btn-ghost btn-sm !min-h-8 !px-3" title="Do this after removing yourself in the service"><FiUserMinus aria-hidden="true" /> I removed my access</button>
                    </form>
                  )}
                  {a.status !== 'todo' && (
                    <form action={setAccessStatusAction.bind(null, id, a.id, 'todo')}>
                      <button className={iconBtn} aria-label={`Reset ${a.name} to To do`} title="Reset to To do"><FiRotateCcw /></button>
                    </form>
                  )}
                  <form action={deleteAccessAction.bind(null, id, a.id)}>
                    <button className={`${iconBtn} hover:!text-danger`} aria-label={`Remove ${a.name} from the list`} title="Remove from list"><FiTrash2 /></button>
                  </form>
                </div>
                <details className="mt-2">
                  <summary className="cursor-pointer text-[0.75rem] text-accent-light">Note for the client{a.key.startsWith('domain') || a.key === 'godaddy' || a.key === 'namecheap' || a.key.includes('domain') ? ' / DNS records' : ''}</summary>
                  <div className="mt-2">
                    <StateForm action={saveAccessDetailsAction.bind(null, id, a.id)} className="grid gap-2">
                      <textarea name="note" defaultValue={a.note} rows={2} placeholder="Optional, e.g. “Pick Developer, not Administrator”" className="field !min-h-[3.5rem] text-small" aria-label="Note for the client" />
                      {(a.key === 'custom' || a.key.includes('domain') || a.key === 'godaddy' || a.key === 'namecheap') && (
                        <>
                          <textarea
                            name="records"
                            defaultValue={a.records?.map((r) => `${r.type} ${r.name} ${r.value}`).join('\n')}
                            rows={3}
                            placeholder={'Optional DNS records instead of an invite, one per line:\nA @ 76.76.21.21\nCNAME www cname.vercel-dns.com'}
                            className="field !min-h-[4.5rem] font-mono text-[0.8rem]"
                            aria-label="DNS records, one per line"
                          />
                          <p className="text-[0.72rem] text-subtle">With records filled in, the client sees a copy-paste table instead of the invite guide. Get the exact values from Vercel → Domains.</p>
                        </>
                      )}
                    </StateForm>
                  </div>
                </details>
              </li>
            )
          })}
        </ul>
      )}

      <form action={addAccessAction.bind(null, id)} className="grid gap-2 sm:grid-cols-[1fr_auto]">
        <select name="key" className="field !min-h-[2.5rem] !py-2 text-small" defaultValue="" aria-label="Service">
          <option value="">Custom service (type a name) →</option>
          {ACCESS_SERVICES.filter((s) => !items.some((a) => a.key === s.key)).map((s) => (
            <option key={s.key} value={s.key}>{s.name}</option>
          ))}
        </select>
        <input name="customName" placeholder="Custom service name" className="field !min-h-[2.5rem] !py-2 text-small sm:col-span-1" aria-label="Custom service name" />
        <button className="btn btn-secondary btn-sm w-fit sm:col-span-2"><FiPlus aria-hidden="true" /> Add to their checklist</button>
      </form>
      {project.brief && (
        <form action={suggestAccessAction.bind(null, id)} className="mt-2">
          <button className="btn btn-ghost btn-sm !pl-2"><FiZap aria-hidden="true" /> Suggest from their Get Started answers</button>
        </form>
      )}

      {showHandoff && (
        <div className="mt-5 rounded-control border border-success/25 bg-success/[0.05] p-4">
          <p className="font-semibold text-fg">Launch handoff</p>
          <ol className="mt-2 grid list-decimal gap-1 pl-5 text-small text-muted">
            <li>Remove yourself in each service, then click “I removed my access” above.{stillHas.length ? ` (${stillHas.length} left)` : ' ✓'}</li>
            <li>Email the client a summary confirming they own every account.</li>
          </ol>
          <form action={sendHandoffSummaryAction.bind(null, id)} className="mt-3">
            <button className="btn btn-sm bg-success/90 text-[#03140d] hover:bg-success"><FiSend aria-hidden="true" /> {project.handoffSentAt ? 'Send summary again' : 'Email handoff summary'}</button>
          </form>
          {project.handoffSentAt && <p className="mt-2 text-[0.75rem] text-subtle">Sent {fmtDate(project.handoffSentAt)}.</p>}
        </div>
      )}
    </Panel>
  )
}
