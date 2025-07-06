import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallbackPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallbackPath = "/login" 
}) => {
  const { user, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-beauty-rose/30 border-t-beauty-rose rounded-full mx-auto mb-4"
          />
          <p className="text-white font-nunito">Prüfe Authentifizierung...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    console.log("🚫 Unauthenticated access, redirecting to login");
    return <Navigate to={fallbackPath} replace />;
  }

  // User is authenticated, render children
  console.log("✅ Authenticated access granted for user:", user.id);
  return <>{children}</>;
};

export default ProtectedRoute; 