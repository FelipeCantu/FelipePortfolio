# Client Portal

A private portal at **felipecantujr.com/portal** where clients follow their project and Felipe runs it from **/portal/admin**.

## What clients get

- **Overview**: a "Waiting on you" list (reviews, requests, unread messages, invoices to pay), progress, balance due and recent activity
- **Project page**: milestone timeline, overall progress, preview/live site links
- **Approvals**: approve a deliverable or request changes with a note
- **Files**: download deliverables; upload their own files (drag and drop, up to 500 MB) or share links (Figma, Drive…)
- **Needed from you**: a checklist of what you need from them (logo, copy, hosting access…)
- **Messages**: one thread per project
- **Invoices**: list, printable or PDF invoice, **Pay now** through Stripe Checkout (card, Apple Pay, Google Pay)
- Sign-in with email and access code, or a one-click link. Sessions last 30 days.

## What you get (/portal/admin)

- Dashboard: clients, active projects, outstanding balance, paid this year, **Needs your attention** (unread messages, change requests, overdue milestones and invoices) and a feed of client activity
- Create a client, which generates an access code, a sign-in link and a ready-to-send text message. A new code can be generated at any time (this signs the client out everywhere).
- Projects from templates (website, web app or redesign, each with 7 milestones and starter requests), or a blank one
- Milestones: start, complete, reopen, reorder, delete
- Upload files or share links, with "needs client approval"; ask for review again after changes
- Invoices with line items (fractional hours are fine): save as a draft, send, mark paid (for cash or Zelle), void, print

## Setup (one time, about 10 minutes)

1. **Database**: Vercel → felipe-portfolio → Storage → *Upstash for Redis* (free) → connect to the project. This sets `KV_REST_API_URL` and `KV_REST_API_TOKEN`.
2. **File storage**: Storage → *Blob* → create a **private** store → connect. This sets `BLOB_READ_WRITE_TOKEN`.
3. **Environment variables** (Settings → Environment Variables):
   | Name | Value |
   |---|---|
   | `PORTAL_SECRET` | a random string of 32 or more characters (`openssl rand -base64 48`) |
   | `ADMIN_SECRET` | already set; it is your admin password |
   | `STRIPE_SECRET_KEY` | already set; turns on **Pay now** |
   | `STRIPE_PORTAL_WEBHOOK_SECRET` | *(recommended)* Stripe → Developers → Webhooks → add `https://felipecantujr.com/api/portal/stripe-webhook`, events `checkout.session.completed` and `checkout.session.async_payment_succeeded` |
   | `RESEND_API_KEY`, `PORTAL_FROM_EMAIL` | *(optional)* email notifications through resend.com, e.g. `Felipe Cantu <portal@felipecantujr.com>` |
   | `NEXT_PUBLIC_BOOKING_URL` | *(optional)* Calendly or Cal.com link for a "Book a call" button |
4. Redeploy, go to `/portal/admin`, sign in with `ADMIN_SECRET` and add your first client.

With Resend set up, these emails go out automatically: invites; to clients for new messages, files ready for review, invoices, completed milestones and status changes to review or complete; to you for client messages, approvals or change requests, uploads and payments.

## Local development

```bash
PORTAL_DEV_MEMORY=1 PORTAL_SECRET=dev-secret-at-least-32-characters-long ADMIN_SECRET=dev npm run dev
```
`PORTAL_DEV_MEMORY=1` keeps data in memory, so it is lost on restart. Uploads still need `BLOB_READ_WRITE_TOKEN` (`vercel env pull`).

## Security notes

- Access codes are stored as scrypt hashes, and sessions are HMAC-signed httpOnly cookies
- Login is rate-limited (10 attempts per 15 minutes per IP; 8 for admin)
- Every page, action and download checks that the project belongs to the signed-in client
- Files are private blobs that are only served through `/api/portal/files/…` after an access check, sandboxed so uploaded HTML or SVG can't run
- Stripe payments are checked against Stripe on return and through the signed webhook

## Code map

```
lib/portal/        kv (Redis), db (data model), session (auth), payments, notify, blob, format, types
app/portal/        client area: login, access link, (client)/ overview · projects · invoices, actions.ts
app/portal/admin/  admin area: login, (app)/ dashboard · clients · projects · invoices, actions.ts
app/api/portal/    upload (Blob tokens), files (downloads), stripe-webhook
components/portal/ shared UI
```
