import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Globe,
  Crown,
  Shield,
  Download,
  Mail,
  HelpCircle,
  Trash2,
  ExternalLink,
  User,
  CreditCard,
} from "lucide-react";
import { useLanguage, Language } from "@/context/LanguageContext";
import BottomNavigation from "@/components/BottomNavigation";
import PremiumSubscriptionPopup from "@/components/PremiumSubscriptionPopup";

const Settings = () => {
  const { language, setManualLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [userType] = useState<"free" | "premium">("free");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);

  const languages = [
    { code: "de" as Language, name: "Deutsch", flag: "🇩🇪" },
    { code: "en" as Language, name: "English", flag: "🇺🇸" },
  ];

  const handleLanguageChange = (langCode: Language) => {
    setManualLanguage(langCode);
  };

  const handleDownloadData = () => {
    // Mock data export
    const data = {
      user: "Maria",
      analyses: 15,
      exported: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "beautyscan-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = () => {
    if (showDeleteConfirm) {
      // Implement account deletion
      console.log("Account deletion confirmed");
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-beauty-rose to-beauty-violet p-6"
      >
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl font-bold font-poppins text-white">
            {t("settings")}
          </h1>
        </div>
      </motion.div>

      <div className="p-6 space-y-6 pb-24">
        {/* Sprache ändern */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="bg-gray-800/80 rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="w-6 h-6 text-beauty-rose" />
            <h2 className="text-lg font-bold font-poppins">{t("language")}</h2>
          </div>
          <div className="space-y-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full p-3 rounded-xl text-left transition-all duration-300 flex items-center justify-between ${
                  language === lang.code
                    ? "bg-beauty-rose/20 border border-beauty-rose/50"
                    : "bg-gray-700/50 hover:bg-gray-700"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="font-nunito">{lang.name}</span>
                </div>
                {language === lang.code && (
                  <div className="w-3 h-3 bg-beauty-rose rounded-full" />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Abo & Zahlungen */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-gray-800/80 rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Crown className="w-6 h-6 text-beauty-violet" />
            <h2 className="text-lg font-bold font-poppins">
              {t("subscriptionPayments")}
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
              <div>
                <p className="font-semibold font-poppins">
                  {userType === "premium" ? t("premiumPlan") : t("freePlan")}
                </p>
                <p className="text-sm text-zinc-400 font-nunito">
                  {userType === "premium"
                    ? t("activeUntil").replace("{date}", "15.02.2024")
                    : t("analysesUsed")
                        .replace("{used}", "3")
                        .replace("{total}", "5")}
                </p>
              </div>
              <div className="text-right">
                {userType === "premium" ? (
                  <span className="text-green-400 font-bold">€8,99/Monat</span>
                ) : (
                  <span className="text-beauty-rose font-bold">€0</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => userType === "free" && setShowPremiumPopup(true)}
                className="p-3 bg-beauty-violet/20 border border-beauty-violet/50 rounded-xl text-sm font-semibold font-poppins hover:bg-beauty-violet/30 transition-colors"
              >
                {userType === "premium" ? t("changePlan") : t("upgrade")}
              </button>
              <button className="p-3 bg-gray-700/50 border border-gray-600 rounded-xl text-sm font-semibold font-poppins hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
                <CreditCard className="w-4 h-4" />
                <span>{t("invoice")}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Datenschutz & Sicherheit */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-gray-800/80 rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-6 h-6 text-green-400" />
            <h2 className="text-lg font-bold font-poppins">
              {t("privacySecurity")}
            </h2>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleDownloadData}
              className="w-full p-4 bg-gray-700/50 rounded-xl text-left hover:bg-gray-700 transition-colors flex items-center space-x-3"
            >
              <Download className="w-5 h-5 text-blue-400" />
              <div>
                <p className="font-semibold font-nunito">
                  {t("downloadMyData")}
                </p>
                <p className="text-sm text-zinc-400">{t("exportAsJson")}</p>
              </div>
            </button>

            <button
              onClick={handleDeleteAccount}
              className={`w-full p-4 rounded-xl text-left transition-colors flex items-center space-x-3 ${
                showDeleteConfirm
                  ? "bg-red-500/20 border border-red-500/50"
                  : "bg-gray-700/50 hover:bg-gray-700"
              }`}
            >
              <Trash2
                className={`w-5 h-5 ${showDeleteConfirm ? "text-red-400" : "text-red-500"}`}
              />
              <div>
                <p className="font-semibold font-nunito">
                  {showDeleteConfirm
                    ? t("confirmDeleteAccount")
                    : t("deleteAccount")}
                </p>
                <p className="text-sm text-zinc-400">
                  {showDeleteConfirm
                    ? t("deleteAccountConfirmDesc")
                    : t("deleteAccountDesc")}
                </p>
              </div>
            </button>
          </div>
        </motion.div>

        {/* Kontakt & Hilfe */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-gray-800/80 rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center space-x-3 mb-4">
            <HelpCircle className="w-6 h-6 text-blue-400" />
            <h2 className="text-lg font-bold font-poppins">
              {t("contactHelp")}
            </h2>
          </div>

          <div className="space-y-3">
            <button className="w-full p-4 bg-gray-700/50 rounded-xl text-left hover:bg-gray-700 transition-colors flex items-center space-x-3">
              <Mail className="w-5 h-5 text-beauty-rose" />
              <div>
                <p className="font-semibold font-nunito">
                  {t("contactSupport")}
                </p>
                <p className="text-sm text-zinc-400">{t("supportEmail")}</p>
              </div>
            </button>

            <button className="w-full p-4 bg-gray-700/50 rounded-xl text-left hover:bg-gray-700 transition-colors flex items-center space-x-3">
              <HelpCircle className="w-5 h-5 text-green-400" />
              <div>
                <p className="font-semibold font-nunito">{t("faq")}</p>
                <p className="text-sm text-zinc-400">{t("faqDesc")}</p>
              </div>
            </button>
          </div>
        </motion.div>

        {/* Rechtliches Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="pt-8 pb-4"
        >
          <div className="text-center space-y-2">
            <div className="flex justify-center space-x-6 text-xs text-white/40">
              <button className="hover:text-white/60 transition-colors flex items-center space-x-1">
                <span>{t("imprint")}</span>
                <ExternalLink className="w-3 h-3" />
              </button>
              <button className="hover:text-white/60 transition-colors flex items-center space-x-1">
                <span>{t("privacy")}</span>
                <ExternalLink className="w-3 h-3" />
              </button>
              <button className="hover:text-white/60 transition-colors flex items-center space-x-1">
                <span>{t("terms")}</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
            <p className="text-xs text-white/30">{t("appVersion")}</p>
          </div>
        </motion.div>
      </div>

      {/* Premium Popup */}
      <PremiumSubscriptionPopup
        isOpen={showPremiumPopup}
        onClose={() => setShowPremiumPopup(false)}
        onUpgrade={(plan) => {
          setShowPremiumPopup(false);
          console.log("Upgrade to Premium from Settings:", plan);
        }}
      />

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Settings;
