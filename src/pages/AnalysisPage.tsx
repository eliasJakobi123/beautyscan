import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useAnalysis } from "@/context/AnalysisContext";
import { useAuth } from "@/context/AuthContext";

const AnalysisPage = () => {
  const { t } = useLanguage();
  const { markTodayAsAnalyzed, addAnalysis, isLoading: isAnalysisLoading, error, loadUserScans, isAddingAnalysis } = useAnalysis();
  const { user, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [errorState, setError] = useState('');
  const [timeoutReached, setTimeoutReached] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<File|null>(null);

  // Warte auf User-Load und Context-Ready
  const ready = !isAuthLoading && !!user;

  useEffect(() => {
    if (location.state?.image) {
      setUploadedImage(location.state.image);
    }
  }, [location.state]);

  useEffect(() => {
    if (!ready) return;
    setTimeoutReached(false);
    setProgress(0);
    setHasCompleted(false);
    setError('');
    setIsProcessing(false);
    // Timeout für Hänger
    const timeout = setTimeout(() => {
      if (!hasCompleted) {
        setTimeoutReached(true);
        setIsProcessing(false);
      }
    }, 10000); // 10 Sekunden
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 60);
    return () => { clearInterval(timer); clearTimeout(timeout); };
  }, [ready, retryKey]);

  useEffect(() => {
    if (!ready) return;
    if (progress >= 100 && !hasCompleted && !timeoutReached) {
      handleAnalysisComplete();
    }
  }, [progress, hasCompleted, ready, timeoutReached]);

  const handleRetry = () => {
    setRetryKey(k => k + 1);
  };

  const handleAnalysisComplete = async () => {
    console.log('[AnalysisPage] handleAnalysisComplete called. hasCompleted:', hasCompleted, 'user:', user);
    if (hasCompleted) return;
    setIsProcessing(true);
    markTodayAsAnalyzed();
    try {
      if (!user?.id) throw new Error("User not loaded");
      if (!uploadedImage) throw new Error("No image uploaded");
      // Sende das Bild an den Proxy-Endpoint
      const formData = new FormData();
      formData.append('image', uploadedImage);
      formData.append('userId', user.id);
      const response = await fetch('/api/openai-vision', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('OpenAI Vision API failed');
      const result = await response.json();
      // result: { scores, feedback, tips }
      const now = new Date();
      const analysisResult = {
        id: Date.now(),
        date: now.toLocaleDateString('de-DE'),
        time: now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
        scores: result.scores,
        feedback: result.feedback,
        tips: result.tips,
      };
      await addAnalysis({ ...analysisResult, created_at: '' });
      await loadUserScans();
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('[AnalysisPage] Analysis saved, navigating to /results');
      navigate("/results");
    } catch (err) {
      console.error('[AnalysisPage] Error completing analysis:', err);
      setIsProcessing(false);
      setHasCompleted(true);
      setError('Analysis failed: ' + (err?.message || err));
      return;
    } finally {
      setIsProcessing(false);
      setHasCompleted(true);
    }
  };

  // Logging für Navigation
  useEffect(() => {
    console.log('[AnalysisPage] useEffect hasCompleted:', hasCompleted, 'errorState:', errorState);
    if (hasCompleted && !errorState) {
      console.log('[AnalysisPage] Navigating to /results after analysis complete');
    }
  }, [hasCompleted, errorState]);

  if (isAddingAnalysis) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <div className="animate-spin mb-4 mx-auto w-12 h-12 border-4 border-beauty-violet border-t-transparent rounded-full" />
          <p className="text-xl font-bold">Analyse läuft...</p>
          <p className="text-zinc-400 mt-2">Bitte warte, dein Scan wird gespeichert.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center px-6">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-beauty-nude/30 via-beauty-rose/10 to-beauty-violet/10" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-beauty-rose/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-24 h-24 bg-beauty-violet/20 rounded-full blur-xl animate-pulse delay-1000" />

      <div className="relative z-10 text-center">
        {/* Ladezustand, solange User nicht geladen */}
        {isAuthLoading && (
          <div className="text-white text-lg font-bold mb-8">Loading user...</div>
        )}
        {!isAuthLoading && !user && (
          <div className="text-red-400 text-lg font-bold mb-8">No user loaded. Please restart the app.</div>
        )}

        {/* Error Display */}
        {errorState && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-6 text-red-300"
          >
            <p className="font-semibold">Fehler: {errorState}</p>
            <button
              className="mt-4 px-6 py-2 bg-beauty-violet text-white rounded-xl font-bold shadow hover:bg-beauty-violet/90"
              onClick={() => window.location.reload()}
              disabled={isAddingAnalysis}
            >Try Again</button>
            <button
              className="mt-2 px-6 py-2 bg-beauty-rose text-white rounded-xl font-bold shadow hover:bg-beauty-rose/90 ml-2"
              onClick={() => navigate('/results')}
              disabled={isAddingAnalysis}
            >Go to Results</button>
          </motion.div>
        )}

        {/* Timeout/Hänger-Fehleranzeige */}
        {timeoutReached && !hasCompleted && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-6 text-red-300"
          >
            <p className="font-semibold">Something went wrong. The analysis took too long.</p>
            <button
              className="mt-4 px-6 py-2 bg-beauty-violet text-white rounded-xl font-bold shadow hover:bg-beauty-violet/90"
              onClick={handleRetry}
            >Try Again</button>
          </motion.div>
        )}

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
                {isProcessing ? "..." : `${progress}%`}
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
          {isProcessing ? "Saving Your Results" : "Analyzing Your Beauty"}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg font-nunito text-zinc-300 mb-8"
        >
          {isProcessing ? "Please wait while we save your analysis..." : "Our AI is examining your skin, lips, and eyes..."}
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
            ✓ Processing your image
          </motion.p>
          <motion.p
            className={`text-sm font-nunito transition-colors duration-300 ${
              progress > 40 ? "text-beauty-rose" : "text-zinc-500"
            }`}
          >
            ✓ Analyzing skin condition
          </motion.p>
          <motion.p
            className={`text-sm font-nunito transition-colors duration-300 ${
              progress > 60 ? "text-beauty-rose" : "text-zinc-500"
            }`}
          >
            ✓ Evaluating lip health
          </motion.p>
          <motion.p
            className={`text-sm font-nunito transition-colors duration-300 ${
              progress > 80 ? "text-beauty-rose" : "text-zinc-500"
            }`}
          >
            ✓ Assessing eye area
          </motion.p>
          <motion.p
            className={`text-sm font-nunito transition-colors duration-300 ${
              progress === 100 ? "text-beauty-rose" : "text-zinc-500"
            }`}
          >
            ✓ Generating personalized recommendations
          </motion.p>
        </motion.div>

        {/* Completion Animation */}
        {progress === 100 && !isProcessing && !errorState && (
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
