'use client'
import { useActionState, useState } from 'react'
import { FiAlertCircle, FiHeart } from 'react-icons/fi'
import type { FormState } from '@/app/portal/actions'
import type { Review } from '@/lib/portal/types'

const LABELS = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent']

export default function FeedbackForm({
  action,
  existing,
  defaultName,
}: {
  action: (s: FormState, f: FormData) => Promise<FormState>
  existing?: Review | null
  defaultName: string
}) {
  const [state, formAction, pending] = useActionState(action, undefined)
  const [rating, setRating] = useState(existing?.rating ?? 0)
  const [hover, setHover] = useState(0)
  const shown = hover || rating

  if (state?.ok) {
    return (
      <div className="rounded-control bg-success/10 p-5 text-center" role="status">
        <FiHeart className="mx-auto text-2xl text-success" aria-hidden="true" />
        <p className="mt-2 font-semibold text-fg">Thank you for the feedback!</p>
        <p className="mt-1 text-small text-muted">It means a lot and helps other clients find me.</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="grid gap-4">
      <fieldset>
        <legend className="field-label">How was working together?</legend>
        <div className="flex items-center gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} className="cursor-pointer" onMouseEnter={() => setHover(n)}>
              <input type="radio" name="rating" value={n} checked={rating === n} onChange={() => setRating(n)} className="peer sr-only" aria-label={`${n} star${n > 1 ? 's' : ''}: ${LABELS[n]}`} />
              <span className={`block px-0.5 text-3xl leading-none transition-transform peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-accent-light hover:scale-110 ${n <= shown ? 'text-gold' : 'text-line/60'}`} aria-hidden="true">
                ★
              </span>
            </label>
          ))}
          <span className="ml-2 text-small text-muted" aria-live="polite">{LABELS[shown]}</span>
        </div>
      </fieldset>
      <label className="text-small text-muted">
        <span className="field-label">A few words about your experience</span>
        <textarea name="text" required minLength={10} maxLength={1200} defaultValue={existing?.text} placeholder="What went well? What would you tell someone thinking of hiring Felipe?" className="field mt-1" />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-small text-muted">
          Name to show
          <input name="displayName" defaultValue={existing?.displayName ?? defaultName} className="field mt-1" />
        </label>
        <label className="text-small text-muted">
          Your role (optional)
          <input name="role" defaultValue={existing?.role} placeholder="e.g. Owner" className="field mt-1" />
        </label>
      </div>
      <label className="flex items-start gap-3 text-small text-fg">
        <input type="checkbox" name="allowPublish" defaultChecked={existing ? existing.allowPublish : true} className="mt-1 h-4 w-4 flex-shrink-0 accent-[rgb(var(--c-accent))]" />
        <span>Felipe may show this review on his website.</span>
      </label>
      {state?.error && (
        <p role="alert" className="field-error !mt-0">
          <FiAlertCircle className="mt-0.5 flex-shrink-0" aria-hidden="true" /> {state.error}
        </p>
      )}
      <button type="submit" className="btn btn-primary btn-sm w-fit" disabled={pending}>
        {pending ? 'Sending…' : existing ? 'Update review' : 'Send review'}
      </button>
    </form>
  )
}
