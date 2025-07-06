import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface OnboardingContainerProps {
  screens: React.ComponentType<{
    onNext: () => void;
    onBack?: () => void;
    isFirst?: boolean;
    isLast?: boolean;
  }>[];
  onComplete: () => void;
}

const OnboardingContainer: React.FC<OnboardingContainerProps> = ({
  screens,
  onComplete,
}) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const { t } = useLanguage();

  const nextScreen = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      onComplete();
    }
  };

  const prevScreen = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const CurrentScreenComponent = screens[currentScreen];

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-beauty-nude/30 via-beauty-rose/10 to-beauty-violet/10 dark:from-gray-900 dark:via-gray-800 dark:to-black" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-beauty-rose/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-24 h-24 bg-beauty-violet/20 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-beauty-nude/20 rounded-full blur-md animate-pulse delay-500" />

      {/* Back Button - Always visible except on first screen */}
      {currentScreen > 0 && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={prevScreen}
          className="absolute top-8 left-6 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
      )}

      {/* Progress Indicator */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex space-x-2">
          {screens.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentScreen
                  ? "bg-beauty-rose w-8"
                  : index < currentScreen
                    ? "bg-beauty-rose/60"
                    : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Screen Content */}
      <div className="relative z-10 h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-full"
          >
            <CurrentScreenComponent
              onNext={nextScreen}
              onBack={currentScreen > 0 ? prevScreen : undefined}
              isFirst={currentScreen === 0}
              isLast={currentScreen === screens.length - 1}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OnboardingContainer;
