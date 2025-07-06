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
    { id: "never", label: "Never", emoji: "😴", color: "gray-500" },
    { id: "rarely", label: "Rarely", emoji: "😊", color: "blue-500" },
    {
      id: "sometimes",
      label: "Sometimes",
      emoji: "💄",
      color: "beauty-rose",
    },
    { id: "daily", label: "Daily", emoji: "✨", color: "beauty-violet" },
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
          className="text-2xl font-bold font-poppins text-foreground mb-2 text-center leading-tight"
        >
          How often do you use beauty products?
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
          {frequencies.map((frequency) => {
            const selected = selectedFrequency === frequency.id;
            return (
              <motion.button
                key={frequency.id}
                onClick={() => handleFrequencySelect(frequency.id)}
                className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 flex items-center space-x-4 relative group
                  ${selected ? `border-${frequency.color} bg-${frequency.color}/20 shadow-lg ring-2 ring-${frequency.color}/60 scale-105` : "border-white/20 bg-white/10"}
                  hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-${frequency.color}/80`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                style={{ transition: 'box-shadow 0.3s, border-color 0.3s, background 0.3s, transform 0.2s' }}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                    ${selected ? `bg-${frequency.color}` : "bg-white/20"}`}
                >
                  <span className="text-xl">{frequency.emoji}</span>
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
                    {frequency.label}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Info Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center text-sm font-nunito text-muted-foreground mt-8"
        >
          This helps us personalize your beauty analysis
        </motion.p>
      </motion.div>
    </div>
  );
};

export default MakeupFrequencyScreen;
