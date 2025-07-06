-- ========================================
-- TEMPORARILY DISABLE RLS FOR TESTING
-- ========================================
-- WICHTIG: Nur für Tests! Nicht für Produktion!
-- Führe dieses Skript im Supabase SQL Editor aus

-- 1. RLS DEAKTIVIEREN
ALTER TABLE scans DISABLE ROW LEVEL SECURITY;

-- 2. ALLE POLICIES LÖSCHEN
DROP POLICY IF EXISTS "Users can insert their own scans" ON scans;
DROP POLICY IF EXISTS "Users can view their own scans" ON scans;
DROP POLICY IF EXISTS "Users can update their own scans" ON scans;
DROP POLICY IF EXISTS "Users can delete their own scans" ON scans;

-- 3. VERIFY RLS IS DISABLED
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

-- 4. TEST: Alle Scans anzeigen (sollte jetzt funktionieren)
SELECT 
  id,
  user_id,
  skin_score,
  created_at
FROM scans
ORDER BY created_at DESC
LIMIT 10;

-- 5. TEST: Scans für spezifischen User
SELECT 
  id,
  user_id,
  skin_score,
  created_at
FROM scans
WHERE user_id = '8e81879f-1077-4979-8859-e5c31036d1a0'
ORDER BY created_at DESC; 