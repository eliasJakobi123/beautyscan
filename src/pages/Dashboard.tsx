import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  Upload,
  X,
  Zap,
  Settings,
  Archive,
  Crown,
  Star,
  TrendingUp,
  BarChart3,
  Sparkles,
  Bell,
  MoreHorizontal,
  User,
  Heart,
  Eye,
  Trophy,
  Award,
  Check,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import PremiumSubscriptionPopup from "@/components/PremiumSubscriptionPopup";
import BottomNavigation from "@/components/BottomNavigation";
import { useAnalysis } from "@/context/AnalysisContext";

const Dashboard = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const { analyses, latestAnalysis, getRecentAnalyses, isLoading, getWeeklyScanData } = useAnalysis();
  const weekData = getWeeklyScanData();
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleUploadPhoto = () => {
    setShowUploadModal(false);
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  const handleSelectPhoto = () => {
    setShowUploadModal(false);
    if (galleryInputRef.current) {
      galleryInputRef.current.click();
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      navigate("/analysis", { state: { image: file } });
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };
  
  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-400";
    if (score >= 60) return "bg-yellow-400";
    return "bg-red-400";
  };

  // Hilfsfunktion: Top 3 Scans nach Score
  const topScans = [...analyses]
    .sort((a, b) => (b.scores?.overall ?? 0) - (a.scores?.overall ?? 0))
    .slice(0, 3);
  // Kategorie-Label für Demo (z.B. Best Skin Glow)
  const getBestCategory = (scan) => {
    if (!scan?.scores) return "-";
    const categories = [
      { key: "skin", label: "Skin Glow", value: scan.scores.skin?.purity ?? 0 },
      { key: "makeup", label: "Makeup Coverage", value: scan.scores.makeup?.coverage ?? 0 },
      { key: "lips", label: "Lip Care", value: scan.scores.lips?.condition ?? 0 },
      { key: "eyes", label: "Eye Freshness", value: scan.scores.eyes?.concealer ?? 0 },
    ];
    return categories.sort((a, b) => b.value - a.value)[0].label;
  };
  // Prüfe, ob ein neuer Highscore erreicht wurde (letzter Scan ist Top 1)
  const isNewHighscore = analyses.length > 0 && analyses[0].id === topScans[0]?.id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-y-auto">
      {/* Decorative Blur Elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-beauty-rose/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-beauty-violet/20 rounded-full blur-2xl animate-pulse delay-1000" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-beauty-nude/20 rounded-full blur-xl animate-pulse delay-500" />

      <div className="relative z-10 pt-8 pb-24">
        {/* Hidden file inputs für Upload */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
          capture="user"
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
        {/* Header with Settings */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between px-6 mb-8"
        >
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl font-bold font-poppins text-white/90"
          >
            BeautyScan
          </motion.h1>
          <button
            onClick={() => navigate("/settings")}
            className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white hover:bg-white/15 transition-all duration-300 hover:scale-105"
          >
            <Settings className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Weekly Consistency Section */}
        <div className="px-6 mb-8">
          <div className="bg-gray-800/80 rounded-2xl p-6 shadow-xl border border-white/10 mb-2">
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
        </div>

        {/* Main Upload Button - Large Circle */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
          className="flex flex-col items-center justify-center mb-14 mt-6 px-6"
        >
          <motion.button
            onClick={() => setShowUploadModal(true)}
            className="w-40 h-40 bg-gradient-to-br from-pink-400 via-rose-300 to-violet-400 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden group mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 40px rgba(244, 194, 194, 0.6)",
                "0 0 60px rgba(160, 132, 220, 0.6)",
                "0 0 40px rgba(244, 194, 194, 0.6)",
              ],
            }}
            transition={{
              boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            {/* Multiple pulse effects for more beauty */}
            <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent animate-pulse" />

            {/* Main icon */}
            <Camera className="w-16 h-16 text-white relative z-10" />

            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            {/* Inner glow */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/10 to-transparent" />
          </motion.button>

          {/* Text underneath the button */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-white font-bold font-poppins text-lg text-center"
          >
            Upload Photo
          </motion.span>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-zinc-400 font-nunito text-sm text-center mt-1"
          >
            Start your beauty analysis now
          </motion.p>
        </motion.div>

        {/* Last Analysis Results */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="px-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold font-poppins text-white">
              Latest Analysis Results
            </h3>
            <button
              onClick={() => navigate("/history")}
              className="text-beauty-rose hover:text-beauty-rose/80 transition-colors p-2 hover:bg-white/10 rounded-xl"
            >
              <Archive className="w-5 h-5" />
            </button>
          </div>
          {isLoading ? (
            <div className="text-zinc-400 text-center py-8">Loading...</div>
          ) : !latestAnalysis ? (
            <div className="text-zinc-400 text-center py-8">No scans yet – start your first analysis to see your results here!</div>
          ) : (
            <div className="bg-gray-800/80 rounded-2xl p-6 shadow-xl border border-white/10">
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
                      className={`text-lg font-bold ${getScoreColor(latestAnalysis.scores?.overall ?? 0)}`}
                    >
                      {latestAnalysis.scores?.overall ?? 0}/100
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
                            className={`h-full ${getProgressColor(Math.round(Object.values(latestAnalysis.scores?.skin ?? {}).reduce((a, b) => a + b, 0) / (Object.values(latestAnalysis.scores?.skin ?? {}).length || 1)))} transition-all duration-500`}
                            style={{ width: `${Math.round(Object.values(latestAnalysis.scores?.skin ?? {}).reduce((a, b) => a + b, 0) / (Object.values(latestAnalysis.scores?.skin ?? {}).length || 1))}%` }}
                          />
                        </div>
                        <span
                          className={`text-xs ${getScoreColor(Math.round(Object.values(latestAnalysis.scores?.skin ?? {}).reduce((a, b) => a + b, 0) / (Object.values(latestAnalysis.scores?.skin ?? {}).length || 1)))}`}
                        >
                          {Math.round(Object.values(latestAnalysis.scores?.skin ?? {}).reduce((a, b) => a + b, 0) / (Object.values(latestAnalysis.scores?.skin ?? {}).length || 1))}
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
                            className={`h-full ${getProgressColor(Math.round(Object.values(latestAnalysis.scores?.lips ?? {}).reduce((a, b) => a + b, 0) / (Object.values(latestAnalysis.scores?.lips ?? {}).length || 1)))} transition-all duration-500`}
                            style={{ width: `${Math.round(Object.values(latestAnalysis.scores?.lips ?? {}).reduce((a, b) => a + b, 0) / (Object.values(latestAnalysis.scores?.lips ?? {}).length || 1))}%` }}
                          />
                        </div>
                        <span
                          className={`text-xs ${getScoreColor(Math.round(Object.values(latestAnalysis.scores?.lips ?? {}).reduce((a, b) => a + b, 0) / (Object.values(latestAnalysis.scores?.lips ?? {}).length || 1)))}`}
                        >
                          {Math.round(Object.values(latestAnalysis.scores?.lips ?? {}).reduce((a, b) => a + b, 0) / (Object.values(latestAnalysis.scores?.lips ?? {}).length || 1))}
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
                            className={`h-full ${getProgressColor(Math.round(Object.values(latestAnalysis.scores?.eyes ?? {}).reduce((a, b) => a + b, 0) / (Object.values(latestAnalysis.scores?.eyes ?? {}).length || 1)))} transition-all duration-500`}
                            style={{ width: `${Math.round(Object.values(latestAnalysis.scores?.eyes ?? {}).reduce((a, b) => a + b, 0) / (Object.values(latestAnalysis.scores?.eyes ?? {}).length || 1))}%` }}
                          />
                        </div>
                        <span
                          className={`text-xs ${getScoreColor(Math.round(Object.values(latestAnalysis.scores?.eyes ?? {}).reduce((a, b) => a + b, 0) / (Object.values(latestAnalysis.scores?.eyes ?? {}).length || 1)))}`}
                        >
                          {Math.round(Object.values(latestAnalysis.scores?.eyes ?? {}).reduce((a, b) => a + b, 0) / (Object.values(latestAnalysis.scores?.eyes ?? {}).length || 1))}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Top Scans Ranking Section - gleiche Breite/Hintergrund wie Last Analysis Results */}
        <div className="px-6 mb-8">
          <div className="bg-gray-800/80 rounded-2xl p-6 shadow-xl border border-white/10 relative overflow-hidden">
            {/* Confetti Animation (nur bei neuem Highscore) */}
            {isNewHighscore && (
              <div className="absolute inset-0 pointer-events-none z-10 animate-fadeIn">
                <Sparkles className="absolute top-4 left-8 text-yellow-400 animate-pulse" size={24} />
                <Sparkles className="absolute top-2 right-12 text-yellow-300 animate-pulse delay-200" size={18} />
                <Sparkles className="absolute bottom-6 left-1/2 text-yellow-400 animate-pulse delay-500" size={20} />
                <Sparkles className="absolute bottom-2 right-8 text-yellow-300 animate-pulse delay-700" size={14} />
              </div>
            )}
            <h2 className="text-xl md:text-2xl font-extrabold text-white font-poppins mb-1 text-center">Your Top 3 Scans</h2>
            <p className="text-center text-white font-medium mb-4">Celebrate your best results!</p>
            <div className="flex flex-col md:flex-row md:space-x-4 gap-4 items-center justify-center w-full">
              {topScans.map((scan, idx) => {
                // Farben und Umrandungen je Platz
                const borderColors = ["border-[#FFD700]", "border-[#C0C0C0]", "border-[#CD7F32]"];
                const percentColors = ["text-[#FFD700]", "text-[#C0C0C0]", "text-[#CD7F32]"];
                const desktopHeights = ["md:h-32", "md:h-40", "md:h-28"];
                const desktopTranslateY = ["md:translate-y-4", "", "md:translate-y-7"];
                const zIndex = idx === 0 ? "z-20" : "z-10";
                return (
                  <motion.div
                    key={scan.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.15, duration: 0.7, type: "spring" }}
                    className={`relative flex-1 w-full max-w-[220px] bg-gray-900/80 rounded-xl shadow p-3 flex flex-col items-center border-2 ${borderColors[idx] ?? 'border-gray-700'} ${desktopHeights[idx] ?? ''} ${desktopTranslateY[idx] ?? ''} ${zIndex} mx-auto`}
                  >
                    {/* Platzierungs-Icon */}
                    <div className="flex items-center justify-center w-full mb-1">
                      {idx === 0 ? (
                        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-yellow-700 to-yellow-400 shadow-lg border-2 border-[#FFD700] animate-crown-glow">
                          <Crown className="text-[#FFD700] animate-sparkle" size={20} />
                        </span>
                      ) : idx === 1 ? (
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-300 shadow border border-[#C0C0C0]">
                          <Award className="text-[#C0C0C0]" size={16} />
                        </span>
                      ) : (
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-yellow-900 to-[#CD7F32] shadow border border-[#CD7F32]">
                          <Trophy className="text-[#CD7F32]" size={13} />
                        </span>
                      )}
                    </div>
                    {/* Blurred Silhouette */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center mb-1 mt-1 overflow-hidden shadow-inner">
                      <svg width="36" height="36" viewBox="0 0 60 60" className="blur-sm opacity-60">
                        <ellipse cx="30" cy="22" rx="14" ry="16" fill="#E0AFA0" />
                        <ellipse cx="30" cy="48" rx="18" ry="10" fill="#F8E1E7" />
                      </svg>
                    </div>
                    {/* Score */}
                    <div className={`text-2xl font-extrabold mb-1 drop-shadow-lg text-center ${percentColors[idx] ?? 'text-white'}`}>{scan.scores?.overall ?? 0}%</div>
                    <div className="text-xs text-white mb-1 text-center">{scan.date}</div>
                    {/* Nur beim ersten Platz: Congrats! */}
                    {idx === 0 && (
                      <div className="text-xs text-white italic text-center mb-1">Congrats! This is your best skin yet!</div>
                    )}
                  </motion.div>
                );
              })}
              {topScans.length === 0 && (
                <div className="text-center text-white font-semibold py-8 w-full">No scans yet – your Hall of Fame will appear here!</div>
              )}
            </div>
            <div className="text-xs text-center text-white mt-4">No user images are saved. Only your scores and scan dates are shown for privacy.</div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-800 rounded-2xl p-6 w-full max-w-sm border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold font-poppins text-white mb-6 text-center">
                Select Photo for Analysis
              </h3>

              <div className="space-y-4">
                <button
                  onClick={handleUploadPhoto}
                  className="w-full p-4 bg-gradient-to-r from-beauty-rose to-beauty-violet text-white font-bold font-poppins rounded-2xl flex items-center justify-center space-x-3 hover:from-beauty-rose/90 hover:to-beauty-violet/90 transition-all duration-300 shadow-xl"
                >
                  <Camera className="w-5 h-5" />
                  <span>Use Camera</span>
                </button>

                <button
                  onClick={handleSelectPhoto}
                  className="w-full p-4 bg-white/10 border border-white/20 text-white font-bold font-poppins rounded-2xl flex items-center justify-center space-x-3 hover:bg-white/15 transition-all duration-300"
                >
                  <Upload className="w-5 h-5" />
                  <span>Choose from Gallery</span>
                </button>
              </div>

              <button
                onClick={() => setShowUploadModal(false)}
                className="w-full mt-4 p-3 text-zinc-400 hover:text-white transition-colors text-sm"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

        {/* Premium Popup */}
      <PremiumSubscriptionPopup
        isOpen={showPremiumPopup}
        onClose={() => setShowPremiumPopup(false)}
        onUpgrade={(plan) => {
          setShowPremiumPopup(false);
          console.log("Upgrade to Premium:", plan);
        }}
      />

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Dashboard;