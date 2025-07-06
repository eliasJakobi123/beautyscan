import React from "react";
import { useNavigate } from "react-router-dom";
import OnboardingContainer from "@/components/onboarding/OnboardingContainer";
import WelcomeScreen from "@/components/onboarding/WelcomeScreen";
import LanguageScreen from "@/components/onboarding/LanguageScreen";
import AppGoalsScreen from "@/components/onboarding/AppGoalsScreen";
import MakeupFrequencyScreen from "@/components/onboarding/MakeupFrequencyScreen";
import ProductsScreen from "@/components/onboarding/ProductsScreen";
import HowItWorksScreen from "@/components/onboarding/HowItWorksScreen";
import CompareScreen from "@/components/onboarding/CompareScreen";
import PremiumScreen from "@/components/onboarding/PremiumScreen";
import PrivacyScreen from "@/components/onboarding/PrivacyScreen";
import CompleteScreen from "@/components/onboarding/CompleteScreen";

const Onboarding = () => {
  const navigate = useNavigate();

  const screens = [
    WelcomeScreen,
    LanguageScreen,
    AppGoalsScreen,
    MakeupFrequencyScreen,
    ProductsScreen,
    HowItWorksScreen,
    CompareScreen,
    PremiumScreen,
    PrivacyScreen,
    CompleteScreen,
  ];

  const handleComplete = () => {
    // Navigate to dashboard after onboarding completion
    navigate("/dashboard");
  };

  return <OnboardingContainer screens={screens} onComplete={handleComplete} />;
};

export default Onboarding;
