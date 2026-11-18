export const MOCK_CATEGORIES = [
  { id: "tech", name: "Teknologi & Informasi", parent: null, description: "Kategori utama untuk program teknologi, pemrograman, jaringan, dan keamanan siber." },
  { id: "web-dev", name: "Web Development", parent: "tech", description: "Pengembangan website modern, frontend, backend, dan fullstack." },
  { id: "mobile-dev", name: "Mobile Development", parent: "tech", description: "Pengembangan aplikasi Android dan iOS menggunakan Flutter, React Native, dan Swift." },
  { id: "business", name: "Bisnis & Manajemen", parent: null, description: "Strategi bisnis, manajemen proyek, kewirausahaan, dan pemasaran." },
  { id: "marketing", name: "Digital Marketing", parent: "business", description: "SEO, Google Ads, Content Marketing, dan optimasi media sosial." },
  { id: "design", name: "Seni & Desain", parent: null, description: "Desain grafis, ilustrasi, animasi, dan perancangan pengalaman pengguna." },
  { id: "ui-ux", name: "UI/UX Design", parent: "design", description: "Pembuatan wireframe, prototyping, riset pengguna, dan UI design." },
  { id: "personal-dev", name: "Pengembangan Diri", parent: null, description: "Soft skills, manajemen waktu, komunikasi, dan kepemimpinan." }
];
export const MOCK_ROLES = [
  {
    id: "role-admin",
    name: "Super Admin",
    access: [
      "learning.create",
      "learning.edit",
      "learning.delete",
      "learning.detail",
      "category.create",
      "category.edit",
      "category.delete",
      "student.detail",
      "speaker.create",
      "speaker.edit",
      "speaker.delete",
      "registrant.create",
      "registrant.edit",
      "registrant.delete",
      "user.create",
      "user.edit",
      "user.delete",
      "role.create",
      "role.edit",
      "role.delete"
    ]
  },
  {
    id: "role-editor",
    name: "Editor Kurikulum",
    access: [
      "learning.create",
      "learning.edit",
      "learning.detail",
      "category.create",
      "category.edit",
      "category.delete"
    ]
  },
  {
    id: "role-speaker",
    name: "Instruktur / Speaker",
    access: [
      "learning.detail",
      "student.detail"
    ]
  }
];
export const MOCK_USERS = [
  {
    id: "user-1",
    fullName: "Mhd. Mayang Asura",
    phoneNumber: "081234567890",
    email: "mayang.asura123@gmail.com",
    role: "role-admin"
  },
  {
    id: "user-2",
    fullName: "Farhan Hakim",
    phoneNumber: "089876543210",
    email: "farhan.hakim@gmail.com",
    role: "role-editor"
  },
  {
    id: "user-3",
    fullName: "Prof. Rian Sitorus",
    phoneNumber: "082155554321",
    email: "rian.sitorus@edu.id",
    role: "role-speaker"
  }
];
export const MOCK_SPEAKERS = [
  {
    id: "speaker-1",
    fullName: "Budi Pratama, M.T.",
    phoneNumber: "081288889999",
    address: "Jl. Margonda Raya No. 45, Depok, Jawa Barat"
  },
  {
    id: "speaker-2",
    fullName: "Rina Wati, S.Ds.",
    phoneNumber: "081377776666",
    address: "Kebayoran Baru No. 12, Jakarta Selatan"
  },
  {
    id: "speaker-3",
    fullName: "Dr. Ahmad Fauzi",
    phoneNumber: "082133334444",
    address: "Dago Asri No. 18, Bandung, Jawa Barat"
  }
];
export const MOCK_STUDENTS = [
  {
    id: "student-1",
    fullName: "Eko Prasetyo",
    phoneNumber: "085299991111",
    email: "eko.pras@student.com",
    address: "Jl. Kaliurang KM 5, Sleman",
    domicile: "Yogyakarta",
    status: "active",
    classList: [
      {
        name: "React 19 & Tailwind CSS: Panduan Lengkap Pemula",
        category: "Web Development",
        level: "pemula",
        author: "Budi Pratama",
        learningProgress: 85,
        status: "in-proggress"
      },
      {
        name: "Dasar-Dasar UI/UX Design",
        category: "UI/UX Design",
        level: "pemula",
        author: "Rina Wati",
        learningProgress: 100,
        status: "complete"
      }
    ]
  },
  {
    id: "student-2",
    fullName: "Dewi Lestari",
    phoneNumber: "087722223333",
    email: "dewi.les@gmail.com",
    address: "Jl. Setiabudi No. 112",
    domicile: "Bandung",
    status: "active",
    classList: [
      {
        name: "Mastering Machine Learning dengan Python",
        category: "Data Science & AI",
        level: "menengah",
        author: "Dr. Ahmad Fauzi",
        learningProgress: 10,
        status: "initiate"
      }
    ]
  },
  {
    id: "student-3",
    fullName: "Andi Wijaya",
    phoneNumber: "081944445555",
    email: "andi.wijaya@outlook.com",
    address: "Jl. Gubeng Masjid No. 2",
    domicile: "Surabaya",
    status: "inactive",
    classList: []
  }
];
export const MOCK_REGISTRANTS = [
  {
    id: "reg-1",
    fullName: "Rahmat Hidayat",
    phoneNumber: "089611112222",
    email: "rahmat.h@gmail.com",
    address: "Jl. Sudirman No. 90",
    domicile: "Medan",
    status: "active",
    createdAt: "2026-07-09T08:00:00Z"
  },
  {
    id: "reg-2",
    fullName: "Siska Amelia",
    phoneNumber: "085355556666",
    email: "siska.amel@gmail.com",
    address: "Jl. Pettarani No. 15",
    domicile: "Makassar",
    status: "inactive",
    createdAt: "2026-07-10T10:30:00Z"
  }
];
export const SAMPLE_QUESTIONS_MC = [
  {
    id: "q-1",
    order: 1,
    question: "Manakah tag HTML5 yang tepat untuk membungkus konten navigasi utama?",
    type: "multiple choice",
    point: 10,
    options: [
      { order: 1, option: "<nav>" },
      { order: 2, option: "<navigation>" },
      { order: 3, option: "<menu>" },
      { order: 4, option: "<header>" }
    ],
    answer: "1"
    // index/order 1 (<nav>)
  },
  {
    id: "q-2",
    order: 2,
    question: "CSS selector manakah yang digunakan untuk menargetkan class tertentu?",
    type: "multiple choice",
    point: 10,
    options: [
      { order: 1, option: "#classname" },
      { order: 2, option: ".classname" },
      { order: 3, option: "classname" },
      { order: 4, option: "*classname" }
    ],
    answer: "2"
  }
];
export const SAMPLE_QUESTIONS_ESSAY = [
  {
    id: "q-3",
    order: 1,
    question: "Jelaskan perbedaan utama antara let, const, dan var dalam ES6 JavaScript!",
    type: "essay",
    point: 20,
    shortAnswer: "let memiliki scope block dan nilainya bisa diubah, const memiliki scope block dan nilainya tetap, sedangkan var memiliki scope function.",
    answer: "let dan const block-scoped sedangkan var function-scoped. const tidak bisa di-reassign."
  }
];
export const INITIAL_LEARNINGS = [
  {
    id: "learn-1",
    name: "Ujian Sertifikasi Dasar HTML5 & CSS3",
    contentType: "exam",
    level: "pemula",
    learningHour: 120,
    duration: 60,
    numQuestions: 2,
    isRandomQuestions: true,
    isRandomAnswers: false,
    maxPoints: 20,
    status: "active",
    questionType: "multiple choice",
    questions: SAMPLE_QUESTIONS_MC,
    createdAt: "2026-06-20T10:00:00Z"
  },
  {
    id: "learn-2",
    name: "Modul Esai: Pemrograman Modern JavaScript",
    contentType: "module",
    level: "menengah",
    learningHour: 180,
    duration: 0,
    numQuestions: 1,
    isRandomQuestions: false,
    isRandomAnswers: false,
    maxPoints: 20,
    status: "active",
    questionType: "essay",
    questions: SAMPLE_QUESTIONS_ESSAY,
    createdAt: "2026-07-02T15:30:00Z"
  }
];
export const INDONESIAN_CITIES = [
  "Jakarta Pusat",
  "Jakarta Selatan",
  "Jakarta Barat",
  "Jakarta Timur",
  "Jakarta Utara",
  "Bandung",
  "Surabaya",
  "Medan",
  "Semarang",
  "Makassar",
  "Palembang",
  "Tangerang",
  "Bekasi",
  "Depok",
  "Bogor",
  "Yogyakarta",
  "Malang",
  "Solo",
  "Denpasar",
  "Balikpapan",
  "Samarinda",
  "Banjarmasin",
  "Pontianak",
  "Manado",
  "Ambon",
  "Jayapura",
  "Padang",
  "Pekanbaru",
  "Banda Aceh",
  "Lampung",
  "Jambi",
  "Mataram",
  "Kupang"
];
