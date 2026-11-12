import Link from 'next/link'
import { FiArrowRight, FiEye } from 'react-icons/fi'
import { getSettings } from '@/lib/portal/db'
import { findDemoClient } from '@/lib/portal/demo'
import { DEFAULT_BOOKING_URL } from '@/lib/portal/booking'
import { DEFAULT_ACCESS_EMAIL } from '@/lib/portal/access'
import { PageHeader, Panel } from '@/components/portal/ui'
import StateForm from '@/components/portal/admin/StateForm'
import { saveSettingsAction } from '@/app/portal/admin/actions'
import { createDemoAction, removeDemoAction, setWeeklyUpdatesAction, viewDemoAsClientAction } from '@/app/portal/admin/more-actions'
import { Badge } from '@/components/portal/ui'

export const metadata = { title: 'Portal settings' }

export default async function SettingsPage() {
  const [settings, demo] = await Promise.all([getSettings(), findDemoClient()])
  return (
    <div className="mx-auto grid max-w-2xl gap-6">
      <PageHeader eyebrow="Portal admin" title="Settings" />
      <Panel title="Booking & billing">
        <StateForm action={saveSettingsAction}>
          <label className="text-small text-muted">
            Booking link (optional)
            <input name="bookingUrl" type="url" defaultValue={settings.bookingUrl} placeholder={DEFAULT_BOOKING_URL} className="field mt-1" />
            <span className="field-hint block">
              Already set up: clients&apos; “Book a call” button opens your Cal.com page ({DEFAULT_BOOKING_URL.replace('https://', '')}) with their name and email filled in. Only paste a link here if you want a different booking page.
            </span>
          </label>
          <label className="text-small text-muted">
            Email clients invite for access (optional)
            <input name="accessEmail" type="email" defaultValue={settings.accessEmail} placeholder={DEFAULT_ACCESS_EMAIL} className="field mt-1" />
            <span className="field-hint block">Shown in the “Accounts &amp; access” guides. Leave empty to use {DEFAULT_ACCESS_EMAIL}.</span>
          </label>
          <label className="text-small text-muted">
            Default deposit (%)
            <input name="depositPercent" type="number" min={1} max={100} defaultValue={settings.depositPercent ?? 50} className="field mt-1 !w-32" />
            <span className="field-hint block">Used by the one-click deposit invoice and pre-filled into new agreements.</span>
          </label>
        </StateForm>
      </Panel>
      <Panel title="Weekly progress emails" action={<Badge tone={settings.weeklyUpdates !== false ? 'success' : 'neutral'}>{settings.weeklyUpdates !== false ? 'On' : 'Off'}</Badge>}>
        <p className="text-small text-muted">
          Every Monday morning, each client with an active project gets a short summary: what got done, what’s next and what you’re waiting on from them. Projects with nothing to report are skipped, you can leave a single project out from its page, and clients can switch the emails off in their account settings.
        </p>
        <form action={setWeeklyUpdatesAction.bind(null, settings.weeklyUpdates === false)} className="mt-3">
          <button className="btn btn-secondary btn-sm">{settings.weeklyUpdates !== false ? 'Turn off for everyone' : 'Turn on'}</button>
        </form>
      </Panel>
      <Panel id="demo" title="Demo client" action={demo ? <Badge tone="accent">Active</Badge> : undefined}>
        <p className="text-small text-muted">
          A made-up client (Sunrise Yoga Studio) with three projects that use every portal feature: milestones, files waiting for approval, a pending
          preview, an accepted and an open proposal, a signed agreement, change requests, paid, open and draft invoices, a care plan, support
          requests, a review, an extra contact and a new project request. Nothing is ever emailed to it, its invoices (DEMO-…) stay out of your
          income totals and CSV, and the care plan is never billed.
        </p>
        {demo ? (
          <div className="mt-4 grid gap-4">
            <div className="flex flex-wrap gap-2">
              <Link href={`/portal/admin/clients/${demo.id}`} className="btn btn-secondary btn-sm">
                Admin view <FiArrowRight aria-hidden="true" />
              </Link>
              <form action={viewDemoAsClientAction.bind(null, false)}>
                <button className="btn btn-primary btn-sm"><FiEye aria-hidden="true" /> View as the client</button>
              </form>
              <form action={viewDemoAsClientAction.bind(null, true)}>
                <button className="btn btn-ghost btn-sm"><FiEye aria-hidden="true" /> View as their assistant</button>
              </form>
            </div>
            <p className="text-small text-muted">
              These buttons are the only way in. The demo has no password anyone knows, so it can’t be opened from the public sign-in page. You stay signed in as admin in this browser too.
            </p>
            <form action={removeDemoAction}>
              <button className="btn btn-ghost btn-sm text-danger">Remove the demo client</button>
            </form>
          </div>
        ) : (
          <div className="mt-4">
            <StateForm action={createDemoAction} submitLabel="Create demo client" pendingLabel="Creating…" okLabel="Created" submitClass="btn btn-gold btn-sm">
              <span className="sr-only">Creates the demo client and its projects.</span>
            </StateForm>
          </div>
        )}
      </Panel>
    </div>
  )
}
