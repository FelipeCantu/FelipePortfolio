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
  const { accountId, appUrl } = req.body;

  if (!accountId) {
    return res.status(400).json({ error: 'accountId is required' });
  }

  try {
    const baseUrl = appUrl || process.env.APP_URL || 'https://felipecantujr.com';

    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${baseUrl}/admin?refresh=${accountId}`,
      return_url: `${baseUrl}/admin?connected=${accountId}`,
      type: 'account_onboarding',
    });

    return res.status(200).json({ onboardingUrl: accountLink.url });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
