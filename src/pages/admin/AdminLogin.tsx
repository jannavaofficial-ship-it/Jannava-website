import React, { useState } from 'react';
import { JannavaLogo } from '../../components/JannavaLogo';
import { loginWithGoogleAdmin, OFFICIAL_ADMIN_EMAIL } from '../../firebase/auth';
import { ArrowLeft, Loader2, AlertCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToHome: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToHome }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setLoading(true);
    try {
      await loginWithGoogleAdmin();
      onLoginSuccess();
    } catch (err: any) {
      setErrorMessage(
        err.message ||
        `Akses ditolak. Hanya akun Google resmi ${OFFICIAL_ADMIN_EMAIL} yang berhak mengakses Dashboard Admin.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#06241B] via-[#0A3326] to-[#0F4C3A] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Islamic Arch Geometric Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="loginArchPattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M 30 0 C 18 10 12 22 12 36 L 12 60 L 48 60 L 48 36 C 48 22 42 10 30 0 Z"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#loginArchPattern)" />
        </svg>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Back Button */}
        <button
          onClick={onBackToHome}
          className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-emerald-200 hover:text-white transition-colors px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Website Publik</span>
        </button>

        {/* Center Logo */}
        <div className="flex flex-col items-center text-center">
          <div className="p-3 bg-white rounded-2xl shadow-xl border border-emerald-500/30 mb-3">
            <JannavaLogo variant="emblem" size="md" />
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-wider text-white">
            JANNAVA ADMIN
          </h2>
          <p className="text-xs text-emerald-200/80 mt-1">
            Portal Khusus Administrator Remaja Masjid Miftahul Jannah
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-6 shadow-2xl rounded-3xl sm:px-10 border border-emerald-900/15">
          {/* Authorization Notice Box */}
          <div className="mb-6 p-4 rounded-2xl bg-[#E6F4EA]/70 border border-emerald-600/20 text-slate-700">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0F4C3A] mb-1">
              <CheckCircle2 className="w-4 h-4 text-[#158052]" />
              <span>Otorisasi Resmi Terproteksi</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-600">
              Sistem ini menggunakan <strong>Google Sign-In</strong> yang terhubung langsung dengan Firebase. Hanya akun Google berikut yang diizinkan:
            </p>
            <div className="mt-2 px-2.5 py-1.5 rounded-lg bg-white border border-emerald-700/20 font-mono text-[11px] font-bold text-[#0F4C3A] text-center select-all">
              {OFFICIAL_ADMIN_EMAIL}
            </div>
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-3 animate-in fade-in">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold block">Pemberitahuan Hak Akses</span>
                <span className="leading-relaxed block">{errorMessage}</span>
              </div>
            </div>
          )}

          {/* Google Sign-In Action */}
          <div className="space-y-4">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#0F4C3A] shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.99] group"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-[#0F4C3A]" />
                  <span>Memverifikasi Akun Google...</span>
                </>
              ) : (
                <>
                  {/* Google G Logo SVG */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span className="group-hover:text-[#0F4C3A] transition-colors">
                    Masuk dengan Akun Google
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Security Footnote */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <ShieldAlert className="w-3.5 h-3.5 text-[#158052]" />
            <span>Verifikasi email ketat via Firebase Authentication</span>
          </div>
        </div>
      </div>
    </div>
  );
};
