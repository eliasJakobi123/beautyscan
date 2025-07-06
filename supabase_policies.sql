-- ========================================
-- SUPABASE POLICIES FOR USER ISOLATION
-- ========================================
-- Führe diese Policies im Supabase SQL Editor aus
-- um strikte User-Isolation zu gewährleisten

-- NOTE: For anonymous/local UUID users, you must use a custom claim or pass the UUID as a JWT claim for RLS. For now, keep strict user_id = auth.uid() for all sensitive data. See docs for details.

-- 1. SCANS TABLE POLICIES
-- Enable RLS
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only INSERT their own scans
CREATE POLICY "Users can insert their own scans" ON scans
FOR INSERT WITH CHECK (auth.uid() = user_id::uuid);

-- Policy: Users can only SELECT their own scans
CREATE POLICY "Users can view their own scans" ON scans
FOR SELECT USING (auth.uid() = user_id::uuid);

-- Policy: Users can only UPDATE their own scans
CREATE POLICY "Users can update their own scans" ON scans
FOR UPDATE USING (auth.uid() = user_id::uuid);

-- Policy: Users can only DELETE their own scans
CREATE POLICY "Users can delete their own scans" ON scans
FOR DELETE USING (auth.uid() = user_id::uuid);

-- 2. SUBSCRIPTIONS TABLE POLICIES
-- Enable RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only INSERT their own subscriptions
CREATE POLICY "Users can insert their own subscriptions" ON subscriptions
FOR INSERT WITH CHECK (auth.uid() = user_id::uuid);

-- Policy: Users can only SELECT their own subscriptions
CREATE POLICY "Users can view their own subscriptions" ON subscriptions
FOR SELECT USING (auth.uid() = user_id::uuid);

-- Policy: Users can only UPDATE their own subscriptions
CREATE POLICY "Users can update their own subscriptions" ON subscriptions
FOR UPDATE USING (auth.uid() = user_id::uuid);

-- Policy: Users can only DELETE their own subscriptions
CREATE POLICY "Users can delete their own subscriptions" ON subscriptions
FOR DELETE USING (auth.uid() = user_id::uuid);

-- 3. STORAGE POLICIES (für scan-images bucket)
-- Policy: Users can only upload to their own folder
CREATE POLICY "Users can upload to their own folder" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'scan-images' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Users can only view their own images
CREATE POLICY "Users can view their own images" ON storage.objects
FOR SELECT USING (
  bucket_id = 'scan-images' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Users can only update their own images
CREATE POLICY "Users can update their own images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'scan-images' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Users can only delete their own images
CREATE POLICY "Users can delete their own images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'scan-images' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

-- 4. ACHIEVEMENTS TABLE POLICIES
-- Enable RLS
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only INSERT their own achievements
CREATE POLICY "Users can insert their own achievements" ON achievements
FOR INSERT WITH CHECK (auth.uid() = user_id::uuid);

-- Policy: Users can only SELECT their own achievements
CREATE POLICY "Users can view their own achievements" ON achievements
FOR SELECT USING (auth.uid() = user_id::uuid);

-- Policy: Users can only UPDATE their own achievements
CREATE POLICY "Users can update their own achievements" ON achievements
FOR UPDATE USING (auth.uid() = user_id::uuid);

-- Policy: Users can only DELETE their own achievements
CREATE POLICY "Users can delete their own achievements" ON achievements
FOR DELETE USING (auth.uid() = user_id::uuid);

-- 5. VERIFY POLICIES
-- Zeige alle aktiven Policies an
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

-- Enable RLS for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
-- Policy: Only the user with matching UUID can SELECT
CREATE POLICY "User can view own profile" ON profiles FOR SELECT USING (id = auth.uid());
-- Policy: Only the user with matching UUID can UPDATE
CREATE POLICY "User can update own profile" ON profiles FOR UPDATE USING (id = auth.uid());
-- Policy: Only the user with matching UUID can DELETE
CREATE POLICY "User can delete own profile" ON profiles FOR DELETE USING (id = auth.uid());
-- Policy: Only the user with matching UUID can INSERT
CREATE POLICY "User can insert own profile" ON profiles FOR INSERT WITH CHECK (id = auth.uid()); 