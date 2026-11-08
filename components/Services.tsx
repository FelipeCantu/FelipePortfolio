import Link from 'next/link'
import type { IconType } from 'react-icons'
import {
  FaGlobe, FaLaptopCode, FaRocket, FaMobileAlt, FaShoppingCart, FaPlug, FaDatabase, FaPaintBrush, FaUniversalAccess,
  FaSyncAlt, FaTachometerAlt, FaBroom, FaCloud, FaVial, FaHeartbeat, FaRobot,
} from 'react-icons/fa'
import { FiArrowRight } from 'react-icons/fi'

type Service = { icon: IconType; title: string; text: string; example: string; type: string }

/** Everything Felipe offers, in plain English. Each card opens Get Started with that project type selected. */
const GROUPS: { title: string; sub: string; services: Service[] }[] = [
  {
    title: 'Build something new',
    sub: 'From the first idea to a finished product people can use.',
    services: [
      { icon: FaGlobe, title: 'Websites & landing pages', text: 'Fast, good-looking sites that show up on Google and turn visitors into customers.', example: 'Business sites, portfolios, launch pages', type: 'website' },
      { icon: FaLaptopCode, title: 'Custom web apps', text: 'Software built around how your business works, with logins and a dashboard for your team.', example: 'Client portals, booking systems, internal tools', type: 'web-app' },
      { icon: FaRocket, title: 'SaaS & startup MVPs', text: 'Turn an idea into a product people pay for: accounts, subscriptions and billing included.', example: 'Subscription software, marketplaces, first versions to test an idea', type: 'saas' },
      { icon: FaMobileAlt, title: 'Mobile apps', text: 'One React Native app for iPhone and Android, connected to your website and data, and published to both app stores.', example: 'Booking, loyalty and companion apps', type: 'mobile' },
      { icon: FaShoppingCart, title: 'Online stores', text: 'Shopify or custom stores with secure checkout, inventory and order emails.', example: 'Product shops, digital downloads, pre-orders', type: 'ecommerce' },
      { icon: FaPlug, title: 'APIs & integrations', text: 'Connect the tools you already use so information moves between them automatically.', example: 'Payments, CRMs, calendars, messaging', type: 'api' },
      { icon: FaDatabase, title: 'Databases & back end', text: 'A secure, organized place for your data that keeps working as you grow.', example: 'Customer records, orders, listings, reports', type: 'web-app' },
    ],
  },
  {
    title: 'Design & experience',
    sub: 'Easy to use, before a single line of code is written.',
    services: [
      { icon: FaPaintBrush, title: 'UI/UX design & prototypes', text: 'Wireframes and a clickable Figma prototype so you can see and try it before it’s built.', example: 'App screens, site redesigns, design systems', type: 'design' },
      { icon: FaUniversalAccess, title: 'Responsive & accessible', text: 'Works on every phone, tablet and computer, and for people using screen readers or keyboards.', example: 'Accessibility (WCAG) fixes, mobile-friendly updates', type: 'fix' },
    ],
  },
  {
    title: 'Improve what you have',
    sub: 'Already have a site or app? Make it faster, safer and easier to change.',
    services: [
      { icon: FaSyncAlt, title: 'Rebuild & modernize', text: 'Move an outdated site or app to modern tech without losing data, content or Google rankings.', example: 'WordPress or old PHP to Next.js, app rewrites', type: 'rebuild' },
      { icon: FaTachometerAlt, title: 'Speed, bugs & security', text: 'Find out why something is slow or broken, fix it, and close security gaps.', example: 'Slow pages, crashes, failed checkouts', type: 'fix' },
      { icon: FaBroom, title: 'Code cleanup', text: 'Tidy up messy code so new features are quicker and cheaper to add.', example: 'Taking over a project from another developer', type: 'fix' },
    ],
  },
  {
    title: 'Launch & keep it running',
    sub: 'The behind-the-scenes work that keeps everything reliable.',
    services: [
      { icon: FaCloud, title: 'Cloud hosting & DevOps', text: 'Set up on AWS, Google Cloud or Vercel, with updates going live automatically once they pass checks.', example: 'Hosting moves, automatic deploys, backups', type: 'devops' },
      { icon: FaVial, title: 'Testing & quality checks', text: 'Automated tests that catch bugs before your customers do.', example: 'Checkout, sign-up and payment flows', type: 'fix' },
      { icon: FaHeartbeat, title: 'Monthly care plans', text: 'Updates, backups, monitoring and small changes every month, for one simple monthly price.', example: 'Ongoing support after launch', type: 'care' },
    ],
  },
  {
    title: 'AI & automation',
    sub: 'Put AI to work where it saves you time.',
    services: [
      { icon: FaRobot, title: 'AI features & chatbots', text: 'Chatbots that answer from your own info, smart search, and automations that sort, summarize or write for you.', example: 'Customer-support bots, document summaries, recommendations', type: 'ai' },
    ],
  },
]

export default function Services() {
  return (
    <section id="services" className="section-y border-t border-line/10" aria-labelledby="services-heading">
      <div className="container-page">
        <header className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Services</p>
          <h2 id="services-heading" className="mt-3 text-h2 text-fg">Everything you need, from idea to launch and beyond</h2>
          <p className="lead mt-4">
            One developer for your website, web app, mobile app and the technical work in between. You get a private
            client portal to follow progress, share files and pay invoices.
          </p>
        </header>

        <div className="mt-14 grid gap-14">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <div className="mb-5">
                <h3 className="text-h3 text-fg">{g.title}</h3>
                <p className="mt-1 text-small text-muted">{g.sub}</p>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {g.services.map((s) => (
                  <li key={s.title}>
                    <Link
                      href={`/get-started?type=${s.type}`}
                      className="card-interactive group flex h-full flex-col p-6 no-underline"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-control bg-accent/10 text-[1.15rem] text-accent-light" aria-hidden="true">
                        <s.icon />
                      </span>
                      <span className="mt-4 text-lg font-bold text-fg">{s.title}</span>
                      <span className="mt-2 flex-1 text-small text-muted">{s.text}</span>
                      <span className="mt-4 text-[0.78rem] text-subtle">e.g. {s.example}</span>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-small font-semibold text-accent-light">
                        Start a project
                        <FiArrowRight aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-3">
          <Link href="/get-started" className="btn btn-primary">Start a project</Link>
          <Link href="/portfolio" className="btn btn-secondary">See my work</Link>
        </div>
      </div>
    </section>
  )
}
