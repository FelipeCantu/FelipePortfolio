import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FiArrowLeft, FiArrowRight, FiFileText, FiPlus, FiTrash2, FiUsers } from 'react-icons/fi'
import { getClient, invoiceTotal, listContacts, listInvoices, listProjects, projectProgress } from '@/lib/portal/db'
import { addContactAction, removeContactAction, resetContactAction } from '@/app/portal/admin/more-actions'
import { INVOICE_STATUS, PROJECT_STATUS, fmtDate, money, timeAgo } from '@/lib/portal/format'
import { Badge, Empty, PageHeader, Panel, ProgressBar } from '@/components/portal/ui'
import StateForm from '@/components/portal/admin/StateForm'
import CredentialForm from '@/components/portal/admin/CredentialForm'
import { emailEnabled } from '@/lib/portal/notify'
import { createProjectAction, deleteClientAction, resetCodeAction, updateClientAction } from '@/app/portal/admin/actions'

export default async function AdminClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const client = await getClient(id)
  if (!client) notFound()
  const [projects, invoices, contacts] = await Promise.all([listProjects(id), listInvoices(id), listContacts(id)])

  return (
    <div className="grid gap-6">
      <Link href="/portal/admin" className="btn btn-ghost btn-sm w-fit !pl-2">
        <FiArrowLeft aria-hidden="true" /> Dashboard
      </Link>
      <PageHeader eyebrow="Client" title={client.name}>
        {[client.company, client.email, client.lastLoginAt ? `last signed in ${timeAgo(client.lastLoginAt)}` : 'has not signed in yet'].filter(Boolean).join(' · ')}
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="grid content-start gap-6">
          <Panel title="Projects">
            {projects.length ? (
              <div className="grid gap-3">
                {projects.map((p) => (
                  <Link key={p.id} href={`/portal/admin/projects/${p.id}`} className="card-interactive block !bg-bg/40 p-4 no-underline">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <p className="font-semibold text-fg">{p.name}</p>
                      <Badge tone={PROJECT_STATUS[p.status].tone}>{PROJECT_STATUS[p.status].label}</Badge>
                    </div>
                    <ProgressBar value={projectProgress(p)} />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-small text-muted">No projects yet.</p>
            )}

            <details className="mt-5 rounded-control border border-line/15 p-4 [&[open]>summary]:mb-4">
              <summary className="flex cursor-pointer items-center gap-2 font-semibold text-fg">
                <FiPlus aria-hidden="true" /> New project
              </summary>
              <form action={createProjectAction.bind(null, id)} className="grid gap-3">
                <input name="name" required placeholder="Project name, e.g. Website redesign" className="field" aria-label="Project name" />
                <textarea name="summary" placeholder="Short summary the client will see (optional)" className="field !min-h-[5rem]" aria-label="Summary" />
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="text-small text-muted">
                    Start date
                    <input type="date" name="startDate" className="field mt-1" />
                  </label>
                  <label className="text-small text-muted">
                    Target launch
                    <input type="date" name="dueDate" className="field mt-1" />
                  </label>
                </div>
                <label className="text-small text-muted">
                  Start from a template
                  <select name="template" className="field mt-1" defaultValue="website">
                    <option value="website">Website (7 milestones + starter requests)</option>
                    <option value="webapp">Web app (7 milestones + starter requests)</option>
                    <option value="redesign">Redesign (7 milestones + starter requests)</option>
                    <option value="">Blank</option>
                  </select>
                </label>
                <button className="btn btn-primary btn-sm w-fit">Create project</button>
              </form>
            </details>
          </Panel>

          <Panel
            title="Invoices"
            action={
              <Link href={`/portal/admin/clients/${id}/invoices/new`} className="btn btn-secondary btn-sm">
                <FiPlus aria-hidden="true" /> New invoice
              </Link>
            }
          >
            {invoices.length ? (
              <ul className="-my-2 divide-y divide-line/10">
                {invoices.map((inv) => (
                  <li key={inv.id}>
                    <Link href={`/portal/admin/invoices/${inv.id}`} className="group flex flex-wrap items-center gap-3 py-3 no-underline">
                      <FiFileText className="text-accent-light" aria-hidden="true" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium text-fg">{inv.title}</span>
                        <span className="block font-mono text-[0.75rem] text-subtle">{inv.number} · {fmtDate(inv.createdAt)}</span>
                      </span>
                      <Badge tone={INVOICE_STATUS[inv.status].tone}>{INVOICE_STATUS[inv.status].label}</Badge>
                      <span className="w-24 text-right font-mono text-fg">{money(invoiceTotal(inv))}</span>
                      <FiArrowRight className="text-subtle group-hover:text-accent-light" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <Empty icon={<FiFileText />} title="No invoices yet" />
            )}
          </Panel>
        </div>

        <div className="grid content-start gap-6">
          <Panel title="Portal access">
            <p className="mb-3 flex items-center gap-2 text-small">
              <span className={`h-2 w-2 rounded-full ${client.passwordHash ? 'bg-success' : 'bg-warning'}`} aria-hidden="true" />
              <span className="text-fg">{client.passwordHash ? 'Password set' : 'Waiting for client to create a password'}</span>
            </p>
            <p className="mb-3 text-small text-muted">
              {client.passwordHash
                ? 'Clients can reset their own password with “Forgot password?”. If they’re stuck, send a new invite: it clears their password and signs them out everywhere.'
                : 'Lost the invite? Send a new one. The previous code stops working.'}
            </p>
            <CredentialForm action={resetCodeAction.bind(null, id)} submitLabel={client.passwordHash ? 'Reset & send new invite' : 'Send new invite'} emailEnabled={emailEnabled()} />
          </Panel>

          <Panel title={<span className="flex items-center gap-2"><FiUsers aria-hidden="true" /> Extra contacts</span>}>
            <p className="mb-3 text-small text-muted">
              Other people at {client.company || 'this client'} (a partner, assistant or bookkeeper) who get their own sign-in. They see the same projects and invoices as {client.name.split(' ')[0]}.
            </p>
            {contacts.length > 0 && (
              <ul className="mb-4 grid gap-2">
                {contacts.map((ct) => (
                  <li key={ct.id} className="rounded-control border border-line/15 bg-bg/40 p-3">
                    <div className="flex items-start gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-small font-medium text-fg">{ct.name}</p>
                        <p className="truncate text-[0.75rem] text-subtle">
                          {ct.email} · {ct.passwordHash ? (ct.lastLoginAt ? `last signed in ${timeAgo(ct.lastLoginAt)}` : 'password set') : 'hasn’t signed in yet'}
                        </p>
                      </div>
                      <form action={removeContactAction.bind(null, ct.id)}>
                        <button className="inline-flex h-8 w-8 items-center justify-center rounded-full text-subtle transition-colors hover:bg-white/[0.06] hover:!text-danger" aria-label={`Remove ${ct.name}`}><FiTrash2 /></button>
                      </form>
                    </div>
                    <details className="mt-2">
                      <summary className="cursor-pointer text-[0.8rem] text-accent-light">Send a new invite</summary>
                      <div className="mt-2">
                        <CredentialForm action={resetContactAction.bind(null, ct.id)} submitLabel="Reset & send new invite" emailEnabled={emailEnabled()} inviteLabel={`Email the invite to ${ct.name.split(' ')[0]}`} />
                      </div>
                    </details>
                  </li>
                ))}
              </ul>
            )}
            <details className="rounded-control border border-line/15 p-4 [&[open]>summary]:mb-4">
              <summary className="flex cursor-pointer items-center gap-2 font-semibold text-fg"><FiPlus aria-hidden="true" /> Add a contact</summary>
              <CredentialForm action={addContactAction.bind(null, id)} submitLabel="Add contact & invite" emailEnabled={emailEnabled()} inviteLabel="Email them the invite">
                <div className="grid gap-3">
                  <input name="name" required placeholder="Full name" className="field" aria-label="Contact name" />
                  <input name="email" type="email" required placeholder="Email" className="field" aria-label="Contact email" />
                  <label className="text-small text-muted">
                    Emails they get (they can change this later)
                    <select name="emails" defaultValue="all" className="field mt-1">
                      <option value="all">Everything</option>
                      <option value="billing">Invoices and agreements only</option>
                      <option value="project">Project updates only, no billing</option>
                    </select>
                  </label>
                </div>
              </CredentialForm>
            </details>
          </Panel>

          <Panel title="Details">
            <StateForm action={updateClientAction.bind(null, id)}>
              <div className="grid gap-3">
                <label className="text-small text-muted">Name<input name="name" defaultValue={client.name} required className="field mt-1" /></label>
                <label className="text-small text-muted">Email<input name="email" type="email" defaultValue={client.email} required className="field mt-1" /></label>
                <label className="text-small text-muted">Company<input name="company" defaultValue={client.company} className="field mt-1" /></label>
                <label className="text-small text-muted">Phone<input name="phone" defaultValue={client.phone} className="field mt-1" /></label>
              </div>
            </StateForm>
          </Panel>

          <Panel title="Danger zone" className="border-danger/25">
            <form action={deleteClientAction.bind(null, id)} className="grid gap-3">
              <p className="text-small text-muted">Deletes this client, their projects, files, messages and invoices. Type DELETE to confirm.</p>
              <input name="confirm" placeholder="DELETE" className="field" aria-label="Type DELETE to confirm" autoComplete="off" />
              <button className="btn btn-sm w-fit border-danger/40 text-danger hover:bg-danger/10">Delete client</button>
            </form>
          </Panel>
        </div>
      </div>
    </div>
  )
}
