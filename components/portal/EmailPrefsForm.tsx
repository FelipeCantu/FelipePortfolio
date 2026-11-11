import StateForm from './admin/StateForm'
import type { FormState } from '@/app/portal/actions'
import type { EmailKind, EmailPrefs } from '@/lib/portal/types'

/** Which optional emails the signed-in person gets. */
export default function EmailPrefsForm({
  action,
  kinds,
  prefs,
  billingLocked,
}: {
  action: (s: FormState, f: FormData) => Promise<FormState>
  kinds: { key: EmailKind; label: string; hint: string }[]
  prefs?: EmailPrefs
  /** the account owner always gets invoices and agreements */
  billingLocked: boolean
}) {
  return (
    <StateForm action={action} submitLabel="Save email settings">
      <fieldset className="grid gap-3">
        <legend className="sr-only">Emails you want to receive</legend>
        {kinds.map((k) => {
          const locked = k.key === 'billing' && billingLocked
          return (
            <label key={k.key} className="flex items-start gap-3">
              <input
                type="checkbox"
                name={k.key}
                defaultChecked={locked || prefs?.[k.key] !== false}
                disabled={locked}
                className="mt-1 h-4 w-4 flex-shrink-0 accent-[rgb(var(--c-accent))]"
              />
              <span>
                <span className="block text-small font-medium text-fg">{k.label}{locked ? ' (always on)' : ''}</span>
                <span className="block text-[0.8rem] text-subtle">{k.hint}{locked ? ' As the account owner you always get these, so an invoice is never missed.' : ''}</span>
              </span>
            </label>
          )
        })}
      </fieldset>
    </StateForm>
  )
}
