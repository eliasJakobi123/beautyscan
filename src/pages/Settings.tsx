import React, { useState, useEffect } from "react";
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
import BottomNavigation from "@/components/BottomNavigation";
import { Dialog } from "@/components/ui/dialog";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { useAnalysis } from "@/context/AnalysisContext";

const Settings = () => {
  const navigate = useNavigate();
  const [userType] = useState<"free" | "premium">("free");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteHistory, setShowDeleteHistory] = useState(false);
  const { user } = useAuth();
  const { loadUserScans } = useAnalysis();

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

  const handleDeleteScanHistory = async () => {
    if (!user?.id) return;
    // Lösche alle Analysen für den aktuellen User
    await supabase.from('analyses').delete().eq('user_id', user.id);
    setShowDeleteHistory(false);
    if (typeof loadUserScans === 'function') {
      await loadUserScans();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-y-auto w-full flex flex-col text-white pb-8">
      {/* Decorative Blur Elements wie Dashboard */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-beauty-rose/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-beauty-violet/20 rounded-full blur-2xl animate-pulse delay-1000" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-beauty-nude/20 rounded-full blur-xl animate-pulse delay-500" />
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-6 pb-2 mb-6">
          <button onClick={() => navigate("/dashboard") } className="p-2">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl font-bold font-poppins text-white">Settings</h1>
          <div className="w-6 h-6" />
        </div>

        <div className="p-6 space-y-6 pb-24 bg-transparent">
          {/* Privacy & Security */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-gray-800/80 rounded-2xl p-6 shadow-xl border border-white/10 mb-8"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-green-400" />
              <h2 className="text-lg font-bold font-poppins">
                Privacy & Security
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
                    Download my data
                  </p>
                  <p className="text-sm text-zinc-400">Export as JSON</p>
                </div>
              </button>

              {/* Scan-Verlauf löschen Button */}
              <button
                onClick={() => setShowDeleteHistory(true)}
                className="w-full p-4 bg-gray-700/50 rounded-xl text-left hover:bg-gray-700 transition-colors flex items-center space-x-3"
              >
                <Trash2 className="w-5 h-5 text-red-400" />
                <div>
                  <p className="font-semibold font-nunito">Verlauf der Scans löschen</p>
                  <p className="text-sm text-zinc-400">Alle Analysen unwiderruflich entfernen</p>
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
                      ? "Really delete account?"
                      : "Delete account"}
                  </p>
                  <p className="text-sm text-zinc-400">
                    {showDeleteConfirm
                      ? "Are you sure? This action cannot be undone."
                      : "Here you can permanently delete your account."}
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
            className="bg-gray-800/80 rounded-2xl p-6 shadow-xl border border-white/10 mb-8"
          >
            <div className="flex items-center space-x-3 mb-4">
              <HelpCircle className="w-6 h-6 text-blue-400" />
              <h2 className="text-lg font-bold font-poppins">
                Contact & Help
              </h2>
            </div>

            <div className="space-y-3">
              <button className="w-full p-4 bg-gray-700/50 rounded-xl text-left hover:bg-gray-700 transition-colors flex items-center space-x-3">
                <Mail className="w-5 h-5 text-beauty-rose" />
                <div>
                  <p className="font-semibold font-nunito">
                    Contact support
                  </p>
                  <p className="text-sm text-zinc-400">support@beautyscan.app</p>
                </div>
              </button>

              <button className="w-full p-4 bg-gray-700/50 rounded-xl text-left hover:bg-gray-700 transition-colors flex items-center space-x-3"
                onClick={() => navigate('/faq')}>
                <HelpCircle className="w-5 h-5 text-green-400" />
                <div>
                  <p className="font-semibold font-nunito">FAQ</p>
                  <p className="text-sm text-zinc-400">Answers to frequently asked questions</p>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Rechtliches Footer */}
          <div className="bg-gray-800/80 rounded-2xl p-6 shadow-xl border border-white/10 mb-8">
            <div className="text-center space-y-2">
              <div className="flex justify-center space-x-6 text-xs text-white/40">
                <a href="/imprint" className="hover:text-white/60 transition-colors flex items-center space-x-1">
                  <span>Imprint</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a href="/privacy" className="hover:text-white/60 transition-colors flex items-center space-x-1">
                  <span>Privacy</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a href="/terms" className="hover:text-white/60 transition-colors flex items-center space-x-1">
                  <span>Terms of Service</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-xs text-white/30">Version 1.0.0</p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation />

        {/* Popup für Scan-Verlauf löschen */}
        {showDeleteHistory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-gray-900 rounded-2xl p-6 max-w-sm w-full shadow-xl border border-red-500/30">
              <h3 className="text-lg font-bold text-white mb-2">Delete scan history?</h3>
              <p className="text-zinc-300 mb-4">All your analysis data will be <span className='text-red-400 font-bold'>permanently deleted</span> and cannot be recovered. Are you sure?</p>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowDeleteHistory(false)}
                  className="px-4 py-2 rounded-xl bg-gray-700 text-white hover:bg-gray-600 transition-all"
                >Cancel</button>
                <button
                  onClick={handleDeleteScanHistory}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-all"
                >Yes, delete all</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
