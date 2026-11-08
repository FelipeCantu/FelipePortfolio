/**
 * The Get Started wizard's answers, shared by the public wizard (browser),
 * the API that saves them, and the portal that turns them into a project.
 * No server-only imports here.
 */

export interface IntakeData {
  name: string
  email: string
  company: string
  phone: string
  currentWebsite: string
  projectType: string
  description: string
  goals: string
  budget: string
  timeline: string
  deadline: string
  deadlineReason: string
  pages: string[]
  features: string[]
  assets: string[]
  inspiration: string
  techNotes: string
  preferredDays: string[]
  preferredTime: string
  additionalNotes: string
}

export const EMPTY_INTAKE: IntakeData = {
  name: '', email: '', company: '', phone: '', currentWebsite: '',
  projectType: '',
  description: '', goals: '', budget: '', timeline: '', deadline: '', deadlineReason: '',
  pages: [], features: [], assets: [], inspiration: '', techNotes: '',
  preferredDays: [], preferredTime: '', additionalNotes: '',
}

export const PROJECT_TYPE_LABELS: Record<string, string> = {
  'web-app': 'Web Application',
  website: 'Website / Landing Page',
  mobile: 'Mobile App',
  ecommerce: 'E-Commerce',
  design: 'UI/UX Design',
  other: 'Something Else',
}

export const BUDGET_OPTIONS = ['Under $1,000', '$1k–$5k', '$5k–$15k', '$15k+', "Let's Discuss"]
export const TIMELINE_OPTIONS = ['ASAP', '1–3 Months', '3–6 Months', '6+ Months', 'Flexible']
export const PAGE_OPTIONS = [
  'Home', 'About', 'Services', 'Portfolio / Gallery', 'Blog', 'Contact', 'Booking / Scheduling',
  'Shop / Products', 'FAQ', 'Testimonials', 'Pricing', 'Careers', 'Login / Account',
]
export const FEATURE_OPTIONS = [
  'User Authentication', 'Admin Dashboard', 'Payment Integration',
  'API Integration', 'Real-time Features', 'Database Design',
  'Mobile Responsive', 'SEO Optimization', 'CMS Integration',
  'Analytics', 'Email Notifications', '3rd-Party Integrations',
]
/** "What do you already have?" — drives the client's to-do list. */
export const ASSET_OPTIONS = [
  'Logo', 'Brand colors & fonts', 'Written content', 'Photos / videos', 'Domain name', 'Hosting', 'An existing website',
]
export const DAY_OPTIONS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
export const TIME_OPTIONS = ['Morning (9am–12pm)', 'Afternoon (12pm–5pm)', 'Evening (5pm–8pm)']

const LIMITS: Record<string, number> = {
  name: 120, email: 200, company: 160, phone: 40, currentWebsite: 300, projectType: 40,
  description: 4000, goals: 2000, budget: 40, timeline: 40, deadline: 10, deadlineReason: 300,
  inspiration: 2000, techNotes: 2000, preferredTime: 60, additionalNotes: 2000,
}
const LISTS: Record<string, readonly string[]> = {
  pages: PAGE_OPTIONS, features: FEATURE_OPTIONS, assets: ASSET_OPTIONS, preferredDays: DAY_OPTIONS,
}

/** Trims, length-limits and whitelists untrusted input from the public form. */
export function cleanIntake(raw: unknown): { data?: IntakeData; error?: string } {
  if (!raw || typeof raw !== 'object') return { error: 'Invalid form.' }
  const r = raw as Record<string, unknown>
  const data = { ...EMPTY_INTAKE }
  for (const [k, max] of Object.entries(LIMITS)) {
    const v = r[k]
    ;(data as unknown as Record<string, unknown>)[k] = typeof v === 'string' ? v.trim().slice(0, max) : ''
  }
  for (const [k, allowed] of Object.entries(LISTS)) {
    const v = r[k]
    ;(data as unknown as Record<string, unknown>)[k] = Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string' && allowed.includes(x)) : []
  }
  if (!data.name) return { error: 'Please enter your name.' }
  if (!/^\S+@\S+\.\S+$/.test(data.email)) return { error: 'Please enter a valid email address.' }
  if (!PROJECT_TYPE_LABELS[data.projectType]) return { error: 'Please choose a project type.' }
  if (!data.description) return { error: 'Please describe your project.' }
  if (data.deadline && !/^\d{4}-\d{2}-\d{2}$/.test(data.deadline)) data.deadline = ''
  return { data }
}

/** Plain-text summary (used in emails). */
export function intakeSummary(d: IntakeData) {
  const list = (xs: string[]) => (xs.length ? xs.join(', ') : '—')
  return `ABOUT
Name: ${d.name}
Email: ${d.email}
Company: ${d.company || '—'}
Phone: ${d.phone || '—'}
Current website: ${d.currentWebsite || '—'}

PROJECT
Type: ${PROJECT_TYPE_LABELS[d.projectType] ?? d.projectType}
Budget: ${d.budget || '—'}
Timeline: ${d.timeline || '—'}${d.deadline ? `\nHard deadline: ${d.deadline}${d.deadlineReason ? ` (${d.deadlineReason})` : ''}` : ''}

Description:
${d.description}

Goals:
${d.goals || '—'}

NEEDS
Pages: ${list(d.pages)}
Features: ${list(d.features)}
Already has: ${list(d.assets)}
Inspiration: ${d.inspiration || '—'}
Tech notes: ${d.techNotes || '—'}

CALL
Days: ${list(d.preferredDays)} · Time: ${d.preferredTime || 'No preference'}
Notes: ${d.additionalNotes || '—'}`
}

/** Milestone template for a new project, by project type. */
export function milestonesFor(type: string): string[] {
  switch (type) {
    case 'web-app':
    case 'mobile':
      return ['Kickoff & requirements', 'UX flows & wireframes', 'UI design', 'Build: core features', 'Testing & QA', 'Beta review', 'Launch & handoff']
    case 'ecommerce':
      return ['Kickoff & product list', 'Store structure & wireframes', 'Visual design', 'Store build & payments', 'Products & content loaded', 'Test orders & review', 'Launch']
    case 'design':
      return ['Kickoff & research', 'Moodboard & direction', 'Wireframes', 'High-fidelity designs', 'Prototype & review', 'Design handoff']
    default:
      return ['Kickoff & discovery', 'Sitemap & wireframes', 'Visual design', 'Development', 'Content & SEO', 'Review & revisions', 'Launch']
  }
}

/**
 * What the client needs to send, based on their answers. These become the
 * "Needed from you" checklist in their portal.
 */
export function clientTasksFor(d: IntakeData): string[] {
  const has = (a: string) => d.assets.includes(a)
  const tasks: string[] = []

  tasks.push(has('Logo') ? 'Upload your logo files (SVG or high-res PNG)' : 'Share logo ideas, or tell Felipe if you need a logo designed')
  tasks.push(has('Brand colors & fonts') ? 'Share your brand colors and fonts (or brand guide)' : 'Send 2–3 websites or brands whose look you like')
  tasks.push(
    has('Written content')
      ? `Upload the text for each page${d.pages.length ? ` (${d.pages.slice(0, 4).join(', ')}${d.pages.length > 4 ? '…' : ''})` : ''}`
      : 'Send rough notes for each page — Felipe can help polish the wording'
  )
  tasks.push(has('Photos / videos') ? 'Upload photos and videos you want used' : 'Decide on images: your own photos, a photographer, or stock')
  if (!d.pages.length && d.projectType !== 'web-app' && d.projectType !== 'mobile') tasks.push('List the pages you need and what goes on each')
  if (has('Domain name')) tasks.push('Invite Felipe to your domain account (or share where it’s registered)')
  else if (d.projectType !== 'design') tasks.push('Choose the domain name you’d like (e.g. yourbusiness.com)')
  if (has('Hosting')) tasks.push('Add Felipe as a user on your hosting account')
  if (has('An existing website') || d.currentWebsite) tasks.push('Invite Felipe as an admin on your current website')
  if (d.features.includes('Payment Integration') || d.projectType === 'ecommerce') tasks.push('Create or share your Stripe (or PayPal) business account')
  if (d.projectType === 'ecommerce') tasks.push('Send your product list (names, prices, descriptions, photos)')
  if (d.features.includes('Analytics')) tasks.push('Add Felipe to your Google Analytics / Search Console')
  if (d.features.includes('Email Notifications')) tasks.push('Tell Felipe which email address notifications should come from')
  if (d.features.includes('3rd-Party Integrations') || d.features.includes('API Integration')) tasks.push('List the tools/services to connect, with account access')
  tasks.push('Send links to your social media profiles')
  return tasks
}


/* ───────────── Plain-English explanations for non-developers ─────────────
 * The stored values (keys) stay the same; these only change what people see. */

export const FEATURE_INFO: Record<string, { label: string; hint: string }> = {
  'User Authentication': { label: 'Customer accounts', hint: 'Visitors can sign up and log in, for example to see past orders or saved info.' },
  'Admin Dashboard': { label: 'Your own control panel', hint: 'A private page where you manage orders, bookings or content — no code needed.' },
  'Payment Integration': { label: 'Take payments online', hint: 'Accept cards, Apple Pay and Google Pay right on your site.' },
  'API Integration': { label: 'Connect to another system', hint: 'Share information with software you already use, like your booking or inventory system.' },
  'Real-time Features': { label: 'Live updates', hint: 'Things change instantly without refreshing, like chat, live locations or order status.' },
  'Database Design': { label: 'Save & organize information', hint: 'Keep track of things like customers, orders or listings so they can be searched and updated.' },
  'Mobile Responsive': { label: 'Looks great on phones', hint: 'The site adjusts to any screen size. (Every project includes this.)' },
  'SEO Optimization': { label: 'Show up on Google', hint: 'Set up so search engines can find your site and rank it higher.' },
  'CMS Integration': { label: 'Edit content yourself', hint: 'Change text, photos and blog posts on your own, without calling a developer.' },
  Analytics: { label: 'Visitor stats', hint: 'See how many people visit, where they come from and what they click.' },
  'Email Notifications': { label: 'Automatic emails', hint: 'Send messages automatically, like order confirmations or booking reminders.' },
  '3rd-Party Integrations': { label: 'Connect your apps', hint: 'Link tools you already use, like Square, Mailchimp, Google Calendar or Instagram.' },
}

export const PAGE_INFO: Record<string, string> = {
  Home: 'The first page people see',
  About: 'Your story, mission and team',
  Services: 'What you offer and how it works',
  'Portfolio / Gallery': 'Photos or examples of your work',
  Blog: 'News, tips or articles you post',
  Contact: 'A contact form, phone, map and hours',
  'Booking / Scheduling': 'Let people book appointments or events',
  'Shop / Products': 'Sell products online',
  FAQ: 'Answers to common questions',
  Testimonials: 'Reviews from happy customers',
  Pricing: 'Your packages and prices',
  Careers: 'Job openings and how to apply',
  'Login / Account': 'A members-only area',
}

export const ASSET_INFO: Record<string, string> = {
  Logo: 'Your logo, in any format',
  'Brand colors & fonts': 'Specific colors or fonts you always use',
  'Written content': 'Text for your pages, even a rough draft',
  'Photos / videos': 'Your own pictures of your work, team or products',
  'Domain name': 'Your web address (like yourbusiness.com), already purchased',
  Hosting: 'An account that runs a website, e.g. GoDaddy, Squarespace or Wix',
  'An existing website': 'A current site we’d replace or improve',
}

export const featureLabel = (v: string) => FEATURE_INFO[v]?.label ?? v

/**
 * "How do I do this?" notes for the client's checklist. Matched by the start
 * of the task title, so tasks that add details (like page names) still match.
 * Unknown/custom tasks simply show no note.
 */
const TASK_HINTS: [string, string][] = [
  ['Upload your logo', 'Use the upload box on this page. The original file from your designer is best (.svg, .ai or .eps); a large .png works too.'],
  ['Send logo and brand assets', 'Use the upload box on this page for your logo and any brand files. A large .png is fine if that’s what you have.'],
  ['Share logo ideas', 'Send a message with any sketches or ideas — or just say you’d like a logo designed and Felipe will quote it.'],
  ['Share your brand colors', 'Upload your brand guide if you have one. Otherwise, color codes (like #1E90FF) or a screenshot of something in your colors works.'],
  ['Send 2–3 websites', 'Paste links with “Share link” on this page and add a note on what you like — colors, layout, the feel.'],
  ['Upload the text for each page', 'A Word or Google Doc per page is perfect. For Google Docs, use “Share link”.'],
  ['Share website copy', 'A Word or Google Doc per page is perfect. For Google Docs, use “Share link”.'],
  ['Send rough notes for each page', 'Bullet points are fine: what you do, who it’s for, and what you want visitors to do next.'],
  ['Upload photos and videos', 'Full-size originals look best. For lots of files, share a Google Drive or Dropbox folder link instead.'],
  ['Decide on images', 'Let Felipe know in a message. Stock photos are quick and affordable; real photos of your business build more trust.'],
  ['List the pages you need', 'A simple list in a message is perfect, e.g. Home, About, Services, Contact.'],
  ['Invite Felipe to your domain account', 'Your domain is your web address. Tell Felipe where you bought it (GoDaddy, Namecheap, Squarespace…) and he’ll walk you through adding him as a user. Never send passwords in messages.'],
  ['Provide domain & hosting access', 'Tell Felipe where your web address and website account are (GoDaddy, Wix, Squarespace…). He’ll walk you through adding him as a user — never send passwords in messages.'],
  ['Choose the domain name', 'Your web address, like yourbusiness.com. Send 2–3 ideas and Felipe will check which are available (usually about $12–20 a year).'],
  ['Add Felipe as a user on your hosting', 'Hosting is the service your website lives on. Most let you invite a team member from their settings — Felipe can walk you through it.'],
  ['Invite Felipe as an admin on your current website', 'So he can see how it’s set up and move your content over. Look for “Users” or “Team” in your site’s settings.'],
  ['Create or share your Stripe', 'This is how you’ll get paid online. Signing up at stripe.com is free and takes about 15 minutes — have your bank details handy.'],
  ['Send your product list', 'A spreadsheet works great: one row per product with name, price, description and photo.'],
  ['Add Felipe to your Google Analytics', 'These free Google tools show who visits your site. Don’t have them? Felipe can set them up for you.'],
  ['Tell Felipe which email address', 'The address customers will see on automatic emails, e.g. orders@yourbusiness.com.'],
  ['List the tools/services to connect', 'For example Square, Mailchimp or Google Calendar. Felipe will tell you exactly what access he needs for each.'],
  ['Send links to your social media', 'Paste your Instagram, Facebook, TikTok, etc. so your site can link to them.'],
]

export function taskHint(title: string) {
  return TASK_HINTS.find(([start]) => title.startsWith(start))?.[1]
}
