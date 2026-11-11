import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FiArrowDown, FiArrowLeft, FiArrowUp, FiCheck, FiCheckSquare, FiFileText, FiPlay, FiRotateCcw, FiSend, FiSquare, FiStar, FiTrash2, FiPlus } from 'react-icons/fi'
import {
  billingSummary, getClient, getProject, getProjectReview, getSettings, invoiceTotal, listContracts, listFiles,
  listInvoices, listMessages, listProjectActivity, markRead, projectProgress, unreadCount, changeOrders, previews, proposals, tickets,
} from '@/lib/portal/db'
import { emailEnabled } from '@/lib/portal/notify'
import SupportSection from '@/components/portal/SupportSection'
import { AdminChangesPanel, AdminPreviewsPanel, AdminProposalsPanel, AdminWeeklyPanel } from '@/components/portal/admin/AdminProjectExtras'
import { deleteTicketAction, updateTicketAction } from '@/app/portal/admin/more-actions'
import { INVOICE_STATUS, PROJECT_STATUS, fmtDate, money, timeAgo } from '@/lib/portal/format'
import { BLOB_ACCESS } from '@/lib/portal/blob'
import type { ProjectStatus } from '@/lib/portal/types'
import { Badge, PageHeader, Panel, ProgressBar } from '@/components/portal/ui'
import Timeline from '@/components/portal/Timeline'
import FileList from '@/components/portal/FileList'
import FileUploader from '@/components/portal/FileUploader'
import ShareLinkForm from '@/components/portal/ShareLinkForm'
import MessageThread from '@/components/portal/MessageThread'
import Composer from '@/components/portal/Composer'
import StateForm from '@/components/portal/admin/StateForm'
import BriefView from '@/components/portal/BriefView'
import AdminAccessPanel from '@/components/portal/admin/AdminAccessPanel'
import AdminCarePlanPanel from '@/components/portal/admin/AdminCarePlanPanel'
import {
  addClientTaskAction, addMilestoneAction, adminMessageAction, adminRecordUploadAction, adminShareLinkAction,
  deleteClientTaskAction, deleteFileAction, deleteMilestoneAction, deleteProjectAction, moveMilestoneAction,
  quickInvoiceAction, requestReviewAction, resetApprovalAction, setMilestoneStatusAction, updateProjectAction,
} from '@/app/portal/admin/actions'

const CONTRACT_TONE = { draft: 'muted', sent: 'warning', signed: 'success', void: 'muted' } as const
const CONTRACT_LABEL = { draft: 'Draft', sent: 'Awaiting signature', signed: 'Signed', void: 'Void' } as const

const iconBtn = 'inline-flex h-8 w-8 items-center justify-center rounded-full text-subtle transition-colors hover:bg-white/[0.06] hover:text-fg'

export default async function AdminProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getProject(id)
  if (!project) notFound()
  const client = await getClient(project.clientId)
  if (!client) notFound()

  const [quotes, changes, sitePreviews, support] = await Promise.all([proposals.list(id), changeOrders.list(id), previews.list(id), tickets.list(id)])
  const [files, messages, activity, unread, contracts, review, settings, clientInvoices] = await Promise.all([
    listFiles(id),
    listMessages(id),
    listProjectActivity(id, 15),
    unreadCount(id, 'admin'),
    listContracts(id),
    getProjectReview(id),
    getSettings(),
    listInvoices(project.clientId),
  ])
  const invoices = clientInvoices.filter((i) => i.projectId === id)
  const billing = billingSummary(project, clientInvoices)
  const depositPct = settings.depositPercent ?? 50
  if (unread) await markRead(id, 'admin')

  return (
    <div className="grid gap-6">
      <Link href={`/portal/admin/clients/${client.id}`} className="btn btn-ghost btn-sm w-fit !pl-2">
        <FiArrowLeft aria-hidden="true" /> {client.name}
      </Link>
      <PageHeader eyebrow={`Project · ${client.name}`} title={project.name}>
        <Badge tone={PROJECT_STATUS[project.status].tone}>{PROJECT_STATUS[project.status].label}</Badge>
      </PageHeader>

      <div className="card p-5">
        <ProgressBar value={projectProgress(project)} label="Progress (from milestones)" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="grid content-start gap-6">
          <Panel title="Milestones">
            {project.milestones.length > 0 && (
              <Timeline
                milestones={project.milestones}
                renderActions={(m) => (
                  <div className="mt-2 flex flex-wrap items-center gap-1">
                    {m.status !== 'in_progress' && m.status !== 'done' && (
                      <form action={setMilestoneStatusAction.bind(null, id, m.id, 'in_progress')}>
                        <button className="btn btn-ghost btn-sm !min-h-8 !px-3 text-subtle" title="Change this milestone to In progress"><FiPlay aria-hidden="true" /> Mark as started</button>
                      </form>
                    )}
                    {m.status !== 'done' ? (
                      <form action={setMilestoneStatusAction.bind(null, id, m.id, 'done')}>
                        <button className="btn btn-ghost btn-sm !min-h-8 !px-3 text-subtle" title="Change this milestone to Done"><FiCheck aria-hidden="true" /> Mark as done</button>
                      </form>
                    ) : (
                      <form action={setMilestoneStatusAction.bind(null, id, m.id, 'in_progress')}>
                        <button className="btn btn-ghost btn-sm !min-h-8 !px-3 text-subtle" title="Change this milestone back to In progress"><FiRotateCcw aria-hidden="true" /> Reopen</button>
                      </form>
                    )}
                    <form action={moveMilestoneAction.bind(null, id, m.id, -1)}><button className={iconBtn} aria-label={`Move ${m.title} up`}><FiArrowUp /></button></form>
                    <form action={moveMilestoneAction.bind(null, id, m.id, 1)}><button className={iconBtn} aria-label={`Move ${m.title} down`}><FiArrowDown /></button></form>
                    <form action={deleteMilestoneAction.bind(null, id, m.id)}><button className={`${iconBtn} hover:!text-danger`} aria-label={`Delete ${m.title}`}><FiTrash2 /></button></form>
                  </div>
                )}
              />
            )}
            <form action={addMilestoneAction.bind(null, id)} className="mt-5 grid gap-2 border-t border-line/10 pt-5 sm:grid-cols-[1fr_auto_auto]">
              <input name="title" required placeholder="New milestone" className="field !min-h-[2.5rem] !py-2" aria-label="Milestone title" />
              <input name="dueDate" type="date" className="field !min-h-[2.5rem] !py-2" aria-label="Target date" />
              <button className="btn btn-secondary btn-sm"><FiPlus aria-hidden="true" /> Add</button>
            </form>
          </Panel>

          <AdminPreviewsPanel project={project} previews={sitePreviews} />

          <Panel id="files" title="Files & approvals">
            <div className="grid gap-5">
              {files.length > 0 ? (
                <FileList
                  files={files}
                  viewer="admin"
                  clientName={client.name}
                  renderActions={(f) => (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {f.approval?.status === 'changes_requested' && (
                        <form action={resetApprovalAction.bind(null, id, f.id)}>
                          <button className="btn btn-ghost btn-sm !min-h-8 !px-3"><FiRotateCcw aria-hidden="true" /> Ask for review again</button>
                        </form>
                      )}
                      <form action={deleteFileAction.bind(null, id, f.id)}>
                        <button className="btn btn-ghost btn-sm !min-h-8 !px-3 hover:!text-danger"><FiTrash2 aria-hidden="true" /> Delete</button>
                      </form>
                    </div>
                  )}
                />
              ) : (
                <p className="text-small text-muted">No files yet.</p>
              )}
              <div className="grid gap-3 border-t border-line/10 pt-5">
                <FileUploader projectId={id} access={BLOB_ACCESS} allowApproval onUploaded={adminRecordUploadAction.bind(null, id)} />
                <ShareLinkForm action={adminShareLinkAction.bind(null, id)} allowApproval />
              </div>
            </div>
          </Panel>

          {project.brief && (
            <Panel title="Project brief" action={<span className="text-[0.75rem] text-subtle">From their Get Started form · {fmtDate(project.brief.submittedAt)}</span>}>
              <BriefView data={project.brief} />
            </Panel>
          )}

          <Panel title="Project details">
            <StateForm action={updateProjectAction.bind(null, id)}>
              <div className="grid gap-3">
                <label className="text-small text-muted">Name<input name="name" defaultValue={project.name} required className="field mt-1" /></label>
                <label className="text-small text-muted">
                  Status
                  <select name="status" defaultValue={project.status} className="field mt-1">
                    {(Object.keys(PROJECT_STATUS) as ProjectStatus[]).map((s) => (
                      <option key={s} value={s}>{PROJECT_STATUS[s].label}</option>
                    ))}
                  </select>
                </label>
                <label className="text-small text-muted">Summary (client sees this)<textarea name="summary" defaultValue={project.summary} className="field mt-1 !min-h-[5rem]" /></label>
                <label className="text-small text-muted">
                  Project price ($)
                  <input name="price" inputMode="decimal" defaultValue={project.price ? (project.price / 100).toFixed(2) : ''} placeholder="e.g. 4800" className="field mt-1" />
                  <span className="field-hint block">Used for one-click deposit and balance invoices, and pre-filled into agreements.</span>
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="text-small text-muted">Start date<input type="date" name="startDate" defaultValue={project.startDate} className="field mt-1" /></label>
                  <label className="text-small text-muted">Target launch<input type="date" name="dueDate" defaultValue={project.dueDate} className="field mt-1" /></label>
                </div>
                <label className="text-small text-muted">Preview / staging URL<input type="url" name="stagingUrl" defaultValue={project.stagingUrl} placeholder="https://…vercel.app" className="field mt-1" /></label>
                <label className="text-small text-muted">Live URL<input type="url" name="liveUrl" defaultValue={project.liveUrl} placeholder="https://" className="field mt-1" /></label>
              </div>
            </StateForm>
            <p className="mt-3 text-[0.75rem] text-subtle">Setting status to “In review” or “Completed” emails the client (when email is set up).</p>
          </Panel>
        </div>

        <div className="grid content-start gap-6">
          <Panel
            title="Billing"
            action={<Link href={`/portal/admin/clients/${client.id}/invoices/new`} className="btn btn-ghost btn-sm"><FiPlus aria-hidden="true" /> Custom invoice</Link>}
          >
            {project.price ? (
              <>
                <dl className="grid grid-cols-2 gap-3 text-small">
                  <div><dt className="text-subtle">Project price</dt><dd className="font-display text-lg font-bold text-fg">{money(billing.price)}</dd></div>
                  <div><dt className="text-subtle">Paid</dt><dd className="font-display text-lg font-bold text-success">{money(billing.paid)}</dd></div>
                  <div><dt className="text-subtle">Invoiced, unpaid</dt><dd className="font-mono text-fg">{money(billing.outstanding)}</dd></div>
                  <div><dt className="text-subtle">Not invoiced yet</dt><dd className="font-mono text-fg">{money(billing.remaining)}</dd></div>
                </dl>
                <ProgressBar value={billing.price ? Math.min(100, Math.round((billing.paid / billing.price) * 100)) : 0} />
                <div className="mt-4 grid gap-2">
                  {billing.invoiced === 0 && (
                    <form action={quickInvoiceAction.bind(null, id, 'deposit')} className="flex flex-wrap items-center gap-2">
                      <input type="hidden" name="intent" value="send" />
                      <label className="sr-only" htmlFor="dep-pct">Deposit percent</label>
                      <input id="dep-pct" name="percent" type="number" min={1} max={100} defaultValue={depositPct} className="field !min-h-[2.25rem] !w-20 !py-1 text-small" />
                      <span className="text-small text-muted">%</span>
                      <button className="btn btn-gold btn-sm"><FiSend aria-hidden="true" /> Send deposit invoice ({money(Math.round((billing.price * depositPct) / 100))})</button>
                    </form>
                  )}
                  {billing.invoiced > 0 && billing.remaining > 0 && (
                    <form action={quickInvoiceAction.bind(null, id, 'balance')}>
                      <input type="hidden" name="intent" value="send" />
                      <button className="btn btn-gold btn-sm"><FiSend aria-hidden="true" /> Send remaining balance ({money(billing.remaining)})</button>
                    </form>
                  )}
                </div>
              </>
            ) : project.carePlan ? (
              <p className="text-small text-muted">Monthly invoices for this project are set under <a href="#care" className="text-accent-light">Monthly care plan</a>.</p>
            ) : (
              <p className="text-small text-muted">Add a <strong className="text-fg">project price</strong> under Project details to get one-click deposit and balance invoices.</p>
            )}
            {invoices.length > 0 && (
              <ul className="mt-4 grid gap-1 border-t border-line/10 pt-3">
                {invoices.map((inv) => (
                  <li key={inv.id}>
                    <Link href={`/portal/admin/invoices/${inv.id}`} className="flex items-center gap-2 rounded-control px-2 py-1.5 text-small no-underline hover:bg-white/[0.04]">
                      <span className="min-w-0 flex-1 truncate text-fg">{inv.title}</span>
                      <Badge tone={INVOICE_STATUS[inv.status].tone}>{INVOICE_STATUS[inv.status].label}</Badge>
                      <span className="w-20 text-right font-mono text-muted">{money(invoiceTotal(inv))}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <AdminProposalsPanel projectId={id} proposals={quotes} />

          <AdminChangesPanel project={project} changes={changes} />

          <AdminCarePlanPanel project={project} />

          <AdminAccessPanel project={project} />

          <Panel
            title="Agreements"
            action={<Link href={`/portal/admin/projects/${id}/contracts/new`} className="btn btn-secondary btn-sm"><FiPlus aria-hidden="true" /> New agreement</Link>}
          >
            {contracts.length ? (
              <ul className="grid gap-1">
                {contracts.map((c) => (
                  <li key={c.id}>
                    <Link href={`/portal/admin/contracts/${c.id}`} className="flex items-center gap-3 rounded-control px-2 py-2 no-underline hover:bg-white/[0.04]">
                      <FiFileText className="flex-shrink-0 text-accent-light" aria-hidden="true" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-small text-fg">{c.title}</span>
                        <span className="block text-[0.75rem] text-subtle">{c.signedAt ? `Signed by ${c.signature?.name} · ${fmtDate(c.signedAt)}` : `Created ${fmtDate(c.createdAt)}`}</span>
                      </span>
                      <Badge tone={CONTRACT_TONE[c.status]}>{CONTRACT_LABEL[c.status]}</Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-small text-muted">No agreement yet. Create one from your template, pre-filled with this project&apos;s price, dates and milestones.</p>
            )}
          </Panel>

          <Panel title={<span className="flex items-center gap-2"><FiStar aria-hidden="true" /> Client review</span>}>
            {review ? (
              <div>
                <p className="text-gold" aria-label={`${review.rating} out of 5 stars`}>{'★'.repeat(review.rating)}<span className="text-line/30">{'★'.repeat(5 - review.rating)}</span></p>
                <p className="mt-2 whitespace-pre-line text-small text-fg">“{review.text}”</p>
                <p className="mt-2 text-[0.75rem] text-subtle">— {review.displayName}{review.role ? `, ${review.role}` : ''} · {review.allowPublish ? (review.published ? 'On your website' : 'OK to publish') : 'Private'}</p>
                <Link href="/portal/admin/reviews" className="mt-3 inline-block text-small text-accent-light no-underline hover:text-white">Manage reviews →</Link>
              </div>
            ) : (
              <div className="grid gap-3">
                <p className="text-small text-muted">
                  {project.reviewRequestedAt
                    ? `Review requested ${timeAgo(project.reviewRequestedAt)}. It shows on their portal until they leave one.`
                    : 'Clients are asked automatically when you mark the project Completed. You can also ask now.'}
                </p>
                <form action={requestReviewAction.bind(null, id)}>
                  <button className="btn btn-secondary btn-sm"><FiSend aria-hidden="true" /> {project.reviewRequestedAt ? 'Ask again' : 'Ask for a review'}</button>
                </form>
              </div>
            )}
          </Panel>

          <Panel id="messages" title="Messages">
            <div className="grid gap-4">
              <MessageThread messages={messages} viewer="admin" clientName={client.name} />
              <Composer action={adminMessageAction.bind(null, id)} placeholder={`Message ${client.name.split(' ')[0]}…`} />
            </div>
          </Panel>

          <SupportSection
            tickets={support}
            viewer="admin"
            reply={(ticketId) => updateTicketAction.bind(null, id, ticketId)}
            remove={(ticketId) => deleteTicketAction.bind(null, id, ticketId)}
          />

          <AdminWeeklyPanel project={project} globallyOn={settings.weeklyUpdates !== false} emailReady={emailEnabled()} />

          <Panel title="Requests for the client">
            <p className="mb-3 text-small text-muted">Things you need from them. They check these off in their portal.</p>
            {project.clientTasks.length > 0 && (
              <ul className="mb-4 grid gap-1">
                {project.clientTasks.map((t) => (
                  <li key={t.id} className="flex items-center gap-3 rounded-control px-2 py-1.5">
                    <span className={t.done ? 'text-success' : 'text-subtle'} aria-label={t.done ? 'Done' : 'Not done'}>
                      {t.done ? <FiCheckSquare size={18} /> : <FiSquare size={18} />}
                    </span>
                    <span className={`flex-1 text-small ${t.done ? 'text-muted line-through' : 'text-fg'}`}>{t.title}</span>
                    <form action={deleteClientTaskAction.bind(null, id, t.id)}>
                      <button className={`${iconBtn} hover:!text-danger`} aria-label={`Remove ${t.title}`}><FiTrash2 /></button>
                    </form>
                  </li>
                ))}
              </ul>
            )}
            <form action={addClientTaskAction.bind(null, id)} className="flex gap-2">
              <input name="title" required placeholder="e.g. Send product photos" className="field !min-h-[2.5rem] !py-2" aria-label="New request" />
              <button className="btn btn-secondary btn-sm"><FiPlus aria-hidden="true" /> Add</button>
            </form>
          </Panel>

          <Panel title="Activity">
            {activity.length ? (
              <ol className="grid gap-3">
                {activity.map((a) => (
                  <li key={a.id} className="flex gap-2">
                    <span className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${a.actor === 'admin' ? 'bg-accent-light' : 'bg-gold'}`} aria-hidden="true" />
                    <div>
                      <p className="text-small text-fg">{a.text}</p>
                      <p className="text-[0.75rem] text-subtle">{timeAgo(a.at)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-small text-muted">No activity yet.</p>
            )}
          </Panel>

          <Panel title="Danger zone" className="border-danger/25">
            <form action={deleteProjectAction.bind(null, id)} className="grid gap-3">
              <p className="text-small text-muted">Deletes the project with its files and messages. Type DELETE to confirm.</p>
              <input name="confirm" placeholder="DELETE" className="field" aria-label="Type DELETE to confirm" autoComplete="off" />
              <button className="btn btn-sm w-fit border-danger/40 text-danger hover:bg-danger/10">Delete project</button>
            </form>
          </Panel>
        </div>
      </div>
    </div>
  )
}
