
import React from 'react';

const FundWiseLogo = ({ className = "w-12 h-12" }: { className?: string }) => {
  return (
    <div className={`${className} relative`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        
        {/* Outer circle */}
        <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" className="animate-pulse" />
        
        {/* Inner dollar sign */}
        <path 
          d="M45 25 L45 75 M35 35 L55 35 M35 65 L55 65 M40 30 Q35 30 35 35 Q35 40 40 40 L60 40 Q65 40 65 45 Q65 50 60 50 L40 50 Q35 50 35 55 Q35 60 40 60 L60 60 Q65 60 65 65 Q65 70 60 70 L45 70" 
          stroke="white" 
          strokeWidth="4" 
          fill="none" 
          strokeLinecap="round"
        />
        
        {/* Chart lines */}
        <path 
          d="M20 70 L30 60 L40 65 L50 50 L60 55 L70 45 L80 40" 
          stroke="rgba(255,255,255,0.6)" 
          strokeWidth="2" 
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default FundWiseLogo;
