import React, { useState } from "react";

const TERMS = {
  en: `Terms of Service\n\nWelcome to Beautyscan AI! By using our app, you agree to these terms:\n\nService Description\nBeautyscan AI provides personalized beauty analysis and tracking features via AI technology.\n\nSubscription & Free Trial\nBeautyscan AI is available exclusively via subscription. You may use a free trial for 3 days before your paid plan begins (currently €3.99 per week). Payment and cancellations are handled by your app store provider.\n\nFace Images\nYour uploaded face images are used only temporarily for analysis and are not permanently stored. Only your anonymized results are saved.\n\nRefunds\nIf you wish to request a refund, please contact your app store provider (Apple App Store or Google Play Store) directly. We cannot process refunds ourselves.\n\nLimitation of Liability\nUse of Beautyscan AI is at your own risk. The analysis is for informational purposes only.`,
  de: `Allgemeine Geschäftsbedingungen\n\nDienstbeschreibung\nBeautyscan AI bietet eine personalisierte Beauty-Analyse und Verlaufstracking mittels KI-Technologie.\n\nAbo & Gratis-Testzeitraum\nDie App ist nur im Abonnement nutzbar. Du kannst Beautyscan AI 3 Tage lang kostenlos testen, danach wird dein gewähltes Abo (aktuell 3,99 €/Woche) automatisch aktiv. Zahlung und Kündigung erfolgen über deinen App-Store-Anbieter.\n\nGesichts-Uploads\nHochgeladene Gesichter werden ausschließlich temporär verarbeitet und nicht dauerhaft gespeichert. Es werden nur anonymisierte Ergebnisse gespeichert.\n\nRückerstattungen\nRückerstattungen werden ausschließlich über den jeweiligen App-Store abgewickelt (Apple App Store oder Google Play Store). Bitte wende dich bei Fragen direkt an den Store.\n\nHaftungsausschluss\nDie Nutzung von Beautyscan AI erfolgt auf eigenes Risiko. Die Analyse ist ausschließlich als Information gedacht.`,
};

const Terms = () => {
  const [lang, setLang] = useState<'en' | 'de'>('en');
  return (
    <div className="min-h-screen bg-gradient-to-br from-beauty-rose/10 via-beauty-violet/10 to-black px-2 pb-24 flex flex-col items-center text-white">
      <div className="w-full max-w-xl mx-auto mt-8 p-6 bg-white/10 rounded-2xl shadow-xl border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold font-poppins">{lang === 'en' ? 'Terms of Service' : 'Allgemeine Geschäftsbedingungen'}</h1>
          <div className="flex gap-2">
            <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-full font-semibold text-sm ${lang==='en' ? 'bg-beauty-violet text-white' : 'bg-white/10 text-white/70'}`}>EN</button>
            <button onClick={() => setLang('de')} className={`px-3 py-1 rounded-full font-semibold text-sm ${lang==='de' ? 'bg-beauty-violet text-white' : 'bg-white/10 text-white/70'}`}>DE</button>
          </div>
        </div>
        <pre className="whitespace-pre-line font-nunito text-white/90 text-base">{TERMS[lang]}</pre>
      </div>
    </div>
  );
};

export default Terms; 