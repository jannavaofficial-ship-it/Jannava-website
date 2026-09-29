import React from 'react';
import { historyTimeline } from '../data/jannavaData';
import { Clock, Landmark, Sparkles, BookMarked } from 'lucide-react';

export const HistorySection: React.FC = () => {
  return (
    <section id="sejarah" className="py-16 md:py-24 bg-[#FBFBF9] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#158052] mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Rekam Jejak & Riwayat</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Sejarah & Riwayat JANNAVA
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Tumbuh dari semangat pemuda di lingkungan Masjid Miftahul Jannah, Depok.
          </p>
        </div>

        {/* Narrative Box */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-12">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#E6F4EA] text-[#0F4C3A] flex items-center justify-center shrink-0">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                Akar Tumbuh di Lingkungan Masjid Miftahul Jannah
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                JANNAVA tumbuh sebagai wadah pemuda Islam di lingkungan Masjid Miftahul Jannah. Organisasi ini menjadi ruang bagi pemuda untuk berkolaborasi dalam kegiatan keagamaan, sosial, pendidikan, kreativitas, dan kegiatan positif lainnya.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <BookMarked className="w-3.5 h-3.5 text-[#158052]" />
                <span>Riwayat resmi organisasi pemuda masjid (dapat terus diperbarui seiring berjalannya arsip kepengurusan).</span>
              </div>
            </div>
          </div>
        </div>

        {/* Structured Timeline (Ready to be populated further) */}
        <div className="max-w-3xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-[#0F4C3A] mb-6 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#158052]" />
            <span>Fase Tumbuh & Dinamika Gerak:</span>
          </div>

          <div className="relative border-l-2 border-[#158052]/30 ml-4 space-y-8 pl-6">
            {historyTimeline.map((item, index) => (
              <div key={index} className="relative group">
                {/* Dot */}
                <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#0F4C3A] group-hover:bg-[#158052] transition-colors" />

                <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs">
                  <div className="text-[11px] font-mono font-bold text-[#158052] uppercase tracking-wider mb-1">
                    {item.era}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
