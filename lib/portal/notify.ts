import 'server-only'

/**
 * Optional email notifications via Resend (https://resend.com, free tier).
 * Set RESEND_API_KEY and PORTAL_FROM_EMAIL (e.g. "Felipe Cantu <portal@felipecantujr.com>")
 * to turn them on. Without them, notifications are skipped silently and the
 * portal works the same.
 */
const ADMIN_EMAIL = process.env.PORTAL_ADMIN_EMAIL ?? 'cantujr.felipe@gmail.com'

export const emailEnabled = () => Boolean(process.env.RESEND_API_KEY && process.env.PORTAL_FROM_EMAIL)

export async function sendEmail(to: string, subject: string, text: string, link?: string, linkLabel = 'Open your portal') {
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
        html: `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#0f172a">
          ${escapeHtml(text).replace(/\n/g, '<br>')}
          ${link ? `<p style="margin-top:24px"><a href="${link}" style="background:#0ea5e9;color:#03111c;padding:10px 18px;border-radius:999px;text-decoration:none;font-weight:600">${escapeHtml(linkLabel)}</a></p>` : ''}
          <p style="margin-top:32px;color:#64748b;font-size:13px">Felipe Cantu Jr &middot; felipecantujr.com</p>
        </div>`,
      }),
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) console.error('[portal] Resend rejected email', res.status, await res.text().catch(() => ''))
  } catch (err) {
    console.error('[portal] email failed', err)
  }
}

export const notifyAdmin = (subject: string, text: string, link?: string) => sendEmail(ADMIN_EMAIL, subject, text, link)

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)
}
