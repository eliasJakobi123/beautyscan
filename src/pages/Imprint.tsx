import React, { useState } from "react";

const IMPRINTS = {
  en: `Imprint\nBeautyscan AI\nOwner: Katharina Weiser\nRheinfelsstr. 22, 55469 Simmern\nRhineland-Palatinate, Germany\nEmail: [Your support email]\n\nAccording to § 5 TMG (German Telemedia Act).\nNot registered in the commercial register.\nVAT ID: [If you have one, otherwise leave blank]`,
  de: `Impressum\nBeautyscan AI\nInhaberin: Katharina Weiser\nRheinfelsstr. 22, 55469 Simmern\nRheinland-Pfalz, Deutschland\nE-Mail: [Deine Support-Adresse]\n\nGemäß § 5 TMG.\nKein Handelsregistereintrag vorhanden.\nUmsatzsteuer-ID: [falls vorhanden]`,
};

const Imprint = () => {
  const [lang, setLang] = useState<'en' | 'de'>('en');
  return (
    <div className="min-h-screen bg-gradient-to-br from-beauty-rose/10 via-beauty-violet/10 to-black px-2 pb-24 flex flex-col items-center text-white">
      <div className="w-full max-w-xl mx-auto mt-8 p-6 bg-white/10 rounded-2xl shadow-xl border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold font-poppins">{lang === 'en' ? 'Imprint' : 'Impressum'}</h1>
          <div className="flex gap-2">
            <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-full font-semibold text-sm ${lang==='en' ? 'bg-beauty-violet text-white' : 'bg-white/10 text-white/70'}`}>EN</button>
            <button onClick={() => setLang('de')} className={`px-3 py-1 rounded-full font-semibold text-sm ${lang==='de' ? 'bg-beauty-violet text-white' : 'bg-white/10 text-white/70'}`}>DE</button>
          </div>
        </div>
        <pre className="whitespace-pre-line font-nunito text-white/90 text-base">{IMPRINTS[lang]}</pre>
      </div>
    </div>
  );
};

export default Imprint; 