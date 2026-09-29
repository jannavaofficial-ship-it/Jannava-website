import React from 'react';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';

interface CTASectionProps {
  onViewActivities: () => void;
  onContact: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onViewActivities, onContact }) => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#06241B] via-[#0F4C3A] to-[#0A3326] text-white border-b border-[#0F4C3A] relative overflow-hidden">
      {/* Background motif */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ctaPattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1.5" fill="#D4AF37" />
              <path d="M 30 10 L 50 30 L 30 50 L 10 30 Z" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ctaPattern)" />
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-[#FDE68A] bg-white/10 border border-white/15 mb-4 backdrop-blur-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Ajakan Berkolaborasi</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance mb-4">
          Bergerak Bersama JANNAVA
        </h2>

        <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto leading-relaxed mb-8">
          Karena perubahan tidak hanya dimulai dari gagasan, tetapi dari langkah yang dilakukan bersama.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onViewActivities}
            className="px-6 py-3.5 text-sm font-bold text-[#06241B] bg-gradient-to-r from-[#FDE68A] via-[#D4AF37] to-[#F59E0B] hover:brightness-105 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center gap-2 active:scale-[0.98]"
          >
            <span>Lihat Kegiatan</span>
            <ArrowRight className="w-4 h-4 text-[#06241B]" />
          </button>

          <button
            onClick={onContact}
            className="px-6 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 rounded-xl transition-all duration-200 inline-flex items-center gap-2 backdrop-blur-xs active:scale-[0.98]"
          >
            <Mail className="w-4 h-4 text-[#FDE68A]" />
            <span>Hubungi JANNAVA</span>
          </button>
        </div>
      </div>
    </section>
  );
};
