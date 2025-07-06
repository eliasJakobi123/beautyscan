import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface MakeupFrequencyScreenProps {
  onNext: () => void;
  onBack?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const MakeupFrequencyScreen: React.FC<MakeupFrequencyScreenProps> = ({
  onNext,
}) => {
  const { t } = useLanguage();
  const [selectedFrequency, setSelectedFrequency] = useState<string>("");

  const frequencies = [
    { id: "never", label: t("never"), emoji: "😴", color: "gray-500" },
    { id: "rarely", label: t("rarely"), emoji: "😊", color: "blue-500" },
    {
      id: "sometimes",
      label: t("sometimes"),
      emoji: "💄",
      color: "beauty-rose",
    },
    { id: "daily", label: t("daily"), emoji: "✨", color: "beauty-violet" },
  ];

  const handleFrequencySelect = (frequency: string) => {
    setSelectedFrequency(frequency);
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
          {t("makeupFrequencyTitle")}
        </motion.h1>

        {/* Clock Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
          className="text-4xl text-center mb-8"
        >
          ⏱️
        </motion.div>

        {/* Frequency Options */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="space-y-4"
        >
          {frequencies.map((frequency, index) => (
            <motion.button
              key={frequency.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              onClick={() => handleFrequencySelect(frequency.id)}
              className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 flex items-center space-x-4 ${
                selectedFrequency === frequency.id
                  ? `border-${frequency.color} bg-${frequency.color}/20`
                  : "border-white/20 bg-white/10"
              } hover:bg-white/15`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  selectedFrequency === frequency.id
                    ? `bg-${frequency.color}`
                    : "bg-white/20"
                }`}
              >
                <span className="text-xl">{frequency.emoji}</span>
              </div>
              <div className="flex-1 text-left">
                <span className="text-lg font-semibold font-poppins text-white">
                  {frequency.label}
                </span>
              </div>
              {selectedFrequency === frequency.id && (
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

        {/* Info Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center text-sm font-nunito text-zinc-400 mt-8"
        >
          This helps us personalize your experience
        </motion.p>
      </motion.div>
    </div>
  );
};

export default MakeupFrequencyScreen;
