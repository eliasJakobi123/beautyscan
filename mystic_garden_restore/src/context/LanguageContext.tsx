import React, { createContext, useContext, useState, ReactNode } from "react";

export type Language = "de" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isManuallySelected: boolean;
  setManualLanguage: (lang: Language) => void;
}

interface Translations {
  [key: string]: {
    [K in Language]: string;
  };
}

const translations: Translations = {
  // Welcome and Onboarding
  welcome: {
    de: "Willkommen bei BeautyScan",
    en: "Welcome to BeautyScan",
  },
  animatedWelcome: {
    de: "Willkommen bei BeautyScan – dein persönlicher Make-up & Skincare Assistent.",
    en: "Welcome to BeautyScan – your personal makeup & skincare assistant.",
  },
  welcomeSubtitle: {
    de: "Dein persönlicher Assistent für Make-up und Hautpflege. Erhalte ehrliches Feedback, optimiere deine Looks und finde heraus, was wirklich zu dir passt – ganz einfach mit KI.",
    en: "Your personal assistant for makeup and skincare. Get honest feedback, optimize your looks and discover what really suits you – simply with AI.",
  },
  selectLanguage: {
    de: "Wähle deine Sprache aus, damit du die App perfekt verstehst.",
    en: "Choose your language so you understand the app perfectly.",
  },

  // How it works
  howItWorks: {
    de: "So funktioniert BeautyScan",
    en: "How BeautyScan Works",
  },
  step1: {
    de: "Bild aufnehmen",
    en: "Take a picture",
  },
  step1Desc: {
    de: "Lade ein Selfie hoch oder mach ein neues.",
    en: "Upload a selfie or take a new one.",
  },
  step2: {
    de: "Analyse starten",
    en: "Start analysis",
  },
  step2Desc: {
    de: "Die KI analysiert dein Make-up oder Hautbild in Sekunden.",
    en: "The AI analyzes your makeup or skin in seconds.",
  },
  step3: {
    de: "Feedback erhalten",
    en: "Get feedback",
  },
  step3Desc: {
    de: "Du bekommst klare Hinweise, was verbessert werden kann – ganz ohne Werbung, ganz objektiv.",
    en: "You get clear hints on what can be improved – completely ad-free, completely objective.",
  },

  // Goals
  goalsTitle: {
    de: "Was möchtest du mit BeautyScan erreichen?",
    en: "What do you want to achieve with BeautyScan?",
  },
  goal1: {
    de: "Besseres Make-up Feedback",
    en: "Better makeup feedback",
  },
  goal2: {
    de: "Hautbild verbessern",
    en: "Improve skin appearance",
  },
  goal3: {
    de: "Neue Looks testen",
    en: "Test new looks",
  },
  goal4: {
    de: "Routinen verbessern",
    en: "Improve routines",
  },
  goal5: {
    de: "Eigenes Styling besser verstehen",
    en: "Better understand own styling",
  },

  // Makeup frequency
  makeupFrequencyTitle: {
    de: "Wie oft trägst du Make-up?",
    en: "How often do you wear makeup?",
  },
  never: {
    de: "Sehr selten",
    en: "Very rarely",
  },
  rarely: {
    de: "Gelegentlich",
    en: "Occasionally",
  },
  sometimes: {
    de: "Mehrmals pro Woche",
    en: "Several times a week",
  },
  daily: {
    de: "Täglich",
    en: "Daily",
  },

  // Products
  productsTitle: {
    de: "Welche Kategorien verwendest du am häufigsten?",
    en: "Which categories do you use most frequently?",
  },
  foundation: {
    de: "Foundation",
    en: "Foundation",
  },
  mascara: {
    de: "Mascara",
    en: "Mascara",
  },
  lipProducts: {
    de: "Lippenprodukte",
    en: "Lip products",
  },
  eyeliner: {
    de: "Eyeliner",
    en: "Eyeliner",
  },
  highlighter: {
    de: "Highlighter",
    en: "Highlighter",
  },
  skincare: {
    de: "Skincare / Pflege",
    en: "Skincare / Care",
  },

  // Comparison and Premium
  compareTitle: {
    de: "Das bekommst du – kostenlos oder mit Premium",
    en: "What you get – free or with Premium",
  },
  compareDesc: {
    de: "BeautyScan Premium bietet dir das volle Potenzial – ganz ohne Einschränkungen.",
    en: "BeautyScan Premium offers you the full potential – without any restrictions.",
  },
  premiumTitle: {
    de: "Hol dir das volle Erlebnis",
    en: "Get the full experience",
  },
  premiumDesc: {
    de: "Mehr Analysen. Mehr Klarheit. Mehr Fortschritt. BeautyScan Premium bietet dir das volle Potenzial – ganz ohne Einschränkungen.",
    en: "More analyses. More clarity. More progress. BeautyScan Premium offers you the full potential – without restrictions.",
  },
  monthlyPlan: {
    de: "Monatlich",
    en: "Monthly",
  },
  yearlyPlan: {
    de: "Jährlich",
    en: "Yearly",
  },
  save30: {
    de: "Spare 30%",
    en: "Save 30%",
  },
  save50: {
    de: "-50%",
    en: "-50%",
  },
  feature1: {
    de: "🔓 10 Beauty-Analysen täglich",
    en: "🔓 10 Beauty analyses daily",
  },
  feature2: {
    de: "🧠 Präzisere KI-Ergebnisse",
    en: "🧠 More precise AI results",
  },
  feature3: {
    de: "🛠️ Volles App-Potenzial",
    en: "🛠️ Full app potential",
  },
  startPremium: {
    de: "Jetzt Premium sichern",
    en: "Get Premium Now",
  },

  // Privacy and Terms
  privacyTitle: {
    de: "Datenschutz & Bedingungen",
    en: "Privacy & Terms",
  },
  acceptTerms: {
    de: "Ich akzeptiere die AGB",
    en: "I accept the Terms of Service",
  },
  acceptPrivacy: {
    de: "Ich akzeptiere die Datenschutzerklärung",
    en: "I accept the Privacy Policy",
  },
  readTerms: {
    de: "AGB lesen",
    en: "Read Terms",
  },
  readPrivacy: {
    de: "Datenschutz lesen",
    en: "Read Privacy Policy",
  },

  // Completion
  completeTitle: {
    de: "Alles bereit!",
    en: "All Set!",
  },
  completeDesc: {
    de: "Du kannst jetzt deine erste Beauty-Analyse starten",
    en: "You can now start your first beauty analysis",
  },
  letsStart: {
    de: "Los geht's!",
    en: "Let's Start!",
  },

  // Common buttons and actions
  continue: {
    de: "Weiter",
    en: "Continue",
  },
  back: {
    de: "Zurück",
    en: "Back",
  },
  cancel: {
    de: "Abbrechen",
    en: "Cancel",
  },
  languages: {
    de: "Deutsch",
    en: "English",
  },

  // Plan types
  free: {
    de: "Kostenlos",
    en: "Free",
  },
  premium: {
    de: "Premium",
    en: "Premium",
  },
  analysesPerMonth: {
    de: "5/Monat",
    en: "5/month",
  },
  analysesPerDay: {
    de: "10/Tag",
    en: "10/day",
  },
  partialAnalysis: {
    de: "Teilweise",
    en: "Partial",
  },
  fullAnalysis: {
    de: "Detaillierte KI-Analyse",
    en: "Detailed AI analysis",
  },
  basicFeedback: {
    de: "Basis-Feedback",
    en: "Basic feedback",
  },
  preciseFeedback: {
    de: "Volles Feedback & Verlauf",
    en: "Full feedback & history",
  },
  tryPremium: {
    de: "Jetzt Premium freischalten",
    en: "Unlock Premium now",
  },
  startFree: {
    de: "Oder starte kostenlos mit begrenzten Funktionen",
    en: "Or start free with limited features",
  },
  newFeatures: {
    de: "Zugriff auf kommende Funktionen",
    en: "Access to upcoming features",
  },

  // Dashboard
  uploadImage: {
    de: "Bild hochladen",
    en: "Upload Image",
  },
  startBeautyAnalysis: {
    de: "Starte deine Beauty-Analyse",
    en: "Start your beauty analysis",
  },
  useCamera: {
    de: "Kamera verwenden",
    en: "Use Camera",
  },
  chooseFromGallery: {
    de: "Aus Galerie wählen",
    en: "Choose from Gallery",
  },
  lastAnalyses: {
    de: "Letzte Analysen",
    en: "Recent Analyses",
  },
  moreDetails: {
    de: "Mehr Details",
    en: "More Details",
  },
  scansUsed: {
    de: "Scans genutzt",
    en: "Scans used",
  },
  upgradePrompt: {
    de: "{used} von {total} Scans genutzt – Upgrade auf Premium",
    en: "{used} of {total} scans used – Upgrade to Premium",
  },
  skinType: {
    de: "Hautbild",
    en: "Skin",
  },
  lips: {
    de: "Lippen",
    en: "Lips",
  },
  eyes: {
    de: "Augen",
    en: "Eyes",
  },
  overall: {
    de: "Gesamt",
    en: "Overall",
  },
  quickTips: {
    de: "Schnell-Tipps",
    en: "Quick Tips",
  },
  premiumFeatures: {
    de: "Premium-Funktionen",
    en: "Premium Features",
  },
  analysisHistory: {
    de: "Analyse-Verlauf",
    en: "Analysis History",
  },
  viewFeedback: {
    de: "Feedback anzeigen",
    en: "Show Feedback",
  },
  photoForAnalysis: {
    de: "Foto für Analyse",
    en: "Photo for Analysis",
  },

  // Analysis Page
  analysisInProgress: {
    de: "Dein Foto wird analysiert...",
    en: "Your photo is being analyzed...",
  },
  pleaseWait: {
    de: "Einen Moment bitte.",
    en: "Please wait a moment.",
  },
  imageProcessing: {
    de: "Bild wird verarbeitet",
    en: "Image processing",
  },
  aiAnalysisRunning: {
    de: "KI-Analyse läuft",
    en: "AI analysis running",
  },
  generatingResults: {
    de: "Ergebnisse werden erstellt",
    en: "Generating results",
  },
  analysisComplete: {
    de: "Analyse abgeschlossen!",
    en: "Analysis complete!",
  },

  // Results Page
  beautyAnalysis: {
    de: "Deine Beauty-Analyse",
    en: "Your Beauty Analysis",
  },
  overallRating: {
    de: "Gesamtbewertung",
    en: "Overall Rating",
  },
  excellent: {
    de: "Exzellent",
    en: "Excellent",
  },
  good: {
    de: "Gut",
    en: "Good",
  },
  improvementPotential: {
    de: "Verbesserungspotential",
    en: "Room for improvement",
  },
  outOf100: {
    de: "von 100",
    en: "out of 100",
  },
  newAnalysis: {
    de: "Neue Analyse",
    en: "New Analysis",
  },
  viewHistory: {
    de: "Verlauf ansehen",
    en: "View History",
  },

  // Beauty categories
  skinAppearance: {
    de: "Hautbild",
    en: "Skin Appearance",
  },
  makeupOverall: {
    de: "Make-up insgesamt",
    en: "Overall Makeup",
  },
  lipArea: {
    de: "Lippen",
    en: "Lips",
  },
  eyeArea: {
    de: "Augenbereich",
    en: "Eye Area",
  },
  facialHarmony: {
    de: "Gesichtsharmonie",
    en: "Facial Harmony",
  },
  naturalness: {
    de: "Natürlichkeit",
    en: "Naturalness",
  },
  radiance: {
    de: "Ausstrahlung",
    en: "Radiance",
  },

  // Settings Page
  settings: {
    de: "Einstellungen",
    en: "Settings",
  },
  language: {
    de: "Sprache",
    en: "Language",
  },
  subscriptionPayments: {
    de: "Abo & Zahlungen",
    en: "Subscription & Payments",
  },
  notifications: {
    de: "Benachrichtigungen",
    en: "Notifications",
  },
  privacySecurity: {
    de: "Datenschutz & Sicherheit",
    en: "Privacy & Security",
  },
  contactHelp: {
    de: "Kontakt & Hilfe",
    en: "Contact & Help",
  },
  freePlan: {
    de: "Kostenlos",
    en: "Free",
  },
  premiumPlan: {
    de: "Premium Plan",
    en: "Premium Plan",
  },
  activeUntil: {
    de: "Aktiv bis {date}",
    en: "Active until {date}",
  },
  analysesUsed: {
    de: "{used} von {total} Analysen verwendet",
    en: "{used} of {total} analyses used",
  },
  changePlan: {
    de: "Plan ändern",
    en: "Change Plan",
  },
  upgrade: {
    de: "Upgrade",
    en: "Upgrade",
  },
  invoice: {
    de: "Rechnung",
    en: "Invoice",
  },
  pushNotifications: {
    de: "Push-Benachrichtigungen",
    en: "Push Notifications",
  },
  newFeaturesAndTips: {
    de: "Neue Features & Tipps",
    en: "New Features & Tips",
  },
  downloadMyData: {
    de: "Meine Daten herunterladen",
    en: "Download My Data",
  },
  exportAsJson: {
    de: "Als JSON-Datei exportieren",
    en: "Export as JSON file",
  },
  deleteAccount: {
    de: "Account löschen",
    en: "Delete Account",
  },
  confirmDeleteAccount: {
    de: "Bestätigen: Account löschen",
    en: "Confirm: Delete Account",
  },
  deleteAccountDesc: {
    de: "Alle Daten permanent entfernen",
    en: "Permanently remove all data",
  },
  deleteAccountConfirmDesc: {
    de: "Alle Daten werden unwiderruflich gelöscht",
    en: "All data will be irreversibly deleted",
  },
  contactSupport: {
    de: "Support kontaktieren",
    en: "Contact Support",
  },
  supportEmail: {
    de: "help@beautyscan.app",
    en: "help@beautyscan.app",
  },
  faq: {
    de: "Häufige Fragen (FAQ)",
    en: "Frequently Asked Questions (FAQ)",
  },
  faqDesc: {
    de: "Antworten auf häufige Probleme",
    en: "Answers to common problems",
  },
  imprint: {
    de: "Impressum",
    en: "Imprint",
  },
  privacy: {
    de: "Datenschutz",
    en: "Privacy",
  },
  terms: {
    de: "AGB",
    en: "Terms",
  },
  appVersion: {
    de: "BeautyScan v1.2.0 © 2024",
    en: "BeautyScan v1.2.0 © 2024",
  },

  // History Page
  history: {
    de: "Verlauf",
    en: "History",
  },
  weekProgress: {
    de: "Wochenfortschritt",
    en: "Weekly Progress",
  },
  todayAnalysisDone: {
    de: "✔ Du hast heute bereits eine Analyse gemacht",
    en: "✔ You already did an analysis today",
  },
  noAnalysisToday: {
    de: "🕒 Noch keine Analyse heute – Jetzt starten?",
    en: "🕒 No analysis today yet – Start now?",
  },
  latestAnalysis: {
    de: "Letzte Analyse",
    en: "Latest Analysis",
  },
  recentAnalyses: {
    de: "Letzte Analysen",
    en: "Recent Analyses",
  },
  achievements: {
    de: "Erfolge",
    en: "Achievements",
  },
  compare: {
    de: "Vergleichen",
    en: "Compare",
  },
  viewDetails: {
    de: "Details ansehen",
    en: "View Details",
  },
  startNow: {
    de: "Jetzt starten",
    en: "Start Now",
  },

  // Achievement translations
  dailyStreak: {
    de: "3 Tage in Folge analysiert",
    en: "3 days analyzed in a row",
  },
  perfectScore: {
    de: "Alle Kategorien über 80% erreicht",
    en: "All categories above 80%",
  },
  comeback: {
    de: "Nach 7+ Tagen wieder aktiv",
    en: "Active again after 7+ days",
  },
  expert: {
    de: "Mehr als 10 Analysen gemacht",
    en: "More than 10 analyses done",
  },

  // Days of week
  monday: {
    de: "Mo",
    en: "Mon",
  },
  tuesday: {
    de: "Di",
    en: "Tue",
  },
  wednesday: {
    de: "Mi",
    en: "Wed",
  },
  thursday: {
    de: "Do",
    en: "Thu",
  },
  friday: {
    de: "Fr",
    en: "Fri",
  },
  saturday: {
    de: "Sa",
    en: "Sat",
  },
  sunday: {
    de: "So",
    en: "Sun",
  },

  // Premium popup specific translations
  unlockPremium: {
    de: "Premium freischalten",
    en: "Unlock Premium",
  },
  getFullExperience: {
    de: "Hol dir das volle BeautyScan-Erlebnis",
    en: "Get the full BeautyScan experience",
  },
  dailyBeautyScans: {
    de: "Täglich 10 Beauty-Scans",
    en: "10 Beauty scans daily",
  },
  unlimitedAnalysesPerDay: {
    de: "Unbegrenzte Analysen pro Tag",
    en: "Unlimited analyses per day",
  },
  completeAnalysis: {
    de: "Vollständige Analyse",
    en: "Complete analysis",
  },
  skinLipsEyesAndMore: {
    de: "Hautbild, Lippen, Augen & mehr",
    en: "Skin, lips, eyes & more",
  },
  detailedRecommendations: {
    de: "Detaillierte Empfehlungen",
    en: "Detailed recommendations",
  },
  improvedPreciseTips: {
    de: "Verbesserte und präzisere Tipps",
    en: "Improved and more precise tips",
  },
  allFutureFeatures: {
    de: "Alle zukünftigen Features",
    en: "All future features",
  },
  earlyAccessNewFeatures: {
    de: "Früher Zugang zu neuen Funktionen",
    en: "Early access to new features",
  },
  yearly5999: {
    de: "Jährlich - 59,99 €",
    en: "Yearly - €59.99",
  },
  only5PerMonth: {
    de: "nur 5 €/Monat",
    en: "only €5/month",
  },
  monthly899: {
    de: "Monatlich - 8,99 €",
    en: "Monthly - €8.99",
  },
  perMonth: {
    de: "pro Monat",
    en: "per month",
  },
  bookYearlyFor5999: {
    de: "Jährlich für 59,99 € buchen",
    en: "Book yearly for €59.99",
  },
  bookMonthlyFor899: {
    de: "Monatlich für 8,99 € buchen",
    en: "Book monthly for €8.99",
  },
  remindLater: {
    de: "Später erinnern",
    en: "Remind later",
  },
  trustBadge: {
    de: "✓ Jederzeit kündbar • ✓ 14 Tage Geld-zurück-Garantie",
    en: "✓ Cancel anytime • ✓ 14-day money-back guarantee",
  },

  // New Premium Subscription Popup
  unlockFullPotential: {
    de: "Entfalte dein volles Beauty-Potenzial",
    en: "Unlock your full beauty potential",
  },
  premiumSubtitle: {
    de: "Hol dir Premium für genauere Analysen, mehr Scans und exklusives Feedback.",
    en: "Get Premium for more accurate analyses, more scans and exclusive feedback.",
  },
  savingsNote: {
    de: "Spare über 35 % mit dem Jahresabo – jederzeit kündbar.",
    en: "Save over 35% with the annual subscription – cancel anytime.",
  },

  // Free plan features
  freeAnalysesPerMonth: {
    de: "5 Analysen pro Monat",
    en: "5 analyses per month",
  },
  limitedAnalysis: {
    de: "Eingeschränkte Analyse",
    en: "Limited analysis",
  },
  noPersonalizedFeedback: {
    de: "Kein personalisiertes Feedback",
    en: "No personalized feedback",
  },
  noProgressTracking: {
    de: "Keine Fortschrittsverfolgung",
    en: "No progress tracking",
  },

  // Premium plan features
  completeEvaluation: {
    de: "Vollständige Auswertung (Haut, Lippen, Augen)",
    en: "Complete analysis (skin, lips, eyes)",
  },
  detailedRecommendationsAndScores: {
    de: "Detaillierte Empfehlungen & Scores",
    en: "Detailed recommendations & scores",
  },
  accessToCompleteHistory: {
    de: "Zugriff auf deine ganze Analyse-Historie",
    en: "Access to your complete analysis history",
  },

  // Plan pricing
  monthlyPrice: {
    de: "8,99 €",
    en: "€8.99",
  },
  yearlyPrice: {
    de: "59,99 €",
    en: "€59.99",
  },
  yearlyPricing: {
    de: "59,99 €/Jahr",
    en: "€59.99/year",
  },
  monthlyPricing: {
    de: "8,99 €/Monat",
    en: "€8.99/month",
  },

  // Comparison features
  scansComparison: {
    de: "Scans",
    en: "Scans",
  },
  analysisComparison: {
    de: "Analyse",
    en: "Analysis",
  },
  tipsComparison: {
    de: "Tipps",
    en: "Tips",
  },
  freeScans: {
    de: "5/Monat",
    en: "5/month",
  },
  premiumScans: {
    de: "10/Tag",
    en: "10/day",
  },
  basicAnalysis: {
    de: "Basis",
    en: "Basic",
  },
  completeAnalysisShort: {
    de: "Vollständig",
    en: "Complete",
  },
  standardTips: {
    de: "Standard",
    en: "Standard",
  },
  detailedTips: {
    de: "Detailliert",
    en: "Detailed",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

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

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("de");
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
