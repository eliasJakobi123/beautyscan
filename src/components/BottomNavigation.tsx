import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Camera, Settings, Archive, Upload, X, Lock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const navItems = [
    {
      id: "dashboard",
      icon: Home,
      label: "Home",
      path: "/dashboard",
    },
    {
      id: "history",
      icon: Archive,
      label: "History",
      path: "/history",
    },
    {
      id: "upload",
      icon: Camera,
      label: "Analyze",
      path: "/upload",
      isCenter: true,
    },
    {
      id: "settings",
      icon: Settings,
      label: "Settings",
      path: "/settings",
    },
  ];

  const handleUpload = () => {
    setShowUploadModal(true);
  };

  const handleUploadPhoto = () => {
    setShowUploadModal(false);
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  const handleSelectPhoto = () => {
    setShowUploadModal(false);
    if (galleryInputRef.current) {
      galleryInputRef.current.click();
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Navigate to analysis with the selected file
      navigate("/analysis");
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // ScanLimitPopup: visually identical to Dashboard
  const ScanLimitPopup = ({ isOpen, onClose, onUpgrade }: { isOpen: boolean; onClose: () => void; onUpgrade: () => void }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-gray-800 rounded-2xl p-6 w-full max-w-sm border border-white/20"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-beauty-rose to-beauty-violet rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold font-poppins text-white mb-2">
                Limit erreicht
              </h3>
              <p className="text-zinc-400 font-nunito">
                Du hast dein monatliches Limit von 5 Scans erreicht. Upgrade auf Premium für unbegrenzte Analysen.
              </p>
            </div>
            <div className="space-y-3">
              <button
                onClick={onUpgrade}
                className="w-full p-4 bg-gradient-to-r from-beauty-rose to-beauty-violet text-white font-bold font-poppins rounded-2xl hover:from-beauty-rose/90 hover:to-beauty-violet/90 transition-all duration-300 shadow-xl"
              >
                Premium Upgrade
              </button>
              <button
                onClick={onClose}
                className="w-full p-3 text-zinc-400 hover:text-white transition-colors text-sm"
              >
                Schließen
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Hidden file inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        capture="user"
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 bg-gray-800/95 backdrop-blur-lg border-t border-white/10 px-4 py-2 z-40"
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navItems.map((item) => {
            const isActiveItem = isActive(item.path);

            if (item.isCenter) {
              return (
                <motion.button
                  key={item.id}
                  onClick={handleUpload}
                  className="relative flex flex-col items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-beauty-rose to-beauty-violet rounded-full flex items-center justify-center shadow-lg relative mb-1">
                    {/* Pulsing effect */}
                    <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-50" />
                    <Camera className="w-6 h-6 text-white relative z-10" />
                  </div>
                  <span className="text-xs font-nunito text-white/80 text-center leading-tight">
                    {item.label}
                  </span>
                </motion.button>
              );
            }

            return (
              <motion.button
                key={item.id}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center space-y-1 py-2 px-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`p-2 rounded-xl transition-all duration-300 ${
                    isActiveItem
                      ? "bg-beauty-rose/20 text-beauty-rose"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <span
                  className={`text-xs font-nunito transition-colors duration-300 ${
                    isActiveItem ? "text-beauty-rose" : "text-zinc-400"
                  }`}
                >
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-800 rounded-2xl p-6 w-full max-w-sm border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold font-poppins text-white mb-6 text-center">
                Choose Your Photo Method
              </h3>

              <div className="space-y-4">
                <button
                  onClick={handleUploadPhoto}
                  className="w-full p-4 bg-gradient-to-r from-beauty-rose to-beauty-violet text-white font-bold font-poppins rounded-2xl flex items-center justify-center space-x-3 hover:from-beauty-rose/90 hover:to-beauty-violet/90 transition-all duration-300 shadow-xl"
                >
                  <Camera className="w-5 h-5" />
                  <span>Take New Photo</span>
                </button>

                <button
                  onClick={handleSelectPhoto}
                  className="w-full p-4 bg-white/10 border border-white/20 text-white font-bold font-poppins rounded-2xl flex items-center justify-center space-x-3 hover:bg-white/15 transition-all duration-300"
                >
                  <Upload className="w-5 h-5" />
                  <span>Select from Gallery</span>
                </button>
              </div>

              <button
                onClick={() => setShowUploadModal(false)}
                className="w-full mt-4 p-3 text-zinc-400 hover:text-white transition-colors text-sm"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Limit Reached Modal */}
      <ScanLimitPopup
        isOpen={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        onUpgrade={() => {
          setShowLimitModal(false);
          navigate("/dashboard"); // or open premium popup if available
        }}
      />
    </>
  );
};

export default BottomNavigation;
