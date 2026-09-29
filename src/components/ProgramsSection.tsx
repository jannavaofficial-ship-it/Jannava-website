import React, { useState } from 'react';
import { programs, ProgramItem } from '../data/jannavaData';
import { BookOpen, HeartHandshake, Trophy, Share2, Check, ArrowRight, Sparkles } from 'lucide-react';

interface ProgramsSectionProps {
  onSelectProgramActivities?: (category: string) => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ onSelectProgramActivities }) => {
  const [selectedProgramId, setSelectedProgramId] = useState<string>(programs[0].id);

  const getProgramIcon = (name: string) => {
    switch (name) {
      case 'BookOpen':
        return BookOpen;
      case 'HeartHandshake':
        return HeartHandshake;
      case 'Trophy':
        return Trophy;
      case 'Share2':
      default:
        return Share2;
    }
  };

  const getProgramImage = (id: string) => {
    switch (id) {
      case 'pendidikan-dakwah':
        return '/src/assets/images/activity_kajian_dakwah_1790655436982.jpg';
      case 'sosial-kemanusiaan':
        return '/src/assets/images/activity_social_action_1790655448474.jpg';
      case 'seni-olahraga':
        return '/src/assets/images/activity_sports_futsal_1790655461050.jpg';
      case 'komunikasi-informasi':
      default:
        return '/src/assets/images/mosque_environment_1790655500986.jpg';
    }
  };

  const activeProgram = programs.find((p) => p.id === selectedProgramId) || programs[0];
  const ActiveIcon = getProgramIcon(activeProgram.iconName);

  return (
    <section id="program" className="py-16 md:py-24 bg-[#F2F8F4] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-[#0F4C3A] bg-[#E6F4EA] border border-[#0F4C3A]/15 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#158052]" />
            <span>Pilar Kerja & Kontribusi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Program Utama JANNAVA
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Empat pilar program strategis yang dirancang untuk membina keilmuan, kepedulian, dan kreativitas pemuda Islam.
          </p>
        </div>

        {/* Desktop & Mobile Tab Selectors */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {programs.map((prog) => {
            const Icon = getProgramIcon(prog.iconName);
            const isSelected = selectedProgramId === prog.id;
            return (
              <button
                key={prog.id}
                onClick={() => setSelectedProgramId(prog.id)}
                className={`p-4 rounded-2xl text-left transition-all border ${
                  isSelected
                    ? 'bg-[#0F4C3A] text-white border-[#0F4C3A] shadow-lg ring-2 ring-[#D4AF37]/50'
                    : 'bg-white text-slate-800 border-slate-200/90 hover:border-emerald-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-white/20 text-[#FDE68A]' : 'bg-[#E6F4EA] text-[#0F4C3A]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`text-xs sm:text-sm font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                      {prog.title}
                    </h3>
                    <span className={`text-[10px] hidden sm:inline ${isSelected ? 'text-emerald-200' : 'text-slate-500'}`}>
                      Program Pokok
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Program Showcase Card with Deep Islamic Green Canvas */}
        <div className="bg-gradient-to-br from-[#06241B] via-[#0A3326] to-[#0F4C3A] text-white rounded-3xl border border-emerald-500/30 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Details */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-[#06241B] bg-[#FDE68A] mb-4 shadow-xs">
                <ActiveIcon className="w-4 h-4 text-[#06241B]" />
                <span>{activeProgram.category}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                {activeProgram.title}
              </h3>

              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed mb-6">
                {activeProgram.summary}
              </p>

              {/* Key Activities List */}
              <div className="space-y-3 mb-8">
                <div className="text-xs font-bold uppercase tracking-wider text-[#FDE68A] font-mono">
                  Agenda & Kegiatan Pokok:
                </div>
                {activeProgram.keyActivities.map((act, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-emerald-50">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/30 text-[#FDE68A] flex items-center justify-center shrink-0 mt-0.5 border border-[#D4AF37]/30">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-white/15 flex items-center gap-4">
              <button
                onClick={() => onSelectProgramActivities && onSelectProgramActivities(activeProgram.category)}
                className="px-6 py-3 text-xs font-bold text-[#06241B] bg-gradient-to-r from-[#FDE68A] via-[#D4AF37] to-[#F59E0B] hover:brightness-105 rounded-xl shadow-md transition-all inline-flex items-center gap-2"
              >
                <span>Lihat Kegiatan Terkait</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full bg-slate-900">
            <img
              src={getProgramImage(activeProgram.id)}
              alt={activeProgram.title}
              className="w-full h-full object-cover min-h-[280px]"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#FDE68A]">
                Dokumentasi Program
              </div>
              <div className="text-sm font-medium mt-0.5 text-slate-100">
                Pilar Gerak Remaja Masjid Miftahul Jannah
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
