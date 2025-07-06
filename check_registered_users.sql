-- ========================================
-- CHECK REGISTERED USERS IN SUPABASE
-- ========================================
-- Führe diese Queries im Supabase SQL Editor aus
-- um zu sehen welche Benutzer registriert sind

-- 1. ALLE REGISTRIERTEN BENUTZER ANZEIGEN
SELECT 
  id,
  email,
  created_at,
  last_sign_in_at,
  raw_user_meta_data
FROM auth.users
ORDER BY created_at DESC;

-- 2. ANZAHL DER REGISTRIERTEN BENUTZER
SELECT COUNT(*) as total_registered_users FROM auth.users;

-- 3. BENUTZER MIT IHREN SCAN-DATEN
SELECT 
  u.id,
  u.email,
  u.created_at as user_created,
  COUNT(s.id) as scan_count,
  MAX(s.created_at) as last_scan
FROM auth.users u
LEFT JOIN scans s ON u.id = s.user_id
GROUP BY u.id, u.email, u.created_at
ORDER BY u.created_at DESC;

-- 4. AKTIVE SESSIONS (falls vorhanden)
SELECT 
  id,
  user_id,
  created_at,
  expires_at
FROM auth.sessions
WHERE expires_at > NOW()
ORDER BY created_at DESC;

-- 5. BENUTZER OHNE SCANS
SELECT 
  u.id,
  u.email,
  u.created_at
FROM auth.users u
LEFT JOIN scans s ON u.id = s.user_id
WHERE s.id IS NULL
ORDER BY u.created_at DESC;

-- Show all users (including anonymous)
SELECT id, email, is_anonymous, created_at FROM profiles ORDER BY created_at DESC;
-- Show only anonymous users
SELECT id, created_at FROM profiles WHERE is_anonymous = true ORDER BY created_at DESC; 