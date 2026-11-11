import { requireClient } from '@/lib/portal/session'
import { getClient, listContacts } from '@/lib/portal/db'
import { EMAIL_KINDS } from '@/lib/portal/people'
import EmailPrefsForm from '@/components/portal/EmailPrefsForm'
import { fmtDate } from '@/lib/portal/format'
import { PageHeader, Panel } from '@/components/portal/ui'
import PasswordForm from '@/components/portal/PasswordForm'
import { changePasswordAction, saveEmailPrefsAction } from '@/app/portal/actions'

export const metadata = { title: 'Account' }

export default async function AccountPage() {
  const client = await requireClient()
  const [owner, contacts] = await Promise.all([getClient(client.id), listContacts(client.id)])
  const people = owner ? [{ id: owner.id, name: owner.name, email: owner.email, owner: true }, ...contacts.map((c) => ({ id: c.id, name: c.name, email: c.email, owner: false }))] : []
  return (
    <div className="mx-auto grid max-w-3xl gap-6">
      <PageHeader eyebrow="Settings" title="Your account" />
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <Panel title="Details">
          <dl className="grid gap-3 text-small">
            <div><dt className="text-subtle">Name</dt><dd className="text-fg">{client.name}</dd></div>
            {client.company && <div><dt className="text-subtle">Company</dt><dd className="text-fg">{client.company}</dd></div>}
            <div><dt className="text-subtle">Email</dt><dd className="break-all text-fg">{client.email}</dd></div>
            <div><dt className="text-subtle">Client since</dt><dd className="text-fg">{fmtDate(client.createdAt)}</dd></div>
          </dl>
          <p className="mt-4 text-[0.8rem] text-subtle">Need to change your name or email, or add someone else from your team? Send Felipe a message and he&apos;ll set it up.</p>
        </Panel>
        <Panel title="Change password">
          <PasswordForm action={changePasswordAction} submitLabel="Update password" askCurrent email={client.email} />
        </Panel>
      </div>
      <Panel title="Email settings">
        <p className="mb-4 text-small text-muted">Choose which emails reach {client.email}. Sign-in emails and receipts for payments you make always send.</p>
        <EmailPrefsForm action={saveEmailPrefsAction} kinds={EMAIL_KINDS} prefs={client.emailPrefs} billingLocked={!client.contactId} />
      </Panel>
      {people.length > 1 && (
        <Panel title="People on this account">
          <ul className="grid gap-2">
            {people.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center justify-between gap-2 text-small">
                <span className="text-fg">{p.name}{p.email === client.email ? ' (you)' : ''}</span>
                <span className="text-subtle">{p.email}{p.owner ? ' · account owner' : ''}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[0.8rem] text-subtle">Everyone here sees the same projects and invoices. To add or remove someone, send Felipe a message.</p>
        </Panel>
      )}
    </div>
  )
}
