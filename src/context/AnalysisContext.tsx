import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from './AuthContext';

// NEW detailed analysis structure
export interface AnalysisScores {
  overall: number;
  skin: { purity: number; shine: number; moisture: number; redness: number; pores: number; };
  makeup: { coverage: number; shade: number; durability: number; texture: number; blending: number; };
  eyes: { concealer: number; darkCircles: number; smudging: number; eyelashes: number; };
  lips: { condition: number; application: number; precision: number; };
  impression: { naturalness: number; harmony: number; expression: number; };
}

export interface AnalysisFeedback {
  overall: string;
  skin: string;
  makeup: string;
  eyes: string;
  lips: string;
  impression: string;
}

export interface AnalysisResult {
  id: number;
  date: string;
  time: string;
  created_at: string;
  scores: AnalysisScores;
  feedback: {
    skin: string;
    lips: string;
    eyes: string;
  };
  image_url?: string;
}

interface Achievement {
  id: number;
  achievement_type: string;
  unlocked_at: string;
  metadata: any;
}

interface WeeklyScanData {
  day: string;
  hasAnalysis: boolean;
  date: string;
  isToday: boolean;
}

interface AnalysisContextType {
  scansUsed: number;
  totalScans: number;
  addAnalysis: (result: AnalysisResult) => Promise<void>;
  getRecentAnalyses: () => AnalysisResult[];
  getWeeklyScanData: () => WeeklyScanData[];
  getAchievements: () => Achievement[];
  checkAndUnlockAchievements: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  todayAnalyzed: boolean;
  weeklyScans: boolean[];
  markTodayAsAnalyzed: () => void;
  forceCleanStart: () => Promise<void>;
  analyses: AnalysisResult[];
  latestAnalysis: AnalysisResult | null;
  showPremiumPopup: boolean;
  setShowPremiumPopup: (show: boolean) => void;
  loadUserScans: () => Promise<void>;
  isAddingAnalysis: boolean;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};

interface AnalysisProviderProps {
  children: ReactNode;
}

export const AnalysisProvider: React.FC<AnalysisProviderProps> = ({ children }) => {
  const { user, isPremium } = useAuth();
  const [scansUsed, setScansUsed] = useState(0);
  const [totalScans] = useState(5);
  const [analyses, setAnalyses] = useState<AnalysisResult[]>([]);
  const [latestAnalysis, setLatestAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [todayAnalyzed, setTodayAnalyzed] = useState(false);
  const [isAddingAnalysis, setIsAddingAnalysis] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [weeklyScans, setWeeklyScans] = useState<boolean[]>([false, false, false, false, false, false, false]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);

  // Force clean start - delete ALL data and start fresh
  const forceCleanStart = async () => {
    try {
      console.log('🧹 FORCE CLEAN START - Deleting ALL data from Supabase');
      
      // Delete ALL scans from the database
      const { error } = await supabase
        .from('scans')
        .delete()
        .neq('id', 0); // Delete all rows

      if (error) {
        console.error('❌ Error deleting all data:', error);
      } else {
        console.log('✅ All data deleted from Supabase');
        // Reset local state
        setScansUsed(0);
        setAnalyses([]);
        setTodayAnalyzed(false);
        setError(null);
        setWeeklyScans([false, false, false, false, false, false, false]);
      }
    } catch (err) {
      console.error('❌ Error in force clean start:', err);
    }
  };

  // Load user's scans when user changes
  useEffect(() => {
    if (!user?.id) {
      setScansUsed(0);
      setAnalyses([]);
      setTodayAnalyzed(false);
      setError(null);
      setHasLoadedOnce(false);
      setLatestAnalysis(null);
      return;
    }

    // ✅ Reset flag for new user
    setHasLoadedOnce(false);
    
    // ✅ Only load scans if user has been active for more than 1 second
    // This prevents loading on initial login
    const timer = setTimeout(() => {
      loadUserScans();
    }, 1000);

    return () => clearTimeout(timer);
  }, [user?.id]);

  const loadUserScans = async () => {
    if (!user?.id) {
      setIsLoading(false);
      setAnalyses([]);
      setLatestAnalysis(null);
      setScansUsed(0);
      setError(null);
      return;
    }

    // Prüfe, ob der User in Supabase noch existiert
    const { data: userProfile, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single();

    if (userError || !userProfile) {
      setIsLoading(false);
      setAnalyses([]);
      setLatestAnalysis(null);
      setScansUsed(0);
      setError('User does not exist.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      console.log('🔄 Loading scans for user:', user.id);

      const { data: scans, error: scansError } = await supabase
        .from('scans')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (scansError) throw scansError;

      if (!scans || scans.length === 0) {
        setAnalyses([]);
        setLatestAnalysis(null);
        setScansUsed(0);
        setIsLoading(false);
        return;
      }
      
      // Mapping: Supabase-Scans in AnalysisResult mit scores-Objekt umwandeln
      const mappedScans = scans.map((scan: any) => ({
        id: scan.id,
        date: new Date(scan.created_at).toLocaleDateString('de-DE'),
        time: new Date(scan.created_at).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
        created_at: scan.created_at,
        scores: scan.scores || {
          overall: scan.skin_score ?? 0,
          skin: {
            purity: scan.skin_purity ?? 0,
            shine: scan.skin_shine ?? 0,
            moisture: scan.skin_moisture ?? 0,
            redness: scan.skin_redness ?? 0,
            pores: scan.skin_pores ?? 0,
          },
          makeup: {
            coverage: scan.makeup_coverage ?? 0,
            shade: scan.makeup_shade ?? 0,
            durability: scan.makeup_durability ?? 0,
            texture: scan.makeup_texture ?? 0,
            blending: scan.makeup_blending ?? 0,
          },
          eyes: {
            concealer: scan.eyes_concealer ?? 0,
            darkCircles: scan.eyes_darkCircles ?? 0,
            smudging: scan.eyes_smudging ?? 0,
            eyelashes: scan.eyes_eyelashes ?? 0,
          },
          lips: {
            condition: scan.lips_condition ?? 0,
            application: scan.lips_application ?? 0,
            precision: scan.lips_precision ?? 0,
          },
          impression: {
            naturalness: scan.impression_naturalness ?? 0,
            harmony: scan.impression_harmony ?? 0,
            expression: scan.impression_expression ?? 0,
          },
        },
        feedback: scan.feedback || {
          skin: scan.texture_analysis || '',
          lips: '',
          eyes: '',
        },
        image_url: scan.image_url,
      }));
      setAnalyses(mappedScans);
      setLatestAnalysis(mappedScans[0]);
      setScansUsed(mappedScans.length);
      setIsLoading(false);

    } catch (err) {
      setError('Failed to load scans');
      setAnalyses([]);
      setLatestAnalysis(null);
      setScansUsed(0);
      setIsLoading(false);
    }
  };

  const addAnalysis = async (result: AnalysisResult) => {
    if (!user?.id) {
      console.error('[addAnalysis] No user ID!');
      throw new Error("Benutzer nicht angemeldet");
    }

    // ✅ Prevent multiple simultaneous calls
    if (isAddingAnalysis) {
      console.log('⚠️ Analysis already in progress, skipping...');
      return;
    }

    try {
      setIsAddingAnalysis(true);
      console.log('[addAnalysis] 📸 Adding scan for user:', user.id);

      // ✅ PROPER SUPABASE INSERT: Always include user_id
      const { data: newScan, error } = await supabase
        .from('scans')
        .insert([{
          user_id: user.id, // ✅ EXPLICIT user_id - REQUIRED for RLS
          image_url: '/placeholder.svg',
          skin_score: result.scores.overall,
          hydration_level: 'normal',
          oil_level: 'normal',
          texture_analysis: result.feedback.skin,
          recommendations: ['Tägliche Reinigung', 'Feuchtigkeitspflege'],
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('[addAnalysis] ❌ Supabase insert error:', error);
        throw error;
      }

      console.log('[addAnalysis] ✅ Scan saved for user:', user.id, 'Scan ID:', newScan.id);

      if (!newScan) throw new Error("Failed to create new scan");

      const newAnalysisResult: AnalysisResult = {
        id: newScan.id,
        date: new Date(newScan.created_at).toLocaleDateString('de-DE'),
        time: new Date(newScan.created_at).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
        created_at: newScan.created_at,
        scores: result.scores,
        feedback: result.feedback,
        image_url: newScan.image_url,
      };

      setAnalyses(prev => [newAnalysisResult, ...prev]);
      setLatestAnalysis(newAnalysisResult);
      setScansUsed(prev => prev + 1);
      setTodayAnalyzed(true);
      console.log('[addAnalysis] Before loadUserScans');
      try {
        await loadUserScans();
        console.log('[addAnalysis] After loadUserScans');
      } catch (e) {
        console.error('[addAnalysis] Error in loadUserScans:', e);
      }
      console.log('[addAnalysis] Before checkAndUnlockAchievements');
      try {
        await checkAndUnlockAchievements();
        console.log('[addAnalysis] After checkAndUnlockAchievements');
      } catch (e) {
        console.error('[addAnalysis] Error in checkAndUnlockAchievements:', e);
      }
    } catch (err) {
      console.error('[addAnalysis] ❌ Error adding scan:', err);
      throw err;
    } finally {
      setIsAddingAnalysis(false);
      console.log('[addAnalysis] finally reached');
    }
  };

  const getRecentAnalyses = () => {
    return analyses.slice(0, 5);
  };

  const markTodayAsAnalyzed = () => {
    setTodayAnalyzed(true);
  };

  // Generate weekly scan data based on actual scan history
  const getWeeklyScanData = (): WeeklyScanData[] => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sonntag, 1 = Montag, etc.
    // Montag als ersten Tag der Woche (0 = Montag, 6 = Sonntag)
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    const weekDays: WeeklyScanData[] = [];
    const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      const dayName = dayNames[i];
      const dateString = date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
      const isToday = date.toDateString() === today.toDateString();
      // Check if there are any scans for this specific date using the created_at timestamp
      const hasAnalysisForThisDay = analyses.some(analysis => {
        try {
          const analysisDate = new Date(analysis.created_at);
          return analysisDate.toDateString() === date.toDateString();
        } catch (error) {
          return false;
        }
      });
      weekDays.push({
        day: dayName,
        hasAnalysis: hasAnalysisForThisDay,
        date: dateString,
        isToday
      });
    }
    return weekDays;
  };

  // Load user's achievements
  const loadAchievements = async () => {
    if (!user?.id) return;

    try {
      const { data: userAchievements, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('user_id', user.id)
        .order('unlocked_at', { ascending: false });

      if (error) throw error;
      setAchievements(userAchievements || []);
    } catch (err) {
      console.error('Error loading achievements:', err);
    }
  };

  // Check and unlock achievements
  const checkAndUnlockAchievements = async () => {
    if (!user?.id) return;

    try {
      console.log('🏆 Checking achievements for user:', user.id);
      console.log('📊 Current scans:', scansUsed);
      console.log('📅 Today analyzed:', todayAnalyzed);
      console.log('📋 Total analyses:', analyses.length);

      // Get current achievements to avoid duplicates
      const currentAchievements = achievements.map(a => a.achievement_type);
      console.log('🏅 Current achievements:', currentAchievements);

      // Calculate consecutive days with scans
      const consecutiveDays = calculateConsecutiveDays();
      console.log('📅 Consecutive days with scans:', consecutiveDays);

      // 1. Check for FIRST SCAN achievement (first scan ever)
      if (scansUsed === 1 && !currentAchievements.includes('first_scan')) {
        console.log('🎯 Checking First Scan achievement...');
        const { error } = await supabase
          .from('achievements')
          .insert([{
            user_id: user.id,
            achievement_type: 'first_scan',
            metadata: { 
              unlocked_date: new Date().toISOString(),
              description: 'Completed your first scan'
            }
          }]);

        if (!error) {
          console.log('🏆 First Scan achievement unlocked!');
          await loadAchievements();
        } else {
          console.error('❌ Error unlocking First Scan:', error);
        }
      }

      // 2. Check for DAILY STREAK achievement (make a scan today)
      if (todayAnalyzed && !currentAchievements.includes('daily_streak')) {
        console.log('🎯 Checking Daily Streak achievement...');
        const { error } = await supabase
          .from('achievements')
          .insert([{
            user_id: user.id,
            achievement_type: 'daily_streak',
            metadata: { 
              unlocked_date: new Date().toISOString(),
              description: 'Made a scan today'
            }
          }]);

        if (!error) {
          console.log('🏆 Daily Streak achievement unlocked!');
          await loadAchievements();
        } else {
          console.error('❌ Error unlocking Daily Streak:', error);
        }
      }

      // 3. Check for CONSISTENT USER achievement (3 consecutive days)
      if (consecutiveDays >= 3 && !currentAchievements.includes('consistent_user')) {
        console.log('🎯 Checking Consistent User achievement...');
        const { error } = await supabase
          .from('achievements')
          .insert([{
            user_id: user.id,
            achievement_type: 'consistent_user',
            metadata: { 
              consecutive_days: consecutiveDays,
              unlocked_date: new Date().toISOString(),
              description: `Completed scans for ${consecutiveDays} consecutive days`
            }
          }]);

        if (!error) {
          console.log('🏆 Consistent User achievement unlocked!');
          await loadAchievements();
        } else {
          console.error('❌ Error unlocking Consistent User:', error);
        }
      }

      // 4. Check for PERFECT SCORE achievement (score >= 90)
      const hasPerfectScore = analyses && analyses.some(analysis => analysis.scores && typeof analysis.scores.overall === 'number' && analysis.scores.overall >= 90);
      if (hasPerfectScore && !currentAchievements.includes('perfect_score')) {
        console.log('🎯 Checking Perfect Score achievement...');
        const maxScore = analyses ? Math.max(...analyses.filter(a => a.scores && typeof a.scores.overall === 'number').map(a => a.scores.overall)) : 0;
        const { error } = await supabase
          .from('achievements')
          .insert([{
            user_id: user.id,
            achievement_type: 'perfect_score',
            metadata: { 
              score: maxScore,
              unlocked_date: new Date().toISOString(),
              description: `Achieved score of ${maxScore}`
            }
          }]);

        if (!error) {
          console.log('🏆 Perfect Score achievement unlocked!');
          await loadAchievements();
        } else {
          console.error('❌ Error unlocking Perfect Score:', error);
        }
      }

      // 5. Check for WEEK WARRIOR achievement (7 consecutive days)
      if (consecutiveDays >= 7 && !currentAchievements.includes('week_warrior')) {
        console.log('🎯 Checking Week Warrior achievement...');
        const { error } = await supabase
          .from('achievements')
          .insert([{
            user_id: user.id,
            achievement_type: 'week_warrior',
            metadata: { 
              consecutive_days: consecutiveDays,
              unlocked_date: new Date().toISOString(),
              description: `Completed scans for ${consecutiveDays} consecutive days`
            }
          }]);

        if (!error) {
          console.log('🏆 Week Warrior achievement unlocked!');
          await loadAchievements();
        } else {
          console.error('❌ Error unlocking Week Warrior:', error);
        }
      }

      // 6. Check for EXPERT achievement (5+ scans)
      if (scansUsed >= 5 && !currentAchievements.includes('expert')) {
        console.log('🎯 Checking Expert achievement...');
        const { error } = await supabase
          .from('achievements')
          .insert([{
            user_id: user.id,
            achievement_type: 'expert',
            metadata: { 
              total_scans: scansUsed,
              unlocked_date: new Date().toISOString(),
              description: `Completed ${scansUsed} scans`
            }
          }]);

        if (!error) {
          console.log('🏆 Expert achievement unlocked!');
          await loadAchievements();
        } else {
          console.error('❌ Error unlocking Expert:', error);
        }
      }

    } catch (err) {
      console.error('❌ Error checking achievements:', err);
    }
  };

  // Calculate consecutive days with scans
  const calculateConsecutiveDays = (): number => {
    if (!analyses || analyses.length === 0) return 0;

    // Sort analyses by date (newest first)
    const sortedAnalyses = [...analyses].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let consecutiveDays = 0;
    let currentDate = new Date(today);

    // Check backwards from today
    for (let i = 0; i < 30; i++) { // Check up to 30 days back
      const dateToCheck = new Date(currentDate);
      dateToCheck.setDate(currentDate.getDate() - i);

      // Check if there's a scan on this date
      const hasScanOnDate = sortedAnalyses.some(analysis => {
        const analysisDate = new Date(analysis.created_at);
        analysisDate.setHours(0, 0, 0, 0);
        return analysisDate.getTime() === dateToCheck.getTime();
      });

      if (hasScanOnDate) {
        consecutiveDays++;
      } else {
        // If we find a gap, stop counting
        break;
      }
    }

    console.log(`📅 Consecutive days calculation: ${consecutiveDays} days`);
    return consecutiveDays;
  };

  const getAchievements = () => {
    return achievements;
  };

  return (
    <AnalysisContext.Provider
      value={{
        scansUsed,
        totalScans,
        addAnalysis,
        getRecentAnalyses,
        getWeeklyScanData,
        getAchievements,
        checkAndUnlockAchievements,
        isLoading,
        error,
        todayAnalyzed,
        weeklyScans,
        markTodayAsAnalyzed,
        forceCleanStart,
        analyses,
        latestAnalysis,
        showPremiumPopup,
        setShowPremiumPopup,
        loadUserScans,
        isAddingAnalysis,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}; 