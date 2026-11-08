/**
 * "Accounts & access": how clients give Felipe access to their services
 * WITHOUT sharing passwords. The client keeps ownership; Felipe gets his own
 * login with limited permissions, and removes himself at handoff.
 *
 * Menu names change over time, so every guide ends with a fallback and a link
 * to the provider's own help page.
 */
import type { IntakeData } from './intake'

export interface AccessService {
  key: string
  name: string
  /** plain-English reason, shown to the client */
  why: string
  /** permission level to pick, in the provider's own words */
  role: string
  steps: string[]
  help?: string
  /** domain-style services can instead be handled by adding DNS records */
  supportsRecords?: boolean
}

export const ACCESS_SERVICES: AccessService[] = [
  {
    key: 'stripe',
    name: 'Stripe (online payments)',
    why: 'So Felipe can connect your website to your payments. Money always goes straight to your bank — he never sees your bank details.',
    role: 'Developer',
    steps: [
      'Log in at dashboard.stripe.com.',
      'Click the gear icon (Settings), then “Team and security”.',
      'Click “Add member” and paste Felipe’s email.',
      'Choose the role “Developer” and send the invite.',
    ],
    help: 'https://support.stripe.com/questions/invite-team-members-or-developers-to-access-your-stripe-account',
  },
  {
    key: 'paypal',
    name: 'PayPal Business',
    why: 'So Felipe can add PayPal checkout to your site without logging in as you.',
    role: 'A limited user who can manage API / developer settings (not money transfers)',
    steps: [
      'Log in to your PayPal Business account.',
      'Open Account Settings, then “Account access” → “Manage users”.',
      'Add Felipe’s email as a new user.',
      'Give access to developer / API settings only — not sending money or withdrawals.',
    ],
    help: 'https://www.paypal.com/us/cshelp/business',
  },
  {
    key: 'square',
    name: 'Square',
    why: 'So Felipe can connect your Square store or payments to your website.',
    role: 'A team member with access to Online / Developer settings',
    steps: [
      'Log in to your Square Dashboard.',
      'Go to “Staff” (or “Team”), then “Team members”, and add Felipe with his email.',
      'Give him a permission set limited to your online store / developer settings.',
    ],
    help: 'https://squareup.com/help/us/en',
  },
  {
    key: 'godaddy',
    name: 'GoDaddy (domain)',
    why: 'Your domain is your web address. Felipe needs to point it at your new website — he won’t be able to buy anything or see your payment info.',
    role: '“Products & Domains” (not “Purchase” or “Admin”)',
    steps: [
      'Log in at godaddy.com and click your name (top right) → “Account Settings”.',
      'Choose “Delegate Access”, then “Invite to Access”.',
      'Enter Felipe’s name and email and pick “Products & Domains”.',
      'Click “Invite”.',
    ],
    help: 'https://www.godaddy.com/help/delegate-access-levels-of-permission-12374',
    supportsRecords: true,
  },
  {
    key: 'namecheap',
    name: 'Namecheap (domain)',
    why: 'Your domain is your web address. Felipe needs to point it at your new website.',
    role: 'Share access to the domain with DNS management',
    steps: [
      'Log in at namecheap.com and open your Profile → “Sharing & Transfer”.',
      'Under “Share Access”, add Felipe’s email.',
      'Pick your domain and allow DNS management, then send.',
    ],
    help: 'https://www.namecheap.com/support/knowledgebase/article.aspx/192/46/how-do-i-share-access-to-my-domain-with-other-users/',
    supportsRecords: true,
  },
  {
    key: 'squarespace-domain',
    name: 'Squarespace Domains (incl. former Google Domains)',
    why: 'Your domain is your web address. Felipe needs to point it at your new website.',
    role: 'A permission that can manage DNS settings',
    steps: [
      'Log in at account.squarespace.com and open “Domains”.',
      'Click your domain, then “Permissions” (or “Domain permissions”).',
      'Invite Felipe’s email with a role that can manage DNS.',
    ],
    help: 'https://support.squarespace.com/hc/en-us',
    supportsRecords: true,
  },
  {
    key: 'domain-other',
    name: 'Domain (other provider)',
    why: 'Your domain is your web address. Felipe needs to point it at your new website.',
    role: 'A “delegate”, “shared access” or “DNS manager” user',
    steps: [
      'Log in where you bought your domain.',
      'Look for “Users”, “Delegate access”, “Account access” or “Share”.',
      'Invite Felipe’s email with permission to manage DNS only.',
    ],
    supportsRecords: true,
  },
  {
    key: 'hosting',
    name: 'Current hosting / website account',
    why: 'So Felipe can see how your current site is set up and move your content over.',
    role: 'A user / collaborator who can manage the website (not billing)',
    steps: [
      'Log in to the company that runs your current site (e.g. Bluehost, Hostinger, WordPress).',
      'Look for “Users”, “Team”, “Collaborators” or “Delegate access”.',
      'Invite Felipe’s email with website access — billing access isn’t needed.',
    ],
  },
  {
    key: 'squarespace-site',
    name: 'Squarespace website',
    why: 'So Felipe can work on your current Squarespace site.',
    role: 'Website Editor (or Administrator if he’s rebuilding it)',
    steps: [
      'In your Squarespace site, open Settings → “Permissions & ownership”.',
      'Click “Invite contributor” and enter Felipe’s email.',
      'Pick the permission Felipe asked for and send.',
    ],
    help: 'https://support.squarespace.com/hc/en-us',
  },
  {
    key: 'wix',
    name: 'Wix website',
    why: 'So Felipe can work on your current Wix site.',
    role: 'Website Manager (or Admin if he’s rebuilding it)',
    steps: [
      'Open your site dashboard and go to Settings → “Roles & Permissions”.',
      'Click “Invite People” and enter Felipe’s email.',
      'Choose the role Felipe asked for and send.',
    ],
    help: 'https://support.wix.com/en',
  },
  {
    key: 'shopify',
    name: 'Shopify store',
    why: 'So Felipe can work on your store as a collaborator — Shopify’s built-in way for designers and developers, with no extra staff seat.',
    role: 'Collaborator (approve only the permissions he needs)',
    steps: [
      'In Shopify admin, go to Settings → “Users” → “Security”.',
      'Find “Collaborators”, copy your 4-digit collaborator request code and send it to Felipe in a message.',
      'Felipe sends a request from his Shopify Partner account using that code.',
      'You’ll get an email from Shopify — review the permissions and click “Accept”. No password needed.',
    ],
    help: 'https://help.shopify.com/en/manual/your-account/staff-accounts/collaborator-accounts',
  },
  {
    key: 'google-analytics',
    name: 'Google Analytics',
    why: 'So Felipe can connect your visitor stats to the new site and check they’re working.',
    role: 'Editor',
    steps: [
      'Open analytics.google.com and click “Admin” (gear, bottom left).',
      'Under your property, open “Property access management”.',
      'Click “+”, then “Add users”, enter Felipe’s email and pick “Editor”.',
    ],
    help: 'https://support.google.com/analytics/answer/9305788',
  },
  {
    key: 'search-console',
    name: 'Google Search Console',
    why: 'So Felipe can tell Google about your new site and fix anything that hurts your search ranking.',
    role: 'Full user (not Owner)',
    steps: [
      'Open search.google.com/search-console and pick your site.',
      'Go to Settings → “Users and permissions”.',
      'Click “Add user”, enter Felipe’s email and pick “Full”.',
    ],
    help: 'https://support.google.com/webmasters/answer/7687615',
  },
  {
    key: 'supabase',
    name: 'Supabase (database)',
    why: 'So Felipe can set up and manage your app’s database while you stay the owner.',
    role: 'Developer',
    steps: [
      'Log in at supabase.com and open your organization’s Settings → “Team”.',
      'Click “Invite”, enter Felipe’s email and choose “Developer”.',
    ],
    help: 'https://supabase.com/docs/guides/platform/access-control',
  },
  {
    key: 'firebase',
    name: 'Firebase / Google Cloud',
    why: 'So Felipe can work on your app’s backend while you stay the owner.',
    role: 'Editor',
    steps: [
      'Open console.firebase.google.com and select your project.',
      'Click the gear → “Users and permissions” → “Add member”.',
      'Enter Felipe’s email and choose “Editor”.',
    ],
    help: 'https://firebase.google.com/docs/projects/iam/overview',
  },
  {
    key: 'github',
    name: 'GitHub (code)',
    why: 'So Felipe can work on your existing code. You keep ownership of it.',
    role: 'Write (collaborator)',
    steps: [
      'Open the repository on github.com and go to Settings → “Collaborators”.',
      'Click “Add people”, search Felipe’s GitHub username or email, and confirm.',
    ],
    help: 'https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository',
  },
  {
    key: 'mailchimp',
    name: 'Mailchimp (email list)',
    why: 'So Felipe can connect your website’s sign-up form to your email list.',
    role: 'Manager (or Author)',
    steps: [
      'In Mailchimp, click your profile → “Account & billing” → “Settings” → “Users”.',
      'Click “Invite a user”, enter Felipe’s email and choose “Manager”.',
    ],
    help: 'https://mailchimp.com/help/manage-user-levels-in-your-account/',
  },
  {
    key: 'app-store-connect',
    name: 'Apple App Store Connect',
    why: 'So Felipe can upload test versions of your iPhone app and submit it to the App Store, while the app stays in your name.',
    role: 'App Manager (or Developer)',
    steps: [
      'Log in at appstoreconnect.apple.com with your Apple Developer account.',
      'Click “Users and Access”, then the “+” button.',
      'Enter Felipe’s name and email, and choose the role “App Manager”.',
      'Click “Invite”. Apple emails him to accept.',
    ],
    help: 'https://developer.apple.com/help/app-store-connect/manage-your-team/add-and-edit-users',
  },
  {
    key: 'google-play',
    name: 'Google Play Console',
    why: 'So Felipe can upload your Android app and manage its store listing, while the app stays in your name.',
    role: 'Release apps + manage store presence (not financial data)',
    steps: [
      'Open play.google.com/console and go to “Users and permissions”.',
      'Click “Invite new users” and enter Felipe’s email.',
      'Under permissions, allow releasing apps and managing the store listing. Leave financial data off.',
      'Click “Invite user”.',
    ],
    help: 'https://support.google.com/googleplay/android-developer/answer/9844686',
  },
  {
    key: 'aws',
    name: 'Amazon Web Services (AWS)',
    why: 'So Felipe can set up and look after the servers your app runs on. You keep the main (root) account and the billing.',
    role: 'PowerUserAccess (everything except billing and user management)',
    steps: [
      'Sign in to the AWS console and open “IAM Identity Center”.',
      'Go to “Users” → “Add user”, enter Felipe’s email, and choose “Send an email to this user with password setup instructions”.',
      'Under “AWS accounts”, assign him to your account with the “PowerUserAccess” permission set.',
      'He sets his own password from the email — you never share yours.',
    ],
    help: 'https://docs.aws.amazon.com/singlesignon/latest/userguide/addusers.html',
  },
  {
    key: 'google-cloud',
    name: 'Google Cloud',
    why: 'So Felipe can set up and manage the cloud services your app uses. You stay the owner and keep billing.',
    role: 'Editor',
    steps: [
      'Open console.cloud.google.com and pick your project at the top.',
      'Go to “IAM & Admin” → “IAM” and click “Grant access”.',
      'Enter Felipe’s email, choose the role “Editor”, and save.',
    ],
    help: 'https://cloud.google.com/iam/docs/granting-changing-revoking-access',
  },
  {
    key: 'azure',
    name: 'Microsoft Azure',
    why: 'So Felipe can manage the Azure services your app uses. You stay the owner and keep billing.',
    role: 'Contributor',
    steps: [
      'Sign in at portal.azure.com and open your subscription (or resource group).',
      'Click “Access control (IAM)” → “Add” → “Add role assignment”.',
      'Choose “Contributor”, then add Felipe’s email as a member (Azure sends him a guest invite).',
    ],
    help: 'https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal',
  },
  {
    key: 'vercel',
    name: 'Vercel (hosting)',
    why: 'So Felipe can deploy and manage your site on your own Vercel account.',
    role: 'Developer (or Member)',
    steps: [
      'Log in at vercel.com and open your team.',
      'Go to “Settings” → “Members”.',
      'Enter Felipe’s email, choose the role, and click “Invite”.',
      'Note: inviting members needs a Pro team. If you’re on the free plan, tell Felipe and he’ll suggest another way.',
    ],
    help: 'https://vercel.com/docs/rbac/managing-team-members',
  },
  {
    key: 'netlify',
    name: 'Netlify (hosting)',
    why: 'So Felipe can deploy and manage your site on your own Netlify account.',
    role: 'Developer',
    steps: [
      'Log in at app.netlify.com and open “Team settings” → “Members”.',
      'Click “Invite members”, enter Felipe’s email and pick “Developer”.',
    ],
    help: 'https://docs.netlify.com/accounts-and-billing/team-management/manage-team-members/',
  },
  {
    key: 'wordpress',
    name: 'WordPress / WooCommerce site',
    why: 'So Felipe can work on your current WordPress site without using your login.',
    role: 'Administrator (you can remove him after launch)',
    steps: [
      'Log in to your WordPress dashboard (yoursite.com/wp-admin).',
      'Go to “Users” → “Add New User”.',
      'Enter Felipe’s email and username, tick “Send the new user an email about their account”, choose “Administrator”, and click “Add New User”.',
      'He sets his own password from the email.',
    ],
    help: 'https://wordpress.org/documentation/article/users-add-new-screen/',
  },
  {
    key: 'code-other',
    name: 'GitLab / Bitbucket (code)',
    why: 'So Felipe can work on your existing code. You keep ownership of it.',
    role: 'Developer (GitLab) or Write (Bitbucket)',
    steps: [
      'Open the project (repository) and go to its member or user settings (GitLab: “Manage” → “Members”; Bitbucket: “Repository settings” → “Repository permissions”).',
      'Invite Felipe’s email with “Developer” or “Write” access.',
    ],
  },
  {
    key: 'openai',
    name: 'OpenAI (ChatGPT API)',
    why: 'So Felipe can connect AI features to your site using your own OpenAI account. Usage is billed to you directly, and he never needs your card.',
    role: 'Reader or Member (not Owner)',
    steps: [
      'Log in at platform.openai.com and open Settings (gear icon).',
      'Go to “Members” (or “People”) and click “Invite”.',
      'Enter Felipe’s email and choose a non-owner role.',
    ],
    help: 'https://help.openai.com/en/articles/4936812',
  },
  {
    key: 'anthropic',
    name: 'Anthropic (Claude API)',
    why: 'So Felipe can connect AI features to your site using your own Claude API account. Usage is billed to you directly.',
    role: 'Developer',
    steps: [
      'Log in at console.anthropic.com and open Settings → “Members”.',
      'Click “Invite”, enter Felipe’s email and choose “Developer”.',
    ],
    help: 'https://support.claude.com/en/articles/13443764-invite-members-to-the-claude-console',
  },
]

export const ACCESS_BY_KEY = Object.fromEntries(ACCESS_SERVICES.map((s) => [s.key, s]))

export const CUSTOM_STEPS = [
  'Log in to the service.',
  'Look for “Users”, “Team”, “Members”, “Collaborators” or “Delegate access” in its settings.',
  'Invite Felipe’s email with the lowest permission that still lets him do the work (not billing or owner).',
]

/** Services worth asking for, based on the Get Started answers. */
export function suggestAccess(d: IntakeData): string[] {
  const keys: string[] = []
  const f = (x: string) => d.features.includes(x)
  const has = (x: string) => d.assets.includes(x)
  const t = d.projectType
  if (!['design', 'api', 'devops', 'fix', 'mobile', 'ai'].includes(t) || has('Domain name')) keys.push('domain-other')
  if (f('Payment Integration') || f('Subscriptions & Billing') || t === 'ecommerce' || t === 'saas') keys.push('stripe')
  if (has('Hosting') || has('An existing website') || d.currentWebsite || t === 'care') keys.push('hosting')
  if (has('Existing app or code') || t === 'rebuild' || t === 'fix') keys.push('github')
  if (has('Cloud account (AWS, Google Cloud, Azure)') || t === 'devops') keys.push('aws')
  if (t === 'mobile') keys.push('app-store-connect', 'google-play')
  if (t === 'ai' || f('AI Features')) keys.push('openai')
  if (f('Analytics') || f('SEO Optimization')) keys.push('google-analytics')
  if (f('SEO Optimization')) keys.push('search-console')
  return keys
}

/** "A 1.2.3.4" / "CNAME www cname.example.com" per line → records */
export function parseRecords(text: string) {
  return text
    .split('\n')
    .map((l) => l.trim().split(/\s+/))
    .filter((p) => p.length >= 3)
    .map(([type, name, ...rest]) => ({ type: type.toUpperCase().slice(0, 10), name: name.slice(0, 120), value: rest.join(' ').slice(0, 500) }))
    .slice(0, 10)
}

export const DEFAULT_ACCESS_EMAIL = 'cantujr.felipe@gmail.com'

export const ACCESS_STATUS = {
  todo: { label: 'To do', tone: 'warning' },
  invited: { label: 'Invite sent', tone: 'accent' },
  confirmed: { label: 'Access confirmed', tone: 'success' },
  removed: { label: 'Felipe’s access removed', tone: 'muted' },
} as const
