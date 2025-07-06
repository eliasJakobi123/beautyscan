import React, { useState } from "react";

const PRIVACY = {
  en: `Privacy Policy\n\nAt Beautyscan AI, we take your privacy seriously. We comply with the General Data Protection Regulation (GDPR) and all relevant EU and German data protection laws.\n\nData We Process\n- Account information (if provided)\n- Analysis results (scores, recommendations)\n- No permanent storage of uploaded face images\n\nUse of AI Services\nWe use trusted AI technology partners to process your analysis. Your uploaded images are only used temporarily to provide your personalized results and are immediately deleted afterwards. We do not store biometric raw data; only anonymized results are saved to help you track your progress.\n\nYour Rights\nYou have the right to request information, correction, or deletion of your data at any time. For any requests, please contact: [Your support email].`,
  de: `Datenschutzerklärung\n\nWir legen großen Wert auf den Schutz deiner persönlichen Daten und handeln nach der DSGVO und den deutschen Datenschutzgesetzen.\n\nWelche Daten verarbeiten wir?\n- Profildaten (sofern angegeben)\n- Analyseergebnisse (z. B. Scores, Empfehlungen)\n- Keine dauerhafte Speicherung von hochgeladenen Gesichtern\n\nHinweis zu KI-Diensten\nBeautyscan AI nutzt vertrauenswürdige KI-Technologien, um deine Analyse zu ermöglichen. Hochgeladene Bilder werden nur vorübergehend verarbeitet und anschließend sofort gelöscht. Es werden keine biometrischen Rohdaten dauerhaft gespeichert – lediglich anonymisierte Analyseergebnisse helfen dir, deinen Fortschritt zu verfolgen.\n\nDeine Rechte\nDu kannst jederzeit Auskunft, Berichtigung oder Löschung deiner Daten verlangen. Kontaktiere uns dazu unter: [Deine Support-Adresse]`,
};

const Privacy = () => {
  const [lang, setLang] = useState<'en' | 'de'>('en');
  return (
    <div className="min-h-screen bg-gradient-to-br from-beauty-rose/10 via-beauty-violet/10 to-black px-2 pb-24 flex flex-col items-center text-white">
      <div className="w-full max-w-xl mx-auto mt-8 p-6 bg-white/10 rounded-2xl shadow-xl border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold font-poppins">{lang === 'en' ? 'Privacy Policy' : 'Datenschutzerklärung'}</h1>
          <div className="flex gap-2">
            <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-full font-semibold text-sm ${lang==='en' ? 'bg-beauty-violet text-white' : 'bg-white/10 text-white/70'}`}>EN</button>
            <button onClick={() => setLang('de')} className={`px-3 py-1 rounded-full font-semibold text-sm ${lang==='de' ? 'bg-beauty-violet text-white' : 'bg-white/10 text-white/70'}`}>DE</button>
          </div>
        </div>
        <pre className="whitespace-pre-line font-nunito text-white/90 text-base">{PRIVACY[lang]}</pre>
      </div>
    </div>
  );
};

export default Privacy; 