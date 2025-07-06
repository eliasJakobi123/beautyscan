import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Camera, ShoppingBag, Sparkles, Droplets } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface AppGoalsScreenProps {
  onNext: () => void;
  onBack?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const AppGoalsScreen: React.FC<AppGoalsScreenProps> = ({ onNext }) => {
  const { t } = useLanguage();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const goals = [
    {
      id: "makeup",
      icon: Heart,
      title: t("goal1"),
      color: "beauty-rose",
    },
    {
      id: "analysis",
      icon: Camera,
      title: t("goal2"),
      color: "beauty-violet",
    },
    {
      id: "products",
      icon: ShoppingBag,
      title: t("goal3"),
      color: "beauty-nude",
    },
    {
      id: "routine",
      icon: Sparkles,
      title: t("goal4"),
      color: "beauty-rose",
    },
    {
      id: "skincare",
      icon: Droplets,
      title: t("goal5"),
      color: "beauty-violet",
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
          className="text-2xl font-bold font-poppins text-white mb-8 text-center leading-tight"
        >
          {t("goalsTitle")}
        </motion.h1>

        {/* Goals Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-2 gap-3 mb-8"
        >
          {goals.map((goal, index) => (
            <motion.button
              key={goal.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.5 + index * 0.1,
                duration: 0.5,
                type: "spring",
              }}
              onClick={() => toggleGoal(goal.id)}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                selectedGoals.includes(goal.id)
                  ? `border-${goal.color} bg-${goal.color}/20`
                  : "border-white/20 bg-white/10"
              } hover:bg-white/15 text-center`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
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
              <p className="text-sm font-nunito text-white font-semibold leading-tight">
                {goal.title}
              </p>
            </motion.button>
          ))}
        </motion.div>

        {/* Continue Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
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
            transition={{ delay: 1, duration: 0.5 }}
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

export default AppGoalsScreen;
