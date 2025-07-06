import React, { useState } from "react";
import { motion } from "framer-motion";
import { Crown, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PremiumScreenProps {
  onNext: () => void;
  onBack?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

type PlanType = "monthly" | "yearly";

const PremiumScreen: React.FC<PremiumScreenProps> = ({ onNext }) => {
  const { t } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("yearly");

  const features = [
    "Complete analysis",
    "View up to 8 previous scan results",
    "Up to 10 scans per day",
    "14-day money-back guarantee"
  ];

  const plans = [
    {
      type: "monthly" as PlanType,
      price: "$8.99",
      period: "Monthly",
      savings: null,
    },
    {
      type: "yearly" as PlanType,
      price: "$59.99",
      period: "Yearly",
      savings: "Save 30%",
    },
  ];

  return (
    <div className="h-screen flex flex-col items-center justify-center px-6 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-sm mx-auto w-full"
      >
        {/* Crown Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg">
            <Crown className="w-8 h-8 text-gray-900" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-2xl font-bold font-poppins text-foreground mb-2 text-center"
        >
          Unlock Premium Features
        </motion.h1>

        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-sm font-nunito text-muted-foreground text-center mb-8"
        >
          Get unlimited beauty analyses and personalized recommendations
        </motion.p>

        {/* Plan Selection */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="space-y-3 mb-6"
        >
          {plans.map((plan) => (
            <motion.button
              key={plan.type}
              onClick={() => setSelectedPlan(plan.type)}
              className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 ${
                selectedPlan === plan.type
                  ? "border-beauty-rose bg-beauty-rose/20"
                  : "border-border bg-card"
              } hover:bg-white/15`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold font-poppins text-white">
                      {plan.price}
                    </span>
                    {plan.savings && (
                      <span className="text-xs font-semibold font-nunito bg-green-500 text-white px-2 py-1 rounded-full">
                        {plan.savings}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-nunito text-zinc-300">
                    {plan.period}
                  </span>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 ${
                    selectedPlan === plan.type
                      ? "border-beauty-rose bg-beauty-rose"
                      : "border-white/40"
                  } flex items-center justify-center`}
                >
                  {selectedPlan === plan.type && (
                    <Check className="w-3 h-3 text-gray-900" />
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="space-y-3 mb-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              className="flex items-center space-x-3"
            >
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-nunito text-foreground">
                {feature}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Premium Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          onClick={onNext}
          className="w-full py-4 bg-gradient-to-r from-beauty-rose to-beauty-violet hover:from-beauty-rose/90 hover:to-beauty-violet/90 text-foreground text-lg font-bold font-poppins rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 mb-4"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Start Premium Trial
        </motion.button>

        {/* Skip Option */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          onClick={onNext}
          className="w-full py-3 text-muted-foreground font-nunito text-sm hover:text-foreground transition-colors duration-300"
        >
          Continue with free version
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PremiumScreen;
