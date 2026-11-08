import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FiArrowRight, FiCalendar, FiCheckSquare, FiExternalLink, FiFileText, FiFolder, FiSquare, FiCheckCircle, FiMonitor } from 'react-icons/fi'
import { requireClientProject } from '@/lib/portal/session'
import { getProjectReview, getSettings, listContracts, listFiles, listMessages, markRead, projectProgress, unreadCount } from '@/lib/portal/db'
import FeedbackForm from '@/components/portal/FeedbackForm'
import { bookingHref } from '@/lib/portal/booking'
import BriefView from '@/components/portal/BriefView'
import { taskHint } from '@/lib/portal/intake'
import { PROJECT_STATUS, fmtDate } from '@/lib/portal/format'
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
  recordClientUploadAction, reviewFileAction, sendMessageAction, shareLinkAction, submitReviewAction, toggleClientTaskAction,
} from '@/app/portal/actions'

export default async function ClientProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { client, project } = await requireClientProject(id)
  if (!project) notFound()

  const [files, messages, unread, allContracts, review, settings] = await Promise.all([
    listFiles(id),
    listMessages(id),
    unreadCount(id, 'client'),
    listContracts(id),
    getProjectReview(id),
    getSettings(),
  ])
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
            {project.stagingUrl && (
              <a href={project.stagingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                <FiMonitor aria-hidden="true" /> Preview site
              </a>
            )}
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
              <Composer action={sendMessageAction.bind(null, id)} placeholder="Ask a question or share feedback…" />
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
