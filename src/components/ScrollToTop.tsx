import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div
      className={`fixed bottom-6 right-5 sm:right-7 z-40 transition-all duration-300 pointer-events-none ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4'
      }`}
    >
      <button
        onClick={scrollToTop}
        aria-label="Kembali ke atas"
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#0F4C3A] text-white shadow-xl hover:shadow-2xl hover:bg-[#158052] active:scale-95 border-2 border-emerald-400/30 hover:border-[#D4AF37] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      >
        <ArrowUp className="w-5 h-5 text-white group-hover:-translate-y-0.5 transition-transform duration-200" />
        
        {/* Subtle glow effect */}
        <span className="absolute -inset-0.5 rounded-full bg-emerald-400/20 blur-xs group-hover:bg-[#D4AF37]/30 transition-all -z-10" />

        {/* Floating tooltip on hover (desktop) */}
        <span className="hidden md:group-hover:block absolute right-full mr-3 px-2.5 py-1 text-[11px] font-semibold text-white bg-slate-900/90 backdrop-blur-xs rounded-lg whitespace-nowrap shadow-md pointer-events-none">
          Kembali ke Atas
        </span>
      </button>
    </div>
  );
};
