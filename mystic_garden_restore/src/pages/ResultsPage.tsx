import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  User,
  Eye,
  Heart,
  Smile,
  Star,
  Sparkles,
  Sun,
  ArrowLeft,
  Download,
  Share2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import BottomNavigation from "@/components/BottomNavigation";

interface CategoryScore {
  name: string;
  score: number;
  icon: React.ElementType;
  tip: string;
}

const ResultsPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const categories: CategoryScore[] = [
    {
      name: t("skinAppearance"),
      score: 78,
      icon: User,
      tip: "Deine Haut wirkt gesund. Achte auf gleichmäßige Feuchtigkeitspflege.",
    },
    {
      name: t("makeupOverall"),
      score: 85,
      icon: Sparkles,
      tip: "Sehr harmonisches Gesamtbild. Die Farben passen gut zu deinem Hautton.",
    },
    {
      name: t("lipArea"),
      score: 65,
      icon: Heart,
      tip: "Die Lippenkontur könnte präziser sein. Verwende einen Lipliner.",
    },
    {
      name: t("eyeArea"),
      score: 72,
      icon: Eye,
      tip: "Augen wirken leicht asymmetrisch – achte beim Auftragen auf Gleichmäßigkeit.",
    },
    {
      name: t("facialHarmony"),
      score: 88,
      icon: Smile,
      tip: "Excellent! Deine Gesichtszüge wirken sehr ausgewogen.",
    },
    {
      name: t("naturalness"),
      score: 92,
      icon: Sun,
      tip: "Perfekt! Dein Look wirkt sehr natürlich und authentisch.",
    },
    {
      name: t("radiance"),
      score: 90,
      icon: Star,
      tip: "Du strahlst Selbstbewusstsein aus! Das Make-up unterstreicht deine Persönlichkeit.",
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10b981"; // green
    if (score >= 60) return "#f59e0b"; // orange
    return "#ef4444"; // red
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Exzellent";
    if (score >= 60) return "Gut";
    return "Verbesserungspotential";
  };

  const overallScore = Math.round(
    categories.reduce((sum, cat) => sum + cat.score, 0) / categories.length,
  );

  const quickTips = [
    "✅ Mehr Licht beim Selfie verbessert die Analysegenauigkeit",
    "💡 Natürliches Tageslicht ist ideal für Beauty-Fotos",
    "🎯 Frontale Aufnahme ohne Schatten führt zu besseren Ergebnissen",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-beauty-rose to-beauty-violet p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex space-x-3">
            <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <span className="text-2xl font-bold font-poppins">
              {overallScore}
            </span>
          </motion.div>
          <h1 className="text-2xl font-bold font-poppins mb-2">
            {t("beautyAnalysis")}
          </h1>
          <p className="font-nunito opacity-90">
            {t("overallRating")}: {getScoreLabel(overallScore)}
          </p>
        </div>
      </div>

      <div className="px-6 mt-6 pb-24">
        {/* Categories */}
        <div className="space-y-4 mb-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-gray-800 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: getScoreColor(category.score) + "20",
                    }}
                  >
                    <category.icon
                      className="w-5 h-5"
                      style={{ color: getScoreColor(category.score) }}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold font-poppins text-white">
                      {category.name}
                    </h3>
                    <p className="text-sm text-zinc-400">
                      {getScoreLabel(category.score)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className="text-2xl font-bold font-poppins"
                    style={{ color: getScoreColor(category.score) }}
                  >
                    {category.score}
                  </div>
                  <div className="text-xs text-zinc-400">von 100</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${category.score}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                  className="h-2 rounded-full"
                  style={{ backgroundColor: getScoreColor(category.score) }}
                />
              </div>

              {/* Tip */}
              <p className="text-sm font-nunito text-zinc-300 leading-relaxed">
                {category.tip}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quick Tips Box */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-gradient-to-r from-beauty-nude/20 to-beauty-rose/20 rounded-xl p-6 border border-beauty-rose/30"
        >
          <h3 className="text-lg font-bold font-poppins text-white mb-4 flex items-center">
            <Sparkles className="w-5 h-5 text-beauty-rose mr-2" />
            Schnell-Tipps
          </h3>
          <div className="space-y-3">
            {quickTips.map((tip, index) => (
              <motion.p
                key={index}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                className="text-sm font-nunito text-white/90 leading-relaxed pl-4 border-l-2 border-beauty-rose/50"
              >
                {tip}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="grid grid-cols-2 gap-4 mt-8"
        >
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gradient-to-r from-beauty-rose to-beauty-violet text-white font-bold font-poppins py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Neue Analyse
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-800 border border-white/20 text-white font-bold font-poppins py-4 rounded-2xl hover:bg-gray-700 transition-all duration-300"
          >
            Verlauf ansehen
          </button>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default ResultsPage;
