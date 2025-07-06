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
      title: "Reduce Shine",
      color: "yellow-500",
    },
    {
      id: "moreMoisture",
      icon: Droplets,
      title: "More Moisture",
      color: "blue-500",
    },
    {
      id: "smallerPores",
      icon: Target,
      title: "Smaller Pores",
      color: "beauty-violet",
    },
    {
      id: "reduceRedness",
      icon: Heart,
      title: "Reduce Redness",
      color: "pink-500",
    },
    {
      id: "improveBlemishes",
      icon: Zap,
      title: "Improve Blemishes",
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
          className="text-2xl font-bold font-poppins text-foreground mb-2 text-center leading-tight"
        >
          What are your skin goals?
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
          {skinGoals.map((goal) => {
            const selected = selectedGoals.includes(goal.id);
            return (
              <motion.button
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 flex items-center space-x-4 relative group
                  ${selected ? `border-${goal.color} bg-${goal.color}/20 shadow-lg ring-2 ring-${goal.color}/60 scale-105` : "border-white/20 bg-white/10"}
                  hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-${goal.color}/80`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                style={{ transition: 'box-shadow 0.3s, border-color 0.3s, background 0.3s, transform 0.2s' }}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                    ${selected ? `bg-${goal.color}` : "bg-white/20"}`}
                >
                  <goal.icon
                    className={`w-6 h-6 transition-all duration-300 ${selected ? "text-gray-900" : "text-white"}`}
                  />
                  {/* Animated checkmark */}
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={selected ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md"
                  >
                    <span className="text-beauty-rose text-lg font-bold">✓</span>
                  </motion.span>
                </div>
                <div className="flex-1 text-left">
                  <span className="text-lg font-semibold font-poppins text-foreground">
                    {goal.title}
                  </span>
                </div>
              </motion.button>
            );
          })}
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
          Continue
        </motion.button>

        {/* Selected count */}
        {selectedGoals.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="text-center text-sm font-nunito text-muted-foreground mt-4"
          >
            {selectedGoals.length} goal{selectedGoals.length !== 1 ? 's' : ''} selected
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default SkinGoalsScreen;
