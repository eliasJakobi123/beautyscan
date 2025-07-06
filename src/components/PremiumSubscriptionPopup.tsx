import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PremiumSubscriptionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: (plan: "monthly" | "yearly") => void;
}

const PremiumSubscriptionPopup: React.FC<PremiumSubscriptionPopupProps> = ({
  isOpen,
  onClose,
  onUpgrade,
}) => {
  const { t } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">(
    "yearly",
  );

  const freeFeatures = [
    "5 scans per month",
    "2 history scans",
    "Partial analysis",
    "Limited tips"
  ];

  const premiumFeatures = [
    "Complete analysis",
    "View up to 8 previous scan results",
    "Up to 10 scans per day",
    "14-day money-back guarantee"
  ];

  const handleUpgrade = () => {
    onUpgrade(selectedPlan);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full mx-auto relative overflow-hidden"
            style={{ backgroundColor: "#111827" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="p-6 pb-4">
              {/* Title */}
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-2xl font-bold font-poppins text-white text-center mb-3"
              >
                Unlock Your Full Beauty Potential
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-beauty-lightgray font-nunito text-center mb-6 leading-relaxed"
                style={{ color: "#f0f0f0" }}
              >
                Get unlimited beauty analyses and personalized recommendations
              </motion.p>

              {/* Comparison Table */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mb-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  {/* Free Column */}
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <h3 className="text-lg font-bold font-poppins text-white mb-3 text-center">
                      Free Plan
                    </h3>
                    <div className="space-y-2">
                      {freeFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm font-nunito text-gray-300 leading-tight">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Premium Column */}
                  <div className="bg-gradient-to-br from-beauty-rose/20 to-pink-500/20 rounded-xl p-4 border border-beauty-rose/30">
                    <h3 className="text-lg font-bold font-poppins text-white mb-1 text-center">
                      Premium
                    </h3>
                    <p className="text-xs font-nunito text-beauty-rose text-center mb-3">
                      {selectedPlan === "yearly"
                        ? "$4.99/month (billed yearly)"
                        : "$9.99/month"}
                    </p>
                    <div className="space-y-2">
                      {premiumFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm font-nunito text-white leading-tight font-medium">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Plan Selection */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mb-6"
              >
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedPlan("monthly")}
                    className={`p-3 rounded-xl text-center transition-all duration-300 ${
                      selectedPlan === "monthly"
                        ? "bg-beauty-rose/20 border border-beauty-rose text-white"
                        : "bg-gray-800/50 border border-gray-600 text-gray-300 hover:bg-gray-700/50"
                    }`}
                  >
                    <div className="font-bold font-poppins text-sm">
                      Monthly Plan
                    </div>
                    <div className="text-xs font-nunito">
                      $9.99/month
                    </div>
                  </button>
                  <button
                    onClick={() => setSelectedPlan("yearly")}
                    className={`p-3 rounded-xl text-center transition-all duration-300 relative ${
                      selectedPlan === "yearly"
                        ? "bg-beauty-rose/20 border border-beauty-rose text-white"
                        : "bg-gray-800/50 border border-gray-600 text-gray-300 hover:bg-gray-700/50"
                    }`}
                  >
                    <div className="font-bold font-poppins text-sm">
                      Yearly Plan
                    </div>
                    <div className="text-xs font-nunito">
                      $59.88/year
                    </div>
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      -35%
                    </div>
                  </button>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUpgrade}
                className="w-full py-4 bg-pink-500 hover:bg-pink-600 text-white font-bold font-poppins rounded-full shadow-lg transition-all duration-300 transform hover:shadow-xl text-lg"
              >
                Try Premium
              </motion.button>

              {/* Small Note */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-center text-xs font-nunito text-gray-400 mt-3 italic"
              >
                Save 35% with yearly plan
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PremiumSubscriptionPopup;
