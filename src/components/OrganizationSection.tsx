import React, { useState } from 'react';
import { bphMembers, departments, Officer } from '../data/jannavaData';
import { Users, ChevronDown, ChevronUp, UserCheck, ShieldCheck, Layers, GitFork, Sparkles } from 'lucide-react';

export const OrganizationSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tree' | 'bph' | 'bidang'>('tree');
  const [expandedTupoksi, setExpandedTupoksi] = useState<string | null>('bph');
  const [selectedOfficer, setSelectedOfficer] = useState<Officer | null>(null);

  // Avatar placeholder generator that is dignified, respectful, and elegant (no fake AI face photos)
  const renderAvatarPlaceholder = (name: string, role: string) => {
    const initials = name
      .split(' ')
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase();

    return (
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F4C3A] via-[#14664F] to-[#0A3326] flex items-center justify-center text-[#FDE68A] font-bold text-sm shadow-md shrink-0 border border-[#D4AF37]/40 ring-2 ring-emerald-500/20">
        <span>{initials}</span>
      </div>
    );
  };

  const toggleTupoksi = (key: string) => {
    setExpandedTupoksi(expandedTupoksi === key ? null : key);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedOfficer) {
        setSelectedOfficer(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOfficer]);

  return (
    <section id="organisasi" className="py-16 md:py-24 bg-[#F8FAF8] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-[#0F4C3A] bg-[#E6F4EA] border border-[#0F4C3A]/15 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#158052]" />
            <span>Struktur Kepengurusan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Struktur Organisasi JANNAVA
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            JANNAVA berjalan melalui kolaborasi dan pembagian peran yang jelas. Setiap bagian memiliki tanggung jawab masing-masing untuk mendukung kegiatan organisasi.
          </p>
        </div>

        {/* View Switcher Tabs with Emerald and White Contrasts */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-[#E6F4EA]/80 rounded-2xl border border-emerald-600/20 shadow-xs">
            <button
              onClick={() => setActiveTab('tree')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'tree'
                  ? 'bg-[#0F4C3A] text-white shadow-md'
                  : 'text-[#0F4C3A] hover:bg-white/60'
              }`}
            >
              <GitFork className="w-3.5 h-3.5" />
              <span>Bagan Struktur (Tree)</span>
            </button>
            <button
              onClick={() => setActiveTab('bph')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'bph'
                  ? 'bg-[#0F4C3A] text-white shadow-md'
                  : 'text-[#0F4C3A] hover:bg-white/60'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Badan Pengurus Harian</span>
            </button>
            <button
              onClick={() => setActiveTab('bidang')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'bidang'
                  ? 'bg-[#0F4C3A] text-white shadow-md'
                  : 'text-[#0F4C3A] hover:bg-white/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Bidang Organisasi</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Organization Tree View */}
        {activeTab === 'tree' && (
          <div className="bg-white p-4 sm:p-10 rounded-3xl border border-slate-200/90 shadow-md mb-14 overflow-x-auto">
            {/* Mobile swipe helper */}
            <div className="flex sm:hidden items-center justify-center gap-1.5 text-[11px] font-semibold text-[#0F4C3A] bg-[#E6F4EA] py-1.5 px-3 rounded-full mb-4 mx-auto w-fit border border-[#0F4C3A]/15">
              <span>⇄ Geser layar untuk melihat seluruh bagan struktur</span>
            </div>

            <div className="min-w-[700px] flex flex-col items-center">
              {/* Level 0: Dewan Pembina & DKM */}
              <div className="flex flex-col items-center">
                <div className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#06241B] via-[#0A3326] to-[#0F4C3A] text-white text-xs font-bold shadow-md flex items-center gap-2.5 border border-[#D4AF37]/40">
                  <ShieldCheck className="w-4 h-4 text-[#FDE68A]" />
                  <span>Dewan Kemakmuran Masjid (DKM) Miftahul Jannah</span>
                  <span className="text-[10px] text-emerald-200 font-normal">(Pembina & Pengarah)</span>
                </div>
                <div className="w-0.5 h-6 bg-[#0F4C3A]/30"></div>
              </div>

              {/* Level 1: Ketua & Wakil Ketua */}
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-2 gap-4">
                  {/* Ketua Umum */}
                  <div
                    onClick={() => setSelectedOfficer(bphMembers[0])}
                    className="p-4 rounded-2xl bg-gradient-to-br from-[#0F4C3A] to-[#0A3326] text-white border-2 border-[#D4AF37] shadow-lg text-center cursor-pointer hover:scale-102 transition-all w-64"
                  >
                    <div className="text-[10px] uppercase font-bold tracking-widest text-[#FDE68A]">
                      Ketua Umum
                    </div>
                    <div className="text-base font-bold text-white mt-1">
                      M. Abdul Mubarok
                    </div>
                    <div className="text-[11px] text-emerald-200/80 mt-1">
                      Pengurus Harian Inti
                    </div>
                  </div>

                  {/* Wakil Ketua */}
                  <div
                    onClick={() => setSelectedOfficer(bphMembers[1])}
                    className="p-4 rounded-2xl bg-gradient-to-br from-[#14664F] to-[#0F4C3A] text-white border-2 border-emerald-400/50 shadow-lg text-center cursor-pointer hover:scale-102 transition-all w-64"
                  >
                    <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-200">
                      Wakil Ketua
                    </div>
                    <div className="text-base font-bold text-white mt-1">
                      Irfan Muta’ali
                    </div>
                    <div className="text-[11px] text-emerald-200/80 mt-1">
                      Pengurus Harian Inti
                    </div>
                  </div>
                </div>
                <div className="w-0.5 h-6 bg-[#0F4C3A]/30"></div>
              </div>

              {/* Level 2: Sekretaris & Bendahara */}
              <div className="flex flex-col items-center w-full">
                <div className="grid grid-cols-3 gap-3 max-w-2xl">
                  {/* Sekretaris */}
                  <div
                    onClick={() => setSelectedOfficer(bphMembers[2])}
                    className="p-3.5 rounded-xl bg-[#F2F8F4] border border-[#0F4C3A]/25 shadow-xs text-center cursor-pointer hover:border-[#0F4C3A] hover:bg-white transition-all"
                  >
                    <div className="text-[10px] uppercase font-bold text-[#0F4C3A]">
                      Sekretaris
                    </div>
                    <div className="text-xs font-bold text-slate-900 mt-0.5">
                      Putri Dewi Sadira
                    </div>
                    <div className="text-[10px] text-slate-500">Persuratan & Arsip</div>
                  </div>

                  {/* Bendahara 1 */}
                  <div
                    onClick={() => setSelectedOfficer(bphMembers[3])}
                    className="p-3.5 rounded-xl bg-[#F2F8F4] border border-[#0F4C3A]/25 shadow-xs text-center cursor-pointer hover:border-[#0F4C3A] hover:bg-white transition-all"
                  >
                    <div className="text-[10px] uppercase font-bold text-[#0F4C3A]">
                      Bendahara 1
                    </div>
                    <div className="text-xs font-bold text-slate-900 mt-0.5">
                      Elfira Rosa Damayanti
                    </div>
                    <div className="text-[10px] text-slate-500">Finansial & Kas</div>
                  </div>

                  {/* Bendahara 2 */}
                  <div
                    onClick={() => setSelectedOfficer(bphMembers[4])}
                    className="p-3.5 rounded-xl bg-[#F2F8F4] border border-[#0F4C3A]/25 shadow-xs text-center cursor-pointer hover:border-[#0F4C3A] hover:bg-white transition-all"
                  >
                    <div className="text-[10px] uppercase font-bold text-[#0F4C3A]">
                      Bendahara 2
                    </div>
                    <div className="text-xs font-bold text-slate-900 mt-0.5">
                      Dian Widhiastuti
                    </div>
                    <div className="text-[10px] text-slate-500">Operasional & Danus</div>
                  </div>
                </div>
                <div className="w-0.5 h-6 bg-[#0F4C3A]/30"></div>
              </div>

              {/* Horizontal Connecting Rail for 4 Departments */}
              <div className="w-full max-w-4xl relative">
                <div className="h-0.5 bg-[#0F4C3A]/30 mx-10"></div>
                <div className="grid grid-cols-4 gap-3 pt-4">
                  {departments.map((dept) => (
                    <div
                      key={dept.id}
                      className="p-3.5 rounded-2xl bg-[#F8FAF8] border border-emerald-600/20 shadow-xs hover:border-[#0F4C3A] hover:bg-white transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#158052] mb-1">
                          {dept.shortName}
                        </div>
                        <div className="text-xs font-bold text-slate-900 leading-tight mb-2">
                          {dept.name}
                        </div>
                        <div className="space-y-1">
                          {dept.officers.map((off, idx) => (
                            <div key={idx} className="text-[11px] text-slate-700">
                              <span className="font-semibold text-slate-900">{off.name}</span>
                              <span className="text-[10px] text-emerald-800 block">
                                {off.role}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 text-center text-xs text-slate-500">
                Klik kartu pengurus untuk membaca uraian tugas pokok dan fungsi (Tupoksi).
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Badan Pengurus Harian (BPH) Grid */}
        {activeTab === 'bph' && (
          <div className="mb-14">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">
                Badan Pengurus Harian (BPH) JANNAVA
              </h3>
              <p className="text-xs text-slate-500">
                Unsur pimpinan inti pemegang kebijakan strategis, administrasi, dan tata kelola finansial organisasi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {bphMembers.map((officer) => (
                <div
                  key={officer.role}
                  onClick={() => setSelectedOfficer(officer)}
                  className="p-6 rounded-2xl bg-white border border-emerald-900/15 shadow-xs hover:border-[#0F4C3A] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center gap-3.5 mb-4">
                      {renderAvatarPlaceholder(officer.name, officer.role)}
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#158052] block">
                          {officer.role}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#0F4C3A] transition-colors">
                          {officer.name}
                        </h4>
                        <span className="text-xs text-slate-500 block mt-0.5">
                          {officer.badge || officer.division}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-3 border-t border-slate-100">
                      <div className="text-[11px] font-bold text-slate-700">Tugas Pokok:</div>
                      <ul className="text-xs text-slate-600 space-y-1">
                        {officer.responsibilities.slice(0, 2).map((r, i) => (
                          <li key={i} className="line-clamp-2">
                            • {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-[#0F4C3A] flex items-center justify-between">
                    <span>Lihat Uraian Lengkap</span>
                    <span>→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Bidang Organisasi Grid */}
        {activeTab === 'bidang' && (
          <div className="mb-14 space-y-6">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-slate-900">
                Bidang-Bidang Organisasi
              </h3>
              <p className="text-xs text-slate-500">
                Departemen operasional yang mengeksekusi program kerja dakwah, kemasyarakatan, minat bakat, dan media syiar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {departments.map((dept) => (
                <div
                  key={dept.id}
                  className="p-6 rounded-2xl bg-white border border-emerald-900/15 shadow-xs flex flex-col justify-between hover:border-[#0F4C3A] transition-all"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs uppercase font-bold tracking-wider text-[#0F4C3A] px-2.5 py-0.5 bg-[#E6F4EA] rounded-full border border-emerald-600/20">
                        {dept.shortName}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 mb-2">
                      {dept.name}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {dept.description}
                    </p>

                    <div className="space-y-3 mb-4 pt-3 border-t border-slate-100">
                      <div className="text-xs font-bold text-slate-800">
                        Susunan Personalia Bidang:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {dept.officers.map((off, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl bg-[#F2F8F4] border border-emerald-700/15 flex items-center gap-2.5"
                          >
                            {renderAvatarPlaceholder(off.name, off.role)}
                            <div>
                              <div className="text-xs font-bold text-slate-900 leading-tight">
                                {off.name}
                              </div>
                              <div className="text-[10px] text-[#158052] leading-tight mt-0.5">
                                {off.role}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <div className="text-xs font-bold text-slate-800 mb-1.5">
                        Fungsi Operasional:
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1">
                        {dept.functions.map((f, i) => (
                          <li key={i}>• {f}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section W: Accordion Tugas & Fungsi (Tupoksi) */}
        <div id="tupoksi" className="pt-8 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Tugas & Fungsi (Tupoksi) Organisasi
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Panduan operasional dan tanggung jawab masing-masing jabatan berdasarkan pedoman kepengurusan JANNAVA.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {/* Tupoksi BPH */}
            <div className="rounded-2xl border border-emerald-900/15 overflow-hidden bg-white shadow-xs">
              <button
                onClick={() => toggleTupoksi('bph')}
                className="w-full p-4 text-left font-bold text-sm text-slate-900 flex items-center justify-between hover:bg-[#F2F8F4] transition-colors"
              >
                <span className="flex items-center gap-2.5 text-[#0F4C3A]">
                  <ShieldCheck className="w-4 h-4 text-[#158052]" />
                  <span>Badan Pengurus Harian (Ketua, Wakil, Sekretaris, Bendahara 1 & 2)</span>
                </span>
                {expandedTupoksi === 'bph' ? (
                  <ChevronUp className="w-4 h-4 text-[#0F4C3A]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>
              {expandedTupoksi === 'bph' && (
                <div className="px-5 pb-5 pt-2 text-xs text-slate-700 space-y-3 border-t border-emerald-100 bg-[#F2F8F4]/50">
                  <div>
                    <strong className="text-[#0F4C3A]">Ketua Umum:</strong> Memimpin dan memegang komando tertinggi seluruh jalannya organisasi, menentukan arah kebijakan strategis, mengoordinasikan seluruh bidang kerja, dan menjadi perwakilan resmi JANNAVA dengan DKM dan pihak eksternal.
                  </div>
                  <div>
                    <strong className="text-[#0F4C3A]">Wakil Ketua:</strong> Mendampingi Ketua Umum, menggantikan tugas jika berhalangan, mengawasi dan mengevaluasi kinerja departemen, serta berfokus pada koordinasi internal kepengurusan.
                  </div>
                  <div>
                    <strong className="text-[#0F4C3A]">Sekretaris:</strong> Mengelola seluruh administrasi, persuratan, proposal, pengarsipan, menyusun notulensi rapat, LPJ, presensi, serta mengatur agenda terstruktur.
                  </div>
                  <div>
                    <strong className="text-[#0F4C3A]">Bendahara 1 (Finansial & Kas):</strong> Bertanggung jawab penuh atas pemasukan dan pengeluaran kas serta penyusunan laporan keuangan transparan secara berkala.
                  </div>
                  <div>
                    <strong className="text-[#0F4C3A]">Bendahara 2 (Operasional & Danus):</strong> Mengelola dana operasional kegiatan lapangan dan merancang inovasi pencarian dana mandiri (merchandise, usaha kreatif, infaq).
                  </div>
                </div>
              )}
            </div>

            {/* Tupoksi Humas */}
            <div className="rounded-2xl border border-emerald-900/15 overflow-hidden bg-white shadow-xs">
              <button
                onClick={() => toggleTupoksi('humas')}
                className="w-full p-4 text-left font-bold text-sm text-slate-900 flex items-center justify-between hover:bg-[#F2F8F4] transition-colors"
              >
                <span className="flex items-center gap-2.5 text-[#0F4C3A]">
                  <Users className="w-4 h-4 text-[#158052]" />
                  <span>Bidang Hubungan Masyarakat (Humas)</span>
                </span>
                {expandedTupoksi === 'humas' ? (
                  <ChevronUp className="w-4 h-4 text-[#0F4C3A]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>
              {expandedTupoksi === 'humas' && (
                <div className="px-5 pb-5 pt-2 text-xs text-slate-700 space-y-2 border-t border-emerald-100 bg-[#F2F8F4]/50">
                  <p>• Membangun komunikasi internal antarpengurus dan merangkul pemuda di lingkungan sekitar.</p>
                  <p>• Menjalin hubungan silaturahmi formal dan informal dengan masyarakat, DKM Miftahul Jannah, tokoh agama, serta lembaga kepemudaan.</p>
                  <p>• Mendukung kelancaran komunikasi organisasi dan kemitraan dalam setiap kegiatan.</p>
                </div>
              )}
            </div>

            {/* Tupoksi Pendidikan & Dakwah */}
            <div className="rounded-2xl border border-emerald-900/15 overflow-hidden bg-white shadow-xs">
              <button
                onClick={() => toggleTupoksi('dakwah')}
                className="w-full p-4 text-left font-bold text-sm text-slate-900 flex items-center justify-between hover:bg-[#F2F8F4] transition-colors"
              >
                <span className="flex items-center gap-2.5 text-[#0F4C3A]">
                  <UserCheck className="w-4 h-4 text-[#158052]" />
                  <span>Bidang Pendidikan dan Dakwah</span>
                </span>
                {expandedTupoksi === 'dakwah' ? (
                  <ChevronUp className="w-4 h-4 text-[#0F4C3A]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>
              {expandedTupoksi === 'dakwah' && (
                <div className="px-5 pb-5 pt-2 text-xs text-slate-700 space-y-2 border-t border-emerald-100 bg-[#F2F8F4]/50">
                  <p>• Menyusun dan mengelola kajian rutin tematik, peringatan hari besar Islam (PHBI), dan pembinaan Al-Qur'an.</p>
                  <p>• Pelatihan Public Speaking & Muhadharah: Mengadakan latihan rutin berpidato, kultum, dan khutbah untuk mengasah keberanian serta keterampilan retorika komunikasi anggota.</p>
                  <p>• Menyediakan materi dakwah substantif yang siap disebarkan melalui media digital.</p>
                </div>
              )}
            </div>

            {/* Tupoksi Seni & Olahraga */}
            <div className="rounded-2xl border border-emerald-900/15 overflow-hidden bg-white shadow-xs">
              <button
                onClick={() => toggleTupoksi('seni-olahraga')}
                className="w-full p-4 text-left font-bold text-sm text-slate-900 flex items-center justify-between hover:bg-[#F2F8F4] transition-colors"
              >
                <span className="flex items-center gap-2.5 text-[#0F4C3A]">
                  <Layers className="w-4 h-4 text-[#158052]" />
                  <span>Bidang Seni dan Olahraga</span>
                </span>
                {expandedTupoksi === 'seni-olahraga' ? (
                  <ChevronUp className="w-4 h-4 text-[#0F4C3A]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>
              {expandedTupoksi === 'seni-olahraga' && (
                <div className="px-5 pb-5 pt-2 text-xs text-slate-700 space-y-2 border-t border-emerald-100 bg-[#F2F8F4]/50">
                  <p>• Mengagendakan kegiatan olahraga rutin (futsal, badminton, senam) untuk mempererat ukhuwah dan menjaga kebugaran fisik pemuda.</p>
                  <p>• Mengembangkan potensi seni Islami (hadroh, marawis, nasyid, kaligrafi, seni kreatif).</p>
                  <p>• Mengadakan agenda rekreasi, mabit (malam bina iman dan taqwa), dan gathering untuk membangun kesolidan tim.</p>
                </div>
              )}
            </div>

            {/* Tupoksi Kominfo */}
            <div className="rounded-2xl border border-emerald-900/15 overflow-hidden bg-white shadow-xs">
              <button
                onClick={() => toggleTupoksi('kominfo')}
                className="w-full p-4 text-left font-bold text-sm text-slate-900 flex items-center justify-between hover:bg-[#F2F8F4] transition-colors"
              >
                <span className="flex items-center gap-2.5 text-[#0F4C3A]">
                  <GitFork className="w-4 h-4 text-[#158052]" />
                  <span>Bidang Komunikasi dan Informasi (Kominfo)</span>
                </span>
                {expandedTupoksi === 'kominfo' ? (
                  <ChevronUp className="w-4 h-4 text-[#0F4C3A]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>
              {expandedTupoksi === 'kominfo' && (
                <div className="px-5 pb-5 pt-2 text-xs text-slate-700 space-y-2 border-t border-emerald-100 bg-[#F2F8F4]/50">
                  <p>• Media Sosial & Konten: Mengelola akun resmi (Instagram, TikTok, YouTube) serta merancang desain grafis/visual flyer promosi kegiatan.</p>
                  <p>• Dokumentasi & Syiar: Mengabadikan momen kegiatan dalam bentuk foto/video sebagai arsip digital.</p>
                  <p>• Humas & Visual Dekorasi: Menjadi pintu utama penyampaian informasi publik serta menata dekorasi visual masjid saat acara berlangsung.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Officer Detail Modal */}
        {selectedOfficer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-emerald-800/20 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {renderAvatarPlaceholder(selectedOfficer.name, selectedOfficer.role)}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#158052] block">
                      {selectedOfficer.role}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      {selectedOfficer.name}
                    </h3>
                    <span className="text-xs text-slate-500">
                      {selectedOfficer.division || 'Pengurus JANNAVA'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedOfficer(null)}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
                >
                  ✕
                </button>
              </div>

              <div className="py-4 border-t border-slate-100 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#0F4C3A]">
                  Rincian Tanggung Jawab Operasional:
                </div>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-2">
                  {selectedOfficer.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#158052] font-bold">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedOfficer(null)}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#0F4C3A] hover:bg-[#158052] rounded-xl shadow-xs"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
