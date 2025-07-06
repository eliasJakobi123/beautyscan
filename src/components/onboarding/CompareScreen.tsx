import React from "react";
import { motion } from "framer-motion";
import { Crown, Check, X, Eye, TrendingUp, Zap, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CompareScreenProps {
  onNext: () => void;
  onBack?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const CompareScreen: React.FC<CompareScreenProps> = ({ onNext }) => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Eye,
      name: "Analyses",
      free: "5 scans per month",
      premium: "Up to 10 scans per day",
    },
    {
      icon: TrendingUp,
      name: "Analysis Quality",
      free: "Partial analysis",
      premium: "Complete analysis",
    },
    {
      icon: Zap,
      name: "History & Feedback",
      free: "2 history scans",
      premium: "View up to 8 previous results",
    },
    {
      icon: Sparkles,
      name: "Premium Features",
      free: "Limited tips",
      premium: "14-day money-back guarantee",
    },
  ];

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
          className="text-xl font-bold font-poppins text-foreground mb-2 text-center"
        >
          Compare Plans
        </motion.h1>

        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-sm font-nunito text-muted-foreground text-center mb-8 px-4"
        >
          Choose the plan that fits your beauty goals
        </motion.p>

        {/* Comparison Cards */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-2 gap-4 mb-6"
        >
          {/* Free Plan */}
          <div className="bg-gray-800 border-2 border-pink-400/30 rounded-2xl p-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold font-poppins text-foreground mb-1">
                Free Plan
              </h3>
              <div className="text-2xl font-bold font-poppins text-foreground">
                $0
              </div>
            </div>
            <div className="space-y-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <X className="w-3 h-3 text-gray-400" />
                  </div>
                  <div>
                    <div className="text-xs font-nunito text-muted-foreground">
                      {feature.free}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-beauty-rose text-white shadow-xl rounded-2xl p-4 relative">
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <Crown className="w-5 h-5 text-gray-900" />
            </div>
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold font-poppins text-foreground mb-1">
                Premium
              </h3>
              <div className="text-2xl font-bold font-poppins text-foreground">$8.99</div>
            </div>
            <div className="space-y-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-nunito text-foreground">{feature.premium}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          onClick={onNext}
          className="w-full py-3 bg-gradient-to-r from-beauty-rose to-beauty-violet hover:from-beauty-rose/90 hover:to-beauty-violet/90 text-foreground font-bold font-poppins rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 mb-4"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Try Premium
        </motion.button>

        {/* Free Option */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          onClick={onNext}
          className="w-full py-3 text-muted-foreground font-nunito text-sm hover:text-foreground transition-colors duration-300"
        >
          Start with Free Plan
        </motion.button>
      </motion.div>
    </div>
  );
};

export default CompareScreen;
