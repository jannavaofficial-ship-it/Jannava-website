import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickInfo } from './components/QuickInfo';
import { AboutSection } from './components/AboutSection';
import { VisionMissionSection } from './components/VisionMissionSection';
import { ValuesSection } from './components/ValuesSection';
import { ProgramsSection } from './components/ProgramsSection';
import { OrganizationSection } from './components/OrganizationSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { DocumentationSection } from './components/DocumentationSection';
import { HistorySection } from './components/HistorySection';
import { ContactSection } from './components/ContactSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { subscribeToAuthState } from './firebase/auth';
import { User } from 'firebase/auth';

type ViewMode =
  | 'home'
  | 'profil'
  | 'organisasi'
  | 'program'
  | 'kegiatan'
  | 'dokumentasi'
  | 'kontak'
  | 'admin'
  | 'admin-login';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [initialActivityFilter, setInitialActivityFilter] = useState<string>('Semua');
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [authChecking, setAuthChecking] = useState<boolean>(true);

  // Detect URL path on initial mount (e.g. /admin or /admin/login)
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    if (path === '/admin/login') {
      setCurrentView('admin-login');
    } else if (path === '/admin' || path.startsWith('/admin/')) {
      setCurrentView('admin');
    }

    const unsubscribe = subscribeToAuthState((user, isAuthorized) => {
      setAdminUser(isAuthorized ? user : null);
      setAuthChecking(false);
    });

    return () => unsubscribe();
  }, []);

  const handleNavigate = (view: string, sectionId?: string) => {
    setCurrentView(view as ViewMode);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update browser URL history without reload
    const targetUrl = view === 'admin' ? '/admin' : view === 'admin-login' ? '/admin/login' : '/';
    if (window.location.pathname !== targetUrl) {
      window.history.pushState({}, '', targetUrl);
    }

    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleSelectCategoryFromQuickInfo = (category: string) => {
    setInitialActivityFilter(category);
    setCurrentView('kegiatan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProgramActivities = (category: string) => {
    setInitialActivityFilter(category);
    setCurrentView('kegiatan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ADMIN ROUTE 1: Login Screen
  if (currentView === 'admin-login') {
    if (adminUser) {
      // If already logged in, redirect directly to admin dashboard
      return (
        <AdminDashboard
          onLogout={() => {
            setAdminUser(null);
            handleNavigate('home');
          }}
          onNavigatePublic={(v) => handleNavigate(v)}
        />
      );
    }
    return (
      <AdminLogin
        onLoginSuccess={() => handleNavigate('admin')}
        onBackToHome={() => handleNavigate('home')}
      />
    );
  }

  // ADMIN ROUTE 2: Protected Admin Dashboard
  if (currentView === 'admin') {
    if (authChecking) {
      return (
        <div className="min-h-screen bg-[#06241B] text-white flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-emerald-200">Memeriksa kredensial pengurus...</p>
          </div>
        </div>
      );
    }

    if (!adminUser) {
      // If user tries to open /admin without being signed in, redirect to login
      return (
        <AdminLogin
          onLoginSuccess={() => handleNavigate('admin')}
          onBackToHome={() => handleNavigate('home')}
        />
      );
    }

    return (
      <AdminDashboard
        onLogout={() => {
          setAdminUser(null);
          handleNavigate('home');
        }}
        onNavigatePublic={(v) => handleNavigate(v)}
      />
    );
  }

  // PUBLIC WEBSITE (Home, Profil, Organisasi, Program, Kegiatan, Dokumentasi, Kontak)
  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9] text-[#1E293B]">
      {/* Top Navbar */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      {/* Main Page Routing */}
      <main className="flex-1">
        {/* VIEW: HOME (Comprehensive overview of JANNAVA) */}
        {currentView === 'home' && (
          <>
            <Hero
              onExploreActivities={() => handleNavigate('kegiatan')}
              onLearnMore={() => handleNavigate('profil', 'tentang')}
            />
            <QuickInfo onSelectCategory={handleSelectCategoryFromQuickInfo} />
            <AboutSection
              onLearnMore={() => handleNavigate('profil', 'visi-misi')}
              onNavigateSection={(sec) => handleNavigate('profil', sec)}
            />
            <ValuesSection />
            <ProgramsSection onSelectProgramActivities={handleSelectProgramActivities} />
            <ActivitiesSection initialFilter="Semua" />
            <DocumentationSection />
            <CTASection
              onViewActivities={() => handleNavigate('kegiatan')}
              onContact={() => handleNavigate('kontak')}
            />
          </>
        )}

        {/* VIEW: PROFIL (Tentang, Makna Logo, Sejarah, Visi Misi, Nilai) */}
        {currentView === 'profil' && (
          <div className="animate-in fade-in duration-200">
            <AboutSection
              onLearnMore={() => handleNavigate('organisasi')}
              onNavigateSection={(sec) => {
                const el = document.getElementById(sec);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <HistorySection />
            <VisionMissionSection />
            <ValuesSection />
            <CTASection
              onViewActivities={() => handleNavigate('kegiatan')}
              onContact={() => handleNavigate('kontak')}
            />
          </div>
        )}

        {/* VIEW: ORGANISASI (Struktur, BPH, Bidang, Tupoksi) */}
        {currentView === 'organisasi' && (
          <div className="animate-in fade-in duration-200">
            <OrganizationSection />
            <CTASection
              onViewActivities={() => handleNavigate('kegiatan')}
              onContact={() => handleNavigate('kontak')}
            />
          </div>
        )}

        {/* VIEW: PROGRAM (4 Pilar Program Utama & Keterkaitannya) */}
        {currentView === 'program' && (
          <div className="animate-in fade-in duration-200">
            <ProgramsSection onSelectProgramActivities={handleSelectProgramActivities} />
            <CTASection
              onViewActivities={() => handleNavigate('kegiatan')}
              onContact={() => handleNavigate('kontak')}
            />
          </div>
        )}

        {/* VIEW: KEGIATAN (Daftar Kegiatan & Filter) */}
        {currentView === 'kegiatan' && (
          <div className="animate-in fade-in duration-200">
            <ActivitiesSection initialFilter={initialActivityFilter} />
            <CTASection
              onViewActivities={() => handleNavigate('dokumentasi')}
              onContact={() => handleNavigate('kontak')}
            />
          </div>
        )}

        {/* VIEW: DOKUMENTASI (Galeri Foto & Lightbox) */}
        {currentView === 'dokumentasi' && (
          <div className="animate-in fade-in duration-200">
            <DocumentationSection />
            <CTASection
              onViewActivities={() => handleNavigate('kegiatan')}
              onContact={() => handleNavigate('kontak')}
            />
          </div>
        )}

        {/* VIEW: KONTAK (Alamat, Email, Instagram, Lokasi Peta) */}
        {currentView === 'kontak' && (
          <div className="animate-in fade-in duration-200">
            <ContactSection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Scroll to Top Action Button */}
      <ScrollToTop />
    </div>
  );
}
