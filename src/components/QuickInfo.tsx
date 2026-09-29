import React from 'react';
import { BookOpen, HeartHandshake, Users2, GraduationCap, ArrowUpRight } from 'lucide-react';

interface QuickInfoProps {
  onSelectCategory?: (category: string) => void;
}

export const QuickInfo: React.FC<QuickInfoProps> = ({ onSelectCategory }) => {
  const items = [
    {
      id: 'dakwah',
      title: 'DAKWAH',
      subtitle: 'Penguatan Akidah',
      description: 'Menguatkan nilai dan pemahaman keislaman.',
      icon: BookOpen,
      categoryFilter: 'Dakwah'
    },
    {
      id: 'sosial',
      title: 'SOSIAL',
      subtitle: 'Kepedulian Umat',
      description: 'Bergerak dan memberikan manfaat bagi masyarakat.',
      icon: HeartHandshake,
      categoryFilter: 'Sosial'
    },
    {
      id: 'pemuda',
      title: 'PEMUDA',
      subtitle: 'Kolaborasi Ukhuwah',
      description: 'Membangun potensi, kreativitas, dan kebersamaan pemuda.',
      icon: Users2,
      categoryFilter: 'Pemuda'
    },
    {
      id: 'pendidikan',
      title: 'PENDIDIKAN',
      subtitle: 'Literasi & Retorika',
      description: 'Mendorong pembelajaran dan pengembangan wawasan.',
      icon: GraduationCap,
      categoryFilter: 'Pendidikan'
    }
  ];

  return (
    <section className="relative z-10 -mt-6 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-r from-[#07281E] via-[#0F4C3A] to-[#0A3326] rounded-2xl shadow-xl border border-emerald-500/30 p-2 sm:p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => onSelectCategory && onSelectCategory(item.categoryFilter)}
              className="p-4 sm:p-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/40 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-[#FDE68A] flex items-center justify-center border border-[#D4AF37]/30 group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-[#06241B] transition-all duration-200 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-emerald-400/60 group-hover:text-[#FDE68A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-300/80 mb-0.5">
                  {item.subtitle}
                </div>
                <h3 className="font-heading text-sm font-bold tracking-wider text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-emerald-300 font-semibold group-hover:text-[#FDE68A] transition-colors">
                <span>Eksplor Program</span>
                <span>→</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
