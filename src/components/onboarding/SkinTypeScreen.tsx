import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface SkinTypeScreenProps {
  onNext: () => void;
  onBack?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const SkinTypeScreen: React.FC<SkinTypeScreenProps> = ({ onNext }) => {
  const { t } = useLanguage();
  const [selectedSkinType, setSelectedSkinType] = useState<string>("");

  const skinTypes = [
    {
      id: "oily",
      label: "Oily",
      emoji: "💧",
      color: "blue-500",
      description: "Shiny, large pores",
    },
    {
      id: "dry",
      label: "Dry",
      emoji: "🌵",
      color: "yellow-500",
      description: "Tight, flaky",
    },
    {
      id: "combination",
      label: "Combination",
      emoji: "⚖️",
      color: "beauty-violet",
      description: "T-zone oily, cheeks dry",
    },
    {
      id: "sensitive",
      label: "Sensitive",
      emoji: "🌸",
      color: "pink-500",
      description: "Reactive, reddish",
    },
    {
      id: "dontKnow",
      label: "Don't Know",
      emoji: "🤷‍♀️",
      color: "gray-500",
      description: "Let's figure it out",
    },
  ];

  const handleSkinTypeSelect = (skinType: string) => {
    setSelectedSkinType(skinType);
    setTimeout(onNext, 500); // Auto-advance after selection
  };

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
          What's your skin type?
        </motion.h1>

        {/* Skin Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
          className="text-4xl text-center mb-8"
        >
          🧴
        </motion.div>

        {/* Skin Types Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="space-y-3"
        >
          {skinTypes.map((skinType) => {
            const selected = selectedSkinType === skinType.id;
            return (
              <motion.button
                key={skinType.id}
                onClick={() => handleSkinTypeSelect(skinType.id)}
                className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 flex items-center space-x-4 relative group
                  ${selected ? `border-${skinType.color} bg-${skinType.color}/20 shadow-lg ring-2 ring-${skinType.color}/60 scale-105` : "border-white/20 bg-white/10"}
                  hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-${skinType.color}/80`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                style={{ transition: 'box-shadow 0.3s, border-color 0.3s, background 0.3s, transform 0.2s' }}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300
                      ${selected ? `bg-${skinType.color}` : "bg-white/20"}`}
                  >
                    <span className="text-2xl">{skinType.emoji}</span>
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
                    <h3 className="text-lg font-semibold font-poppins text-foreground mb-1">
                      {skinType.label}
                    </h3>
                    <p className="text-sm font-nunito text-muted-foreground">
                      {skinType.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Info Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="text-center text-sm font-nunito text-muted-foreground mt-8"
        >
          Don't worry, we'll help you identify your skin type through analysis
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SkinTypeScreen;
