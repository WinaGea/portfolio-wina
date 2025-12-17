"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useMemo, useRef, useState } from "react";

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
} from "react-icons/fa";
import { FiCode, FiCpu, FiGitBranch, FiPenTool, FiBox, FiBarChart2 } from "react-icons/fi";

/**
 * ✅ Worker yang aman untuk Next.js (biar tidak mismatch versi worker vs api)
 * Pastikan kamu sudah install: npm i react-pdf pdfjs-dist
 */


/* ================== TYPES ================== */
type Theme = "light" | "dark";

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
  file: string; // contoh: "/sertifikat/1.pdf"
};

/* ================== SKILLS DATA ================== */
const skills = [
  {
    id: "web",
    name: "Web Development",
    short: "HTML, CSS, JavaScript, React, Next.js",
    icon: <FiCode />,
    detail:
      "Developing responsive and modern websites, ranging from static web pages to React and Next.js applications, with a focus on layout structure and user experience.",
    tags: ["Responsive UI", "HTML & CSS", "React", "Next.js"],
  },
  {
    id: "iot",
    name: "IoT Systems",
    short: "ESP32, Sensors, MQTT, Blynk",
    icon: <FiCpu />,
    detail:
      "Building IoT systems using ESP32 and various sensors for monitoring and automation, including real-time data transmission to dashboards.",
    tags: ["ESP32", "Sensor Integration", "Real-time Data", "IoT Dashboard"],
  },
  {
    id: "embedded",
    name: "Embedded Systems",
    short: "Arduino, Sensors, Actuators",
    icon: <FiGitBranch />,
    detail:
      "Designing and implementing embedded systems using Arduino and ESP32 for academic projects such as automatic hand dryers and monitoring systems.",
    tags: ["Arduino", "ESP32", "Embedded Logic", "Hardware Control"],
  },
  {
    id: "uiux",
    name: "UI / Interface Design",
    short: "Wireframe, Interface Layout, UX Flow",
    icon: <FiPenTool />,
    detail:
      "Designing clear and functional system interfaces, including IoT device casing interfaces and monitoring system layouts.",
    tags: ["Interface Design", "User Flow", "Visual Layout"],
  },
  {
    id: "3d",
    name: "3D Modeling & Prototyping",
    short: "SolidWorks, 3D Printing, PLA+",
    icon: <FiBox />,
    detail:
      "Creating IoT device casing designs using SolidWorks and realizing them through 3D printing processes with PLA+ material.",
    tags: ["SolidWorks", "3D Modeling", "Rapid Prototyping", "PLA+"],
  },
  {
    id: "database",
    name: "Database Design",
    short: "MySQL, SQL, Normalization",
    icon: <FiBarChart2 />,
    detail:
      "Designing and managing relational databases using MySQL, applying normalization up to Third Normal Form (3NF) and structured SQL queries.",
    tags: ["MySQL", "SQL Query", "Database Design", "3NF"],
  },
];

/* ================== PROJECTS DATA ================== */
const projects: Project[] = [
  {
    id: "smart-walking-stick",
    category: "featured",
    kind: "iot",
    badge: "Assistive IoT",
    year: "2025",
    title: "IoT-Based Smart Walking Stick with Position Tracking and Posture Monitoring for the Visually Impaired",
    role: "Project Lead, Visualization Developer",
    summary:
      "An IoT-based smart walking stick integrating obstacle detection, posture monitoring, GPS tracking, and audio feedback to enhance safety and independent mobility for visually impaired users.",
    impact: "Improves user safety and independent mobility through real-time sensing and navigation assistance.",
    tech: ["ESP32", "Ultrasonic", "IMU", "GPS"],
    tools: ["Flutter", "Python GUI", "Unreal Engine", "MQTT"],
    images: [
      { src: "/smart%20walking/prototype2.png", alt: "Prototype – tampak samping" },
      { src: "/smart%20walking/skematik.png", alt: "Skematik rangkaian hardware" },
      { src: "/smart%20walking/desain%20prototype.jpg", alt: "Desain mekanik prototipe" },
      { src: "/smart%20walking/node%20red.png", alt: "Workflow Node-RED" },
      { src: "/smart%20walking/flutter.png", alt: "UI aplikasi Flutter" },
      { src: "/smart%20walking/gps.png", alt: "Modul GPS pada sistem" },
    ],
  },
  {
    id: "air-quality",
    category: "featured",
    kind: "iot",
    badge: "IoT & Data",
    year: "2025",
    title: "IoT-Based Air Quality Monitoring System",
    role: "IoT System Developer & Monitoring Integration",
    summary:
      "An IoT-based indoor air quality monitoring system using ESP32 to measure temperature, humidity, PM, CO₂, and VOC levels with real-time visualization via Blynk IoT.",
    impact: "Enables real-time awareness of indoor air quality to support a healthier indoor environment.",
    tech: ["ESP32", "DHT22", "SGP30", "GP2Y1010AU0F", "I2C LCD"],
    tools: ["Blynk IoT", "Wi-Fi"],
    images: [
      { src: "/air%20monitoring/Design_Prototype.png", alt: "Air Quality Monitoring Prototype Design" },
      { src: "/air%20monitoring/Poster_Produk.png", alt: "Air Quality Monitoring Product Poster" },
      { src: "/air%20monitoring/Desain_Skematik.png", alt: "Air Quality Monitoring Schematic Design" },
      { src: "/air%20monitoring/Desain_Arsitektur_Hardware.png", alt: "Air Quality Monitoring System Architecture" },
      { src: "/air%20monitoring/Implementasi_PCB.png", alt: "Air Quality Monitoring PCB Implementation" },
      { src: "/air%20monitoring/Grafik_Data_Suhu.png", alt: "Temperature Monitoring Graph" },
      { src: "/air%20monitoring/Grafik_Data_Kelembaban.png", alt: "Humidity Monitoring Graph" },
      { src: "/air%20monitoring/Grafik_Data_eCO2.png", alt: "eCO2 Monitoring Graph" },
      { src: "/air%20monitoring/Grafik_Data_TVoc.png", alt: "TVOC Monitoring Graph" },
    ],
  },
  {
    id: "job-website",
    category: "featured",
    kind: "web",
    badge: "Web Platform",
    year: "2024",
    title: "Computer Technology Job Information Website",
    role: "Web Content and UI Designer",
    summary:
      "A WordPress-based website providing structured computer technology career information and guidance to support student self-development and career awareness.",
    impact: "Helps students access clear and organized career information, improving readiness and confidence before entering the workforce.",
    tech: ["WordPress", "MySQL", "Apache"],
    tools: ["WordPress CMS", "Balsamiq", "Draw.io", "Google Chrome"],
    images: [
      { src: "/job-website/home.png", alt: "Job Website Home Page" },
      { src: "/job-website/jenis pekerjaan 2.png", alt: "Job Categories Page" },
      { src: "/job-website/page level1.png", alt: "Job Website Page Level 1" },
      { src: "/job-website/level 2.png", alt: "Job Website Level 2 Page" },
      { src: "/job-website/level 3.png", alt: "Job Website Level 3 Page" },
      { src: "/job-website/mockup level1.png", alt: "Job Website Mockup Level 1" },
      { src: "/job-website/mockup level 2.png", alt: "Job Website Mockup Level 2" },
      { src: "/job-website/mockup level3.png", alt: "Job Website Mockup Level 3" },
      { src: "/job-website/erdiagram.png", alt: "Job Website ER Diagram" },
      { src: "/job-website/target system1.png", alt: "Target System Diagram 1" },
      { src: "/job-website/target system2.png", alt: "Target System Diagram 2" },
      { src: "/job-website/layeradmin.png", alt: "Admin Layer Architecture" },
      { src: "/job-website/layerusr.png", alt: "User Layer Architecture" },
    ],
  },

  {
    id: "hand-dryer",
    category: "academic",
    kind: "embedded",
    badge: "Embedded System",
    year: "2024",
    title: "Automatic Hand Dryer System",
    role: "Embedded System Developer",
    summary:
      "An automatic hand-drying system using an ultrasonic sensor to detect hands and activate an 8V DC fan through a relay, equipped with LED and buzzer indicators.",
    impact: "Supports a more hygienic and comfortable hand-drying process through automatic, touchless activation.",
    tech: ["Arduino", "Ultrasonic Sensor", "Relay", "DC Fan"],
    tools: ["Arduino IDE"],
    images: [
      { src: "/hand-drayer/implementasi_hardware.png", alt: "Implementasi hardware hand dryer otomatis" },
      { src: "/hand-drayer/Desain_Skematik.png", alt: "Desain skematik sistem hand dryer otomatis" },
      { src: "/hand-drayer/flowchart.png", alt: "Flowchart kerja sistem hand dryer otomatis" },
    ],
  },
  {
    id: "attendance-rpc",
    category: "academic",
    kind: "distributed",
    badge: "Distributed System",
    year: "2024",
    title: "Distributed Attendance System",
    role: "Backend & System Architecture",
    summary:
      "A distributed attendance system implementing RPC-based communication and Apache Kafka for event streaming to support scalable authentication, attendance recording, and notification services.",
    impact: "Improves system scalability and simplifies integration of authentication, attendance, reporting, and notification features.",
    tech: ["RPC", "Kafka", "Microservices", "MongoDB"],
    tools: ["Postman", "VS Code"],
    images: [
      { src: "/attandance-system/desain arsitektur.png", alt: "Desain arsitektur sistem absensi terdistribusi" },
      { src: "/attandance-system/use case.png", alt: "Use case diagram sistem absensi mahasiswa" },
      { src: "/attandance-system/mahasiswa-service postman.png", alt: "Pengujian API Mahasiswa Service menggunakan Postman" },
      { src: "/attandance-system/auth-db collection users.png", alt: "Struktur database Auth Service (collection users)" },
      { src: "/attandance-system/mahasiswa-db collection mahasiswa.png", alt: "Struktur database Mahasiswa Service (collection mahasiswa)" },
      { src: "/attandance-system/absensi-db collection absensi.png", alt: "Struktur database Absensi Service (collection absensi)" },
      { src: "/attandance-system/rekap-db collection rekab.png", alt: "Struktur database Rekap Service (collection rekap)" },
      { src: "/attandance-system/absensi service.png", alt: "Implementasi layanan Absensi Service" },
    ],
  },
  {
    id: "shop-console",
    category: "academic",
    kind: "console",
    badge: "Programming Fundamental",
    year: "2023",
    title: "Shop Management System",
    role: "Console Application",
    summary:
      "A C-based console application for basic shop management, implementing CLI interaction, file handling for data persistence, and structured menu-driven operations.",
    impact:
      "Strengthens fundamental understanding of programming logic, data processing, and persistent data management using the C language.",
    tech: ["C Programming Language", "File Handling (File I/O)", "Array & Control Flow"],
    tools: ["GCC Compiler", "Code Editor (VS Code / Dev-C++)"],
    images: [
      { src: "/shop management/catat penjualan.png", alt: "Fitur pencatatan transaksi penjualan" },
      { src: "/shop management/laporan barang.png", alt: "Laporan data barang" },
      { src: "/shop management/stok barang_transaksi.png", alt: "Manajemen stok & transaksi" },
      { src: "/shop management/tambahan stok.png", alt: "Fitur penambahan stok" },
    ],
  },

  {
    id: "supporting-3d-air-quality-casing",
    category: "supporting",
    kind: "design",
    badge: "3D Product Design",
    year: "2024",
    title: "3D Casing Design and Fabrication for IoT-Based Air Quality Monitoring System",
    role: "3D Product & Casing Designer",
    summary:
      "Design and fabrication of a 3D-printed casing for an IoT-based air quality monitoring system, focusing on component layout, ventilation, usability, and physical protection.",
    impact:
      "Strengthened skills in mechanical design and rapid prototyping by translating electronic system requirements into a functional and manufacturable 3D-printed product.",
    tech: ["3D Design", "Mechanical Design", "Rapid Prototyping"],
    tools: ["SolidWorks", "3D Printer", "PLA+ Material"],
    images: [
      { src: "/3d/Untitled design (48) (1).png", alt: "Concept sketch and early casing layout" },
      { src: "/3d/Untitled design (49) (1).png", alt: "3D casing concept variations" },
      { src: "/3d/Untitled design (50) (1).png", alt: "Exploded/perspective views" },
      { src: "/3d/Untitled design (51) (1).png", alt: "Detailed 3D model with placement" },
      { src: "/3d/Untitled design (52) (1).png", alt: "Technical drawing layout" },
      { src: "/3d/Untitled design (53) (1).png", alt: "Manufacturing drawing (PLA+)" },
    ],
  },
  {
    id: "supporting-mysql-db-design",
    category: "supporting",
    kind: "database",
    badge: "Database Introduction",
    year: "2024",
    title: "Relational Database Design and Implementation Using MySQL",
    role: "Database Designer",
    summary:
      "A relational database design project involving schema modeling, normalization up to Third Normal Form (3NF), and structured SQL queries to support consistent and well-organized data retrieval.",
    impact: "Strengthened understanding of clean database design and SQL querying to support scalable and structured data management.",
    tech: ["SQL", "Relational Database", "Normalization (3NF)", "Query Optimization"],
    tools: ["MySQL", "phpMyAdmin / MySQL Workbench"],
    images: [
      { src: "/mysql/3.png", alt: "SELECT query result from Pengguna table" },
      { src: "/mysql/4.png", alt: "SELECT query result (variation)" },
      { src: "/mysql/5.png", alt: "SQL query execution output" },
      { src: "/mysql/6.png", alt: "Data validation query result" },
      { src: "/mysql/9.png", alt: "Optimized SELECT query result" },
      { src: "/10.png", alt: "Database testing using SELECT queries" },
      { src: "/11.png", alt: "Final relational database validation" },
    ],
  },
  {
    id: "supporting-medan-city-website",
    category: "supporting",
    kind: "web",
    badge: "Web Development",
    year: "2023",
    title: "Website Medan City",
    role: "Front-End Developer",
    summary:
      "A responsive informational website about Medan City developed using pure HTML and CSS, focusing on layout structure, content organization, and visual presentation.",
    impact: "Strengthened understanding of front-end fundamentals, responsive layout techniques, and clean UI structuring using HTML and CSS.",
    tech: ["HTML", "CSS", "Responsive Web Design"],
    tools: ["VS Code", "Google Chrome"],
    images: [
      { src: "/website%20medan/websitemedan1.png", alt: "Homepage" },
      { src: "/website%20medan/websitemedan2.png", alt: "Content section" },
      { src: "/website%20medan/websitemedan3.png", alt: "Information section" },
      { src: "/website%20medan/websitemedan4.png", alt: "Gallery section" },
      { src: "/website%20medan/websitemedan5.png", alt: "Footer section" },
    ],
  },
];

/* ================== EXPERIENCE (DATA) ================== */
const TIMELINE_DATA: TimelineItem[] = [
  {
    id: "bem-kominfo",
    type: "activity",
    role: "Creative Division Member",
    organization: "Department of Communication and Information — Student Executive Board (BEM)",
    period: "Oct 2024 — Present",
    location: "Del Institute of Technology",
    summary:
      "Served as a Creative Division Member in the Department of Communication and Information, supporting the Student Executive Board’s internal and external communication through visual content creation, media publications, and creative collaboration.",
    contributions: [
      "Created graphic designs and digital content for posters, social media feeds, and promotional materials",
      "Contributed creative ideas and suggestions to improve content concepts and overall visual quality",
      "Supported media publication and documentation for organizational activities",
      "Collaborated with other departments to ensure effective information dissemination and consistent organizational branding",
    ],
    tags: ["Communication", "Teamwork", "Creativity"],
  },
  {
    id: "himatek-member",
    type: "activity",
    role: "Member",
    organization: "HIMATEK — Computer Technology Student Association (Del Institute of Technology)",
    period: "2023 — Present",
    location: "Del Institute of Technology",
    summary:
      "Actively involved as a member of HIMATEK, participating in student association activities that support academic engagement, collaboration, and community development among Computer Technology students.",
    contributions: [
      "Participated in organizational meetings and student programs",
      "Supported the implementation of academic and social activities",
      "Contributed to collaborative initiatives within the association",
    ],
    tags: ["Teamwork", "Community", "Organization"],
  },
  {
    id: "himatek-kpu",
    type: "activity",
    role: "Documentation Division Member",
    organization: "Election Committee (KPU) — HIMATEK",
    period: "September 2025",
    location: "Del Institute of Technology",
    summary:
      "Supporting the organization and implementation of HIMATEK student elections by assisting with coordination, administration, voting procedures, and documentation of event implementation.",
    contributions: [
      "Documented election activities through photos and written records",
      "Assisted in organizing and managing documentation files for election events",
      "Collaborated with committee members to ensure accurate and timely documentation of election processes",
    ],
    tags: ["Documentation", "Responsibility", "Teamwork"],
  },
  {
    id: "short-movie-kominfo",
    type: "activity",
    role: "Short Film Program Secretary",
    organization: "Short Movie Program — Department of Communication and Information",
    period: "November 2025",
    location: "Del Institute of Technology",
    summary:
      "Serving as Secretary of the short film program organized by the Department of Communication and Information, responsible for budgeting, administration, and coordination to support smooth execution of the program.",
    contributions: [
      "Managed program budgeting, expense records, and financial reporting",
      "Handled administrative tasks including documentation, correspondence, and meeting records",
      "Coordinated with committee members to support effective planning and execution of the program",
    ],
    tags: ["Responsibility", "Organization", "Coordination"],
  },
];

/* ================= CERTIFICATE DATA (PASTIKAN TANPA public/) ================= */
const certificates: Certificate[] = [
  { id: "huawei-datacom", title: "Huawei HCIA — Datacom V1.0 Course", issuer: "Huawei", year: "2025", file: "/sertifikat/1.pdf" },
  { id: "myskill-api", title: "API Introduction", issuer: "MySkill", year: "2025", file: "/sertifikat/2.pdf" },
  { id: "myskill-backend", title: "Back-End Development Introduction", issuer: "MySkill", year: "2025", file: "/sertifikat/3.pdf" },
  { id: "cisco-ethical", title: "Ethical Hacker Update 2025", issuer: "Cisco Networking Academy", year: "2025", file: "/sertifikat/4.pdf" },
  { id: "myskill-frontend", title: "Front-End Development Introduction", issuer: "MySkill", year: "2025", file: "/sertifikat/5.pdf" },
  { id: "huawei-cloud", title: "Huawei HCIA — Cloud Computing V5.5 Course", issuer: "Huawei", year: "2025", file: "/sertifikat/6.pdf" },
  { id: "huawei-security", title: "Huawei HCIA — Security V4.0 Course", issuer: "Huawei", year: "2025", file: "/sertifikat/7.pdf" },
  { id: "huawei-storage", title: "Huawei HCIA — Storage V5.0 Course", issuer: "Huawei", year: "2025", file: "/sertifikat/8.pdf" },
  { id: "myskill-internet", title: "Internet Introduction", issuer: "MySkill", year: "2025", file: "/sertifikat/9.pdf" },
  { id: "simplilearn-devops", title: "Introduction to DevOps Tools", issuer: "Simplilearn", year: "2025", file: "/sertifikat/10.pdf" },
  { id: "cisco-iot", title: "Introduction to IoT", issuer: "Cisco Networking Academy", year: "2025", file: "/sertifikat/11.pdf" },
];

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

/* ================== SKILLS COMPONENT ================== */
function SkillsSection() {
  const [activeSkillId, setActiveSkillId] = useState<string>("web");
  const activeSkill = skills.find((s) => s.id === activeSkillId)!;

  return (
    <div className="card skills-card">
      <div className="skills-header">
        <h2>Skills</h2>
        <p className="skills-subtitle">Click on a skill to see a brief explanation.</p>
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
          <p className="skills-detail-label">Selected Skill</p>
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

/* ================== EXPERIENCE SECTION ================== */
function ExperienceSection() {
  const [tag, setTag] = useState<string>("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const tags = useMemo(() => {
    const set = new Set<string>();
    TIMELINE_DATA.forEach((it) => it.tags?.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, []);

  const filtered = useMemo(() => {
    return TIMELINE_DATA.filter((it) => (tag === "All" ? true : it.tags.includes(tag)));
  }, [tag]);

  useEffect(() => {
    if (!openId && filtered[0]) setOpenId(filtered[0].id);
  }, [filtered, openId]);

  return (
    <section className="ea2-wrap" id="experience">
      <header className="ea2-head">
        <h2 className="ea2-title">Experience & Activities</h2>
        <p className="ea2-subtitle">
          A collection of organizational experiences and activities that demonstrate roles, responsibilities and real contributions.
        </p>

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
      </header>

      <div className="ea2-body">
        {filtered.length === 0 ? (
          <div className="ea2-empty">Belum ada data yang cocok dengan filter ini.</div>
        ) : (
          <div className="ea2-timeline" aria-label="Timeline accordion">
            {filtered.map((it) => {
              const isOpen = openId === it.id;

              return (
                <article key={it.id} className={`ea2-item ${isOpen ? "is-open" : ""}`}>
                  <button
                    type="button"
                    className="ea2-row"
                    onClick={() => setOpenId((prev) => (prev === it.id ? null : it.id))}
                    aria-expanded={isOpen}
                  >
                    <div className="ea2-main">
                      <div className="ea2-role">{it.role}</div>

                      <div className="ea2-line">
                        <div className="ea2-org">{it.organization}</div>
                        <div className="ea2-period">{it.period}</div>
                      </div>

                      {it.location ? <div className="ea2-location">{it.location}</div> : null}
                    </div>

                    <span className="ea2-caret" aria-hidden="true">
                      {isOpen ? "–" : "+"}
                    </span>
                  </button>

                  <div className={`ea2-panel ${isOpen ? "is-open" : ""}`}>
                    <p className="ea2-summary">{it.summary}</p>

                    {it.contributions?.length ? (
                      <div className="ea2-block">
                        <div className="ea2-label">KEY CONTRIBUTIONS</div>
                        <ul className="ea2-list">
                          {it.contributions.map((c, idx) => (
                            <li key={`${it.id}-c-${idx}`}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <div className="ea2-pills">
                      {it.tags.map((t) => (
                        <span key={`${it.id}-t-${t}`} className="ea2-pill">
                          {t}
                        </span>
                      ))}
                    </div>
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


/** ✅ Worker aman (hindari mismatch versi) */
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

type PdfViewerModalProps = {
  open: boolean;
  title?: string;
  file?: string;
  onClose: () => void;
};

function PdfViewerModal({ open, title, file, onClose }: PdfViewerModalProps) {
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);

  // zoom user (multiplier)
  const [zoom, setZoom] = useState(1); // 1 = 100%
  const [loadErr, setLoadErr] = useState<string | null>(null);

  // ukuran frame viewer (untuk fit)
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [frameWidth, setFrameWidth] = useState(900);
  const [frameHeight, setFrameHeight] = useState(600);

  // ukuran asli halaman PDF (untuk hitung scale)
  const [pageSize, setPageSize] = useState<{ w: number; h: number } | null>(null);

  const safeFile = useMemo(() => {
    if (!file) return "";
    const fixed = /^https?:\/\//i.test(file)
      ? file
      : file.startsWith("/")
      ? file
      : `/${file}`;
    return encodeURI(fixed);
  }, [file]);

  // reset saat modal dibuka / file berubah
  useEffect(() => {
    if (!open) return;
    setNumPages(0);
    setPage(1);
    setZoom(1);
    setLoadErr(null);
    setPageSize(null);
  }, [open, safeFile]);

  // lock scroll body saat modal open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ukur frame viewer (width + height)
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

  // ✅ scale dasar agar PDF “muat sekotak” (contain), lalu dikali zoom
  const fitScale = useMemo(() => {
    if (!pageSize) return 1;

    const pad = 24; // padding frameWrap 12 + 12 (samakan dengan CSS)
    const availW = Math.max(320, frameWidth - pad);
    const availH = Math.max(320, frameHeight - pad);

    return Math.max(availW / pageSize.w, availH / pageSize.h);

  }, [pageSize, frameWidth, frameHeight]);

  // keyboard shortcuts
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      if (e.key === "ArrowRight") setPage((p) => Math.min(numPages || 1, p + 1));
      if (e.key === "ArrowLeft") setPage((p) => Math.max(1, p - 1));

      if (e.key === "+") setZoom((z) => Math.min(2.2, +(z + 0.1).toFixed(2)));
      if (e.key === "-") setZoom((z) => Math.max(0.6, +(z - 0.1).toFixed(2)));
      if (e.key === "0") setZoom(1); // reset zoom cepat
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

          <div className="pdfm-title" title={title || "Certificate"}>
            {title || "Certificate"}
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
              Close
            </button>
          </div>
        </div>

        <div className="pdfm-bodyOne">
          <div className="pdfm-frameWrap" ref={frameRef}>
            {loadErr ? (
              <div className="pdfm-error">
                <strong>PDF tidak bisa dibuka.</strong>
                <div>{loadErr}</div>
              </div>
            ) : (
              <Document
                key={safeFile}
                file={safeFile}
                onLoadSuccess={({ numPages }) => {
                  setNumPages(numPages);
                  setPage((p) => Math.min(Math.max(1, p), numPages));
                }}
                onLoadError={(err) => setLoadErr(err?.message || "Unknown error")}
                loading={<div className="pdfm-loading">Loading…</div>}
              >
                <Page
                  pageNumber={page}
                  scale={fitScale * zoom}
                  onLoadSuccess={(p) => setPageSize({ w: p.originalWidth, h: p.originalHeight })}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  loading={<div className="pdfm-loading">Rendering…</div>}
                />
              </Document>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


/*================ CERTIFICATES SECTION ================= */
function CertificatesSection() {
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
        <h2 className="cert-title">Certificates</h2>
        <p className="cert-subtitle">List of certifications I have completed as part of my academic and self-development journey.</p>
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
              View →
            </button>
          </article>
        ))}
      </div>

      <PdfViewerModal open={open} title={active?.title} file={active?.file} onClose={close} />
    </section>
  );
}
/* =

/* ================== PROJECT CARD ================== */
function ProjectCard({ project }: { project: Project }) {
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
          <span>Impact</span> {project.impact}
        </p>

        <div className="project-tags-block">
          <div className="project-tags-label">Tech</div>
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
            <div className="project-tools-label">Tools</div>
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
function ProjectGroup(props: { title: string; icon: string; description: string; items: Project[] }) {
  const { title, icon, description, items } = props;

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
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}

/* ================== PROJECTS SECTION ================== */
function ProjectsSection() {
  const featured = projects.filter((p) => p.category === "featured");
  const academic = projects.filter((p) => p.category === "academic");
  const supporting = projects.filter((p) => p.category === "supporting");

  return (
    <section className="projects-section" id="projects">
      <header className="projects-header">
        <h2>Projects & Creations</h2>
        <p>A selection of projects completed during my studies, including final assignments, course projects, and supporting academic work.</p>
      </header>

      <ProjectGroup
        title="Featured Projects"
        icon="✦"
        description="The main projects include First Year Project, Second Year Project, and Final Project 1."
        items={featured}
      />

      <ProjectGroup
        title="Academic Projects"
        icon="⌁"
        description="Large-scale academic projects are carried out in certain subjects with a formal and structured approach."
        items={academic}
      />

      <ProjectGroup
        title="Supporting Projects"
        icon="◌"
        description="Exploratory projects that support the learning process and ability development."
        items={supporting}
      />
    </section>
  );
}

/* ================== FOOTER ================== */
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer-inner">
        <p>© {year} Wina Sorta Maria Gea</p>
        <small>Built with Next.js • Clean UI • Responsive</small>
      </div>
    </footer>
  );
}

/* ================== HOME ================== */
export default function Home() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as Theme | null) ?? "light";
    setTheme(saved);
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(saved === "dark" ? "theme-dark" : "theme-light");
  }, []);

  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(theme === "dark" ? "theme-dark" : "theme-light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

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
            <div>
              <h1 className="name">Wina Sorta Maria Gea</h1>
              <p className="subtitle">Computer Technology</p>
            </div>

            <button className="theme-toggle" onClick={toggleTheme} type="button">
              {theme === "light" ? (
                <>
                  <FaMoon /> <span>Dark</span>
                </>
              ) : (
                <>
                  <FaSun /> <span>Light</span>
                </>
              )}
            </button>
          </div>

          <div className="hero-buttons-row">
            <a href="#contact" className="btn primary">
              Contact Me
            </a>
            <a href="/WinaGea-CV.pdf" className="btn ghost" download>
              <FaDownload />
              <span>Download CV</span>
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
          <h2>About Me</h2>

          <p>
            I am a final-year Diploma in Computer Technology student at the Del Institute of Technology with interests in Web Development,
            Front-End Engineering, UI/UX Design, and IoT.
          </p>

          <p>
            Throughout my studies, I have worked on smart walking sticks, IoT-based air quality monitoring, job information websites, and
            distributed applications using microservices.
          </p>

          <div className="about-lists">
            <div className="about-block about-block--focus">
              <h3 className="about-title">FOCUS AREAS</h3>
              <ul className="about-items">
                <li>Web Development & Front-End</li>
                <li>UI/UX Design</li>
                <li>Internet of Things (IoT)</li>
                <li>Data Visualization</li>
              </ul>
            </div>

            <div className="about-block about-block--soft">
              <h3 className="about-title">SOFT SKILLS</h3>
              <ul className="about-items">
                <li>Teamwork & Collaboration</li>
                <li>Effective Communication</li>
                <li>Time Management</li>
                <li>Creative & Analytical Thinking</li>
              </ul>
            </div>
          </div>
        </div>

        <SkillsSection />
      </section>

      {/* ========== EXPERIENCE / ACTIVITIES ========== */}
      <ExperienceSection />

      {/* ========== CERTIFICATES ========== */}
      <CertificatesSection />

      {/* ========== PROJECTS ========== */}
      <ProjectsSection />

      {/* ========== FOOTER ========== */}
      <Footer />
    </main>
  );
}