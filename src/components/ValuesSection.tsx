import React from 'react';
import { Compass, Flame, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export const ValuesSection: React.FC = () => {
  const valuesData = [
    {
      key: 'VALUES',
      title: 'VALUES',
      subtitle: 'Integritas & Prinsip Luhur',
      description: 'Berpegang pada nilai dan prinsip yang baik dalam setiap langkah.',
      elaboration: 'Menjaga kejujuran, adab bermuamalah, dan etika kepemimpinan pemuda yang luhur dalam dinamika pergaulan dan masyarakat.',
      gradient: 'from-[#06241B] via-[#0A3326] to-[#0F4C3A]',
      accentColor: '#FDE68A',
      icon: Award
    },
    {
      key: 'FAITH',
      title: 'FAITH',
      subtitle: 'Akidah & Landasan Syariat',
      description: 'Menjadikan nilai-nilai Islam sebagai landasan dalam berpikir dan bergerak.',
      elaboration: 'Menautkan seluruh aktivitas, karya, dan niat semata-mata mengharap rida Allah SWT dan meneladani kemuliaan akhlak Rasulullah SAW.',
      gradient: 'from-[#0A3326] via-[#0F4C3A] to-[#14664F]',
      accentColor: '#FDE68A',
      icon: Compass
    },
    {
      key: 'ACTION',
      title: 'ACTION',
      subtitle: 'Kemanfaatan Nyata bagi Umat',
      description: 'Mengubah nilai dan kepedulian menjadi aksi nyata yang memberikan manfaat.',
      elaboration: 'Bukan sekadar berwacana, pemuda JANNAVA terjun langsung mengabdi, berkhidmat kepada masjid, dan menolong sesama warga sekitar.',
      gradient: 'from-[#07281E] via-[#0A3326] to-[#158052]',
      accentColor: '#FDE68A',
      icon: Flame
    }
  ];

  return (
    <section id="nilai" className="py-16 md:py-24 bg-[#08261D] text-white border-b border-[#0F4C3A] relative overflow-hidden">
      {/* Background motif */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="valuesPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <polygon points="20,0 40,20 20,40 0,20" fill="none" stroke="#D4AF37" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#valuesPattern)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-[#FDE68A] bg-white/10 border border-white/15 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Trilogi Karakter Pemuda</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Values • Faith • Action
          </h2>
          <p className="text-sm sm:text-base text-emerald-200/80 mt-2">
            Tiga pilar esensial yang menjadi kompas gerak seluruh anggota dan pengurus JANNAVA.
          </p>
        </div>

        {/* 3 Visual Cards with Rich Islamic Green Gradients */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {valuesData.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.key}
                className={`group relative rounded-3xl bg-gradient-to-b ${item.gradient} p-8 border border-emerald-500/30 shadow-xl hover:shadow-2xl hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  {/* Icon container */}
                  <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-[#FDE68A] mb-6 group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-[#06241B] transition-all duration-300 shadow-lg">
                    <Icon className="w-7 h-7" />
                  </div>

                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#FDE68A] mb-1 font-mono">
                    {item.subtitle}
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-wide mb-3">
                    {item.title}
                  </h3>
                  <blockquote className="text-sm sm:text-base font-semibold text-emerald-100 leading-snug mb-4">
                    "{item.description}"
                  </blockquote>
                  <p className="text-xs sm:text-sm text-emerald-200/70 leading-relaxed">
                    {item.elaboration}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/15 flex items-center justify-between text-xs text-[#FDE68A] font-semibold">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Pilar Gerak #{item.key}</span>
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform"></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
