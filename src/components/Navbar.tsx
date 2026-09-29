import React, { useState, useEffect } from 'react';
import { JannavaLogo } from './JannavaLogo';
import { ChevronDown, Menu, X, ArrowRight, ShieldCheck, Users, BookOpen, Calendar, Image as ImageIcon, Mail, Home } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, sectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleDropdownClick = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleLinkClick = (view: string, sectionId?: string) => {
    onNavigate(view, sectionId);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  const toggleMobileAccordion = (name: string) => {
    setMobileExpandedSection(mobileExpandedSection === name ? null : name);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-emerald-900/10 py-2.5'
            : 'bg-white/95 backdrop-blur-xs border-b border-emerald-900/10 py-3.5'
        }`}
      >
        {/* Top Islamic Accent Line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#06241B] via-[#0F4C3A] via-60%-[#158052] to-[#D4AF37]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo Zone */}
            <button
              onClick={() => handleLinkClick('home')}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C3A] rounded-lg text-left"
              aria-label="Kembali ke Beranda JANNAVA"
            >
              <JannavaLogo variant="navbar" />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {/* Beranda */}
              <button
                onClick={() => handleLinkClick('home')}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg flex items-center gap-1.5 ${
                  currentView === 'home'
                    ? 'text-[#0F4C3A] font-semibold bg-[#E6F4EA]/60'
                    : 'text-slate-600 hover:text-[#0F4C3A] hover:bg-slate-50'
                }`}
              >
                <Home className="w-4 h-4 text-emerald-700" />
                <span>Beranda</span>
              </button>

              {/* Profil Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('profil')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => handleDropdownClick('profil')}
                  className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg flex items-center gap-1 ${
                    currentView === 'profil'
                      ? 'text-[#0F4C3A] font-semibold bg-[#E6F4EA]/60'
                      : 'text-slate-600 hover:text-[#0F4C3A] hover:bg-slate-50'
                  }`}
                  aria-expanded={activeDropdown === 'profil'}
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Profil</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'profil' ? 'rotate-180 text-[#0F4C3A]' : 'text-slate-400'
                    }`}
                  />
                </button>

                {activeDropdown === 'profil' && (
                  <div className="absolute top-full left-0 mt-1 w-56 rounded-xl bg-white shadow-xl border border-slate-100 p-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                    <button
                      onClick={() => handleLinkClick('profil', 'tentang')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#0F4C3A] hover:bg-[#E6F4EA]/50 rounded-lg transition-colors"
                    >
                      Tentang JANNAVA
                    </button>
                    <button
                      onClick={() => handleLinkClick('profil', 'makna-logo')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#0F4C3A] hover:bg-[#E6F4EA]/50 rounded-lg transition-colors"
                    >
                      Makna Elemen Logo
                    </button>
                    <button
                      onClick={() => handleLinkClick('profil', 'sejarah')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#0F4C3A] hover:bg-[#E6F4EA]/50 rounded-lg transition-colors"
                    >
                      Sejarah & Riwayat
                    </button>
                    <button
                      onClick={() => handleLinkClick('profil', 'visi-misi')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#0F4C3A] hover:bg-[#E6F4EA]/50 rounded-lg transition-colors"
                    >
                      Visi & Misi
                    </button>
                    <button
                      onClick={() => handleLinkClick('profil', 'nilai')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#0F4C3A] hover:bg-[#E6F4EA]/50 rounded-lg transition-colors"
                    >
                      Nilai JANNAVA
                    </button>
                  </div>
                )}
              </div>

              {/* Organisasi Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('organisasi')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => handleDropdownClick('organisasi')}
                  className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg flex items-center gap-1 ${
                    currentView === 'organisasi'
                      ? 'text-[#0F4C3A] font-semibold bg-[#E6F4EA]/60'
                      : 'text-slate-600 hover:text-[#0F4C3A] hover:bg-slate-50'
                  }`}
                  aria-expanded={activeDropdown === 'organisasi'}
                >
                  <Users className="w-4 h-4 text-emerald-700" />
                  <span>Organisasi</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'organisasi' ? 'rotate-180 text-[#0F4C3A]' : 'text-slate-400'
                    }`}
                  />
                </button>

                {activeDropdown === 'organisasi' && (
                  <div className="absolute top-full left-0 mt-1 w-60 rounded-xl bg-white shadow-xl border border-slate-100 p-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                    <button
                      onClick={() => handleLinkClick('organisasi', 'struktur')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#0F4C3A] hover:bg-[#E6F4EA]/50 rounded-lg transition-colors"
                    >
                      Struktur Kepengurusan
                    </button>
                    <button
                      onClick={() => handleLinkClick('organisasi', 'bph')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#0F4C3A] hover:bg-[#E6F4EA]/50 rounded-lg transition-colors"
                    >
                      Badan Pengurus Harian (BPH)
                    </button>
                    <button
                      onClick={() => handleLinkClick('organisasi', 'bidang')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#0F4C3A] hover:bg-[#E6F4EA]/50 rounded-lg transition-colors"
                    >
                      Bidang Organisasi
                    </button>
                    <button
                      onClick={() => handleLinkClick('organisasi', 'tupoksi')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#0F4C3A] hover:bg-[#E6F4EA]/50 rounded-lg transition-colors"
                    >
                      Tugas & Fungsi (Tupoksi)
                    </button>
                  </div>
                )}
              </div>

              {/* Program Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('program')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => handleDropdownClick('program')}
                  className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg flex items-center gap-1 ${
                    currentView === 'program'
                      ? 'text-[#0F4C3A] font-semibold bg-[#E6F4EA]/60'
                      : 'text-slate-600 hover:text-[#0F4C3A] hover:bg-slate-50'
                  }`}
                  aria-expanded={activeDropdown === 'program'}
                >
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  <span>Program</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'program' ? 'rotate-180 text-[#0F4C3A]' : 'text-slate-400'
                    }`}
                  />
                </button>

                {activeDropdown === 'program' && (
                  <div className="absolute top-full left-0 mt-1 w-64 rounded-xl bg-white shadow-xl border border-slate-100 p-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                    <button
                      onClick={() => handleLinkClick('program', 'pendidikan-dakwah')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#0F4C3A] hover:bg-[#E6F4EA]/50 rounded-lg transition-colors"
                    >
                      Pendidikan & Dakwah
                    </button>
                    <button
                      onClick={() => handleLinkClick('program', 'sosial-kemanusiaan')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#0F4C3A] hover:bg-[#E6F4EA]/50 rounded-lg transition-colors"
                    >
                      Sosial & Kemanusiaan
                    </button>
                    <button
                      onClick={() => handleLinkClick('program', 'seni-olahraga')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#0F4C3A] hover:bg-[#E6F4EA]/50 rounded-lg transition-colors"
                    >
                      Seni & Olahraga
                    </button>
                    <button
                      onClick={() => handleLinkClick('program', 'komunikasi-informasi')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#0F4C3A] hover:bg-[#E6F4EA]/50 rounded-lg transition-colors"
                    >
                      Komunikasi & Informasi
                    </button>
                  </div>
                )}
              </div>

              {/* Kegiatan */}
              <button
                onClick={() => handleLinkClick('kegiatan')}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg flex items-center gap-1.5 ${
                  currentView === 'kegiatan'
                    ? 'text-[#0F4C3A] font-semibold bg-[#E6F4EA]/60'
                    : 'text-slate-600 hover:text-[#0F4C3A] hover:bg-slate-50'
                }`}
              >
                <Calendar className="w-4 h-4 text-emerald-700" />
                <span>Kegiatan</span>
              </button>

              {/* Dokumentasi */}
              <button
                onClick={() => handleLinkClick('dokumentasi')}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg flex items-center gap-1.5 ${
                  currentView === 'dokumentasi'
                    ? 'text-[#0F4C3A] font-semibold bg-[#E6F4EA]/60'
                    : 'text-slate-600 hover:text-[#0F4C3A] hover:bg-slate-50'
                }`}
              >
                <ImageIcon className="w-4 h-4 text-emerald-700" />
                <span>Dokumentasi</span>
              </button>

              {/* Kontak */}
              <button
                onClick={() => handleLinkClick('kontak')}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg flex items-center gap-1.5 ${
                  currentView === 'kontak'
                    ? 'text-[#0F4C3A] font-semibold bg-[#E6F4EA]/60'
                    : 'text-slate-600 hover:text-[#0F4C3A] hover:bg-slate-50'
                }`}
              >
                <Mail className="w-4 h-4 text-emerald-700" />
                <span>Kontak</span>
              </button>
            </nav>

            {/* Desktop Action Zone */}
            <div className="hidden lg:flex items-center gap-2.5">
              <button
                onClick={() => handleLinkClick('admin-login')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0F4C3A] hover:text-[#0A3326] bg-[#E6F4EA]/80 hover:bg-[#E6F4EA] border border-emerald-600/30 rounded-lg transition-colors"
                title="Login khusus pengurus JANNAVA"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#158052]" />
                <span>Login Admin</span>
              </button>

              <button
                onClick={() => handleLinkClick('profil', 'tentang')}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0F4C3A] hover:bg-[#158052] rounded-lg shadow-xs hover:shadow transition-all whitespace-nowrap active:scale-[0.98]"
              >
                <span>Kenal JANNAVA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Menu Hamburger */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-[#0F4C3A] hover:bg-slate-100 rounded-lg transition-colors"
                aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-x-0 top-[60px] bottom-0 z-30 bg-slate-900/40 backdrop-blur-xs lg:hidden animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white h-full max-h-[85vh] overflow-y-auto px-5 py-4 border-b border-slate-200 shadow-2xl flex flex-col justify-between"
          >
            <div className="space-y-1">
              {/* Beranda */}
              <button
                onClick={() => handleLinkClick('home')}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-[#E6F4EA]/50 rounded-lg"
              >
                <Home className="w-4 h-4 text-emerald-700" />
                <span>Beranda</span>
              </button>

              {/* Accordion Profil */}
              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={() => toggleMobileAccordion('profil')}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-[#E6F4EA]/50 rounded-lg"
                >
                  <span className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Profil</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileExpandedSection === 'profil' ? 'rotate-180 text-[#0F4C3A]' : 'text-slate-400'
                    }`}
                  />
                </button>
                {mobileExpandedSection === 'profil' && (
                  <div className="pl-9 pr-2 py-1 space-y-1">
                    <button
                      onClick={() => handleLinkClick('profil', 'tentang')}
                      className="block w-full text-left py-1.5 text-xs text-slate-600 hover:text-[#0F4C3A]"
                    >
                      Tentang JANNAVA
                    </button>
                    <button
                      onClick={() => handleLinkClick('profil', 'makna-logo')}
                      className="block w-full text-left py-1.5 text-xs text-slate-600 hover:text-[#0F4C3A]"
                    >
                      Makna Elemen Logo
                    </button>
                    <button
                      onClick={() => handleLinkClick('profil', 'sejarah')}
                      className="block w-full text-left py-1.5 text-xs text-slate-600 hover:text-[#0F4C3A]"
                    >
                      Sejarah & Riwayat
                    </button>
                    <button
                      onClick={() => handleLinkClick('profil', 'visi-misi')}
                      className="block w-full text-left py-1.5 text-xs text-slate-600 hover:text-[#0F4C3A]"
                    >
                      Visi & Misi
                    </button>
                    <button
                      onClick={() => handleLinkClick('profil', 'nilai')}
                      className="block w-full text-left py-1.5 text-xs text-slate-600 hover:text-[#0F4C3A]"
                    >
                      Nilai JANNAVA
                    </button>
                  </div>
                )}
              </div>

              {/* Accordion Organisasi */}
              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={() => toggleMobileAccordion('organisasi')}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-[#E6F4EA]/50 rounded-lg"
                >
                  <span className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-emerald-700" />
                    <span>Organisasi</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileExpandedSection === 'organisasi' ? 'rotate-180 text-[#0F4C3A]' : 'text-slate-400'
                    }`}
                  />
                </button>
                {mobileExpandedSection === 'organisasi' && (
                  <div className="pl-9 pr-2 py-1 space-y-1">
                    <button
                      onClick={() => handleLinkClick('organisasi', 'struktur')}
                      className="block w-full text-left py-1.5 text-xs text-slate-600 hover:text-[#0F4C3A]"
                    >
                      Struktur Kepengurusan
                    </button>
                    <button
                      onClick={() => handleLinkClick('organisasi', 'bph')}
                      className="block w-full text-left py-1.5 text-xs text-slate-600 hover:text-[#0F4C3A]"
                    >
                      Badan Pengurus Harian (BPH)
                    </button>
                    <button
                      onClick={() => handleLinkClick('organisasi', 'bidang')}
                      className="block w-full text-left py-1.5 text-xs text-slate-600 hover:text-[#0F4C3A]"
                    >
                      Bidang Organisasi
                    </button>
                    <button
                      onClick={() => handleLinkClick('organisasi', 'tupoksi')}
                      className="block w-full text-left py-1.5 text-xs text-slate-600 hover:text-[#0F4C3A]"
                    >
                      Tugas & Fungsi (Tupoksi)
                    </button>
                  </div>
                )}
              </div>

              {/* Accordion Program */}
              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={() => toggleMobileAccordion('program')}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-[#E6F4EA]/50 rounded-lg"
                >
                  <span className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-emerald-700" />
                    <span>Program</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileExpandedSection === 'program' ? 'rotate-180 text-[#0F4C3A]' : 'text-slate-400'
                    }`}
                  />
                </button>
                {mobileExpandedSection === 'program' && (
                  <div className="pl-9 pr-2 py-1 space-y-1">
                    <button
                      onClick={() => handleLinkClick('program', 'pendidikan-dakwah')}
                      className="block w-full text-left py-1.5 text-xs text-slate-600 hover:text-[#0F4C3A]"
                    >
                      Pendidikan & Dakwah
                    </button>
                    <button
                      onClick={() => handleLinkClick('program', 'sosial-kemanusiaan')}
                      className="block w-full text-left py-1.5 text-xs text-slate-600 hover:text-[#0F4C3A]"
                    >
                      Sosial & Kemanusiaan
                    </button>
                    <button
                      onClick={() => handleLinkClick('program', 'seni-olahraga')}
                      className="block w-full text-left py-1.5 text-xs text-slate-600 hover:text-[#0F4C3A]"
                    >
                      Seni & Olahraga
                    </button>
                    <button
                      onClick={() => handleLinkClick('program', 'komunikasi-informasi')}
                      className="block w-full text-left py-1.5 text-xs text-slate-600 hover:text-[#0F4C3A]"
                    >
                      Komunikasi & Informasi
                    </button>
                  </div>
                )}
              </div>

              {/* Direct links */}
              <div className="border-t border-slate-100 pt-1 space-y-1">
                <button
                  onClick={() => handleLinkClick('kegiatan')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-[#E6F4EA]/50 rounded-lg"
                >
                  <Calendar className="w-4 h-4 text-emerald-700" />
                  <span>Kegiatan</span>
                </button>
                <button
                  onClick={() => handleLinkClick('dokumentasi')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-[#E6F4EA]/50 rounded-lg"
                >
                  <ImageIcon className="w-4 h-4 text-emerald-700" />
                  <span>Dokumentasi</span>
                </button>
                <button
                  onClick={() => handleLinkClick('kontak')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-[#E6F4EA]/50 rounded-lg"
                >
                  <Mail className="w-4 h-4 text-emerald-700" />
                  <span>Kontak</span>
                </button>
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="pt-4 pb-2 border-t border-slate-100 mt-4 space-y-2">
              <button
                onClick={() => handleLinkClick('admin-login')}
                className="w-full py-2.5 text-xs font-semibold text-[#0F4C3A] bg-[#E6F4EA] hover:bg-emerald-100 rounded-lg border border-emerald-600/30 flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#158052]" />
                <span>Login Admin Pengurus</span>
              </button>

              <button
                onClick={() => handleLinkClick('profil', 'tentang')}
                className="w-full py-2.5 text-xs font-semibold text-white bg-[#0F4C3A] hover:bg-[#158052] rounded-lg shadow-xs flex items-center justify-center gap-2"
              >
                <span>Kenal JANNAVA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
