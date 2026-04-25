const Stripe = require('stripe');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const adminKey = req.headers['x-admin-key'];
  if (!adminKey || adminKey !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const accounts = await stripe.accounts.list({ limit: 100 });

    const enriched = await Promise.all(
      accounts.data.map(async (account) => {
        return {
          id: account.id,
          name: account.business_profile?.name || account.settings?.dashboard?.display_name || null,
          email: account.email,
          chargesEnabled: account.charges_enabled,
          payoutsEnabled: account.payouts_enabled,
          detailsSubmitted: account.details_submitted,
          created: account.created,
          country: account.country,
        };
      })
    );

    return res.status(200).json({ accounts: enriched });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
