import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Droplets, Target, Heart, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface SkinGoalsScreenProps {
  onNext: () => void;
  onBack?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const SkinGoalsScreen: React.FC<SkinGoalsScreenProps> = ({ onNext }) => {
  const { t } = useLanguage();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const skinGoals = [
    {
      id: "lessShine",
      icon: Sparkles,
      title: t("lessShine"),
      color: "yellow-500",
    },
    {
      id: "moreMoisture",
      icon: Droplets,
      title: t("moreMoisture"),
      color: "blue-500",
    },
    {
      id: "smallerPores",
      icon: Target,
      title: t("smallerPores"),
      color: "beauty-violet",
    },
    {
      id: "reduceRedness",
      icon: Heart,
      title: t("reduceRedness"),
      color: "pink-500",
    },
    {
      id: "improveBlemishes",
      icon: Zap,
      title: t("improveBlemishes"),
      color: "beauty-rose",
    },
  ];

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId)
        ? prev.filter((id) => id !== goalId)
        : [...prev, goalId],
    );
  };

  const canContinue = selectedGoals.length > 0;

  return (
    <div className="h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-sm mx-auto w-full"
      >
        {/* Title */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl font-bold font-poppins text-white mb-2 text-center leading-tight"
        >
          {t("skinGoalsTitle")}
        </motion.h1>

        {/* Star Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
          className="text-4xl text-center mb-8"
        >
          🌟
        </motion.div>

        {/* Goals Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="space-y-3 mb-8"
        >
          {skinGoals.map((goal, index) => (
            <motion.button
              key={goal.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                delay: 0.7 + index * 0.1,
                duration: 0.5,
              }}
              onClick={() => toggleGoal(goal.id)}
              className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 flex items-center space-x-4 ${
                selectedGoals.includes(goal.id)
                  ? `border-${goal.color} bg-${goal.color}/20`
                  : "border-white/20 bg-white/10"
              } hover:bg-white/15`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  selectedGoals.includes(goal.id)
                    ? `bg-${goal.color}`
                    : "bg-white/20"
                }`}
              >
                <goal.icon
                  className={`w-6 h-6 ${
                    selectedGoals.includes(goal.id)
                      ? "text-gray-900"
                      : "text-white"
                  }`}
                />
              </div>
              <div className="flex-1 text-left">
                <span className="text-lg font-semibold font-poppins text-white">
                  {goal.title}
                </span>
              </div>
              {selectedGoals.includes(goal.id) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-6 bg-beauty-rose rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-sm">✓</span>
                </motion.div>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Continue Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          onClick={onNext}
          disabled={!canContinue}
          className={`w-full py-4 text-lg font-bold font-poppins rounded-2xl shadow-xl transition-all duration-300 ${
            canContinue
              ? "bg-gradient-to-r from-beauty-rose to-beauty-violet hover:from-beauty-rose/90 hover:to-beauty-violet/90 text-white transform hover:scale-105"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
          whileHover={canContinue ? { scale: 1.02 } : {}}
          whileTap={canContinue ? { scale: 0.98 } : {}}
        >
          {t("continue")}
        </motion.button>

        {/* Selected count */}
        {selectedGoals.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="text-center text-sm font-nunito text-zinc-400 mt-4"
          >
            {selectedGoals.length}{" "}
            {selectedGoals.length === 1 ? "Ziel" : "Ziele"} ausgewählt
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default SkinGoalsScreen;
