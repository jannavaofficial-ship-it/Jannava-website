import React from 'react';
import { JannavaLogo } from './JannavaLogo';
import { organizationInfo } from '../data/jannavaData';
import { Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0A3326] text-white pt-14 pb-8 border-t border-[#0F4C3A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          {/* Kolom 1: Identitas Organisasi */}
          <div className="lg:col-span-4">
            <JannavaLogo variant="footer" />
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                {organizationInfo.taglineEnglish}
              </div>
              <p className="text-xs text-slate-300 mt-1 italic">
                "{organizationInfo.taglineIndonesian}"
              </p>
            </div>
          </div>

          {/* Kolom 2: Navigasi */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-4">
              Navigasi
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('profil', 'tentang')}
                  className="hover:text-white transition-colors"
                >
                  Tentang
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('program')}
                  className="hover:text-white transition-colors"
                >
                  Program
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('kegiatan')}
                  className="hover:text-white transition-colors"
                >
                  Kegiatan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dokumentasi')}
                  className="hover:text-white transition-colors"
                >
                  Dokumentasi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('kontak')}
                  className="hover:text-white transition-colors"
                >
                  Kontak
                </button>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Organisasi */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-4">
              Organisasi
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('organisasi', 'struktur')}
                  className="hover:text-white transition-colors text-left"
                >
                  Struktur Kepengurusan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('organisasi', 'bph')}
                  className="hover:text-white transition-colors text-left"
                >
                  Badan Pengurus Harian (BPH)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('organisasi', 'bidang')}
                  className="hover:text-white transition-colors text-left"
                >
                  Bidang Organisasi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('organisasi', 'tupoksi')}
                  className="hover:text-white transition-colors text-left"
                >
                  Tugas & Fungsi (Tupoksi)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('profil', 'makna-logo')}
                  className="hover:text-white transition-colors text-left"
                >
                  Makna Elemen Logo
                </button>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Kontak */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-4">
              Kontak
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <a
                  href={`mailto:${organizationInfo.contact.email}`}
                  className="hover:text-white transition-colors font-mono"
                >
                  {organizationInfo.contact.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <div className="font-semibold text-white">
                    {organizationInfo.mosque}
                  </div>
                  <div>Meruyung, Kec. Limo, Kota Depok</div>
                  <div className="text-slate-400 mt-0.5">
                    {organizationInfo.address.room}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>© 2026 JANNAVA | Islamic Youth Organization</p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] text-emerald-300/80">
            <span>Remaja Masjid Miftahul Jannah · Meruyung, Limo, Depok</span>
            <span>·</span>
            <button
              onClick={() => onNavigate('admin-login')}
              className="text-emerald-400/80 hover:text-white transition-colors underline decoration-emerald-500/30"
            >
              Portal Pengurus
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
