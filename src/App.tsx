import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import { AnalysisProvider } from "./context/AnalysisContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Onboarding from "./onboarding/Onboarding";
import Dashboard from "./pages/Dashboard";
import AnalysisPage from "./pages/AnalysisPage";
import ResultsPage from "./pages/ResultsPage";
import Settings from "./pages/Settings";
import History from "./pages/History";
import SharePage from "./pages/SharePage";
import NotFound from "./pages/NotFound";
import AnalysisDetailPage from "./pages/AnalysisDetailPage";
import AchievementsPage from "./pages/AchievementsPage";
import FAQ from "./pages/FAQ";
import Imprint from "./pages/Imprint";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

const queryClient = new QueryClient();

// Wrapper-Komponente für Onboarding, die nach Abschluss zum Dashboard weiterleitet
const OnboardingWithRedirect = () => {
  const navigate = useNavigate();
  return <Onboarding onFinish={() => navigate('/dashboard')} />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <AnalysisProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<OnboardingWithRedirect />} />
                <Route path="/share/:scanId" element={<SharePage />} />
                
                {/* Protected Routes */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/analysis" 
                  element={
                    <ProtectedRoute>
                      <AnalysisPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/results" 
                  element={
                    <ProtectedRoute>
                      <ResultsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/settings" 
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/history" 
                  element={
                    <ProtectedRoute>
                      <History />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/analysis/:analysisId" 
                  element={
                    <ProtectedRoute>
                      <AnalysisDetailPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/achievements" 
                  element={
                    <ProtectedRoute>
                      <AchievementsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/faq" 
                  element={
                    <ProtectedRoute>
                      <FAQ />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/imprint" element={<Imprint />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AnalysisProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
