import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold font-poppins mb-4 text-beauty-rose">404</h1>
        <p className="text-xl font-nunito text-zinc-300 mb-6">Oops! This page doesn't exist</p>
        <p className="text-sm text-zinc-400 mb-8">The beauty analysis you're looking for might be in another dimension</p>
        <a href="/dashboard" className="text-beauty-rose hover:text-beauty-rose/80 underline font-semibold">
          Return to Dashboard
        </a>
      </div>
    </div>
  );
};

export default NotFound;
