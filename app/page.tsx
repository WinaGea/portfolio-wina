"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaDownload,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaMoon,
  FaSun,
  FaWhatsapp,
} from "react-icons/fa";
import { FiCode, FiCpu, FiGitBranch, FiPenTool, FiBox, FiBarChart2 } from "react-icons/fi";

/* ================== TYPES ================== */
type Theme = "light" | "dark";
type Lang = "en" | "id";

type ProjectCategory = "featured" | "academic" | "supporting";
type ProjectKind = "web" | "iot" | "embedded" | "distributed" | "console" | "design" | "database";

type ProjectImage = { src: string; alt?: string };

type Project = {
  id: string;
  category: ProjectCategory;
  kind: ProjectKind;
  badge: string;
  year: string;
  title: string;
  role: string;
  summary: string;
  impact: string;
  tech: string[];
  tools?: string[];
  images?: ProjectImage[];
};

type ItemType = "experience" | "activity";

type TimelineItem = {
  id: string;
  type: ItemType;
  role: string;
  organization: string;
  period: string;
  location?: string;
  summary: string;
  contributions: string[];
  tags: string[];
};

type Certificate = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  file: string;
};

type UIText = {
  role: string;
  contact: string;
  download: string;
  dark: string;
  light: string;

  aboutTitle: string;
  aboutP1: string;
  aboutP2: string;
  focusAreas: string;
  softSkills: string;

  skillsTitle: string;
  skillsSubtitle: string;
  selectedSkill: string;

  educationTitle: string;
  educationSubtitle: string;
  diploma: string;
  highSchool: string;
  expected: string;
  gpa: string;

  expTitle: string;
  expSubtitle: string;
  expHint: string;
  all: string;
  featured: string;
  current: string;
  completed: string;
  noData: string;
  keyContrib: string;

  certTitle: string;
  certSubtitle: string;
  view: string;
  certificate: string;
  close: string;
  pdfFail: string;

  projTitle: string;
  projSubtitle: string;
  featuredProjects: string;
  academicProjects: string;
  supportingProjects: string;
  featuredDesc: string;
  academicDesc: string;
  supportingDesc: string;
  impact: string;
  tech: string;
  tools: string;

  contactTitle: string;
  contactSubtitle: string;
  name: string;
  email: string;
  message: string;
  enterName: string;
  enterEmail: string;
  enterMsg: string;
  send: string;
  opening: string;
  orDirect: string;
};

/* ================== I18N HELPERS ================== */
const pick = (lang: Lang, v: { en: string; id: string }) => (lang === "id" ? v.id : v.en);

const detectLang = (): Lang => {
  if (typeof window === "undefined") return "en";
  const saved = (localStorage.getItem("lang") as Lang | null) ?? null;
  if (saved === "en" || saved === "id") return saved;

  const nav = (navigator.language || "").toLowerCase();
  if (nav.startsWith("id")) return "id";
  return "en";
};

/* ================== TRANSLATION DICTIONARY ==================
   ✅ FIX: jangan pakai `as const` supaya typing tidak “terlalu sempit”
   dan aman dipakai sebagai UIText untuk semua komponen.
============================================================== */
const UI: Record<Lang, UIText> = {
  en: {
    // hero
    role: "COMPUTER TECHNOLOGY",
    contact: "Contact Me",
    download: "Download CV",
    dark: "Dark",
    light: "Light",

    // about
    aboutTitle: "About Me",
    aboutP1:
      "I am a final-year Diploma in Computer Technology student at the Del Institute of Technology with interests in Web Development, Front-End Engineering, UI/UX Design, and IoT.",
    aboutP2:
      "Throughout my studies, I have worked on smart walking sticks, IoT-based air quality monitoring, job information websites, and distributed applications using microservices.",
    focusAreas: "FOCUS AREAS",
    softSkills: "SOFT SKILLS",

    // skills
    skillsTitle: "Skills",
    skillsSubtitle: "Click on a skill to see a brief explanation.",
    selectedSkill: "Selected Skill",

    // education
    educationTitle: "Education",
    educationSubtitle: "My academic background and learning journey.",
    diploma: "Diploma in Computer Technology",
    highSchool: "Senior High School (Science Stream)",
    expected: "Expected",
    gpa: "GPA",

    // experience
    expTitle: "Experience & Activities",
    expSubtitle:
      "A timeline of roles and activities that reflects real contributions, teamwork, and professional responsibility.",
    expHint: "Use the filters to explore experiences based on specific skills and roles.",
    all: "All",
    featured: "Featured",
    current: "Current",
    completed: "Completed",
    noData: "No data matches this filter.",
    keyContrib: "KEY CONTRIBUTIONS",

    // certificates
    certTitle: "Certificates",
    certSubtitle: "List of certifications I have completed as part of my academic and self-development journey.",
    view: "View →",
    certificate: "Certificate",
    close: "Close",
    pdfFail: "PDF cannot be opened.",

    // projects
    projTitle: "Projects & Creations",
    projSubtitle:
      "A selection of projects completed during my studies, including final assignments, course projects, and supporting academic work.",
    featuredProjects: "Featured Projects",
    academicProjects: "Academic Projects",
    supportingProjects: "Supporting Projects",
    featuredDesc: "The main projects include First Year Project, Second Year Project, and Final Project 1.",
    academicDesc: "Large-scale academic projects are carried out in certain subjects with a formal and structured approach.",
    supportingDesc: "Exploratory projects that support the learning process and ability development.",
    impact: "Impact",
    tech: "Tech",
    tools: "Tools",

    // contact
    contactTitle: "Contact",
    contactSubtitle:
      "I’d love to hear from you. Feel free to reach out for collaboration, project opportunities, or just to say hello.",
    name: "Name",
    email: "Email",
    message: "Message",
    enterName: "Enter your name",
    enterEmail: "name@email.com",
    enterMsg: "Write your message here…",
    send: "SEND MESSAGE",
    opening: "OPENING EMAIL…",
    orDirect: "Or contact me directly via:",
  },
  id: {
    // hero
    role: "TEKNOLOGI KOMPUTER",
    contact: "Hubungi Saya",
    download: "Unduh CV",
    dark: "Gelap",
    light: "Terang",

    // about
    aboutTitle: "Tentang Saya",
    aboutP1:
      "Saya merupakan mahasiswa tingkat akhir Program Diploma Teknologi Komputer di Institut Teknologi Del dengan minat pada Pengembangan Web, Front-End, Desain UI/UX, dan IoT.",
    aboutP2:
      "Selama perkuliahan, saya mengerjakan proyek smart walking stick, monitoring kualitas udara berbasis IoT, website informasi pekerjaan, serta aplikasi terdistribusi berbasis microservices.",
    focusAreas: "BIDANG FOKUS",
    softSkills: "KEMAMPUAN NON-TEKNIS",

    // skills
    skillsTitle: "Keahlian",
    skillsSubtitle: "Klik salah satu keahlian untuk melihat penjelasan singkat.",
    selectedSkill: "Keahlian Terpilih",

    // education
    educationTitle: "Pendidikan",
    educationSubtitle: "Latar belakang akademik dan perjalanan belajar saya.",
    diploma: "Diploma Teknologi Komputer",
    highSchool: "SMA (Jurusan IPA)",
    expected: "Perkiraan",
    gpa: "IPK",

    // experience
    expTitle: "Pengalaman & Aktivitas",
    expSubtitle:
      "Timeline peran dan aktivitas yang mencerminkan kontribusi nyata, kerja tim, dan tanggung jawab profesional.",
    expHint: "Gunakan filter untuk melihat pengalaman berdasarkan keterampilan/peran tertentu.",
    all: "Semua",
    featured: "Unggulan",
    current: "Sedang Berjalan",
    completed: "Selesai",
    noData: "Belum ada data yang cocok dengan filter ini.",
    keyContrib: "KONTRIBUSI UTAMA",

    // certificates
    certTitle: "Sertifikat",
    certSubtitle: "Daftar sertifikasi yang telah saya selesaikan untuk mendukung pengembangan akademik dan keterampilan.",
    view: "Lihat →",
    certificate: "Sertifikat",
    close: "Tutup",
    pdfFail: "PDF tidak bisa dibuka.",

    // projects
    projTitle: "Proyek & Karya",
    projSubtitle:
      "Pilihan proyek yang saya kerjakan selama studi, termasuk tugas besar, proyek mata kuliah, dan karya pendukung.",
    featuredProjects: "Proyek Unggulan",
    academicProjects: "Proyek Akademik",
    supportingProjects: "Proyek Pendukung",
    featuredDesc: "Proyek utama mencakup Proyek Tahun Pertama, Proyek Tahun Kedua, dan Tugas Akhir 1.",
    academicDesc: "Proyek akademik berskala besar pada mata kuliah tertentu dengan pendekatan formal dan terstruktur.",
    supportingDesc: "Proyek eksploratif yang mendukung proses belajar dan pengembangan kemampuan.",
    impact: "Dampak",
    tech: "Teknologi",
    tools: "Tools",

    // contact
    contactTitle: "Kontak",
    contactSubtitle:
      "Saya senang jika kamu ingin menghubungi saya. Silakan untuk kolaborasi, peluang proyek, atau sekadar menyapa.",
    name: "Nama",
    email: "Email",
    message: "Pesan",
    enterName: "Masukkan nama kamu",
    enterEmail: "nama@email.com",
    enterMsg: "Tulis pesan kamu di sini…",
    send: "KIRIM PESAN",
    opening: "MEMBUKA EMAIL…",
    orDirect: "Atau hubungi saya langsung melalui:",
  },
};

/* ================== DATA (BILINGUAL) ================== */
function buildSkills(lang: Lang) {
  return [
    {
      id: "web",
      name: pick(lang, { en: "Web Development", id: "Pengembangan Web" }),
      short: "HTML, CSS, JavaScript, React, Next.js",
      icon: <FiCode />,
      detail: pick(lang, {
        en: "Developing responsive and modern websites, ranging from static web pages to React and Next.js applications, with a focus on layout structure and user experience.",
        id: "Mengembangkan website modern dan responsif, mulai dari web statis hingga aplikasi React dan Next.js, dengan fokus pada struktur layout dan pengalaman pengguna.",
      }),
      tags: [pick(lang, { en: "Responsive UI", id: "UI Responsif" }), "HTML & CSS", "React", "Next.js"],
    },
    {
      id: "iot",
      name: pick(lang, { en: "IoT Systems", id: "Sistem IoT" }),
      short: "ESP32, Sensors, MQTT, Blynk",
      icon: <FiCpu />,
      detail: pick(lang, {
        en: "Building IoT systems using ESP32 and various sensors for monitoring and automation, including real-time data transmission to dashboards.",
        id: "Membangun sistem IoT menggunakan ESP32 dan berbagai sensor untuk monitoring dan automasi, termasuk pengiriman data real-time ke dashboard.",
      }),
      tags: ["ESP32", pick(lang, { en: "Sensor Integration", id: "Integrasi Sensor" }), pick(lang, { en: "Real-time Data", id: "Data Real-time" }), pick(lang, { en: "IoT Dashboard", id: "Dashboard IoT" })],
    },
    {
      id: "embedded",
      name: pick(lang, { en: "Embedded Systems", id: "Sistem Embedded" }),
      short: "Arduino, Sensors, Actuators",
      icon: <FiGitBranch />,
      detail: pick(lang, {
        en: "Designing and implementing embedded systems using Arduino and ESP32 for academic projects such as automatic hand dryers and monitoring systems.",
        id: "Merancang dan mengimplementasikan sistem embedded menggunakan Arduino dan ESP32 untuk proyek akademik seperti pengering tangan otomatis dan sistem monitoring.",
      }),
      tags: ["Arduino", "ESP32", pick(lang, { en: "Embedded Logic", id: "Logika Embedded" }), pick(lang, { en: "Hardware Control", id: "Kontrol Hardware" })],
    },
    {
      id: "uiux",
      name: pick(lang, { en: "UI / Interface Design", id: "Desain UI / Antarmuka" }),
      short: pick(lang, { en: "Wireframe, Interface Layout, UX Flow", id: "Wireframe, Layout, Alur UX" }),
      icon: <FiPenTool />,
      detail: pick(lang, {
        en: "Designing clear and functional system interfaces, including IoT device casing interfaces and monitoring system layouts.",
        id: "Merancang antarmuka sistem yang jelas dan fungsional, termasuk desain layout monitoring dan kebutuhan perangkat IoT.",
      }),
      tags: [pick(lang, { en: "Interface Design", id: "Desain Antarmuka" }), pick(lang, { en: "User Flow", id: "Alur Pengguna" }), pick(lang, { en: "Visual Layout", id: "Tata Letak Visual" })],
    },
    {
      id: "3d",
      name: pick(lang, { en: "3D Modeling & Prototyping", id: "Pemodelan 3D & Prototyping" }),
      short: "SolidWorks, 3D Printing, PLA+",
      icon: <FiBox />,
      detail: pick(lang, {
        en: "Creating IoT device casing designs using SolidWorks and realizing them through 3D printing processes with PLA+ material.",
        id: "Membuat desain casing perangkat IoT menggunakan SolidWorks dan mewujudkannya melalui proses 3D printing dengan material PLA+.",
      }),
      tags: ["SolidWorks", pick(lang, { en: "3D Modeling", id: "Model 3D" }), pick(lang, { en: "Rapid Prototyping", id: "Prototyping Cepat" }), "PLA+"],
    },
    {
      id: "database",
      name: pick(lang, { en: "Database Design", id: "Desain Database" }),
      short: "MySQL, SQL, Normalization",
      icon: <FiBarChart2 />,
      detail: pick(lang, {
        en: "Designing and managing relational databases using MySQL, applying normalization up to Third Normal Form (3NF) and structured SQL queries.",
        id: "Merancang dan mengelola database relasional dengan MySQL, menerapkan normalisasi hingga 3NF, serta menggunakan query SQL yang terstruktur.",
      }),
      tags: ["MySQL", "SQL", pick(lang, { en: "Database Design", id: "Desain Database" }), "3NF"],
    },
  ];
}

function buildProjects(lang: Lang): Project[] {
  return [
    {
      id: "smart-walking-stick",
      category: "featured",
      kind: "iot",
      badge: pick(lang, { en: "Assistive IoT", id: "IoT Asistif" }),
      year: "2025",
      title: pick(lang, {
        en: "IoT-Based Smart Walking Stick with Position Tracking and Posture Monitoring for the Visually Impaired",
        id: "Tongkat Pintar Berbasis IoT dengan Pelacakan Posisi dan Monitoring Postur untuk Tunanetra",
      }),
      role: pick(lang, { en: "Project Lead, Visualization Developer", id: "Ketua Proyek, Pengembang Visualisasi" }),
      summary: pick(lang, {
        en: "An IoT-based smart walking stick integrating obstacle detection, posture monitoring, GPS tracking, and audio feedback to enhance safety and independent mobility for visually impaired users.",
        id: "Tongkat pintar berbasis IoT yang mengintegrasikan deteksi rintangan, monitoring postur, pelacakan GPS, dan umpan balik audio untuk meningkatkan keamanan serta kemandirian mobilitas pengguna tunanetra.",
      }),
      impact: pick(lang, {
        en: "Improves user safety and independent mobility through real-time sensing and navigation assistance.",
        id: "Meningkatkan keamanan dan kemandirian mobilitas pengguna melalui sensing real-time dan bantuan navigasi.",
      }),
      tech: ["ESP32", "Ultrasonic", "IMU", "GPS"],
      tools: ["Flutter", "Python GUI", "Unreal Engine", "MQTT"],
      images: [
        { src: "/smart%20walking/prototype2.png", alt: pick(lang, { en: "Prototype – side view", id: "Prototipe – tampak samping" }) },
        { src: "/smart%20walking/skematik.png", alt: pick(lang, { en: "Hardware schematic", id: "Skematik rangkaian hardware" }) },
        { src: "/smart%20walking/desain%20prototype.jpg", alt: pick(lang, { en: "Mechanical prototype design", id: "Desain mekanik prototipe" }) },
        { src: "/smart%20walking/node%20red.png", alt: "Workflow Node-RED" },
        { src: "/smart%20walking/flutter.png", alt: pick(lang, { en: "Flutter app UI", id: "UI aplikasi Flutter" }) },
        { src: "/smart%20walking/gps.png", alt: pick(lang, { en: "GPS module", id: "Modul GPS pada sistem" }) },
      ],
    },

    {
      id: "air-quality",
      category: "featured",
      kind: "iot",
      badge: pick(lang, { en: "IoT & Data", id: "IoT & Data" }),
      year: "2025",
      title: pick(lang, { en: "IoT-Based Air Quality Monitoring System", id: "Sistem Monitoring Kualitas Udara Berbasis IoT" }),
      role: pick(lang, { en: "IoT System Developer & Monitoring Integration", id: "Pengembang Sistem IoT & Integrasi Monitoring" }),
      summary: pick(lang, {
        en: "An IoT-based indoor air quality monitoring system using ESP32 to measure temperature, humidity, PM, CO₂, and VOC levels with real-time visualization via Blynk IoT.",
        id: "Sistem monitoring kualitas udara indoor berbasis IoT menggunakan ESP32 untuk mengukur suhu, kelembapan, PM, CO₂, dan VOC dengan visualisasi real-time melalui Blynk IoT.",
      }),
      impact: pick(lang, {
        en: "Enables real-time awareness of indoor air quality to support a healthier indoor environment.",
        id: "Mendukung kesadaran kualitas udara indoor secara real-time untuk lingkungan yang lebih sehat.",
      }),
      tech: ["ESP32", "DHT22", "SGP30", "GP2Y1010AU0F", "I2C LCD"],
      tools: ["Blynk IoT", "Wi-Fi"],
      images: [
        { src: "/air%20monitoring/Design_Prototype.png", alt: pick(lang, { en: "Prototype design", id: "Desain prototipe" }) },
        { src: "/air%20monitoring/Poster_Produk.png", alt: pick(lang, { en: "Product poster", id: "Poster produk" }) },
        { src: "/air%20monitoring/Desain_Skematik.png", alt: pick(lang, { en: "Schematic design", id: "Desain skematik" }) },
        { src: "/air%20monitoring/Desain_Arsitektur_Hardware.png", alt: pick(lang, { en: "Hardware architecture", id: "Arsitektur hardware" }) },
        { src: "/air%20monitoring/Implementasi_PCB.png", alt: pick(lang, { en: "PCB implementation", id: "Implementasi PCB" }) },
        { src: "/air%20monitoring/Grafik_Data_Suhu.png", alt: pick(lang, { en: "Temperature graph", id: "Grafik suhu" }) },
        { src: "/air%20monitoring/Grafik_Data_Kelembaban.png", alt: pick(lang, { en: "Humidity graph", id: "Grafik kelembapan" }) },
        { src: "/air%20monitoring/Grafik_Data_eCO2.png", alt: pick(lang, { en: "eCO2 graph", id: "Grafik eCO2" }) },
        { src: "/air%20monitoring/Grafik_Data_TVoc.png", alt: pick(lang, { en: "TVOC graph", id: "Grafik TVOC" }) },
      ],
    },

    {
      id: "job-website",
      category: "featured",
      kind: "web",
      badge: pick(lang, { en: "Web Platform", id: "Platform Web" }),
      year: "2024",
      title: pick(lang, { en: "Computer Technology Job Information Website", id: "Website Informasi Pekerjaan Teknologi Komputer" }),
      role: pick(lang, { en: "Web Content and UI Designer", id: "Perancang Konten dan UI Web" }),
      summary: pick(lang, {
        en: "A WordPress-based website providing structured computer technology career information and guidance to support student self-development and career awareness.",
        id: "Website berbasis WordPress yang menyediakan informasi karier teknologi komputer secara terstruktur sebagai panduan pengembangan diri dan kesiapan karier mahasiswa.",
      }),
      impact: pick(lang, {
        en: "Helps students access clear and organized career information, improving readiness and confidence before entering the workforce.",
        id: "Membantu mahasiswa mengakses informasi karier yang jelas dan terstruktur untuk meningkatkan kesiapan sebelum masuk dunia kerja.",
      }),
      tech: ["WordPress", "MySQL", "Apache"],
      tools: ["WordPress CMS", "Balsamiq", "Draw.io", "Google Chrome"],
      images: [
        { src: "/job-website/home.png", alt: pick(lang, { en: "Home page", id: "Halaman utama" }) },
        { src: "/job-website/jenis pekerjaan 2.png", alt: pick(lang, { en: "Job categories", id: "Kategori pekerjaan" }) },
        { src: "/job-website/page level1.png", alt: "Page level 1" },
        { src: "/job-website/level 2.png", alt: "Page level 2" },
        { src: "/job-website/level 3.png", alt: "Page level 3" },
        { src: "/job-website/mockup level1.png", alt: "Mockup level 1" },
        { src: "/job-website/mockup level 2.png", alt: "Mockup level 2" },
        { src: "/job-website/mockup level3.png", alt: "Mockup level 3" },
        { src: "/job-website/erdiagram.png", alt: "ER Diagram" },
        { src: "/job-website/target system1.png", alt: "Target system 1" },
        { src: "/job-website/target system2.png", alt: "Target system 2" },
        { src: "/job-website/layeradmin.png", alt: "Admin layer" },
        { src: "/job-website/layerusr.png", alt: "User layer" },
      ],
    },

    {
      id: "hand-dryer",
      category: "academic",
      kind: "embedded",
      badge: pick(lang, { en: "Embedded System", id: "Sistem Embedded" }),
      year: "2024",
      title: pick(lang, { en: "Automatic Hand Dryer System", id: "Sistem Pengering Tangan Otomatis" }),
      role: pick(lang, { en: "Embedded System Developer", id: "Pengembang Sistem Embedded" }),
      summary: pick(lang, {
        en: "An automatic hand-drying system using an ultrasonic sensor to detect hands and activate an 8V DC fan through a relay, equipped with LED and buzzer indicators.",
        id: "Sistem pengering tangan otomatis menggunakan sensor ultrasonik untuk mendeteksi tangan dan mengaktifkan kipas DC 8V melalui relay, dilengkapi LED dan buzzer sebagai indikator.",
      }),
      impact: pick(lang, {
        en: "Supports a more hygienic and comfortable hand-drying process through automatic, touchless activation.",
        id: "Mendukung proses pengeringan tangan yang lebih higienis dan nyaman melalui aktivasi otomatis tanpa sentuhan.",
      }),
      tech: ["Arduino", "Ultrasonic Sensor", "Relay", "DC Fan"],
      tools: ["Arduino IDE"],
      images: [
        { src: "/hand-drayer/implementasi_hardware.png", alt: pick(lang, { en: "Hardware implementation", id: "Implementasi hardware" }) },
        { src: "/hand-drayer/Desain_Skematik.png", alt: pick(lang, { en: "Schematic design", id: "Desain skematik" }) },
        { src: "/hand-drayer/flowchart.png", alt: "Flowchart" },
      ],
    },

    {
      id: "attendance-rpc",
      category: "academic",
      kind: "distributed",
      badge: pick(lang, { en: "Distributed System", id: "Sistem Terdistribusi" }),
      year: "2024",
      title: pick(lang, { en: "Distributed Attendance System", id: "Sistem Absensi Terdistribusi" }),
      role: pick(lang, { en: "Backend & System Architecture", id: "Backend & Arsitektur Sistem" }),
      summary: pick(lang, {
        en: "A distributed attendance system implementing RPC-based communication and Apache Kafka for event streaming to support scalable authentication, attendance recording, and notification services.",
        id: "Sistem absensi terdistribusi dengan komunikasi berbasis RPC dan Apache Kafka untuk event streaming, mendukung layanan autentikasi, pencatatan absensi, dan notifikasi yang skalabel.",
      }),
      impact: pick(lang, {
        en: "Improves system scalability and simplifies integration of authentication, attendance, reporting, and notification features.",
        id: "Meningkatkan skalabilitas sistem dan mempermudah integrasi fitur autentikasi, absensi, rekap, serta notifikasi.",
      }),
      tech: ["RPC", "Kafka", "Microservices", "MongoDB"],
      tools: ["Postman", "VS Code"],
      images: [
        { src: "/attandance-system/desain arsitektur.png", alt: pick(lang, { en: "System architecture design", id: "Desain arsitektur sistem" }) },
        { src: "/attandance-system/use case.png", alt: "Use case diagram" },
        { src: "/attandance-system/mahasiswa-service postman.png", alt: pick(lang, { en: "API testing with Postman", id: "Pengujian API dengan Postman" }) },
        { src: "/attandance-system/auth-db collection users.png", alt: pick(lang, { en: "Auth DB collection users", id: "Database Auth (collection users)" }) },
        { src: "/attandance-system/mahasiswa-db collection mahasiswa.png", alt: pick(lang, { en: "Mahasiswa DB collection", id: "Database Mahasiswa (collection)" }) },
        { src: "/attandance-system/absensi-db collection absensi.png", alt: pick(lang, { en: "Absensi DB collection", id: "Database Absensi (collection)" }) },
        { src: "/attandance-system/rekap-db collection rekab.png", alt: pick(lang, { en: "Rekap DB collection", id: "Database Rekap (collection)" }) },
        { src: "/attandance-system/absensi service.png", alt: pick(lang, { en: "Absensi service implementation", id: "Implementasi layanan Absensi" }) },
      ],
    },

    {
      id: "shop-console",
      category: "academic",
      kind: "console",
      badge: pick(lang, { en: "Programming Fundamental", id: "Dasar Pemrograman" }),
      year: "2023",
      title: pick(lang, { en: "Shop Management System", id: "Sistem Manajemen Toko" }),
      role: pick(lang, { en: "Console Application", id: "Aplikasi Console" }),
      summary: pick(lang, {
        en: "A C-based console application for basic shop management, implementing CLI interaction, file handling for data persistence, and structured menu-driven operations.",
        id: "Aplikasi console berbasis bahasa C untuk manajemen toko sederhana, menggunakan interaksi CLI, file I/O untuk penyimpanan data, serta menu yang terstruktur.",
      }),
      impact: pick(lang, {
        en: "Strengthens fundamental understanding of programming logic, data processing, and persistent data management using the C language.",
        id: "Menguatkan pemahaman dasar logika pemrograman, pengolahan data, dan manajemen data persisten menggunakan bahasa C.",
      }),
      tech: ["C Programming Language", "File Handling (File I/O)", "Array & Control Flow"],
      tools: ["GCC Compiler", "Code Editor (VS Code / Dev-C++)"],
      images: [
        { src: "/shop management/catat penjualan.png", alt: pick(lang, { en: "Sales recording feature", id: "Fitur pencatatan penjualan" }) },
        { src: "/shop management/laporan barang.png", alt: pick(lang, { en: "Items report", id: "Laporan barang" }) },
        { src: "/shop management/stok barang_transaksi.png", alt: pick(lang, { en: "Stock & transactions", id: "Stok & transaksi" }) },
        { src: "/shop management/tambahan stok.png", alt: pick(lang, { en: "Add stock feature", id: "Fitur tambah stok" }) },
      ],
    },

    {
      id: "supporting-3d-air-quality-casing",
      category: "supporting",
      kind: "design",
      badge: pick(lang, { en: "3D Product Design", id: "Desain Produk 3D" }),
      year: "2024",
      title: pick(lang, {
        en: "3D Casing Design and Fabrication for IoT-Based Air Quality Monitoring System",
        id: "Desain dan Fabrikasi Casing 3D untuk Sistem Monitoring Kualitas Udara Berbasis IoT",
      }),
      role: pick(lang, { en: "3D Product & Casing Designer", id: "Perancang Produk & Casing 3D" }),
      summary: pick(lang, {
        en: "Design and fabrication of a 3D-printed casing for an IoT-based air quality monitoring system, focusing on component layout, ventilation, usability, and physical protection.",
        id: "Perancangan dan pembuatan casing hasil 3D printing untuk sistem monitoring kualitas udara berbasis IoT, dengan fokus pada tata letak komponen, ventilasi, usability, dan perlindungan fisik.",
      }),
      impact: pick(lang, {
        en: "Strengthened skills in mechanical design and rapid prototyping by translating electronic system requirements into a functional and manufacturable 3D-printed product.",
        id: "Menguatkan keterampilan desain mekanik dan rapid prototyping dengan menerjemahkan kebutuhan elektronik menjadi produk 3D printed yang fungsional dan siap diproduksi.",
      }),
      tech: ["3D Design", "Mechanical Design", "Rapid Prototyping"],
      tools: ["SolidWorks", "3D Printer", "PLA+ Material"],
      images: [
        { src: "/3d/Untitled design (48) (1).png", alt: pick(lang, { en: "Concept sketch", id: "Sketsa konsep" }) },
        { src: "/3d/Untitled design (49) (1).png", alt: pick(lang, { en: "Concept variations", id: "Variasi konsep" }) },
        { src: "/3d/Untitled design (50) (1).png", alt: pick(lang, { en: "Exploded views", id: "Tampilan exploded" }) },
        { src: "/3d/Untitled design (51) (1).png", alt: pick(lang, { en: "Detailed 3D model", id: "Model 3D detail" }) },
        { src: "/3d/Untitled design (52) (1).png", alt: pick(lang, { en: "Technical drawing", id: "Gambar teknik" }) },
        { src: "/3d/Untitled design (53) (1).png", alt: pick(lang, { en: "Manufacturing drawing", id: "Gambar manufaktur" }) },
      ],
    },

    {
      id: "supporting-mysql-db-design",
      category: "supporting",
      kind: "database",
      badge: pick(lang, { en: "Database Introduction", id: "Pengantar Database" }),
      year: "2024",
      title: pick(lang, {
        en: "Relational Database Design and Implementation Using MySQL",
        id: "Desain dan Implementasi Database Relasional Menggunakan MySQL",
      }),
      role: pick(lang, { en: "Database Designer", id: "Perancang Database" }),
      summary: pick(lang, {
        en: "A relational database design project involving schema modeling, normalization up to Third Normal Form (3NF), and structured SQL queries to support consistent and well-organized data retrieval.",
        id: "Proyek desain database relasional meliputi pemodelan skema, normalisasi hingga 3NF, dan query SQL terstruktur untuk mendukung pengambilan data yang konsisten dan rapi.",
      }),
      impact: pick(lang, {
        en: "Strengthened understanding of clean database design and SQL querying to support scalable and structured data management.",
        id: "Menguatkan pemahaman desain database yang rapi dan query SQL untuk mendukung manajemen data yang terstruktur dan skalabel.",
      }),
      tech: ["SQL", "Relational Database", "Normalization (3NF)", "Query Optimization"],
      tools: ["MySQL", "phpMyAdmin / MySQL Workbench"],
      images: [
        { src: "/mysql/3.png", alt: pick(lang, { en: "SELECT query result", id: "Hasil query SELECT" }) },
        { src: "/mysql/4.png", alt: pick(lang, { en: "SELECT query result (variation)", id: "Hasil query SELECT (variasi)" }) },
        { src: "/mysql/5.png", alt: pick(lang, { en: "SQL execution output", id: "Output eksekusi SQL" }) },
        { src: "/mysql/6.png", alt: pick(lang, { en: "Data validation", id: "Validasi data" }) },
        { src: "/mysql/9.png", alt: pick(lang, { en: "Optimized query result", id: "Hasil query teroptimasi" }) },
        { src: "/10.png", alt: pick(lang, { en: "Database testing", id: "Pengujian database" }) },
        { src: "/11.png", alt: pick(lang, { en: "Final validation", id: "Validasi akhir" }) },
      ],
    },

    {
      id: "supporting-medan-city-website",
      category: "supporting",
      kind: "web",
      badge: pick(lang, { en: "Web Development", id: "Pengembangan Web" }),
      year: "2023",
      title: pick(lang, { en: "Website Medan City", id: "Website Kota Medan" }),
      role: pick(lang, { en: "Front-End Developer", id: "Pengembang Front-End" }),
      summary: pick(lang, {
        en: "A responsive informational website about Medan City developed using pure HTML and CSS, focusing on layout structure, content organization, and visual presentation.",
        id: "Website informasi tentang Kota Medan yang responsif menggunakan HTML dan CSS murni, dengan fokus pada struktur layout, organisasi konten, dan tampilan visual.",
      }),
      impact: pick(lang, {
        en: "Strengthened understanding of front-end fundamentals, responsive layout techniques, and clean UI structuring using HTML and CSS.",
        id: "Menguatkan pemahaman dasar front-end, teknik layout responsif, dan penyusunan UI yang rapi menggunakan HTML dan CSS.",
      }),
      tech: ["HTML", "CSS", "Responsive Web Design"],
      tools: ["VS Code", "Google Chrome"],
      images: [
        { src: "/website%20medan/websitemedan1.png", alt: pick(lang, { en: "Homepage", id: "Halaman utama" }) },
        { src: "/website%20medan/websitemedan2.png", alt: pick(lang, { en: "Content section", id: "Bagian konten" }) },
        { src: "/website%20medan/websitemedan3.png", alt: pick(lang, { en: "Information section", id: "Bagian informasi" }) },
        { src: "/website%20medan/websitemedan4.png", alt: pick(lang, { en: "Gallery section", id: "Bagian galeri" }) },
        { src: "/website%20medan/websitemedan5.png", alt: pick(lang, { en: "Footer section", id: "Bagian footer" }) },
      ],
    },
  ];
}

function buildTimeline(lang: Lang): TimelineItem[] {
  return [
    {
      id: "bem-kominfo",
      type: "activity",
      role: pick(lang, { en: "Creative Division Member", id: "Anggota Divisi Kreatif" }),
      organization: pick(lang, {
        en: "Department of Communication and Information — Student Executive Board (BEM)",
        id: "Departemen Komunikasi dan Informasi — Badan Eksekutif Mahasiswa (BEM)",
      }),
      period: pick(lang, { en: "Oct 2024 — Present", id: "Okt 2024 — Sekarang" }),
      location: pick(lang, { en: "Del Institute of Technology", id: "Institut Teknologi Del" }),
      summary: pick(lang, {
        en: "Created and supported visual content for organizational communication, publications, and event documentation within the Student Executive Board.",
        id: "Membuat dan mendukung konten visual untuk komunikasi organisasi, publikasi, serta dokumentasi kegiatan dalam BEM.",
      }),
      contributions: [
        pick(lang, { en: "Designed posters and digital assets for social media and event promotions", id: "Mendesain poster dan aset digital untuk media sosial dan promosi acara" }),
        pick(lang, { en: "Proposed creative concepts to improve content clarity and visual consistency", id: "Mengusulkan konsep kreatif untuk meningkatkan kejelasan konten dan konsistensi visual" }),
        pick(lang, { en: "Supported documentation and media publication for organizational activities", id: "Mendukung dokumentasi dan publikasi media untuk kegiatan organisasi" }),
        pick(lang, { en: "Collaborated with other divisions to ensure consistent branding and information delivery", id: "Berkolaborasi dengan divisi lain agar branding dan penyampaian informasi tetap konsisten" }),
      ],
      tags: [pick(lang, { en: "Creativity", id: "Kreativitas" }), pick(lang, { en: "Communication", id: "Komunikasi" }), pick(lang, { en: "Teamwork", id: "Kerja Tim" })],
    },

    {
      id: "himatek-member",
      type: "activity",
      role: pick(lang, { en: "Member", id: "Anggota" }),
      organization: pick(lang, {
        en: "HIMATEK — Computer Technology Student Association (Del Institute of Technology)",
        id: "HIMATEK — Himpunan Mahasiswa Teknologi Komputer (Institut Teknologi Del)",
      }),
      period: pick(lang, { en: "2023 — Present", id: "2023 — Sekarang" }),
      location: pick(lang, { en: "Del Institute of Technology", id: "Institut Teknologi Del" }),
      summary: pick(lang, {
        en: "Participated in student association programs that support academic engagement, collaboration, and community activities within Computer Technology.",
        id: "Berpartisipasi dalam program himpunan yang mendukung kegiatan akademik, kolaborasi, dan kegiatan komunitas dalam Teknologi Komputer.",
      }),
      contributions: [
        pick(lang, { en: "Joined routine meetings and supported student programs and activities", id: "Mengikuti rapat rutin dan mendukung program serta kegiatan himpunan" }),
        pick(lang, { en: "Contributed to teamwork during academic and social events", id: "Berkontribusi dalam kerja tim saat acara akademik maupun sosial" }),
        pick(lang, { en: "Helped maintain coordination and participation within the association", id: "Membantu menjaga koordinasi dan partisipasi dalam himpunan" }),
      ],
      tags: [pick(lang, { en: "Teamwork", id: "Kerja Tim" }), pick(lang, { en: "Organization", id: "Organisasi" })],
    },

    {
      id: "himatek-kpu",
      type: "activity",
      role: pick(lang, { en: "Documentation Division Member", id: "Anggota Divisi Dokumentasi" }),
      organization: pick(lang, {
        en: "Election Committee (KPU) — HIMATEK",
        id: "Panitia Pemilihan (KPU) — HIMATEK",
      }),
      period: pick(lang, { en: "Sep 2025", id: "Sep 2025" }),
      location: pick(lang, { en: "Del Institute of Technology", id: "Institut Teknologi Del" }),
      summary: pick(lang, {
        en: "Handled event documentation and record organization to support the smooth execution of HIMATEK student elections.",
        id: "Menangani dokumentasi acara dan pengarsipan berkas untuk mendukung kelancaran pelaksanaan pemilihan HIMATEK.",
      }),
      contributions: [
        pick(lang, { en: "Captured election activities through photos and structured documentation notes", id: "Mendokumentasikan kegiatan pemilihan melalui foto dan catatan terstruktur" }),
        pick(lang, { en: "Organized documentation files to keep records complete and easy to access", id: "Mengelola file dokumentasi agar arsip lengkap dan mudah diakses" }),
        pick(lang, { en: "Coordinated with committee members to ensure documentation was timely and accurate", id: "Berkoordinasi dengan panitia agar dokumentasi tepat waktu dan akurat" }),
      ],
      tags: [pick(lang, { en: "Documentation", id: "Dokumentasi" }), pick(lang, { en: "Teamwork", id: "Kerja Tim" }), pick(lang, { en: "Organization", id: "Organisasi" })],
    },

    {
      id: "short-film-kominfo",
      type: "activity",
      role: pick(lang, { en: "Short Film Program Secretary", id: "Sekretaris Program Short Film" }),
      organization: pick(lang, {
        en: "Short Film Program — Department of Communication and Information",
        id: "Program Short Film — Departemen Komunikasi dan Informasi",
      }),
      period: pick(lang, { en: "Nov 2025", id: "Nov 2025" }),
      location: pick(lang, { en: "Del Institute of Technology", id: "Institut Teknologi Del" }),
      summary: pick(lang, {
        en: "Managed administration, coordination, and budgeting records to support the execution of a short film program.",
        id: "Mengelola administrasi, koordinasi, dan pencatatan anggaran untuk mendukung pelaksanaan program short film.",
      }),
      contributions: [
        pick(lang, { en: "Prepared administrative documents, meeting notes, and official correspondence", id: "Menyusun dokumen administrasi, notulen rapat, dan surat-menyurat resmi" }),
        pick(lang, { en: "Managed budgeting records, expense tracking, and basic financial reporting", id: "Mengelola catatan anggaran, pencatatan pengeluaran, dan laporan keuangan sederhana" }),
        pick(lang, { en: "Coordinated communication and follow-ups across committee members to keep tasks on track", id: "Mengkoordinasikan komunikasi dan tindak lanjut antar panitia agar pekerjaan sesuai rencana" }),
      ],
      tags: [pick(lang, { en: "Leadership", id: "Kepemimpinan" }), pick(lang, { en: "Organization", id: "Organisasi" }), pick(lang, { en: "Communication", id: "Komunikasi" })],
    },
  ];
}

function buildCertificates(lang: Lang): Certificate[] {
  const tr = (en: string, id: string) => pick(lang, { en, id });

  return [
    { id: "myskill-api", title: tr("API Introduction", "Pengenalan API"), issuer: "MySkill", year: "2025", file: "/sertifikat/2.pdf" },
    { id: "myskill-backend", title: tr("Back-End Development Introduction", "Pengenalan Back-End Development"), issuer: "MySkill", year: "2025", file: "/sertifikat/3.pdf" },
    { id: "cisco-ethical", title: "Ethical Hacker Update 2025", issuer: "Cisco Networking Academy", year: "2025", file: "/sertifikat/4.pdf" },
    { id: "myskill-frontend", title: tr("Front-End Development Introduction", "Pengenalan Front-End Development"), issuer: "MySkill", year: "2025", file: "/sertifikat/5.pdf" },
    { id: "huawei-cloud", title: "Huawei HCIA — Cloud Computing V5.5 Course", issuer: "Huawei", year: "2025", file: "/sertifikat/6.pdf" },
    { id: "huawei-security", title: "Huawei HCIA — Security V4.0 Course", issuer: "Huawei", year: "2025", file: "/sertifikat/7.pdf" },
    { id: "myskill-internet", title: tr("Internet Introduction", "Pengenalan Internet"), issuer: "MySkill", year: "2025", file: "/sertifikat/9.pdf" },
    { id: "simplilearn-devops", title: tr("Introduction to DevOps Tools", "Pengenalan Tools DevOps"), issuer: "Simplilearn", year: "2025", file: "/sertifikat/10.pdf" },
    { id: "cisco-iot", title: tr("Introduction to IoT", "Pengenalan IoT"), issuer: "Cisco Networking Academy", year: "2025", file: "/sertifikat/11.pdf" },
  ];
}

/* ================= HELPERS ================= */
function certIssuerInitial(issuer: string) {
  return issuer.trim()[0]?.toUpperCase() ?? "C";
}
function certIssuerKey(issuer: string) {
  const s = issuer.toLowerCase();
  if (s.includes("huawei")) return "huawei";
  if (s.includes("cisco")) return "cisco";
  if (s.includes("myskill")) return "myskill";
  if (s.includes("simplilearn")) return "simplilearn";
  return "default";
}

/* =======================================================
   PDF VIEWER (SAFE) — NO top-level import react-pdf
   ======================================================= */
const PdfDocument = dynamic(() => import("react-pdf").then((m) => m.Document), { ssr: false });
const PdfPage = dynamic(() => import("react-pdf").then((m) => m.Page), { ssr: false });

type PdfViewerModalProps = {
  open: boolean;
  title?: string;
  file?: string;
  onClose: () => void;
  ui: UIText; // ✅ FIX
};

function PdfViewerModal({ open, title, file, onClose, ui }: PdfViewerModalProps) {
  const [ready, setReady] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [loadErr, setLoadErr] = useState<string | null>(null);

  const frameRef = useRef<HTMLDivElement | null>(null);
  const [frameWidth, setFrameWidth] = useState(900);
  const [frameHeight, setFrameHeight] = useState(600);
  const [pageSize, setPageSize] = useState<{ w: number; h: number } | null>(null);

  const safeFile = useMemo(() => {
    if (!file) return "";
    const fixed = /^https?:\/\//i.test(file) ? file : file.startsWith("/") ? file : `/${file}`;
    return encodeURI(fixed);
  }, [file]);

  useEffect(() => {
    if (!open) return;
    if (typeof window === "undefined") return;

    let alive = true;

    (async () => {
      try {
        const mod = await import("react-pdf");
        const { pdfjs } = mod;

        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url
        ).toString();

        if (alive) setReady(true);
      } catch (e: any) {
        if (alive) {
          setLoadErr(e?.message || "Failed to initialize PDF viewer.");
          setReady(false);
        }
      }
    })();

    return () => {
      alive = false;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setNumPages(0);
    setPage(1);
    setZoom(1);
    setLoadErr(null);
    setPageSize(null);
  }, [open, safeFile]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const el = frameRef.current;
    if (!el) return;

    const update = () => {
      setFrameWidth(Math.max(320, el.clientWidth || 900));
      setFrameHeight(Math.max(320, el.clientHeight || 600));
    };

    const ro = new ResizeObserver(update);
    ro.observe(el);
    update();

    return () => ro.disconnect();
  }, [open]);

  const fitScale = useMemo(() => {
    if (!pageSize) return 1;
    const pad = 24;
    const availW = Math.max(320, frameWidth - pad);
    const availH = Math.max(320, frameHeight - pad);
    return Math.min(availW / pageSize.w, availH / pageSize.h);
  }, [pageSize, frameWidth, frameHeight]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setPage((p) => Math.min(numPages || 1, p + 1));
      if (e.key === "ArrowLeft") setPage((p) => Math.max(1, p - 1));
      if (e.key === "+") setZoom((z) => Math.min(2.2, +(z + 0.1).toFixed(2)));
      if (e.key === "-") setZoom((z) => Math.max(0.6, +(z - 0.1).toFixed(2)));
      if (e.key === "0") setZoom(1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, numPages, onClose]);

  if (!open || !safeFile) return null;

  const prev = () => setPage((p) => Math.max(1, p - 1));
  const next = () => setPage((p) => Math.min(numPages || 1, p + 1));
  const zoomIn = () => setZoom((z) => Math.min(2.2, +(z + 0.1).toFixed(2)));
  const zoomOut = () => setZoom((z) => Math.max(0.6, +(z - 0.1).toFixed(2)));
  const zoomReset = () => setZoom(1);

  return (
    <div className="pdfm-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="pdfm-shell" onClick={(e) => e.stopPropagation()}>
        <div className="pdfm-topbar">
          <button className="pdfm-iconbtn" type="button" aria-label="Menu" title="Menu">
            ☰
          </button>

          <div className="pdfm-title" title={title || ui.certificate}>
            {title || ui.certificate}
          </div>

          <div className="pdfm-spacer" />

          <div className="pdfm-controls">
            <span className="pdfm-page">
              {page} / {numPages || 1}
            </span>

            <button className="pdfm-iconbtn" type="button" onClick={prev} title="Previous" disabled={page <= 1}>
              ‹
            </button>

            <button className="pdfm-iconbtn" type="button" onClick={zoomOut} title="Zoom out">
              –
            </button>

            <span className="pdfm-zoom">{Math.round(zoom * 100)}%</span>

            <button className="pdfm-iconbtn" type="button" onClick={zoomIn} title="Zoom in">
              +
            </button>

            <button className="pdfm-iconbtn" type="button" onClick={zoomReset} title="Reset zoom (0)">
              ↺
            </button>

            <button className="pdfm-iconbtn" type="button" onClick={next} title="Next" disabled={page >= (numPages || 1)}>
              ›
            </button>

            <a className="pdfm-iconbtn" href={safeFile} download title="Download">
              ⤓
            </a>

            <button className="pdfm-close" type="button" onClick={onClose}>
              {ui.close}
            </button>
          </div>
        </div>

        <div className="pdfm-bodyOne">
          <div className="pdfm-frameWrap" ref={frameRef}>
            {!ready ? (
              <div className="pdfm-loading">Loading…</div>
            ) : loadErr ? (
              <div className="pdfm-error">
                <strong>{ui.pdfFail}</strong>
                <div>{loadErr}</div>
              </div>
            ) : (
              <PdfDocument
                key={safeFile}
                file={safeFile}
                onLoadSuccess={({ numPages }: any) => {
                  setNumPages(numPages);
                  setPage((p) => Math.min(Math.max(1, p), numPages));
                }}
                onLoadError={(err: any) => setLoadErr(err?.message || "Unknown error")}
                loading={<div className="pdfm-loading">Loading…</div>}
              >
                <PdfPage
                  pageNumber={page}
                  scale={fitScale * zoom}
                  onLoadSuccess={(p: any) => setPageSize({ w: p.originalWidth, h: p.originalHeight })}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  loading={<div className="pdfm-loading">Rendering…</div>}
                />
              </PdfDocument>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================== SKILLS ================== */
function SkillsSection({ lang, ui }: { lang: Lang; ui: UIText }) {
  const skills = useMemo(() => buildSkills(lang), [lang]);
  const [activeSkillId, setActiveSkillId] = useState<string>("web");

  useEffect(() => {
    if (!skills.some((s) => s.id === activeSkillId)) setActiveSkillId("web");
  }, [skills, activeSkillId]);

  const activeSkill = skills.find((s) => s.id === activeSkillId)!;

  return (
    <div className="card skills-card">
      <div className="skills-header">
        <h2>{ui.skillsTitle}</h2>
        <p className="skills-subtitle">{ui.skillsSubtitle}</p>
      </div>

      <div className="skills-layout">
        <div className="skills-buttons">
          {skills.map((skill) => (
            <button
              key={skill.id}
              className={`skill-pill ${skill.id === activeSkillId ? "skill-pill-active" : ""}`}
              onClick={() => setActiveSkillId(skill.id)}
              type="button"
            >
              <span className="skill-pill-icon">{skill.icon}</span>
              <span className="skill-pill-text">
                <span>{skill.name}</span>
                <small>{skill.short}</small>
              </span>
            </button>
          ))}
        </div>

        <div className="skills-detail">
          <p className="skills-detail-label">{ui.selectedSkill}</p>
          <h3>{activeSkill.name}</h3>
          <p>{activeSkill.detail}</p>

          <div className="skills-tags">
            {activeSkill.tags.map((t) => (
              <span className="skill-tag" key={t}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================== EXPERIENCE ================== */
function ExperienceSection({ lang, ui }: { lang: Lang; ui: UIText }) {
  const TIMELINE_DATA = useMemo(() => buildTimeline(lang), [lang]);

  const [tag, setTag] = useState<string>(ui.all);
  const [openId, setOpenId] = useState<string | null>(null);

  const CORE_TAGS = useMemo(
    () =>
      lang === "id"
        ? ["Komunikasi", "Dokumentasi", "Kepemimpinan", "Kreativitas", "Kerja Tim", "Organisasi"]
        : ["Communication", "Documentation", "Leadership", "Creativity", "Teamwork", "Organization"],
    [lang]
  );

  const FEATURED_IDS = useMemo(() => new Set<string>(["bem-kominfo", "short-film-kominfo"]), []);

  const tags = useMemo(() => {
    const set = new Set<string>();
    TIMELINE_DATA.forEach((it) => it.tags?.forEach((t) => set.add(t)));
    const inDataCore = CORE_TAGS.filter((t) => set.has(t));
    return [ui.all, ...inDataCore];
  }, [TIMELINE_DATA, CORE_TAGS, ui.all]);

  useEffect(() => {
    if (!tags.includes(tag)) setTag(ui.all);
  }, [tags, tag, ui.all]);

  const getStatus = (period: string) => (/present|sekarang/i.test(period) ? ui.current : ui.completed);

  const toShort = (text?: string, max = 120) => {
    if (!text) return "";
    const t = text.trim();
    if (t.length <= max) return t;
    return t.slice(0, max).trimEnd() + "…";
  };

  const filtered = useMemo(() => {
    return TIMELINE_DATA.filter((it) => (tag === ui.all ? true : it.tags?.includes(tag)));
  }, [TIMELINE_DATA, tag, ui.all]);

  const sorted = useMemo(() => {
    const score = (it: TimelineItem) => {
      const featured = FEATURED_IDS.has(it.id) ? 2 : 0;
      const current = /present|sekarang/i.test(it.period) ? 1 : 0;
      return featured * 10 + current;
    };
    return [...filtered].sort((a, b) => score(b) - score(a));
  }, [filtered, FEATURED_IDS]);

  useEffect(() => {
    if (!sorted.length) {
      setOpenId(null);
      return;
    }
    const stillExists = openId && sorted.some((x) => x.id === openId);
    if (!stillExists) setOpenId(sorted[0].id);
  }, [sorted, openId]);

  return (
    <section className="ea2-wrap" id="experience">
      <header className="ea2-head">
        <h2 className="ea2-title">{ui.expTitle}</h2>
        <p className="ea2-subtitle">{ui.expSubtitle}</p>

        <div className="ea2-tags" aria-label="Tag filters">
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              className={`ea2-chip ${tag === t ? "is-active" : ""}`}
              onClick={() => setTag(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <p className="ea2-hint">{ui.expHint}</p>
      </header>

      <div className="ea2-body">
        {sorted.length === 0 ? (
          <div className="ea2-empty">{ui.noData}</div>
        ) : (
          <div className="ea2-timeline" aria-label="Timeline accordion">
            {sorted.map((it) => {
              const isOpen = openId === it.id;
              const isFeatured = FEATURED_IDS.has(it.id);
              const status = getStatus(it.period);

              return (
                <article
                  key={it.id}
                  className={`ea2-item ${isOpen ? "is-open" : ""} ${isFeatured ? "is-featured" : "is-supporting"}`}
                >
                  <button
                    type="button"
                    className="ea2-row"
                    onClick={() => setOpenId((prev) => (prev === it.id ? null : it.id))}
                    aria-expanded={isOpen}
                  >
                    <span className="ea2-strip" aria-hidden="true" />

                    <div className="ea2-main">
                      <div className="ea2-top">
                        <div className="ea2-role">{it.role}</div>

                        <div className="ea2-badges" aria-label="Badges">
                          {isFeatured ? <span className="ea2-badge ea2-badge--featured">{ui.featured}</span> : null}
                          <span
                            className={`ea2-badge ${status === ui.current ? "ea2-badge--current" : "ea2-badge--done"}`}
                          >
                            {status}
                          </span>
                        </div>
                      </div>

                      <div className="ea2-line">
                        <div className="ea2-org">{it.organization}</div>
                        <div className="ea2-period">{it.period}</div>
                      </div>

                      {it.location ? <div className="ea2-location">{it.location}</div> : null}

                      {!isOpen && it.summary ? <p className="ea2-peek">{toShort(it.summary, 130)}</p> : null}

                      {it.tags?.length ? (
                        <div className="ea2-pills ea2-pills--peek" aria-label="Key tags">
                          {it.tags.slice(0, 3).map((t) => (
                            <span key={`${it.id}-peek-${t}`} className="ea2-pill">
                              {t}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    <span className={`ea2-caret ${isOpen ? "is-open" : ""}`} aria-hidden="true">
                      <span className="ea2-caretIcon">{isOpen ? "–" : "+"}</span>
                    </span>
                  </button>

                  <div className={`ea2-panel ${isOpen ? "is-open" : ""}`}>
                    {it.summary ? <p className="ea2-summary">{it.summary}</p> : null}

                    {it.contributions?.length ? (
                      <div className="ea2-block">
                        <div className="ea2-label">{ui.keyContrib}</div>
                        <ul className="ea2-list">
                          {it.contributions.map((c, idx) => (
                            <li key={`${it.id}-c-${idx}`}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {it.tags?.length ? (
                      <div className="ea2-pills" aria-label="All tags">
                        {it.tags.map((t) => (
                          <span key={`${it.id}-t-${t}`} className="ea2-pill">
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

/* ================== EDUCATION ================== */
function EducationSection({ ui }: { ui: UIText }) {
  return (
    <section className="edu2-wrap" id="education">
      <div className="edu2-inner">
        <header className="edu2-head">
          <h2 className="edu2-title">{ui.educationTitle}</h2>
          <p className="edu2-subtitle">{ui.educationSubtitle}</p>
        </header>

        <div className="edu2-grid">
          <article className="edu2-card">
            <h3 className="edu2-degree">{ui.diploma}</h3>

            <div className="edu2-school">Del Institute of Technology — Sitoluama, Laguboti, Toba</div>

            <div className="edu2-meta">
              <p className="edu2-meta--date">Aug 2023 — Sep 2026 ({ui.expected})</p>

              <p className="edu2-meta--gpa">
                <strong>{ui.gpa}:</strong> 3.30 / 4.00
              </p>
            </div>
          </article>

          <article className="edu2-card">
            <h3 className="edu2-degree">{ui.highSchool}</h3>

            <div className="edu2-school">SMAS TRISAKTI MEDAN</div>

            <div className="edu2-meta">
              <p className="edu2-meta--date">2020 — 2023</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ================== CERTIFICATES ================= */
function CertificatesSection({ lang, ui }: { lang: Lang; ui: UIText }) {
  const certificates = useMemo(() => buildCertificates(lang), [lang]);

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<{ title: string; file: string } | null>(null);

  const openPdf = (c: Certificate) => {
    setActive({ title: c.title, file: c.file });
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setActive(null);
  };

  return (
    <section id="certificates" className="cert">
      <header className="cert-head">
        <h2 className="cert-title">{ui.certTitle}</h2>
        <p className="cert-subtitle">{ui.certSubtitle}</p>
      </header>

      <div className="cert3-grid">
        {certificates.map((c) => (
          <article key={c.id} className={`cert3-card cert3-card--${certIssuerKey(c.issuer)}`}>
            <div className="cert3-top">
              <span className="cert3-avatar" aria-hidden="true">
                {certIssuerInitial(c.issuer)}
              </span>
              <div className="cert3-meta">
                <div className="cert3-issuer">{c.issuer}</div>
                <div className="cert3-year">{c.year}</div>
              </div>
            </div>

            <h3 className="cert3-title">{c.title}</h3>

            <button type="button" className="cert3-btn" onClick={() => openPdf(c)}>
              {ui.view}
            </button>
          </article>
        ))}
      </div>

      <PdfViewerModal open={open} title={active?.title} file={active?.file} onClose={close} ui={ui} />
    </section>
  );
}

/* ================== PROJECT CARD ================== */
function ProjectCard({ project, ui }: { project: Project; ui: UIText }) {
  const images = project.images || [];
  const [index, setIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const hasImages = images.length > 0;
  const current = hasImages ? images[index] : null;

  const next = () => hasImages && setIndex((i) => (i + 1) % images.length);
  const prev = () => hasImages && setIndex((i) => (i - 1 + images.length) % images.length);

  const kindSafe =
    (project.kind || "")
      .toString()
      .trim()
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "default";

  return (
    <article
      className={["project-card", `project-card--${kindSafe}`, hasImages ? "project-card--with-thumb" : ""].join(" ")}
      data-kind={kindSafe}
    >
      <div className="project-strip" aria-hidden="true" />

      <div className="project-content">
        <div className="project-meta-row">
          <span className="project-badge">{project.badge}</span>
          <span className="project-year">{project.year}</span>
        </div>

        <h3 className="project-title">{project.title}</h3>
        <p className="project-role">{project.role}</p>

        {hasImages && current && (
          <figure className="project-thumb carousel">
            <img
              className="carousel-img"
              src={current.src}
              alt={current.alt || project.title}
              loading="lazy"
              onClick={() => setIsZoomOpen(true)}
              style={{ cursor: "zoom-in" }}
            />

            {images.length > 1 && (
              <>
                <button type="button" className="carousel-btn left" onClick={prev} aria-label="Previous image">
                  ‹
                </button>
                <button type="button" className="carousel-btn right" onClick={next} aria-label="Next image">
                  ›
                </button>
              </>
            )}
          </figure>
        )}

        <p className="project-summary">{project.summary}</p>

        <p className="project-impact">
          <span>{ui.impact}</span> {project.impact}
        </p>

        <div className="project-tags-block">
          <div className="project-tags-label">{ui.tech}</div>
          <div className="project-tags">
            {project.tech.map((t) => (
              <span key={t} className="project-tag">
                {t}
              </span>
            ))}
          </div>
        </div>

        {project.tools?.length ? (
          <div className="project-tools-block">
            <div className="project-tools-label">{ui.tools}</div>
            <div className="project-tools">
              {project.tools.map((tool) => (
                <span key={tool} className="project-tool">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {isZoomOpen && current && (
        <div className="image-lightbox-backdrop" onClick={() => setIsZoomOpen(false)}>
          <div className="image-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="image-lightbox-close"
              onClick={() => setIsZoomOpen(false)}
              aria-label="Close image"
            >
              ✕
            </button>

            <img src={current.src} alt={current.alt || project.title} className="image-lightbox-img" />

            {images.length > 1 && (
              <div className="image-lightbox-nav">
                <button type="button" onClick={prev}>
                  ‹
                </button>
                <span>
                  {index + 1} / {images.length}
                </span>
                <button type="button" onClick={next}>
                  ›
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

/* ================== PROJECT GROUP ================== */
function ProjectGroup(props: { title: string; icon: string; description: string; items: Project[]; ui: UIText }) {
  const { title, icon, description, items, ui } = props;

  return (
    <section className="projects-group">
      <header className="projects-group-header">
        <span className="projects-group-icon">{icon}</span>
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </header>

      <div className="projects-grid">
        {items.map((p) => (
          <ProjectCard key={p.id} project={p} ui={ui} />
        ))}
      </div>
    </section>
  );
}

/* ================== PROJECTS ================== */
function ProjectsSection({ lang, ui }: { lang: Lang; ui: UIText }) {
  const projects = useMemo(() => buildProjects(lang), [lang]);

  const featured = projects.filter((p) => p.category === "featured");
  const academic = projects.filter((p) => p.category === "academic");
  const supporting = projects.filter((p) => p.category === "supporting");

  return (
    <section className="projects-section" id="projects">
      <header className="projects-header">
        <h2>{ui.projTitle}</h2>
        <p>{ui.projSubtitle}</p>
      </header>

      <ProjectGroup title={ui.featuredProjects} icon="✦" description={ui.featuredDesc} items={featured} ui={ui} />
      <ProjectGroup title={ui.academicProjects} icon="⌁" description={ui.academicDesc} items={academic} ui={ui} />
      <ProjectGroup title={ui.supportingProjects} icon="◌" description={ui.supportingDesc} items={supporting} ui={ui} />
    </section>
  );
}

/* ================== CONTACT ================== */
function ContactSection({ ui }: { ui: UIText }) {
  const [sending, setSending] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);

    const form = e.currentTarget;

    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value || "";
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "";

    const subject = encodeURIComponent(`Portfolio Contact — ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    window.location.href = `mailto:winagea22@gmail.com?subject=${subject}&body=${body}`;

    form.reset();
    setTimeout(() => setSending(false), 600);
  }

  return (
    <section className="ct4-wrap" id="contact">
      <div className="ct4-inner">
        <header className="ct4-head">
          <h2 className="ct4-title">{ui.contactTitle}</h2>
          <p className="ct4-subtitle">{ui.contactSubtitle}</p>
        </header>

        <form className="ct4-card" onSubmit={onSubmit}>
          <div className="ct4-field">
            <label className="ct4-label" htmlFor="name">
              {ui.name}
            </label>
            <input id="name" className="ct4-input" placeholder={ui.enterName} name="name" required />
          </div>

          <div className="ct4-field">
            <label className="ct4-label" htmlFor="email">
              {ui.email}
            </label>
            <input id="email" className="ct4-input" placeholder={ui.enterEmail} name="email" type="email" required />
          </div>

          <div className="ct4-field">
            <label className="ct4-label" htmlFor="message">
              {ui.message}
            </label>
            <textarea id="message" className="ct4-textarea" placeholder={ui.enterMsg} name="message" required />
          </div>

          <button className="ct4-btn" type="submit" disabled={sending}>
            {sending ? ui.opening : ui.send}
          </button>
        </form>

        <div className="ct4-bottom">
          <div className="ct4-divider">
            <span>{ui.orDirect}</span>
          </div>

          <div className="ct4-social">
            <a className="ct4-socialBtn" href="https://wa.me/6283871565453" target="_blank" rel="noreferrer" aria-label="WhatsApp" title="WhatsApp">
              <FaWhatsapp />
            </a>

            <a className="ct4-socialBtn" href="https://www.linkedin.com/in/wina-sorta-maria-gea-655523307" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
              <FaLinkedin />
            </a>

            <a className="ct4-socialBtn" href="https://github.com/winagea" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
              <FaGithub />
            </a>

            <a className="ct4-socialBtn" href="https://www.instagram.com/wina_gea" target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram">
              <FaInstagram />
            </a>
          </div>

          <p className="ct4-copy">© 2025 Wina Sorta Maria Gea</p>
        </div>
      </div>
    </section>
  );
}

/* ================== HOME ================== */
export default function Home() {
  const [theme, setTheme] = useState<Theme>("light");
  const [lang, setLang] = useState<Lang>("en");
  const [mounted, setMounted] = useState(false);

  const ui: UIText = UI[lang]; // ✅ FIX: ui bertipe UIText

  useEffect(() => {
    setMounted(true);

    const savedTheme = (localStorage.getItem("theme") as Theme | null) ?? "light";
    setTheme(savedTheme);

    setLang(detectLang());
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(theme === "dark" ? "theme-dark" : "theme-light");
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("lang", lang);
  }, [lang, mounted]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  if (!mounted) return null;

  return (
    <main className="page">
      {/* ========== HERO ========== */}
      <section className="hero">
        <div className="hero-left">
          <div className="avatar-wrapper">
            <img src="/winageaa.jpg" alt="Wina Gea" className="avatar" />
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-header-row">
            <div className="hero-head">
              <h1 className="name">Wina Sorta Maria Gea</h1>
              <p className="subtitle">{ui.role}</p>
            </div>

            <div className="controls-group" aria-label="Theme and language controls">
              <button className="theme-toggle" onClick={toggleTheme} type="button">
                {theme === "light" ? (
                  <>
                    <FaMoon /> <span>{ui.dark}</span>
                  </>
                ) : (
                  <>
                    <FaSun /> <span>{ui.light}</span>
                  </>
                )}
              </button>

              <div className="lang-switch">
                <span className="lang-icon">🌐</span>
                <button className={`lang-link ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")} type="button">
                  EN
                </button>
                <button className={`lang-link ${lang === "id" ? "active" : ""}`} onClick={() => setLang("id")} type="button">
                  ID
                </button>
              </div>
            </div>
          </div>

          <div className="hero-buttons-row">
            <a href="#contact" className="btn primary">
              {ui.contact}
            </a>

            <a href="/WinaGea-CV.pdf" className="btn ghost" download>
              <FaDownload />
              <span>{ui.download}</span>
            </a>
          </div>

          <div className="hero-contact-row">
            <a href="tel:+6283871565453" className="contact-pill">
              <FaPhoneAlt /> <span>+62-838-7156-5453</span>
            </a>
            <a href="mailto:winagea22@gmail.com" className="contact-pill">
              <FaEnvelope /> <span>winagea22@gmail.com</span>
            </a>
            <a
              href="https://www.google.com/maps/place/Medan,+Sumatera+Utara"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-pill"
            >
              <FaMapMarkerAlt /> <span>Medan, Indonesia</span>
            </a>
          </div>

          <div className="hero-social-row">
            <a href="https://github.com/winagea" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/wina-sorta-maria-gea-655523307" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://www.instagram.com/wina_gea" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>
      </section>

      {/* ========== ABOUT + SKILLS ========== */}
      <section className="content">
        <div className="about-card">
          <h2>{ui.aboutTitle}</h2>

          <p>{ui.aboutP1}</p>
          <p>{ui.aboutP2}</p>

          <div className="about-lists">
            <div className="about-block about-block--focus">
              <h3 className="about-title">{ui.focusAreas}</h3>
              <ul className="about-items">
                <li>{pick(lang, { en: "Web Development & Front-End", id: "Pengembangan Web & Front-End" })}</li>
                <li>{pick(lang, { en: "UI/UX Design", id: "Desain UI/UX" })}</li>
                <li>{pick(lang, { en: "Internet of Things (IoT)", id: "Internet of Things (IoT)" })}</li>
                <li>{pick(lang, { en: "Data Visualization", id: "Visualisasi Data" })}</li>
              </ul>
            </div>

            <div className="about-block about-block--soft">
              <h3 className="about-title">{ui.softSkills}</h3>
              <ul className="about-items">
                <li>{pick(lang, { en: "Teamwork & Collaboration", id: "Kerja Sama Tim" })}</li>
                <li>{pick(lang, { en: "Effective Communication", id: "Komunikasi Efektif" })}</li>
                <li>{pick(lang, { en: "Time Management", id: "Manajemen Waktu" })}</li>
                <li>{pick(lang, { en: "Creative & Analytical Thinking", id: "Berpikir Kreatif & Analitis" })}</li>
              </ul>
            </div>
          </div>
        </div>

        <SkillsSection lang={lang} ui={ui} />
      </section>

      {/* ========== EDUCATION ========== */}
      <EducationSection ui={ui} />

      {/* ========== EXPERIENCE / ACTIVITIES ========== */}
      <ExperienceSection lang={lang} ui={ui} />

      {/* ========== CERTIFICATES ========== */}
      <CertificatesSection lang={lang} ui={ui} />

      {/* ========== PROJECTS ========== */}
      <ProjectsSection lang={lang} ui={ui} />

      {/* ========== Contact ========== */}
      <ContactSection ui={ui} />
    </main>
  );
}
