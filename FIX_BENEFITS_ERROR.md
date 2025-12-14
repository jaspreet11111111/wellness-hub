# 🔧 Fix: "Could not find 'benefits' column" Error

## Error
When adding a new class type, you see:
```
Could not find the 'benefits' column of 'class_types' in the schema cache
```

## Cause
The database is missing columns that the admin class management code expects.

## Fix - Run in Supabase SQL Editor

1. Go to: https://app.supabase.com → Your Project → **SQL Editor**
2. Click **"New Query"**
3. Copy and paste this SQL:

```sql
-- Add missing columns to class_types table
ALTER TABLE class_types ADD COLUMN IF NOT EXISTS instructor TEXT;
ALTER TABLE class_types ADD COLUMN IF NOT EXISTS benefits TEXT[];
ALTER TABLE class_types ADD COLUMN IF NOT EXISTS what_to_bring TEXT;
```

4. Click **"Run"** (or press Ctrl+Enter)
5. You should see: "Success. No rows returned"

## Verify It Worked

Run this query to check:
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'class_types'
ORDER BY ordinal_position;
```

You should now see `instructor`, `benefits`, and `what_to_bring` in the list!

## Try Adding Class Again

Go back to: http://localhost:3000/admin/classes

Try adding your class again - the error should be gone! ✅

---

**Why this happened:** The admin class management code was built to support these extra fields, but the database migration wasn't run yet.
