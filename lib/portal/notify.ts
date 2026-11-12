import 'server-only'
import { emailHtml } from './emailTemplate'

/**
 * Optional email notifications via Resend (https://resend.com, free tier).
 * Set RESEND_API_KEY and PORTAL_FROM_EMAIL (e.g. "Felipe Cantu <portal@felipecantujr.com>")
 * to turn them on. Without them, notifications are skipped silently and the
 * portal works the same.
 */
const ADMIN_EMAIL = process.env.PORTAL_ADMIN_EMAIL ?? 'cantujr.felipe@gmail.com'

export const emailEnabled = () => Boolean(process.env.RESEND_API_KEY && process.env.PORTAL_FROM_EMAIL)

/** The demo client and its contacts use example.com (a reserved domain), so nothing is ever emailed to them. */
export const isDemoEmail = (email: string) => /@example\.com$/i.test(email.trim())

export async function sendEmail(to: string, subject: string, text: string, link?: string, linkLabel = 'Open your portal') {
  if (isDemoEmail(to)) return
  const key = process.env.RESEND_API_KEY?.trim()
  const from = process.env.PORTAL_FROM_EMAIL?.trim()
  if (!key || !from) {
    console.warn('[portal] email skipped: RESEND_API_KEY or PORTAL_FROM_EMAIL is not set')
    return
  }
  const body = link ? `${text}\n\n${link}` : text
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text: body,
        html: emailHtml({ subject, text, link, linkLabel }),
      }),
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) console.error('[portal] Resend rejected email', res.status, await res.text().catch(() => ''))
  } catch (err) {
    console.error('[portal] email failed', err)
  }
}

export const notifyAdmin = (subject: string, text: string, link?: string) => sendEmail(ADMIN_EMAIL, subject, text, link)

