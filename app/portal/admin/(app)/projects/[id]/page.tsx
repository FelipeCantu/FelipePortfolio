import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FiArrowDown, FiArrowLeft, FiArrowUp, FiCheck, FiCheckSquare, FiPlay, FiRotateCcw, FiSquare, FiTrash2, FiPlus } from 'react-icons/fi'
import {
  getClient, getProject, listFiles, listMessages, listProjectActivity, markRead, projectProgress, unreadCount,
} from '@/lib/portal/db'
import { PROJECT_STATUS, timeAgo } from '@/lib/portal/format'
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
import {
  addClientTaskAction, addMilestoneAction, adminMessageAction, adminRecordUploadAction, adminShareLinkAction,
  deleteClientTaskAction, deleteFileAction, deleteMilestoneAction, deleteProjectAction, moveMilestoneAction,
  resetApprovalAction, setMilestoneStatusAction, updateProjectAction,
} from '@/app/portal/admin/actions'

const iconBtn = 'inline-flex h-8 w-8 items-center justify-center rounded-full text-subtle transition-colors hover:bg-white/[0.06] hover:text-fg'

export default async function AdminProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getProject(id)
  if (!project) notFound()
  const client = await getClient(project.clientId)
  if (!client) notFound()

  const [files, messages, activity, unread] = await Promise.all([listFiles(id), listMessages(id), listProjectActivity(id, 15), unreadCount(id, 'admin')])
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
                        <button className="btn btn-ghost btn-sm !min-h-8 !px-3"><FiPlay aria-hidden="true" /> Start</button>
                      </form>
                    )}
                    {m.status !== 'done' ? (
                      <form action={setMilestoneStatusAction.bind(null, id, m.id, 'done')}>
                        <button className="btn btn-ghost btn-sm !min-h-8 !px-3 text-success"><FiCheck aria-hidden="true" /> Complete</button>
                      </form>
                    ) : (
                      <form action={setMilestoneStatusAction.bind(null, id, m.id, 'in_progress')}>
                        <button className="btn btn-ghost btn-sm !min-h-8 !px-3"><FiRotateCcw aria-hidden="true" /> Reopen</button>
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
          <Panel id="messages" title="Messages">
            <div className="grid gap-4">
              <MessageThread messages={messages} viewer="admin" clientName={client.name} />
              <Composer action={adminMessageAction.bind(null, id)} placeholder={`Message ${client.name.split(' ')[0]}…`} />
            </div>
          </Panel>

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
