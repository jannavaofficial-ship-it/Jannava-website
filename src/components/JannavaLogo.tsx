import React from 'react';

interface JannavaLogoProps {
  className?: string;
  variant?: 'navbar' | 'full' | 'emblem' | 'footer';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const JannavaLogo: React.FC<JannavaLogoProps> = ({
  className = '',
  variant = 'navbar',
  size = 'md'
}) => {
  // SVG Emblem strictly matching the official JANNAVA identity
  const Emblem = ({ width = 48, height = 48 }: { width?: number; height?: number }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 drop-shadow-sm"
      aria-label="Logo JANNAVA - Remaja Masjid Miftahul Jannah"
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="islamicGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14664F" />
          <stop offset="50%" stopColor="#0F4C3A" />
          <stop offset="100%" stopColor="#07281E" />
        </linearGradient>

        <linearGradient id="goldLuster" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>

        <linearGradient id="youthCenterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="100%" stopColor="#158052" />
        </linearGradient>

        <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Main Arch Frame (Kubah Masjid) */}
      <path
        d="M 100 18 C 65 35 48 68 48 118 L 48 152 C 48 155 52 158 56 158 L 144 158 C 148 158 152 155 152 152 L 152 118 C 152 68 135 35 100 18 Z"
        fill="#FFFFFF"
        stroke="url(#islamicGreenGrad)"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Inner Decorative Arch Line */}
      <path
        d="M 100 28 C 72 44 58 72 58 116 L 58 148 L 142 148 L 142 116 C 142 72 128 44 100 28 Z"
        fill="none"
        stroke="#158052"
        strokeWidth="2.5"
        strokeOpacity="0.45"
      />

      {/* Top Crescent & Star Symbol */}
      <path
        d="M 100 32 C 103 32 105 34 105 37 C 105 40 102 42 99 42 C 95 42 92 39 92 35 C 92 31 95 28 99 28 C 97 30 96 32 97 34 C 98 33 99 32 100 32 Z"
        fill="url(#goldLuster)"
      />
      <circle cx="102" cy="30" r="1.5" fill="url(#goldLuster)" />

      {/* Small Upper Quran Symbol */}
      <g transform="translate(100, 52) scale(0.65)">
        <path
          d="M 0 0 C -12 -5 -25 -5 -32 -2 L -32 10 C -25 7 -12 7 0 12 C 12 7 25 7 32 10 L 32 -2 C 25 -5 12 -5 0 0 Z"
          fill="none"
          stroke="url(#islamicGreenGrad)"
          strokeWidth="3.5"
        />
        <line x1="0" y1="0" x2="0" y2="12" stroke="url(#goldLuster)" strokeWidth="2.5" />
      </g>

      {/* Three Gold Stars (Cita-cita & Prestasi) */}
      {/* Center Star */}
      <polygon
        points="100,68 102,74 108,74 103,78 105,84 100,80 95,84 97,78 92,74 98,74"
        fill="url(#goldLuster)"
        filter="url(#subtleShadow)"
      />
      {/* Left Star */}
      <polygon
        points="86,74 87.5,78.5 92,78.5 88,81.5 89.5,86 86,83 82.5,86 84,81.5 80,78.5 84.5,78.5"
        fill="url(#goldLuster)"
        filter="url(#subtleShadow)"
      />
      {/* Right Star */}
      <polygon
        points="114,74 115.5,78.5 120,78.5 116,81.5 117.5,86 114,83 110.5,86 112,81.5 108,78.5 112.5,78.5"
        fill="url(#goldLuster)"
        filter="url(#subtleShadow)"
      />

      {/* Three Youth Figures (Ukhuwah & Kebersamaan) */}
      {/* Left Youth */}
      <circle cx="78" cy="98" r="4.5" fill="#14664F" />
      <path
        d="M 78 104 C 84 105 88 112 88 126 C 84 122 80 122 75 128 C 74 122 71 114 69 110 C 72 107 75 105 78 104 Z"
        fill="#14664F"
      />

      {/* Right Youth */}
      <circle cx="122" cy="98" r="4.5" fill="#14664F" />
      <path
        d="M 122 104 C 116 105 112 112 112 126 C 116 122 120 122 125 128 C 126 122 129 114 131 110 C 128 107 125 105 122 104 Z"
        fill="#14664F"
      />

      {/* Center Youth (Leading / Highlighted) */}
      <circle cx="100" cy="92" r="5.5" fill="url(#youthCenterGrad)" />
      <path
        d="M 100 100 C 107 100 114 107 114 122 C 109 117 104 117 100 124 C 96 117 91 117 86 122 C 86 107 93 100 100 100 Z"
        fill="url(#youthCenterGrad)"
      />
      {/* Dynamic raised arms */}
      <path
        d="M 88 107 C 92 102 96 98 92 92 C 89 96 85 101 88 107 Z"
        fill="url(#youthCenterGrad)"
      />
      <path
        d="M 112 107 C 108 102 104 98 108 92 C 111 96 115 101 112 107 Z"
        fill="url(#youthCenterGrad)"
      />

      {/* Lower Big Open Book (Al-Qur'an Terbuka Bawah) */}
      {/* Gold Base Pages */}
      <path
        d="M 100 162 C 70 148 45 150 28 160 C 35 166 65 168 100 174 C 135 168 165 166 172 160 C 155 150 130 148 100 162 Z"
        fill="url(#goldLuster)"
        stroke="#92400E"
        strokeWidth="1.5"
      />

      {/* Upper Green Leaf / Book Pages Wings */}
      <path
        d="M 100 156 C 68 132 40 142 32 152 C 55 146 78 148 100 160 C 122 148 145 146 168 152 C 160 142 132 132 100 156 Z"
        fill="url(#islamicGreenGrad)"
        stroke="#07281E"
        strokeWidth="1.5"
      />

      {/* Golden Calligraphy Quill Nib (Pena Kaligrafi) */}
      <path
        d="M 100 138 L 104 154 L 100 165 L 96 154 Z"
        fill="url(#goldLuster)"
        stroke="#78350F"
        strokeWidth="1"
      />
      <line x1="100" y1="140" x2="100" y2="155" stroke="#451A03" strokeWidth="1" />
      <circle cx="100" cy="155" r="0.8" fill="#451A03" />
    </svg>
  );

  if (variant === 'emblem') {
    const dim = size === 'sm' ? 36 : size === 'lg' ? 80 : size === 'xl' ? 120 : 54;
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <Emblem width={dim} height={dim} />
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {/* Curving Motto or Top Motto text */}
        <div className="relative mb-2">
          <div className="text-[10px] md:text-xs tracking-wider uppercase font-semibold text-[#0F4C3A] bg-[#E6F4EA] px-3.5 py-1 rounded-full border border-[#0F4C3A]/15">
            Berpegang pada Nilai, Bergerak dalam Kebaikan
          </div>
        </div>

        {/* Big Emblem */}
        <div className="relative p-2">
          <Emblem width={130} height={140} />
        </div>

        {/* Wordmark */}
        <div className="mt-1">
          <span className="font-heading text-3xl md:text-4xl font-bold tracking-wider text-[#0F4C3A] block">
            JANNAVA
          </span>
          <span className="text-xs md:text-sm font-medium tracking-widest uppercase text-[#158052] block mt-0.5">
            Islamic Youth Organization
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">
            Remaja Masjid Miftahul Jannah · Depok
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex flex-col gap-3 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center shadow-xs border border-white/20">
            <Emblem width={42} height={42} />
          </div>
          <div>
            <span className="font-heading text-2xl font-bold tracking-wider text-white block">
              JANNAVA
            </span>
            <span className="text-xs text-emerald-300 font-medium tracking-wider uppercase block">
              Islamic Youth Organization
            </span>
          </div>
        </div>
        <p className="text-xs text-emerald-100/80 leading-relaxed max-w-sm">
          Wadah pemuda Islam Masjid Miftahul Jannah dalam membangun nilai, persaudaraan, dan aksi nyata yang memberikan manfaat bagi masyarakat.
        </p>
      </div>
    );
  }

  // Default: variant === 'navbar'
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className="relative flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white/90 p-0.5 shadow-xs border border-[#0F4C3A]/10">
        <Emblem width={36} height={36} />
      </div>
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span className="font-heading text-lg md:text-xl font-bold tracking-wider text-[#0F4C3A] leading-tight">
            JANNAVA
          </span>
        </div>
        <span className="text-[10px] md:text-[11px] font-medium tracking-wide text-slate-500 leading-tight">
          Islamic Youth Organization
        </span>
      </div>
    </div>
  );
};
