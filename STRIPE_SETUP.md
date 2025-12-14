# Stripe Integration Setup

## Get Stripe API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)

## Add to Environment Variables

Edit `.env.local` and add:

```bash
NEXT_PUBLIC_STR IPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

## Test the Payment Flow

1. Restart the dev server: `npm run dev`
2. Login as demo@wellness.com
3. Go to `/dashboard/packages`
4. Click "Purchase Package"
5. Use Stripe test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any ZIP code

## What Happens

1. User clicks "Purchase Package"
2. Redirected to Stripe Checkout
3. After payment, redirected to success page
4. Credits automatically added to user profile
5. Payment recorded in database

## Production Setup

For production:
1. Switch to live API keys (starts with `pk_live_` and `sk_live_`)
2. Complete Stripe account verification
3. Set up webhook endpoint for payment events (optional but recommended)

## Note

The integration is fully functional but requires Stripe test keys to work. Without them, the checkout button will show an error.
