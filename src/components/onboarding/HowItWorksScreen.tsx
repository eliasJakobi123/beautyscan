import React from "react";
import { motion } from "framer-motion";
import { Camera, Brain, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface HowItWorksScreenProps {
  onNext: () => void;
  onBack?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const HowItWorksScreen: React.FC<HowItWorksScreenProps> = ({ onNext }) => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Camera,
      title: "Take a Photo",
      description: "Capture a clear photo of your face in good lighting",
      color: "beauty-rose",
      delay: 0.2,
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Our AI analyzes your skin and provides personalized insights",
      color: "beauty-violet",
      delay: 0.4,
    },
    {
      icon: Sparkles,
      title: "Get Results",
      description: "Receive detailed recommendations and track your progress",
      color: "beauty-nude",
      delay: 0.6,
    },
  ];

  return (
    <div className="h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg mx-auto w-full"
      >
        {/* Title */}
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-3xl font-bold font-poppins text-white mb-4 text-center"
        >
          How It Works
        </motion.h1>

        {/* Steps */}
        <div className="space-y-6 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: step.delay, duration: 0.6 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                {/* Icon Circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: step.delay + 0.3,
                    duration: 0.5,
                    type: "spring",
                  }}
                  className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br from-${step.color} to-${step.color}/70 rounded-full flex items-center justify-center shadow-lg`}
                >
                  <step.icon className="w-6 h-6 text-gray-900" />
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: step.delay + 0.4, duration: 0.5 }}
                    className="text-lg font-bold font-poppins text-white mb-2"
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: step.delay + 0.5, duration: 0.5 }}
                    className="text-sm font-nunito text-zinc-200 leading-relaxed"
                  >
                    {step.description}
                  </motion.p>
                </div>

                {/* Step Number */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: step.delay + 0.6, duration: 0.4 }}
                  className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                >
                  <span className="text-sm font-bold font-poppins text-white">
                    {index + 1}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Continue Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          onClick={onNext}
          className="w-full py-4 bg-gradient-to-r from-beauty-rose to-beauty-violet hover:from-beauty-rose/90 hover:to-beauty-violet/90 text-white text-lg font-bold font-poppins rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HowItWorksScreen;
