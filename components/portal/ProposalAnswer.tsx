'use client'
import { useActionState, useState } from 'react'
import clsx from 'clsx'
import { FiAlertCircle, FiCheck, FiPenTool } from 'react-icons/fi'
import type { FormState } from '@/app/portal/actions'

export interface AnswerOption {
  id: string
  name: string
  priceLabel: string
  recommended?: boolean
}

/** The client picks an option, types their name and accepts, or declines with a note. */
export default function ProposalAnswer({
  accept,
  decline,
  options,
  defaultName,
  nextSteps,
}: {
  accept: (s: FormState, f: FormData) => Promise<FormState>
  decline: (s: FormState, f: FormData) => Promise<FormState>
  options: AnswerOption[]
  defaultName: string
  nextSteps: string
}) {
  const [acceptState, acceptAction, accepting] = useActionState(accept, undefined)
  const [declineState, declineAction, declining] = useActionState(decline, undefined)
  const [mode, setMode] = useState<'accept' | 'decline'>('accept')
  const [picked, setPicked] = useState(options.find((o) => o.recommended)?.id ?? (options.length === 1 ? options[0].id : ''))

  if (declineState?.ok) {
    return <p className="card p-5 text-small text-muted" role="status">Thanks for letting Felipe know. He’ll be in touch.</p>
  }

  return (
    <div className="card grid gap-5 border-accent/30 p-5 sm:p-6 print:hidden">
      {mode === 'accept' ? (
        <form action={acceptAction} className="grid gap-4">
          <div>
            <h2 className="text-lg font-bold text-fg">Accept this proposal</h2>
            <p className="mt-1 text-small text-muted">{nextSteps}</p>
          </div>
          <fieldset className="grid gap-2">
            <legend className="field-label">{options.length > 1 ? 'Which option would you like?' : 'Your option'}</legend>
            {options.map((o) => (
              <label
                key={o.id}
                className={clsx(
                  'flex cursor-pointer items-center gap-3 rounded-control border px-4 py-3 transition-colors',
                  picked === o.id ? 'border-accent-light bg-accent/10' : 'border-line/20 hover:bg-white/[0.04]'
                )}
              >
                <input type="radio" name="option" value={o.id} checked={picked === o.id} onChange={() => setPicked(o.id)} required className="h-4 w-4 accent-[rgb(var(--c-accent))]" />
                <span className="min-w-0 flex-1 font-medium text-fg">{o.name}</span>
                <span className="font-mono text-fg">{o.priceLabel}</span>
              </label>
            ))}
          </fieldset>
          <div>
            <label htmlFor="accept-name" className="field-label">Type your full name</label>
            <input id="accept-name" name="name" required defaultValue={defaultName} autoComplete="name" className="field font-display text-lg italic" />
          </div>
          <label className="flex items-start gap-3 text-small text-fg">
            <input type="checkbox" name="agree" required className="mt-1 h-4 w-4 flex-shrink-0 accent-[rgb(var(--c-accent))]" />
            <span>I accept this proposal at the price shown for the option I picked.</span>
          </label>
          {acceptState?.error && (
            <p role="alert" className="field-error !mt-0">
              <FiAlertCircle className="mt-0.5 flex-shrink-0" aria-hidden="true" /> {acceptState.error}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" className="btn btn-gold" disabled={accepting}>
              <FiPenTool aria-hidden="true" /> {accepting ? 'Accepting…' : 'Accept proposal'}
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setMode('decline')}>Not right for me</button>
          </div>
        </form>
      ) : (
        <form action={declineAction} className="grid gap-4">
          <div>
            <h2 className="text-lg font-bold text-fg">Decline this proposal</h2>
            <p className="mt-1 text-small text-muted">No hard feelings. If it’s about price or scope, say so and Felipe can send a different version.</p>
          </div>
          <label className="sr-only" htmlFor="decline-note">What would make it work?</label>
          <textarea id="decline-note" name="note" rows={3} className="field !min-h-[6rem]" placeholder="What would make it work? (optional)" />
          {declineState?.error && <p role="alert" className="field-error !mt-0">{declineState.error}</p>}
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" className="btn btn-primary btn-sm" disabled={declining}>
              <FiCheck aria-hidden="true" /> {declining ? 'Sending…' : 'Send to Felipe'}
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setMode('accept')}>Back</button>
          </div>
        </form>
      )}
    </div>
  )
}
