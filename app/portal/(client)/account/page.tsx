import { requireClient } from '@/lib/portal/session'
import { fmtDate } from '@/lib/portal/format'
import { PageHeader, Panel } from '@/components/portal/ui'
import PasswordForm from '@/components/portal/PasswordForm'
import { changePasswordAction } from '@/app/portal/actions'

export const metadata = { title: 'Account' }

export default async function AccountPage() {
  const client = await requireClient()
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
          <p className="mt-4 text-[0.8rem] text-subtle">Need to change your name or email? Send Felipe a message and he&apos;ll update it.</p>
        </Panel>
        <Panel title="Change password">
          <PasswordForm action={changePasswordAction} submitLabel="Update password" askCurrent email={client.email} />
        </Panel>
      </div>
    </div>
  )
}
