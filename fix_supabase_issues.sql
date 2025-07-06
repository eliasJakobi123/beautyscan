-- ========================================
-- SUPABASE FIX SCRIPT
-- ========================================
-- Führe diese Queries im Supabase SQL Editor aus
-- um häufige Probleme zu beheben

-- 1. DELETE ALL OLD DATA (RADICAL CLEAN START)
-- WICHTIG: Dies löscht ALLE Daten!
DELETE FROM scans;
DELETE FROM subscriptions;

-- Nur löschen wenn achievements Tabelle existiert
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'achievements') THEN
        DELETE FROM achievements;
    END IF;
END $$;

-- 2. RESET SEQUENCES (falls vorhanden)
-- ALTER SEQUENCE scans_id_seq RESTART WITH 1;
-- ALTER SEQUENCE subscriptions_id_seq RESTART WITH 1;
-- ALTER SEQUENCE achievements_id_seq RESTART WITH 1;

-- 3. DROP AND RECREATE POLICIES (falls sie kaputt sind)
-- Scans Policies löschen
DROP POLICY IF EXISTS "Users can insert their own scans" ON scans;
DROP POLICY IF EXISTS "Users can view their own scans" ON scans;
DROP POLICY IF EXISTS "Users can update their own scans" ON scans;
DROP POLICY IF EXISTS "Users can delete their own scans" ON scans;

-- 4. ENABLE RLS
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;

-- 5. RECREATE POLICIES (korrigierte Version)
-- Policy: Users can only INSERT their own scans
CREATE POLICY "Users can insert their own scans" ON scans
FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Policy: Users can only SELECT their own scans
CREATE POLICY "Users can view their own scans" ON scans
FOR SELECT USING (auth.uid()::text = user_id::text);

-- Policy: Users can only UPDATE their own scans
CREATE POLICY "Users can update their own scans" ON scans
FOR UPDATE USING (auth.uid()::text = user_id::text);

-- Policy: Users can only DELETE their own scans
CREATE POLICY "Users can delete their own scans" ON scans
FOR DELETE USING (auth.uid()::text = user_id::text);

-- 6. VERIFY POLICIES ARE ACTIVE
SELECT 
  tablename,
  policyname,
  cmd,
  permissive
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename = 'scans';

-- 7. CHECK RLS STATUS
SELECT 
  tablename,
  rowsecurity
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'scans';

-- 8. TEST INSERT (sollte funktionieren wenn User eingeloggt ist)
-- INSERT INTO scans (user_id, image_url, skin_score, hydration_level, oil_level, texture_analysis, recommendations)
-- VALUES (auth.uid(), '/test.jpg', 85, 'normal', 'normal', 'Test analysis', ARRAY['Test recommendation']);

-- 9. VERIFY CLEAN STATE
SELECT COUNT(*) as total_scans FROM scans;
SELECT COUNT(*) as total_users FROM auth.users; 