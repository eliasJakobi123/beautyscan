import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import AnimatedWelcomeText from "./AnimatedWelcomeText";

interface WelcomeScreenProps {
  onNext: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext }) => {
  const { t } = useLanguage();

  return (
    <div className="h-screen flex flex-col items-center justify-center px-6 text-center relative">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-lg mx-auto"
      >
        {/* Animated Welcome Emoji */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="text-6xl mb-8"
        >
          👋
        </motion.div>

        {/* Animated Multilingual Welcome Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-12"
        >
          <AnimatedWelcomeText />
        </motion.div>

        {/* Continue Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          onClick={onNext}
          className="w-full py-4 bg-gradient-to-r from-beauty-rose to-beauty-violet hover:from-beauty-rose/90 hover:to-beauty-violet/90 text-white text-lg font-bold font-poppins rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {t("continue")}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
