import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FiArchive, FiArrowLeft, FiArrowRight, FiMail, FiPhone, FiRotateCcw, FiTrash2 } from 'react-icons/fi'
import { getClientByEmail, getLead } from '@/lib/portal/db'
import { PROJECT_TYPE_LABELS, clientTasksFor, taskHint } from '@/lib/portal/intake'
import { fmtDate } from '@/lib/portal/format'
import { emailEnabled } from '@/lib/portal/notify'
import { Badge, PageHeader, Panel } from '@/components/portal/ui'
import BriefView from '@/components/portal/BriefView'
import CredentialForm from '@/components/portal/admin/CredentialForm'
import { convertLeadAction, deleteLeadAction, setLeadStatusAction } from '@/app/portal/admin/actions'

export const metadata = { title: 'Request' }

export default async function RequestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const lead = await getLead(id)
  if (!lead) notFound()
  const d = lead.data
  const existing = await getClientByEmail(d.email)
  const type = PROJECT_TYPE_LABELS[d.projectType] ?? d.projectType
  const suggestedName = d.company ? `${d.company} ${d.projectType === 'web-app' ? 'web app' : d.projectType === 'mobile' ? 'app' : d.projectType === 'ecommerce' ? 'online store' : d.projectType === 'design' ? 'design' : 'website'}` : `${d.name.split(' ')[0]}'s ${type.toLowerCase()}`
  const tasks = clientTasksFor(d)

  return (
    <div className="grid gap-6">
      <Link href="/portal/admin/requests" className="btn btn-ghost btn-sm w-fit !pl-2">
        <FiArrowLeft aria-hidden="true" /> All requests
      </Link>
      <PageHeader
        eyebrow={`Request · ${fmtDate(lead.createdAt)}`}
        title={`${d.name}${d.company ? ` · ${d.company}` : ''}`}
        action={
          <div className="flex flex-wrap gap-2">
            <a href={`mailto:${d.email}`} className="btn btn-secondary btn-sm"><FiMail aria-hidden="true" /> Email</a>
            {d.phone && <a href={`tel:${d.phone}`} className="btn btn-secondary btn-sm"><FiPhone aria-hidden="true" /> Call</a>}
          </div>
        }
      >
        <span className="flex flex-wrap gap-2">
          <Badge tone="accent">{type}</Badge>
          {d.budget && <Badge>{d.budget}</Badge>}
          {d.timeline && <Badge>{d.timeline}</Badge>}
          <Badge tone={lead.status === 'new' ? 'warning' : lead.status === 'converted' ? 'success' : 'muted'}>{lead.status === 'new' ? 'New' : lead.status === 'converted' ? 'Converted' : 'Archived'}</Badge>
        </span>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <Panel title="What they told you">
          <BriefView data={d} />
        </Panel>

        <div className="grid content-start gap-6">
          <Panel title={lead.status === 'converted' ? 'Converted' : 'Start the project'}>
            {lead.status !== 'converted' && (
              <p className="mb-4 text-small text-muted">
                {existing
                  ? `${existing.name} already has a portal account, so the project will be added to it.`
                  : 'Creates their portal account and a project with milestones, the brief and a checklist of what you need from them.'}
              </p>
            )}
              <CredentialForm
                action={convertLeadAction.bind(null, id)}
                submitLabel={existing ? 'Create project' : 'Create client & project'}
                emailEnabled={emailEnabled()}
                inviteLabel={existing ? 'Email them about the new project' : 'Email the portal invite to the client'}
                closed={
                  lead.status === 'converted' && lead.projectId ? (
                    <div>
                      <p className="text-small text-muted">This request became a project {lead.convertedAt ? fmtDate(lead.convertedAt) : ''}.</p>
                      <Link href={`/portal/admin/projects/${lead.projectId}`} className="btn btn-primary btn-sm mt-3">Open project <FiArrowRight aria-hidden="true" /></Link>
                    </div>
                  ) : undefined
                }
              >
                <div className="grid gap-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="text-small text-muted">Name<input name="name" required defaultValue={existing?.name ?? d.name} className="field mt-1" /></label>
                    <label className="text-small text-muted">Email<input name="email" type="email" required defaultValue={d.email} className="field mt-1" /></label>
                  </div>
                  <label className="text-small text-muted">Company<input name="company" defaultValue={d.company} className="field mt-1" /></label>
                  <label className="text-small text-muted">Project name<input name="projectName" required defaultValue={suggestedName} className="field mt-1" /></label>
                  <label className="text-small text-muted">
                    Project price ($, optional)
                    <input name="price" inputMode="decimal" placeholder={d.budget ? `They said: ${d.budget}` : 'e.g. 4800'} className="field mt-1" />
                  </label>
                  <fieldset className="grid gap-1.5">
                    <legend className="field-label">“Needed from you” checklist</legend>
                    <p className="-mt-1 mb-1 text-[0.75rem] text-subtle">Based on their answers. Each comes with a plain-English “how to” for the client. Untick anything that doesn&apos;t apply.</p>
                    {tasks.map((t) => (
                      <label key={t} className="flex items-start gap-2 text-small text-fg">
                        <input type="checkbox" name="task" value={t} defaultChecked className="mt-1 h-4 w-4 flex-shrink-0 accent-[rgb(var(--c-accent))]" />
                        <span>
                          {t}
                          {taskHint(t) && <span className="block text-[0.72rem] leading-snug text-subtle">Client sees: {taskHint(t)}</span>}
                        </span>
                      </label>
                    ))}
                    <textarea name="extraTasks" rows={2} placeholder="Add more, one per line" className="field mt-1 !min-h-[4rem] text-small" aria-label="Extra requests, one per line" />
                  </fieldset>
                </div>
              </CredentialForm>
          </Panel>

          <Panel title="Manage">
            <div className="flex flex-wrap gap-2">
              {lead.status === 'new' && (
                <form action={setLeadStatusAction.bind(null, id, 'archived')}>
                  <button className="btn btn-secondary btn-sm"><FiArchive aria-hidden="true" /> Archive</button>
                </form>
              )}
              {lead.status === 'archived' && (
                <form action={setLeadStatusAction.bind(null, id, 'new')}>
                  <button className="btn btn-secondary btn-sm"><FiRotateCcw aria-hidden="true" /> Move back to New</button>
                </form>
              )}
              <form action={deleteLeadAction.bind(null, id)}>
                <button className="btn btn-ghost btn-sm hover:!text-danger"><FiTrash2 aria-hidden="true" /> Delete</button>
              </form>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
