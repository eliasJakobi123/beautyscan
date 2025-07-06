import React, { useState } from "react";
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
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import PremiumSubscriptionPopup from "@/components/PremiumSubscriptionPopup";
import BottomNavigation from "@/components/BottomNavigation";

const Dashboard = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [userType] = useState<"free" | "premium">("free");
  const [scansUsed] = useState(3);
  const [totalScans] = useState(5);

  const [analyses] = useState([
    {
      id: 1,
      image: "/placeholder.svg",
      date: "15.01.2024",
      scores: {
        skinType: 78,
        lips: 85,
        eyes: 72,
        overall: 78,
      },
      mainCategory: "Hautbild",
      status: "Gut",
      improvement: "+8%",
    },
    {
      id: 2,
      image: "/placeholder.svg",
      date: "10.01.2024",
      scores: {
        skinType: 86,
        lips: 90,
        eyes: 88,
        overall: 88,
      },
      mainCategory: "Ausstrahlung",
      status: "Exzellent",
      improvement: "+12%",
    },
    {
      id: 3,
      image: "/placeholder.svg",
      date: "05.01.2024",
      scores: {
        skinType: 64,
        lips: 70,
        eyes: 58,
        overall: 64,
      },
      mainCategory: "Make-up",
      status: "Mittel",
      improvement: "+5%",
    },
  ]);

  const handleUploadPhoto = () => {
    setShowUploadModal(false);
    navigate("/analysis");
  };

  const handleSelectPhoto = () => {
    setShowUploadModal(false);
    navigate("/analysis");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Decorative Blur Elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-beauty-rose/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-beauty-violet/20 rounded-full blur-2xl animate-pulse delay-1000" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-beauty-nude/20 rounded-full blur-xl animate-pulse delay-500" />

      {/* Sticky Announcement Bar for Free Users */}
      <AnimatePresence>
        {showAnnouncementBar && userType === "free" && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="sticky top-0 left-0 right-0 z-50 bg-pink-500 text-white text-sm font-bold shadow-lg"
          >
            <div className="flex justify-between items-center py-3 px-4">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Bell className="w-4 h-4" />
                </motion.div>
                <span>
                  {scansUsed} von {totalScans} Scans genutzt – Upgrade auf
                  Premium
                </span>
              </div>

              {/* Animated Progress Circle */}
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8">
                  <svg
                    className="w-8 h-8 transform -rotate-90"
                    viewBox="0 0 32 32"
                  >
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      className="text-white/30"
                    />
                    <motion.circle
                      cx="16"
                      cy="16"
                      r="14"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      className="text-white"
                      strokeDasharray={87.96}
                      initial={{ strokeDashoffset: 87.96 }}
                      animate={{
                        strokeDashoffset:
                          87.96 - (87.96 * scansUsed) / totalScans,
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                    {scansUsed}
                  </div>
                </div>

                <button
                  onClick={() => setShowPremiumPopup(true)}
                  className="bg-white text-pink-500 px-3 py-1 rounded-xl text-xs font-bold shadow-sm hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
                >
                  Upgrade →
                </button>
                <button
                  onClick={() => setShowAnnouncementBar(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`relative z-10 ${showAnnouncementBar && userType === "free" ? "pt-6" : "pt-8"} pb-24`}
      >
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

        {/* Main Upload Button - Large Circle */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
          className="flex flex-col items-center justify-center mb-12 px-6"
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
            {t("uploadImage")}
          </motion.span>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-zinc-400 font-nunito text-sm text-center mt-1"
          >
            {t("startBeautyAnalysis")}
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
              {t("lastAnalyses")}
            </h3>
            <button
              onClick={() => navigate("/history")}
              className="text-beauty-rose hover:text-beauty-rose/80 transition-colors p-2 hover:bg-white/10 rounded-xl"
            >
              <Archive className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {analyses.map((analysis, index) => (
              <motion.div
                key={analysis.id}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1 + index * 0.15, duration: 0.5 }}
                onClick={() => navigate("/results")}
                className="bg-gray-800/80 rounded-2xl p-4 shadow-lg hover:bg-gray-700/80 transition-all duration-300 cursor-pointer group overflow-hidden relative border border-white/10"
              >
                <div className="flex items-center space-x-4">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                    <Camera className="w-8 h-8 text-gray-300" />
                  </div>

                  {/* Analysis Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-bold font-poppins text-white">
                        {analysis.date}
                      </p>
                      <span
                        className={`text-sm font-semibold ${getScoreColor(analysis.scores.overall)}`}
                      >
                        {analysis.scores.overall}/100
                      </span>
                    </div>

                    {/* Score Bars */}
                    <div className="space-y-1 mb-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-400">{t("skinType")}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-1 bg-gray-600 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${getProgressColor(analysis.scores.skinType)} transition-all duration-500`}
                              style={{ width: `${analysis.scores.skinType}%` }}
                            />
                          </div>
                          <span
                            className={`text-xs ${getScoreColor(analysis.scores.skinType)}`}
                          >
                            {analysis.scores.skinType}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-400">{t("lips")}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-1 bg-gray-600 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${getProgressColor(analysis.scores.lips)} transition-all duration-500`}
                              style={{ width: `${analysis.scores.lips}%` }}
                            />
                          </div>
                          <span
                            className={`text-xs ${getScoreColor(analysis.scores.lips)}`}
                          >
                            {analysis.scores.lips}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-400">{t("eyes")}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-1 bg-gray-600 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${getProgressColor(analysis.scores.eyes)} transition-all duration-500`}
                              style={{ width: `${analysis.scores.eyes}%` }}
                            />
                          </div>
                          <span
                            className={`text-xs ${getScoreColor(analysis.scores.eyes)}`}
                          >
                            {analysis.scores.eyes}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* More Details Button */}
                    <button className="text-xs text-beauty-rose hover:text-beauty-rose/80 font-semibold flex items-center space-x-1">
                      <span>{t("moreDetails")}</span>
                      <MoreHorizontal className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
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
                {t("photoForAnalysis")}
              </h3>

              <div className="space-y-4">
                <button
                  onClick={handleUploadPhoto}
                  className="w-full p-4 bg-gradient-to-r from-beauty-rose to-beauty-violet text-white font-bold font-poppins rounded-2xl flex items-center justify-center space-x-3 hover:from-beauty-rose/90 hover:to-beauty-violet/90 transition-all duration-300 shadow-xl"
                >
                  <Camera className="w-5 h-5" />
                  <span>{t("useCamera")}</span>
                </button>

                <button
                  onClick={handleSelectPhoto}
                  className="w-full p-4 bg-white/10 border border-white/20 text-white font-bold font-poppins rounded-2xl flex items-center justify-center space-x-3 hover:bg-white/15 transition-all duration-300"
                >
                  <Upload className="w-5 h-5" />
                  <span>{t("chooseFromGallery")}</span>
                </button>
              </div>

              <button
                onClick={() => setShowUploadModal(false)}
                className="w-full mt-4 p-3 text-zinc-400 hover:text-white transition-colors text-sm"
              >
                {t("cancel")}
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
