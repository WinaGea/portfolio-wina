// app/page.tsx
"use client";

import { useEffect, useState } from "react";
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
import {
  FiCode,
  FiCpu,
  FiGitBranch,
  FiPenTool,
  FiBox,
  FiBarChart2,
} from "react-icons/fi";

/* ================== TYPES ================== */
type Theme = "light" | "dark";

type ProjectImage = { src: string; alt?: string };

type Project = {
  id: string;
  category: "featured" | "academic" | "supporting";
  kind: string;
  badge: string;
  year: string;
  title: string;
  role: string;
  summary: string;
  impact: string; // masih wajib
  tech: string[];
  tools?: string[];
  images?: ProjectImage[];
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
    title:
      "IoT-Based Smart Walking Stick with Position Tracking and Posture Monitoring for the Visually Impaired",
    role: "Project Lead, Visualization & Documentation",
    summary:
      "A smart cane for visually impaired users with multi-sensor input, posture tracking, GPS, and audio navigation.",
    impact:
      "Increases the safety and independence of blind users when walking in indoor and outdoor areas.",
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
    role: "Embedded & IoT Developer",
    summary:
      "IoT-based indoor air quality monitoring using ESP32 to measure temperature, humidity, PM, CO₂, and VOC with real-time display on Blynk.",
    impact:
      "Supports users in maintaining a healthier indoor environment by providing real-time air quality information.",
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
      "WordPress-based platform for computer technology career guidance and student self-development.",
    impact:
      "Helping students access clear and structured computer technology career information, supporting better preparation and confidence before entering the world of work.",
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

  // ---------- ACADEMIC ----------
  {
    id: "hand-dryer",
    category: "academic",
    kind: "embedded",
    badge: "Embedded System",
    year: "2024",
    title: "Automatic Hand Dryer System",
    role: "Embedded System Developer",
    summary:
      "An automatic hand-drying system that uses an ultrasonic sensor to trigger an 8V DC fan, with LED and buzzer indicators.",
    impact:
      "Supports a more hygienic and comfortable hand drying process through automatic activation.",
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
    role: "Backend & Architecture",
    summary: "Sistem absensi terdistribusi dengan komunikasi RPC dan event streaming Apache Kafka.",
    impact:
      "Meningkatkan skalabilitas dan mempermudah integrasi fitur notifikasi, rekap, dan autentikasi.",
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
      "C language-based store management application that implements CLI-based concepts of file handling, data structures and interactive menu.",
    impact:
      "Train basic understanding of programming logic, data processing, and persistent data management using the C language.",
    tech: ["C Programming Language", "File Handling (File I/O)", "Array & Control Flow"],
    tools: ["GCC Compiler", "Code Editor (VS Code / Dev-C++)"],
    images: [
      { src: "/shop management/catat penjualan.png", alt: "Fitur pencatatan transaksi penjualan pada sistem manajemen toko" },
      { src: "/shop management/laporan barang.png", alt: "Laporan data barang pada sistem manajemen toko" },
      { src: "/shop management/stok barang_transaksi.png", alt: "Manajemen stok dan transaksi barang pada sistem toko" },
      { src: "/shop management/tambahan stok.png", alt: "Fitur penambahan stok barang pada sistem manajemen toko" },
    ],
  },

  // ---------- SUPPORTING ----------
  {
    id: "supporting-3d-air-quality-casing",
    category: "supporting",
    kind: "design",
    badge: "3D Product Design",
    year: "2024",
    title: "3D Casing Design and Fabrication for IoT-Based Air Quality Monitoring System",
    role: "3D Product & Casing Designer",
    summary:
      "Design and fabrication of a 3D-printed casing for an IoT-based air quality monitoring system using SolidWorks, focusing on component layout, ventilation, usability, and physical protection.",
    impact:
      "Strengthened skills in mechanical design and rapid prototyping by translating electronic system requirements into a functional and manufacturable 3D-printed product.",
    tech: ["3D Design", "Mechanical Design", "Rapid Prototyping"],
    tools: ["SolidWorks", "3D Printer", "PLA+ Material"],
    images: [
      { src: "/3d/Untitled design (48) (1).png", alt: "Concept sketch and early casing layout" },
      { src: "/3d/Untitled design (49) (1).png", alt: "3D casing concept variations in SolidWorks" },
      { src: "/3d/Untitled design (50) (1).png", alt: "Exploded/perspective views of casing design" },
      { src: "/3d/Untitled design (51) (1).png", alt: "Detailed 3D model with dimensions and placement" },
      { src: "/3d/Untitled design (52) (1).png", alt: "Technical drawing and mechanical layout" },
      { src: "/3d/Untitled design (53) (1).png", alt: "Manufacturing drawing for 3D printing (PLA+)" },
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
      "Relational database design project including schema modeling, normalization up to 3NF, and structured SQL queries for consistent data retrieval.",
    impact:
      "Improved skills in designing clean database structures and writing SQL queries to support scalable and well-organized data management.",
    tech: ["SQL", "Relational Database", "Normalization (3NF)", "Query Optimization"],
    tools: ["MySQL", "phpMyAdmin / MySQL Workbench"],
    images: [
      { src: "/mysql/SELECT FROM Pengguna3.png", alt: "SELECT query result from Pengguna table" },
      { src: "/mysql/SELECT FROM Pengguna4.png", alt: "SELECT query result (variation)" },
      { src: "/mysql/SELECT FROM Pengguna5.png", alt: "SQL query execution output" },
      { src: "/mysql/SELECT FROM Pengguna6.png", alt: "Data validation query result" },
      { src: "/mysql/SELECT FROM Pengguna9.png", alt: "Optimized SELECT query result" },
      { src: "/mysql/SELECT FROM Pengguna10.png", alt: "Database testing using SELECT queries" },
      { src: "/mysql/SELECT FROM Pengguna11.png", alt: "Final relational database validation" },
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
      "Responsive website project about Medan City developed using HTML and CSS as part of web programming coursework, focusing on layout structure and visual presentation.",
    impact:
      "Improved understanding of front-end fundamentals, responsive layout techniques, and clean UI structuring using pure HTML and CSS.",
    tech: ["HTML", "CSS", "Responsive Web Design"],
    tools: ["VS Code", "Google Chrome"],
    images: [
      { src: "/website%20medan/websitemedan1.png", alt: "Website Medan City – Homepage" },
      { src: "/website%20medan/websitemedan2.png", alt: "Website Medan City – Content Section" },
      { src: "/website%20medan/websitemedan3.png", alt: "Website Medan City – Information Section" },
      { src: "/website%20medan/websitemedan4.png", alt: "Website Medan City – Gallery Section" },
      { src: "/website%20medan/websitemedan5.png", alt: "Website Medan City – Footer Section" },
    ],
  },

  {
    id: "supporting-git-workflow",
    category: "supporting",
    kind: "tools",
    badge: "Workflow Practice",
    year: "2024",
    title: "Git Branching & Collaboration Workflow",
    role: "Developer",
    summary: "Latihan workflow Git (branching, merge, dan conflict resolution) untuk kolaborasi tim pada proyek kuliah.",
    impact: "Meningkatkan kerapian versi kode dan mengurangi risiko konflik saat menggabungkan perubahan.",
    tech: ["Git", "Branching", "Merge Conflict"],
    tools: ["Git", "GitHub", "VS Code"],
    images: [],
  },
];

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
            {activeSkill.tags.map((tag) => (
              <span className="skill-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================== PROJECT CARD (CAROUSEL + ZOOM) ================== */
function ProjectCard({ project }: { project: Project }) {
  const images = project.images || [];
  const [index, setIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const hasImages = images.length > 0;
  const current = hasImages ? images[index] : null;

  const next = () => hasImages && setIndex((i) => (i + 1) % images.length);
  const prev = () => hasImages && setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <article className={`project-card project-card--${project.kind} ${hasImages ? "project-card--with-thumb" : ""}`}>
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
        <p>
          A selection of projects completed during my studies, including final assignments, course projects, and supporting academic work.
        </p>
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



/* ================== FOOTER COMPONENT (BENER POSISINYA) ================== */
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p>© {year} Wina Sorta Maria Gea — Portfolio</p>
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

            <button className="theme-toggle" onClick={toggleTheme}>
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
            <a
              href="https://www.linkedin.com/in/wina-sorta-maria-gea-655523307"
              target="_blank"
              rel="noreferrer"
            >
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

      {/* ========== PROJECTS ========== */}
      <ProjectsSection />

 
      {/* ========== FOOTER ========== */}
      <Footer />
    </main>
  );
}
