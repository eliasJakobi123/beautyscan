import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage, Language } from "@/context/LanguageContext";

const AnimatedWelcomeText: React.FC = () => {
  const { language, isManuallySelected, t } = useLanguage();
  const [currentLanguage, setCurrentLanguage] = useState<Language>("de");
  const [isAnimating, setIsAnimating] = useState(!isManuallySelected);

  const languages: Language[] = ["de", "en", "es", "ru"];

  const welcomeTexts = {
    de: "Willkommen bei BeautyScan – dein persönlicher Make-up & Skincare Assistent.",
    en: "Welcome to BeautyScan – your personal makeup & skincare assistant.",
  };

  useEffect(() => {
    if (isManuallySelected) {
      // Stop animation and use selected language
      setIsAnimating(false);
      setCurrentLanguage(language);
      return;
    }

    // Continue cycling through languages
    setIsAnimating(true);
    const interval = setInterval(() => {
      setCurrentLanguage((prev) => {
        const currentIndex = languages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % languages.length;
        return languages[nextIndex];
      });
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [isManuallySelected, language]);

  const currentText = isManuallySelected
    ? welcomeTexts[language]
    : welcomeTexts[currentLanguage];

  return (
    <div className="h-20 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.h1
          key={
            isManuallySelected
              ? `manual-${language}`
              : `auto-${currentLanguage}`
          }
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
            opacity: { duration: 0.6 },
            scale: { duration: 0.4 },
          }}
          className="text-2xl font-bold font-poppins text-white text-center leading-tight px-4"
        >
          {currentText}
        </motion.h1>
      </AnimatePresence>

      {/* Language indicator dots */}
      {!isManuallySelected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2"
        >
          {languages.map((lang) => (
            <div
              key={lang}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentLanguage === lang
                  ? "bg-beauty-rose scale-125"
                  : "bg-white/30"
              }`}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AnimatedWelcomeText;
