import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FiArrowLeft, FiArrowRight, FiFileText, FiPlus } from 'react-icons/fi'
import { getClient, invoiceTotal, listInvoices, listProjects, projectProgress } from '@/lib/portal/db'
import { INVOICE_STATUS, PROJECT_STATUS, fmtDate, money, timeAgo } from '@/lib/portal/format'
import { Badge, Empty, PageHeader, Panel, ProgressBar } from '@/components/portal/ui'
import StateForm from '@/components/portal/admin/StateForm'
import CredentialForm from '@/components/portal/admin/CredentialForm'
import { createProjectAction, deleteClientAction, resetCodeAction, updateClientAction } from '@/app/portal/admin/actions'

export default async function AdminClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const client = await getClient(id)
  if (!client) notFound()
  const [projects, invoices] = await Promise.all([listProjects(id), listInvoices(id)])

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
            <p className="mb-3 text-small text-muted">
              Generates a new access code and sign-in link. Their old code stops working and they&apos;re signed out everywhere.
            </p>
            <CredentialForm action={resetCodeAction.bind(null, id)} submitLabel="Generate new access code" emailEnabled={!!process.env.RESEND_API_KEY} />
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
