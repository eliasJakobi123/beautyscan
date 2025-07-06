import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAnalysis } from '@/context/AnalysisContext';
import { ArrowLeft, Eye, Smile, User, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const AnalysisDetailPage = () => {
  const { analysisId } = useParams<{ analysisId: string }>();
  const { analyses } = useAnalysis();
  const navigate = useNavigate();

  const analysis = analyses.find(a => a.id === Number(analysisId));

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Analysis not found.</p>
      </div>
    );
  }

  const { date, time, scores, feedback } = analysis;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };
  
  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-400';
    if (score >= 60) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  const scoreItems = [
    { label: 'Skin', value: scores.skinType, icon: User },
    { label: 'Lips', value: scores.lips, icon: Smile },
    { label: 'Eyes', value: scores.eyes, icon: Eye },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-beauty-rose to-beauty-violet p-6"
      >
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/history')}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold font-poppins">
            Analysis from {date}
          </h1>
        </div>
      </motion.div>

      <div className="p-6 space-y-8">
        {/* Overall Score */}
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-gray-800/80 rounded-2xl p-8 shadow-2xl border border-white/10 text-center"
        >
          <h2 className="text-sm font-nunito text-zinc-400 mb-2">Overall Score</h2>
          <div className={`text-6xl font-bold font-poppins ${getScoreColor(scores.overall)} mb-2`}>
            {scores.overall}
          </div>
          <p className="text-zinc-300">A great result! Keep it up.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
            {/* Scores */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-gray-800/80 rounded-2xl p-6 shadow-xl border border-white/10"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center"><Star className="w-5 h-5 mr-2 text-yellow-400" />Detailed Scores</h2>
              <div className="space-y-6">
                {scoreItems.map(item => (
                    <div key={item.label}>
                        <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center">
                                <item.icon className="w-4 h-4 mr-2 text-zinc-400" />
                                <span className="font-semibold">{item.label}</span>
                            </div>
                            <span className={`font-bold ${getScoreColor(item.value)}`}>{item.value} / 100</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                            <div className={`${getProgressColor(item.value)} h-2 rounded-full`} style={{width: `${item.value}%`}}></div>
                        </div>
                    </div>
                ))}
              </div>
            </motion.div>
            
            {/* Feedback */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-gray-800/80 rounded-2xl p-6 shadow-xl border border-white/10"
            >
              <h2 className="text-xl font-bold mb-4">AI Feedback</h2>
              <div className="space-y-4">
                <div>
                    <h3 className="font-semibold text-beauty-rose mb-1">Skin</h3>
                    <p className="text-zinc-300 text-sm">{feedback.skin}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-beauty-rose mb-1">Lips</h3>
                    <p className="text-zinc-300 text-sm">{feedback.lips}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-beauty-rose mb-1">Eyes</h3>
                    <p className="text-zinc-300 text-sm">{feedback.eyes}</p>
                </div>
              </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDetailPage; 