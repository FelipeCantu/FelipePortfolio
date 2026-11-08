'use client'
import { useActionState, useEffect, useRef, useState } from 'react'
import { FiSend } from 'react-icons/fi'
import type { FormState } from '@/app/portal/actions'

export default function Composer({
  action,
  placeholder = 'Write a message…',
  warnPasswords = false,
}: {
  warnPasswords?: boolean
  action: (state: FormState, form: FormData) => Promise<FormState>
  placeholder?: string
}) {
  const [state, formAction, pending] = useActionState(action, undefined)
  const ref = useRef<HTMLFormElement>(null)
  const [pwWarn, setPwWarn] = useState(false)
  useEffect(() => {
    if (state?.ok) ref.current?.reset()
  }, [state])

  return (
    <form ref={ref} action={formAction} className="grid gap-2">
      <label htmlFor="msg-body" className="sr-only">Message</label>
      <textarea
        id="msg-body"
        name="body"
        rows={3}
        required
        maxLength={5000}
        placeholder={placeholder}
        className="field !min-h-[5.5rem]"
        onChange={(e) => warnPasswords && setPwWarn(/\b(password|passcode|pwd|login details)\b/i.test(e.target.value))}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) ref.current?.requestSubmit()
        }}
      />
      {pwWarn && (
        <p className="rounded-control border border-warning/30 bg-warning/10 px-3 py-2 text-[0.8rem] text-warning" role="status">
          Please don&apos;t send passwords here. Invite Felipe as a team member instead — see “Accounts &amp; access” on your project page.
        </p>
      )}
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.75rem] text-subtle">{state?.error ? <span className="text-danger">{state.error}</span> : 'Ctrl/⌘ + Enter to send'}</p>
        <button type="submit" className="btn btn-primary btn-sm" disabled={pending}>
          <FiSend aria-hidden="true" /> {pending ? 'Sending…' : 'Send'}
        </button>
      </div>
    </form>
  )
}
