-- ========================================
-- TEST USER ISOLATION SCRIPT
-- ========================================
-- Führe diese Queries im Supabase SQL Editor aus
-- um zu testen ob User-Isolation funktioniert

-- 1. ZUERST: Aktuelle Situation prüfen
SELECT 'CURRENT STATE' as info;
SELECT COUNT(*) as total_scans FROM scans;
SELECT COUNT(*) as total_users FROM auth.users;

-- 2. ALLE SCANS MIT USER INFO ANZEIGEN (ohne RLS)
SELECT 
  s.id,
  s.user_id,
  s.skin_score,
  s.created_at,
  u.email as user_email
FROM scans s
LEFT JOIN auth.users u ON s.user_id = u.id
ORDER BY s.created_at DESC;

-- 3. RLS STATUS PRÜFEN
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

-- 4. AKTIVE POLICIES PRÜFEN
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

-- 5. AKTUELLE SESSION PRÜFEN
SELECT 
  auth.uid() as current_user_id,
  auth.role() as current_role,
  CASE 
    WHEN auth.uid() IS NULL THEN 'NO USER LOGGED IN'
    ELSE 'USER LOGGED IN'
  END as auth_status;

-- 6. TEST: Was sieht ein eingeloggter User? (sollte nur eigene Scans sehen)
-- Diese Query simuliert was ein User sieht wenn er eingeloggt ist
SELECT 
  'USER VIEW TEST' as test_type,
  COUNT(*) as scans_visible_to_user
FROM scans
WHERE auth.uid()::text = user_id::text;

-- 7. TEST: Was passiert bei einem INSERT? (sollte user_id setzen)
-- Diese Query zeigt was passiert wenn ein User einen Scan erstellt
SELECT 
  'INSERT TEST' as test_type,
  auth.uid() as would_be_user_id,
  CASE 
    WHEN auth.uid() IS NULL THEN 'CANNOT INSERT - NO USER'
    ELSE 'CAN INSERT - USER LOGGED IN'
  END as insert_status;

-- 8. MANUELLER TEST: Einen Test-Scan erstellen (nur wenn User eingeloggt)
-- Führe diese Zeile nur aus wenn ein User eingeloggt ist:
-- INSERT INTO scans (user_id, image_url, skin_score, hydration_level, oil_level, texture_analysis, recommendations)
-- VALUES (auth.uid(), '/test-scan.jpg', 85, 'normal', 'normal', 'Test analysis', ARRAY['Test recommendation']);

-- 9. NACH DEM INSERT: Prüfen ob der Scan korrekt erstellt wurde
-- SELECT * FROM scans WHERE image_url = '/test-scan.jpg';

-- 10. DEBUGGING: Alle user_ids in scans Tabelle
SELECT 
  user_id,
  COUNT(*) as scan_count,
  MIN(created_at) as first_scan,
  MAX(created_at) as last_scan
FROM scans 
GROUP BY user_id 
ORDER BY scan_count DESC; 