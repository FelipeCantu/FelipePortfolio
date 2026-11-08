/**
 * HTML for portal emails. Built to stay readable in every mail app, light or dark:
 *
 * - Every block sets BOTH its background and text color, so apps that force dark
 *   mode by inverting colors (Gmail, Outlook) invert a matched pair and keep contrast.
 * - `color-scheme` meta + a prefers-color-scheme media query give apps that support
 *   it (Apple Mail, iOS Mail, Outlook.com, Hey) a hand-tuned dark palette instead.
 * - [data-ogsc]/[data-ogsb] selectors cover Outlook.com / Outlook mobile overrides.
 * - Layout uses tables + inline styles, which every client renders the same way.
 */

/** Badge logo (white mark on a navy circle), so it reads on light and dark backgrounds. */
export const EMAIL_LOGO_URL = 'https://felipecantujr.com/images/email-logo.png'

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

const LIGHT = { page: '#f1f5f9', card: '#ffffff', text: '#0f172a', muted: '#475569', line: '#e2e8f0' }
const DARK = { page: '#0a0c16', card: '#161b2e', text: '#f1f5f9', muted: '#a0aec0', line: '#2a3150' }
// Sky-500 button with near-black text: 7.4:1 contrast, and still readable if a client inverts it
const BUTTON = { bg: '#0ea5e9', text: '#03111c' }

export function emailHtml({
  subject,
  text,
  link,
  linkLabel = 'Open your portal',
  logoUrl = EMAIL_LOGO_URL,
}: {
  subject: string
  text: string
  link?: string
  linkLabel?: string
  logoUrl?: string
}) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => `<p class="fc-text" style="margin:0 0 16px;color:${LIGHT.text};font-size:16px;line-height:1.6">${esc(p).replace(/\n/g, '<br>')}</p>`)
    .join('')
  const preheader = esc(text.replace(/\s+/g, ' ').slice(0, 120))

  const button = link
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 8px">
        <tr><td class="fc-btn" bgcolor="${BUTTON.bg}" style="border-radius:999px;background:${BUTTON.bg}">
          <a href="${esc(link)}" class="fc-btn-link" style="display:inline-block;padding:13px 26px;border-radius:999px;color:${BUTTON.text};font-size:16px;font-weight:700;text-decoration:none;font-family:Segoe UI,Helvetica,Arial,sans-serif">${esc(linkLabel)}</a>
        </td></tr>
      </table>
      <p class="fc-muted" style="margin:16px 0 0;color:${LIGHT.muted};font-size:13px;line-height:1.5">Button not working? Copy this link into your browser:<br>
        <a href="${esc(link)}" class="fc-link" style="color:#0369a1;word-break:break-all">${esc(link)}</a></p>`
    : ''

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>${esc(subject)}</title>
<style>
  :root { color-scheme: light dark; supported-color-schemes: light dark; }
  @media (prefers-color-scheme: dark) {
    .fc-page { background:${DARK.page} !important; }
    .fc-card { background:${DARK.card} !important; border-color:${DARK.line} !important; }
    .fc-text, .fc-brand { color:${DARK.text} !important; }
    .fc-muted { color:${DARK.muted} !important; }
    .fc-link { color:#38bdf8 !important; }
    .fc-rule { border-color:${DARK.line} !important; }
  }
  [data-ogsc] .fc-text, [data-ogsc] .fc-brand { color:${DARK.text} !important; }
  [data-ogsc] .fc-muted { color:${DARK.muted} !important; }
  [data-ogsc] .fc-link { color:#38bdf8 !important; }
  [data-ogsb] .fc-page { background:${DARK.page} !important; }
  [data-ogsb] .fc-card { background:${DARK.card} !important; }
  [data-ogsb] .fc-btn { background:${BUTTON.bg} !important; }
  [data-ogsc] .fc-btn-link { color:${BUTTON.text} !important; }
</style>
</head>
<body class="fc-page" style="margin:0;padding:0;background:${LIGHT.page}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="fc-page" bgcolor="${LIGHT.page}" style="background:${LIGHT.page}">
  <tr><td align="center" style="padding:32px 16px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px">
      <tr><td style="padding:0 4px 18px;font-family:Segoe UI,Helvetica,Arial,sans-serif">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="padding-right:12px;vertical-align:middle">
            <a href="https://felipecantujr.com" style="text-decoration:none"><img src="${esc(logoUrl)}" width="48" height="48" alt="Felipe Cantu Jr" style="display:block;width:48px;height:48px;border:0;border-radius:50%"></a>
          </td>
          <td style="vertical-align:middle">
            <div class="fc-brand" style="color:${LIGHT.text};font-size:18px;font-weight:800;letter-spacing:-0.02em;line-height:1.2">Felipe Cantu Jr</div>
            <div class="fc-muted" style="color:${LIGHT.muted};font-size:13px;line-height:1.4">Client portal</div>
          </td>
        </tr></table>
      </td></tr>
      <tr><td class="fc-card" bgcolor="${LIGHT.card}" style="background:${LIGHT.card};border:1px solid ${LIGHT.line};border-radius:16px;padding:32px 28px;font-family:Segoe UI,Helvetica,Arial,sans-serif">
        ${paragraphs}
        ${button}
      </td></tr>
      <tr><td style="padding:20px 4px 0;font-family:Segoe UI,Helvetica,Arial,sans-serif">
        <p class="fc-muted" style="margin:0;color:${LIGHT.muted};font-size:12px;line-height:1.5">
          Felipe Cantu Jr &middot; Full-stack web developer &middot; Dallas, TX<br>
          <a href="https://felipecantujr.com/portal" class="fc-link" style="color:#0369a1">felipecantujr.com/portal</a>
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`
}
