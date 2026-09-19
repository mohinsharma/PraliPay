import React from 'react';

export default function Logo({ size = 'md', showText = true, variant = 'dark', className = '' }) {
  // Dimension configurations
  const dimensions = {
    sm: { icon: 'w-7 h-7', text: 'text-lg', badge: 'text-[9px]' },
    md: { icon: 'w-10 h-10', text: 'text-xl sm:text-2xl', badge: 'text-[10px]' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl sm:text-3xl', badge: 'text-xs' }
  };

  const config = dimensions[size] || dimensions.md;
  const textColor = variant === 'light' ? 'text-white' : 'text-slate-900';
  const payColor = variant === 'light' ? 'text-emerald-400' : 'text-emerald-600';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Distinctive Vector Brand Mark: Paddy Stalk + Circular Rupee Value Loop */}
      <div 
        className={`${config.icon} rounded-xl bg-gradient-to-br from-agri-darkest via-agri-forest to-agri-primary p-2 flex items-center justify-center shadow-md shadow-emerald-950/15 border border-emerald-500/30 group-hover:scale-105 transition-transform duration-200 shrink-0 relative overflow-hidden`}
      >
        {/* Subtle inner radial shimmer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-transparent to-amber-400/20 pointer-events-none" />

        <svg 
          viewBox="0 0 36 36" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-white"
        >
          <defs>
            <linearGradient id="paddyGradient" x1="4" y1="32" x2="30" y2="6" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="45%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <linearGradient id="rupeeRing" x1="16" y1="4" x2="32" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>

          {/* Upward growing stylized Paddy Stalk stem */}
          <path
            d="M 6 30 C 10 24, 13 17, 15 8"
            stroke="url(#paddyGradient)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {/* Grains / Residue nodes on stem */}
          {/* Grain 1 (Left low) */}
          <path
            d="M 8 23 C 5 22, 5 19, 8 20 C 10 20.5, 9.5 22.5, 8 23 Z"
            fill="#f59e0b"
          />
          {/* Grain 2 (Right mid) */}
          <path
            d="M 12 17 C 14.5 15.5, 16 17.5, 14 19 C 12.5 19.5, 11 18.5, 12 17 Z"
            fill="#10b981"
          />
          {/* Grain 3 (Left high) */}
          <path
            d="M 11 13 C 8.5 11.5, 9.5 9, 12 10.5 C 13 11.5, 12.5 13, 11 13 Z"
            fill="#34d399"
          />
          {/* Top Grain Tip */}
          <path
            d="M 15 8 C 14.5 5, 17 5, 17 7.5 C 17 8.5, 16 9, 15 8 Z"
            fill="#6ee7b7"
          />

          {/* Seamless circular Rupee/Payment flow ring */}
          <circle
            cx="23"
            cy="18"
            r="9.5"
            stroke="url(#rupeeRing)"
            strokeWidth="2.2"
            strokeDasharray="45 15"
            strokeLinecap="round"
          />

          {/* Integrated Modern Rupee Symbol inside value ring */}
          <path
            d="M 20 13 H 26 M 20 16 H 25 M 20 13 V 20 C 22 20, 24.5 19.5, 24.5 17.5 C 24.5 15.5, 22.5 15.5, 20 15.5 M 22.2 19.5 L 26 24"
            stroke="#ffffff"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand Name Typography */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center">
            <span className={`${config.text} font-black tracking-tight ${textColor}`}>
              ਪਰਾਲੀ
            </span>
            <span className={`${config.text} font-extrabold ${payColor} ml-0.5 tracking-tight`}>
              Pay
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
