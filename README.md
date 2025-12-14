# Wellness Hub 🧘‍♀️

> **A premium health & wellness platform for yoga instructors and studios**

A full-stack wellness booking platform built with Next.js 14, Supabase, and Stripe. Features include class scheduling, online booking, payment processing, and client management (CRM).

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8)

---

## ✨ Features Completed

### **Public Website** ✅
- Beautiful landing page with glassmorphism design
- Class showcase with categories (Hatha, Vinyasa, Yin, Power, Meditation)
- Instructor bio and credentials
- Mobile-responsive navigation
- SEO optimized

### **Authentication** ✅
- Email/password login and registration
- Email verification flow
- Password reset functionality
- Supabase Auth integration
- Secure session management

### **Class Scheduling** ✅
- Public schedule view with all upcoming classes
- Real-time availability (spots remaining)
- Date/time display
- Class capacity management

### **Client Dashboard** ✅
- Overview with stats (credits, upcoming classes, attendance)
- Quick action cards

---

## 🛠️ Tech Stack

**Frontend:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Google Fonts (Inter & Outfit)  
**Backend:** Supabase (PostgreSQL + Auth + RLS)  
**Payments:** Stripe (ready to integrate)  
**Deployment:** Vercel

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase Database

**Run Migrations:**
1. Go to [Supabase Dashboard](https://app.supabase.com/project/lcuzoemvytnsydjzcqpz)
2. Click **SQL Editor** → **New Query**
3. Copy `/supabase/migrations/001_initial_schema.sql` → Paste → **Run**
4. Copy `/supabase/seed.sql` → Paste → **Run** (for sample data)

### 3. Start Development Server
```bash
npm run dev
```

Visit http://localhost:3001

### 4. Test Features
- Landing page at `/`
- Register at `/auth/register`
- Login at `/auth/login`
- Schedule at `/schedule`
- Dashboard at `/dashboard`

---

## 📂 Key Files

```
src/
├── app/
│   ├── actions/          # Server actions (auth, classes)
│   ├── auth/             # Login, register, reset pages
│   ├── dashboard/        # Client dashboard
│   ├── schedule/         # Public class schedule
│   └── page.tsx          # Landing page
├── components/
│   ├── landing/          # Hero, about, classes showcase
│   └── ui/               # Navbar, footer
└── lib/
    ├── supabase/         # Database clients & types
    └── utils.ts          # Utilities
```

---

## 🗄️ Database Schema

**Tables:** `profiles`, `class_types`, `class_sessions`, `bookings`, `payments`, `packages`  
**Security:** Row-Level Security (RLS) enabled on all tables  
**Features:** Auto-booking capacity management, profile creation on signup

---

## 🎨 Design

**Colors:** Sage Green, Earth Tone, Lavender, Cream  
**Typography:** Outfit (headings), Inter (body)  
**Effects:** Glassmorphism, gradients, smooth animations  
**Responsive:** Mobile-first design

---

## 🚀 DeployUsing Vercel

1. Push to GitHub
2. Import in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

**Environment Variables:**
```
NEXT_PUBLIC_SUPABASE_URL=https://lcuzoemvytnsydjzcqpz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_URL=https://your-domain.com
```

---

## 📚 Documentation

See `/docs` for complete planning documentation:
- Project Brief
- Product Requirements (PRD)
- Frontend Spec
- System Architecture

---

## 🔜 Next Steps

To complete the MVP:
1. ✅ Landing page
2. ✅ Authentication
3. ✅ Schedule view
4. ✅ Basic dashboard
5. 🔜 **Booking flow** (book class, cancel, manage)
6. 🔜 **Stripe integration** (packages, checkout)
7. 🔜 **Admin dashboard** (schedule management, CRM)

---

**Project Status:** 70% Complete  
**Framework:** Self-Annealing BMAD v1.0  
**Built with ❤️ for the wellness community**
