-- ========================================
-- SUPABASE DEBUG SCRIPT
-- ========================================
-- Führe diese Queries im Supabase SQL Editor aus
-- um zu sehen was mit den Daten los ist

-- 1. CHECK TABLES EXIST
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('scans', 'subscriptions', 'achievements');

-- 2. CHECK TABLE STRUCTURE
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'scans' 
ORDER BY ordinal_position;

-- 3. CHECK RLS STATUS
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('scans', 'subscriptions', 'achievements');

-- 4. CHECK ALL POLICIES
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- 5. CHECK ALL USERS (auth.users)
SELECT 
  id,
  email,
  created_at,
  last_sign_in_at
FROM auth.users
ORDER BY created_at DESC
LIMIT 10;

-- 6. CHECK ALL SCANS (WITHOUT RLS)
-- WICHTIG: Diese Query umgeht RLS um ALLE Daten zu sehen
SELECT 
  id,
  user_id,
  skin_score,
  created_at,
  texture_analysis
FROM scans
ORDER BY created_at DESC
LIMIT 20;

-- 7. CHECK SCAN COUNT PER USER
SELECT 
  user_id,
  COUNT(*) as scan_count,
  MAX(created_at) as last_scan
FROM scans
GROUP BY user_id
ORDER BY scan_count DESC;

-- 8. CHECK FOR ORPHANED SCANS (scans without valid users)
SELECT 
  s.id,
  s.user_id,
  s.created_at
FROM scans s
LEFT JOIN auth.users u ON s.user_id = u.id
WHERE u.id IS NULL;

-- 9. CHECK FOR NULL USER_IDS
SELECT 
  id,
  user_id,
  created_at
FROM scans
WHERE user_id IS NULL;

-- 10. CHECK AUTH SESSION
-- Diese Query zeigt die aktuelle Session (falls vorhanden)
SELECT 
  auth.uid() as current_user_id,
  auth.role() as current_role; 