import { isAdminSession } from '@/lib/portal/session'
import {
  changeOrders, getSettings, listClients, listContacts, listContracts, listFiles, listInvoices, listLeads, listMessages, listProjects,
  listReviews, previews, proposals, tickets,
} from '@/lib/portal/db'
import { incomeCsv, incomeReport } from '@/lib/portal/income'

export const dynamic = 'force-dynamic'

const stamp = () => new Date().toLocaleDateString('en-CA', { timeZone: 'America/Chicago' })

function download(body: string, type: string, filename: string) {
  return new Response(body, {
    headers: { 'Content-Type': `${type}; charset=utf-8`, 'Content-Disposition': `attachment; filename="${filename}"`, 'Cache-Control': 'no-store' },
  })
}

/**
 * Admin-only downloads:
 *   ?type=income&year=2026  → CSV of paid invoices for the year (for taxes / a bookkeeper)
 *   ?type=backup            → JSON copy of everything in the portal (sign-in secrets left out;
 *                             uploaded files stay in Blob storage and are listed by name)
 */
export async function GET(request: Request) {
  if (!(await isAdminSession())) return new Response('Unauthorized', { status: 401 })
  const url = new URL(request.url)

  if (url.searchParams.get('type') === 'backup') {
    const clients = await listClients()
    const data = await Promise.all(
      clients.map(async (c) => {
        const [contacts, invoices, projectList] = await Promise.all([listContacts(c.id), listInvoices(c.id), listProjects(c.id)])
        const projects = await Promise.all(
          projectList.map(async (p) => ({
            ...p,
            files: await listFiles(p.id),
            messages: await listMessages(p.id),
            contracts: await listContracts(p.id),
            proposals: await proposals.list(p.id),
            changeRequests: await changeOrders.list(p.id),
            previews: await previews.list(p.id),
            supportRequests: await tickets.list(p.id),
          }))
        )
        // Never export sign-in secrets
        const safe = <T extends { codeHash?: string; passwordHash?: string }>(person: T) => ({ ...person, codeHash: undefined, passwordHash: undefined })
        return { ...safe(c), contacts: contacts.map(safe), invoices, projects }
      })
    )
    const backup = { exportedAt: new Date().toISOString(), settings: await getSettings(), clients: data, requests: await listLeads(), reviews: await listReviews() }
    return download(JSON.stringify(backup, null, 2), 'application/json', `portal-backup-${stamp()}.json`)
  }

  const year = Number(url.searchParams.get('year')) || new Date().getFullYear()
  if (year < 2000 || year > 2100) return new Response('Bad year', { status: 400 })
  const report = await incomeReport(year)
  // BOM so Excel reads accents and dashes correctly
  return download('﻿' + incomeCsv(report.rows), 'text/csv', `income-${year}.csv`)
}
