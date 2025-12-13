// app/data/projects.ts
import type { Project } from "../types/project";

export const projects: Project[] = [
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
      "A smart cane with multi-sensor input, posture tracking, GPS location tracking, and audio navigation guidance.",
    impact:
      "Increases the safety and independence of visually impaired users when walking in indoor and outdoor areas.",
    tech: ["ESP32", "Ultrasonic", "IMU", "GPS"],
    tools: ["Flutter", "Python GUI", "Unreal Engine", "MQTT"],
    images: [
      { src: "/smart%20walking/prototype2.png", alt: "Prototype – tampak samping" },
      { src: "/smart%20walking/skematik.png", alt: "Skematik rangkaian hardware" },
      { src: "/smart%20walking/desain%20prototype.jpg", alt: "Desain mekanik prototipe" },
      { src: "/smart%20walking/node%20red.png", alt: "Workflow Node-RED" },
      { src: "/smart%20walking/flutter.png", alt: "Tampilan aplikasi Flutter" },
      { src: "/smart%20walking/gps.png", alt: "Modul GPS pada sistem" },
    ],
  },

  {
    id: "air-quality",
    category: "featured",
    kind: "iot",
    badge: "IoT & Data",
    year: "2025",
    title: "IoT Air Quality Monitoring System",
    role: "End-to-End Developer",
    summary:
      "Air quality monitoring system using ESP32 and sensors, visualized in a real-time dashboard.",
    impact:
      "Helps monitor temperature, humidity, VOC/CO₂, and dust pollution in real time.",
    tech: ["ESP32", "MQTT", "InfluxDB", "Grafana", "Blynk"],
  },

  {
    id: "smart-garden",
    category: "featured",
    kind: "iot",
    badge: "IoT Prototype",
    year: "2024",
    title: "Smart Garden & Auto Watering",
    role: "System Designer",
    summary:
      "Automatic watering prototype based on soil moisture sensor with water pump control.",
    impact:
      "Reduces water waste and maintains optimal soil moisture without manual monitoring.",
    tech: ["Soil Sensor", "Relay", "ESP32", "Blynk"],
  },

  {
    id: "job-website",
    category: "featured",
    kind: "web",
    badge: "Web Platform",
    year: "2023",
    title: "Computer Technology Job Info Website",
    role: "Front-End & UI/UX",
    summary:
      "A job and internship info website for Computer Technology students at IT Del.",
    impact:
      "Makes it easier for students to find relevant opportunities from one place.",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
  },

  // ---------- ACADEMIC ----------
  {
    id: "attendance-rpc",
    category: "academic",
    kind: "embedded",
    badge: "Distributed System",
    year: "2024",
    title: "Distributed Attendance System (RPC + Kafka)",
    role: "Backend & Architecture",
    summary:
      "Distributed attendance system using RPC and Apache Kafka event streaming.",
    impact:
      "Improves scalability and makes it easier to integrate notification and recap features.",
    tech: ["RPC", "Kafka", "Microservices", "MongoDB"],
  },

  {
    id: "hand-dryer",
    category: "academic",
    kind: "embedded",
    badge: "Embedded Device",
    year: "2024",
    title: "Automatic Hand Dryer System",
    role: "Embedded System",
    summary:
      "Touchless automatic hand dryer prototype using a motion sensor and fan control.",
    impact:
      "Improves hygiene and user comfort with automatic, contactless drying.",
    tech: ["Sensor", "Arduino", "Actuator"],
  },

  {
    id: "shop-console",
    category: "academic",
    kind: "console",
    badge: "Programming Fundamental",
    year: "2023",
    title: "Shop Management Console App",
    role: "Console Application",
    summary:
      "C console app to learn file handling, data structures, and interactive menus.",
    impact:
      "Strengthens programming fundamentals and data handling using C language.",
    tech: ["C Language", "File I/O", "Array"],
  },
];
