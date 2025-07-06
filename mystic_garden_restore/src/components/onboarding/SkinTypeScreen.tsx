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
      label: t("oily"),
      emoji: "💧",
      color: "blue-500",
      description: "Glänzend, große Poren",
    },
    {
      id: "dry",
      label: t("dry"),
      emoji: "🌵",
      color: "yellow-500",
      description: "Spannt, schuppt",
    },
    {
      id: "combination",
      label: t("combination"),
      emoji: "⚖️",
      color: "beauty-violet",
      description: "T-Zone ölig, Wangen trocken",
    },
    {
      id: "sensitive",
      label: t("sensitive"),
      emoji: "🌸",
      color: "pink-500",
      description: "Reaktiv, rötlich",
    },
    {
      id: "dontKnow",
      label: t("dontKnow"),
      emoji: "🤷‍♀️",
      color: "gray-500",
      description: "Lass es uns herausfinden",
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
          className="text-2xl font-bold font-poppins text-white mb-2 text-center leading-tight"
        >
          {t("skinTypeTitle")}
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
          {skinTypes.map((skinType, index) => (
            <motion.button
              key={skinType.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.7 + index * 0.1,
                duration: 0.5,
                type: "spring",
              }}
              onClick={() => handleSkinTypeSelect(skinType.id)}
              className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 ${
                selectedSkinType === skinType.id
                  ? `border-${skinType.color} bg-${skinType.color}/20`
                  : "border-white/20 bg-white/10"
              } hover:bg-white/15`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    selectedSkinType === skinType.id
                      ? `bg-${skinType.color}`
                      : "bg-white/20"
                  }`}
                >
                  <span className="text-2xl">{skinType.emoji}</span>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-semibold font-poppins text-white mb-1">
                    {skinType.label}
                  </h3>
                  <p className="text-sm font-nunito text-zinc-300">
                    {skinType.description}
                  </p>
                </div>
                {selectedSkinType === skinType.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-6 h-6 bg-beauty-rose rounded-full flex items-center justify-center"
                  >
                    <span className="text-white text-sm">✓</span>
                  </motion.div>
                )}
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Info Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="text-center text-sm font-nunito text-zinc-400 mt-8"
        >
          Don't worry, we'll help you identify your skin type
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SkinTypeScreen;
