import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown,
  Zap,
  BarChart3,
  MessageCircle,
  Sparkles,
  Check,
  X,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PremiumPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

const PremiumPopup: React.FC<PremiumPopupProps> = ({
  isOpen,
  onClose,
  onUpgrade,
}) => {
  const { t } = useLanguage();
  const [selectedPlan, setSelectedPlan] = React.useState<"monthly" | "yearly">(
    "yearly",
  );

  const features = [
    {
      icon: Zap,
      title: "Täglich 10 Beauty-Scans",
      description: "Unbegrenzte Analysen pro Tag",
    },
    {
      icon: BarChart3,
      title: "Vollständige Analyse",
      description: "Hautbild, Lippen, Augen & mehr",
    },
    {
      icon: MessageCircle,
      title: "Detaillierte Empfehlungen",
      description: "Verbesserte und präzisere Tipps",
    },
    {
      icon: Sparkles,
      title: "Alle zukünftigen Features",
      description: "Früher Zugang zu neuen Funktionen",
    },
  ];

  const comparisonData = [
    { feature: "Scans", free: "5/Monat", premium: "10/Tag" },
    { feature: "Analyse", free: "Basis", premium: "Vollständig" },
    { feature: "Tipps", free: "Standard", premium: "Detailliert" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.4, type: "spring", damping: 25 }}
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl p-4 max-w-xs w-full mx-auto shadow-2xl border border-beauty-rose/30 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-beauty-rose/10 via-beauty-violet/10 to-beauty-nude/10 rounded-3xl" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-beauty-rose/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-beauty-violet/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-4">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg"
                >
                  <Crown className="w-6 h-6 text-gray-900" />
                </motion.div>
                <h2 className="text-xl font-bold font-poppins text-white mb-1">
                  Premium freischalten
                </h2>
                <p className="text-xs font-nunito text-zinc-300">
                  Hol dir das volle BeautyScan-Erlebnis
                </p>
              </div>

              {/* Features */}
              <div className="space-y-2 mb-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-beauty-rose to-beauty-violet rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold font-poppins text-white text-xs">
                        {feature.title}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Plan Selection */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="space-y-2 mb-4"
              >
                <button
                  onClick={() => setSelectedPlan("yearly")}
                  className={`w-full p-3 rounded-xl text-left transition-all duration-300 ${
                    selectedPlan === "yearly"
                      ? "bg-gradient-to-br from-beauty-rose/20 to-beauty-violet/20 border border-beauty-rose/50"
                      : "bg-gray-800/50 border border-white/10"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-bold font-poppins text-white">
                          Jährlich - 59,99 €
                        </p>
                        <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          -50%
                        </span>
                      </div>
                      <p className="text-xs text-beauty-rose font-semibold">
                        nur 5 €/Monat
                      </p>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        selectedPlan === "yearly"
                          ? "border-beauty-rose bg-beauty-rose"
                          : "border-white/40"
                      }`}
                    >
                      {selectedPlan === "yearly" && (
                        <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                      )}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedPlan("monthly")}
                  className={`w-full p-3 rounded-xl text-left transition-all duration-300 ${
                    selectedPlan === "monthly"
                      ? "bg-gradient-to-br from-beauty-rose/20 to-beauty-violet/20 border border-beauty-rose/50"
                      : "bg-gray-800/50 border border-white/10"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-bold font-poppins text-white">
                        Monatlich - 8,99 €
                      </p>
                      <p className="text-xs text-zinc-400">pro Monat</p>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        selectedPlan === "monthly"
                          ? "border-beauty-rose bg-beauty-rose"
                          : "border-white/40"
                      }`}
                    >
                      {selectedPlan === "monthly" && (
                        <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                      )}
                    </div>
                  </div>
                </button>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="space-y-2"
              >
                <button
                  onClick={() => onUpgrade()}
                  className="w-full py-3 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold font-poppins rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105 text-sm"
                >
                  {selectedPlan === "yearly"
                    ? "Jährlich für 59,99 € buchen"
                    : "Monatlich für 8,99 € buchen"}
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2 bg-gray-700/50 hover:bg-gray-700 text-zinc-300 font-semibold font-nunito rounded-lg transition-all duration-300 text-xs"
                >
                  Später erinnern
                </button>
              </motion.div>

              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.4 }}
                className="text-center mt-3"
              >
                <p className="text-xs font-nunito text-zinc-500">
                  ✓ Jederzeit kündbar • ✓ 14 Tage Geld-zurück-Garantie
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PremiumPopup;
