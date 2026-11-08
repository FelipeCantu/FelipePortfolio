'use client'
import { useActionState } from 'react'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import type { CredentialState } from '@/app/portal/admin/actions'
import CredentialCard from './CredentialCard'

/** Used for both "new client" and "reset access code". */
export default function CredentialForm({
  action,
  children,
  submitLabel,
  emailEnabled,
  inviteLabel = 'Email the invite to the client',
  closed,
}: {
  inviteLabel?: string
  /** Shown instead of the form once the job is done (e.g. request already converted). */
  closed?: React.ReactNode
  action: (s: CredentialState, f: FormData) => Promise<CredentialState>
  children?: React.ReactNode
  submitLabel: string
  emailEnabled: boolean
}) {
  const [state, formAction, pending] = useActionState(action, undefined)
  // After a successful submit the page may re-render as "done"; keep showing the
  // result (the one-time code) until the admin navigates away.
  const succeeded = !!state && !state.error
  return (
    <div className="grid gap-4">
      {closed && !succeeded ? closed : null}
      <form action={formAction} className={closed || succeeded ? 'hidden' : 'grid gap-3'}>
        {children}
        {emailEnabled && (
          <label className="flex items-center gap-2 text-small text-muted">
            <input type="checkbox" name="sendInvite" defaultChecked className="h-4 w-4 accent-[rgb(var(--c-accent))]" /> {inviteLabel}
          </label>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" className="btn btn-primary btn-sm" disabled={pending}>
            {pending ? 'Working…' : submitLabel}
          </button>
          {state?.error && <span className="text-small text-danger" role="alert">{state.error}</span>}
        </div>
      </form>
      {state?.code && state.link && state.email && <CredentialCard email={state.email} code={state.code} link={state.link} />}
      {state?.note && <p className="text-small text-muted" role="status">{state.note}</p>}
      {state?.projectId && (
        <Link href={`/portal/admin/projects/${state.projectId}`} className="btn btn-secondary btn-sm w-fit">
          Open the new project <FiArrowRight aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}
