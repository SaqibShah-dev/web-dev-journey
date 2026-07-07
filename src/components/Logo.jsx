import React from 'react';

const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-3 select-none group cursor-pointer ${className}`}>
      
      {/* Enhanced Multi-Layer SVG */}
      <div className="relative flex items-center justify-center">
        {/* Subtle background glow effect when hovering over the parent brand container */}
        <div className="absolute inset-0 bg-blue-500/10 rounded-xl blur-md scale-75 group-hover:scale-110 transition-transform duration-300" />
        
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 32 32" 
          className="w-9 h-9 relative z-10 drop-shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5"
        >
          <defs>
            {/* High-end linear gradient vector */}
            <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>

          {/* Bag Handle */}
          <path 
            d="M11 10 C11 5, 21 5, 21 10" 
            fill="none" 
            stroke="url(#brandGradient)" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
          />

          {/* Main Shopping Bag Frame */}
          <path 
            d="M7 10 H25 L27 25 C27 27, 25 28, 23 28 H9 C7 28, 5 27, 5 25 Z" 
            fill="none" 
            stroke="url(#brandGradient)" 
            strokeWidth="2.5" 
            strokeLinejoin="round" 
          />

          {/* Dynamic Inner Accent - Fixed comment issue here */}
          <path 
            d="M19 14 H13 L12 18 H18 L14 24" 
            fill="none" 
            stroke="#10b981" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="transition-all duration-300 group-hover:stroke-blue-600"
          />
        </svg>
      </div>

      {/* Upgraded Professional Typography */}
      <div className="flex flex-col justify-center leading-none">
        <span className="text-2xl font-black tracking-tight text-gray-900 transition-colors duration-200">
          Shop<span className="bg-linear-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">Easy</span>
        </span>
        <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mt-0.5 pl-0.5">
          Ecosystem
        </span>
      </div>

    </div>
  );
};

export default Logo;