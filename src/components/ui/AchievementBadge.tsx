import React from 'react';

interface AchievementBadgeProps {
  icon: React.ReactNode;
  label?: string;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ icon, label }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="achievement-badge">{icon}</div>
    {label && <span className="text-xs text-sub mt-1">{label}</span>}
  </div>
);

export default AchievementBadge; 