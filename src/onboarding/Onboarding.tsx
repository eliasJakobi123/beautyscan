import React, { useState, useEffect } from "react";
import AnimatedWelcomeText from "./AnimatedWelcomeText";
import OnboardingSwiper from "./OnboardingSwiper";
import { ensureLocalUserProfile } from '../lib/supabaseService';
import { getOrCreateUserId } from '../lib/uuidHelper';

const Onboarding: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleFinish = async () => {
    try {
      await ensureLocalUserProfile();
    } catch (e) {
      // Optional: Fehlerbehandlung/logging
      console.error('Failed to create user profile:', e);
    }
    onFinish();
  };

  // Funktion, die die User-ID anlegt (nur UUID, kein Supabase-Auth)
  const ensureUserId = () => {
    getOrCreateUserId();
  };

  return showWelcome ? (
    <AnimatedWelcomeText onFinish={() => setShowWelcome(false)} onEnsureUserId={ensureUserId} />
  ) : (
    <OnboardingSwiper onFinish={handleFinish} />
  );
};

export default Onboarding; 