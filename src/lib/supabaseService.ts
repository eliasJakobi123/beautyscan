import { supabase, ScanResult, User, Subscription } from './supabaseClient';
import { getOrCreateUserId } from './uuidHelper';

// ===== SCAN FUNCTIONS =====
export async function saveScanResult(scanData: Omit<ScanResult, 'id' | 'created_at'>) {
  // WICHTIG: Validiere user_id vor dem Speichern
  const userId = getOrCreateUserId();
  if (!userId) {
    console.error("❌ CRITICAL: No user_id available for scan");
    throw new Error("user_id is required for scan");
  }
  const { data, error } = await supabase
    .from('scans')
    .insert([{ ...scanData, user_id: userId, created_at: new Date().toISOString() }])
    .select();
  if (error) throw error;
  return data?.[0];
}

export async function getUserScans() {
  const userId = getOrCreateUserId();
  if (!userId) throw new Error("userId is required for getUserScans");
  const { data, error } = await supabase
    .from('scans')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function getLatestScan() {
  const userId = getOrCreateUserId();
  if (!userId) throw new Error("userId is required for getLatestScan");
  const { data, error } = await supabase
    .from('scans')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function getUserScanCount(): Promise<number> {
  const userId = getOrCreateUserId();
  if (!userId) return 0;
  const { count, error } = await supabase
    .from('scans')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);
  if (error) return 0;
  return count || 0;
}

// ===== AUTH FUNCTIONS =====
export async function signUp(email: string, password: string, name?: string) {
  console.log("🔒 SIGNING UP user:", email);
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name || email.split('@')[0],
      }
    }
  });
  
  if (error) {
    console.error('❌ Error signing up:', error);
    throw error;
  }
  
  console.log("✅ User signed up successfully:", data.user?.id);
  return data;
}

export async function signIn(email: string, password: string) {
  console.log("🔒 SIGNING IN user:", email);
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) {
    console.error('❌ Error signing in:', error);
    throw error;
  }
  
  console.log("✅ User signed in successfully:", data.user?.id);
  return data;
}

export async function signOut() {
  console.log("🔒 SIGNING OUT user");
  
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('❌ Error signing out:', error);
    throw error;
  }
  
  console.log("✅ User signed out successfully");
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    console.error('❌ Error getting current user:', error);
    throw error;
  }
  
  console.log("🔒 Current user:", user?.id || "not authenticated");
  return user;
}

export async function ensureUserProfile(userId: string, email: string, name?: string) {
  console.log("🔒 ENSURING USER PROFILE - User ID:", userId);
  
  // Check if user profile exists
  const { data: existingProfile, error: fetchError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('❌ Error checking user profile:', fetchError);
    throw fetchError;
  }
  
  // If profile doesn't exist, create it
  if (!existingProfile) {
    console.log("📝 Creating new user profile for:", userId);
    
    const { data: newProfile, error: createError } = await supabase
      .from('profiles')
      .insert([{
        id: userId,
        email: email,
        name: name || email.split('@')[0],
        created_at: new Date().toISOString()
      }])
      .select()
      .single();
    
    if (createError) {
      console.error('❌ Error creating user profile:', createError);
      throw createError;
    }
    
    console.log("✅ User profile created:", newProfile);
    return newProfile;
  }
  
  console.log("✅ User profile already exists:", existingProfile);
  return existingProfile;
}

// ===== SUBSCRIPTION FUNCTIONS =====
export async function saveSubscription(subscriptionData: Omit<Subscription, 'id'>) {
  const userId = getOrCreateUserId();
  if (!userId) throw new Error("user_id is required for subscription");
  const { data, error } = await supabase
    .from('subscriptions')
    .insert([{ ...subscriptionData, user_id: userId }])
    .select();
  if (error) throw error;
  return data?.[0];
}

export async function getUserSubscription() {
  const userId = getOrCreateUserId();
  if (!userId) throw new Error("userId is required for getUserSubscription");
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function updateSubscription(subscriptionId: number, updates: Partial<Subscription>) {
  console.log("🔒 UPDATING SUBSCRIPTION - ID:", subscriptionId);

  const { data, error } = await supabase
    .from('subscriptions')
    .update(updates)
    .eq('id', subscriptionId)
    .select();
  
  if (error) {
    console.error('❌ Error updating subscription:', error);
    throw error;
  }
  
  console.log("✅ Subscription updated successfully");
  return data?.[0];
}

// ===== UTILITY FUNCTIONS =====
export async function uploadImage(file: File): Promise<string> {
  const userId = getOrCreateUserId();
  if (!userId) throw new Error("userId is required for image upload");
  const fileName = `${userId}/${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from('scan-images')
    .upload(fileName, file);
  if (error) throw error;
  const { data: urlData } = supabase.storage
    .from('scan-images')
    .getPublicUrl(fileName);
  return urlData.publicUrl;
}

// ===== CLEANUP FUNCTIONS =====
export async function deleteAllTestData() {
  console.log("🗑️ DELETING ALL TEST DATA...");
  
  try {
    const { error: deleteError } = await supabase
      .from('scans')
      .delete()
      .neq('id', 0);
    
    if (deleteError) {
      console.error('❌ Error deleting all scans:', deleteError);
    } else {
      console.log("✅ Successfully deleted ALL scans");
    }
    
    const { error: deleteSubsError } = await supabase
      .from('subscriptions')
      .delete()
      .neq('id', 0);
    
    if (deleteSubsError) {
      console.error('❌ Error deleting all subscriptions:', deleteSubsError);
    } else {
      console.log("✅ Successfully deleted ALL subscriptions");
    }
    
  } catch (error) {
    console.error('❌ Error during complete cleanup:', error);
  }
}

export async function deleteCurrentUserData() {
  const userId = getOrCreateUserId();
  if (!userId) return;
  await supabase.from('scans').delete().eq('user_id', userId);
  await supabase.from('subscriptions').delete().eq('user_id', userId);
}

export async function showAllDataInDatabase() {
  console.log("🔍 SHOWING ALL DATA IN DATABASE...");
  
  try {
    const { data: allScans, error: scansError } = await supabase
      .from('scans')
      .select('*');
    
    if (scansError) {
      console.error('❌ Error fetching all scans:', scansError);
    } else {
      console.log("📋 ALL SCANS IN DATABASE:", {
        count: allScans?.length || 0,
        scans: allScans?.map(s => ({ 
          id: s.id, 
          user_id: s.user_id, 
          created_at: s.created_at,
          skin_score: s.skin_score 
        }))
      });
    }
    
    const { data: allSubs, error: subsError } = await supabase
      .from('subscriptions')
      .select('*');
    
    if (subsError) {
      console.error('❌ Error fetching all subscriptions:', subsError);
    } else {
      console.log("📋 ALL SUBSCRIPTIONS IN DATABASE:", {
        count: allSubs?.length || 0,
        subscriptions: allSubs?.map(s => ({ 
          id: s.id, 
          user_id: s.user_id, 
          created_at: s.created_at 
        }))
      });
    }
    
  } catch (error) {
    console.error('❌ Error showing all data:', error);
  }
}

export async function deleteOrphanedData() {
  console.log("🧹 Deleting orphaned data...");
  
  try {
    const { error: deleteError } = await supabase
      .from('scans')
      .delete()
      .or('user_id.is.null,user_id.eq.');
    
    if (deleteError) {
      console.error('❌ Error deleting orphaned scans:', deleteError);
    } else {
      console.log("✅ Successfully deleted orphaned scans");
    }
    
    const { error: deleteSubsError } = await supabase
      .from('subscriptions')
      .delete()
      .or('user_id.is.null,user_id.eq.');
    
    if (deleteSubsError) {
      console.error('❌ Error deleting orphaned subscriptions:', deleteSubsError);
    } else {
      console.log("✅ Successfully deleted orphaned subscriptions");
    }
    
  } catch (error) {
    console.error('❌ Error during orphaned data cleanup:', error);
  }
}

export async function validateUserData() {
  const userId = getOrCreateUserId();
  if (!userId) return;
  await supabase.from('scans').select('id, user_id').eq('user_id', userId);
  await supabase.from('subscriptions').select('id, user_id').eq('user_id', userId);
}

export async function ensureLocalUserProfile() {
  // Mit Supabase Auth: aktuelle User-ID holen
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw authError || new Error('Not authenticated');
  const userId = user.id;
  const { data: existing, error: fetchError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;
  if (!existing) {
    const { error: insertError } = await supabase
      .from('profiles')
      .insert([{ id: userId, is_anonymous: false, created_at: new Date().toISOString() }]);
    if (insertError) throw insertError;
  }
}

// Diese Funktion nach Login/Redirect aufrufen, um das Profil sicher anzulegen
export async function setupUserProfileAfterAuth() {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return;
  const userId = user.id;
  const { data: existing, error: fetchError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (fetchError && fetchError.code !== 'PGRST116') return;
  if (!existing) {
    await supabase
      .from('profiles')
      .insert([{ id: userId, is_anonymous: false, created_at: new Date().toISOString() }]);
  }
} 