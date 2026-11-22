---
title: "Give Back Jojo"
excerpt: "A nonprofit platform for mental health awareness and suicide prevention, with community articles, memorial tributes, a merch shop and donations."
---

Give Back Jojo is a full-stack nonprofit platform dedicated to mental health awareness and suicide prevention. It brings community engagement, educational resources and fundraising together in one place, and it is live at [givebackjojo.org](https://givebackjojo.org).

## Community and content

- **Articles:** a rich text article system with anonymous posting, reading time, likes, views and comments.
- **Tributes:** a gallery honoring loved ones, powered by Sanity CMS.
- **Events:** listings with date, location and venue details.
- **Crisis resources:** quick access to mental health hotlines and support information.
- **Notifications:** real-time alerts for content engagement, with customizable preferences.

## Shop and donations

- **Merch shop:** apparel and collectibles, with a cart that persists in localStorage.
- **Checkout:** direct card payments and Stripe Checkout with digital wallet support.
- **Orders:** order history with status tracking and automated email receipts.
- **Donations:** preset tiers from $10 to $5,000 plus custom amounts, and monthly recurring donations that can be cancelled in the app.
- **Payment channels:** Stripe, Venmo and Zelle.

## Accounts

- Sign-in with email and password, Google or Facebook.
- Profile management, saved addresses, a payment wallet, order history and notification settings.

## Stack

- **Frontend:** React 18, React Router v6, Styled Components, Framer Motion and the Context API.
- **Backend:** Firebase Cloud Functions (Node.js 20 with Express).
- **Database:** Cloud Firestore.
- **CMS:** Sanity, with GROQ and Portable Text.
- **Payments:** Stripe PaymentIntents, Checkout Sessions and webhooks.
- **Hosting:** Firebase Hosting.

## Security

Stripe operations run on the server and webhook signatures are verified. CORS is limited to a whitelist, requests are rate limited to 100 per 15 minutes per IP, Firestore access rules guard the data, and security headers (HSTS, X-Frame-Options) go out with every response.
