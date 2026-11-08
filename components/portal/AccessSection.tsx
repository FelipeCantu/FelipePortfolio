import { FiCheckCircle, FiExternalLink, FiLock, FiSend, FiShield } from 'react-icons/fi'
import type { Project } from '@/lib/portal/types'
import { ACCESS_BY_KEY, ACCESS_STATUS, CUSTOM_STEPS } from '@/lib/portal/access'
import { fmtDate } from '@/lib/portal/format'
import { markAccessInvitedAction } from '@/app/portal/actions'
import { Badge, Panel } from './ui'
import CopyButton from './CopyButton'

/** Client view: give Felipe access to each service without sharing passwords. */
export default function AccessSection({ project, inviteEmail }: { project: Project; inviteEmail: string }) {
  const items = project.access ?? []
  if (!items.length) return null
  const open = items.filter((a) => a.status === 'todo').length

  return (
    <Panel
      id="access"
      title={
        <span className="flex items-center gap-2">
          Accounts &amp; access {open > 0 && <Badge tone="warning">{open} to do</Badge>}
        </span>
      }
    >
      <div className="mb-4 flex gap-3 rounded-control border border-accent/25 bg-accent/[0.06] p-3.5 text-small">
        <FiShield className="mt-0.5 flex-shrink-0 text-accent-light" size={18} aria-hidden="true" />
        <p className="m-0 text-fg/90">
          <strong className="text-fg">You stay the owner of every account.</strong> Instead of sharing passwords, you invite Felipe as a team member with limited
          access. You can remove him any time, and he&apos;ll remove himself when the project is done.{' '}
          <span className="font-semibold text-fg">Never send passwords in messages.</span>
        </p>
      </div>

      <ul className="grid gap-2">
        {items.map((a) => {
          const svc = ACCESS_BY_KEY[a.key]
          const st = ACCESS_STATUS[a.status]
          const usesRecords = !!a.records?.length
          return (
            <li key={a.id}>
              <details className="group rounded-control border border-line/15 bg-bg/40" open={a.status === 'todo'}>
                <summary className="flex cursor-pointer list-none items-center gap-3 p-3.5">
                  <span className={a.status === 'confirmed' || a.status === 'removed' ? 'text-success' : 'text-subtle'} aria-hidden="true">
                    {a.status === 'confirmed' || a.status === 'removed' ? <FiCheckCircle size={18} /> : <FiLock size={18} />}
                  </span>
                  <span className="min-w-0 flex-1 font-semibold text-fg">{a.name}</span>
                  <Badge tone={st.tone}>{st.label}</Badge>
                </summary>

                <div className="grid gap-3 border-t border-line/10 px-3.5 pb-4 pt-3 text-small">
                  {svc?.why && <p className="m-0 text-muted">{svc.why}</p>}
                  {a.note && <p className="m-0 rounded-control bg-white/[0.04] px-3 py-2 text-fg"><span className="font-semibold">Note from Felipe:</span> {a.note}</p>}

                  {usesRecords ? (
                    <>
                      <p className="m-0 text-fg">
                        <strong>Easiest option:</strong> add these records where you manage your domain (look for “DNS” or “DNS records”). No invite needed.
                      </p>
                      <div className="overflow-x-auto rounded-control border border-line/15">
                        <table className="w-full min-w-[30rem] text-left text-[0.8rem]">
                          <thead className="bg-white/[0.03] text-subtle">
                            <tr>
                              <th scope="col" className="px-3 py-2 font-semibold">Type</th>
                              <th scope="col" className="px-3 py-2 font-semibold">Name / Host</th>
                              <th scope="col" className="px-3 py-2 font-semibold">Value / Points to</th>
                            </tr>
                          </thead>
                          <tbody>
                            {a.records!.map((r, i) => (
                              <tr key={i} className="border-t border-line/10">
                                <td className="px-3 py-2 font-mono text-fg">{r.type}</td>
                                <td className="px-3 py-2 font-mono text-fg">{r.name} <CopyButton value={r.name} label={`${r.type} name`} /></td>
                                <td className="px-3 py-2 font-mono text-fg [overflow-wrap:anywhere]">{r.value} <CopyButton value={r.value} label={`${r.type} value`} /></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="m-0 text-[0.78rem] text-subtle">“@” means your main domain with nothing in front. Changes can take up to a few hours to work.</p>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-subtle">Invite this email:</span>
                        <span className="rounded-pill bg-white/[0.06] px-2.5 py-0.5 font-mono text-fg">{inviteEmail}</span>
                        <CopyButton value={inviteEmail} label="Felipe's email" />
                      </div>
                      {svc?.role && (
                        <p className="m-0">
                          <span className="text-subtle">Choose this access level:</span> <strong className="text-fg">{svc.role}</strong>
                        </p>
                      )}
                      <ol className="m-0 grid list-decimal gap-1 pl-5 text-fg/90 marker:text-accent-light">
                        {(svc?.steps ?? CUSTOM_STEPS).map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ol>
                      <p className="m-0 text-[0.78rem] text-subtle">
                        Menus look different? Search the service&apos;s settings for “users”, “team” or “invite”, or send Felipe a message and he&apos;ll walk you through it.
                        {svc?.help && (
                          <>
                            {' '}
                            <a href={svc.help} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent-light no-underline hover:text-white">
                              Official help page <FiExternalLink aria-hidden="true" />
                            </a>
                          </>
                        )}
                      </p>
                    </>
                  )}

                  {a.status === 'todo' && (
                    <form action={markAccessInvitedAction.bind(null, project.id, a.id)}>
                      <button type="submit" className="btn btn-primary btn-sm">
                        <FiSend aria-hidden="true" /> {usesRecords ? 'I’ve added these records' : 'I’ve sent the invite'}
                      </button>
                    </form>
                  )}
                  {a.status === 'invited' && <p className="m-0 text-accent-light">Thanks! Felipe will accept it and confirm here{a.invitedAt ? ` (sent ${fmtDate(a.invitedAt, { month: 'short', day: 'numeric' })})` : ''}.</p>}
                  {a.status === 'confirmed' && <p className="m-0 text-success">Felipe has access{a.confirmedAt ? ` since ${fmtDate(a.confirmedAt)}` : ''}. You can remove him any time from the same settings page.</p>}
                  {a.status === 'removed' && <p className="m-0 text-muted">Felipe removed his own access{a.removedAt ? ` on ${fmtDate(a.removedAt)}` : ''}. The account is fully yours.</p>}
                </div>
              </details>
            </li>
          )
        })}
      </ul>
    </Panel>
  )
}
