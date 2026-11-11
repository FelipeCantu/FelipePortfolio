import 'server-only'
import { getClient, listContacts } from './db'
import { sendEmail } from './notify'
import type { EmailKind } from './types'

export const EMAIL_KINDS: { key: EmailKind; label: string; hint: string }[] = [
  { key: 'messages', label: 'Messages', hint: 'When Felipe sends a message or replies to a support request.' },
  { key: 'files', label: 'Files & previews', hint: 'When a file or a site preview is ready for you to look at.' },
  { key: 'billing', label: 'Invoices & agreements', hint: 'Invoices, payment reminders, receipts, proposals and agreements to sign.' },
  { key: 'updates', label: 'Progress updates', hint: 'Milestones, status changes and the weekly progress summary.' },
]

const first = (name: string) => name.trim().split(/\s+/)[0] || 'there'

/**
 * Emails everyone on a client's account who wants this kind of email: the
 * client plus any extra contacts. The account owner always gets billing
 * emails, so an invoice can never go to nobody. A greeting written for the
 * owner ("Hi Maria,") is rewritten for each person.
 */
export async function emailPeople(clientId: string, kind: EmailKind, subject: string, text: string, link?: string, linkLabel?: string) {
  const client = await getClient(clientId)
  if (!client) return 0
  const people = [
    { name: client.name, email: client.email, on: kind === 'billing' || client.emailPrefs?.[kind] !== false },
    ...(await listContacts(clientId)).map((c) => ({ name: c.name, email: c.email, on: c.emailPrefs?.[kind] !== false })),
  ].filter((p) => p.on)
  const greeting = `Hi ${first(client.name)},`
  await Promise.all(
    people.map((p) => sendEmail(p.email, subject, text.startsWith(greeting) ? `Hi ${first(p.name)},${text.slice(greeting.length)}` : text, link, linkLabel))
  )
  return people.length
}
