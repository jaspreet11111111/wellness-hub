# Product Requirements Document (PRD)
# Wellness Hub - Health & Wellness Platform

**Version:** 1.0  
**Created:** 2025-12-14  
**Product Manager:** AI Agent (Self-Annealing BMAD)  
**Status:** Draft for Review

---

## Product Vision

Build a comprehensive, all-in-one platform that empowers health and wellness instructors to manage their business online while providing clients with a seamless booking and payment experience. The platform should feel professional, calming, and effortless to use.

**Core Value Proposition:**
> "From first visit to loyal client - all in one beautiful platform"

---

## User Personas

### Persona 1: **Sarah - The Wellness Instructor** (Primary User)

**Demographics:**
- Age: 32
- Role: Certified Yoga Instructor
- Experience: 5 years teaching, 2 years as independent instructor
- Location: Urban area, teaches both online and in-person
- Tech comfort: Moderate (uses Instagram, email, basic tools)

**Goals:**
- Spend more time teaching, less time on admin work
- Grow client base through professional online presence
- Track client progress and preferences
- Ensure reliable payment processing
- Understand business metrics (revenue, popular classes)

**Pain Points:**
- Currently juggling Instagram DMs, emails, and manual spreadsheets
- Loses bookings due to slow manual confirmation
- Payment tracking is chaotic (Venmo, cash, checks)
- No central view of client information
- Can't easily see which classes are most popular

**User Story:** "As a wellness instructor, I want a single platform where I can manage my schedule, bookings, payments, and client relationships so I can focus on teaching instead of administration."

---

### Persona 2: **Michael - The Committed Client** (Secondary User)

**Demographics:**
- Age: 38
- Occupation: Software Engineer
- Lifestyle: Health-conscious, busy professional
- Tech comfort: High
- Motivation: Stress relief, fitness, wellness

**Goals:**
- Easily book classes that fit his schedule
- Manage bookings from mobile device
- Purchase class packages for better value
- Track attendance and progress
- Quick, secure payments

**Pain Points:**
- Current booking process requires texting instructor
- Unclear on class availability
- No way to view past classes or track progress
- Multiple apps for different instructors

**User Story:** "As a client, I want to browse available classes, book instantly, and manage everything from my phone so I can maintain my wellness routine without friction."

---

## Product Epics

### Epic 1: Public Website & Brand Presence

**Business Value:** First impression and trust-building, SEO, client acquisition

#### User Stories:

**STORY-1.1: Hero Landing Page**
- **As a** new visitor
- **I want to** see an attractive landing page with clear information about the instructor and services
- **So that** I can quickly understand the value and decide if I want to book

**Acceptance Criteria:**
- [ ] Hero section with compelling headline and instructor photo
- [ ] Clear CTA (e.g., "Book Your First Class")
- [ ] Trust signals (certifications, years of experience)
- [ ] Mobile-responsive design
- [ ] Page loads in \<2 seconds

---

**STORY-1.2: About the Instructor**
- **As a** potential client
- **I want to** learn about the instructor's background, style, and qualifications
- **So that** I feel confident booking with them

**Acceptance Criteria:**
- [ ] Instructor bio with photo
- [ ] Certifications and credentials
- [ ] Teaching philosophy
- [ ] Optional: video introduction
- [ ] Social media links

---

**STORY-1.3: Class Offerings Display**
- **As a** visitor
- **I want to** see all available class types with descriptions
- **So that** I can find classes that match my interests and skill level

**Acceptance Criteria:**
- [ ] List of class types (e.g., Hatha Yoga, Vinyasa Flow, Private Sessions)
- [ ] Class descriptions, duration, and difficulty level
- [ ] Pricing for each class type
- [ ] Visual cards/grid layout
- [ ] Filter by type or level (optional for MVP)

---

**STORY-1.4: Testimonials & Social Proof**
- **As a** potential client
- **I want to** see testimonials from other clients
- **So that** I feel confident this is a quality service

**Acceptance Criteria:**
- [ ] Display 3-5 testimonials
- [ ] Include client name and photo (optional)
- [ ] Star rating display
- [ ] Responsive carousel or grid

---

**STORY-1.5: Contact Form**
- **As a** visitor
- **I want to** easily contact the instructor with questions
- **So that** I can get answers before booking

**Acceptance Criteria:**
- [ ] Contact form with name, email, message fields
- [ ] Form validation
- [ ] Email notification to instructor
- [ ] Success confirmation message
- [ ] Spam protection (reCAPTCHA optional)

---

### Epic 2: Authentication & User Management

**Business Value:** Secure user accounts, personalized experience, data protection

#### User Stories:

**STORY-2.1: User Registration**
- **As a** new user
- **I want to** create an account with email and password
- **So that** I can book classes and manage my bookings

**Acceptance Criteria:**
- [ ] Registration form (email, password, name)
- [ ] Password strength validation
- [ ] Email verification sent
- [ ] User record created in database
- [ ] Redirect to dashboard after registration
- [ ] Error handling for duplicate emails

---

**STORY-2.2: User Login**
- **As a** registered user
- **I want to** log in with my credentials
- **So that** I can access my bookings and profile

**Acceptance Criteria:**
- [ ] Login form (email, password)
- [ ] Authentication with Supabase Auth
- [ ] Remember me option
- [ ] Session management
- [ ] Redirect to dashboard on success
- [ ] Error messages for invalid credentials

---

**STORY-2.3: Password Reset**
- **As a** user who forgot password
- **I want to** reset my password via email
- **So that** I can regain access to my account

**Acceptance Criteria:**
- [ ] "Forgot Password" link on login page
- [ ] Email input for reset request
- [ ] Reset link sent via email
- [ ] Secure token-based reset flow
- [ ] New password form with validation
- [ ] Success message and auto-login

---

**STORY-2.4: Profile Management**
- **As a** logged-in user
- **I want to** view and edit my profile information
- **So that** I can keep my details up to date

**Acceptance Criteria:**
- [ ] Display current profile (name, email, phone)
- [ ] Edit form for profile fields
- [ ] Save changes with validation
- [ ] Success/error feedback
- [ ] Optional: profile photo upload

---

### Epic 3: Class Schedule & Availability

**Business Value:** Core platform functionality, real-time accuracy, reduces admin overhead

#### User Stories:

**STORY-3.1: Public Class Schedule Display**
- **As a** visitor or logged-in user
- **I want to** see upcoming classes with dates, times, and availability
- **So that** I can decide which classes to attend

**Acceptance Criteria:**
- [ ] Calendar or list view of upcoming classes
- [ ] Show class name, date, time, duration
- [ ] Display spots available (e.g., "5 spots left")
- [ ] Visual indicators for fully booked classes
- [ ] Filter by date range
- [ ] Mobile-responsive design

---

**STORY-3.2: Admin - Create Class Schedule**
- **As an** admin/instructor
- **I want to** create new class sessions with date, time, and capacity
- **So that** clients can book them

**Acceptance Criteria:**
- [ ] Form to create new class session
- [ ] Fields: class type, date, time, duration, max capacity, location
- [ ] Optional: recurring class creation (weekly)
- [ ] Validation for conflicts
- [ ] Save to database
- [ ] Immediate visibility on public schedule

---

**STORY-3.3: Admin - Edit/Cancel Classes**
- **As an** admin
- **I want to** edit or cancel existing classes
- **So that** I can manage schedule changes

**Acceptance Criteria:**
- [ ] Edit class details (time, capacity, etc.)
- [ ] Cancel class with reason
- [ ] Auto-notify booked clients of cancellation
- [ ] Refund handling for cancelled classes
- [ ] Prevent editing past classes

---

### Epic 4: Booking System

**Business Value:** Revenue generation, automated booking, reduced manual work

#### User Stories:

**STORY-4.1: Book a Class**
- **As a** logged-in user
- **I want to** book an available class
- **So that** I can reserve my spot

**Acceptance Criteria:**
- [ ] "Book Now" button on available classes
- [ ] Check user has credits/payment method
- [ ] Deduct credit or prompt for payment
- [ ] Create booking record in database
- [ ] Decrease available spots by 1
- [ ] Send confirmation email
- [ ] Show booking in user dashboard

---

**STORY-4.2: View My Bookings**
- **As a** logged-in user
- **I want to** see all my upcoming and past bookings
- **So that** I can track my class attendance

**Acceptance Criteria:**
- [ ] Separate tabs: Upcoming, Past
- [ ] Display class name, date, time, location
- [ ] Status indicator (confirmed, cancelled)
- [ ] Option to cancel upcoming bookings
- [ ] Pagination for past bookings

---

**STORY-4.3: Cancel a Booking**
- **As a** logged-in user
- **I want to** cancel my booking up to 24 hours before class
- **So that** I can get my credit back if plans change

**Acceptance Criteria:**
- [ ] "Cancel Booking" button on upcoming bookings
- [ ] Verify cancellation is \>24h before class
- [ ] Confirmation modal
- [ ] Update booking status to "cancelled"
- [ ] Refund credit or issue credit for future use
- [ ] Increase class capacity by 1
- [ ] Send cancellation confirmation email

---

**STORY-4.4: Booking Conflicts Prevention**
- **As the** system
- **I want to** prevent double-bookings and race conditions
- **So that** class capacity is never exceeded

**Acceptance Criteria:**
- [ ] Implement optimistic locking or transaction
- [ ] Check capacity before confirming booking
- [ ] Handle simultaneous booking attempts
- [ ] Show "Class Full" error if capacity reached
- [ ] Log conflicts for monitoring

---

### Epic 5: Payment Processing

**Business Value:** Revenue collection, automated invoicing, financial tracking

#### User Stories:

**STORY-5.1: Stripe Integration Setup**
- **As the** system
- **I want to** integrate Stripe for secure payment processing
- **So that** clients can pay for classes online

**Acceptance Criteria:**
- [ ] Stripe account connected
- [ ] Stripe SDK integrated (frontend + backend)
- [ ] Test mode vs production mode configuration
- [ ] Webhook endpoint for payment confirmations
- [ ] PCI compliance maintained (Stripe handles sensitive data)

---

**STORY-5.2: Single Class Payment**
- **As a** user
- **I want to** pay for a single class when booking
- **So that** I can attend without prior credits

**Acceptance Criteria:**
- [ ] Payment flow triggered on booking
- [ ] Stripe Checkout integration
- [ ] Display class price
- [ ] Secure payment form (Stripe Elements)
- [ ] Payment success → booking confirmed
- [ ] Payment failure → booking not created, error shown
- [ ] Receipt sent via email

---

**STORY-5.3: Class Package Purchase**
- **As a** user
- **I want to** buy a package of classes (e.g., 5-pack, 10-pack) at a discounted rate
- **So that** I can save money and attend multiple classes

**Acceptance Criteria:**
- [ ] Display available packages with prices
- [ ] "Buy Package" flow
- [ ] Stripe payment integration
- [ ] On success, add credits to user account
- [ ] Display remaining credits in user dashboard
- [ ] Deduct 1 credit per booking
- [ ] Package purchase history

---

**STORY-5.4: Payment History & Receipts**
- **As a** logged-in user
- **I want to** view my payment history and download receipts
- **So that** I can track my expenses

**Acceptance Criteria:**
- [ ] Payment history page
- [ ] List all transactions with date, amount, description
- [ ] Download receipt button (PDF or link)
- [ ] Filter by date range
- [ ] Mobile-responsive table

---

### Epic 6: Client Dashboard

**Business Value:** User retention, self-service, improved UX

#### User Stories:

**STORY-6.1: Dashboard Overview**
- **As a** logged-in client
- **I want to** see a dashboard with my key information
- **So that** I can quickly access what I need

**Acceptance Criteria:**
- [ ] Welcome message with user name
- [ ] Quick stats: upcoming classes, remaining credits
- [ ] Next class card with countdown
- [ ] Quick action buttons (Book Class, Buy Package)
- [ ] Responsive design

---

**STORY-6.2: My Class History**
- **As a** client
- **I want to** see a history of all classes I've attended
- **So that** I can track my progress

**Acceptance Criteria:**
- [ ] List view of past classes
- [ ] Show class name, date, instructor notes (if any)
- [ ] Total classes attended stat
- [ ] Pagination for long history

---

### Epic 7: Admin/CRM Dashboard

**Business Value:** Business insights, client management, operational efficiency

#### User Stories:

**STORY-7.1: Admin Authentication & Authorization**
- **As the** system
- **I want to** restrict admin dashboard access to authorized users
- **So that** client data is protected

**Acceptance Criteria:**
- [ ] Admin role in database
- [ ] Check user role on dashboard access
- [ ] Redirect non-admins to client dashboard
- [ ] Secure API endpoints (admin-only)

---

**STORY-7.2: Bookings Management View**
- **As an** admin
- **I want to** see all current and upcoming bookings
- **So that** I can manage attendance and capacity

**Acceptance Criteria:**
- [ ] Table view of all bookings
- [ ] Filter by date, class, status
- [ ] Show client name, class, date, payment status
- [ ] Search by client name
- [ ] Export to CSV
- [ ] Mobile-responsive table

---

**STORY-7.3: Client Management (CRM)**
- **As an** admin
- **I want to** view a list of all clients with key information
- **So that** I can understand and manage my client base

**Acceptance Criteria:**
- [ ] Client list with name, email, join date
- [ ] Show total classes attended
- [ ] Show remaining credits
- [ ] Click to view detailed client profile
- [ ] Search and filter clients
- [ ] Export client list

---

**STORY-7.4: Client Detail View**
- **As an** admin
- **I want to** view a single client's complete profile and history
- **So that** I can provide personalized service

**Acceptance Criteria:**
- [ ] Client info (name, email, phone, join date)
- [ ] Booking history (all classes attended)
- [ ] Payment history
- [ ] Remaining credits
- [ ] Optional: admin notes field
- [ ] Quick actions (send email, add credits)

---

**STORY-7.5: Business Analytics Dashboard**
- **As an** admin
- **I want to** see key business metrics
- **So that** I can make data-driven decisions

**Acceptance Criteria:**
- [ ] Total revenue (this month, all time)
- [ ] Total bookings (this month, all time)
- [ ] Active clients count
- [ ] Most popular classes
- [ ] Revenue chart (monthly trend)
- [ ] Booking chart (monthly trend)
- [ ] Real-time updates

---

**STORY-7.6: Payment Tracking**
- **As an** admin
- **I want to** see all payments received
- **So that** I can track revenue and reconcile with Stripe

**Acceptance Criteria:**
- [ ] Payment log with all transactions
- [ ] Show date, client, amount, type (single/package)
- [ ] Filter by date range
- [ ] Total revenue calculation
- [ ] Link to Stripe dashboard
- [ ] Export to CSV for accounting

---

## Technical Architecture Overview

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **UI Library:** shadcn/ui components
- **Styling:** Tailwind CSS
- **State Management:** TanStack Query + Zustand
- **Forms:** React Hook Form + Zod validation

### Backend
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **API:** Next.js Server Actions
- **Storage:** Supabase Storage (for images)
- **Real-time:** Supabase Realtime (for live booking updates)

### Third-Party Integrations
- **Payments:** Stripe (Checkout + SDK)
- **Emails:** Supabase Auth emails + custom transactional emails
- **Hosting:** Vercel (frontend + serverless functions)

### Security
- Row-level security (RLS) in Supabase
- CORS policies
- Rate limiting on API endpoints
- Input validation (client + server)
- Secure payment handling via Stripe

---

## Database Schema (High-Level)

### Core Tables

**users** (managed by Supabase Auth)
- id (uuid, primary key)
- email (string, unique)
- role (enum: client, admin)
- created_at (timestamp)

**profiles**
- id (uuid, foreign key to users)
- full_name (string)
- phone (string, optional)
- profile_image_url (string, optional)
- credits (integer, default 0)
- created_at (timestamp)

**class_types**
- id (uuid, primary key)
- name (string, e.g., "Hatha Yoga")
- description (text)
- duration (integer, minutes)
- price (decimal)
- difficulty_level (enum: beginner, intermediate, advanced)
- image_url (string, optional)

**class_sessions**
- id (uuid, primary key)
- class_type_id (foreign key)
- date (date)
- time (time)
- duration (integer, minutes)
- max_capacity (integer)
- booked_count (integer, default 0)
- location (string)
- status (enum: scheduled, cancelled)
- created_at (timestamp)

**bookings**
- id (uuid, primary key)
- user_id (foreign key)
- class_session_id (foreign key)
- status (enum: confirmed, cancelled)
- payment_id (foreign key, optional)
- created_at (timestamp)
- cancelled_at (timestamp, optional)

**payments**
- id (uuid, primary key)
- user_id (foreign key)
- stripe_payment_id (string)
- amount (decimal)
- currency (string, default USD)
- type (enum: single_class, package)
- package_credits (integer, optional)
- status (enum: pending, succeeded, failed)
- created_at (timestamp)

**packages**
- id (uuid, primary key)
- name (string, e.g., "5-Class Pack")
- credits (integer)
- price (decimal)
- description (text, optional)
- active (boolean)

---

## Release Plan

### MVP (v1.0) - Week 4
**Must-Have Features:**
- Public website with class schedule
- User authentication
- Booking system
- Single payment and package purchases
- Basic client dashboard
- Basic admin dashboard
- Email notifications

**Success Criteria:**
- All acceptance criteria in epics 1-7 met
- Mobile-responsive
- Payment processing functional
- \>95% uptime during beta testing

### v1.1 (Post-MVP) - Week 6-8
- Recurring class creation (weekly schedule)
- Waitlist functionality
- Enhanced analytics
- Client notes in CRM
- Email marketing integration

### v2.0 (Future) - Month 3+
- Multi-instructor support
- Mobile app
- Video integrations (Zoom, Google Meet)
- Advanced automation

---

## Dependencies

### Between Epics
1. **Epic 2 (Auth)** → Must be complete before Epic 4 (Booking), Epic 6 (Client Dashboard), Epic 7 (Admin Dashboard)
2. **Epic 3 (Schedule)** → Must be complete before Epic 4 (Booking)
3. **Epic 5 (Payments)** → Required for Epic 4 (Booking with payment)
4. **Epic 1 (Website)** → Can be developed in parallel

### External Dependencies
- Supabase account setup
- Stripe account setup and verification
- Domain registration (optional for MVP)
- Vercel account

---

## Non-Functional Requirements

### Performance
- Page load time: \<2 seconds (Lighthouse score \>90)
- Time to Interactive: \<3 seconds
- API response time: \<500ms (p95)

### Security
- HTTPS only
- Secure authentication tokens
- PCI compliance via Stripe
- SQL injection prevention (parameterized queries)
- XSS prevention (sanitized inputs)
- CSRF protection

### Accessibility
- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader friendly
- Color contrast ratios meet standards

### Browser Support
- Chrome (latest 2 versions)
- Safari (latest 2 versions)
- Firefox (latest 2 versions)
- Edge (latest 2 versions)
- Mobile Safari (iOS 14+)
- Mobile Chrome (Android 10+)

### Scalability
- Support 100 concurrent users (MVP)
- Support 1000+ class sessions in database
- Support 10,000+ bookings

---

## Out of Scope (MVP)

- Mobile native app
- SMS notifications
- Multi-language support
- Gift certificates
- Referral program
- Community/social features
- Live video streaming
- Advanced marketing automation
- Third-party calendar sync (Google Calendar, iCal)

---

## Glossary

- **Class Type:** A category of class (e.g., "Vinyasa Yoga")
- **Class Session:** A specific instance of a class with date/time
- **Booking:** A reservation by a user for a specific class session
- **Package:** A bundle of class credits purchased at a discount
- **Credit:** A prepaid token representing one class attendance
- **CRM:** Customer Relationship Management tools for managing clients
- **RLS:** Row-Level Security in Supabase for data protection

---

**Status:** ✅ PRD Complete  
**Next Phase:** UX Expert (`/ux-expert`)  
**Created:** 2025-12-14
