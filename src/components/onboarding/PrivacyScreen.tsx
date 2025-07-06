import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Check, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PrivacyScreenProps {
  onNext: () => void;
  onBack?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const PrivacyScreen: React.FC<PrivacyScreenProps> = ({ onNext }) => {
  const { t } = useLanguage();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const canContinue = acceptedTerms && acceptedPrivacy;

  const handleContinue = () => {
    if (canContinue) {
      onNext();
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-sm mx-auto w-full"
      >
        {/* Shield Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-lg">
            <Shield className="w-8 h-8 text-gray-900" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-2xl font-bold font-poppins text-foreground mb-2 text-center"
        >
          Privacy & Terms
        </motion.h1>

        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-sm font-nunito text-muted-foreground text-center mb-8"
        >
          Your data is safe and secure with us
        </motion.p>

        {/* Checkboxes */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="space-y-6 mb-8"
        >
          {/* Terms Checkbox */}
          <div className="flex items-start space-x-3">
            <button
              onClick={() => setAcceptedTerms(!acceptedTerms)}
              className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 transition-all duration-300 flex items-center justify-center ${
                acceptedTerms
                  ? "border-beauty-rose bg-beauty-rose"
                  : "border-white/40 bg-transparent"
              }`}
            >
              {acceptedTerms && <Check className="w-4 h-4 text-gray-900" />}
            </button>
            <div className="flex-1">
              <p className="text-sm font-nunito text-foreground leading-relaxed">
                I accept the Terms of Service
              </p>
              <button className="text-xs font-nunito text-beauty-rose hover:text-beauty-rose/80 underline transition-colors duration-300 flex items-center space-x-1 mt-1">
                <span>Read Terms</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Privacy Checkbox */}
          <div className="flex items-start space-x-3">
            <button
              onClick={() => setAcceptedPrivacy(!acceptedPrivacy)}
              className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 transition-all duration-300 flex items-center justify-center ${
                acceptedPrivacy
                  ? "border-beauty-rose bg-beauty-rose"
                  : "border-white/40 bg-transparent"
              }`}
            >
              {acceptedPrivacy && <Check className="w-4 h-4 text-gray-900" />}
            </button>
            <div className="flex-1">
              <p className="text-sm font-nunito text-foreground leading-relaxed">
                I accept the Privacy Policy
              </p>
              <button className="text-xs font-nunito text-beauty-rose hover:text-beauty-rose/80 underline transition-colors duration-300 flex items-center space-x-1 mt-1">
                <span>Read Privacy Policy</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          onClick={handleContinue}
          disabled={!canContinue}
          className={`w-full py-4 text-lg font-bold font-poppins rounded-2xl shadow-xl transition-all duration-300 transform ${
            canContinue
              ? "bg-gradient-to-r from-beauty-rose to-beauty-violet hover:from-beauty-rose/90 hover:to-beauty-violet/90 text-foreground hover:scale-105"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
          whileHover={canContinue ? { scale: 1.02 } : {}}
          whileTap={canContinue ? { scale: 0.98 } : {}}
        >
          Continue
        </motion.button>

        {/* Security Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-center mt-6"
        >
          <p className="text-xs font-nunito text-muted-foreground">
            🔒 Your privacy is our priority
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PrivacyScreen;
