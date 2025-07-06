import React from 'react';
import Card from './ui/card';
import Button from './ui/button';
import ProgressBar from './ui/ProgressBar';
import AchievementBadge from './ui/AchievementBadge';
import { Sparkles, Star, Calendar, Smile, TrendingUp, Camera, ArrowRight, Award } from 'lucide-react';

const scanLimit = 5;
const scansUsed = 3;
const userName = 'Alex';
const avgScore = 82;
const latestScan = {
  date: '2024-06-10',
  image: '/placeholder.svg',
  feedback: 'Skin looks healthy! Keep up your routine.',
};

const achievements = [
  { icon: <Star size={24} className="text-beauty-rose" />, label: '5-Day Streak' },
  { icon: <Sparkles size={24} className="text-beauty-violet" />, label: 'First 5 Scans' },
  { icon: <TrendingUp size={24} className="text-beauty-nude" />, label: 'Weekly Improvement' },
  { icon: <Smile size={24} className="text-beauty-violet" />, label: 'Skin Glow Up' },
];

const Dashboard: React.FC = () => (
  <div className="app-bg min-h-screen w-full flex flex-col items-center px-2 pb-8 fade-in">
    {/* Main Greeting & Score */}
    <div className="w-full max-w-xl flex flex-col gap-6">
      <Card className="p-6 flex flex-col items-center gap-2 fade-in">
        <h2 className="text-2xl font-extrabold text-main mb-1">Welcome back{userName ? `, ${userName}` : ''}!</h2>
        <div className="flex flex-col items-center gap-2 mt-2">
          <div className="relative w-32 h-32 flex items-center justify-center mb-2">
            <svg width="128" height="128">
              <circle cx="64" cy="64" r="60" fill="none" stroke="#F3E5F5" strokeWidth="8" />
              <circle cx="64" cy="64" r="60" fill="none" stroke="#FCE4EC" strokeWidth="8" strokeDasharray={2 * Math.PI * 60} strokeDashoffset={2 * Math.PI * 60 * (1 - avgScore / 100)} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.7s' }} />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-main">{avgScore}%</span>
          </div>
          <span className="text-sub text-sm">Average Skin Health Score</span>
        </div>
      </Card>

      {/* Latest Scan */}
      <Card className="p-4 flex items-center gap-4 fade-in">
        <img src={latestScan.image} alt="Latest Scan" className="w-16 h-16 rounded-xl object-cover border border-white/60 shadow" />
        <div className="flex-1">
          <div className="text-main font-semibold text-base mb-1">Latest Scan</div>
          <div className="text-sub text-xs mb-1">{latestScan.date}</div>
          <div className="text-main text-sm">{latestScan.feedback}</div>
        </div>
        <Button className="ml-2 px-4 py-2 text-sm">View</Button>
      </Card>

      {/* Quick Actions */}
      <div className="flex gap-3 w-full mt-2 fade-in">
        <Button className="flex-1 flex items-center justify-center gap-2"><Camera size={20} /> Start New Scan</Button>
        <Button className="flex-1 flex items-center justify-center gap-2"><Calendar size={20} /> View Progress</Button>
        <Button className="flex-1 flex items-center justify-center gap-2"><Award size={20} /> Open Beauty Assistant</Button>
      </div>

      {/* Achievements Preview */}
      <Card className="p-4 mt-6 flex flex-col items-center fade-in">
        <div className="w-full flex items-center justify-between mb-2">
          <span className="text-main font-semibold text-base">Achievements</span>
          <a href="#" className="text-beauty-violet text-xs font-semibold underline hover:opacity-80 transition">See all</a>
        </div>
        <div className="flex gap-4 mt-2">
          {achievements.map((a, i) => (
            <AchievementBadge key={i} icon={a.icon} label={a.label} />
          ))}
        </div>
      </Card>
    </div>
  </div>
);

export default Dashboard; 