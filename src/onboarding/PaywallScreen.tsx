import React, { useEffect, useState } from "react";
import { CheckCircle, Lock, Sparkles, Clock, Star, ShoppingBag } from "lucide-react";

const benefits = [
  "Daily Beauty Scans & Instant Feedback",
  "Personal Skin & Makeup Insights",
  "Track Your Progress & Improvements",
  "Cancel Anytime, No Risk",
];

const PaywallScreen: React.FC<{ onStartTrial: () => void }> = ({ onStartTrial }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [plan, setPlan] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  // Rabatt-Badge für das Jahresabo
  const PopularBadge = () => (
    <span className="absolute -top-3 right-3 px-3 py-1 rounded-full bg-beauty-rose text-white text-xs font-bold shadow-lg animate-fadeIn border-2 border-white/20 z-10">Popular</span>
  );

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-beauty-rose/10 via-beauty-violet/10 to-black px-2 pb-24 relative overflow-hidden">
      {/* Decorative Blur Elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-beauty-rose/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-beauty-violet/20 rounded-full blur-2xl animate-pulse delay-1000" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-beauty-nude/20 rounded-full blur-xl animate-pulse delay-500" />
      {/* Confetti/Sparkle effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-10 animate-fadeIn">
          <Sparkles className="absolute left-8 top-8 text-beauty-rose opacity-60 animate-spin-slow" size={48} />
          <Sparkles className="absolute right-8 top-12 text-beauty-violet opacity-40 animate-pulse" size={40} />
          <Sparkles className="absolute left-1/2 bottom-8 -translate-x-1/2 text-beauty-nude opacity-50 animate-fadeIn" size={56} />
        </div>
      )}
      <div className="relative z-20 w-full max-w-md mx-auto">
        <div className="bg-black/80 backdrop-blur-xl rounded-3xl shadow-2xl px-4 py-8 md:px-8 md:py-10 flex flex-col items-center animate-fadeIn border border-beauty-violet/30 w-full max-w-md mx-auto my-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-center text-beauty-rose headline mb-4 drop-shadow-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Maximize your look with BeautyScan!
          </h1>
          <ul className="w-full flex flex-col gap-3 mb-6 mt-2">
            {benefits.map((b, i) => (
              <li key={b} className="flex items-center gap-3 text-white/90 text-base md:text-lg font-medium animate-fadeIn" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
                <CheckCircle className="text-beauty-rose flex-shrink-0" size={22} />
                {b}
              </li>
            ))}
          </ul>
          {/* Plan Auswahl */}
          <div className="flex flex-col sm:flex-row gap-3 w-full mb-6 mt-2 justify-center">
            <button
              className={`relative w-full sm:w-auto px-4 py-4 rounded-2xl border-2 font-bold text-lg transition-all duration-200 shadow-md focus:outline-none ${plan === 'monthly' ? 'bg-beauty-violet text-white border-beauty-violet scale-105 shadow-xl' : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20'}`}
              onClick={() => setPlan('monthly')}
              style={{ fontFamily: 'Poppins, sans-serif', minHeight: 80 }}
            >
              <div className="flex flex-col items-center justify-center w-full">
                <div className="flex items-end gap-1">
                  <span>€11.99</span>
                  <span className="text-xs ml-1 font-normal">/month</span>
                </div>
                <span className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-beauty-nude/80 text-beauty-violet text-xs font-bold shadow animate-fadeIn border border-beauty-violet/20">
                  <ShoppingBag className="w-4 h-4 mr-1 text-beauty-violet" />
                  less than a lipstick
                </span>
              </div>
            </button>
            <button
              className={`relative w-full sm:w-auto px-4 py-4 rounded-2xl border-2 font-bold text-lg transition-all duration-200 shadow-md focus:outline-none ${plan === 'yearly' ? 'bg-beauty-violet text-white border-beauty-violet scale-105 shadow-xl' : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20'}`}
              onClick={() => setPlan('yearly')}
              style={{ fontFamily: 'Poppins, sans-serif', minHeight: 80 }}
            >
              {<PopularBadge />}
              <div className="flex flex-col items-center justify-center w-full">
                <div className="flex items-end gap-1">
                  <span>€79</span>
                  <span className="text-xs ml-1 font-normal">/year</span>
                </div>
                <span className="mt-2 px-2 py-0.5 rounded-full bg-green-500 text-white text-xs font-bold animate-fadeIn">save over 30%</span>
              </div>
            </button>
          </div>
          <button
            className="w-full mt-2 mb-3 py-4 rounded-2xl bg-pink-500 hover:bg-pink-400 text-white font-bold text-lg shadow-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400 animate-fadeIn"
            onClick={onStartTrial}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {plan === 'monthly' ? 'Start my 3 days free trial' : 'Start my 3 days free trial (Yearly)'}
          </button>
          <div className="w-full text-center mb-2">
            <span className="text-xs md:text-sm font-bold text-white" style={{ fontFamily: 'Nunito, sans-serif' }}>
              {plan === 'monthly'
                ? 'Try 3 Days Free – then €11.99 per month'
                : 'Try 3 Days Free – then €79 per year (save over 30%)'}
            </span>
            <div className="text-xs text-white/70 mt-1 mb-2">No hidden fees. Cancel anytime in your account.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaywallScreen; 