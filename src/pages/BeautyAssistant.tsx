import React, { useState } from 'react';
import Card from '../components/ui/card';
import Button from '../components/ui/button';
import ProgressBar from '../components/ui/ProgressBar';
import { Send, Sparkles } from 'lucide-react';

const MESSAGE_LIMIT = 20;

const initialMessages = [
  { from: 'assistant', text: 'Hi! How can I help you with your beauty routine today?' },
  { from: 'user', text: 'What can I do to reduce redness?' },
  { from: 'assistant', text: 'Try a gentle moisturizer and avoid harsh scrubs. Would you like more tips?' },
];

const BeautyAssistant: React.FC = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [sentCount, setSentCount] = useState(3);
  const [showUpsell, setShowUpsell] = useState(false);

  const handleSend = () => {
    if (!input.trim() || sentCount >= MESSAGE_LIMIT) return;
    setMessages([...messages, { from: 'user', text: input }]);
    setInput('');
    setSentCount(sentCount + 1);
    if (sentCount + 1 >= MESSAGE_LIMIT) setShowUpsell(true);
    // Simuliere AI-Antwort (Demo)
    setTimeout(() => {
      setMessages(msgs => [...msgs, { from: 'assistant', text: 'Thanks for your question! Here's a tip: Stay hydrated and use SPF daily.' }]);
    }, 1200);
  };

  return (
    <div className="app-bg min-h-screen w-full flex flex-col items-center px-2 pb-8 fade-in">
      <div className="w-full max-w-xl mt-4 mb-6">
        <h2 className="text-2xl font-extrabold text-main mb-1">Your AI Beauty Assistant</h2>
        <div className="text-sub mb-4">Ask your personal beauty coach anything about makeup, skincare, or your scans.</div>
        <Card className="p-4 flex flex-col gap-3 min-h-[400px] max-h-[60vh] overflow-y-auto mb-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} w-full`}>
              <div className={`rounded-2xl px-4 py-2 max-w-[75%] text-sm shadow fade-in ${msg.from === 'user' ? 'bg-beauty-violet text-white ml-auto' : 'bg-white/80 text-main mr-auto'}`}>{msg.text}</div>
            </div>
          ))}
        </Card>
        <div className="flex items-center gap-2 mb-2">
          <input
            className="flex-1 rounded-full px-4 py-2 border border-white/60 bg-white/80 text-main shadow focus:outline-none focus:ring-2 focus:ring-beauty-violet"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={sentCount >= MESSAGE_LIMIT}
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          />
          <Button onClick={handleSend} disabled={sentCount >= MESSAGE_LIMIT || !input.trim()}><Send size={18} /></Button>
        </div>
        <ProgressBar value={sentCount / MESSAGE_LIMIT * 100} label={`${MESSAGE_LIMIT - sentCount} / ${MESSAGE_LIMIT} messages left`} />
        {showUpsell && (
          <Card className="p-3 mt-4 flex items-center gap-3 bg-white/90 border border-beauty-violet/30 fade-in">
            <Sparkles className="text-beauty-violet" size={28} />
            <div className="flex-1">
              <div className="text-main font-semibold">Upgrade to Premium for unlimited chats and deep analysis.</div>
            </div>
            <Button className="px-4 py-2 text-sm">Go Premium</Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BeautyAssistant; 