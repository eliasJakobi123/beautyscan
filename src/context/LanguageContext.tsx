import React, { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isManuallySelected: boolean;
  setManualLanguage: (lang: Language) => void;
}

interface Translations {
  [key: string]: {
    en: string;
  };
}

const translations: Translations = {
  // Welcome & Onboarding
  welcome: { en: "Welcome to BeautyScan" },
  animatedWelcome: { en: "Welcome to BeautyScan – your personal makeup & skincare assistant." },
  welcomeSubtitle: { en: "Your personal beauty companion" },
  selectLanguage: { en: "Select your language" },
  next: { en: "Next" },
  back: { en: "Back" },
  finish: { en: "Finish" },
  skip: { en: "Skip" },
  continue: { en: "Continue" },
  // Plans & Features
  freePlan: { en: "Free Plan" },
  premiumPlan: { en: "Premium Plan" },
  freeFeatures: { en: "Free features" },
  premiumFeatures: { en: "Premium features" },
  upgradeToPremium: { en: "Upgrade to Premium" },
  currentPlan: { en: "Current Plan" },
  scanLimit: { en: "Monthly scan limit" },
  unlimitedScans: { en: "Unlimited scans" },
  premiumRequired: { en: "Premium required" },
  premiumRequiredDesc: { en: "Upgrade to Premium to unlock this feature." },
  // Progress & Dashboard
  progressTitle: { en: "Your Progress" },
  progressSubtitle: { en: "Track your skin journey and achievements" },
  dashboardTitle: { en: "Dashboard" },
  weeklyOverview: { en: "Weekly Overview" },
  monthlyOverview: { en: "Monthly Overview" },
  totalScans: { en: "Total Scans" },
  thisWeek: { en: "This Week" },
  thisMonth: { en: "This Month" },
  scansUsedThisMonth: { en: "Scans used this month" },
  // Upload & Analysis
  uploadTitle: { en: "Upload your photo" },
  uploadSubtitle: { en: "For best results, use a clear, well-lit photo" },
  uploadButton: { en: "Upload" },
  takePhoto: { en: "Take Photo" },
  chooseFromGallery: { en: "Choose from Gallery" },
  analyzing: { en: "Analyzing..." },
  analysisComplete: { en: "Analysis Complete" },
  lastAnalysis: { en: "Last Analysis" },
  analysisResults: { en: "Analysis Results" },
  skinHealth: { en: "Skin Health" },
  hydration: { en: "Hydration" },
  texture: { en: "Texture" },
  pigmentation: { en: "Pigmentation" },
  wrinkles: { en: "Wrinkles" },
  pores: { en: "Pores" },
  acne: { en: "Acne" },
  redness: { en: "Redness" },
  darkCircles: { en: "Dark Circles" },
  underEyeBags: { en: "Under Eye Bags" },
  fineLines: { en: "Fine Lines" },
  sunDamage: { en: "Sun Damage" },
  oiliness: { en: "Oiliness" },
  dryness: { en: "Dryness" },
  sensitivity: { en: "Sensitivity" },
  elasticity: { en: "Elasticity" },
  firmness: { en: "Firmness" },
  evenness: { en: "Evenness" },
  clarity: { en: "Clarity" },
  brightness: { en: "Brightness" },
  smoothness: { en: "Smoothness" },
  // History
  historyTitle: { en: "History" },
  noScansYet: { en: "No scans yet" },
  startYourFirstScan: { en: "Start your first scan" },
  scanHistory: { en: "Scan History" },
  viewDetails: { en: "View Details" },
  deleteScan: { en: "Delete Scan" },
  confirmDelete: { en: "Are you sure you want to delete this scan?" },
  // Share & Results
  shareResults: { en: "Share your results" },
  saveResults: { en: "Save Results" },
  copyLink: { en: "Copy Link" },
  downloadImage: { en: "Download Image" },
  shareOnTikTok: { en: "Share on TikTok" },
  shareOnInstagram: { en: "Share on Instagram" },
  shareOnWhatsApp: { en: "Share on WhatsApp" },
  shareOnPinterest: { en: "Share on Pinterest" },
  linkCopied: { en: "Link copied to clipboard!" },
  imageSaved: { en: "Image saved to gallery!" },
  shareError: { en: "Error sharing results" },
  // Settings
  settingsTitle: { en: "Settings" },
  logout: { en: "Logout" },
  deleteAccount: { en: "Delete Account" },
  downloadData: { en: "Download Data" },
  language: { en: "Language" },
  notifications: { en: "Notifications" },
  privacy: { en: "Privacy" },
  terms: { en: "Terms of Service" },
  about: { en: "About" },
  version: { en: "Version" },
  confirmLogout: { en: "Are you sure you want to logout?" },
  confirmDeleteAccount: { en: "Are you sure you want to delete your account? This action cannot be undone." },
  accountDeleted: { en: "Account deleted successfully" },
  dataDownloaded: { en: "Data downloaded successfully" },
  // Achievements
  achievementsTitle: { en: "Achievements" },
  achievementUnlocked: { en: "Achievement unlocked!" },
  achievementLocked: { en: "Locked" },
  weekWarrior: { en: "Week Warrior" },
  weekWarriorDesc: { en: "Scan every day for a week" },
  monthlyStreak: { en: "Monthly Streak" },
  monthlyStreakDesc: { en: "Scan every week for a month" },
  firstScan: { en: "First Scan" },
  firstScanDesc: { en: "Complete your first skin analysis" },
  regularUser: { en: "Regular User" },
  regularUserDesc: { en: "Complete 10 scans" },
  powerUser: { en: "Power User" },
  powerUserDesc: { en: "Complete 50 scans" },
  skinExpert: { en: "Skin Expert" },
  skinExpertDesc: { en: "Complete 100 scans" },
  consistencyKing: { en: "Consistency King" },
  consistencyKingDesc: { en: "Scan 5 days in a row" },
  // Onboarding
  onboardingGoalsTitle: { en: "What are your goals?" },
  onboardingGoalsDesc: { en: "Select your main skin and beauty goals." },
  skinTypeTitle: { en: "What is your skin type?" },
  skinTypeDesc: { en: "Choose the option that best describes your skin." },
  makeupFrequencyTitle: { en: "How often do you wear makeup?" },
  makeupFrequencyDesc: { en: "This helps us personalize your experience." },
  productsTitle: { en: "Which products do you use?" },
  productsDesc: { en: "Select all that apply." },
  howItWorksTitle: { en: "How it works" },
  howItWorksDesc: { en: "Scan, track, and improve your skin with AI." },
  premiumScreenTitle: { en: "Go Premium" },
  premiumScreenDesc: { en: "Unlock all features and unlimited scans." },
  completeTitle: { en: "You're all set!" },
  completeDesc: { en: "Start your first scan and enjoy your journey." },
  compareScreenTitle: { en: "Compare your results" },
  compareScreenDesc: { en: "See how your skin changes over time." },
  onboardingComplete: { en: "Onboarding complete!" },
  onboardingStart: { en: "Start onboarding" },
  onboardingBack: { en: "Back to onboarding" },
  onboardingSkip: { en: "Skip onboarding" },
  // How it works steps
  howItWorks: { en: "How BeautyScan works" },
  step1: { en: "Take a photo" },
  step1Desc: { en: "Take a clear photo of your skin for the best analysis." },
  step2: { en: "AI Analysis" },
  step2Desc: { en: "Our advanced AI analyzes your skin in seconds." },
  step3: { en: "Personalized Recommendations" },
  step3Desc: { en: "Get tailored product and care recommendations." },
  // Skin types
  skinTypeNormal: { en: "Normal Skin" },
  skinTypeDry: { en: "Dry Skin" },
  skinTypeOily: { en: "Oily Skin" },
  skinTypeCombination: { en: "Combination Skin" },
  skinTypeSensitive: { en: "Sensitive Skin" },
  skinTypeMature: { en: "Mature Skin" },
  // Skin goals
  goalAntiAging: { en: "Anti-Aging" },
  goalAcne: { en: "Acne Treatment" },
  goalBrightening: { en: "Brightening" },
  goalHydration: { en: "Hydration" },
  goalEvenTone: { en: "Even Tone" },
  goalPoreReduction: { en: "Pore Reduction" },
  goalSensitivity: { en: "Reduce Sensitivity" },
  goalFirmness: { en: "Firmness" },
  // Makeup frequency
  makeupNever: { en: "Never" },
  makeupRarely: { en: "Rarely" },
  makeupSometimes: { en: "Sometimes" },
  makeupOften: { en: "Often" },
  makeupDaily: { en: "Daily" },
  // Products
  productCleanser: { en: "Cleanser" },
  productMoisturizer: { en: "Moisturizer" },
  productSunscreen: { en: "Sunscreen" },
  productSerum: { en: "Serum" },
  productMask: { en: "Mask" },
  productExfoliator: { en: "Exfoliator" },
  productToner: { en: "Toner" },
  productEyeCream: { en: "Eye Cream" },
  productFoundation: { en: "Foundation" },
  productConcealer: { en: "Concealer" },
  productBlush: { en: "Blush" },
  productLipstick: { en: "Lipstick" },
  productMascara: { en: "Mascara" },
  productEyeshadow: { en: "Eyeshadow" },
  // Privacy
  privacyTitle: { en: "Privacy" },
  privacyDesc: { en: "Your data is safe and handled confidentially." },
  privacyDataUsage: { en: "Data Usage" },
  privacyDataSharing: { en: "Data Sharing" },
  privacyDataStorage: { en: "Data Storage" },
  privacyConsent: { en: "I agree to the privacy policy" },
  // App goals
  appGoalsTitle: { en: "What do you want to achieve with BeautyScan?" },
  appGoalsDesc: { en: "Select your main goals for skincare and makeup." },
  goalTrackProgress: { en: "Track Progress" },
  goalGetRecommendations: { en: "Get Product Recommendations" },
  goalImproveRoutine: { en: "Improve Routine" },
  goalLearnAboutSkin: { en: "Learn About My Skin" },
  goalCompareResults: { en: "Compare Results" },
  goalShareResults: { en: "Share Results" },
  // Common actions
  save: { en: "Save" },
  cancel: { en: "Cancel" },
  confirm: { en: "Confirm" },
  delete: { en: "Delete" },
  edit: { en: "Edit" },
  add: { en: "Add" },
  remove: { en: "Remove" },
  select: { en: "Select" },
  choose: { en: "Choose" },
  // Status messages
  loading: { en: "Loading..." },
  error: { en: "Error" },
  success: { en: "Success" },
  warning: { en: "Warning" },
  info: { en: "Information" },
  // Time periods
  today: { en: "Today" },
  yesterday: { en: "Yesterday" },
  lastWeek: { en: "Last Week" },
  lastMonth: { en: "Last Month" },
  // Quality indicators
  excellent: { en: "Excellent" },
  good: { en: "Good" },
  fair: { en: "Fair" },
  poor: { en: "Poor" },
  // Measurements
  percentage: { en: "Percentage" },
  score: { en: "Score" },
  rating: { en: "Rating" },
  level: { en: "Level" },
  // Navigation
  home: { en: "Home" },
  profile: { en: "Profile" },
  help: { en: "Help" },
  support: { en: "Support" },
  feedback: { en: "Feedback" },
  contact: { en: "Contact" },
  // Original onboarding keys
  goalsTitle: { en: "What are your goals?" },
  goal1: { en: "Track Progress" },
  goal2: { en: "Get Recommendations" },
  goal3: { en: "Improve Routine" },
  goal4: { en: "Learn About Skin" },
  goal5: { en: "Compare Results" },
  oily: { en: "Oily" },
  dry: { en: "Dry" },
  combination: { en: "Combination" },
  sensitive: { en: "Sensitive" },
  dontKnow: { en: "Don't Know" },
  never: { en: "Never" },
  rarely: { en: "Rarely" },
  sometimes: { en: "Sometimes" },
  daily: { en: "Daily" },
  foundation: { en: "Foundation" },
  mascara: { en: "Mascara" },
  lipProducts: { en: "Lip Products" },
  eyeliner: { en: "Eyeliner" },
  highlighter: { en: "Highlighter" },
  skincare: { en: "Skincare" },
  letsStart: { en: "Let's Start" },
  premiumTitle: { en: "Go Premium" },
  premiumDesc: { en: "Unlock all features and unlimited scans" },
  feature1: { en: "Unlimited skin analyses" },
  feature2: { en: "Personalized product recommendations" },
  feature3: { en: "Progress tracking and statistics" },
  monthlyPlan: { en: "Monthly" },
  yearlyPlan: { en: "Yearly" },
  save30: { en: "Save 30%" },
  startPremium: { en: "Start Premium" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");
  const [isManuallySelected, setIsManuallySelected] = useState(false);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const setManualLanguage = (lang: Language) => {
    setLanguage(lang);
    setIsManuallySelected(true);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isManuallySelected,
        setManualLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}; 