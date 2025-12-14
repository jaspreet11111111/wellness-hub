# 🚀 Deploying Wellness Hub to Production

## Quick Deployment Guide

I've prepared your code for deployment! Follow these steps:

---

## Step 1: Create GitHub Repository (2 minutes)

### Option A: Using GitHub CLI (if installed)
```bash
cd /Users/jaspreetsingh/Documents/vividautomate-workspace/projects/wellness-hub
gh repo create wellness-hub --public --source=. --remote=origin --push
```

### Option B: Using GitHub Website
1. Go to https://github.com/new
2. Repository name: `wellness-hub`
3. Make it **Public** or **Private** (your choice)
4. **Don't** initialize with README (we already have one)
5. Click **Create repository**
6. Run these commands:
```bash
cd /Users/jaspreetsingh/Documents/vividautomate-workspace/projects/wellness-hub
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/wellness-hub.git
git push -u origin main
```

---

## Step 2: Deploy to Vercel (5 minutes)

### A. Connect to Vercel
1. Go to https://vercel.com
2. Click **"Add New Project"**
3. **Import** your `wellness-hub` repository
4. Click **"Import"**

### B. Configure Project Settings
- **Framework Preset:** Next.js (auto-detected)
- **Root Directory:** ./
- **Build Command:** `npm run build` (default)
- **Output Directory:** `.next` (default)

### C. Add Environment Variables
Click **"Environment Variables"** and add these:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_URL=https://your-project.vercel.app
```

**Where to find these values:**
- Supabase: https://app.supabase.com → Your Project → Settings → API
- Stripe: https://dashboard.stripe.com/apikeys
- NEXT_PUBLIC_URL: Will be provided by Vercel (update after first deploy)

### D. Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `https://wellness-hub-xyz.vercel.app`

---

## Step 3: Update Production URL (1 minute)

After first deployment:
1. Copy your Vercel URL
2. Go to Vercel → Settings → Environment Variables
3. Update `NEXT_PUBLIC_URL` with your actual URL
4. **Redeploy** (Vercel → Deployments → Three dots → Redeploy)

---

## Step 4: Update Stripe Webhook (Optional)

If using Stripe webhooks:
1. Go to https://dashboard.stripe.com/webhooks
2. Add endpoint: `https://your-vercel-url.app/api/webhooks/stripe`
3. Select events: `checkout.session.completed`
4. Copy webhook secret to Vercel env vars

---

## Step 5: Create Admin User (2 minutes)

1. Go to your live site
2. Sign up with your email
3. Go to Supabase → Table Editor → `profiles`
4. Find your user, change `role` from `client` to `admin`
5. Refresh page - you now have admin access!

---

## ✅ Deployment Complete!

Your Wellness Hub is now live at: `https://your-project.vercel.app`

**Test everything:**
- [ ] Sign up works
- [ ] Login works
- [ ] Browse classes works
- [ ] Booking works (purchase credits first!)
- [ ] Admin panel accessible
- [ ] Mobile responsive

---

## 🆘 Troubleshooting

**Build fails?**
- Check all env vars are set correctly
- Ensure no TypeScript errors: `npm run build` locally

**Stripe not working?**
- Verify `NEXT_PUBLIC_URL` matches your Vercel URL
- Check Stripe keys are production keys (not test)

**Database connection issues?**
- Verify Supabase URL and anon key
- Check RLS policies are enabled

---

## 📍 Current Status

✅ Git repository initialized  
✅ Code committed  
⏳ **Next:** Push to GitHub → Deploy to Vercel  

**Your code is ready!** Just follow Steps 1 & 2 above.
