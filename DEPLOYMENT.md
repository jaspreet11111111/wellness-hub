# Deployment Guide - Wellness Hub

## Prerequisites

- Vercel account (free tier works)
- Supabase project (already set up)
- Stripe account (for payments)
- Custom domain (optional)

---

## Step 1: Prepare for Deployment

### 1.1 Environment Variables

Create production environment variables in Vercel:

```bash
# Supabase (Production)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-production-service-role-key

# Stripe (Production - use live keys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_... (optional)

# Application
NEXT_PUBLIC_URL=https://your-domain.com
```

### 1.2 Build Test

```bash
npm run build
```

Fix any build errors before deploying.

---

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Option B: Deploy via GitHub

1. Push code to GitHub repository
2. Go to [Vercel Dashboard](https://vercel.com/new)
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Add environment variables (from Step 1.1)
6. Click "Deploy"

---

## Step 3: Configure Supabase for Production

### 3.1 Update Auth URLs

In Supabase Dashboard → Authentication → URL Configuration:

**Site URL:**
```
https://your-domain.com
```

**Redirect URLs (add all):**
```
https://your-domain.com
https://your-domain.com/auth/callback
https://your-domain.com/dashboard
https://your-domain.com/dashboard/packages/success
```

### 3.2 Run Migrations (if new database)

1. Go to Supabase SQL Editor
2. Run `supabase/migrations/001_initial_schema.sql`
3. Run `supabase/seed.sql` (for sample data)

---

## Step 4: Configure Stripe for Production

### 4.1 Switch to Live Mode

In Stripe Dashboard:
1. Toggle from "Test mode" to "Live mode"
2. Copy **Live** API keys to Vercel env variables
3. Complete Stripe account verification

### 4.2 Set up Webhooks (Optional but Recommended)

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Select events: `checkout.session.completed`
4. Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

---

## Step 5: Custom Domain (Optional)

### In Vercel:

1. Go to Project Settings → Domains
2. Add your domain (e.g., `wellness.yourdomain.com`)
3. Follow DNS configuration instructions

### Update Environment:

```bash
NEXT_PUBLIC_URL=https://wellness.yourdomain.com
```

---

## Step 6: Post-Deployment Checks

### ✅ Checklist

- [ ] Landing page loads
- [ ] User can register
- [ ] User can login
- [ ] Classes display on `/schedule`
- [ ] Booking works (use test credits)
- [ ] Package purchase redirects to Stripe
- [ ] Payment success page works
- [ ] Credits added after payment
- [ ] Dashboard shows bookings
- [ ] Admin panel accessible (for admin users)

### Test User Creation

Create test admin user via Supabase SQL:

```sql
-- Create admin user
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at)
VALUES ('admin@yoursite.com', crypt('your-password', gen_salt('bf')), NOW());

-- Get the user ID
SELECT id FROM auth.users WHERE email = 'admin@yoursite.com';

-- Update profile to admin
UPDATE profiles 
SET role = 'admin', credits = 100 
WHERE id = 'user-id-from-above';
```

---

## Step 7: Monitoring & Maintenance

### Analytics (Optional)

Install Vercel Analytics:
```bash
npm install @vercel/analytics
```

Add to `layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react'

// In return statement
<Analytics />
```

### Error Monitoring

- Vercel automatically captures errors
- Check logs in Vercel Dashboard → Deployments → [deployment] → Logs

### Database Backup

- Supabase handles automatic backups
- Download backups from Supabase Dashboard → Database → Backups

---

## Rollback

If deployment fails:

```bash
# Via CLI
vercel rollback

# Via Dashboard
Vercel Dashboard → Deployments → [previous deployment] → Promote to Production
```

---

## Common Issues

### Build Fails

**Error:** `Module not found`
- **Fix:** Run `npm install` and commit `package-lock.json`

**Error:** Environment variable undefined
- **Fix:** Add missing env vars in Vercel Dashboard

### Auth Redirect Loop

- **Fix:** Add all redirect URLs to Supabase Auth settings

### Stripe Checkout Not Working

- **Fix:** Ensure `NEXT_PUBLIC_URL` matches your production domain

---

## Performance Optimization

### Image Optimization

Already configured via `next/image` component.

### Caching

Vercel handles caching automatically for:
- Static assets
- API routes
- Server components

### Database

- Enable RLS (already done)
- Add indexes on frequently queried fields (already done)
- Use server-side data fetching (already implemented)

---

## Security Checklist

- [x] RLS enabled on all tables
- [x] Service role key in server-side only
- [x] Auth required for protected routes
- [x] HTTPS enforced (Vercel default)
- [x] Environment variables secured
- [ ] Rate limiting (add if needed)
- [ ] CORS configured (if using external APIs)

---

## Estimated Costs

### Free Tier (Good for MVP Launch):
- **Vercel**: Free (Hobby plan)
- **Supabase**: Free (up to 500MB database, 1GB bandwidth)
- **Stripe**: Free (2.9% + $0.30 per transaction)

### Paid (Scale to 1000+ users):
- **Vercel Pro**: $20/month
- **Supabase Pro**: $25/month
- **Stripe**: Same percentage

---

## Next Steps After Deployment

1. Monitor user signups and bookings
2. Collect user feedback
3. Add email notifications (SendGrid/Postmark)
4. Implement analytics
5. A/B test pricing
6. Add more class types
7. Enable waitlist for full classes
8. Build mobile app (React Native)

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Stripe Docs**: https://stripe.com/docs

**Deployment Time**: ~15 minutes
**First deployment to production-ready**: ~1 hour (including testing)
