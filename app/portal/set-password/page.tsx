import { redirect } from 'next/navigation'
import { FiKey } from 'react-icons/fi'
import { currentClient } from '@/lib/portal/session'
import PasswordForm from '@/components/portal/PasswordForm'
import { setPasswordAction } from '@/app/portal/actions'

export const metadata = { title: 'Create your password' }
export const dynamic = 'force-dynamic'

export default async function SetPasswordPage() {
  const client = await currentClient()
  if (!client) redirect('/portal/login')
  if (client.passwordHash) redirect('/portal')

  return (
    <div className="container-page page-top pb-section">
      <div className="mx-auto w-full max-w-md">
        <header className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent-light">
            <FiKey size={20} aria-hidden="true" />
          </div>
          <p className="eyebrow">Welcome, {client.name.split(' ')[0]}</p>
          <h1 className="mt-3 text-h2 text-fg">Create your password</h1>
          <p className="mt-2 text-muted">
            You&apos;ll sign in with <span className="text-fg">{client.email}</span> and this password from now on. Your invite code won&apos;t be needed again.
          </p>
        </header>
        <div className="card p-6 sm:p-8">
          <PasswordForm action={setPasswordAction} submitLabel="Save password & continue" email={client.email} />
        </div>
      </div>
    </div>
  )
}
