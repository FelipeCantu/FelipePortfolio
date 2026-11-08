import Link from 'next/link'
import { redirect } from 'next/navigation'
import { FiLock } from 'react-icons/fi'
import LoginForm from '@/components/portal/LoginForm'
import { currentClient } from '@/lib/portal/session'

export const metadata = { title: 'Sign in' }

export default async function PortalLogin({ searchParams }: { searchParams: Promise<{ email?: string; error?: string }> }) {
  if (await currentClient()) redirect('/portal')
  const { email, error } = await searchParams

  return (
    <div className="container-page page-top pb-section">
      <div className="mx-auto w-full max-w-md">
        <header className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent-light">
            <FiLock size={20} aria-hidden="true" />
          </div>
          <p className="eyebrow">Client portal</p>
          <h1 className="mt-3 text-h2 text-fg">Welcome back</h1>
          <p className="mt-2 text-muted">Track your project, review work, share files and pay invoices in one place.</p>
        </header>
        <div className="card p-6 sm:p-8">
          <LoginForm defaultEmail={email} linkError={error === 'link'} />
        </div>
        <p className="mt-6 text-center text-small text-muted">
          Don&apos;t have an access code?{' '}
          <Link href="/contact" className="text-accent-light underline decoration-accent/40 underline-offset-4 hover:text-white">
            Contact Felipe
          </Link>
          {' · '}
          <Link href="/get-started" className="text-accent-light underline decoration-accent/40 underline-offset-4 hover:text-white">
            Start a project
          </Link>
        </p>
      </div>
    </div>
  )
}
