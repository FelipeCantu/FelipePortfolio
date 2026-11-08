'use client'
import { useActionState } from 'react'
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi'
import { forgotPasswordAction } from '@/app/portal/actions'

export default function ForgotForm() {
  const [state, action, pending] = useActionState(forgotPasswordAction, undefined)
  if (state?.ok) {
    return (
      <p role="status" className="flex items-start gap-2 text-success">
        <FiCheckCircle className="mt-1 flex-shrink-0" aria-hidden="true" /> {state.ok}
      </p>
    )
  }
  return (
    <form action={action} className="grid gap-5">
      <div>
        <label htmlFor="email" className="field-label">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className="field" placeholder="you@company.com" />
      </div>
      {state?.error && (
        <p role="alert" className="field-error -mt-2">
          <FiAlertCircle className="mt-0.5 flex-shrink-0" aria-hidden="true" /> {state.error}
        </p>
      )}
      <button type="submit" className="btn btn-primary w-full" disabled={pending}>
        {pending ? 'Sending…' : 'Email me a reset link'}
      </button>
    </form>
  )
}
