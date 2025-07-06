-- ========================================
-- COMPLETE CLEAN START SCRIPT
-- ========================================
-- WICHTIG: Dies löscht ALLE Daten und startet komplett neu!
-- Führe dieses Skript im Supabase SQL Editor aus

-- 1. ALLE DATEN LÖSCHEN
DELETE FROM scans;
DELETE FROM subscriptions;

-- 2. RLS DEAKTIVIEREN (temporär für Tests)
ALTER TABLE scans DISABLE ROW LEVEL SECURITY;

-- 3. ALLE POLICIES LÖSCHEN
DROP POLICY IF EXISTS "Users can insert their own scans" ON scans;
DROP POLICY IF EXISTS "Users can view their own scans" ON scans;
DROP POLICY IF EXISTS "Users can update their own scans" ON scans;
DROP POLICY IF EXISTS "Users can delete their own scans" ON scans;

-- 4. VERIFY CLEAN STATE
SELECT 'CLEAN STATE VERIFICATION' as info;

-- Check if tables are empty
SELECT 
  'scans' as table_name,
  COUNT(*) as row_count
FROM scans
UNION ALL
SELECT 
  'subscriptions' as table_name,
  COUNT(*) as row_count
FROM subscriptions;

-- Check RLS status
SELECT 
  tablename,
  rowsecurity,
  CASE 
    WHEN rowsecurity THEN 'ENABLED' 
    ELSE 'DISABLED' 
  END as rls_status
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('scans', 'subscriptions');

-- 5. TEST INSERT (sollte funktionieren ohne RLS)
INSERT INTO scans (
  user_id,
  image_url,
  skin_score,
  hydration_level,
  oil_level,
  texture_analysis,
  recommendations,
  created_at
) VALUES (
  '8e81879f-1077-4979-8859-e5c31036d1a0',
  '/test-clean-start.jpg',
  85,
  'normal',
  'normal',
  'Clean start test scan',
  ARRAY['Test recommendation'],
  NOW()
);

-- 6. VERIFY TEST INSERT
SELECT 
  id,
  user_id,
  skin_score,
  created_at
FROM scans
ORDER BY created_at DESC
LIMIT 5;

-- 7. CLEAN UP TEST DATA
DELETE FROM scans WHERE image_url = '/test-clean-start.jpg';

-- 8. FINAL VERIFICATION
SELECT 'FINAL STATE' as info;
SELECT COUNT(*) as total_scans FROM scans; 