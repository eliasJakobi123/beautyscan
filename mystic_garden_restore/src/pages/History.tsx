import React, { useState } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import BottomNavigation from "@/components/BottomNavigation";

const History = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Mock data
  const [weekData] = useState([
    { day: "monday", hasAnalysis: true, date: "15.01" },
    { day: "tuesday", hasAnalysis: false, date: "16.01" },
    { day: "wednesday", hasAnalysis: true, date: "17.01" },
    { day: "thursday", hasAnalysis: false, date: "18.01" },
    { day: "friday", hasAnalysis: true, date: "19.01" },
    { day: "saturday", hasAnalysis: false, date: "20.01" },
    { day: "sunday", hasAnalysis: false, date: "21.01" },
  ]);

  const [latestAnalysis] = useState({
    date: "19.01.2024",
    time: "14:30",
    image: "/placeholder.svg",
    scores: {
      skinType: 78,
      lips: 85,
      eyes: 72,
      overall: 78,
    },
    feedback: {
      skin: "Deine Haut wirkt gesund und gepflegt",
      lips: "Perfekte Lippenkontur, sehr harmonisch",
      eyes: "Augen-Make-up könnte gleichmäßiger sein",
    },
  });

  const [recentAnalyses] = useState([
    {
      id: 1,
      date: "17.01",
      overall: 88,
      color: "green",
    },
    {
      id: 2,
      date: "15.01",
      overall: 76,
      color: "yellow",
    },
    {
      id: 3,
      date: "12.01",
      overall: 64,
      color: "red",
    },
    {
      id: 4,
      date: "10.01",
      overall: 82,
      color: "green",
    },
    {
      id: 5,
      date: "08.01",
      overall: 69,
      color: "yellow",
    },
  ]);

  const [achievements] = useState([
    {
      id: 1,
      icon: Zap,
      title: "Daily Streak",
      description: t("dailyStreak"),
      unlocked: true,
      color: "beauty-rose",
    },
    {
      id: 2,
      icon: Star,
      title: "Glanzleistung",
      description: t("perfectScore"),
      unlocked: true,
      color: "yellow-400",
    },
    {
      id: 3,
      icon: Target,
      title: "Comeback Queen",
      description: t("comeback"),
      unlocked: false,
      color: "beauty-violet",
    },
    {
      id: 4,
      icon: Award,
      title: "Pflege-Profi",
      description: t("expert"),
      unlocked: true,
      color: "green-400",
    },
  ]);

  const todayAnalyzed = weekData[new Date().getDay() - 1]?.hasAnalysis || false;

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

  const getAnalysisColorClass = (color: string) => {
    switch (color) {
      case "green":
        return "bg-green-400";
      case "yellow":
        return "bg-yellow-400";
      case "red":
        return "bg-red-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Decorative Blur Elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-beauty-rose/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-beauty-violet/20 rounded-full blur-2xl animate-pulse delay-1000" />

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-beauty-rose to-beauty-violet p-6"
      >
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl font-bold font-poppins text-white">
            {t("history")}
          </h1>
        </div>
      </motion.div>

      <div className="p-6 space-y-6 pb-24">
        {/* Weekly Progress */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="bg-gray-800/80 rounded-2xl p-6 shadow-xl border border-white/10"
        >
          <h2 className="text-lg font-bold font-poppins text-white mb-4">
            {t("weekProgress")}
          </h2>

          {/* Week Days */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {weekData.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                className="text-center"
              >
                <div className="text-xs font-nunito text-zinc-400 mb-2">
                  {t(day.day)}
                </div>
                <div className="text-xs font-nunito text-zinc-500 mb-2">
                  {day.date}
                </div>
                <div className="flex justify-center">
                  {day.hasAnalysis ? (
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-gray-600 rounded-full shadow-inner" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Status Message */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="text-center"
          >
            {todayAnalyzed ? (
              <p className="text-green-400 font-semibold font-nunito">
                {t("todayAnalysisDone")}
              </p>
            ) : (
              <div className="space-y-2">
                <p className="text-yellow-400 font-semibold font-nunito">
                  {t("noAnalysisToday")}
                </p>
                <button
                  onClick={() => navigate("/analysis")}
                  className="px-4 py-2 bg-gradient-to-r from-beauty-rose to-beauty-violet text-white font-bold font-poppins rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {t("startNow")}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Latest Analysis */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-gray-800/80 rounded-2xl p-6 shadow-xl border border-white/10"
        >
          <h2 className="text-lg font-bold font-poppins text-white mb-4">
            {t("latestAnalysis")}
          </h2>

          <div className="flex items-start space-x-4">
            {/* Image Preview */}
            <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
              <Camera className="w-10 h-10 text-gray-300" />
            </div>

            {/* Analysis Details */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-bold font-poppins text-white">
                  {latestAnalysis.date} • {latestAnalysis.time}
                </p>
                <span
                  className={`text-lg font-bold ${getScoreColor(latestAnalysis.scores.overall)}`}
                >
                  {latestAnalysis.scores.overall}/100
                </span>
              </div>

              {/* Score Categories */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-zinc-400" />
                    <span className="text-xs font-nunito text-zinc-400">
                      {t("skinType")}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-1 bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getProgressColor(latestAnalysis.scores.skinType)} transition-all duration-500`}
                        style={{
                          width: `${latestAnalysis.scores.skinType}%`,
                        }}
                      />
                    </div>
                    <span
                      className={`text-xs ${getScoreColor(latestAnalysis.scores.skinType)}`}
                    >
                      {latestAnalysis.scores.skinType}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-zinc-400" />
                    <span className="text-xs font-nunito text-zinc-400">
                      {t("lips")}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-1 bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getProgressColor(latestAnalysis.scores.lips)} transition-all duration-500`}
                        style={{ width: `${latestAnalysis.scores.lips}%` }}
                      />
                    </div>
                    <span
                      className={`text-xs ${getScoreColor(latestAnalysis.scores.lips)}`}
                    >
                      {latestAnalysis.scores.lips}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-zinc-400" />
                    <span className="text-xs font-nunito text-zinc-400">
                      {t("eyes")}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-1 bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getProgressColor(latestAnalysis.scores.eyes)} transition-all duration-500`}
                        style={{ width: `${latestAnalysis.scores.eyes}%` }}
                      />
                    </div>
                    <span
                      className={`text-xs ${getScoreColor(latestAnalysis.scores.eyes)}`}
                    >
                      {latestAnalysis.scores.eyes}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Feedback */}
              <div className="space-y-1 mb-3">
                <p className="text-xs font-nunito text-zinc-300 leading-relaxed">
                  "{latestAnalysis.feedback.skin}"
                </p>
              </div>

              {/* Details Button */}
              <button
                onClick={() => navigate("/results")}
                className="text-xs text-beauty-rose hover:text-beauty-rose/80 font-semibold font-poppins"
              >
                {t("viewDetails")} →
              </button>
            </div>
          </div>
        </motion.div>

        {/* Recent Analyses Scroll */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-gray-800/80 rounded-2xl p-6 shadow-xl border border-white/10"
        >
          <h2 className="text-lg font-bold font-poppins text-white mb-4">
            {t("recentAnalyses")}
          </h2>

          <div className="flex space-x-3 overflow-x-auto pb-2">
            {recentAnalyses.map((analysis, index) => (
              <motion.div
                key={analysis.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                className="flex-shrink-0 w-24 bg-gray-700/50 rounded-xl p-3 text-center cursor-pointer hover:bg-gray-700 transition-colors"
                onClick={() => navigate("/results")}
              >
                <div className="text-xs font-nunito text-zinc-400 mb-2">
                  {analysis.date}
                </div>
                <div
                  className={`w-8 h-8 ${getAnalysisColorClass(analysis.color)} rounded-full mx-auto mb-2 flex items-center justify-center`}
                >
                  <span className="text-xs font-bold text-white">
                    {analysis.overall}
                  </span>
                </div>
                <button className="text-xs text-beauty-rose font-semibold">
                  {t("compare")}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="bg-gray-800/80 rounded-2xl p-6 shadow-xl border border-white/10"
        >
          <h2 className="text-lg font-bold font-poppins text-white mb-4">
            {t("achievements")}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  achievement.unlocked
                    ? "bg-gradient-to-br from-white/10 to-white/5 border border-white/20"
                    : "bg-gray-700/30 border border-gray-600/30"
                } relative overflow-hidden`}
              >
                {/* Glitter effect for unlocked achievements */}
                {achievement.unlocked && (
                  <motion.div
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-1 right-1 text-yellow-400"
                  >
                    ✨
                  </motion.div>
                )}

                <div className="text-center">
                  <div
                    className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                      achievement.unlocked
                        ? `bg-${achievement.color}`
                        : "bg-gray-600"
                    }`}
                  >
                    <achievement.icon
                      className={`w-6 h-6 ${
                        achievement.unlocked ? "text-white" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <h3
                    className={`text-sm font-bold font-poppins mb-1 ${
                      achievement.unlocked ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {achievement.title}
                  </h3>
                  <p
                    className={`text-xs font-nunito leading-tight ${
                      achievement.unlocked ? "text-zinc-300" : "text-gray-500"
                    }`}
                  >
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default History;
