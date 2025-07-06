import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`card-glass ${className}`.trim()}>
    {children}
  </div>
);

export default Card;
