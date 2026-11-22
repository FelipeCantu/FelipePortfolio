---
title: "Full-Stack Development, Explained Through One Real Feature"
excerpt: "What full-stack work really involves, traced through one feature from button to database to Stripe to email, plus what to learn first and what to skip."
---

Most full-stack roadmaps hand you a list of forty technologies and wish you luck. You learn a framework, a database, some Docker, a bit of cloud, and you still don't feel ready, because nobody showed you how the pieces connect when real money and real users are involved.

Here's what I think full stack actually means: you can take one feature from a button on the screen to a row in the database, through a third-party service and back, and you can keep it working after it ships. You don't have to be an expert at every layer. You do have to understand every layer well enough to know where a bug lives and who, or what, to blame.

So instead of another list, this guide follows one feature end to end and pulls the skills out of it.

[IMAGE 1]

## One feature, end to end: a client pays an invoice

My client portal on felipecantujr.com lets clients see their invoices and pay them online. It's built with the Next.js App Router, server actions, Upstash Redis for data, Vercel Blob for files, Stripe Checkout for payments, and Resend for email. Paying an invoice touches all of it.

### The UI

The invoice page is a React Server Component. It reads the invoice on the server and renders HTML, so no invoice data needs a separate API call from the browser. The **Pay now** button is a plain form:

```tsx
<form action={payInvoice.bind(null, invoice.id)}>
  <button type="submit">Pay now</button>
</form>
```

Skills here: HTML forms, accessible buttons, CSS that works on a phone, and knowing which components run on the server and which run in the browser.

### The server action

When the form submits, a server action runs on the server. This is where most beginners get burned, because a server action looks like a function call but is really a public POST endpoint. Anyone can call it with any invoice ID, so it has to check who's asking and whether that invoice is theirs.

```ts
// app/portal/invoices/actions.ts
'use server'

import { redirect } from 'next/navigation'
import Stripe from 'stripe'
import { getSession } from '@/lib/session'
import { getInvoice } from '@/lib/db'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function payInvoice(invoiceId: string) {
  const session = await getSession()
  if (!session) redirect('/portal/login')

  const invoice = await getInvoice(invoiceId)
  // Authorization: the invoice must belong to the signed-in client
  if (!invoice || invoice.clientId !== session.clientId) throw new Error('Not found')
  if (invoice.status !== 'sent') throw new Error('This invoice is not payable')

  const checkout = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: { name: `Invoice ${invoice.number}` },
          unit_amount: invoice.totalCents,
        },
        quantity: 1,
      },
    ],
    metadata: { invoiceId: invoice.id },
    success_url: `${process.env.SITE_URL}/portal/invoices/${invoice.id}?paid=1`,
    cancel_url: `${process.env.SITE_URL}/portal/invoices/${invoice.id}`,
  })

  redirect(checkout.url!)
}
```

`getSession` and `getInvoice` are your own helpers. Notice that the amount comes from the database, never from the form, and that money is stored in cents as an integer. Floating-point dollars will eventually give you an invoice for $149.99999.

### The payment provider

Stripe Checkout is a hosted payment page, so card numbers never touch my server. That's a big deal: it keeps most of the card-security burden on Stripe. The skill here isn't writing payment code, it's reading a provider's docs, using test mode, and understanding the flow you're handing off.

### The webhook

The `?paid=1` on the success URL proves nothing; anyone can type it. The source of truth is Stripe telling your server, through a signed webhook, that the payment went through.

```ts
// app/api/stripe-webhook/route.ts
import Stripe from 'stripe'
import { after } from 'next/server'
import { markInvoicePaid } from '@/lib/db'
import { sendPaymentEmails } from '@/lib/notify'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const body = await req.text() // raw body: parsing it as JSON first breaks the signature
  const signature = req.headers.get('stripe-signature')
  if (!signature) return new Response('Missing signature', { status: 400 })

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return new Response('Invalid signature', { status: 400 })
  }

  if (
    event.type === 'checkout.session.completed' ||
    event.type === 'checkout.session.async_payment_succeeded'
  ) {
    const session = event.data.object
    const invoiceId = session.metadata?.invoiceId
    if (session.payment_status === 'paid' && invoiceId) {
      // Returns false if the invoice was already paid, so a repeated event does nothing
      const changed = await markInvoicePaid(invoiceId, session.id)
      if (changed) after(() => sendPaymentEmails(invoiceId))
    }
  }

  return new Response('ok')
}
```

Two details separate this from a tutorial version. Stripe [can deliver the same event more than once](https://docs.stripe.com/webhooks/signature), so the database update has to be idempotent: `markInvoicePaid` only moves an invoice from "sent" to "paid" and reports whether it did. And the second event type covers payment methods that settle later, where `checkout.session.completed` arrives before the money does.

### The database and the email

`markInvoicePaid` writes to the database, and [`after()`](https://nextjs.org/docs/app/api-reference/functions/after) sends the emails once the response is on its way, so Stripe gets a quick 200 and doesn't time out waiting on Resend. The client gets a receipt; I get a "you were paid" note.

Count the skills in that one button: HTML and React, server/client boundaries, sessions and authorization, a third-party API, webhook signatures, idempotency, data modeling, transactional email, environment variables, and deployment. That's the job.

## A stack to learn first, and what to skip for now

Pick one stack and go deep enough to ship. Here's the one I'd recommend for most people aiming at web product work today:

- **HTML, CSS and JavaScript**, properly. Forms, semantic elements, flexbox and grid, `fetch`, promises, and the browser dev tools.
- **TypeScript.** It catches the "this can be undefined" bugs before your users do, and almost every React job expects it.
- **React with Next.js (App Router).** One framework that covers UI, server code and API routes, so you see both halves of every feature.
- **Node.js basics**: modules, environment variables, reading a stack trace.
- **PostgreSQL and SQL.** More on this below.
- **Git** with branches and pull requests, even when you're the only one on the project.
- **One host** you know well. I use Vercel; Render, Railway or Fly.io are fine too.

Fair alternatives exist. SvelteKit, React Router, Laravel and Django are all good ways to learn the same concepts, and if a local job market runs on one of them, follow the market.

What to skip at first: microservices, Kubernetes, GraphQL, three front-end frameworks at once, and "NoSQL because it's easier." None of these are bad. They just solve problems you don't have yet, and they pull time away from shipping something whole.

## Databases: start with Postgres, add a key-value store when it fits

Learn relational data first. Most applications are relational at heart: clients have projects, projects have invoices, invoices have line items. SQL lets you ask questions you didn't plan for ("unpaid invoices older than 30 days, grouped by client") without rewriting your data model.

The fundamentals worth your time are tables and foreign keys, joins, indexes and why a query got slow, transactions, and migrations. An ORM like Prisma (which I used on SkateSpot) or Drizzle is fine, but learn the SQL it generates, because you'll need it the first time something is slow or wrong. On Vercel, Postgres now comes from marketplace providers such as [Neon](https://vercel.com/docs/marketplace-storage) rather than a first-party product.

So why does my portal use Redis? Because its data access is almost entirely "get this client's things by ID," the data set is small, and Redis also handles the jobs it's best at: rate-limit counters and short-lived tokens. The trade-off is real. No joins, no ad-hoc queries, and every "index" (like "all invoices for this client") is a set I maintain myself. If the portal grew into reporting-heavy software, I'd move the core data to Postgres and keep Redis for rate limits and caching.

A good rule: if you can list every way the data will be read, and they're all by key, a key-value store is simple and fast. If you can't, use Postgres.

## Auth and security basics you can't skip

You don't need to be a security engineer. You do need these habits on every project.

**Sessions.** Store the session in an `httpOnly`, `Secure`, `SameSite` cookie so JavaScript on the page can't read it. Sign it (my portal uses HMAC-signed cookies) or store a random session ID server-side. Give it an expiry, and give yourself a way to revoke it.

**Hashing.** Never store passwords or access codes in plain text. Use a slow, salted hash like scrypt, Argon2 or bcrypt, never a plain SHA-256. My portal stores access codes as scrypt hashes.

**Authorization on every request.** Being signed in is not the same as being allowed. Every page, action and file download in my portal checks that the project belongs to the signed-in client, and files are served only through a route that does that check.

> Server actions are public endpoints. The [Next.js docs](https://nextjs.org/docs/app/guides/server-actions) say it directly: hiding a form from unauthenticated users is not a security boundary, so authenticate and authorize inside every action.

**Input validation.** Treat form data, query strings and headers as untrusted. A schema library like Zod checks the shape of the input, but a well-formed ID can still point at someone else's record, so validation and authorization are two separate checks.

**Secrets.** API keys live in environment variables, never in the repo and never behind a `NEXT_PUBLIC_` prefix, which ships them to the browser. Rate-limit your login form, verify webhook signatures, and keep your framework patched. Next.js now pre-announces its [security releases](https://nextjs.org/blog/july-2026-security-release), which makes that easier to plan.

For apps with passwords, OAuth and password resets, I'd reach for a maintained auth library like Auth.js (I used NextAuth.js on SkateSpot) rather than rolling my own. A small private portal with access codes is a reasonable place to build it yourself, as long as you understand each piece above.

## Deploy early and make failures visible

Deploy on day one, not when you're "done." Deployment is where you meet environment variables, build errors, cold starts and DNS, and it's far easier to meet them one at a time.

A few habits that pay off immediately:

- Use preview deployments for every branch, so you test on real infrastructure before production.
- Keep separate keys for development and production, including Stripe test keys. On Vercel, an environment variable change only applies after a redeploy, which catches everyone once.
- Run `stripe listen --forward-to localhost:3000/api/stripe-webhook` with the [Stripe CLI](https://docs.stripe.com/cli/install) to receive real test webhooks on your machine.
- Read your logs. Your host's runtime logs and Stripe's event-delivery list answer most "the payment went through but the invoice says unpaid" questions in minutes.
- Add error tracking, such as Sentry, before real users arrive, so you hear about errors from a dashboard instead of an email.

Observability only has to answer three questions: did it fail, where, and for whom.

## Test at the level where bugs actually live

Chasing 100% coverage on a solo project wastes time. Put tests where mistakes are expensive.

Unit-test pure logic: invoice totals with fractional hours, tax, date math. These tests are fast and catch the bugs that cost money. Test the webhook handler by feeding it sample events, including a duplicate, and checking the invoice ends up paid exactly once. Then write one or two end-to-end tests with Playwright for the flows that must never break, like signing in and paying with Stripe's test card `4242 4242 4242 4242`.

Run the type checker and linter on every push. Between TypeScript, a handful of unit tests and one end-to-end test of the money path, you'll catch most of what matters.

## Show full-stack skill in your portfolio

One real application tells a hiring manager or client more than five tutorial clones. Build something with sign-in, data that belongs to specific users, a third-party integration, and at least one background event like a webhook. A booking tool, a small store in Stripe test mode, or a client portal all work.

Then make the hard parts visible. Deploy it, add a demo account with seeded data, and write a README that explains the architecture, the trade-offs you made (like "Redis instead of Postgres, and why"), and what you'd change at ten times the users. That write-up shows judgment, which is what employers and clients are really hiring.

For the job search itself, share what you build and talk to people doing the work you want. A post explaining how you made a webhook idempotent starts better conversations than a list of technologies on a résumé.

## What to do next

Pick one feature that touches every layer, like "a user pays for something and gets an email," and build it this month on a single stack: Next.js, TypeScript, Postgres, Stripe in test mode, and one host. Deploy it on day one, add authorization checks to every server action, make the webhook idempotent, and write a README about what you learned. Repeat with a harder feature. That's how "full stack" stops being a job title and becomes something you can show.

If you'd rather have a feature like this built for your business than build it yourself, [get in touch](https://felipecantujr.com/get-started).
