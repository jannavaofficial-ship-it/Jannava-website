import React from 'react';
import { organizationInfo } from '../data/jannavaData';
import { Target, Compass } from 'lucide-react';

export const VisionMissionSection: React.FC = () => {
  return (
    <section id="visi-misi" className="py-16 md:py-24 bg-[#FBFBF9] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#158052] mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Arah & Tujuan Organisasi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Visi & Misi JANNAVA
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Pedoman langkah dalam membina generasi muda yang berilmu, berakhlak, dan berdaya guna.
          </p>
        </div>

        {/* Visi Showcase Banner */}
        <div className="mb-14 rounded-2xl bg-gradient-to-r from-[#0F4C3A] via-[#14664F] to-[#0A3326] p-8 sm:p-10 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-200 bg-white/10 mb-4 backdrop-blur-xs">
              <Target className="w-3.5 h-3.5 text-emerald-300" />
              <span>Visi Organisasi</span>
            </div>
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed font-heading tracking-wide">
              "{organizationInfo.vision}"
            </blockquote>
            <div className="mt-4 text-xs text-emerald-200/80 font-medium tracking-wider uppercase">
              Dokumen Resmi Pengurus Remaja Masjid Miftahul Jannah
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden md:flex items-center justify-center">
            <svg width="240" height="240" viewBox="0 0 100 100" fill="currentColor">
              <polygon points="50,15 61,38 85,38 66,54 73,78 50,62 27,78 34,54 15,38 39,38" />
            </svg>
          </div>
        </div>

        {/* 6 Misi Editorial Grid */}
        <div className="mb-8">
          <div className="text-left mb-6">
            <h3 className="text-lg font-bold text-slate-900">
              Misi Strategis JANNAVA
            </h3>
            <p className="text-xs text-slate-500">
              Enam pilar operasional dalam pergerakan kepengurusan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {organizationInfo.missions.map((m, index) => {
              const num = String(index + 1).padStart(2, '0');
              return (
                <div
                  key={m.title}
                  className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#0F4C3A]/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs font-mono font-bold text-[#158052] mb-3">
                      {num}.
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                      {m.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
