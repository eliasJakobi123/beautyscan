import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, HelpCircle, CreditCard, User, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FAQ_DATA = [
  {
    category: "about",
    question: "What is BeautyScan?",
    answer:
      "BeautyScan is your personal makeup & skincare assistant. Upload your look, get a professional AI analysis for your skin, base, eyes, lips, and overall makeup style. Track your results over time and stay motivated!",
  },
  {
    category: "about",
    question: "How does it work?",
    answer:
      "You take or upload a selfie, our AI analyzes it in seconds, and you receive clear feedback with improvement suggestions. Your photos are processed securely and not permanently stored.",
  },
  {
    category: "about",
    question: "Is my data safe?",
    answer:
      "Yes — your analysis results are stored securely. You can delete everything anytime in Settings.",
  },
  {
    category: "subscription",
    question: "Is BeautyScan free?",
    answer:
      "No — BeautyScan is a subscription-based app. You can try all features free for 3 days. After the trial, it costs €3.99 per week.",
  },
  {
    category: "subscription",
    question: "What's included?",
    answer:
      "\n- Unlimited scans\n- Full detailed analysis\n- Progress tracking with history & achievements\n- Priority access to new features & improvements\n",
  },
  {
    category: "subscription",
    question: "How does the free trial work?",
    answer:
      "Your 3-day trial starts automatically after onboarding. You can cancel during the trial to avoid being charged.",
  },
  {
    category: "billing",
    question: "How do I cancel my subscription?",
    answer:
      "Subscriptions are handled by the App Store or Google Play Store. You can manage or cancel anytime in your store account.",
  },
  {
    category: "billing",
    question: "Can I get a refund?",
    answer:
      `BeautyScan can't process refunds directly. Please request a refund through your app store:\n\nHow to request a refund on iOS:\n- Go to reportaproblem.apple.com\n- Log in with your Apple ID\n- Find BeautyScan under purchases\n- Click "Report a Problem" and follow the steps\n\nHow to request a refund on Google Play:\n- Open the Google Play Store\n- Tap your profile > Payments & subscriptions > Budget & history\n- Find BeautyScan\n- Tap "Request a refund" and follow the instructions`,
  },
  {
    category: "account",
    question: "Do I need to sign up?",
    answer:
      "No extra sign-up is needed. You start automatically after onboarding.",
  },
  {
    category: "account",
    question: "Can I delete my data?",
    answer:
      "Yes! Go to Settings > Delete Account to permanently remove your scan history and all saved results.",
  },
  {
    category: "account",
    question: "Can I change my language?",
    answer:
      "BeautyScan is currently only available in English.",
  },
  {
    category: "support",
    question: "Need help?",
    answer:
      "Use the in-app Contact Form under Settings, or email us: support@yoursite.com",
  },
  {
    category: "support",
    question: "Where can I find the Privacy Policy & Terms?",
    answer:
      '<span>You can view them here: <a href="/privacy" class="text-beauty-violet underline hover:text-beauty-rose">Privacy Policy</a> & <a href="/terms" class="text-beauty-violet underline hover:text-beauty-rose">Terms of Service</a>.</span>',
  },
];

const FILTERS = [
  { key: "all", label: "All", icon: HelpCircle },
  { key: "billing", label: "Billing & Refunds", icon: CreditCard },
  { key: "about", label: "About BeautyScan", icon: User },
  { key: "support", label: "Contact & Support", icon: Mail },
  { key: "account", label: "Account & Privacy", icon: User },
];

const FAQ = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const filteredFaqs = useMemo(() => {
    let faqs = FAQ_DATA;
    if (filter !== "all") faqs = faqs.filter((f) => f.category === filter);
    if (search.trim()) {
      const s = search.toLowerCase();
      faqs = faqs.filter(
        (f) =>
          f.question.toLowerCase().includes(s) ||
          f.answer.toLowerCase().includes(s)
      );
    }
    return faqs;
  }, [search, filter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-beauty-rose/10 via-beauty-violet/10 to-black px-2 pb-24 relative overflow-y-auto text-white">
      {/* Decorative Blur Elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-beauty-rose/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-beauty-violet/20 rounded-full blur-2xl animate-pulse delay-1000" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-beauty-nude/20 rounded-full blur-xl animate-pulse delay-500" />
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-6 pb-2 mb-6">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl font-bold font-poppins text-white">FAQ</h1>
          <div className="w-6 h-6" />
        </div>
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4 px-2 overflow-x-auto">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all border shadow-sm whitespace-nowrap
                ${filter === f.key
                  ? "bg-beauty-violet text-white border-beauty-violet"
                  : "bg-white/10 text-white/70 border-white/10 hover:bg-white/20"}
              `}
            >
              <f.icon className="w-4 h-4" />
              {f.label}
            </button>
          ))}
        </div>
        {/* Search */}
        <div className="flex items-center bg-white/10 rounded-xl px-3 py-2 mb-6 mx-2 border border-white/10">
          <Search className="w-5 h-5 text-white/60 mr-2" />
          <input
            className="bg-transparent outline-none text-white w-full font-nunito placeholder:text-white/40"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* FAQ List */}
        <div className="space-y-3 px-2">
          {filteredFaqs.length === 0 && (
            <div className="text-center text-white/60 py-8">No questions found.</div>
          )}
          {filteredFaqs.map((faq, idx) => (
            <motion.div
              key={faq.question}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: idx * 0.03 }}
              className="bg-white/10 border border-beauty-violet/20 rounded-xl shadow-lg"
            >
              <button
                className="w-full flex justify-between items-center px-4 py-4 text-left font-semibold text-base font-poppins text-white focus:outline-none"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                <span>{faq.question}</span>
                <motion.span
                  animate={{ rotate: openIdx === idx ? 90 : 0 }}
                  className="ml-2"
                >
                  <ArrowLeft className="w-5 h-5 transition-transform" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openIdx === idx && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden px-4 pb-4 text-white/90 font-nunito text-sm"
                  >
                    <div style={{ whiteSpace: "pre-line" }} dangerouslySetInnerHTML={{ __html: faq.answer }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ; 