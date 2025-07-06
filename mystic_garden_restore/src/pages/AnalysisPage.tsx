import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

const AnalysisPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Navigate to results page after completion
          setTimeout(() => {
            navigate("/results");
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 60); // Complete in ~3 seconds

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center px-6">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-beauty-nude/30 via-beauty-rose/10 to-beauty-violet/10" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-beauty-rose/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-24 h-24 bg-beauty-violet/20 rounded-full blur-xl animate-pulse delay-1000" />

      <div className="relative z-10 text-center">
        {/* Animated Glow Circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-8"
        >
          {/* Outer glow rings */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 w-32 h-32 mx-auto bg-gradient-to-r from-beauty-rose to-beauty-violet rounded-full blur-xl"
          />

          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute inset-0 w-32 h-32 mx-auto bg-gradient-to-r from-beauty-violet to-beauty-rose rounded-full blur-lg"
          />

          {/* Main circle with progress */}
          <div className="relative w-32 h-32 mx-auto bg-gradient-to-r from-beauty-rose to-beauty-violet rounded-full flex items-center justify-center">
            <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-white font-bold font-poppins text-lg"
              >
                {progress}%
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Analysis Text */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-2xl font-bold font-poppins text-white mb-4"
        >
          {t("analysisInProgress")}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg font-nunito text-zinc-300 mb-8"
        >
          {t("pleaseWait")}
        </motion.p>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="w-64 mx-auto bg-gray-800 rounded-full h-2 overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-beauty-rose to-beauty-violet rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Loading Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8 space-y-2"
        >
          <motion.p
            className={`text-sm font-nunito transition-colors duration-300 ${
              progress > 20 ? "text-beauty-rose" : "text-zinc-500"
            }`}
          >
            ✓ {t("imageProcessing")}
          </motion.p>
          <motion.p
            className={`text-sm font-nunito transition-colors duration-300 ${
              progress > 50 ? "text-beauty-rose" : "text-zinc-500"
            }`}
          >
            ✓ {t("aiAnalysisRunning")}
          </motion.p>
          <motion.p
            className={`text-sm font-nunito transition-colors duration-300 ${
              progress > 80 ? "text-beauty-rose" : "text-zinc-500"
            }`}
          >
            ✓ {t("generatingResults")}
          </motion.p>
        </motion.div>

        {/* Completion Animation */}
        {progress === 100 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-6"
          >
            <div className="text-4xl mb-2">✨</div>
            <p className="text-beauty-rose font-semibold font-poppins">
              {t("analysisComplete")}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AnalysisPage;
