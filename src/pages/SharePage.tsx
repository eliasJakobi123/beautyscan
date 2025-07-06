import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Heart, Eye, User } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface SharePageProps {}

const SharePage: React.FC<SharePageProps> = () => {
  const { scanId } = useParams<{ scanId: string }>();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch the analysis data from Supabase
    // For now, we'll simulate with mock data
    const mockAnalysis = {
      date: "15.12.2024",
      time: "14:30",
      scores: {
        skinType: 85,
        lips: 78,
        eyes: 92,
        overall: 85,
      },
      feedback: {
        skin: "Deine Haut sieht gesund und gepflegt aus!",
        lips: "Schöne Lippenform, könnte etwas mehr Pflege vertragen.",
        eyes: "Perfekte Augen-Make-up Anwendung!",
      },
    };

    setTimeout(() => {
      setAnalysis(mockAnalysis);
      setLoading(false);
    }, 1000);
  }, [scanId]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-beauty-rose/30 border-t-beauty-rose rounded-full"
        />
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold font-poppins text-white mb-4">
            Analysis Not Found
          </h1>
          <p className="text-zinc-400 font-nunito">
            This analysis doesn't exist or has been deleted.
          </p>
        </div>
      </div>
    );
  }

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
            onClick={() => navigate("/")}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl font-bold font-poppins text-white">
            BeautyScan Results
          </h1>
        </div>
      </motion.div>

      <div className="p-6 space-y-6">
        {/* Analysis Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-gradient-to-br from-beauty-rose/20 via-beauty-violet/20 to-purple-500/20 rounded-2xl p-6 border border-white/20 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold font-poppins text-white">
                BeautyScan Analysis
              </h2>
              <p className="text-sm font-nunito text-zinc-300">
                {analysis.date} • {analysis.time}
              </p>
            </div>
            <div className="text-right">
              <div className={`text-3xl font-bold ${getScoreColor(analysis.scores.overall)}`}>
                {analysis.scores.overall}/100
              </div>
              <div className="text-sm font-nunito text-zinc-400">
                Overall Score
              </div>
            </div>
          </div>

          {/* Score Categories */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-blue-400" />
                <span className="text-lg font-nunito text-zinc-300">
                  Skin Health
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-24 h-3 bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getProgressColor(analysis.scores.skinType)} transition-all duration-500`}
                    style={{ width: `${analysis.scores.skinType}%` }}
                  />
                </div>
                <span className={`text-lg font-bold ${getScoreColor(analysis.scores.skinType)}`}>
                  {analysis.scores.skinType}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Heart className="w-5 h-5 text-pink-400" />
                <span className="text-lg font-nunito text-zinc-300">
                  Lip Condition
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-24 h-3 bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getProgressColor(analysis.scores.lips)} transition-all duration-500`}
                    style={{ width: `${analysis.scores.lips}%` }}
                  />
                </div>
                <span className={`text-lg font-bold ${getScoreColor(analysis.scores.lips)}`}>
                  {analysis.scores.lips}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Eye className="w-5 h-5 text-purple-400" />
                <span className="text-lg font-nunito text-zinc-300">
                  Eye Area
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-24 h-3 bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getProgressColor(analysis.scores.eyes)} transition-all duration-500`}
                    style={{ width: `${analysis.scores.eyes}%` }}
                  />
                </div>
                <span className={`text-lg font-bold ${getScoreColor(analysis.scores.eyes)}`}>
                  {analysis.scores.eyes}
                </span>
              </div>
            </div>
          </div>

          {/* Feedback */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="bg-white/5 rounded-lg p-3">
              <h3 className="text-sm font-bold font-poppins text-white mb-1">
                Hautbild Feedback
              </h3>
              <p className="text-sm font-nunito text-zinc-300">
                {analysis.feedback.skin}
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <h3 className="text-sm font-bold font-poppins text-white mb-1">
                Lippen Feedback
              </h3>
              <p className="text-sm font-nunito text-zinc-300">
                {analysis.feedback.lips}
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <h3 className="text-sm font-bold font-poppins text-white mb-1">
                Augen Feedback
              </h3>
              <p className="text-sm font-nunito text-zinc-300">
                {analysis.feedback.eyes}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-6">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-xs font-nunito text-zinc-400">
                Powered by BeautyScan
              </span>
            </div>
            <div className="text-xs font-nunito text-zinc-400">
              #BeautyScan
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-lg font-bold font-poppins text-white mb-3">
            Hol dir deine eigene Beauty-Analyse!
          </h3>
          <p className="text-sm font-nunito text-zinc-400 mb-4">
            Erhalte personalisierte Tipps und verfolge deinen Fortschritt.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gradient-to-r from-beauty-rose to-beauty-violet text-white font-bold font-poppins rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Jetzt starten
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default SharePage; 