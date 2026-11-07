/**
 * Lightweight bot check for the client-side EmailJS forms.
 *
 * 1. A hidden "honeypot" field: people never see or reach it, naive bots fill it.
 * 2. A minimum fill time: nobody completes a form within ~2.5s of it rendering.
 *
 * Neither stops a determined attacker (EmailJS keys are public by design), so
 * also enable EmailJS's own protections: Account > Security > "Allowed origins"
 * set to felipecantujr.com, and per-template rate limits / reCAPTCHA if abuse appears.
 */

export const HONEYPOT_NAME = 'company_website'
const MIN_FILL_MS = 2500

/** Visually hidden, unfocusable trap field, kept out of the tab order and assistive tech. */
export function HoneypotField({ onChange }: { onChange?: (value: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input
          type="text"
          name={HONEYPOT_NAME}
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        />
      </label>
    </div>
  )
}

/** True when the honeypot was filled or the form was submitted implausibly fast. */
export function isLikelyBot(trapValue: string | null | undefined, renderedAt: number): boolean {
  if (trapValue && trapValue.trim() !== '') return true
  return renderedAt > 0 && Date.now() - renderedAt < MIN_FILL_MS
}

/** Reads the honeypot value out of a form element. */
export function trapValueOf(formEl: HTMLFormElement): string {
  const el = formEl.elements.namedItem(HONEYPOT_NAME) as HTMLInputElement | null
  return el?.value ?? ''
}
