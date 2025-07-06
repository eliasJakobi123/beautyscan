-- ========================================
-- SUPABASE DATABASE CLEANUP SCRIPT
-- ========================================
-- Führe dieses Skript im Supabase SQL Editor aus
-- um alle alten Daten zu löschen

-- 1. Lösche alle Scans ohne oder mit falscher user_id
DELETE FROM scans WHERE user_id IS NULL OR user_id = '00000000-0000-0000-0000-000000000000' OR user_id = '11111111-1111-1111-1111-111111111111';

-- 2. Lösche alle Subscriptions ohne oder mit falscher user_id
DELETE FROM subscriptions WHERE user_id IS NULL OR user_id = '00000000-0000-0000-0000-000000000000' OR user_id = '11111111-1111-1111-1111-111111111111';

-- 3. Lösche alle Achievements ohne oder mit falscher user_id (falls Tabelle existiert)
DELETE FROM achievements WHERE user_id IS NULL OR user_id = '00000000-0000-0000-0000-000000000000' OR user_id = '11111111-1111-1111-1111-111111111111';

-- 4. Zeige alle verbleibenden Daten an
SELECT 'scans' as table_name, COUNT(*) as count FROM scans
UNION ALL
SELECT 'subscriptions' as table_name, COUNT(*) as count FROM subscriptions;

-- 5. Zeige alle user_ids in der scans Tabelle
SELECT DISTINCT user_id, COUNT(*) as scan_count 
FROM scans 
GROUP BY user_id 
ORDER BY scan_count DESC;

-- 🧹 FORCE CLEAN START - Delete ALL data from scans table
-- This script will completely clear all scan data from the database

-- Delete ALL scans from the scans table
DELETE FROM scans;

-- Reset the auto-increment sequence (if using serial/bigserial)
-- ALTER SEQUENCE scans_id_seq RESTART WITH 1;

-- Verify the table is empty
SELECT COUNT(*) as remaining_scans FROM scans;

-- Show table structure for verification
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'scans' 
ORDER BY ordinal_position;

-- Clean up subscriptions with invalid user_id
DELETE FROM subscriptions WHERE user_id IS NULL OR user_id = '00000000-0000-0000-0000-000000000000' OR user_id = '11111111-1111-1111-1111-111111111111';
-- Clean up scans with invalid user_id
DELETE FROM scans WHERE user_id IS NULL OR user_id = '00000000-0000-0000-0000-000000000000' OR user_id = '11111111-1111-1111-1111-111111111111';
-- Clean up achievements with invalid user_id
DELETE FROM achievements WHERE user_id IS NULL OR user_id = '00000000-0000-0000-0000-000000000000' OR user_id = '11111111-1111-1111-1111-111111111111'; 