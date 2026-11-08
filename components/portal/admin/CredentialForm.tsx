'use client'
import { useActionState } from 'react'
import type { CredentialState } from '@/app/portal/admin/actions'
import CredentialCard from './CredentialCard'

/** Used for both "new client" and "reset access code". */
export default function CredentialForm({
  action,
  children,
  submitLabel,
  emailEnabled,
}: {
  action: (s: CredentialState, f: FormData) => Promise<CredentialState>
  children?: React.ReactNode
  submitLabel: string
  emailEnabled: boolean
}) {
  const [state, formAction, pending] = useActionState(action, undefined)
  return (
    <div className="grid gap-4">
      <form action={formAction} className="grid gap-3">
        {children}
        {emailEnabled && (
          <label className="flex items-center gap-2 text-small text-muted">
            <input type="checkbox" name="sendInvite" defaultChecked className="h-4 w-4 accent-[rgb(var(--c-accent))]" /> Email the invite to the client
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
    </div>
  )
}
