import Link from 'next/link'
import { peekResetToken } from '@/lib/portal/db'
import PasswordForm from '@/components/portal/PasswordForm'
import { resetPasswordAction } from '@/app/portal/actions'

export const metadata = { title: 'Choose a new password' }
export const dynamic = 'force-dynamic'

export default async function ResetPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token = '' } = await searchParams
  const client = await peekResetToken(token)

  return (
    <div className="container-page page-top pb-section">
      <div className="mx-auto w-full max-w-md">
        <header className="mb-8 text-center">
          <p className="eyebrow">Client portal</p>
          <h1 className="mt-3 text-h2 text-fg">{client ? 'Choose a new password' : 'Link expired'}</h1>
          {client && <p className="mt-2 text-muted">For {client.email}</p>}
        </header>
        <div className="card p-6 sm:p-8">
          {client ? (
            <PasswordForm action={resetPasswordAction.bind(null, token)} submitLabel="Save new password" email={client.email} />
          ) : (
            <div className="grid gap-4 text-center">
              <p className="text-muted">This reset link has expired or was already used. Links work once, for one hour.</p>
              <Link href="/portal/forgot" className="btn btn-primary">Send a new link</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
