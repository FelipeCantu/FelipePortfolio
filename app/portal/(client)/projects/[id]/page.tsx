import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FiArrowRight, FiCalendar, FiCheckSquare, FiExternalLink, FiFileText, FiFolder, FiSquare, FiCheckCircle, FiMonitor, FiHeart, FiCheck, FiClipboard, FiCreditCard, FiEye, FiPlusCircle, FiAlertCircle } from 'react-icons/fi'
import { requireClientProject } from '@/lib/portal/session'
import {
  changeOrders, getProject, getProjectReview, getSettings, listContracts, listFiles, listMessages, markRead, previews, projectProgress,
  proposalExpired, proposals, tickets, unreadCount,
} from '@/lib/portal/db'
import { confirmAutopaySetup, paymentsEnabled } from '@/lib/portal/payments'
import DecisionForm from '@/components/portal/DecisionForm'
import SupportSection from '@/components/portal/SupportSection'
import FeedbackForm from '@/components/portal/FeedbackForm'
import { bookingHref } from '@/lib/portal/booking'
import BriefView from '@/components/portal/BriefView'
import AccessSection from '@/components/portal/AccessSection'
import { DEFAULT_ACCESS_EMAIL } from '@/lib/portal/access'
import { taskHint } from '@/lib/portal/intake'
import { APPROVAL_STATUS, CHANGE_STATUS, PROJECT_STATUS, PROPOSAL_STATUS, fmtDate, money } from '@/lib/portal/format'
import { nextBillingDate } from '@/lib/portal/carePlans'
import { BLOB_ACCESS } from '@/lib/portal/blob'
import { Badge, Empty, PageHeader, Panel, ProgressBar } from '@/components/portal/ui'
import Timeline from '@/components/portal/Timeline'
import FileList from '@/components/portal/FileList'
import FileUploader from '@/components/portal/FileUploader'
import ShareLinkForm from '@/components/portal/ShareLinkForm'
import ReviewForm from '@/components/portal/ReviewForm'
import MessageThread from '@/components/portal/MessageThread'
import Composer from '@/components/portal/Composer'
import {
  createTicketAction, decideChangeAction, recordClientUploadAction, replyTicketAction, resolveTicketAction, reviewFileAction,
  sendMessageAction, shareLinkAction, startAutopayAction, stopAutopayAction, submitReviewAction, toggleClientTaskAction,
} from '@/app/portal/actions'

export default async function ClientProjectPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ autopay?: string }> }) {
  const { id } = await params
  const { autopay: autopaySession } = await searchParams
  const found = await requireClientProject(id)
  const client = found.client
  if (!found.project) notFound()
  // Back from Stripe after saving a card for auto-pay
  let autopayJustOn = false
  if (autopaySession && found.project.carePlan && !found.project.carePlan.autopay) autopayJustOn = await confirmAutopaySetup(id, autopaySession)
  const project = (autopayJustOn ? await getProject(id) : null) ?? found.project

  const [files, messages, unread, allContracts, review, settings, allProposals, changes, sitePreviews, support] = await Promise.all([
    listFiles(id),
    listMessages(id),
    unreadCount(id, 'client'),
    listContracts(id),
    getProjectReview(id),
    getSettings(),
    proposals.list(id),
    changeOrders.list(id),
    previews.list(id),
    tickets.list(id),
  ])
  const quotes = allProposals.filter((q) => q.status !== 'draft')
  const openQuotes = quotes.filter((q) => q.status === 'sent' && !proposalExpired(q))
  const pendingChanges = changes.filter((c) => c.status === 'sent')
  const latestPreview = sitePreviews[0]
  const showSupport = !!project.carePlan?.active || project.status === 'completed' || support.length > 0
  const plan = project.carePlan
  const contracts = allContracts.filter((c) => c.status === 'sent' || c.status === 'signed')
  const toSign = contracts.filter((c) => c.status === 'sent')
  const askReview = project.status === 'completed' || !!project.reviewRequestedAt
  if (unread) await markRead(id, 'client')

  const st = PROJECT_STATUS[project.status]
  const progress = projectProgress(project)
  const pending = files.filter((f) => f.approval?.status === 'pending')
  const rest = files.filter((f) => f.approval?.status !== 'pending')
  const openTasks = project.clientTasks.filter((t) => !t.done).length

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Project"
        title={project.name}
        action={
          <div className="flex flex-wrap gap-2">
            <a href={bookingHref(settings, client, project)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
              <FiCalendar aria-hidden="true" /> Book a call
            </a>
            {latestPreview ? (
              <Link href={`/portal/projects/${id}/preview/${latestPreview.id}`} className="btn btn-secondary btn-sm">
                <FiMonitor aria-hidden="true" /> Preview site
              </Link>
            ) : project.stagingUrl ? (
              <a href={project.stagingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                <FiMonitor aria-hidden="true" /> Preview site
              </a>
            ) : null}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-sm">
                <FiExternalLink aria-hidden="true" /> Live site
              </a>
            )}
          </div>
        }
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-small">
          <Badge tone={st.tone}>{st.label}</Badge>
          {project.startDate && <span>Started {fmtDate(project.startDate)}</span>}
          {project.dueDate && <span>Target launch {fmtDate(project.dueDate)}</span>}
        </div>
        {project.summary && <p className="mt-3 max-w-prose-lg whitespace-pre-line">{project.summary}</p>}
      </PageHeader>

      {openQuotes.map((q) => (
        <Link key={q.id} href={`/portal/projects/${id}/proposals/${q.id}`} className="card-interactive group flex flex-wrap items-center gap-4 border-gold/40 bg-gold/[0.06] p-5 no-underline">
          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold" aria-hidden="true">
            <FiClipboard size={20} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-semibold text-fg">Your proposal is ready: {q.title}</span>
            <span className="block text-small text-muted">
              {q.options.length > 1 ? `${q.options.length} options from ${money(Math.min(...q.options.map((o) => o.price)))}` : money(q.options[0].price)}
              {q.validUntil ? ` · valid until ${fmtDate(q.validUntil)}` : ''}
            </span>
          </span>
          <span className="btn btn-gold btn-sm">View proposal <FiArrowRight aria-hidden="true" /></span>
        </Link>
      ))}

      {toSign.map((c) => (
        <Link key={c.id} href={`/portal/contracts/${c.id}`} className="card-interactive group flex items-center gap-4 border-gold/40 bg-gold/[0.06] p-5 no-underline">
          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold" aria-hidden="true">
            <FiFileText size={20} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-semibold text-fg">Please review and sign: {c.title}</span>
            <span className="block text-small text-muted">Takes about two minutes. Ask Felipe anything before you sign.</span>
          </span>
          <span className="btn btn-gold btn-sm">Review &amp; sign <FiArrowRight aria-hidden="true" /></span>
        </Link>
      ))}

      <div className="card p-5 sm:p-6">
        <ProgressBar value={progress} label="Overall progress" />
      </div>

      {askReview && (
        <Panel id="review" title={review ? 'Your review' : 'How did it go?'}>
          {!review && <p className="mb-4 text-small text-muted">Your project is wrapped up. A quick rating and a few words would mean a lot.</p>}
          <FeedbackForm action={submitReviewAction.bind(null, id)} existing={review} defaultName={client.name} />
        </Panel>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="grid content-start gap-6">
          <Panel title="Milestones">
            {project.milestones.length ? (
              <Timeline milestones={project.milestones} />
            ) : (
              <p className="text-small text-muted">Felipe is putting together the project plan. Milestones will appear here.</p>
            )}
          </Panel>

          {sitePreviews.length > 0 && (
            <Panel
              id="previews"
              title={
                <span className="flex items-center gap-2">
                  <FiEye aria-hidden="true" /> Site previews {sitePreviews.some((p) => p.status === 'pending') && <Badge tone="warning">To review</Badge>}
                </span>
              }
            >
              <p className="mb-3 text-small text-muted">See the site before it goes live, on a computer, tablet or phone. Nothing here is public until you approve it.</p>
              <ul className="grid gap-2">
                {sitePreviews.map((p, i) => (
                  <li key={p.id}>
                    <Link
                      href={`/portal/projects/${id}/preview/${p.id}`}
                      className={`flex flex-wrap items-center gap-3 rounded-control border p-3 no-underline transition-colors hover:bg-white/[0.04] sm:p-4 ${p.status === 'pending' ? 'border-warning/30 bg-warning/[0.04]' : 'border-line/15 bg-bg/40'}`}
                    >
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-control bg-accent/10 text-accent-light" aria-hidden="true"><FiMonitor /></span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium text-fg">{p.title}{i === 0 && sitePreviews.length > 1 ? ' (latest)' : ''}</span>
                        <span className="block text-[0.75rem] text-subtle">Shared {fmtDate(p.createdAt, { month: 'short', day: 'numeric' })}</span>
                      </span>
                      <Badge tone={APPROVAL_STATUS[p.status].tone}>{APPROVAL_STATUS[p.status].label}</Badge>
                      <span className="btn btn-secondary btn-sm">Open <FiArrowRight aria-hidden="true" /></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Panel>
          )}

          {changes.length > 0 && (
            <Panel
              id="changes"
              title={
                <span className="flex items-center gap-2">
                  <FiPlusCircle aria-hidden="true" /> Change requests {pendingChanges.length > 0 && <Badge tone="warning">{pendingChanges.length} to answer</Badge>}
                </span>
              }
            >
              <p className="mb-3 text-small text-muted">Extra work outside the original plan. Felipe prices it first, and nothing starts until you approve.</p>
              <ul className="grid gap-2">
                {changes.map((c) => (
                  <li key={c.id} className={`rounded-control border p-3 sm:p-4 ${c.status === 'sent' ? 'border-warning/30 bg-warning/[0.04]' : 'border-line/15 bg-bg/40'}`}>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="min-w-0 flex-1 font-medium text-fg">{c.title}</p>
                      <Badge tone={CHANGE_STATUS[c.status].tone}>{CHANGE_STATUS[c.status].label}</Badge>
                    </div>
                    <p className="mt-1.5 whitespace-pre-line text-small text-muted">{c.description}</p>
                    <p className="mt-2 text-small text-fg">
                      <span className="font-display text-lg font-bold">{c.price ? `+${money(c.price)}` : 'No extra charge'}</span>
                      <span className="text-subtle">
                        {c.addDays ? ` · adds about ${c.addDays} day${c.addDays === 1 ? '' : 's'}` : ''}
                        {c.price ? (c.billing === 'now' ? ' · invoiced when you approve' : ' · added to your remaining balance') : ''}
                      </span>
                    </p>
                    {c.status === 'sent' ? (
                      <DecisionForm action={decideChangeAction.bind(null, id, c.id)} approveLabel={c.price ? `Approve +${money(c.price)}` : 'Approve'} declineLabel="Decline" notePrompt="Why not, or what would you change? (optional)" />
                    ) : (
                      <p className="mt-1 text-[0.75rem] text-subtle">
                        {c.status === 'approved' ? 'Approved' : 'Declined'} by {c.decidedBy === client.name ? 'you' : c.decidedBy} · {fmtDate(c.decidedAt)}
                        {c.note ? ` · “${c.note}”` : ''}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </Panel>
          )}

          <AccessSection project={project} inviteEmail={settings.accessEmail || DEFAULT_ACCESS_EMAIL} />

          {project.brief && (
            <details className="card group p-5 sm:p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-lg font-bold text-fg">
                Your project brief
                <span className="text-small font-normal text-accent-light group-open:hidden">Show</span>
                <span className="hidden text-small font-normal text-accent-light group-open:inline">Hide</span>
              </summary>
              <p className="mb-4 mt-1 text-small text-muted">What you told Felipe when you got started. Something changed? Send a message.</p>
              <BriefView data={project.brief} showContact={false} />
            </details>
          )}

          <Panel
            id="files"
            title={
              <span className="flex items-center gap-2">
                Files &amp; approvals {pending.length > 0 && <Badge tone="warning">{pending.length} to review</Badge>}
              </span>
            }
          >
            <div className="grid gap-5">
              {pending.length > 0 && (
                <div>
                  <p className="mb-2 text-small font-semibold text-warning">Ready for your review</p>
                  <FileList
                    files={pending}
                    viewer="client"
                    clientName={client.name}
                    renderActions={(f) => <ReviewForm action={reviewFileAction.bind(null, id, f.id)} />}
                  />
                </div>
              )}
              {rest.length > 0 ? (
                <div>
                  {pending.length > 0 && <p className="mb-2 text-small font-semibold text-muted">All files</p>}
                  <FileList files={rest} viewer="client" clientName={client.name} />
                </div>
              ) : (
                !pending.length && <Empty icon={<FiFolder />} title="No files yet">Designs, drafts and final deliverables will show up here.</Empty>
              )}
              <div className="grid gap-3 border-t border-line/10 pt-5">
                <p className="text-small font-semibold text-fg">Send Felipe files</p>
                <FileUploader projectId={id} access={BLOB_ACCESS} onUploaded={recordClientUploadAction.bind(null, id)} />
                <ShareLinkForm action={shareLinkAction.bind(null, id)} />
              </div>
            </div>
          </Panel>
        </div>

        <div className="grid content-start gap-6">
          <Panel
            id="todo"
            title={
              <span className="flex items-center gap-2">
                Needed from you {openTasks > 0 && <Badge tone="warning">{openTasks}</Badge>}
              </span>
            }
          >
            {project.clientTasks.length ? (
              <>
              <p className="mb-2 text-[0.8rem] text-subtle">Tick each one off when it&apos;s done. Stuck on anything? Just send Felipe a message.</p>
              <ul className="grid gap-1">
                {project.clientTasks.map((t) => (
                  <li key={t.id}>
                    <form action={toggleClientTaskAction.bind(null, id, t.id)}>
                      <button
                        type="submit"
                        className="flex w-full items-start gap-3 rounded-control px-2 py-2 text-left transition-colors hover:bg-white/[0.04]"
                        aria-pressed={t.done}
                      >
                        <span className={`mt-0.5 flex-shrink-0 ${t.done ? 'text-success' : 'text-subtle'}`} aria-hidden="true">
                          {t.done ? <FiCheckSquare size={18} /> : <FiSquare size={18} />}
                        </span>
                        <span className={t.done ? 'text-muted line-through' : 'text-fg'}>{t.title}</span>
                      </button>
                    </form>
                    {!t.done && taskHint(t.title) && (
                      <p className="-mt-1 mb-1 pl-[2.6rem] pr-2 text-[0.78rem] leading-snug text-subtle">{taskHint(t.title)}</p>
                    )}
                  </li>
                ))}
              </ul>
              </>
            ) : (
              <p className="flex items-center gap-2 text-small text-muted">
                <FiCheckCircle className="text-success" aria-hidden="true" /> Nothing needed from you right now.
              </p>
            )}
          </Panel>

          {project.carePlan?.active && (
            <Panel id="care" title={<span className="flex items-center gap-2"><FiHeart aria-hidden="true" /> Monthly care plan</span>} action={<Badge tone="success">{money(project.carePlan.amount)}/month</Badge>}>
              <p className="mb-3 text-small text-muted">Felipe keeps your site healthy every month. Here’s what’s included:</p>
              <ul className="grid gap-1.5">
                {project.carePlan.includes.map((line) => (
                  <li key={line} className="flex items-start gap-2 text-small text-fg">
                    <FiCheck className="mt-0.5 flex-shrink-0 text-success" aria-hidden="true" /> {line}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[0.8rem] text-subtle">
                Next invoice {fmtDate(nextBillingDate(project))}. {plan?.autopay ? 'It’s paid automatically and you get a receipt by email.' : 'It’s emailed to you automatically.'} Need a change? Just send a message.
              </p>
              <div className="mt-4 border-t border-line/10 pt-4">
                {autopayJustOn && (
                  <p className="mb-3 flex items-center gap-2 text-small text-success" role="status">
                    <FiCheckCircle aria-hidden="true" /> Auto-pay is on. You don’t need to do anything each month.
                  </p>
                )}
                {plan?.autopayError && (
                  <p className="mb-3 flex items-start gap-2 text-small text-danger" role="alert">
                    <FiAlertCircle className="mt-0.5 flex-shrink-0" aria-hidden="true" /> The last automatic payment didn’t go through ({plan.autopayError}) Please pay that invoice and save a new card below.
                  </p>
                )}
                {plan?.autopay ? (
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="flex items-center gap-2 text-small text-fg">
                      <FiCreditCard className="text-success" aria-hidden="true" />
                      Auto-pay on · <span className="capitalize">{plan.autopay.brand}</span> ending {plan.autopay.last4}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {paymentsEnabled() && (
                        <form action={startAutopayAction.bind(null, id)}>
                          <button className="btn btn-ghost btn-sm">Change card</button>
                        </form>
                      )}
                      <form action={stopAutopayAction.bind(null, id)}>
                        <button className="btn btn-ghost btn-sm">Turn off</button>
                      </form>
                    </div>
                  </div>
                ) : paymentsEnabled() ? (
                  <form action={startAutopayAction.bind(null, id)} className="grid gap-2">
                    <button className="btn btn-secondary btn-sm w-fit"><FiCreditCard aria-hidden="true" /> Turn on auto-pay</button>
                    <p className="text-[0.75rem] text-subtle">
                      Save a card once on Stripe’s secure page and {money(project.carePlan.amount)} is charged to it each month for this plan. Nothing is charged today, and you can turn it off here any time.
                    </p>
                  </form>
                ) : null}
              </div>
            </Panel>
          )}

          {quotes.length > 0 && (
            <Panel title="Proposals">
              <ul className="grid gap-2">
                {quotes.map((q) => {
                  const st = PROPOSAL_STATUS[proposalExpired(q) ? 'expired' : q.status]
                  return (
                    <li key={q.id}>
                      <Link href={`/portal/projects/${id}/proposals/${q.id}`} className="flex items-center gap-3 rounded-control px-2 py-2 no-underline transition-colors hover:bg-white/[0.04]">
                        <FiClipboard className="flex-shrink-0 text-accent-light" aria-hidden="true" />
                        <span className="min-w-0 flex-1 truncate text-small text-fg">{q.title}</span>
                        <Badge tone={st.tone}>{q.status === 'sent' && st.label !== 'Expired' ? 'To answer' : st.label}</Badge>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </Panel>
          )}

          {contracts.length > 0 && (
            <Panel title="Agreements">
              <ul className="grid gap-2">
                {contracts.map((c) => (
                  <li key={c.id}>
                    <Link href={`/portal/contracts/${c.id}`} className="flex items-center gap-3 rounded-control px-2 py-2 no-underline transition-colors hover:bg-white/[0.04]">
                      <FiFileText className="flex-shrink-0 text-accent-light" aria-hidden="true" />
                      <span className="min-w-0 flex-1 truncate text-small text-fg">{c.title}</span>
                      <Badge tone={c.status === 'signed' ? 'success' : 'warning'}>{c.status === 'signed' ? `Signed ${fmtDate(c.signedAt, { month: 'short', day: 'numeric' })}` : 'To sign'}</Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            </Panel>
          )}

          <Panel id="messages" title="Messages">
            <div className="grid gap-4">
              <MessageThread messages={messages} viewer="client" clientName={client.name} />
              <Composer action={sendMessageAction.bind(null, id)} placeholder="Ask a question or share feedback…" warnPasswords />
            </div>
          </Panel>

          {showSupport && (
            <SupportSection
              tickets={support}
              viewer="client"
              clientName={client.name}
              create={createTicketAction.bind(null, id)}
              reply={(ticketId) => replyTicketAction.bind(null, id, ticketId)}
              resolve={(ticketId) => resolveTicketAction.bind(null, id, ticketId)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
