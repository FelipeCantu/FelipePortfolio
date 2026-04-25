const Stripe = require('stripe');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const adminKey = req.headers['x-admin-key'];
  if (!adminKey || adminKey !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { clientName, clientEmail, appUrl } = req.body;

  try {
    const account = await stripe.accounts.create({
      type: 'express',
      email: clientEmail || undefined,
      business_profile: {
        name: clientName || undefined,
      },
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });

    const baseUrl = appUrl || process.env.APP_URL || 'https://felipecantujr.com';

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${baseUrl}/admin?refresh=${account.id}`,
      return_url: `${baseUrl}/admin?connected=${account.id}`,
      type: 'account_onboarding',
    });

    return res.status(200).json({
      accountId: account.id,
      onboardingUrl: accountLink.url,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
