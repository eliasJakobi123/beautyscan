import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { useLanguage, Language } from "@/context/LanguageContext";

interface LanguageScreenProps {
  onNext: () => void;
  onBack?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const languages: { code: Language; name: string; flag: string }[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
];

const LanguageScreen: React.FC<LanguageScreenProps> = ({ onNext }) => {
  const { language, setManualLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLanguageSelect = (langCode: Language) => {
    setManualLanguage(langCode); // Use setManualLanguage instead
    setIsOpen(false);
    setTimeout(onNext, 300); // Small delay for smooth transition
  };

  const selectedLanguage = languages.find((lang) => lang.code === language);

  return (
    <div className="h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-sm mx-auto w-full"
      >
        {/* Title */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl font-bold font-poppins text-foreground mb-2 text-center"
        >
          Choose Language
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-sm font-nunito text-muted-foreground text-center mb-8 px-4"
        >
          Select your preferred language
        </motion.p>

        {/* Language Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
          className="text-4xl text-center mb-8"
        >
          🌍
        </motion.div>

        {/* Language Selector */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="relative"
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white font-nunito font-semibold flex items-center justify-between hover:bg-white/15 transition-all duration-300"
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">{selectedLanguage?.flag}</span>
              <span>{selectedLanguage?.name}</span>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </button>

          {/* Dropdown Options */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden z-20"
              >
                {languages.map((lang, index) => (
                  <motion.button
                    key={lang.code}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className="w-full p-4 text-left hover:bg-white/10 transition-all duration-200 flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{lang.flag}</span>
                      <span className="text-foreground font-nunito">
                        {lang.name}
                      </span>
                    </div>
                    {language === lang.code && (
                      <Check className="w-5 h-5 text-beauty-rose" />
                    )}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-sm font-nunito text-muted-foreground text-center mt-6"
        >
          Currently only English is available
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LanguageScreen;
