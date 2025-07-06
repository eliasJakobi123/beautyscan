import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

interface CompleteScreenProps {
  onNext: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const CompleteScreen: React.FC<CompleteScreenProps> = ({ onNext }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { signUpWithPassword, isLoading } = useAuth();
  const [error, setError] = React.useState<string | null>(null);

  const handleGetStarted = async () => {
    setError(null);
    try {
      // TODO: Hole echte Email/Passwort aus Onboarding-Flow/Context!
      const email = "demo@beautyscan.app";
      const password = "demo1234";
      const name = "Demo User";
      await signUpWithPassword(email, password, name);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Registrierung fehlgeschlagen");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center px-6 text-center relative">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-lg mx-auto"
      >
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="text-white text-4xl"
          >
            ✓
          </motion.div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold font-poppins text-foreground mb-4">
            Welcome to BeautyScan! 🎉
          </h1>
          <p className="text-muted-foreground font-nunito text-lg leading-relaxed">
            Your profile is complete and you're ready to start your beauty journey. 
            Let's discover your unique skin insights together!
          </p>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-8 space-y-4"
        >
          <div className="flex items-center justify-center space-x-3 text-muted-foreground">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="font-nunito">AI-Powered Skin Analysis</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-muted-foreground">
            <Sparkles className="w-5 h-5 text-pink-400" />
            <span className="font-nunito">Personalized Recommendations</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-muted-foreground">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="font-nunito">Progress Tracking</span>
          </div>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-6 text-red-300"
          >
            <p className="font-semibold">{error}</p>
          </motion.div>
        )}

        {/* Get Started Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          onClick={handleGetStarted}
          className="w-full py-4 bg-gradient-to-r from-beauty-rose to-beauty-violet hover:from-beauty-rose/90 hover:to-beauty-violet/90 text-foreground text-lg font-bold font-poppins rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default CompleteScreen; 