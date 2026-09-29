import React, { useState, useEffect } from 'react';
import { JannavaLogo } from '../../components/JannavaLogo';
import { logoutAdmin, OFFICIAL_ADMIN_EMAIL } from '../../firebase/auth';
import {
  getAdminStats,
  getAllActivitiesAdmin,
  createActivity,
  updateActivity,
  deleteActivity,
  getAllProgramsAdmin,
  createProgram,
  updateProgram,
  deleteProgram,
  getGalleryItems,
  createGalleryItem,
  deleteGalleryItem,
  getInquiries,
  markInquiryAsRead,
  deleteInquiry,
  getSiteSettings,
  updateSiteSettings,
  seedInitialDataIfEmpty,
  FirestoreActivity,
  FirestoreProgram,
  FirestoreInquiry,
  FirestoreSiteSettings
} from '../../firebase/firestore';
import { GalleryItem } from '../../data/jannavaData';
import {
  LayoutDashboard,
  Calendar,
  Image as ImageIcon,
  BookOpen,
  Users,
  MessageSquare,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
  X,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  FolderTree,
  Send
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
  onNavigatePublic: (view: string) => void;
}

type TabKey = 'overview' | 'organisasi' | 'program' | 'kegiatan' | 'dokumentasi' | 'kontak';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onNavigatePublic }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  // Stats state
  const [stats, setStats] = useState({
    activitiesCount: 0,
    programsCount: 0,
    documentationCount: 0,
    inquiriesCount: 0,
    isFirestoreLive: true,
    organizationMembersCount: 15
  });

  // Data states
  const [activities, setActivities] = useState<FirestoreActivity[]>([]);
  const [programsList, setProgramsList] = useState<FirestoreProgram[]>([]);
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [inquiriesList, setInquiriesList] = useState<FirestoreInquiry[]>([]);
  const [siteSettings, setSiteSettings] = useState<FirestoreSiteSettings | null>(null);

  // Loading states
  const [loadingData, setLoadingData] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modal / Form states
  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<FirestoreActivity | null>(null);
  const [activityForm, setActivityForm] = useState({
    title: '',
    category: 'Dakwah',
    date: '',
    location: 'Masjid Miftahul Jannah, Depok',
    description: '',
    content: '',
    coverImage: '/src/assets/images/hero_youth_gathering_1790655423889.jpg',
    published: true
  });

  const [programModalOpen, setProgramModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<FirestoreProgram | null>(null);
  const [programForm, setProgramForm] = useState({
    title: '',
    category: 'Pendidikan & Dakwah',
    description: '',
    icon: 'BookOpen',
    published: true
  });

  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'Dakwah & Syiar',
    date: 'Maret 2026',
    imageUrl: '/src/assets/images/activity_kajian_dakwah_1790655436982.jpg',
    caption: ''
  });

  // Load all data
  const refreshAllData = async () => {
    setLoadingData(true);
    try {
      const [s, acts, progs, gals, inqs, settings] = await Promise.all([
        getAdminStats(),
        getAllActivitiesAdmin(),
        getAllProgramsAdmin(),
        getGalleryItems(),
        getInquiries(),
        getSiteSettings()
      ]);
      setStats(s);
      setActivities(acts);
      setProgramsList(progs);
      setGalleryList(gals);
      setInquiriesList(inqs);
      setSiteSettings(settings);
    } catch (err) {
      console.error('Data load error:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    refreshAllData();
  }, []);

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      onLogout();
    } catch (err: any) {
      showFeedback('error', err.message || 'Gagal logout');
    }
  };

  // 1-Click Seeding
  const handleSeedData = async () => {
    setActionLoading(true);
    try {
      const res = await seedInitialDataIfEmpty();
      showFeedback(res.success ? 'success' : 'error', res.message);
      await refreshAllData();
    } catch (err: any) {
      showFeedback('error', err.message || 'Gagal inisialisasi data.');
    } finally {
      setActionLoading(false);
    }
  };

  // Activity Handlers
  const handleSaveActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      if (editingActivity) {
        await updateActivity(editingActivity.id, activityForm);
        showFeedback('success', `Kegiatan "${activityForm.title}" berhasil diperbarui.`);
      } else {
        await createActivity(activityForm);
        showFeedback('success', `Kegiatan "${activityForm.title}" berhasil ditambahkan.`);
      }
      setActivityModalOpen(false);
      setEditingActivity(null);
      await refreshAllData();
    } catch (err: any) {
      showFeedback('error', err.message || 'Gagal menyimpan kegiatan.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteActivity = async (id: string, title: string) => {
    if (!window.confirm(`Yakin ingin menghapus kegiatan "${title}"?`)) return;
    setActionLoading(true);
    try {
      await deleteActivity(id);
      showFeedback('success', `Kegiatan "${title}" berhasil dihapus.`);
      await refreshAllData();
    } catch (err: any) {
      showFeedback('error', err.message || 'Gagal menghapus kegiatan.');
    } finally {
      setActionLoading(false);
    }
  };

  // Program Handlers
  const handleSaveProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      if (editingProgram) {
        await updateProgram(editingProgram.id, programForm);
        showFeedback('success', `Program "${programForm.title}" berhasil diperbarui.`);
      } else {
        await createProgram(programForm);
        showFeedback('success', `Program "${programForm.title}" berhasil ditambahkan.`);
      }
      setProgramModalOpen(false);
      setEditingProgram(null);
      await refreshAllData();
    } catch (err: any) {
      showFeedback('error', err.message || 'Gagal menyimpan program.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteProgram = async (id: string, title: string) => {
    if (!window.confirm(`Yakin ingin menghapus program "${title}"?`)) return;
    setActionLoading(true);
    try {
      await deleteProgram(id);
      showFeedback('success', `Program "${title}" berhasil dihapus.`);
      await refreshAllData();
    } catch (err: any) {
      showFeedback('error', err.message || 'Gagal menghapus program.');
    } finally {
      setActionLoading(false);
    }
  };

  // Gallery Handlers
  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      await createGalleryItem(galleryForm);
      showFeedback('success', `Foto dokumentasi "${galleryForm.title}" berhasil ditambahkan.`);
      setGalleryModalOpen(false);
      setGalleryForm({
        title: '',
        category: 'Dakwah & Syiar',
        date: 'Maret 2026',
        imageUrl: '/src/assets/images/activity_kajian_dakwah_1790655436982.jpg',
        caption: ''
      });
      await refreshAllData();
    } catch (err: any) {
      showFeedback('error', err.message || 'Gagal menambahkan dokumentasi.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteGallery = async (id: string, title: string) => {
    if (!window.confirm(`Yakin ingin menghapus foto "${title}"?`)) return;
    setActionLoading(true);
    try {
      await deleteGalleryItem(id);
      showFeedback('success', `Dokumentasi foto berhasil dihapus.`);
      await refreshAllData();
    } catch (err: any) {
      showFeedback('error', err.message || 'Gagal menghapus dokumentasi.');
    } finally {
      setActionLoading(false);
    }
  };

  // Inquiry Handlers
  const handleToggleReadInquiry = async (id: string, currentRead: boolean) => {
    try {
      await markInquiryAsRead(id, !currentRead);
      await refreshAllData();
    } catch (err: any) {
      showFeedback('error', 'Gagal memperbarui status pesan.');
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm('Hapus pesan ini?')) return;
    try {
      await deleteInquiry(id);
      showFeedback('success', 'Pesan berhasil dihapus.');
      await refreshAllData();
    } catch (err: any) {
      showFeedback('error', 'Gagal menghapus pesan.');
    }
  };

  // Settings Save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteSettings) return;
    setActionLoading(true);
    try {
      await updateSiteSettings(siteSettings);
      showFeedback('success', 'Pengaturan profil dan organisasi berhasil diperbarui.');
      await refreshAllData();
    } catch (err: any) {
      showFeedback('error', err.message || 'Gagal menyimpan pengaturan.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F4] flex flex-col text-slate-800">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-30 bg-[#0A3326] text-white border-b border-emerald-950 px-4 sm:px-8 py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-xl shadow-xs">
              <JannavaLogo variant="emblem" size="sm" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-lg font-bold tracking-wider text-white">
                  JANNAVA
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-[#FDE68A] border border-[#D4AF37]/30">
                  Dashboard Admin
                </span>
              </div>
              <span className="text-xs text-emerald-200/80 block">
                {OFFICIAL_ADMIN_EMAIL}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigatePublic('home')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-200 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/15"
            >
              <span>Website Publik</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-red-200 hover:text-white bg-red-950/40 hover:bg-red-900/60 rounded-lg transition-colors border border-red-800/40"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Navigation Sidebar */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-xs space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#0F4C3A] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>1. Beranda Admin</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('organisasi')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'organisasi'
                  ? 'bg-[#0F4C3A] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4" />
                <span>2. Profil & Organisasi</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('program')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'program'
                  ? 'bg-[#0F4C3A] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4" />
                <span>3. Kelola Program</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/20">
                {programsList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('kegiatan')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'kegiatan'
                  ? 'bg-[#0F4C3A] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4" />
                <span>4. Kelola Kegiatan</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/20">
                {activities.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('dokumentasi')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'dokumentasi'
                  ? 'bg-[#0F4C3A] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ImageIcon className="w-4 h-4" />
                <span>5. Kelola Dokumentasi</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/20">
                {galleryList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('kontak')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'kontak'
                  ? 'bg-[#0F4C3A] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4" />
                <span>6. Kontak / Pesan</span>
              </div>
              {inquiriesList.length > 0 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold">
                  {inquiriesList.length}
                </span>
              )}
            </button>
          </div>

          {/* Quick Refresh Widget */}
          <div className="bg-gradient-to-br from-[#06241B] to-[#0F4C3A] text-white rounded-2xl p-5 border border-emerald-500/20 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#FDE68A] uppercase tracking-wider">
                Cloud Firestore
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <p className="text-xs text-emerald-100/90 leading-relaxed mb-4">
              Basis data terhubung ke koleksi Firestore resmi JANNAVA.
            </p>
            <button
              onClick={refreshAllData}
              disabled={loadingData}
              className="w-full py-2 px-3 text-xs font-bold text-[#06241B] bg-[#FDE68A] hover:bg-amber-300 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
              <span>Sinkronkan Data</span>
            </button>
          </div>
        </aside>

        {/* Right Main Work Area */}
        <main className="lg:col-span-9 space-y-6">
          {/* Notification Feedback Toast */}
          {feedback && (
            <div
              className={`p-4 rounded-2xl text-xs sm:text-sm flex items-start gap-3 shadow-md animate-in fade-in ${
                feedback.type === 'success'
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                  : 'bg-red-50 text-red-900 border border-red-300'
              }`}
            >
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              )}
              <span className="font-semibold">{feedback.message}</span>
            </div>
          )}

          {/* ========================================================= */}
          {/* 1. OVERVIEW DASHBOARD */}
          {/* ========================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Dashboard Utama JANNAVA
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Selamat datang, pengurus <strong>{OFFICIAL_ADMIN_EMAIL}</strong>. Kelola seluruh konten publik website melalui panel ini.
                  </p>
                </div>

                <button
                  onClick={refreshAllData}
                  disabled={loadingData}
                  className="self-start sm:self-center px-4 py-2 text-xs font-bold text-[#0F4C3A] bg-[#E6F4EA] hover:bg-emerald-100 rounded-xl transition-colors inline-flex items-center gap-2"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
                  <span>Segarkan</span>
                </button>
              </div>

              {/* 4 Key Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                  onClick={() => setActiveTab('kegiatan')}
                  className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-[#0F4C3A] cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Kegiatan
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#E6F4EA] text-[#0F4C3A] flex items-center justify-center">
                      <Calendar className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-extrabold text-[#0F4C3A]">
                    {stats.activitiesCount}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Agenda dakwah & pemuda</div>
                </div>

                <div
                  onClick={() => setActiveTab('program')}
                  className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-[#0F4C3A] cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Program
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#E6F4EA] text-[#0F4C3A] flex items-center justify-center">
                      <BookOpen className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-extrabold text-[#0F4C3A]">
                    {stats.programsCount}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Pilar program kerja</div>
                </div>

                <div
                  onClick={() => setActiveTab('dokumentasi')}
                  className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-[#0F4C3A] cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Dokumentasi
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#E6F4EA] text-[#0F4C3A] flex items-center justify-center">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-extrabold text-[#0F4C3A]">
                    {stats.documentationCount}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Arsip foto kegiatan</div>
                </div>

                <div
                  onClick={() => setActiveTab('kontak')}
                  className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-[#0F4C3A] cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Pesan Masuk
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#E6F4EA] text-[#0F4C3A] flex items-center justify-center">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-extrabold text-[#0F4C3A]">
                    {inquiriesList.length}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Aspirasi & silaturahmi</div>
                </div>
              </div>

              {/* Data Seeding & Bootstrap Tool */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0F4C3A] uppercase tracking-wider mb-2">
                  <FolderTree className="w-4 h-4 text-[#158052]" />
                  <span>Inisialisasi Data Firestore</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Sinkronisasi Awal Data Profil ke Basis Data Cloud
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 max-w-2xl">
                  Jika koleksi Firestore di project baru Anda masih kosong, Anda dapat menyalin data awal yang telah diverifikasi (Kegiatan, Program, dan Pengaturan Organisasi) dengan menekan tombol berikut.
                </p>

                <button
                  onClick={handleSeedData}
                  disabled={actionLoading}
                  className="px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-[#0F4C3A] to-[#158052] hover:brightness-105 rounded-xl shadow-xs transition-all inline-flex items-center gap-2 disabled:opacity-60"
                >
                  {actionLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sedang Memproses...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-[#FDE68A]" />
                      <span>Inisialisasi / Sinkronkan Data Awal</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 2. KELOLA PROFIL DAN ORGANISASI */}
          {/* ========================================================= */}
          {activeTab === 'organisasi' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Kelola Profil dan Organisasi
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Perbarui informasi resmi organisasi, narasi slogan, kontak surel, dan alamat sekretariat.
                </p>
              </div>

              {siteSettings && (
                <form onSubmit={handleSaveSettings} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Nama Resmi Organisasi
                      </label>
                      <input
                        type="text"
                        value={siteSettings.siteName}
                        onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]/20"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Tagline / Slogan
                      </label>
                      <input
                        type="text"
                        value={siteSettings.tagline}
                        onChange={(e) => setSiteSettings({ ...siteSettings, tagline: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]/20"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Email Resmi
                      </label>
                      <input
                        type="email"
                        value={siteSettings.email}
                        onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]/20"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Akun Instagram
                      </label>
                      <input
                        type="text"
                        value={siteSettings.instagram}
                        onChange={(e) => setSiteSettings({ ...siteSettings, instagram: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Alamat Lengkap Sekretariat
                    </label>
                    <textarea
                      rows={3}
                      value={siteSettings.address}
                      onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]/20"
                      required
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      disabled={actionLoading}
                      className="px-6 py-2.5 text-xs font-bold text-white bg-[#0F4C3A] hover:bg-[#158052] rounded-xl shadow-xs transition-colors inline-flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Simpan Perubahan Profil</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* 3. KELOLA PROGRAM */}
          {/* ========================================================= */}
          {activeTab === 'program' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Kelola Program Utama
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Tambah, perbarui, dan sesuaikan pilar-pilar program pergerakan JANNAVA.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingProgram(null);
                    setProgramForm({
                      title: '',
                      category: 'Pendidikan & Dakwah',
                      description: '',
                      icon: 'BookOpen',
                      published: true
                    });
                    setProgramModalOpen(true);
                  }}
                  className="px-4 py-2.5 text-xs font-bold text-white bg-[#0F4C3A] hover:bg-[#158052] rounded-xl shadow-xs inline-flex items-center gap-1.5 self-start"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Program</span>
                </button>
              </div>

              {/* Programs Table / Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {programsList.map((prog) => (
                  <div
                    key={prog.id}
                    className="p-5 rounded-2xl bg-[#F8FAF8] border border-slate-200/90 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#E6F4EA] text-[#0F4C3A]">
                          {prog.category}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-semibold">
                          {prog.published ? 'Publik' : 'Draf'}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mb-1">
                        {prog.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                        {prog.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/70 flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingProgram(prog);
                          setProgramForm({
                            title: prog.title,
                            category: prog.category,
                            description: prog.description,
                            icon: prog.icon || 'BookOpen',
                            published: prog.published
                          });
                          setProgramModalOpen(true);
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#0F4C3A] bg-white rounded-lg border border-slate-200 inline-flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteProgram(prog.id, prog.title)}
                        className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-red-700 bg-white rounded-lg border border-red-200 inline-flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 4. KELOLA KEGIATAN */}
          {/* ========================================================= */}
          {activeTab === 'kegiatan' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Kelola Kegiatan JANNAVA
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Tambah agenda baru, sesuaikan jadwal, ubah status publikasi, atau hapus kegiatan.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingActivity(null);
                    setActivityForm({
                      title: '',
                      category: 'Dakwah',
                      date: 'Setiap Pekan',
                      location: 'Masjid Miftahul Jannah, Depok',
                      description: '',
                      content: '',
                      coverImage: '/src/assets/images/hero_youth_gathering_1790655423889.jpg',
                      published: true
                    });
                    setActivityModalOpen(true);
                  }}
                  className="px-4 py-2.5 text-xs font-bold text-white bg-[#0F4C3A] hover:bg-[#158052] rounded-xl shadow-xs inline-flex items-center gap-1.5 self-start"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Kegiatan</span>
                </button>
              </div>

              {/* Activities List */}
              <div className="space-y-3">
                {activities.map((act) => (
                  <div
                    key={act.id}
                    className="p-4 rounded-2xl bg-[#F8FAF8] border border-slate-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={act.coverImage || '/src/assets/images/hero_youth_gathering_1790655423889.jpg'}
                        alt={act.title}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#E6F4EA] text-[#0F4C3A]">
                            {act.category}
                          </span>
                          <span className="text-[10px] text-slate-400">·</span>
                          <span className="text-[11px] text-slate-500 font-medium">
                            {act.date}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900">
                          {act.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-1">
                          {act.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => {
                          setEditingActivity(act);
                          setActivityForm({
                            title: act.title,
                            category: act.category,
                            date: act.date,
                            location: act.location || 'Masjid Miftahul Jannah, Depok',
                            description: act.description,
                            content: act.content || '',
                            coverImage: act.coverImage || '/src/assets/images/hero_youth_gathering_1790655423889.jpg',
                            published: act.published
                          });
                          setActivityModalOpen(true);
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#0F4C3A] bg-white rounded-lg border border-slate-200 inline-flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteActivity(act.id, act.title)}
                        className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-red-700 bg-white rounded-lg border border-red-200 inline-flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 5. KELOLA DOKUMENTASI (GALLERY) */}
          {/* ========================================================= */}
          {activeTab === 'dokumentasi' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Kelola Galeri Dokumentasi
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Arsip foto dokumentasi kegiatan pemuda di lingkungan Masjid Miftahul Jannah.
                  </p>
                </div>

                <button
                  onClick={() => setGalleryModalOpen(true)}
                  className="px-4 py-2.5 text-xs font-bold text-white bg-[#0F4C3A] hover:bg-[#158052] rounded-xl shadow-xs inline-flex items-center gap-1.5 self-start"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Foto</span>
                </button>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {galleryList.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl overflow-hidden border border-slate-200/90 bg-[#F8FAF8] flex flex-col justify-between group"
                  >
                    <div className="relative aspect-video bg-slate-100 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3.5 flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-slate-500">{item.date}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteGallery(item.id, item.title)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus foto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 6. KELOLA KONTAK / PESAN MASUK */}
          {/* ========================================================= */}
          {activeTab === 'kontak' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6 animate-in fade-in duration-150">
              <div className="pb-4 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-900">
                  Kelola Pesan Masuk & Silaturahmi
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Pesan, pertanyaan, dan aspirasi yang dikirim masyarakat melalui formulir kontak publik website.
                </p>
              </div>

              {inquiriesList.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <Mail className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                  <p className="text-sm font-medium">Belum ada pesan masuk baru.</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Setiap pesan yang dikirim dari form kontak akan langsung tersimpan di Cloud Firestore.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiriesList.map((inq) => (
                    <div
                      key={inq.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        inq.read
                          ? 'bg-[#F8FAF8] border-slate-200'
                          : 'bg-white border-[#0F4C3A]/40 shadow-xs ring-1 ring-[#0F4C3A]/10'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">{inq.name}</span>
                            <span className="text-[11px] font-mono text-[#0F4C3A]">
                              &lt;{inq.email}&gt;
                            </span>
                            {!inq.read && (
                              <span className="px-1.5 py-0.5 rounded-md bg-[#E6F4EA] text-[#0F4C3A] text-[9px] font-bold uppercase">
                                Baru
                              </span>
                            )}
                          </div>
                          {inq.subject && (
                            <div className="text-xs font-semibold text-slate-700 mt-0.5">
                              {inq.subject}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleReadInquiry(inq.id, inq.read)}
                            className="text-[11px] font-semibold text-slate-600 hover:text-[#0F4C3A] px-2.5 py-1 rounded-lg border border-slate-200 bg-white"
                          >
                            {inq.read ? 'Tandai Belum Dibaca' : 'Tandai Sudah Dibaca'}
                          </button>
                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-1 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50"
                            title="Hapus pesan"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-100">
                        {inq.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* ========================================================= */}
      {/* MODAL: TAMBAH / EDIT KEGIATAN */}
      {/* ========================================================= */}
      {activityModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                {editingActivity ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}
              </h3>
              <button
                onClick={() => setActivityModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveActivity} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Nama Kegiatan
                </label>
                <input
                  type="text"
                  required
                  value={activityForm.title}
                  onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })}
                  placeholder="Misal: Kajian Bulanan Pemuda"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Kategori
                  </label>
                  <select
                    value={activityForm.category}
                    onChange={(e) => setActivityForm({ ...activityForm, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none"
                  >
                    <option value="Dakwah">Dakwah</option>
                    <option value="Pendidikan">Pendidikan</option>
                    <option value="Sosial">Sosial</option>
                    <option value="Pemuda">Pemuda</option>
                    <option value="Seni & Olahraga">Seni & Olahraga</option>
                    <option value="Komunikasi & Informasi">Kominfo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Jadwal / Tanggal
                  </label>
                  <input
                    type="text"
                    required
                    value={activityForm.date}
                    onChange={(e) => setActivityForm({ ...activityForm, date: e.target.value })}
                    placeholder="Misal: Setiap Ahad Pagi"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Lokasi
                </label>
                <input
                  type="text"
                  required
                  value={activityForm.location}
                  onChange={(e) => setActivityForm({ ...activityForm, location: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Ringkasan Kegiatan
                </label>
                <textarea
                  rows={2}
                  required
                  value={activityForm.description}
                  onChange={(e) => setActivityForm({ ...activityForm, description: e.target.value })}
                  placeholder="Penjelasan singkat tujuan kegiatan..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  URL Gambar Sampul
                </label>
                <input
                  type="text"
                  value={activityForm.coverImage}
                  onChange={(e) => setActivityForm({ ...activityForm, coverImage: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none font-mono text-[11px]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="publishedCheckbox"
                  checked={activityForm.published}
                  onChange={(e) => setActivityForm({ ...activityForm, published: e.target.checked })}
                  className="rounded text-[#0F4C3A] focus:ring-0"
                />
                <label htmlFor="publishedCheckbox" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Publikasikan langsung ke website
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActivityModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#0F4C3A] hover:bg-[#158052] rounded-xl shadow-xs"
                >
                  {actionLoading ? 'Menyimpan...' : 'Simpan Kegiatan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: TAMBAH / EDIT PROGRAM */}
      {/* ========================================================= */}
      {programModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                {editingProgram ? 'Edit Program' : 'Tambah Program Baru'}
              </h3>
              <button
                onClick={() => setProgramModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProgram} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Nama Program
                </label>
                <input
                  type="text"
                  required
                  value={programForm.title}
                  onChange={(e) => setProgramForm({ ...programForm, title: e.target.value })}
                  placeholder="Misal: Pendidikan & Dakwah"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Kategori
                </label>
                <input
                  type="text"
                  required
                  value={programForm.category}
                  onChange={(e) => setProgramForm({ ...programForm, category: e.target.value })}
                  placeholder="Misal: Pilar Pokok"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Deskripsi / Ringkasan Program
                </label>
                <textarea
                  rows={3}
                  required
                  value={programForm.description}
                  onChange={(e) => setProgramForm({ ...programForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setProgramModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#0F4C3A] hover:bg-[#158052] rounded-xl shadow-xs"
                >
                  {actionLoading ? 'Menyimpan...' : 'Simpan Program'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: TAMBAH DOKUMENTASI */}
      {/* ========================================================= */}
      {galleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Tambah Foto Dokumentasi
              </h3>
              <button
                onClick={() => setGalleryModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGallery} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Judul Foto
                </label>
                <input
                  type="text"
                  required
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  placeholder="Misal: Kajian Kitab & Keislaman"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Kategori
                  </label>
                  <input
                    type="text"
                    required
                    value={galleryForm.category}
                    onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Tanggal / Waktu
                  </label>
                  <input
                    type="text"
                    required
                    value={galleryForm.date}
                    onChange={(e) => setGalleryForm({ ...galleryForm, date: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  URL Gambar
                </label>
                <input
                  type="text"
                  required
                  value={galleryForm.imageUrl}
                  onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Takarir / Caption
                </label>
                <input
                  type="text"
                  value={galleryForm.caption}
                  onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })}
                  placeholder="Keterangan singkat momen foto..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setGalleryModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#0F4C3A] hover:bg-[#158052] rounded-xl shadow-xs"
                >
                  {actionLoading ? 'Menyimpan...' : 'Simpan Foto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
