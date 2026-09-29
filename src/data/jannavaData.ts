/**
 * Data Resmi Organisasi Pemuda Islam JANNAVA
 * Remaja Masjid Miftahul Jannah, Meruyung, Limo, Kota Depok
 */

export interface OrganizationInfo {
  name: string;
  officialName: string;
  taglineEnglish: string;
  taglineIndonesian: string;
  threePillars: {
    title: string;
    description: string;
  }[];
  focusAreas: string[];
  mosque: string;
  address: {
    room: string;
    street: string;
    rtRw: string;
    subDistrict: string;
    district: string;
    city: string;
    province: string;
    postalCode: string;
    fullFormatted: string;
  };
  contact: {
    email: string;
    instagramLabel: string;
    instagramHandle: string;
  };
  vision: string;
  missions: {
    title: string;
    description: string;
  }[];
  historyNotice: string;
}

export interface LogoElement {
  id: string;
  symbol: string;
  title: string;
  meaning: string;
}

export interface Officer {
  role: string;
  name: string;
  division?: string;
  badge?: string;
  responsibilities: string[];
}

export interface Department {
  id: string;
  name: string;
  shortName: string;
  description: string;
  officers: Officer[];
  functions: string[];
}

export interface ProgramItem {
  id: string;
  title: string;
  category: 'Pendidikan & Dakwah' | 'Sosial' | 'Seni & Olahraga' | 'Komunikasi & Informasi';
  summary: string;
  keyActivities: string[];
  iconName: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  category: 'Dakwah' | 'Pendidikan' | 'Sosial' | 'Pemuda' | 'Seni & Olahraga' | 'Komunikasi & Informasi';
  date: string;
  location: string;
  excerpt: string;
  fullDescription: string;
  image: string;
  highlights: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Dakwah' | 'Sosial' | 'Pemuda' | 'Pendidikan' | 'Seni & Olahraga';
  caption: string;
  image: string;
  date: string;
}

export const organizationInfo: OrganizationInfo = {
  name: 'JANNAVA',
  officialName: 'JANNAVA | Islamic Youth Organization',
  taglineEnglish: 'Values • Faith • Action',
  taglineIndonesian: 'Berpegang pada Nilai, Bergerak dalam Kebaikan',
  threePillars: [
    {
      title: 'Jannah',
      description: 'Surga sebagai tujuan akhir kehidupan serta ikhtiar meraih rida Allah SWT.'
    },
    {
      title: 'Values',
      description: 'Nilai-nilai keislaman, moralitas, dan integritas luhur sebagai fondasi berpikir.'
    },
    {
      title: 'Action',
      description: 'Gerakan dan kontribusi nyata yang memberi kemanfaatan berkesinambungan bagi masyarakat.'
    }
  ],
  focusAreas: ['Dakwah', 'Sosial', 'Pemuda', 'Pendidikan', 'Seni & Olahraga', 'Komunikasi & Informasi'],
  mosque: 'Masjid Miftahul Jannah',
  address: {
    room: 'Lantai 1 TPA Miftahul Jannah (ruang paling ujung)',
    street: 'Jl. H. Musa II Blk. Singkuk',
    rtRw: 'RT.004/RW.011',
    subDistrict: 'Meruyung',
    district: 'Kec. Limo',
    city: 'Kota Depok',
    province: 'Jawa Barat',
    postalCode: '16515',
    fullFormatted: 'Lantai 1 TPA Miftahul Jannah (ruang paling ujung), Masjid Miftahul Jannah, Jl. H. Musa II Blk. Singkuk, RT.004/RW.011, Meruyung, Kec. Limo, Kota Depok, Jawa Barat 16515'
  },
  contact: {
    email: 'jannavaofficial@gmail.com',
    instagramLabel: 'Instagram JANNAVA',
    instagramHandle: '@jannavamiftahuljannah'
  },
  vision: 'Menjadi generasi muda muslim yang berakar kuat pada Al-Qur\'an dan nilai-nilai Islam, unggul dalam ilmu pengetahuan, cakap berkomunikasi, berakhlak mulia, serta aktif bergerak memberikan kontribusi nyata bagi masyarakat.',
  missions: [
    {
      title: 'Penguatan Akidah & Al-Qur\'an',
      description: 'Membiasakan remaja masjid menjadikan Al-Qur\'an dan Sunnah sebagai landasan berpikir, bersikap, dan bertindak dalam keseharian.'
    },
    {
      title: 'Pengembangan Keilmuan & Public Speaking',
      description: 'Mendorong budaya literasi keislaman, pembelajaran Muhadharah (latihan pidato/khutbah), serta keahlian berbicara di depan umum secara santun dan lugas.'
    },
    {
      title: 'Mempererat Ukhuwah & Kebersamaan',
      description: 'Membangun wadah persaudaraan pemuda yang solid, inklusif, ramah, dan saling mendukung dalam kebaikan di lingkungan masjid.'
    },
    {
      title: 'Kepedulian Sosial & Kemasyarakatan',
      description: 'Menggerakkan aksi kemanusiaan, bakti sosial, dan kepedulian terhadap warga sekitar serta jamaah yang membutuhkan.'
    },
    {
      title: 'Penyaluran Kreativitas, Seni & Olahraga',
      description: 'Memfasilitasi potensi minat dan bakat pemuda dalam bidang olahraga sehat, seni Islami (marawis, hadroh), dan kreasi konten digital.'
    },
    {
      title: 'Kontribusi Pemakmuran Masjid',
      description: 'Menjadikan masjid sebagai pusat pembinaan peradaban generasi muda yang hidup, dinamis, dan dekat dengan masyarakat.'
    }
  ],
  historyNotice: 'JANNAVA tumbuh sebagai wadah pemuda Islam di lingkungan Masjid Miftahul Jannah, Meruyung, Limo, Kota Depok. Organisasi ini menjadi ruang bagi pemuda untuk berkolaborasi dalam kegiatan keagamaan, sosial, pendidikan, kreativitas, dan kepemudaan yang positif dan berkesinambungan.'
};

export const logoElements: LogoElement[] = [
  {
    id: 'arch',
    symbol: '🕌',
    title: 'Kubah Masjid (Arch)',
    meaning: 'Melambangkan perlindungan, spiritualitas, dan identitas keislaman yang kokoh sebagai rumah besar tempat berteduh dan bertumbuhnya remaja masjid.'
  },
  {
    id: 'quran',
    symbol: '📖',
    title: 'Al-Qur\'an Terbuka (Atas & Bawah)',
    meaning: 'Melambangkan sumber ilmu pengetahuan, pedoman hidup hakiki, dan wahyu Ilahi yang menopang seluruh kerangka pemikiran dan aksi organisasi.'
  },
  {
    id: 'youth',
    symbol: '👥',
    title: 'Tiga Sosok Pemuda',
    meaning: 'Memvisualisasikan kebersamaan, persaudaraan (ukhuwah Islamiyah), serta semangat dinamika generasi muda yang bersatu dalam menggerakkan kebaikan.'
  },
  {
    id: 'stars',
    symbol: '⭐',
    title: 'Tiga Bintang Emas',
    meaning: 'Melambangkan cita-cita tinggi, keunggulan, serta pencapaian prestasi yang senantiasa diterangi nilai kemuliaan dan keridaan Allah SWT.'
  },
  {
    id: 'pen',
    symbol: '✒️',
    title: 'Pulpen Bulu Ayam (Quill Pen)',
    meaning: 'Melambangkan literasi, pencatatan ilmu pengetahuan, penyebaran dakwah melalui karya tulis, serta kontribusi intelektual pemuda.'
  },
  {
    id: 'crescent',
    symbol: '🌙',
    title: 'Bulan Bintang & Slogan',
    meaning: 'Bulan bintang sebagai simbol Tauhid keesaan Allah, dibingkai teks melingkar yang menegaskan tekad: "Berpegang pada Nilai, Bergerak dalam Kebaikan".'
  }
];

export const bphMembers: Officer[] = [
  {
    role: 'Ketua Umum',
    name: 'M. Abdul Mubarok',
    division: 'Pengurus Harian Inti',
    badge: 'Pimpinan Utama',
    responsibilities: [
      'Memimpin dan memegang komando tertinggi seluruh jalannya organisasi JANNAVA.',
      'Menentukan arah kebijakan strategis organisasi sesuai dengan Visi dan Misi.',
      'Mengoordinasikan seluruh pengurus dan bidang kerja agar beroperasi secara harmonis.',
      'Menjadi perwakilan resmi JANNAVA dalam berhubungan dengan DKM Miftahul Jannah dan pihak eksternal.'
    ]
  },
  {
    role: 'Wakil Ketua',
    name: 'Irfan Muta’ali',
    division: 'Pengurus Harian Inti',
    badge: 'Operasional & Koordinasi',
    responsibilities: [
      'Mendampingi Ketua Umum dalam menjalankan kepemimpinan dan roda operasional organisasi.',
      'Menggantikan tugas dan wewenang Ketua Umum apabila berhalangan hadir.',
      'Mengawasi, mengevaluasi, dan mendampingi kinerja setiap departemen dan bidang kerja.',
      'Berfokus pada koordinasi internal dan penyelesaian kendala dalam kepengurusan.'
    ]
  },
  {
    role: 'Sekretaris',
    name: 'Putri Dewi Sadira',
    division: 'Pengurus Harian Inti',
    badge: 'Administrasi & Arsip',
    responsibilities: [
      'Mengelola seluruh administrasi, persuratan, proposal resmi, dan pengarsipan dokumen organisasi.',
      'Menyusun notulensi rapat berkala, laporan pertanggungjawaban (LPJ), dan presensi kehadiran.',
      'Mengatur agenda dan jadwal kegiatan harian maupun bulanan pengurus secara terstruktur.'
    ]
  },
  {
    role: 'Bendahara 1',
    name: 'Elfira Rosa Damayanti',
    division: 'Pengurus Harian Inti',
    badge: 'Finansial & Kas',
    responsibilities: [
      'Bertanggung jawab penuh atas tata kelola pemasukan dan pengeluaran kas organisasi.',
      'Menyusun laporan keuangan transparan, rapi, dan akuntabel secara berkala kepada pimpinan dan pembina.',
      'Mengawasi alur pencairan anggaran kegiatan setiap bidang kerja.'
    ]
  },
  {
    role: 'Bendahara 2',
    name: 'Dian Widhiastuti',
    division: 'Pengurus Harian Inti',
    badge: 'Operasional & Danus',
    responsibilities: [
      'Mengelola dana operasional kegiatan teknis di lapangan.',
      'Merancang inovasi pencarian dana mandiri organisasi (merchandise, usaha kreatif pemuda, optimalisasi infaq).',
      'Membantu Bendahara 1 dalam inventarisasi anggaran operasional kepengurusan.'
    ]
  }
];

export const departments: Department[] = [
  {
    id: 'humas',
    name: 'Bidang Hubungan Masyarakat (Humas)',
    shortName: 'Humas',
    description: 'Menjaga dan memperluas jejaring komunikasi organisasi baik internal pemuda, DKM, jamaah, maupun kemitraan masyarakat luas.',
    officers: [
      {
        role: 'Ketua Bidang',
        name: 'Naufal Maulana',
        responsibilities: ['Memimpin koordinasi komunikasi publik dan relasi eksternal organisasi.']
      },
      {
        role: 'Wakil Ketua Bidang',
        name: 'Irsyad',
        responsibilities: ['Mendampingi kepengurusan bidang dan koordinasi lapangan kemasyarakatan.']
      },
      {
        role: 'Anggota',
        name: 'Fajar',
        responsibilities: ['Mendukung pelaksanaan komunikasi dan hubungan sosial masyarakat.']
      }
    ],
    functions: [
      'Membangun komunikasi internal yang erat antarpengurus dan pemuda masjid.',
      'Menjalin hubungan baik dan silaturahmi dengan masyarakat Meruyung, DKM Miftahul Jannah, dan instansi kepemudaan.',
      'Mendukung keterbukaan informasi dan respon cepat terhadap kebutuhan komunikasi masyarakat.'
    ]
  },
  {
    id: 'dakwah',
    name: 'Bidang Pendidikan dan Dakwah',
    shortName: 'Pendidikan & Dakwah',
    description: 'Pusat pembinaan ruhani, literasi Al-Qur\'an, kajian tematik, serta pembentukan keahlian dakwah dan public speaking generasi muda.',
    officers: [
      {
        role: 'Ketua Bidang / PJ Kajian Remaja',
        name: 'Luthfi Atma Alfiansyah',
        responsibilities: ['Mengelola program kajian tematik remaja, jadwal asatidz, dan kurikulum pembinaan.']
      },
      {
        role: 'Wakil Ketua Bidang / PJ Muhadoroh',
        name: 'M. Rizki Ramadhan',
        responsibilities: ['Memimpin pelatihan rutin Muhadharah (latihan pidato/kultum) dan pembinaan public speaking.']
      },
      {
        role: 'Anggota',
        name: 'Farhan Muflikhin',
        responsibilities: ['Mendukung teknis operasional kajian keislaman dan pendataan peserta pembinaan.']
      }
    ],
    functions: [
      'Menyusun dan mengelola agenda kajian rutin remaja dan peringatan hari besar Islam (PHBI).',
      'Menyelenggarakan pembinaan dan tadarrus Al-Qur\'an bagi pemuda masjid.',
      'Melatih kepercayaan diri anggota melalui program rutin Muhadharah (pidato, kultum, dan khutbah).',
      'Menyediakan materi dakwah substantif yang siap disinergikan ke media digital.'
    ]
  },
  {
    id: 'seni-olahraga',
    name: 'Bidang Seni dan Olahraga',
    shortName: 'Seni & Olahraga',
    description: 'Wadah ekspresi sportivitas dan apresiasi kesenian Islami untuk menjaga kesehatan jasmani serta kekompakan ukhuwah pemuda.',
    officers: [
      {
        role: 'Ketua Bidang',
        name: 'Jidan Abduloh',
        responsibilities: ['Mengkoordinasikan seluruh program pengembangan minat olahraga dan seni tradisi Islami.']
      },
      {
        role: 'Wakil Ketua Bidang / PJ Futsal',
        name: 'Anas Fitrah Hermawan',
        responsibilities: ['Mengatur jadwal latihan rutin futsal dan turnamen ukhuwah pemuda.']
      },
      {
        role: 'Wakil Ketua Bidang / PJ Marawis',
        name: 'Mayang',
        responsibilities: ['Mengkoordinir pelatihan irama marawis dan regenerasi pemain musik rebana.']
      },
      {
        role: 'Penanggung Jawab Kesenian & Hadroh',
        name: 'M. Daffa Yanuarso',
        responsibilities: ['Mengelola tim hadroh selawat, kaligrafi, dan penampilan seni keislaman.']
      }
    ],
    functions: [
      'Mengagendakan kegiatan olahraga rutin (futsal, badminton, senam) untuk menjaga kebugaran fisik dan ukhuwah.',
      'Mengembangkan potensi seni Islami meliputi hadroh, marawis, nasyid, dan kaligrafi kreatif.',
      'Mengadakan agenda keakraban, rekreasi pemuda, mabit (malam bina iman & taqwa), dan gathering kesolidan tim.'
    ]
  },
  {
    id: 'kominfo',
    name: 'Bidang Komunikasi dan Informasi (Kominfo)',
    shortName: 'Kominfo',
    description: 'Garda depan publikasi syiar, visual branding, pengarsipan dokumentasi, dan penataan estetika visual acara di masjid.',
    officers: [
      {
        role: 'Ketua Bidang / PJ Dokumentasi & Desain Poster',
        name: 'Riky Saputra',
        responsibilities: ['Menentukan arah visual branding, merancang flyer kegiatan resmi, dan memimpin dokumentasi.']
      },
      {
        role: 'Wakil Ketua Bidang / PJ Video',
        name: 'Andi Bahtiar Pradana',
        responsibilities: ['Memproduksi video reels, liputan kegiatan, aftermovie, dan konten syiar kreatif.']
      }
    ],
    functions: [
      'Mengelola akun resmi media sosial organisasi (Instagram, TikTok, YouTube).',
      'Merancang materi visual, flyer promosi, dan poster edukatif yang estetik dan komunikatif.',
      'Mendokumentasikan seluruh momen kegiatan dalam arsip foto dan video resolusi tinggi.',
      'Menjadi penanggung jawab publikasi informasi serta tata visual dekorasi masjid saat acara berlangsung.'
    ]
  }
];

export const programs: ProgramItem[] = [
  {
    id: 'pendidikan-dakwah',
    title: 'Pendidikan & Dakwah',
    category: 'Pendidikan & Dakwah',
    summary: 'Kajian rutin, pembinaan Al-Qur\'an, muhadoroh santun, pendidikan keislaman komprehensif, dan penguatan wawasan akidah pemuda.',
    keyActivities: [
      'Kajian Remaja Tematik Bulanan bersama Asatidz Terpilih',
      'Kelas Latihan Muhadharah (Kultum, Pidato, dan Khutbah)',
      'Tadarrus & Tahsin Al-Qur\'an Bersanad',
      'Peringatan Hari Besar Islam (PHBI) Inovatif'
    ],
    iconName: 'BookOpen'
  },
  {
    id: 'sosial-kemanusiaan',
    title: 'Sosial & Kepedulian',
    category: 'Sosial',
    summary: 'Menyalurkan empati nyata pemuda melalui program bakti sosial, santunan yatim, kerja bakti lingkungan, dan respon cepat kemanusiaan.',
    keyActivities: [
      'Santunan dan Berbagi Berkah untuk Yatim & Dhuafa',
      'Aksi Bersih Masjid Miftahul Jannah & Lingkungan RW.011',
      'Posko Tanggap Sosial & Bantuan Sembako Warga',
      'Khidmat Jamaah Ramadhan & Dapur Berkah'
    ],
    iconName: 'HeartHandshake'
  },
  {
    id: 'seni-olahraga',
    title: 'Seni & Olahraga',
    category: 'Seni & Olahraga',
    summary: 'Penyaluran minat bakat, kebugaran jasmani melalui futsal mingguan, serta pelestarian seni selawat hadroh dan marawis kontemporer.',
    keyActivities: [
      'Latihan Rutin Futsal Ukhuwah & Friendly Match',
      'Pelatihan Hadroh & Marawis Remaja Masjid',
      'Malam Bina Iman dan Taqwa (Mabit) & Camp Ukhuwah',
      'Klinik Kaligrafi dan Karya Kreatif Pemuda'
    ],
    iconName: 'Trophy'
  },
  {
    id: 'komunikasi-informasi',
    title: 'Komunikasi & Informasi',
    category: 'Komunikasi & Informasi',
    summary: 'Pengelolaan media dakwah digital, publikasi syiar konten kreatif, dokumentasi terarsip rapi, dan estetika visual kegiatan masjid.',
    keyActivities: [
      'Produksi Flyer Dakwah & Visual Branding Profesional',
      'Pembuatan Video Dokumenter & Liputan Syiar',
      'Pengelolaan Akun Resmi Media Sosial JANNAVA',
      'Dekorasi Panggung dan Audio Visual Acara Masjid'
    ],
    iconName: 'Share2'
  }
];

export const activitiesData: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Kajian Remaja JANNAVA: Menemukan Arah & Nilai Pemuda',
    category: 'Dakwah',
    date: '18 Oktober 2026',
    location: 'Ruang Utama Masjid Miftahul Jannah',
    excerpt: 'Diskusi interaktif mengupas tantangan pemuda modern, membangun benteng integritas akidah, dan etika berkarya di tengah derasnya arus informasi.',
    fullDescription: 'Kegiatan kajian remaja berkala yang diselenggarakan oleh Bidang Pendidikan & Dakwah JANNAVA. Mengusung tema penguatan pondasi spiritual pemuda agar memiliki pegangan nilai yang kokoh dalam pergaulan, karir, dan kehidupan bermasyarakat. Dilengkapi sesi tanya-jawab interaktif dan telaah ayat pilihan.',
    image: '/src/assets/images/activity_kajian_dakwah_1790655436982.jpg',
    highlights: ['Diikuti puluhan pemuda Meruyung', 'Sesi tanya jawab terbuka', 'Materi rangkuman digital dibagikan via grup']
  },
  {
    id: 'act-2',
    title: 'Aksi Bersih Masjid & Penyaluran Paket Berkah Masyarakat',
    category: 'Sosial',
    date: '25 Oktober 2026',
    location: 'Lingkungan RW.011 Meruyung & TPA Miftahul Jannah',
    excerpt: 'Gerakan gotong royong membersihkan area ibadah dan sarana TPA, dilanjutkan dengan pendistribusian paket berkah untuk warga sekitar.',
    fullDescription: 'Sebagai bentuk implementasi pilar Action, relawan pemuda JANNAVA bergerak bersama membersihkan ruang shalat, serambi, dan ruang belajar TPA Masjid Miftahul Jannah. Dilanjutkan dengan penyerahan paket sembako berkah kepada keluarga yang membutuhkan di sekitar Meruyung.',
    image: '/src/assets/images/activity_social_action_1790655448474.jpg',
    highlights: ['Kerja bakti pemuda dan DKM', 'Penyaluran 50+ paket bahan pokok', 'Mempererat tali silaturahmi dengan warga']
  },
  {
    id: 'act-3',
    title: 'Latihan Bersama Futsal Ukhuwah & Uji Tanding Sehat',
    category: 'Seni & Olahraga',
    date: '02 November 2026',
    location: 'Lapangan Futsal Limo Depok',
    excerpt: 'Menjaga kebugaran jasmani sembari mempererat ukhuwah Islamiyah antarpemuda dalam atmosfer sportivitas yang hangat.',
    fullDescription: 'Bidang Seni & Olahraga mengoordinir kegiatan olahraga futsal mingguan untuk seluruh anggota dan pemuda sekitar. Kegiatan ini bertujuan memfasilitasi gaya hidup sehat, melepas penat aktivitas sepekan, dan membangun komunikasi non-formal yang solid antaranggota.',
    image: '/src/assets/images/activity_sports_futsal_1790655461050.jpg',
    highlights: ['Latihan rutin tiap akhir pekan', 'Rotasi tim inklusif untuk semua tingkatan usia', 'Membangun sportivitas dan kebersamaan']
  },
  {
    id: 'act-4',
    title: 'Latihan Rutin Grup Hadroh & Selawat Remaja Masjid',
    category: 'Seni & Olahraga',
    date: '10 November 2026',
    location: 'Serambi Masjid Miftahul Jannah',
    excerpt: 'Harmonisasi ketukan rebana hadroh dan marawis dalam melantunkan selawat nabi dengan penuh penghayatan dan kekompakan.',
    fullDescription: 'Pelatihan rutin kesenian hadroh dan marawis di bawah bimbingan Bidang Seni & Olahraga. Mengasah ketukan ritmik perkusi, vokal qasidah, dan kekompakan tim untuk persiapan peringatan hari besar Islam serta penampilan di lingkungan majelis ta\'lim.',
    image: '/src/assets/images/activity_hadroh_art_1790655482344.jpg',
    highlights: ['Regenerasi pemukul rebana muda', 'Pelatihan vocal harmonisasi selawat', 'Menyambut peringatan Maulid Nabi']
  },
  {
    id: 'act-5',
    title: 'Kelas Muhadharah: Melatih Public Speaking & Kultum Pemuda',
    category: 'Pendidikan',
    date: '15 November 2026',
    location: 'Lantai 1 TPA Miftahul Jannah',
    excerpt: 'Program pelatihan berbicara di depan umum, penyusunan naskah kultum ringkas, dan etika berkhutbah santun di hadapan audiens.',
    fullDescription: 'Program unggulan Bidang Dakwah untuk membekali generasi muda dengan kecakapan retorika yang terarah, artikulatif, dan berlandaskan dalil yang shahih. Peserta berlatih praktik langsung dan mendapatkan evaluasi konstruktif.',
    image: '/src/assets/images/hero_youth_gathering_1790655423889.jpg',
    highlights: ['Praktik kultum 5 menit bergantian', 'Teknik vokal dan artikulasi percaya diri', 'Penyusunan naskah berbasis ayat Al-Qur\'an']
  },
  {
    id: 'act-6',
    title: 'Workshop Desain Visual & Pengarsipan Dokumentasi Digital',
    category: 'Komunikasi & Informasi',
    date: '22 November 2026',
    location: 'Sekretariat JANNAVA',
    excerpt: 'Peningkatan literasi digital pengurus dalam mengemas syiar dakwah melalui visual poster modern, tipografi rapi, dan arsip multimedia.',
    fullDescription: 'Bidang Kominfo menyelenggarakan sesi mentoring praktis mengenai tata cara mendesain flyer kegiatan, dokumentasi foto acara yang bercerita, serta manajemen arsip digital agar publikasi organisasi selalu tampil profesional dan konsisten.',
    image: '/src/assets/images/mosque_environment_1790655500986.jpg',
    highlights: ['Panduan identitas visual JANNAVA', 'Teknik dokumentasi foto kegiatan', 'Penyimpanan arsip terstruktur']
  }
];

export const galleryItems: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Musyawarah & Kolaborasi Pemuda',
    category: 'Pemuda',
    caption: 'Diskusi hangat pengurus dan anggota JANNAVA dalam merumuskan agenda dakwah di aula masjid.',
    image: '/src/assets/images/hero_youth_gathering_1790655423889.jpg',
    date: 'Oktober 2026'
  },
  {
    id: 'gal-2',
    title: 'Kajian Rutin Remaja Masjid',
    category: 'Dakwah',
    caption: 'Suasana khidmat pemuda menyimak pemaparan materi keislaman dengan penuh antusiasme.',
    image: '/src/assets/images/activity_kajian_dakwah_1790655436982.jpg',
    date: 'Oktober 2026'
  },
  {
    id: 'gal-3',
    title: 'Bakti Sosial & Pembagian Bantuan Warga',
    category: 'Sosial',
    caption: 'Aksi nyata kepedulian pemuda JANNAVA mengantarkan paket berkah sembako untuk keluarga warga Meruyung.',
    image: '/src/assets/images/activity_social_action_1790655448474.jpg',
    date: 'Oktober 2026'
  },
  {
    id: 'gal-4',
    title: 'Semangat Olahraga Futsal Ukhuwah',
    category: 'Seni & Olahraga',
    caption: 'Momen kebersamaan dan tawa lepas pemuda masjid saat olahraga futsal bersama di akhir pekan.',
    image: '/src/assets/images/activity_sports_futsal_1790655461050.jpg',
    date: 'November 2026'
  },
  {
    id: 'gal-5',
    title: 'Lantunan Hadroh & Selawat',
    category: 'Seni & Olahraga',
    caption: 'Penampilan kompak tim hadroh dan marawis JANNAVA dalam syiar kesenian musik Islami.',
    image: '/src/assets/images/activity_hadroh_art_1790655482344.jpg',
    date: 'November 2026'
  },
  {
    id: 'gal-6',
    title: 'Rumah Pergerakan: Masjid Miftahul Jannah',
    category: 'Pendidikan',
    caption: 'Sudut asri dan damai Masjid Miftahul Jannah Meruyung tempat bertumbuhnya pemuda JANNAVA.',
    image: '/src/assets/images/mosque_environment_1790655500986.jpg',
    date: 'November 2026'
  }
];

export const historyTimeline = [
  {
    era: 'Awal Inisiasi',
    title: 'Panggilan Semangat Generasi Muda',
    summary: 'Berakar dari kerinduan pemuda di lingkungan Masjid Miftahul Jannah akan wadah pembinaan yang positif, dinamis, dan relevan dengan tantangan zaman.'
  },
  {
    era: 'Perumusan Identitas',
    title: 'Lahirnya Filosofi JANNAVA',
    summary: 'Merajut tiga pilar agung: Jannah (Surga & rida Ilahi), Values (Nilai keislaman), dan Action (Aksi kemanfaatan nyata) sebagai ruh pergerakan.'
  },
  {
    era: 'Penguatan Struktur',
    title: 'Kepengurusan Terorganisir & Legalitas DKM',
    summary: 'Pembagian peran terstruktur melalui BPH dan bidang kerja (Humas, Dakwah, Seni & Olahraga, Kominfo) dengan dukungan penuh pengurus DKM Masjid Miftahul Jannah.'
  },
  {
    era: 'Langkah Berkelanjutan',
    title: 'Berpegang pada Nilai, Bergerak dalam Kebaikan',
    summary: 'Mengembangkan sayap kegiatan dakwah kreatif, literasi, sosial kemasyarakatan, serta representasi digital resmi organisasi.'
  }
];
