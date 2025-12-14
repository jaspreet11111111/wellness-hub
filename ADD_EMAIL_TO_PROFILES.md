# Adding Email to Profiles Table - Instructions

## Quick Steps

### 1. Open Supabase Dashboard
Go to your Supabase project dashboard and navigate to **SQL Editor**

### 2. Run This SQL (Copy & Paste)

```sql
-- Step 1: Add email column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email TEXT;

-- Step 2: Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- Step 3: Backfill existing users' emails from auth.users
DO $$
DECLARE
    auth_user RECORD;
BEGIN
    FOR auth_user IN 
        SELECT id, email FROM auth.users
    LOOP
        UPDATE profiles 
        SET email = auth_user.email 
        WHERE id = auth_user.id AND email IS NULL;
    END LOOP;
END $$;

-- Step 4: Update the trigger function for future signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, email, credits)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
        NEW.email,
        0
    );
    RETURN NEW;
END;
$$;
```

### 3. Verify It Worked

Run this to check emails are populated:

```sql
SELECT id, full_name, email, role, credits 
FROM profiles 
ORDER BY created_at DESC;
```

You should see email addresses instead of NULL!

### 4. Refresh Your Admin Page

Go to http://localhost:3000/admin and you should now see real email addresses in the "All Users" table!

---

## ✅ What This Does

1. **Adds `email` column** to `profiles` table
2. **Copies existing emails** from Supabase auth.users to profiles
3. **Updates the trigger** so new signups automatically include email
4. **All future users** will have emails automatically saved

## Files Updated

- ✅ `/src/app/actions/auth.ts` - signup includes email in metadata
- ✅ `/src/app/actions/admin.ts` - getAllUsers fetches email from profiles
- ✅ `/supabase/migrations/001_initial_schema.sql` - trigger updated
- ✅ SQL migration files created for easy deployment

---

**After running the SQL, your admin dashboard will show real emails!** 🎉
