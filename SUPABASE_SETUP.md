# Supabase Database Setup Instructions

## Step 1: Run Database Migrations

1. Go to your Supabase dashboard: https://app.supabase.com/project/lcuzoemvytnsydjzcqpz
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the contents of `/supabase/migrations/001_initial_schema.sql`
5. Click **Run** to execute the migration
6. You should see "Success. No rows returned" - this is correct!

## Step 2: Add Seed Data (Optional)

1. In the SQL Editor, create another new query
2. Copy and paste the contents of `/supabase/seed.sql`
3. Click **Run** to execute
4. This will add sample class types and packages

## Step 3: Verify Tables Created

1. Go to **Table Editor** in the left sidebar
2. You should see these tables:
   - profiles
   - class_types
   - class_sessions
   - bookings
   - payments
   - packages

## Step 4: Test the Application

1. The dev server is already running on `localhost:3001`
2. Try registering a new account at `/auth/register`
3. Check your email for verification
4. Login and start testing!

## Notes

- Environment variables are already configured in `.env.local`
- The anon key is automatically derived from your project
- All RLS policies are enabled for security
