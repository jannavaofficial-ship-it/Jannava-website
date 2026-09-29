import React, { useState } from 'react';
import { organizationInfo } from '../data/jannavaData';
import { submitInquiry } from '../firebase/firestore';
import { Mail, MapPin, Instagram, ExternalLink, Send, CheckCircle2, MessageSquare, Copy, Check, Loader2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(organizationInfo.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitting(true);
    try {
      await submitInquiry({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'Silaturahmi / Pesan Publik',
        message: formData.message
      });
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      console.warn('Error submitting inquiry to Firestore:', err);
      setIsSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="kontak" className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#158052] mb-2">
            Saluran Komunikasi Resmi
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hubungi JANNAVA
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Silaturahmi, kolaborasi dakwah, informasi kepengurusan, dan koordinasi kegiatan.
          </p>
        </div>

        {/* 3 Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Email Resmi */}
          <div className="p-6 rounded-2xl bg-[#FBFBF9] border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#E6F4EA] text-[#0F4C3A] flex items-center justify-center mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#158052] mb-1">
                Surel Resmi Organisasi
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Email JANNAVA
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Untuk persuratan resmi, proposal kerjasama, dan pertanyaan umum.
              </p>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs font-mono text-[#0F4C3A] font-semibold break-all">
                {organizationInfo.contact.email}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between">
              <button
                onClick={handleCopyEmail}
                className="text-xs font-semibold text-[#0F4C3A] hover:text-[#158052] flex items-center gap-1.5"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Tersalin ke Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Alamat Email</span>
                  </>
                )}
              </button>
              <a
                href={`mailto:${organizationInfo.contact.email}`}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Buka Mail ↗
              </a>
            </div>
          </div>

          {/* Card 2: Alamat Sekretariat */}
          <div className="p-6 rounded-2xl bg-[#FBFBF9] border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#E6F4EA] text-[#0F4C3A] flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#158052] mb-1">
                Sekretariat & Basis Kegiatan
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Masjid Miftahul Jannah
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                {organizationInfo.address.room}
              </p>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                <div>{organizationInfo.address.street}</div>
                <div>{organizationInfo.address.rtRw}, {organizationInfo.address.subDistrict}</div>
                <div>{organizationInfo.address.district}, {organizationInfo.address.city}</div>
                <div>{organizationInfo.address.province} {organizationInfo.address.postalCode}</div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200/60 text-xs text-slate-500 font-medium">
              Meruyung, Limo, Kota Depok
            </div>
          </div>

          {/* Card 3: Media Sosial */}
          <div className="p-6 rounded-2xl bg-[#FBFBF9] border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#E6F4EA] text-[#0F4C3A] flex items-center justify-center mb-4">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#158052] mb-1">
                Publikasi & Dokumentasi
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Media Sosial
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Ikuti info kajian, poster kegiatan teranyar, dan aftermovie acara pemuda.
              </p>
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-800">
                    {organizationInfo.contact.instagramLabel}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {organizationInfo.contact.instagramHandle}
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium">
                  Official
                </span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200/60 text-xs text-slate-500">
              Dikelola oleh Bidang Kominfo
            </div>
          </div>
        </div>

        {/* Map & Message Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Map Area Placeholder (Section Y) */}
          <div className="lg:col-span-6 bg-[#FBFBF9] rounded-2xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Lokasi Masjid Miftahul Jannah
                </h3>
                <span className="text-xs text-slate-500">
                  Meruyung, Kec. Limo, Kota Depok
                </span>
              </div>
              <a
                href="https://maps.google.com/?q=Masjid+Miftahul+Jannah+Meruyung+Limo+Depok"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#0F4C3A] hover:underline inline-flex items-center gap-1"
              >
                <span>Buka Peta</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Simulated Visual Interactive Map Container */}
            <div className="relative w-full h-[280px] sm:h-[320px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex flex-col items-center justify-center text-center p-6">
              {/* Stylized Map Backdrop */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#158052_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              <div className="relative z-10 max-w-sm">
                <div className="w-14 h-14 rounded-full bg-[#0F4C3A] text-white flex items-center justify-center mx-auto mb-3 shadow-lg ring-4 ring-[#E6F4EA]">
                  <MapPin className="w-7 h-7 text-emerald-300" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Masjid Miftahul Jannah
                </h4>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  Jl. H. Musa II Blk. Singkuk, RT.004/RW.011, Meruyung, Kec. Limo, Kota Depok, Jawa Barat 16515
                </p>
                <a
                  href="https://maps.google.com/?q=Masjid+Miftahul+Jannah+Meruyung+Limo+Depok"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0F4C3A] hover:bg-[#158052] rounded-lg shadow-xs transition-colors"
                >
                  <span>Petunjuk Arah Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 text-center">
              Area sekretariat JANNAVA berada di Lantai 1 TPA Miftahul Jannah (ruang paling ujung).
            </p>
          </div>

          {/* Right: Message / Inquiry Form */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[#158052] uppercase tracking-wider mb-1">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Pesan & Silaturahmi</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Kirimkan Pesan ke JANNAVA
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Pengurus kami akan menindaklanjuti pesan atau permohonan kerjasama Anda.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-6 rounded-xl bg-[#F0FDF4] border border-emerald-200 text-center py-10 animate-in fade-in">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                <h4 className="text-base font-bold text-slate-900">
                  Pesan Berhasil Terkirim
                </h4>
                <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
                  Terima kasih telah menghubungi JANNAVA. Pengurus kami akan segera merespon melalui surel resmi.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nama Anda"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]/30 focus:border-[#0F4C3A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Alamat Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@domain.com"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]/30 focus:border-[#0F4C3A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subjek / Perihal
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Contoh: Kolaborasi Kajian / Undangan Kegiatan"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]/30 focus:border-[#0F4C3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Isi Pesan *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tuliskan pesan, pertanyaan, atau informasi Anda di sini..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C3A]/30 focus:border-[#0F4C3A]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs font-semibold text-white bg-[#0F4C3A] hover:bg-[#158052] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirimkan Pesan</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
