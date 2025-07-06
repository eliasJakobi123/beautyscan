import React, { useState, useEffect } from "react";
import { motion, animate } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  Check,
  Clock,
  Trophy,
  Zap,
  Star,
  Target,
  Award,
  Eye,
  Heart,
  User,
  TrendingUp,
  Crown,
  Lock,
  Share2,
  Frown,
  Sparkles,
  Dot,
  Layers,
  Palette,
  Smile
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAnalysis } from "@/context/AnalysisContext";
import BottomNavigation from "@/components/BottomNavigation";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { RatingItem } from "./ResultsPage";

const getScoreColor = (score: number) => {
  if (score > 80) return '#10b981'; // grün
  if (score > 60) return '#f59e0b'; // orange
  return '#ef4444'; // rot
};

const History = () => {
  const [showAchievements, setShowAchievements] = useState(false);
  const { t } = useLanguage();
  const { 
    getRecentAnalyses, 
    todayAnalyzed, 
    getWeeklyScanData,
    getAchievements,
    analyses,
    setShowPremiumPopup,
    isLoading,
  } = useAnalysis();
  const navigate = useNavigate();
  const { isPremium } = useAuth();

  const weekData = getWeeklyScanData();
  const recentAnalyses = getRecentAnalyses();
  const achievements = getAchievements();

  const achievementDetails: { [key: string]: { icon: React.ElementType; title: string } } = {
    first_scan: { icon: Star, title: 'First Scan Completed' },
    daily_streak: { icon: Zap, title: 'Daily Streak' },
    week_warrior: { icon: Trophy, title: 'Week Warrior' },
    perfect_score: { icon: Crown, title: 'Perfect Score' },
    expert: { icon: Award, title: 'Scan Expert' },
    consistent_user: { icon: TrendingUp, title: 'Consistent User' },
  };

  const hasWeekWarrior = achievements.some(a => a.achievement_type === 'week_warrior');
  const hasPerfectScore = achievements.some(a => a.achievement_type === 'perfect_score');
  const hasDailyStreak = achievements.some(a => a.achievement_type === 'daily_streak');
  const hasExpert = achievements.some(a => a.achievement_type === 'expert');
  const hasFirstScan = achievements.some(a => a.achievement_type === 'first_scan');
  const hasConsistentUser = achievements.some(a => a.achievement_type === 'consistent_user');

  const latestAnalysis = recentAnalyses.length > 0 ? recentAnalyses[0] : null;

  const getLatestAnalysisScores = () => {
    if (!latestAnalysis || !latestAnalysis.scores) {
      return { skin: 0, lips: 0, eyes: 0, overall: 0 };
    }
    const { scores } = latestAnalysis;
    const skin = Math.round(Object.values(scores.skin).reduce((a, b) => a + b, 0) / Object.values(scores.skin).length);
    const lips = Math.round(Object.values(scores.lips).reduce((a, b) => a + b, 0) / Object.values(scores.lips).length);
    const eyes = Math.round(Object.values(scores.eyes).reduce((a, b) => a + b, 0) / Object.values(scores.eyes).length);
    return { skin, lips, eyes, overall: scores.overall };
  };
  const latestAnalysisScores = getLatestAnalysisScores();

  const recentAnalysesDisplay = recentAnalyses.map((analysis) => {
    const overall = analysis.scores?.overall ?? 0;
    let color = "text-green-400";
    if (overall < 70) color = "text-red-400";
    else if (overall < 80) color = "text-yellow-400";
    
    return {
      id: analysis.id,
      date: analysis.date,
      overall,
      color,
    };
  });

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-400";
    if (score >= 60) return "bg-yellow-400";
    return "bg-red-400";
  };
    
  const getAnalysisColorClass = (color: string) => {
    switch (color) {
      case "text-green-400":
        return "bg-green-400";
      case "text-yellow-400":
        return "bg-yellow-400";
      case "text-red-400":
        return "bg-red-400";
      default:
        return "bg-gray-400";
    }
  };

  const [scanHistoryLimit, setScanHistoryLimit] = useState(5);
  const maxScanHistory = 30;
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="bg-gray-900 text-white min-h-screen font-nunito">
      <div className="container mx-auto p-4 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate("/dashboard")} className="p-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold font-poppins text-white">
            Analysis History
          </h1>
          <button onClick={() => navigate('/achievements')} className="p-2">
            <Trophy className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-8">
          {/* Weekly Consistency */}
          <div className="bg-gray-800/80 rounded-2xl p-6 shadow-xl border border-white/10 mb-8">
            <h2 className="text-lg font-bold font-poppins text-white mb-4">Weekly Consistency</h2>
            <div className="flex justify-between items-center">
              {weekData.map((day, idx) => (
                <div key={day.day} className="flex flex-col items-center">
                  <span className="text-xs text-zinc-400 mb-1">{day.day.charAt(0).toUpperCase() + day.day.slice(1,3)}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${day.hasAnalysis ? 'bg-beauty-violet border-beauty-violet' : 'bg-gray-700 border-gray-600'}`}>
                    {day.hasAnalysis ? <Check className="text-white w-5 h-5" /> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Analysis */}
          {latestAnalysis && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-gray-800/80 rounded-2xl p-6 shadow-xl border border-white/10 cursor-pointer"
              onClick={() => { setSelectedAnalysis(latestAnalysis); setShowDialog(true); }}
            >
              <h2 className="text-lg font-bold font-poppins text-white mb-4">
                Latest Analysis Results
              </h2>

              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                  <Camera className="w-10 h-10 text-gray-300" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-bold font-poppins text-white">
                      {latestAnalysis.date} • {latestAnalysis.time}
                    </p>
                    <span
                      className={`text-lg font-bold ${getScoreColor(latestAnalysisScores.overall)}`}
                    >
                      {latestAnalysisScores.overall}/100
                    </span>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-zinc-400" />
                        <span className="text-xs font-nunito text-zinc-400">
                          Skin Health
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-12 h-1 bg-gray-600 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getProgressColor(latestAnalysisScores.skin)} transition-all duration-500`}
                            style={{
                              width: `${latestAnalysisScores.skin}%`,
                            }}
                          />
                        </div>
                        <span
                          className={`text-xs ${getScoreColor(latestAnalysisScores.skin)}`}
                        >
                          {latestAnalysisScores.skin}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-zinc-400" />
                        <span className="text-xs font-nunito text-zinc-400">
                          Lip Condition
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-12 h-1 bg-gray-600 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getProgressColor(latestAnalysisScores.lips)} transition-all duration-500`}
                            style={{ width: `${latestAnalysisScores.lips}%` }}
                          />
                        </div>
                        <span
                          className={`text-xs ${getScoreColor(latestAnalysisScores.lips)}`}
                        >
                          {latestAnalysisScores.lips}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-zinc-400" />
                        <span className="text-xs font-nunito text-zinc-400">
                          Eye Area
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-12 h-1 bg-gray-600 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getProgressColor(latestAnalysisScores.eyes)} transition-all duration-500`}
                            style={{ width: `${latestAnalysisScores.eyes}%` }}
                          />
                        </div>
                        <span
                          className={`text-xs ${getScoreColor(latestAnalysisScores.eyes)}`}
                        >
                          {latestAnalysisScores.eyes}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <button
                      onClick={() => navigate(`/analysis/${latestAnalysis.id}`)}
                      className="text-xs text-beauty-rose hover:text-beauty-rose/80 font-semibold font-poppins"
                    >
                      View Details →
                    </button>
                    <button
                      onClick={() => navigate(`/share/${latestAnalysis.id}`)}
                      className="flex items-center space-x-1.5 text-xs text-white/70 bg-gray-700/80 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Share2 className="w-3 h-3" />
                      <span>Share Results</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Achievements */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-gray-800/80 rounded-2xl p-6 shadow-xl border border-white/10"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold font-poppins text-white">
                Your Achievements
              </h2>
              <button
                onClick={() => navigate('/achievements')}
                className="text-xs text-beauty-rose hover:text-beauty-rose/80 font-semibold font-poppins"
              >
                View All →
              </button>
            </div>
            <div className="space-y-3">
              {achievements.length > 0 ? (
                achievements.slice(0, 3).map((achievement) => {
                  const details = achievementDetails[achievement.achievement_type];
                  if (!details) {
                    return null;
                  }
                  const Icon = details.icon;
                  return (
                    <div key={achievement.id} className="flex items-center space-x-4 bg-gray-700/50 p-3 rounded-lg">
                      <div className="flex-shrink-0 bg-gradient-to-br from-beauty-rose to-beauty-violet p-2 rounded-full">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-white">{details.title}</p>
                        <p className="text-xs text-white/70">{new Date(achievement.unlocked_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-6">
                  <p className="text-white/60">No achievements yet – start scanning to unlock your first badge!</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Scan History */}
          <div className="bg-gray-800/80 rounded-2xl p-6 shadow-xl border border-white/10">
            <h2 className="text-lg font-bold font-poppins text-white mb-4">Scan History</h2>
            {isLoading ? (
              <div className="text-zinc-400 text-center py-8">Loading...</div>
            ) : analyses.length === 0 ? (
              <div className="text-zinc-400 text-center py-8">No scans yet – start your first analysis!</div>
            ) : (
              <div className="space-y-4">
                {analyses.slice(0, scanHistoryLimit).map((analysis) => (
                  <div key={analysis.id} className="bg-gray-900/80 rounded-xl p-4 flex flex-col gap-2 border border-white/10 shadow hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => { setSelectedAnalysis(analysis); setShowDialog(true); }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-zinc-300 font-semibold">{analysis.date} {analysis.time}</span>
                      <span className="text-lg font-bold text-beauty-violet">{analysis.scores?.overall ?? 0}/100</span>
                    </div>
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-1">
                      <div
                        className={`h-full ${getProgressColor(analysis.scores?.overall ?? 0)} rounded-full transition-all duration-500`}
                        style={{ width: `${analysis.scores?.overall ?? 0}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <span>Skin: {analysis.scores?.skin?.purity ?? 0}</span>
                      <span>Makeup: {analysis.scores?.makeup?.coverage ?? 0}</span>
                      <span>Lips: {analysis.scores?.lips?.condition ?? 0}</span>
                      <span>Eyes: {analysis.scores?.eyes?.concealer ?? 0}</span>
                    </div>
                  </div>
                ))}
                {analyses.length > scanHistoryLimit && scanHistoryLimit < maxScanHistory && (
                  <button
                    className="w-full mt-4 py-2 bg-beauty-violet text-white rounded-xl font-bold shadow hover:bg-beauty-violet/90"
                    onClick={() => setScanHistoryLimit(l => Math.min(l + 5, maxScanHistory))}
                  >
                    Load more
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <BottomNavigation />
      {/* Scan-Detail Dialog */}
      <AnalysisResultDialog analysis={selectedAnalysis} open={showDialog} onClose={() => setShowDialog(false)} />
    </div>
  );
};

// Komponente für Scan-Detailanzeige im Dialog
const AnalysisResultDialog = ({ analysis, open, onClose }) => {
  const [motionValue, setMotionValue] = React.useState(0);
  React.useEffect(() => {
    if (!analysis || !analysis.scores) {
      setMotionValue(0);
      return;
    }
    setMotionValue(0);
    animate(0, analysis.scores.overall ?? 0, {
      duration: 1.2,
      onUpdate: v => setMotionValue(Math.round(v)),
    });
  }, [analysis]);

  if (!analysis || !analysis.scores) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-2xl p-3 shadow-xl border border-white/10 max-w-md w-full">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold font-poppins text-white">Scan Results</h2>
        </div>
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="relative w-32 h-32 mb-2 flex items-center justify-center">
            <svg width="128" height="128" shapeRendering="geometricPrecision">
              <circle cx="64" cy="64" r="56" fill="none" stroke="#e0e7ff" strokeWidth="10" />
              <motion.circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke={getScoreColor(analysis.scores?.overall ?? 0)}
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 56}
                strokeDashoffset={
                  motionValue !== undefined
                    ? (2 * Math.PI * 56 * (1 - motionValue / 100))
                    : (2 * Math.PI * 56 * (1 - (analysis.scores?.overall ?? 0) / 100))
                }
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.7s' }}
              />
            </svg>
            <span
              className="absolute inset-0 flex items-center justify-center text-2xl md:text-3xl font-bold"
              style={{ color: getScoreColor(analysis.scores?.overall ?? 0), letterSpacing: '0.02em', WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale', top: '4px' }}
            >
              {motionValue}%
            </span>
          </div>
          <span className="text-white/80 text-base font-semibold">Overall Score</span>
          <p className="text-gray-400 mt-2 max-w-md mx-auto text-center">
            {analysis.feedback?.overall || "No overall feedback available."}
          </p>
        </div>
        <section className="bg-gray-800/80 rounded-2xl p-4 shadow-xl border border-white/10 mb-4 w-full max-w-md mx-auto">
          <div className="flex items-center mb-3">
            <span className="w-5 h-5 text-beauty-violet mr-2">★</span>
            <h2 className="font-bold text-base text-white">Detailed Evaluation</h2>
          </div>
          <div className="space-y-2">
            <RatingItem icon={Frown} label="Skin Clarity & Texture" score={analysis.scores?.skin?.purity ?? 0} barWidth="w-24 md:w-32" />
            <RatingItem icon={Sparkles} label="Skin Hydration & Glow" score={analysis.scores?.skin?.moisture ?? 0} barWidth="w-24 md:w-32" />
            <RatingItem icon={Dot} label="Pore Appearance" score={analysis.scores?.skin?.pores ?? 0} barWidth="w-24 md:w-32" />
            <RatingItem icon={Layers} label="Makeup Coverage & Blending" score={analysis.scores?.makeup?.blending ?? 0} barWidth="w-24 md:w-32" />
            <RatingItem icon={Palette} label="Color Matching & Tone" score={analysis.scores?.makeup?.shade ?? 0} barWidth="w-24 md:w-32" />
            <RatingItem icon={Eye} label="Eye Area Freshness" score={analysis.scores?.eyes?.concealer ?? 0} barWidth="w-24 md:w-32" />
            <RatingItem icon={Smile} label="Lip Condition & Precision" score={analysis.scores?.lips?.condition ?? 0} barWidth="w-24 md:w-32" />
            <RatingItem icon={Star} label="Overall Harmony & Natural Look" score={analysis.scores?.impression?.naturalness ?? 0} barWidth="w-24 md:w-32" />
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default History;
