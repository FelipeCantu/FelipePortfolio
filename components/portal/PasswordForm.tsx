'use client'
import { useActionState, useEffect, useRef, useState } from 'react'
import { FiAlertCircle, FiCheckCircle, FiEye, FiEyeOff } from 'react-icons/fi'
import type { FormState } from '@/app/portal/actions'

/** New-password form, used for first sign-in, reset links and account settings. */
export default function PasswordForm({
  action,
  submitLabel,
  askCurrent = false,
  email,
}: {
  action: (s: FormState, f: FormData) => Promise<FormState>
  submitLabel: string
  askCurrent?: boolean
  email?: string
}) {
  const [state, formAction, pending] = useActionState(action, undefined)
  const [show, setShow] = useState(false)
  const ref = useRef<HTMLFormElement>(null)
  useEffect(() => {
    if (state?.ok) ref.current?.reset()
  }, [state])
  const type = show ? 'text' : 'password'

  return (
    <form ref={ref} action={formAction} className="grid gap-5">
      {/* Lets password managers save the new password against the right account */}
      {email && <input type="email" name="username" autoComplete="username" defaultValue={email} className="hidden" readOnly />}
      {askCurrent && (
        <div>
          <label htmlFor="current" className="field-label">Current password</label>
          <input id="current" name="current" type={type} required autoComplete="current-password" className="field" />
        </div>
      )}
      <div>
        <label htmlFor="password" className="field-label">{askCurrent ? 'New password' : 'Password'}</label>
        <div className="relative">
          <input id="password" name="password" type={type} required minLength={8} autoComplete="new-password" className="field pr-12" aria-describedby="pw-hint" />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-subtle hover:text-fg"
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
          </button>
        </div>
        <p id="pw-hint" className="field-hint">At least 8 characters. A short phrase is easy to remember and hard to guess.</p>
      </div>
      <div>
        <label htmlFor="confirm" className="field-label">Confirm password</label>
        <input id="confirm" name="confirm" type={type} required minLength={8} autoComplete="new-password" className="field" />
      </div>
      {state?.error && (
        <p role="alert" className="field-error -mt-2">
          <FiAlertCircle className="mt-0.5 flex-shrink-0" aria-hidden="true" /> {state.error}
        </p>
      )}
      {state?.ok && (
        <p role="status" className="-mt-2 flex items-start gap-1.5 text-[0.85rem] font-medium text-success">
          <FiCheckCircle className="mt-0.5 flex-shrink-0" aria-hidden="true" /> {state.ok}
        </p>
      )}
      <button type="submit" className="btn btn-primary w-full" disabled={pending}>
        {pending ? 'Saving…' : submitLabel}
      </button>
    </form>
  )
}
