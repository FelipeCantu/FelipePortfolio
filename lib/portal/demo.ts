import 'server-only'
import { randomBytes } from 'crypto'
import {
  addFile, addMessage, changeOrders, contractHash, createClient, createContact, createContract, createInvoice, createLead,
  createProject, deleteClient, deleteLead, getClientByEmail, listLeads, logActivity, newAccessItem, newId,
  previews, proposals, saveContract, saveFile, saveInvoice, saveLead, saveProject, saveReview, setClientPassword, tickets,
  upsertReview,
} from './db'
import { defaultContract } from './contractTemplate'
import { CARE_DEFAULT_INCLUDES } from './carePlans'
import { EMPTY_INTAKE, type IntakeData } from './intake'
import { isDemoEmail } from './notify'
import type { Client, FileItem, Invoice, Milestone, ProposalOption, Role } from './types'

/**
 * A made-up client with three projects that between them use every portal
 * feature, so Felipe can click through both the admin and the client side.
 * Everything uses example.com addresses (never emailed, see isDemoEmail),
 * invoices are numbered DEMO-… (left out of the income CSV), and the daily
 * cron skips it. "Remove demo" deletes all of it.
 */
export const DEMO_EMAIL = 'demo.client@example.com'
export const DEMO_CONTACT_EMAIL = 'demo.assistant@example.com'
/** A new random password every time the demo is created. Nobody is told it: the demo is opened with the admin's "View as" buttons. */
const demoPassword = () => randomBytes(24).toString('base64url')

export const findDemoClient = () => getClientByEmail(DEMO_EMAIL)

const DAY = 86400000
/** ISO timestamp `days` ago (negative = in the future), at `hour` UTC; "today" never lands later than now */
const ago = (days: number, hour = 16) => {
  const d = new Date(Date.now() - days * DAY)
  d.setUTCHours(hour, 0, 0, 0)
  return (days >= 0 && d.getTime() > Date.now() ? new Date(Date.now() - 20 * 60000) : d).toISOString()
}
/** YYYY-MM-DD `days` from today (negative = in the past) */
const day = (days: number) => ago(-days).slice(0, 10)
/** YYYY-MM `daysAgo` days ago */
const month = (daysAgo: number) => ago(daysAgo).slice(0, 7)

const milestone = (title: string, status: Milestone['status'], due: number, description?: string): Milestone => ({
  id: newId(), title, description, dueDate: day(due), status, doneAt: status === 'done' ? ago(-due) : undefined,
})

async function file(projectId: string, f: Partial<FileItem> & Pick<FileItem, 'name' | 'url' | 'uploadedBy'>, createdDaysAgo: number) {
  const saved = await addFile({ projectId, kind: 'link', requiresApproval: false, ...f })
  await saveFile({ ...saved, createdAt: ago(createdDaysAgo), approval: f.approval ?? saved.approval })
}

async function invoice(
  client: Client,
  projectId: string,
  n: number,
  input: { title: string; items: Invoice['items']; status: Invoice['status']; createdDaysAgo: number; dueIn?: number; paidDaysAgo?: number; online?: boolean; notes?: string }
) {
  const inv = await createInvoice({
    clientId: client.id, projectId, title: input.title, items: input.items, notes: input.notes,
    dueDate: input.dueIn !== undefined ? day(input.dueIn) : undefined,
    send: input.status !== 'draft', number: `DEMO-${String(n).padStart(4, '0')}`,
  })
  return saveInvoice({
    ...inv,
    status: input.status,
    createdAt: ago(input.createdDaysAgo),
    sentAt: input.status === 'draft' ? undefined : ago(input.createdDaysAgo),
    paidAt: input.paidDaysAgo !== undefined ? ago(input.paidDaysAgo) : undefined,
    stripeSessionId: input.online ? 'cs_demo_paid_online' : undefined,
  })
}

const brief: IntakeData = {
  ...EMPTY_INTAKE,
  name: 'Maria Lopez (demo)', email: DEMO_EMAIL, company: 'Sunrise Yoga Studio', phone: '(555) 010-4242',
  currentWebsite: 'https://example.com', projectType: 'website',
  description: 'Our current site is a single page that is hard to update. We want a calm, modern site where students can see the class schedule, read about teachers and book a first class.',
  goals: 'More first-class bookings from Google, and less time answering the same questions by phone.',
  budget: '$1k–$5k', timeline: '1–3 Months', deadline: day(33), deadlineReason: 'New-year promotion starts in January',
  pages: ['Home', 'About', 'Services', 'Booking / Scheduling', 'FAQ', 'Contact'],
  features: ['Mobile Responsive', 'SEO Optimization', 'CMS Integration', 'Analytics'],
  inspiration: 'Calm colors, lots of photos of the studio, simple navigation.',
  preferredDays: ['Tue', 'Thu'], preferredTime: 'Morning (9am–12pm)',
}

export async function createDemoClient() {
  if (await findDemoClient()) throw new Error('The demo client already exists. Remove it first to start over.')

  const { client } = await createClient({ name: 'Maria Lopez (demo)', email: DEMO_EMAIL, company: 'Sunrise Yoga Studio', phone: '(555) 010-4242' })
  await setClientPassword(client.id, demoPassword())
  const { contact } = await createContact(client.id, { name: 'Sam Rivera (demo assistant)', email: DEMO_CONTACT_EMAIL, emailPrefs: { updates: false } })
  await setClientPassword(client.id, demoPassword(), contact.id)

  /* ───── 1. Website in progress: milestones, files, approvals, proposal, agreement, changes, previews, invoices ───── */
  const site0 = await createProject(client.id, {
    name: 'New studio website',
    summary: 'A six-page website with the class schedule, teacher bios and online booking for a first class.',
    status: 'in_progress',
    startDate: day(-37), dueDate: day(33),
    stagingUrl: 'https://felipecantujr.com',
    brief: { ...brief, submittedAt: ago(45) },
    milestones: [
      milestone('Kickoff & discovery', 'done', -35, 'A call to agree on goals, pages and the look.'),
      milestone('Sitemap & wireframes', 'done', -26),
      milestone('Visual design', 'done', -12, 'Homepage and inner pages in Figma.'),
      milestone('Development', 'in_progress', 9, 'Building the pages, booking widget and CMS.'),
      milestone('Content & SEO', 'todo', 16),
      milestone('Testing & your review', 'todo', 25),
      milestone('Launch', 'todo', 33),
    ],
    clientTasks: [
      { id: newId(), title: 'Logo files (SVG or PNG)', done: true, doneAt: ago(34) },
      { id: newId(), title: 'Photos of the studio and classes', done: true, doneAt: ago(30) },
      { id: newId(), title: 'Class schedule and prices', done: false },
      { id: newId(), title: 'Two or three student testimonials', done: false },
    ],
    access: [
      { ...newAccessItem('godaddy', 'GoDaddy (domain)'), status: 'confirmed', invitedAt: ago(33), confirmedAt: ago(32) },
      { ...newAccessItem('google-analytics', 'Google Analytics'), status: 'invited', invitedAt: ago(1) },
      newAccessItem('search-console', 'Google Search Console'),
    ],
  })
  // $4,800 accepted option + $600 approved change
  const site = await saveProject({ ...site0, createdAt: ago(40), price: 540000 })

  const options: ProposalOption[] = [
    { id: newId(), name: 'Starter', price: 290000, timeline: '4 weeks', includes: ['4 pages', 'Mobile-friendly design', 'Contact form', 'Basic SEO setup'] },
    { id: newId(), name: 'Standard', price: 480000, timeline: '8 weeks', recommended: true, description: 'Everything you asked for in the brief.', includes: ['6 pages', 'Custom design in Figma', 'Class schedule you can edit yourself', 'Teacher bios', 'Full SEO setup and Google Analytics', '30 days of support after launch'] },
    { id: newId(), name: 'Plus', price: 650000, timeline: '10 weeks', includes: ['Everything in Standard', 'Blog with 5 starter posts', 'Email newsletter signup', 'Photo shoot direction'] },
  ]
  const draft = defaultContract(client, { ...site, price: 480000 }, 50)
  const contract0 = await createContract({ clientId: client.id, projectId: site.id, title: draft.title, body: `${draft.body}\n\nAccepted option: Standard ($4,800.00)` })
  const contract = { ...contract0, createdAt: ago(39), status: 'signed' as const, sentAt: ago(39), signedAt: ago(38) }
  await saveContract({
    ...contract,
    signature: { name: 'Maria Lopez', email: DEMO_EMAIL, ip: '203.0.113.7', userAgent: 'Demo browser', contentHash: contractHash(contract) },
  })

  const deposit = await invoice(client, site.id, 1, {
    title: 'New studio website — 50% deposit', items: [{ description: '50% deposit to begin work (Standard)', quantity: 1, unitAmount: 240000 }],
    status: 'paid', createdDaysAgo: 39, dueIn: -36, paidDaysAgo: 38, online: true, notes: 'Work begins once the deposit is received. Thank you!',
  })
  await proposals.save({
    id: newId(), clientId: client.id, projectId: site.id, title: 'Sunrise Yoga website proposal',
    intro: 'Thanks for the great call! Here are three ways we can build your new site. I recommend Standard, which covers everything in your brief.',
    options, validUntil: day(-30), autoContract: true, autoDeposit: true, status: 'accepted',
    createdAt: ago(42), sentAt: ago(42), decidedAt: ago(39), acceptedOptionId: options[1].id,
    acceptedBy: { name: 'Maria Lopez', email: DEMO_EMAIL, ip: '203.0.113.7' }, contractId: contract.id, invoiceId: deposit.id,
  })

  await invoice(client, site.id, 2, {
    title: 'New studio website — design milestone', items: [{ description: 'Visual design complete (25%)', quantity: 1, unitAmount: 120000 }],
    status: 'open', createdDaysAgo: 4, dueIn: 6,
  })
  await invoice(client, site.id, 3, {
    title: 'New studio website — final balance',
    items: [
      { description: 'Remaining balance on launch', quantity: 1, unitAmount: 120000 },
      { description: 'Online class booking widget (approved change)', quantity: 1, unitAmount: 60000 },
    ],
    status: 'draft', createdDaysAgo: 1, dueIn: 40,
  })

  await changeOrders.save({
    id: newId(), clientId: client.id, projectId: site.id, title: 'Online class booking widget',
    description: 'Let students book and pay for a class right on the site, connected to your Mindbody account.',
    price: 60000, addDays: 3, billing: 'balance', status: 'approved', createdAt: ago(20), decidedAt: ago(19), decidedBy: 'Maria Lopez',
  })
  await changeOrders.save({
    id: newId(), clientId: client.id, projectId: site.id, title: 'Blog with five starter posts',
    description: 'A blog section, plus five posts written from short interviews with you (beginner tips, what to bring, etc.).',
    price: 45000, addDays: 5, billing: 'now', status: 'sent', createdAt: ago(2),
  })

  await previews.save({
    id: newId(), projectId: site.id, title: 'Wireframes', url: 'https://felipecantujr.com/about', note: 'Layout only, no final colors yet.',
    status: 'approved', createdAt: ago(25), decidedAt: ago(24), decidedBy: 'Maria Lopez',
  })
  await previews.save({
    id: newId(), projectId: site.id, title: 'Homepage, first build', url: 'https://felipecantujr.com',
    note: 'Check it at phone size too, and look at the class schedule section.', status: 'pending', createdAt: ago(1),
  })

  await file(site.id, { name: 'Brand moodboard (Figma)', url: 'https://www.figma.com/', uploadedBy: 'admin', note: 'Colors, fonts and photo style.', requiresApproval: true, approval: { status: 'approved', at: ago(29) } }, 31)
  await file(site.id, { name: 'Logo files (Google Drive)', url: 'https://drive.google.com/', uploadedBy: 'client' }, 34)
  await file(site.id, { name: 'Studio photos (Google Drive)', url: 'https://drive.google.com/', uploadedBy: 'client', note: 'Mix of classes and the lobby.' }, 30)
  await file(site.id, { name: 'Schedule page design v1', url: 'https://www.figma.com/', uploadedBy: 'admin', requiresApproval: true, approval: { status: 'changes_requested', note: 'Can the evening classes stand out more? Most new students come at 6pm.', at: ago(3) } }, 6)
  await file(site.id, { name: 'Homepage design v2', url: 'https://www.figma.com/', uploadedBy: 'admin', note: 'Updated hero photo and the booking button.', requiresApproval: true }, 2)

  // The last message is from the client, so the admin side shows it as unread
  const thread: [Role, string, number, number][] = [
    ['admin', 'Hi Maria! Your portal is set up. This is where we’ll keep everything for the new site. First step: could you share your logo and a few studio photos?', 36, 15],
    ['client', 'Hi Felipe! Just added the logo and a folder of photos.', 34, 18],
    ['admin', 'Perfect, thank you. The wireframes preview is up for you to look at.', 25, 16],
    ['client', 'Love the layout. Approved!', 24, 20],
    ['admin', 'The homepage first build is ready. Open “Homepage, first build” on the project page to see it at computer, tablet and phone size.', 1, 15],
    ['client', 'Looks amazing so far! Quick question: can we add a small banner for the January promo?', 0, 13],
  ]
  for (const [from, body, d, h] of thread) await addMessage(site.id, from, body, ago(d, h))

  const feed: { projectId: string; actor: Role; text: string; days: number; href?: string }[] = [
    { projectId: site.id, actor: 'client', text: 'Accepted the proposal (Standard, $4,800.00)', days: 39 },
    { projectId: site.id, actor: 'client', text: 'Signed the project agreement', days: 38 },
    { projectId: site.id, actor: 'client', text: `Paid invoice ${deposit.number}`, days: 38, href: `/portal/admin/invoices/${deposit.id}` },
    { projectId: site.id, actor: 'client', text: 'Approved the change request “Online class booking widget” (+$600.00)', days: 19 },
    { projectId: site.id, actor: 'admin', text: 'Completed “Visual design”', days: 12 },
    { projectId: site.id, actor: 'client', text: 'Requested changes on “Schedule page design v1”', days: 3 },
    { projectId: site.id, actor: 'admin', text: 'Shared a preview: Homepage, first build', days: 1 },
    { projectId: site.id, actor: 'client', text: 'Sent a message', days: 0 },
  ]

  /* ───── 2. Finished landing page on a care plan: support requests, review, paid invoices ───── */
  const landing0 = await createProject(client.id, {
    name: 'Summer workshop landing page',
    summary: 'A one-page site for the summer teacher-training workshop.',
    status: 'completed',
    startDate: day(-150), dueDate: day(-110), liveUrl: 'https://felipecantujr.com',
    milestones: [
      milestone('Kickoff', 'done', -148),
      milestone('Design', 'done', -135),
      milestone('Build', 'done', -120),
      milestone('Launch', 'done', -110),
    ],
    access: [{ ...newAccessItem('vercel', 'Vercel (hosting)'), status: 'confirmed', invitedAt: ago(140), confirmedAt: ago(139) }],
    carePlan: {
      active: true, amount: 9900, billingDay: 1, includes: CARE_DEFAULT_INCLUDES,
      startsFrom: month(100), lastBilled: month(0), startedAt: ago(105),
    },
  })
  const landing = await saveProject({ ...landing0, createdAt: ago(155), price: 150000, handoffSentAt: ago(108), weeklyUpdates: false })
  feed.push(
    { projectId: landing.id, actor: 'admin', text: 'Project completed', days: 110 },
    { projectId: landing.id, actor: 'client', text: 'Left a 5-star review', days: 100 },
    { projectId: landing.id, actor: 'client', text: 'Opened support request: Signup form not sending emails', days: 0 },
  )

  let n = 4
  await invoice(client, landing.id, n++, {
    title: 'Summer workshop landing page', items: [{ description: 'Landing page design and build', quantity: 1, unitAmount: 150000 }],
    status: 'paid', createdDaysAgo: 112, dueIn: -105, paidDaysAgo: 106,
  })
  for (const m of [3, 2, 1, 0]) {
    const ym = month(m * 30)
    await invoice(client, landing.id, n++, {
      title: `Summer workshop landing page — care plan, ${ym}`, items: [{ description: `Monthly care plan (${ym})`, quantity: 1, unitAmount: 9900 }],
      status: 'paid', createdDaysAgo: m * 30 + 2, dueIn: 5 - m * 30, paidDaysAgo: m * 30 + 1, online: true,
    })
  }

  const ticketBase = { clientId: client.id, projectId: landing.id, openedBy: 'Maria Lopez' }
  await tickets.save({
    ...ticketBase, id: newId(), number: 1, title: 'Signup form not sending emails',
    body: 'Two people said they filled in the workshop form but I never got an email.', pageUrl: 'https://felipecantujr.com/#contact',
    kind: 'bug', priority: 'urgent', status: 'open', createdAt: ago(0, 12), updatedAt: ago(0, 12), replies: [],
  })
  await tickets.save({
    ...ticketBase, id: newId(), number: 2, title: 'Change the workshop dates',
    body: 'The fall session moved to October 18–20.', kind: 'change', priority: 'normal', status: 'waiting',
    createdAt: ago(3), updatedAt: ago(2),
    replies: [{ from: 'admin', name: 'Felipe', body: 'Happy to! Should the early-bird price end on the 1st or the 10th?', at: ago(2) }],
  })
  await tickets.save({
    ...ticketBase, id: newId(), number: 3, title: 'How do I see how many people visited?',
    body: 'Where can I find the visitor numbers?', kind: 'question', priority: 'low', status: 'done',
    createdAt: ago(40), updatedAt: ago(39), closedAt: ago(39),
    replies: [
      { from: 'admin', name: 'Felipe', body: 'Open Google Analytics → Reports → Traffic. I also added a monthly summary to your care-plan report.', at: ago(39) },
      { from: 'client', name: 'Maria Lopez', body: 'Found it, thanks!', at: ago(39) },
    ],
  })
  // allowPublish is off so the demo can never end up on the public website
  const review = await upsertReview({
    clientId: client.id, projectId: landing.id, rating: 5,
    text: 'Felipe made the whole process easy. The page looked great and the workshop sold out in two weeks.',
    displayName: 'Maria L., Sunrise Yoga (demo)', role: 'Owner', company: 'Sunrise Yoga Studio', allowPublish: false,
  })
  await saveReview({ ...review, createdAt: ago(100) })

  /* ───── 3. Next idea, waiting on the client to accept a proposal ───── */
  const app0 = await createProject(client.id, {
    name: 'Member app (phase 2)',
    summary: 'A simple app where members see their class pass, book classes and get reminders.',
    status: 'planning',
    clientTasks: [{ id: newId(), title: 'List of features members ask for most', done: false }],
  })
  const memberApp = await saveProject({ ...app0, createdAt: ago(5) })
  await proposals.save({
    id: newId(), clientId: client.id, projectId: memberApp.id, title: 'Member app proposal',
    intro: 'Two ways to get members booking from their phones. Either one can start in January.',
    options: [
      { id: newId(), name: 'Web app', price: 650000, timeline: '8 weeks', recommended: true, includes: ['Works on any phone, no app store', 'Class booking and passes', 'Email reminders'] },
      { id: newId(), name: 'iPhone & Android app', price: 1400000, timeline: '14 weeks', includes: ['Everything in Web app', 'App Store and Google Play listing', 'Push notifications'] },
    ],
    validUntil: day(30), autoContract: true, autoDeposit: true, status: 'sent', createdAt: ago(1), sentAt: ago(1),
  })
  await addMessage(memberApp.id, 'admin', 'Hi Maria, the proposal for the member app is ready on this project’s page. No rush, it’s valid for 30 days.', ago(1, 17))

  /* ───── a Get Started request for the Requests tab ───── */
  const lead = await createLead({
    ...EMPTY_INTAKE, name: 'Jordan Park (demo)', email: 'demo.lead@example.com', company: 'Park Street Bakery', projectType: 'ecommerce',
    description: 'We want to sell cakes and pastry boxes online for pickup.', goals: 'Take pre-orders without phone calls.',
    budget: '$5k–$15k', timeline: '1–3 Months', pages: ['Home', 'Shop / Products', 'About', 'Contact'], features: ['Payment Integration', 'Mobile Responsive'],
  })
  await saveLead({ ...lead, createdAt: ago(0, 10) })

  // Oldest first, so the newest ends up on top of the feeds
  for (const a of feed.sort((x, y) => y.days - x.days)) {
    await logActivity({ clientId: client.id, projectId: a.projectId, actor: a.actor, text: a.text, href: a.href ?? `/portal/admin/projects/${a.projectId}`, at: ago(a.days, 14) })
  }
  return client
}

/** Deletes the demo client (projects, invoices, contacts, activity) and the demo request. */
export async function removeDemoClient() {
  const client = await findDemoClient()
  if (client) await deleteClient(client.id)
  for (const lead of await listLeads()) if (isDemoEmail(lead.data.email)) await deleteLead(lead.id)
}
