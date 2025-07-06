import React, { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

export const AnimatedWelcomeText: React.FC = () => {
  const { t } = useLanguage();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const welcomeTexts = [
    {
      text: "Welcome to BeautyScan – your personal beauty analysis assistant.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % welcomeTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold font-poppins text-foreground mb-2">
        Welcome to BeautyScan
      </h1>
      <p className="text-muted-foreground text-lg font-nunito">
        {welcomeTexts[currentTextIndex].text}
      </p>
    </div>
  );
};
