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

/** Every service Felipe offers, as Get Started project types (plain English for clients). */
export const PROJECT_TYPES = [
  { id: 'website', group: 'new', label: 'Website / Landing Page', sub: 'A site for your business, brand or portfolio' },
  { id: 'web-app', group: 'new', label: 'Web Application', sub: 'Dashboards, portals, booking or internal tools' },
  { id: 'saas', group: 'new', label: 'SaaS / Startup MVP', sub: 'Turn your idea into a product people pay for' },
  { id: 'mobile', group: 'new', label: 'Mobile App', sub: 'An iPhone and Android app' },
  { id: 'ecommerce', group: 'new', label: 'Online Store', sub: 'Sell products online (Shopify or custom)' },
  { id: 'ai', group: 'new', label: 'AI Features', sub: 'Chatbots, smart search and automation' },
  { id: 'api', group: 'new', label: 'APIs & Integrations', sub: 'Connect your systems and tools together' },
  { id: 'design', group: 'new', label: 'UI/UX Design', sub: 'Designs and a clickable prototype first' },
  { id: 'rebuild', group: 'improve', label: 'Rebuild / Modernize', sub: 'Move an outdated site or app to modern tech' },
  { id: 'fix', group: 'improve', label: 'Fix & Speed Up', sub: 'Bugs, slow pages, security or messy code' },
  { id: 'devops', group: 'improve', label: 'Hosting & Deployment', sub: 'Cloud setup, automatic updates, backups' },
  { id: 'care', group: 'ongoing', label: 'Monthly Care Plan', sub: 'Updates, monitoring and small changes each month' },
  { id: 'other', group: 'ongoing', label: 'Something Else', sub: "Let's talk about it" },
] as const

export const PROJECT_TYPE_GROUPS = [
  { id: 'new', label: 'Build something new' },
  { id: 'improve', label: 'Improve what you have' },
  { id: 'ongoing', label: 'Ongoing help' },
] as const

export const PROJECT_TYPE_LABELS: Record<string, string> = Object.fromEntries(PROJECT_TYPES.map((t) => [t.id, t.label]))

/** Types where a page list doesn't really apply. */
export const NO_PAGES_TYPES = ['api', 'devops', 'fix', 'care']
/** Types that need logo / brand / content from the client. */
const BRAND_TYPES = ['website', 'web-app', 'saas', 'mobile', 'ecommerce', 'design', 'rebuild', 'ai', 'other']

export const BUDGET_OPTIONS = ['Under $1,000', '$1k–$5k', '$5k–$15k', '$15k+', "Let's Discuss"]
export const TIMELINE_OPTIONS = ['ASAP', '1–3 Months', '3–6 Months', '6+ Months', 'Flexible']
export const PAGE_OPTIONS = [
  'Home', 'About', 'Services', 'Portfolio / Gallery', 'Blog', 'Contact', 'Booking / Scheduling',
  'Shop / Products', 'FAQ', 'Testimonials', 'Pricing', 'Careers', 'Login / Account',
]
export const FEATURE_OPTIONS = [
  'User Authentication', 'Admin Dashboard', 'Payment Integration', 'Subscriptions & Billing', 'Teams & Organizations',
  'API Integration', 'Real-time Features', 'Database Design', 'AI Features', 'Search & Filters', 'Maps & Location',
  'Push Notifications', 'In-App Purchases', 'Offline Mode',
  'Mobile Responsive', 'Accessibility', 'Multi-language', 'SEO Optimization', 'CMS Integration',
  'Analytics', 'Email Notifications', '3rd-Party Integrations',
  'Data Migration', 'Automated Testing', 'Cloud & Automatic Deploys', 'Security Review',
]
/** Features that only make sense for some project types (others show for everyone). */
const FEATURE_TYPES: Record<string, string[]> = {
  'Subscriptions & Billing': ['saas', 'web-app', 'mobile', 'ecommerce', 'other'],
  'Teams & Organizations': ['saas', 'web-app', 'other'],
  'Push Notifications': ['mobile', 'saas', 'web-app', 'other'],
  'In-App Purchases': ['mobile'],
  'Offline Mode': ['mobile', 'web-app'],
  'Data Migration': ['rebuild', 'saas', 'web-app', 'ecommerce', 'website', 'api', 'other'],
  'Automated Testing': ['saas', 'web-app', 'mobile', 'rebuild', 'fix', 'api', 'devops', 'care', 'other'],
  'Cloud & Automatic Deploys': ['saas', 'web-app', 'mobile', 'rebuild', 'fix', 'api', 'devops', 'ai', 'other'],
  'Security Review': ['fix', 'rebuild', 'saas', 'web-app', 'care', 'devops', 'api', 'other'],
  'Mobile Responsive': ['website', 'web-app', 'saas', 'ecommerce', 'design', 'rebuild', 'fix', 'other'],
  'SEO Optimization': ['website', 'ecommerce', 'rebuild', 'fix', 'saas', 'care', 'other'],
  'CMS Integration': ['website', 'ecommerce', 'rebuild', 'web-app', 'other'],
}
export const featuresFor = (type: string) => FEATURE_OPTIONS.filter((f) => !FEATURE_TYPES[f] || !type || FEATURE_TYPES[f].includes(type))

/** "What do you already have?" — drives the client's to-do list. */
export const ASSET_OPTIONS = [
  'Logo', 'Brand colors & fonts', 'Written content', 'Photos / videos', 'Domain name', 'Hosting', 'An existing website',
  'Designs (Figma, sketches…)', 'Existing app or code', 'Apple / Google Play developer accounts', 'Cloud account (AWS, Google Cloud, Azure)',
  'Customer or product data',
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
  // Drop answers hidden for this project type (e.g. picked before switching type)
  const allowedFeatures = featuresFor(data.projectType)
  data.features = data.features.filter((f) => allowedFeatures.includes(f))
  if (NO_PAGES_TYPES.includes(data.projectType)) data.pages = []
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
      return ['Kickoff & requirements', 'UX flows & wireframes', 'UI design', 'Build: core features', 'Testing & QA', 'Beta review', 'Launch & handoff']
    case 'saas':
      return ['Kickoff & product scope', 'User flows & wireframes', 'UI design', 'Accounts & subscription billing', 'Build: core features', 'Testing & QA', 'Beta with first users', 'Launch']
    case 'mobile':
      return ['Kickoff & requirements', 'UX flows & wireframes', 'UI design', 'Build: core features', 'Testing on real phones', 'Beta (TestFlight / internal testing)', 'App Store & Google Play submission', 'Launch & handoff']
    case 'ecommerce':
      return ['Kickoff & product list', 'Store structure & wireframes', 'Visual design', 'Store build & payments', 'Products & content loaded', 'Test orders & review', 'Launch']
    case 'design':
      return ['Kickoff & research', 'Moodboard & direction', 'Wireframes', 'High-fidelity designs', 'Prototype & review', 'Design handoff']
    case 'ai':
      return ['Kickoff & use cases', 'Gather documents & data', 'Prototype & accuracy check', 'Build & connect to your site/app', 'Testing & safety review', 'Launch & monitoring']
    case 'api':
      return ['Kickoff & system review', 'API design & documentation', 'Build & connect', 'Testing', 'Go live & monitoring']
    case 'rebuild':
      return ['Audit of current site/app', 'Migration plan', 'Design refresh', 'Rebuild', 'Move data & content', 'Side-by-side testing', 'Switch over & redirects']
    case 'fix':
      return ['Audit & diagnosis', 'Priority fix list', 'Fixes & improvements', 'Testing', 'Before & after report']
    case 'devops':
      return ['Infrastructure review', 'Cloud & hosting setup', 'Automatic deploys (CI/CD)', 'Monitoring & backups', 'Handoff & documentation']
    case 'care':
      return ['Onboarding & site check-up', 'Monitoring, backups & security set up', 'First monthly report']
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
  const f = (x: string) => d.features.includes(x)
  const t = d.projectType
  const tasks: string[] = []

  if (BRAND_TYPES.includes(t)) {
    tasks.push(has('Logo') ? 'Upload your logo files (SVG or high-res PNG)' : 'Share logo ideas, or tell Felipe if you need a logo designed')
    tasks.push(has('Brand colors & fonts') ? 'Share your brand colors and fonts (or brand guide)' : 'Send 2–3 websites or brands whose look you like')
  }
  if (has('Designs (Figma, sketches…)')) tasks.push('Share your designs (Figma link or files)')
  if (BRAND_TYPES.includes(t) && t !== 'ai') {
    tasks.push(
      has('Written content')
        ? `Upload the text for each page${d.pages.length ? ` (${d.pages.slice(0, 4).join(', ')}${d.pages.length > 4 ? '…' : ''})` : ''}`
        : 'Send rough notes for each page — Felipe can help polish the wording'
    )
    tasks.push(has('Photos / videos') ? 'Upload photos and videos you want used' : 'Decide on images: your own photos, a photographer, or stock')
  }
  if (!d.pages.length && ['website', 'ecommerce', 'rebuild', 'other'].includes(t)) tasks.push('List the pages you need and what goes on each')

  // Domain & hosting
  if (has('Domain name')) tasks.push('Invite Felipe to your domain account (or share where it’s registered)')
  else if (['website', 'web-app', 'saas', 'ecommerce', 'rebuild', 'other'].includes(t)) tasks.push('Choose the domain name you’d like (e.g. yourbusiness.com)')
  if (has('Hosting')) tasks.push('Add Felipe as a user on your hosting account')
  if (has('An existing website') || d.currentWebsite || t === 'care') tasks.push('Invite Felipe as an admin on your current website')
  if (has('Existing app or code') || t === 'rebuild' || t === 'fix') tasks.push('Invite Felipe to your code (GitHub, GitLab or Bitbucket)')
  if (has('Cloud account (AWS, Google Cloud, Azure)') || t === 'devops') tasks.push('Invite Felipe to your cloud account (AWS, Google Cloud, Azure or Vercel)')

  // By project type
  if (t === 'rebuild' || t === 'fix') tasks.push('List the problems you’ve noticed (screenshots help)')
  if (t === 'mobile') {
    tasks.push(has('Apple / Google Play developer accounts') ? 'Invite Felipe to App Store Connect and Google Play Console' : 'Create your Apple Developer and Google Play developer accounts')
    tasks.push('Write a short app description for the app stores')
    tasks.push('Share a privacy policy link (Felipe can help draft one)')
  }
  if (t === 'saas' || f('Subscriptions & Billing')) tasks.push('Decide your pricing plans (names, prices, what each includes)')
  if (t === 'ai' || f('AI Features')) {
    tasks.push('Share examples of questions or tasks the AI should handle')
    tasks.push('Upload documents the AI should learn from (FAQs, manuals, policies)')
  }
  if (t === 'care') tasks.push('Tell Felipe who to contact if something breaks, and how')

  // By feature
  if (f('Payment Integration') || f('Subscriptions & Billing') || t === 'ecommerce' || t === 'saas') tasks.push('Create or share your Stripe (or PayPal) business account')
  if (t === 'ecommerce') tasks.push('Send your product list (names, prices, descriptions, photos)')
  if (f('Data Migration') || has('Customer or product data')) tasks.push('Export your existing data (customers, products, posts) or tell Felipe where it lives')
  if (f('Multi-language')) tasks.push('Tell Felipe which languages you need, and who will translate')
  if (f('Analytics')) tasks.push('Add Felipe to your Google Analytics / Search Console')
  if (f('Email Notifications')) tasks.push('Tell Felipe which email address notifications should come from')
  if (f('3rd-Party Integrations') || f('API Integration') || t === 'api') tasks.push('List the tools/services to connect, with account access')
  if (BRAND_TYPES.includes(t) && t !== 'ai') tasks.push('Send links to your social media profiles')
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
  'Subscriptions & Billing': { label: 'Charge monthly', hint: 'Recurring plans, free trials and receipts, like memberships or software subscriptions.' },
  'Teams & Organizations': { label: 'Accounts for whole companies', hint: 'Each customer business gets its own private space with its own team members.' },
  'AI Features': { label: 'AI assistant or automation', hint: 'A chatbot that answers questions, or AI that sorts, summarizes or writes for you.' },
  'Search & Filters': { label: 'Search & filters', hint: 'Let people quickly find what they need, like products by price or listings by area.' },
  'Maps & Location': { label: 'Maps & location', hint: 'Show places on a map, find what’s nearby, or track deliveries.' },
  'Push Notifications': { label: 'Phone notifications', hint: 'Send alerts to people’s phones, like reminders, messages or order updates.' },
  'In-App Purchases': { label: 'Sell inside the app', hint: 'Subscriptions or upgrades bought through the App Store or Google Play.' },
  'Offline Mode': { label: 'Works without internet', hint: 'People can keep using it with no signal; it catches up when they’re back online.' },
  Accessibility: { label: 'Accessible to everyone', hint: 'Works with screen readers and keyboards, following accessibility guidelines (WCAG).' },
  'Multi-language': { label: 'More than one language', hint: 'Visitors can switch languages, e.g. English and Spanish.' },
  'Data Migration': { label: 'Move existing data', hint: 'Bring over customers, products or posts from your old system without losing anything.' },
  'Automated Testing': { label: 'Automatic quality checks', hint: 'Tests run on every update so bugs are caught before your customers see them.' },
  'Cloud & Automatic Deploys': { label: 'Reliable hosting & safe updates', hint: 'Set up on AWS, Google Cloud or Vercel; updates go live automatically once checks pass.' },
  'Security Review': { label: 'Security check-up', hint: 'Find and fix weak spots that could expose your data or your customers’.' },
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
  'Designs (Figma, sketches…)': 'Mockups or sketches of how it should look',
  'Existing app or code': 'An app or code someone already built',
  'Apple / Google Play developer accounts': 'Accounts for publishing apps to the app stores',
  'Cloud account (AWS, Google Cloud, Azure)': 'An account where your app or data already runs',
  'Customer or product data': 'Spreadsheets or an old system with info to bring over',
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
  ['Share your designs', 'In Figma, click “Share”, set the link to “can view” and paste it here with “Share link”. Image or PDF files can be uploaded.'],
  ['Invite Felipe to your code', 'Your code stays yours. The “Accounts & access” section on this page shows exactly where to click — no passwords needed.'],
  ['Invite Felipe to your cloud account', 'This is where your app runs. See “Accounts & access” on this page for the steps — you invite Felipe’s email, no passwords shared.'],
  ['List the problems you’ve noticed', 'Send a message with what goes wrong, on which page, and on which device. Screenshots or a short screen recording help a lot.'],
  ['Invite Felipe to App Store Connect', 'This lets him upload and submit your app while you stay the owner. See “Accounts & access” on this page for the steps.'],
  ['Create your Apple Developer and Google Play', 'Apps must be published under your own accounts so you own them. Apple charges about $99 a year and Google a one-time fee of about $25. Sign up at developer.apple.com and play.google.com/console, then invite Felipe.'],
  ['Write a short app description', 'A few sentences on what the app does and who it’s for. Felipe will turn it into the store listing.'],
  ['Share a privacy policy link', 'Both app stores require one. If you don’t have one, say so and Felipe will help you put one together.'],
  ['Decide your pricing plans', 'For example “Basic $9/month, Pro $29/month” and what each includes. Rough ideas are fine — you can change them later.'],
  ['Share examples of questions or tasks the AI', 'Write 10–20 real examples, e.g. questions customers ask you, or jobs you want automated. This is how the AI gets tested.'],
  ['Upload documents the AI should learn from', 'FAQs, product manuals, price lists or policies — upload them here. Only share what you’re comfortable with the AI using.'],
  ['Tell Felipe who to contact if something breaks', 'A name, phone and email for urgent issues, plus the best times to reach them.'],
  ['Export your existing data', 'Most systems have an “Export” or “Download CSV” option. Upload the files here, or tell Felipe which system it’s in.'],
  ['Tell Felipe which languages you need', 'List the languages and whether you have a translator, or would like Felipe to arrange one.'],
]

export function taskHint(title: string) {
  return TASK_HINTS.find(([start]) => title.startsWith(start))?.[1]
}
