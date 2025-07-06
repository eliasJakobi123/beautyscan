import React from "react";
import { useNavigate } from "react-router-dom";
import OnboardingContainer from "@/components/onboarding/OnboardingContainer";
import WelcomeScreen from "@/components/onboarding/WelcomeScreen";
import LanguageScreen from "@/components/onboarding/LanguageScreen";
import SkinTypeScreen from "@/components/onboarding/SkinTypeScreen";
import SkinGoalsScreen from "@/components/onboarding/SkinGoalsScreen";
import MakeupFrequencyScreen from "@/components/onboarding/MakeupFrequencyScreen";
import ProductsScreen from "@/components/onboarding/ProductsScreen";
import AppGoalsScreen from "@/components/onboarding/AppGoalsScreen";
import PrivacyScreen from "@/components/onboarding/PrivacyScreen";
import PremiumScreen from "@/components/onboarding/PremiumScreen";
import HowItWorksScreen from "@/components/onboarding/HowItWorksScreen";
import CompareScreen from "@/components/onboarding/CompareScreen";
import CompleteScreen from "@/components/onboarding/CompleteScreen";

const Onboarding = () => {
  const navigate = useNavigate();

  const handleComplete = () => {
    // Navigate to dashboard after onboarding
    navigate("/dashboard");
  };

  const screens = [
    WelcomeScreen,
    LanguageScreen,
    SkinTypeScreen,
    SkinGoalsScreen,
    MakeupFrequencyScreen,
    ProductsScreen,
    AppGoalsScreen,
    PrivacyScreen,
    PremiumScreen,
    HowItWorksScreen,
    CompareScreen,
    CompleteScreen,
  ];

  return (
    <OnboardingContainer
      screens={screens}
      onComplete={handleComplete}
    />
  );
};

export default Onboarding;
