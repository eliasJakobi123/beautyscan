-- ========================================
-- FIX RLS POLICIES SCRIPT
-- ========================================
-- Execute this script in the Supabase SQL Editor
-- to completely recreate the RLS policies.

-- 1. DROP ALL EXISTING POLICIES on the 'scans' table
DROP POLICY IF EXISTS "Users can insert their own scans" ON scans;
DROP POLICY IF EXISTS "Users can view their own scans" ON scans;
DROP POLICY IF EXISTS "Users can update their own scans" ON scans;
DROP POLICY IF EXISTS "Users can delete their own scans" ON scans;

-- 2. ENABLE RLS on the 'scans' table
-- This ensures that the policies will be enforced.
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;

-- 3. CREATE POLICIES
-- These policies ensure that users can only interact with their own data.

-- Policy: Users can only INSERT scans for themselves.
CREATE POLICY "Users can insert their own scans" ON scans
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only VIEW their own scans.
CREATE POLICY "Users can view their own scans" ON scans
FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can only UPDATE their own scans.
CREATE POLICY "Users can update their own scans" ON scans
FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can only DELETE their own scans.
CREATE POLICY "Users can delete their own scans" ON scans
FOR DELETE USING (auth.uid() = user_id);

-- 4. VERIFY POLICIES
-- After running the above, you can use this query to see the created policies.
SELECT
  policyname,
  cmd,
  permissive,
  roles,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
AND tablename = 'scans'
ORDER BY policyname;

-- 5. VERIFY RLS STATUS
-- This query confirms that RLS is enabled for the 'scans' table.
SELECT
  tablename,
  rowsecurity,
  CASE
    WHEN rowsecurity THEN 'ENABLED'
    ELSE 'DISABLED'
  END as rls_status
FROM pg_tables
WHERE schemaname = 'public'
AND tablename = 'scans'; 