import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useMotionValue, animate } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Share2,
  Download,
  Sparkles,
  Smile,
  Meh,
  Frown,
  Droplets,
  Sun,
  Dot,
  Palette,
  Layers,
  Clock,
  ThumbsUp,
  Brush,
  Eye,
  Star,
  Lock,
  Zap,
  Heart,
} from "lucide-react";
import { useAnalysis } from "@/context/AnalysisContext";
import { useAuth } from "@/context/AuthContext";
import ShareResults from "@/components/ShareResults";
import Button from "@/components/ui/button";

// Hilfsfunktion für Score-Farbe
const getScoreColor = (score: number) => {
  if (score > 80) return '#10b981'; // grün
  if (score > 60) return '#f59e0b'; // orange
  return '#ef4444'; // rot
};

// Helper component for individual rating items
export const RatingItem = ({ icon: Icon, label, score, maxScore = 100, barWidth = "w-32 md:w-40" }: { icon: React.ElementType, label: string, score: number, maxScore?: number, barWidth?: string }) => {
  const scoreColor = score > 80 ? 'text-green-400' : score > 60 ? 'text-yellow-400' : 'text-red-400';
  const bgColor = score > 80 ? 'bg-green-500' : score > 60 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="flex items-center">
      <Icon className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0" />
      <span className="flex-grow text-sm text-gray-300">{label}</span>
      <div className={`${barWidth} h-2 bg-gray-700 rounded-full mx-3`}>
        <motion.div
          className={`h-2 rounded-full`}
          style={{ backgroundColor: getScoreColor(score) }}
          initial={{ width: 0 }}
          animate={{ width: `${(score / maxScore) * 100}%` }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>
      <span className={`font-bold text-sm w-8 text-right`} style={{ color: getScoreColor(score) }}>{score}</span>
    </div>
  );
};

const ResultsPage = () => {
  const navigate = useNavigate();
  const { latestAnalysis, setShowPremiumPopup, loadUserScans } = useAnalysis();
  const { isPremium } = useAuth();
  const [motionValue, setMotionValue] = React.useState(0);

  useEffect(() => {
    console.log('[ResultsPage] useEffect mount. latestAnalysis:', latestAnalysis);
    loadUserScans();
  }, []);

  useEffect(() => {
    console.log('[ResultsPage] latestAnalysis changed:', latestAnalysis);
  }, [latestAnalysis]);

  useEffect(() => {
    setMotionValue(0);
    animate(0, latestAnalysis.scores.overall, {
      duration: 1.2,
      onUpdate: v => setMotionValue(Math.round(v)),
    });
  }, [latestAnalysis.scores.overall]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handler für Zurück-Button: immer zum Dashboard und Scans neu laden
  const handleBackToDashboard = () => {
    navigate('/dashboard');
    setTimeout(() => {
      loadUserScans();
    }, 100);
  };

  if (!latestAnalysis || !latestAnalysis.scores) {
    console.log('[ResultsPage] Kein Ergebnis vorhanden! latestAnalysis:', latestAnalysis);
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-beauty-rose/10 via-beauty-violet/10 to-black px-2 pb-24">
        <div className="w-full max-w-sm mx-auto bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl px-4 py-8 flex flex-col items-center border border-beauty-violet/30 mt-8 animate-fadeIn">
          <h2 className="text-2xl font-extrabold text-beauty-rose mb-2 text-center">No analysis result found!</h2>
          <p className="text-base text-white/90 mb-4 text-center">Try uploading a new photo or go back to the dashboard.</p>
          <button
            className="mt-6 px-6 py-3 bg-beauty-violet text-white rounded-2xl font-bold shadow hover:bg-beauty-violet/90 text-lg"
            onClick={() => navigate('/dashboard')}
          >Back to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-beauty-rose/10 via-beauty-violet/10 to-black px-2 pb-24 relative overflow-y-auto text-white">
      {/* Decorative Blur Elements wie Dashboard */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-beauty-rose/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-beauty-violet/20 rounded-full blur-2xl animate-pulse delay-1000" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-beauty-nude/20 rounded-full blur-xl animate-pulse delay-500" />
      <div className="relative z-10 w-full max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-6 pb-2 mb-6">
          <button onClick={handleBackToDashboard} className="p-2">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl font-bold font-poppins text-white">Analysis Results</h1>
          <ShareResults analysis={latestAnalysis} />
        </div>
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-lg mx-auto p-4 pt-2 pb-12 flex-1 flex flex-col min-h-[calc(100vh-60px)]"
        >
          {/* Overall Score - dezent, Brandfarben */}
          <section className="bg-gray-800/80 rounded-2xl p-6 shadow-xl border border-white/10 mb-8 flex flex-col items-center justify-center">
            <div className="relative w-44 h-44 mb-4 flex items-center justify-center">
              <svg width="176" height="176" shapeRendering="geometricPrecision">
                <circle cx="88" cy="88" r="78" fill="none" stroke="#e0e7ff" strokeWidth="10" />
                <motion.circle
                  cx="88"
                  cy="88"
                  r="78"
                  fill="none"
                  stroke={getScoreColor(latestAnalysis.scores.overall)}
                  strokeWidth="10"
                  strokeDasharray={2 * Math.PI * 78}
                  strokeDashoffset={
                    motionValue !== undefined
                      ? (2 * Math.PI * 78 * (1 - motionValue / 100))
                      : (2 * Math.PI * 78 * (1 - latestAnalysis.scores.overall / 100))
                  }
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 0.7s' }}
                />
              </svg>
              <span
                className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl font-bold"
                style={{ color: getScoreColor(latestAnalysis.scores.overall), letterSpacing: '0.02em', WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale', top: '8px' }}
              >
                {motionValue}%
              </span>
            </div>
            <span className="text-white/80 text-base font-semibold">Overall Score</span>
            <p className="text-gray-400 mt-3 max-w-md mx-auto text-center">
              {latestAnalysis.feedback && (latestAnalysis.feedback as any).overall ? (latestAnalysis.feedback as any).overall : "No overall feedback available."}
            </p>
          </section>
          {/* Bewertungs-Section: alle Kriterien in einer Card */}
          <section className="bg-gray-800/80 rounded-2xl p-6 shadow-xl border border-white/10 mb-8 w-full max-w-lg mx-auto">
            <div className="flex items-center mb-4">
              <Sparkles className="w-6 h-6 text-beauty-violet mr-2" />
              <h2 className="font-bold text-lg text-white">Detailed Evaluation</h2>
            </div>
            <div className="space-y-3">
              <RatingItem icon={Frown} label="Skin Clarity & Texture" score={latestAnalysis.scores.skin?.purity ?? 0} barWidth="w-32 md:w-40" />
              <RatingItem icon={Sparkles} label="Skin Hydration & Glow" score={latestAnalysis.scores.skin?.moisture ?? 0} barWidth="w-32 md:w-40" />
              <RatingItem icon={Dot} label="Pore Appearance" score={latestAnalysis.scores.skin?.pores ?? 0} barWidth="w-32 md:w-40" />
              <RatingItem icon={Layers} label="Makeup Coverage & Blending" score={latestAnalysis.scores.makeup?.blending ?? 0} barWidth="w-32 md:w-40" />
              <RatingItem icon={Palette} label="Color Matching & Tone" score={latestAnalysis.scores.makeup?.shade ?? 0} barWidth="w-32 md:w-40" />
              <RatingItem icon={Eye} label="Eye Area Freshness" score={latestAnalysis.scores.eyes?.concealer ?? 0} barWidth="w-32 md:w-40" />
              <RatingItem icon={Smile} label="Lip Condition & Precision" score={latestAnalysis.scores.lips?.condition ?? 0} barWidth="w-32 md:w-40" />
              <RatingItem icon={Star} label="Overall Harmony & Natural Look" score={latestAnalysis.scores.impression?.naturalness ?? 0} barWidth="w-32 md:w-40" />
            </div>
          </section>

          {/* Verbesserungs-Tipps Section */}
          <section className="bg-gradient-to-br from-beauty-violet/30 via-beauty-rose/20 to-beauty-nude/10 rounded-2xl p-6 shadow-xl border border-white/10 mb-8 w-full max-w-lg mx-auto animate-fadeIn">
            <div className="flex items-center mb-4">
              <Heart className="w-6 h-6 text-beauty-rose mr-2" />
              <h2 className="font-bold text-lg text-white font-poppins">4 Improvement Tips</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Smile,
                  title: "Mehr Feuchtigkeitspflege verwenden",
                  text: "Regelmäßige Feuchtigkeitspflege verbessert die Hautstruktur sichtbar.",
                },
                {
                  icon: Zap,
                  title: "Sanftes Peeling 1x pro Woche",
                  text: "Ein mildes Peeling entfernt abgestorbene Hautzellen und lässt die Haut strahlen.",
                },
                {
                  icon: Sun,
                  title: "Lichtschutzfaktor täglich nutzen",
                  text: "Schütze deine Haut vor UV-Strahlen, um vorzeitiger Alterung vorzubeugen.",
                },
                {
                  icon: Droplets,
                  title: "Ausreichend Wasser trinken",
                  text: "Viel Wasser unterstützt die Haut von innen und sorgt für einen frischen Teint.",
                },
              ].map((tip, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
                  className="bg-white/10 border border-beauty-violet/20 rounded-xl p-4 flex flex-col items-start shadow-lg min-h-[120px]"
                >
                  <div className="flex items-center mb-2">
                    <tip.icon className="w-6 h-6 text-beauty-violet mr-2" />
                    <span className="font-semibold text-white text-base font-poppins leading-tight">{tip.title}</span>
                  </div>
                  <span className="text-sm text-white/80 font-nunito">{tip.text}</span>
                </motion.div>
              ))}
            </div>
          </section>

          <div className="w-full max-w-lg mx-auto flex justify-center mt-8 mb-8 px-4">
            <button
              onClick={handleBackToDashboard}
              className="w-full bg-beauty-violet hover:bg-beauty-violet/90 text-white font-bold text-lg py-4 rounded-2xl shadow-xl transition-all duration-200"
            >
              Back to Home
            </button>
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default ResultsPage;
