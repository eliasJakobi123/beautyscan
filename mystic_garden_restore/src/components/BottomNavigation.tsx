import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Camera, Settings, Archive } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    {
      id: "dashboard",
      icon: Home,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      id: "history",
      icon: Archive,
      label: t("history"),
      path: "/history",
    },
    {
      id: "upload",
      icon: Camera,
      label: t("uploadImage"),
      path: "/upload",
      isCenter: true,
    },
    {
      id: "settings",
      icon: Settings,
      label: t("settings"),
      path: "/settings",
    },
  ];

  const handleUpload = () => {
    // Navigate to analysis directly (simulating photo upload)
    navigate("/analysis");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
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

              {/* Active indicator */}
              {isActiveItem && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-beauty-rose rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default BottomNavigation;
