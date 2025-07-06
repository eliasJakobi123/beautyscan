import React from 'react';

interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, label }) => (
  <div className="w-full">
    {label && <div className="mb-1 text-sub text-sm font-medium">{label}</div>}
    <div style={{ background: 'rgba(255,255,255,0.5)' }} className="w-full h-4 rounded-full overflow-hidden">
      <div
        className="h-4 rounded-full transition-all duration-700"
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          background: 'linear-gradient(90deg, #FCE4EC 0%, #F3E5F5 100%)',
          boxShadow: '0 2px 8px 0 rgba(160,132,220,0.10)',
        }}
      />
    </div>
  </div>
);

export default ProgressBar; 