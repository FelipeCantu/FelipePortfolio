'use client'
import { useActionState, useEffect, useRef, useState } from 'react'
import { FiCheck } from 'react-icons/fi'
import type { FormState } from '@/app/portal/actions'

/** Form wrapper that shows inline errors and a brief "Saved" confirmation. */
export default function StateForm({
  action,
  children,
  submitLabel = 'Save',
  className = 'grid gap-4',
  resetOnOk = false,
}: {
  action: (s: FormState, f: FormData) => Promise<FormState>
  children: React.ReactNode
  submitLabel?: string
  className?: string
  resetOnOk?: boolean
}) {
  const [state, formAction, pending] = useActionState(action, undefined)
  const [flash, setFlash] = useState(false)
  const ref = useRef<HTMLFormElement>(null)
  useEffect(() => {
    if (!state?.ok) return
    if (resetOnOk) ref.current?.reset()
    setFlash(true)
    const t = setTimeout(() => setFlash(false), 2200)
    return () => clearTimeout(t)
  }, [state, resetOnOk])

  return (
    <form ref={ref} action={formAction} className={className}>
      {children}
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="btn btn-primary btn-sm" disabled={pending}>
          {pending ? 'Saving…' : submitLabel}
        </button>
        {flash && (
          <span className="flex items-center gap-1 text-small text-success" role="status">
            <FiCheck aria-hidden="true" /> Saved
          </span>
        )}
        {state?.error && <span className="text-small text-danger" role="alert">{state.error}</span>}
      </div>
    </form>
  )
}
