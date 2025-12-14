-- Add missing columns to class_types table for admin class management

-- Add instructor column
ALTER TABLE class_types ADD COLUMN IF NOT EXISTS instructor TEXT;

-- Add benefits column (array of text)
ALTER TABLE class_types ADD COLUMN IF NOT EXISTS benefits TEXT[];

-- Add what_to_bring column
ALTER TABLE class_types ADD COLUMN IF NOT EXISTS what_to_bring TEXT;

-- Verify the changes
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'class_types'
ORDER BY ordinal_position;
