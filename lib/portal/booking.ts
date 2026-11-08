import type { Client, PortalSettings, Project } from './types'

/** Felipe's Cal.com page. Used unless a different link is saved in Settings. */
export const DEFAULT_BOOKING_URL = 'https://cal.com/felipe-cantu/30min'

/**
 * "Book a call" link for a client: their name and email are pre-filled on the
 * booking form (Cal.com and Calendly both read these), plus a note naming the
 * project so Felipe knows what the call is about.
 */
export function bookingHref(settings: PortalSettings, client: Client, project?: Project) {
  const base = settings.bookingUrl || DEFAULT_BOOKING_URL
  try {
    const url = new URL(base)
    url.searchParams.set('name', client.name)
    url.searchParams.set('email', client.email)
    if (url.hostname.endsWith('cal.com')) url.searchParams.set('notes', `Client portal${project ? ` · ${project.name}` : ''}`)
    return url.toString()
  } catch {
    return base
  }
}
