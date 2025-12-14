-- Add email column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email TEXT;

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- Update existing profiles with emails from auth.users
-- Note: This requires running in Supabase SQL editor with service role
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

-- Verify the update
SELECT id, full_name, email, role, credits 
FROM profiles 
ORDER BY created_at DESC;
