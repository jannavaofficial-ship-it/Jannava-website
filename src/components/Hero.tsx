import React from 'react';
import { ArrowRight, Compass, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onExploreActivities: () => void;
  onLearnMore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreActivities, onLearnMore }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#06241B] via-[#0F4C3A] to-[#0A3326] text-white pt-10 pb-16 md:pt-16 md:pb-24 border-b border-[#0F4C3A]">
      {/* Decorative Islamic Arch Geometric Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="heroIslamicArchPattern" width="70" height="70" patternUnits="userSpaceOnUse">
              <path
                d="M 35 0 C 20 12 14 26 14 42 L 14 70 L 56 70 L 56 42 C 56 26 50 12 35 0 Z"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="1.2"
              />
              <circle cx="35" cy="42" r="3" fill="#D4AF37" fillOpacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroIslamicArchPattern)" />
        </svg>
      </div>

      {/* Radiant ambient glow spots */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography & Intent */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Eyebrow Label & Tagline */}
            <div className="inline-flex items-center gap-2 mb-4 self-start">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-emerald-200 bg-white/10 border border-white/20 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Values • Faith • Action</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-emerald-200/80 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Masjid Miftahul Jannah · Depok</span>
              </span>
            </div>

            {/* Official Title Subheading */}
            <div className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-emerald-300 mb-2 font-mono">
              JANNAVA — Islamic Youth Organization
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.18] mb-5 text-balance">
              Berpegang pada Nilai,{' '}
              <span className="text-[#FDE68A] underline decoration-[#D4AF37]/60 decoration-wavy decoration-2 underline-offset-8">
                Bergerak dalam Kebaikan.
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg text-emerald-50/90 leading-relaxed mb-8 max-w-2xl">
              JANNAVA menjadi wadah pemuda Islam untuk bertumbuh, berkarya, dan bergerak bersama melalui kegiatan dakwah, sosial, pendidikan, kreativitas, dan kepemudaan di lingkungan Masjid Miftahul Jannah.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <button
                onClick={onExploreActivities}
                className="px-6 py-3.5 text-sm font-bold text-[#06241B] bg-gradient-to-r from-[#FDE68A] via-[#D4AF37] to-[#F59E0B] hover:brightness-105 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center gap-2 active:scale-[0.98]"
              >
                <span>Lihat Kegiatan</span>
                <ArrowRight className="w-4 h-4 text-[#06241B]" />
              </button>

              <button
                onClick={onLearnMore}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 rounded-xl transition-all duration-200 inline-flex items-center gap-2 backdrop-blur-xs active:scale-[0.98]"
              >
                <Compass className="w-4 h-4 text-emerald-300" />
                <span>Kenal JANNAVA</span>
              </button>
            </div>

            {/* Trust Markers Bar */}
            <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-emerald-200/80 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
                <span className="text-white font-semibold">Organisasi Pemuda Resmi</span>
              </div>
              <span className="text-emerald-500/60">·</span>
              <div>Wadah Pembinaan & Syiar</div>
              <span className="text-emerald-500/60">·</span>
              <div>Meruyung, Limo, Kota Depok</div>
            </div>
          </div>

          {/* Right Column: Visual Photo Focal Point */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer frame with subtle warm gold border */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 bg-slate-900 group">
                <img
                  src="/src/assets/images/hero_youth_gathering_1790655423889.jpg"
                  alt="Dokumentasi kebersamaan pemuda JANNAVA di Masjid Miftahul Jannah"
                  className="w-full h-[320px] sm:h-[400px] object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />

                {/* Scrim overlay for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                {/* Card caption overlay */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <div className="text-[11px] tracking-widest uppercase font-semibold text-[#FDE68A] mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Kebersamaan & Ukhuwah</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                    Pemuda Aktif, Berkarakter & Bermanfaat
                  </h3>
                  <p className="text-xs text-emerald-100/85 mt-1 line-clamp-2">
                    Musyawarah dan sinergi pemuda merancang kegiatan dakwah serta bakti kemasyarakatan.
                  </p>
                </div>
              </div>

              {/* Floating Decorative Accent: 3 Pillars Highlight */}
              <div className="absolute -bottom-4 -left-3 sm:-bottom-5 sm:-left-5 bg-[#06241B]/95 backdrop-blur-md text-white rounded-xl p-3.5 shadow-2xl border border-emerald-500/30 max-w-[240px] hidden sm:block">
                <div className="text-[10px] uppercase tracking-wider font-bold text-[#FDE68A]">
                  Tiga Pilar Utama
                </div>
                <div className="text-xs font-semibold text-white mt-0.5">
                  Jannah • Values • Action
                </div>
                <div className="text-[11px] text-emerald-200/70 mt-0.5">
                  Landasan gerak pemuda masjid
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
