import { getSettings } from '@/lib/portal/db'
import { DEFAULT_BOOKING_URL } from '@/lib/portal/booking'
import { PageHeader, Panel } from '@/components/portal/ui'
import StateForm from '@/components/portal/admin/StateForm'
import { saveSettingsAction } from '@/app/portal/admin/actions'

export const metadata = { title: 'Portal settings' }

export default async function SettingsPage() {
  const settings = await getSettings()
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
            Default deposit (%)
            <input name="depositPercent" type="number" min={1} max={100} defaultValue={settings.depositPercent ?? 50} className="field mt-1 !w-32" />
            <span className="field-hint block">Used by the one-click deposit invoice and pre-filled into new agreements.</span>
          </label>
        </StateForm>
      </Panel>
    </div>
  )
}
