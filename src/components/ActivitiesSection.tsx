import React, { useState, useEffect } from 'react';
import { activitiesData, ActivityItem } from '../data/jannavaData';
import { getActivities } from '../firebase/firestore';
import { Calendar, MapPin, ArrowRight, X, Sparkles, Loader2 } from 'lucide-react';

interface ActivitiesSectionProps {
  initialFilter?: string;
}

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({ initialFilter = 'Semua' }) => {
  const [activeFilter, setActiveFilter] = useState<string>(initialFilter);
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);
  const [activitiesList, setActivitiesList] = useState<ActivityItem[]>(activitiesData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  React.useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await getActivities(activeFilter);
        if (isMounted) {
          setActivitiesList(data);
        }
      } catch (err) {
        console.warn('Error fetching activities:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    loadData();
    return () => {
      isMounted = false;
    };
  }, [activeFilter]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedActivity) {
        setSelectedActivity(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedActivity]);

  const categories = [
    'Semua',
    'Dakwah',
    'Pendidikan',
    'Sosial',
    'Pemuda',
    'Seni & Olahraga',
    'Komunikasi & Informasi'
  ];

  const filteredActivities = activitiesList;

  return (
    <section id="kegiatan" className="py-16 md:py-24 bg-[#FBFBF9] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#158052] mb-2">
            Aktivitas & Langkah Nyata
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kegiatan JANNAVA
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Potret agenda pembinaan, kajian keilmuan, aksi kemasyarakatan, dan olahraga pemuda masjid.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 gap-1.5 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                activeFilter === cat
                  ? 'bg-[#0F4C3A] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Activities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              {/* Cover Photo */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/90 text-[#0F4C3A] shadow-xs backdrop-blur-xs">
                    {activity.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#158052]" />
                      <span>{activity.date}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 truncate max-w-[130px]">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{activity.location}</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0F4C3A] transition-colors leading-snug mb-2">
                    {activity.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {activity.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedActivity(activity)}
                    className="w-full py-2 px-3 text-xs font-semibold text-[#0F4C3A] bg-[#E6F4EA]/70 hover:bg-[#E6F4EA] rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Lihat Detail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredActivities.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-sm text-slate-600">
              Belum ada kegiatan untuk kategori "{activeFilter}".
            </p>
            <button
              onClick={() => setActiveFilter('Semua')}
              className="mt-3 text-xs font-semibold text-[#0F4C3A] hover:underline"
            >
              Tampilkan Semua Kegiatan
            </button>
          </div>
        )}

        {/* Detail Modal */}
        {selectedActivity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
              {/* Modal Image Header */}
              <div className="relative h-56 sm:h-72 bg-slate-100">
                <img
                  src={selectedActivity.image}
                  alt={selectedActivity.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setSelectedActivity(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                  aria-label="Tutup detail kegiatan"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-4">
                  <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-white/95 text-[#0F4C3A] shadow-xs">
                    {selectedActivity.category}
                  </span>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3">
                  <span className="flex items-center gap-1.5 font-medium text-slate-700">
                    <Calendar className="w-4 h-4 text-[#158052]" />
                    <span>{selectedActivity.date}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#158052]" />
                    <span>{selectedActivity.location}</span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 leading-snug">
                  {selectedActivity.title}
                </h3>

                <div className="prose prose-sm text-slate-700 leading-relaxed mb-6">
                  <p>{selectedActivity.fullDescription}</p>
                </div>

                {/* Highlights */}
                {selectedActivity.highlights && selectedActivity.highlights.length > 0 && (
                  <div className="p-4 rounded-xl bg-[#F2F8F4] border border-[#0F4C3A]/10 mb-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#0F4C3A] mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Sorotan Kegiatan:</span>
                    </div>
                    <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5">
                      {selectedActivity.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#158052]"></span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => setSelectedActivity(null)}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0F4C3A] hover:bg-[#158052] rounded-xl transition-colors"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
