import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CompleteScreenProps {
  onNext: () => void;
  onBack?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const CompleteScreen: React.FC<CompleteScreenProps> = ({ onNext }) => {
  const { t } = useLanguage();

  return (
    <div className="h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-sm mx-auto w-full text-center"
      >
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            type: "spring",
            bounce: 0.6,
          }}
          className="relative mb-8"
        >
          {/* Outer Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 mx-auto border-4 border-beauty-rose/30 rounded-full"
          />

          {/* Inner Circle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
            className="absolute inset-0 w-24 h-24 mx-auto bg-gradient-to-br from-beauty-rose to-beauty-violet rounded-full flex items-center justify-center shadow-xl"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>

          {/* Floating Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                y: [0, -30, -60],
                x: [0, (i - 2.5) * 20, (i - 2.5) * 40],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1 + i * 0.2,
                ease: "easeOut",
              }}
              className="absolute top-8 left-12 w-2 h-2 bg-beauty-rose rounded-full"
            />
          ))}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-3xl font-bold font-poppins text-white mb-4"
        >
          {t("completeTitle")}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-lg font-nunito text-zinc-200 mb-12 leading-relaxed"
        >
          {t("completeDesc")}
        </motion.p>

        {/* Start Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          onClick={onNext}
          className="w-full py-4 bg-gradient-to-r from-beauty-rose to-beauty-violet hover:from-beauty-rose/90 hover:to-beauty-violet/90 text-white text-lg font-bold font-poppins rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>{t("letsStart")}</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        {/* Motivational Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-8"
        >
          <p className="text-sm font-nunito text-zinc-400">
            ✨ Ready to discover your beauty potential? ✨
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CompleteScreen;
