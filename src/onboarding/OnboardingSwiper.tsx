import React, { useState } from "react";
import { Camera, Sparkles, Brush, Repeat, Eye, Droplet, Smile, CheckCircle, ArrowRight, User, Heart, Star, Sun, Cloud, Lock, Shield, X } from "lucide-react";
import PaywallScreen from "./PaywallScreen";
import { getOrCreateUserId } from '../lib/uuidHelper';
import { ensureLocalUserProfile } from '../lib/supabaseService';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const steps = [
  {
    key: "how-it-works",
    title: "How BeautyScan works",
    text: "Upload a selfie and get instant feedback on your makeup and skin condition.",
    icon: <Camera className="text-beauty-violet" size={56} />,
  },
  {
    key: "goals",
    title: "Your Goals",
    text: "What do you want to focus on?",
    options: [
      { label: "Clear Skin", icon: <Sparkles className="text-beauty-rose" size={28} /> },
      { label: "Perfect Makeup Fit", icon: <Brush className="text-beauty-violet" size={28} /> },
      { label: "Regular Progress", icon: <Repeat className="text-beauty-nude" size={28} /> },
    ],
  },
  {
    key: "frequency",
    title: "How Often?",
    text: "How often do you want to scan?",
    options: [
      { label: "Daily", icon: <Star className="text-beauty-rose" size={28} /> },
      { label: "2–3 times/week", icon: <Repeat className="text-beauty-violet" size={28} /> },
      { label: "Occasionally", icon: <Smile className="text-beauty-nude" size={28} /> },
    ],
  },
  {
    key: "focus-areas",
    title: "Focus Areas",
    text: "What areas are important to you?",
    options: [
      { label: "Skin", icon: <Droplet className="text-beauty-rose" size={24} /> },
      { label: "Makeup Fit", icon: <Brush className="text-beauty-violet" size={24} /> },
      { label: "Eyes", icon: <Eye className="text-beauty-nude" size={24} /> },
      { label: "Lips", icon: <Heart className="text-beauty-rose" size={24} /> },
    ],
    type: "checkbox",
  },
  {
    key: "skin-type",
    title: "Skin Type",
    text: "What is your skin type?",
    options: [
      { label: "Oily", icon: <Droplet className="text-beauty-rose" size={28} /> },
      { label: "Dry", icon: <Sun className="text-beauty-nude" size={28} /> },
      { label: "Combination", icon: <Cloud className="text-beauty-violet" size={28} /> },
      { label: "Normal", icon: <Smile className="text-beauty-rose" size={28} /> },
    ],
  },
  {
    key: "makeup-routine",
    title: "Makeup Routine",
    text: "How much makeup do you usually wear?",
    options: [
      { label: "None", icon: <X className="text-white" size={28} /> },
      { label: "Light", icon: <Sparkles className="text-beauty-rose" size={28} /> },
      { label: "Medium", icon: <Brush className="text-beauty-violet" size={28} /> },
      { label: "Full Glam", icon: <Star className="text-beauty-nude" size={28} /> },
    ],
  },
  {
    key: "photo-tips",
    title: "Photo Tips",
    text: "For best results, take your selfie in good light and without filters.",
    icon: <Sun className="text-beauty-rose" size={48} />,
    info: true,
  },
  {
    key: "privacy",
    title: "Privacy & Data",
    text: "Your photos are private and only you can see your results.",
    icon: <Lock className="text-beauty-violet" size={48} />,
    info: true,
  },
  {
    key: "paywall",
    paywall: true,
  },
  {
    key: "ready",
    title: "Ready to Start?",
    text: "Create your free account to begin your personalized beauty journey.",
    cta: true,
    icon: <User className="text-beauty-violet" size={48} />,
  },
];

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-black/70 backdrop-blur-xl rounded-2xl shadow-2xl px-4 py-8 md:px-8 md:py-12 flex flex-col items-center w-full max-w-sm mx-auto animate-fadeIn border border-beauty-violet/30"
    style={{ boxShadow: '0 8px 32px 0 rgba(160,132,220,0.18)' }}>
    {children}
  </div>
);

export const OnboardingSwiper: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [step, setStep] = useState(0);
  const [goals, setGoals] = useState<string | null>(null);
  const [frequency, setFrequency] = useState<string | null>(null);
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const [skinType, setSkinType] = useState<string | null>(null);
  const [makeupRoutine, setMakeupRoutine] = useState<string | null>(null);
  const [animDir, setAnimDir] = useState<'left' | 'right'>('right');
  const [loading, setLoading] = useState(false);
  const [loadingFinish, setLoadingFinish] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Swipe handling (touch/mouse)
  let startX = 0;
  let isTouch = false;

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    isTouch = "touches" in e;
    startX = isTouch ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    const endX = isTouch ? (e as React.TouchEvent).changedTouches[0].clientX : (e as React.MouseEvent).clientX;
    if (startX - endX > 50 && step < steps.length - 1) { setAnimDir('right'); setStep(step + 1); }
    if (endX - startX > 50 && step > 0) { setAnimDir('left'); setStep(step - 1); }
  };

  // Step rendering
  const renderStep = () => {
    const s = steps[step];
    if (s.paywall) {
      return <PaywallScreen onStartTrial={() => {
        navigate('/dashboard');
      }} />;
    }
    switch (s.key) {
      case "how-it-works":
        return (
          <Card>
            <div className="mb-4 animate-fadeIn flex flex-col items-center">
              {s.icon}
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2 headline text-beauty-rose drop-shadow-lg text-center">{s.title}</h2>
            <p className="text-base md:text-lg text-center body mb-6 text-white/90 leading-relaxed">{s.text}</p>
            <button
              className="mt-4 rounded-2xl py-4 px-8 bg-beauty-violet text-white font-bold shadow-xl text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-beauty-violet animate-fadeIn disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={() => {
                supabase.auth.signInAnonymously(); // Fire and forget
                setAnimDir('right');
                setStep(step + 1);
              }}
            >
              Continue <ArrowRight className="inline ml-1" size={22} />
            </button>
          </Card>
        );
      case "photo-tips":
      case "privacy":
        return (
          <Card>
            <div className="mb-4 animate-fadeIn flex flex-col items-center">
              {s.icon}
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2 headline text-beauty-rose drop-shadow-lg text-center">{s.title}</h2>
            <p className="text-base md:text-lg text-center body mb-6 text-white/90 leading-relaxed">{s.text}</p>
            <button
              className="mt-4 rounded-2xl py-4 px-8 bg-beauty-violet text-white font-bold shadow-xl text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-beauty-violet animate-fadeIn"
              onClick={() => { setAnimDir('right'); setStep(step + 1); }}
            >Continue <ArrowRight className="inline ml-1" size={22} /></button>
          </Card>
        );
      case "goals":
        return (
          <Card>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2 headline text-beauty-rose drop-shadow-lg text-center">{s.title}</h2>
            <p className="text-base md:text-lg text-center body mb-4 text-white/90 leading-relaxed">{s.text}</p>
            <div className="flex flex-col gap-4 w-full max-w-xs">
              {s.options!.map((opt) => (
                <button
                  key={opt.label}
                  className={`rounded-2xl py-4 px-4 text-lg font-semibold shadow-lg flex items-center gap-3 transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none border-2 ${goals === opt.label ? 'bg-beauty-violet text-white border-beauty-violet animate-pulse' : 'bg-black/80 text-beauty-violet border-beauty-violet/40'}`}
                  onClick={() => { setGoals(opt.label); setAnimDir('right'); setTimeout(() => setStep(step + 1), 180); }}
                  style={{ minHeight: 56 }}
                >
                  {opt.icon} <span className="ml-1">{opt.label}</span>
                </button>
              ))}
            </div>
          </Card>
        );
      case "frequency":
        return (
          <Card>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2 headline text-beauty-rose drop-shadow-lg text-center">{s.title}</h2>
            <p className="text-base md:text-lg text-center body mb-4 text-white/90 leading-relaxed">{s.text}</p>
            <div className="flex flex-col gap-4 w-full max-w-xs">
              {s.options!.map((opt) => (
                <button
                  key={opt.label}
                  className={`rounded-2xl py-4 px-4 text-lg font-semibold shadow-lg flex items-center gap-3 transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none border-2 ${frequency === opt.label ? 'bg-beauty-violet text-white border-beauty-violet animate-pulse' : 'bg-black/80 text-beauty-violet border-beauty-violet/40'}`}
                  onClick={() => { setFrequency(opt.label); setAnimDir('right'); setTimeout(() => setStep(step + 1), 180); }}
                  style={{ minHeight: 56 }}
                >
                  {opt.icon} <span className="ml-1">{opt.label}</span>
                </button>
              ))}
            </div>
          </Card>
        );
      case "focus-areas":
        return (
          <Card>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2 headline text-beauty-rose drop-shadow-lg text-center">{s.title}</h2>
            <p className="text-base md:text-lg text-center body mb-4 text-white/90 leading-relaxed">{s.text}</p>
            <div className="flex flex-col gap-4 w-full max-w-xs">
              {s.options!.map((opt) => {
                const selected = focusAreas.includes(opt.label);
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setFocusAreas((prev) => prev.includes(opt.label) ? prev.filter(o => o !== opt.label) : [...prev, opt.label])}
                    className={`flex items-center gap-3 bg-black/80 rounded-2xl px-4 py-4 shadow-lg cursor-pointer transition-all duration-200 border-2 relative group
                      ${selected ? 'border-beauty-violet bg-beauty-violet/10 shadow-xl ring-2 ring-beauty-violet/60 scale-105' : 'border-beauty-violet/40'}
                      hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-beauty-violet/80`}
                    style={{ transition: 'box-shadow 0.3s, border-color 0.3s, background 0.3s, transform 0.2s' }}
                  >
                    <span className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-beauty-violet/60 bg-white/10 mr-2 relative">
                      {/* Animated checkmark */}
                      <span className={`block w-4 h-4 rounded-full transition-all duration-200 ${selected ? 'bg-beauty-violet' : 'bg-transparent'}`}></span>
                      {selected && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        </span>
                      )}
                    </span>
                    <span className="text-lg font-semibold text-white flex items-center gap-1">
                      {opt.icon} {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <button
              className="mt-8 rounded-2xl py-4 px-8 bg-beauty-violet text-white font-bold shadow-xl text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-beauty-violet"
              onClick={() => { setAnimDir('right'); setTimeout(() => setStep(step + 1), 180); }}
              disabled={focusAreas.length === 0}
              style={{ opacity: focusAreas.length === 0 ? 0.5 : 1 }}
            >Continue <ArrowRight className="inline ml-1" size={22} /></button>
          </Card>
        );
      case "skin-type":
        return (
          <Card>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2 headline text-beauty-rose drop-shadow-lg text-center">{s.title}</h2>
            <p className="text-base md:text-lg text-center body mb-4 text-white/90 leading-relaxed">{s.text}</p>
            <div className="flex flex-col gap-4 w-full max-w-xs">
              {s.options!.map((opt) => (
                <button
                  key={opt.label}
                  className={`rounded-2xl py-4 px-4 text-lg font-semibold shadow-lg flex items-center gap-3 transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none border-2 ${skinType === opt.label ? 'bg-beauty-violet text-white border-beauty-violet animate-pulse' : 'bg-black/80 text-beauty-violet border-beauty-violet/40'}`}
                  onClick={() => { setSkinType(opt.label); setAnimDir('right'); setTimeout(() => setStep(step + 1), 180); }}
                  style={{ minHeight: 56 }}
                >
                  {opt.icon} <span className="ml-1">{opt.label}</span>
                </button>
              ))}
            </div>
          </Card>
        );
      case "makeup-routine":
        return (
          <Card>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2 headline text-beauty-rose drop-shadow-lg text-center">{s.title}</h2>
            <p className="text-base md:text-lg text-center body mb-4 text-white/90 leading-relaxed">{s.text}</p>
            <div className="flex flex-col gap-4 w-full max-w-xs">
              {s.options!.map((opt) => (
                <button
                  key={opt.label}
                  className={`rounded-2xl py-4 px-4 text-lg font-semibold shadow-lg flex items-center gap-3 transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none border-2 ${makeupRoutine === opt.label ? 'bg-beauty-violet text-white border-beauty-violet animate-pulse' : 'bg-black/80 text-beauty-violet border-beauty-violet/40'}`}
                  onClick={() => { setMakeupRoutine(opt.label); setAnimDir('right'); setTimeout(() => setStep(step + 1), 180); }}
                  style={{ minHeight: 56 }}
                >
                  {opt.icon} <span className="ml-1">{opt.label}</span>
                </button>
              ))}
            </div>
          </Card>
        );
      case "ready":
        return (
          <Card>
            <div className="mb-4 animate-fadeIn flex flex-col items-center">
              {s.icon}
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2 headline text-beauty-rose drop-shadow-lg text-center">{s.title}</h2>
            <p className="text-base md:text-lg text-center body mb-4 text-white/90 leading-relaxed">{s.text}</p>
            <div className="flex gap-4 mt-4 w-full justify-center">
              <button
                className="rounded-2xl py-4 px-8 bg-beauty-violet text-white font-bold shadow-xl text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-beauty-violet disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={async () => {
                  setLoadingFinish(true);
                  // Warte bis user im AuthContext gesetzt ist (max 3s)
                  let tries = 0;
                  while (!user && tries < 30) {
                    await new Promise(res => setTimeout(res, 100));
                    tries++;
                  }
                  setLoadingFinish(false);
                  onFinish();
                }}
                disabled={loadingFinish}
              >
                {loadingFinish ? (
                  <span className="flex items-center justify-center"><svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>Loading...</span>
                ) : (
                  <>Sign Up</>
                )}
              </button>
            </div>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#181028] via-[#232946] to-[#2d1a3a] px-2 relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      style={{ touchAction: 'pan-y' }}
    >
      <div className="w-full max-w-sm h-[70vh] flex items-center justify-center">
        {renderStep()}
      </div>
      <div className="flex gap-3 mt-8">
        {steps.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${i === step ? 'bg-beauty-rose scale-125 shadow-lg' : 'bg-white/40 scale-100'} ${i === step ? 'animate-fadeIn' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default OnboardingSwiper; 