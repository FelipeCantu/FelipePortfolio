import { notFound } from 'next/navigation'
import { FiCheckSquare, FiExternalLink, FiFolder, FiSquare, FiCheckCircle, FiMonitor } from 'react-icons/fi'
import { requireClientProject } from '@/lib/portal/session'
import { listFiles, listMessages, markRead, projectProgress, unreadCount } from '@/lib/portal/db'
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
  recordClientUploadAction, reviewFileAction, sendMessageAction, shareLinkAction, toggleClientTaskAction,
} from '@/app/portal/actions'

export default async function ClientProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { client, project } = await requireClientProject(id)
  if (!project) notFound()

  const [files, messages, unread] = await Promise.all([listFiles(id), listMessages(id), unreadCount(id, 'client')])
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

      <div className="card p-5 sm:p-6">
        <ProgressBar value={progress} label="Overall progress" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="grid content-start gap-6">
          <Panel title="Milestones">
            {project.milestones.length ? (
              <Timeline milestones={project.milestones} />
            ) : (
              <p className="text-small text-muted">Felipe is putting together the project plan. Milestones will appear here.</p>
            )}
          </Panel>

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
                  </li>
                ))}
              </ul>
            ) : (
              <p className="flex items-center gap-2 text-small text-muted">
                <FiCheckCircle className="text-success" aria-hidden="true" /> Nothing needed from you right now.
              </p>
            )}
          </Panel>

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
