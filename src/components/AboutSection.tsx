import React, { useState } from 'react';
import { JannavaLogo } from './JannavaLogo';
import { organizationInfo, logoElements } from '../data/jannavaData';
import { ArrowRight, CheckCircle2, Info, Sparkles, BookOpen, Compass, Flame } from 'lucide-react';

interface AboutSectionProps {
  onLearnMore?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onLearnMore, onNavigateSection }) => {
  const [selectedLogoElement, setSelectedLogoElement] = useState<string>(logoElements[0].id);

  const activeElement = logoElements.find((e) => e.id === selectedLogoElement) || logoElements[0];

  const pillarIcons = [BookOpen, Compass, Flame];

  return (
    <section id="tentang" className="py-16 md:py-24 bg-[#F8FAF8] border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-[#0F4C3A] bg-[#E6F4EA] border border-[#0F4C3A]/15 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#158052]" />
            <span>Mengenal Identitas & Filosofi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Tentang JANNAVA
          </h2>
          <p className="text-base text-slate-600 mt-3 leading-relaxed">
            Wadah kolaborasi pemuda Islam di lingkungan Masjid Miftahul Jannah, Meruyung, Kota Depok.
          </p>
        </div>

        {/* Main About Layout: Photo + Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          {/* Left: Visual Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-100 ring-1 ring-emerald-900/10">
              <img
                src="/src/assets/images/activity_kajian_dakwah_1790655436982.jpg"
                alt="Kegiatan pembelajaran dan kajian pemuda JANNAVA"
                className="w-full h-[320px] sm:h-[400px] object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs uppercase font-semibold text-[#FDE68A] tracking-wider block mb-1">
                  Lingkungan Masjid Miftahul Jannah
                </span>
                <p className="text-sm font-medium text-slate-100">
                  Meruyung, Kecamatan Limo, Kota Depok, Jawa Barat
                </p>
              </div>
            </div>

            {/* Small Floating Emblem Badge */}
            <div className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 bg-white p-3.5 rounded-2xl shadow-xl border border-emerald-100 hidden sm:flex items-center gap-3">
              <JannavaLogo variant="emblem" size="sm" />
              <div>
                <div className="text-[11px] font-bold text-[#0F4C3A]">Identitas Resmi</div>
                <div className="text-[10px] text-slate-500">Remaja Masjid Miftahul Jannah</div>
              </div>
            </div>
          </div>

          {/* Right: Narrative Description */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="text-xs uppercase font-bold tracking-widest text-[#158052] mb-2 font-mono">
              Berpegang pada Nilai, Bergerak dalam Kebaikan
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-4">
              Ruang Belajar, Bertumbuh, Berkarya, dan Bergerak Bersama.
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
              JANNAVA merupakan organisasi pemuda Islam yang menjadi ruang untuk belajar, bertumbuh, berkarya, dan bergerak bersama. Melalui berbagai kegiatan dakwah, pendidikan, sosial, seni, olahraga, dan komunikasi, JANNAVA mendorong pemuda untuk memiliki nilai, membangun kebersamaan, dan memberikan manfaat bagi lingkungan.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              JANNAVA bukan sekadar singkatan, melainkan filosofi identitas dari Remaja Masjid Miftahul Jannah yang menggabungkan tiga pilar utama: <strong>Jannah</strong> (Surga sebagai tujuan akhir & rida Allah), <strong>Values</strong> (Nilai-nilai keislaman sebagai landasan), dan <strong>Action</strong> (Gerakan & kontribusi nyata bagi masyarakat).
            </p>

            {/* 3 Pillars Summary Cards with Rich Green Styling */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {organizationInfo.threePillars.map((p, idx) => {
                const Icon = pillarIcons[idx % pillarIcons.length];
                return (
                  <div
                    key={p.title}
                    className="p-3.5 rounded-xl bg-gradient-to-br from-[#0F4C3A] to-[#14664F] text-white shadow-xs border border-emerald-400/20 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#FDE68A] mb-1.5">
                        <Icon className="w-3.5 h-3.5 text-[#FDE68A]" />
                        <span>{p.title}</span>
                      </div>
                      <div className="text-[11px] text-emerald-100/90 leading-relaxed">
                        {p.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={onLearnMore}
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#0F4C3A] hover:bg-[#158052] rounded-xl shadow-xs transition-colors inline-flex items-center gap-2"
              >
                <span>Visi, Misi & Struktur</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {onNavigateSection && (
                <button
                  onClick={() => onNavigateSection('makna-logo')}
                  className="px-4 py-2.5 text-xs font-semibold text-[#0F4C3A] hover:bg-[#E6F4EA] rounded-xl transition-colors border border-[#0F4C3A]/25"
                >
                  Lihat Makna Logo
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Logo Philosophy Section with Luxurious Deep Green Backdrop */}
        <div id="makna-logo" className="pt-6">
          <div className="rounded-3xl bg-gradient-to-br from-[#06241B] via-[#0A3326] to-[#0F4C3A] p-6 sm:p-10 shadow-2xl border border-emerald-500/30 text-white relative overflow-hidden">
            {/* Subtle background stars motif */}
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Sparkles className="w-48 h-48 text-[#D4AF37]" />
            </div>

            <div className="text-center max-w-2xl mx-auto mb-10 relative z-10">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#FDE68A] mb-2 px-3 py-1 rounded-full bg-white/10 border border-white/15">
                <Info className="w-3.5 h-3.5 text-[#FDE68A]" />
                <span>Simbolisme & Filosofi</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold text-white">
                Makna Elemen Logo JANNAVA
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 mt-2">
                Dirancang secara elegan berlandaskan arsitektur Islam, simbol keilmuan, dan ukhuwah pemuda masjid.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Center Logo Visual in Framed Container */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xs">
                <div className="p-4 bg-white rounded-2xl shadow-xl border border-emerald-900/20 max-w-xs w-full flex justify-center">
                  <JannavaLogo variant="full" />
                </div>
                <div className="text-xs text-emerald-200/80 mt-4 text-center">
                  Klik elemen di samping untuk membaca filosofi desain.
                </div>
              </div>

              {/* Elements Selector & Description */}
              <div className="lg:col-span-7 flex flex-col gap-3">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {logoElements.map((el) => {
                    const isSelected = selectedLogoElement === el.id;
                    return (
                      <button
                        key={el.id}
                        onClick={() => setSelectedLogoElement(el.id)}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          isSelected
                            ? 'bg-[#158052] border-[#FDE68A] text-white shadow-md ring-1 ring-[#FDE68A]'
                            : 'bg-white/10 border-white/15 text-emerald-100 hover:bg-white/15 hover:border-white/30'
                        }`}
                      >
                        <div className="text-lg mb-1">{el.symbol}</div>
                        <div className="text-xs font-semibold line-clamp-1">
                          {el.title}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Active Element Detail Box */}
                <div className="mt-3 p-5 rounded-2xl bg-white/95 text-slate-900 shadow-xl border border-[#D4AF37]/50">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="text-2xl">{activeElement.symbol}</span>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-[#0F4C3A]">
                        {activeElement.title}
                      </h4>
                      <span className="text-[10px] uppercase font-semibold tracking-wider text-[#158052]">
                        Filosofi Resmi JANNAVA
                      </span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-1">
                    {activeElement.meaning}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
