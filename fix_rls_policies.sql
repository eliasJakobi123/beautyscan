-- ========================================
-- FIX RLS POLICIES SCRIPT (UPDATED)
-- ========================================
-- Führe dieses Skript im Supabase SQL Editor aus
-- um die RLS-Policies komplett neu zu erstellen

-- 1. ALLE EXISTIERENDEN POLICIES LÖSCHEN
DROP POLICY IF EXISTS "Users can insert their own scans" ON scans;
DROP POLICY IF EXISTS "Users can view their own scans" ON scans;
DROP POLICY IF EXISTS "Users can update their own scans" ON scans;
DROP POLICY IF EXISTS "Users can delete their own scans" ON scans;

-- 2. RLS ENABLEN
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;

-- 3. EINFACHE POLICIES ERSTELLEN (ohne Type Casting)
-- Policy: Users can only INSERT their own scans
CREATE POLICY "Users can insert their own scans" ON scans
FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Policy: Users can only VIEW their own scans
CREATE POLICY "Users can view their own scans" ON scans
FOR SELECT USING (auth.uid()::text = user_id::text);

-- Policy: Users can only UPDATE their own scans
CREATE POLICY "Users can update their own scans" ON scans
FOR UPDATE USING (auth.uid()::text = user_id::text);

-- Policy: Users can only DELETE their own scans
CREATE POLICY "Users can delete their own scans" ON scans
FOR DELETE USING (auth.uid()::text = user_id::text);

-- 4. TEST POLICIES
-- Diese Queries sollten funktionieren wenn ein User eingeloggt ist:
-- SELECT * FROM scans WHERE user_id = auth.uid()::text;
-- INSERT INTO scans (user_id, skin_score, ...) VALUES (auth.uid()::text, 85, ...);

-- 5. ALTERNATIVE: TEMPORÄR RLS DEAKTIVIEREN (nur für Tests!)
-- ALTER TABLE scans DISABLE ROW LEVEL SECURITY;

-- 6. ALTERNATIVE: ALLOW ALL (nur für Tests!)
-- DROP POLICY IF EXISTS "Allow all" ON scans;
-- CREATE POLICY "Allow all" ON scans FOR ALL USING (true) WITH CHECK (true);

-- 7. VERIFY POLICIES
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

-- 8. VERIFY RLS STATUS
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

-- 9. TEST: Aktuelle Session
SELECT 
  auth.uid() as current_user_id,
  auth.role() as current_role,
  CASE 
    WHEN auth.uid() IS NULL THEN 'NO USER LOGGED IN'
    ELSE 'USER LOGGED IN'
  END as auth_status; 