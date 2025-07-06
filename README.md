# BeautyScan - AI-Powered Skin Analysis App

Eine vollständige Beauty- und Skincare-Analyse-App mit AI-Unterstützung und Supabase Authentifizierung.

## 🚀 Features

- ✅ Email/Password Authentifizierung mit Supabase
- ✅ AI-gestützte Hautanalyse
- ✅ Responsive Design mit Tailwind CSS
- ✅ Loading States und Error Handling
- ✅ Automatische Weiterleitung nach Login
- ✅ TypeScript Support
- ✅ Onboarding-Flow
- ✅ Premium-Features

## 📦 Installation

1. **Dependencies installieren:**
```bash
npm install @supabase/auth-helpers-nextjs @supabase/supabase-js framer-motion lucide-react
```

2. **Environment Variables setzen:**
Erstellen Sie eine `.env.local` Datei:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 🔧 Supabase Setup

### 1. Supabase Projekt erstellen:
1. Gehen Sie zu [supabase.com](https://supabase.com)
2. Erstellen Sie ein neues Projekt
3. Notieren Sie sich die URL und den Anon Key

### 2. Datenbank-Tabellen erstellen:
Führen Sie die SQL-Skripte in der Supabase SQL Editor aus:
- `create_achievements_table.sql`
- `supabase_policies.sql`

## 📁 Dateistruktur

```
src/
├── components/
│   ├── LoginPage.tsx             # Login/Register Komponente
│   ├── onboarding/               # Onboarding Screens
│   ├── ui/                       # UI Komponenten
│   └── ...
├── context/
│   ├── AuthContext.tsx           # Authentifizierung
│   ├── LanguageContext.tsx       # Mehrsprachigkeit
│   └── AnalysisContext.tsx       # Analyse-Daten
├── lib/
│   ├── supabaseClient.ts         # Supabase Client
│   └── supabaseService.ts        # Supabase Services
├── pages/                        # App Seiten
└── app/                          # Next.js App Router
```

## 🎨 Verwendung

### Einfache Integration:

```tsx
import LoginPage from '@/components/LoginPage';

export default function MyPage() {
  return (
    <div>
      <LoginPage />
    </div>
  );
}
```

## 🎯 Features der App

### ✅ Email/Password Authentifizierung
- Sichere Anmeldung und Registrierung
- Passwort-Sichtbarkeit Toggle
- Error Handling und Loading States

### ✅ Onboarding Flow
- Willkommensbildschirm
- Sprachauswahl
- Hauttyp-Bestimmung
- Produkt-Präferenzen
- Datenschutz-Einstellungen

### ✅ AI-Hautanalyse
- Foto-Upload
- Automatische Analyse
- Detaillierte Ergebnisse
- Personalisierte Empfehlungen

### ✅ Premium Features
- Erweiterte Analysen
- Unbegrenzte Scans
- Premium-Support

## 🔄 Benutzer-Flow

1. **Benutzer öffnet die App**
2. **Login/Register mit Email/Password**
3. **Onboarding-Flow (falls neu)**
4. **Dashboard mit Hautanalyse**
5. **Foto-Upload und AI-Analyse**
6. **Ergebnisse und Empfehlungen**

## 🛠️ Entwicklung

```bash
# Development Server starten
npm run dev

# Build erstellen
npm run build

# Production Server starten
npm start
```

## 🔍 Debugging

Die App loggt alle wichtigen Schritte in die Konsole:

```javascript
🔑 Attempting sign in for: user@example.com
✅ Sign in successful
📱 Current session: user_id
```

## 📱 Responsive Design

Die App ist vollständig responsive und funktioniert auf:
- Desktop
- Tablet
- Mobile

## 🎨 Customization

Sie können die App einfach anpassen:

```tsx
// Custom Styling
<LoginPage className="my-custom-class" />

// Custom Redirect
const { signIn } = useAuth();
await signIn(email, password);
// Automatische Weiterleitung zum Dashboard
```

## 🔒 Sicherheit

- ✅ Supabase Session Management
- ✅ Secure Cookie Handling
- ✅ CSRF Protection
- ✅ Email/Password Validierung

## 📞 Support

Bei Fragen oder Problemen:
1. Überprüfen Sie die Console Logs
2. Stellen Sie sicher, dass Supabase korrekt konfiguriert ist
3. Überprüfen Sie Ihre Environment Variables

## 🚀 Deployment

Die App kann auf verschiedenen Plattformen deployed werden:

- **Vercel**: Optimiert für Next.js
- **Netlify**: Einfaches Deployment
- **Supabase**: Hosting + Database

## 📊 Analytics

Die App sammelt anonyme Nutzungsdaten für:
- Verbesserung der AI-Analyse
- Performance-Optimierung
- Feature-Entwicklung 