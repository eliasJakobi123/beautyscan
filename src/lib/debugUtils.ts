import { supabase } from './supabaseClient';

// Debug utilities for testing user isolation
export const debugUtils = {
  // Test current user session
  async testCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    console.log('🔍 Current user:', user?.id || 'NO USER');
    console.log('🔍 User email:', user?.email || 'NO EMAIL');
    return { user, error };
  },

  // Test what scans the current user can see
  async testUserScans() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.log('❌ No user logged in');
      return { scans: [], count: 0 };
    }

    console.log('🔍 Testing scans for user:', user.id);

    // Test 1: Get scans with explicit user_id filter
    const { data: scans, error: scansError } = await supabase
      .from('scans')
      .select('*')
      .eq('user_id', user.id);

    console.log('📥 Scans with user_id filter:', scans?.length || 0);
    if (scansError) console.log('❌ Scans error:', scansError);

    // Test 2: Get all scans (should be blocked by RLS)
    const { data: allScans, error: allScansError } = await supabase
      .from('scans')
      .select('*');

    console.log('📥 All scans (should be blocked):', allScans?.length || 0);
    if (allScansError) console.log('❌ All scans error:', allScansError);

    // Test 3: Count scans
    const { count, error: countError } = await supabase
      .from('scans')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    console.log('🔢 Scan count for user:', count || 0);
    if (countError) console.log('❌ Count error:', countError);

    return { scans: scans || [], count: count || 0 };
  },

  // Test inserting a scan
  async testInsertScan() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.log('❌ No user logged in');
      return null;
    }

    console.log('🔍 Testing scan insert for user:', user.id);

    const testScan = {
      user_id: user.id,
      image_url: '/test-debug.jpg',
      skin_score: 85,
      hydration_level: 'normal',
      oil_level: 'normal',
      texture_analysis: 'Debug test scan',
      recommendations: ['Debug recommendation'],
      created_at: new Date().toISOString()
    };

    const { data: newScan, error } = await supabase
      .from('scans')
      .insert([testScan])
      .select()
      .single();

    if (error) {
      console.log('❌ Insert error:', error);
      return null;
    }

    console.log('✅ Test scan inserted:', newScan.id);
    return newScan;
  },

  // Show all scans in database (for debugging)
  async showAllScans() {
    console.log('🔍 Showing ALL scans in database (admin view)');
    
    const { data: scans, error } = await supabase
      .from('scans')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.log('❌ Error getting all scans:', error);
      return [];
    }

    console.log('📊 Total scans in database:', scans?.length || 0);
    scans?.forEach((scan, index) => {
      console.log(`Scan ${index + 1}:`, {
        id: scan.id,
        user_id: scan.user_id,
        skin_score: scan.skin_score,
        created_at: scan.created_at
      });
    });

    return scans || [];
  },

  // Delete test scan
  async deleteTestScan(scanId: number) {
    const { error } = await supabase
      .from('scans')
      .delete()
      .eq('id', scanId);

    if (error) {
      console.log('❌ Error deleting test scan:', error);
    } else {
      console.log('✅ Test scan deleted:', scanId);
    }
  }
}; 