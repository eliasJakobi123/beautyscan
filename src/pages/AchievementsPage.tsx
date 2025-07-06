import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Award,
  Crown,
  Star,
  Target,
  TrendingUp,
  Zap,
  Lock,
} from 'lucide-react';
import { useAnalysis } from '@/context/AnalysisContext';
import BottomNavigation from '@/components/BottomNavigation';

const AchievementsPage = () => {
  const {
    getAchievements,
    analyses,
    todayAnalyzed,
    getWeeklyScanData,
  } = useAnalysis();
  const navigate = useNavigate();
  const achievements = getAchievements();
  const weekData = getWeeklyScanData();

  const hasWeekWarrior = achievements.some(a => a.achievement_type === 'week_warrior');
  const hasPerfectScore = achievements.some(a => a.achievement_type === 'perfect_score');
  const hasDailyStreak = achievements.some(a => a.achievement_type === 'daily_streak');
  const hasExpert = achievements.some(a => a.achievement_type === 'expert');
  const hasFirstScan = achievements.some(a => a.achievement_type === 'first_scan');
  const hasConsistentUser = achievements.some(a => a.achievement_type === 'consistent_user');

  const achievementsData = [
    {
      id: 1,
      icon: Zap,
      title: "First Scan",
      description: "Complete your first beauty analysis",
      unlocked: hasFirstScan,
      color: "green-500",
      progress: analyses.length >= 1 ? 100 : 0,
    },
    {
      id: 2,
      icon: Target,
      title: "Daily Streak",
      description: "Analyze your beauty every day",
      unlocked: hasDailyStreak,
      color: "beauty-rose",
      progress: todayAnalyzed ? 100 : 0,
    },
    {
      id: 3,
      icon: TrendingUp,
      title: "Consistent User",
      description: "Maintain regular beauty tracking",
      unlocked: hasConsistentUser,
      color: "blue-500",
      progress: Math.min((weekData.filter(day => day.hasAnalysis).length / 3) * 100, 100),
    },
    {
      id: 4,
      icon: Star,
      title: "Perfect Score",
      description: "Achieve a 90+ beauty score",
      unlocked: hasPerfectScore,
      color: "yellow-400",
      progress: analyses && analyses.some(a => a.scores.overall >= 90) ? 100 : 0,
    },
    {
      id: 5,
      icon: Award,
      title: "Week Warrior",
      description: "Complete 7 days of analysis",
      unlocked: hasWeekWarrior,
      color: "beauty-violet",
      progress: Math.min((weekData.filter(day => day.hasAnalysis).length / 7) * 100, 100),
    },
    {
      id: 6,
      icon: Crown,
      title: "Beauty Expert",
      description: "Complete 5 beauty analyses",
      unlocked: hasExpert,
      color: "purple-500",
      progress: Math.min((analyses.length / 5) * 100, 100),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-beauty-rose to-beauty-violet p-6"
      >
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/history')}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold font-poppins">Achievements</h1>
        </div>
      </motion.div>

      <div className="p-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementsData.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className={`rounded-2xl p-6 shadow-xl border border-white/10 relative overflow-hidden ${
                achievement.unlocked ? 'bg-gray-800/80' : 'bg-gray-800/40'
              }`}
            >
              {achievement.unlocked ? (
                <div className={`absolute top-4 right-4 text-${achievement.color}`}>
                  <Award className="w-6 h-6" />
                </div>
              ) : (
                <div className="absolute top-4 right-4 text-gray-500">
                  <Lock className="w-6 h-6" />
                </div>
              )}
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  achievement.unlocked ? `bg-${achievement.color}` : 'bg-gray-700'
                }`}
              >
                <achievement.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold font-poppins mb-2">{achievement.title}</h3>
              <p className="text-sm font-nunito text-zinc-400 mb-4 h-10">{achievement.description}</p>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className={`${achievement.unlocked ? `bg-${achievement.color}` : 'bg-gray-600'} h-2.5 rounded-full`}
                  style={{ width: `${achievement.progress}%` }}
                ></div>
              </div>
              {achievement.unlocked && (
                <p className="text-xs text-center mt-2 text-green-400">Unlocked!</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default AchievementsPage; 