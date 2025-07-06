import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const welcomeText = "Welcome to BeautyScan – your personal makeup & skincare assistant.";

const AnimatedWelcomeText: React.FC<{ onFinish: () => void; onEnsureUserId?: () => void | Promise<void> }> = ({ onFinish, onEnsureUserId }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    if (onEnsureUserId) onEnsureUserId();
    const fadeOutTimer = setTimeout(() => setVisible(false), 2600);
    const finishTimer = setTimeout(() => onFinish(), 3200);
    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish, onEnsureUserId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#181028] via-[#232946] to-[#2d1a3a] relative overflow-hidden">
      {/* Animated Sparkles */}
      <Sparkles className="absolute top-8 left-8 text-beauty-violet opacity-30 animate-spin-slow" size={48} />
      <Sparkles className="absolute bottom-8 right-8 text-beauty-rose opacity-20 animate-pulse" size={40} />
      <div
        className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
          bg-black/70 backdrop-blur-xl rounded-2xl shadow-2xl px-8 py-12 flex flex-col items-center max-w-lg mx-auto border border-beauty-violet/30`}
        style={{ boxShadow: '0 8px 32px 0 rgba(160,132,220,0.18)' }}
      >
        <div className="mb-4 animate-fadeIn">
          <Sparkles className="text-beauty-violet" size={56} />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-beauty-rose headline mb-2 drop-shadow-lg">
          Welcome to <span className="text-beauty-violet">BeautyScan</span>
        </h1>
        <p className="text-lg md:text-xl text-center body text-white/90 font-medium animate-fadeIn mt-2">
          Your personal makeup & skincare assistant.<br />
          <span className="text-beauty-nude">Let's glow up together!</span>
        </p>
      </div>
    </div>
  );
};

export default AnimatedWelcomeText;

// Custom animation (add to tailwind.config.ts if noch nicht vorhanden):
// 'spin-slow': 'spin 2.5s linear infinite', 