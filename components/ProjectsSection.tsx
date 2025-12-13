// components/ProjectsSection.tsx
"use client";

import ProjectGroup from "./ProjectGroup";
import { projects } from "../app/data/project";

export default function ProjectsSection() {
  const featured = projects.filter((p) => p.category === "featured");
  const academic = projects.filter((p) => p.category === "academic");
  const supporting = projects.filter((p) => p.category === "supporting");

  return (
    <section className="projects-section" id="projects">
      <header className="projects-header">
        <h2>Projects & Creations</h2>
        <p>
          Beberapa project yang paling merepresentasikan kombinasi skill Web,
          IoT, dan prototyping yang pernah saya kerjakan.
        </p>
      </header>

      <ProjectGroup
        title="Featured Projects"
        icon="⭐"
        description="Project utama yang menggabungkan hardware, software, dan visualisasi data."
        items={featured}
      />

      <ProjectGroup
        title="Academic Projects"
        icon="📘"
        description="Tugas kuliah dan praktikum yang sifatnya lebih formal."
        items={academic}
      />

      <ProjectGroup
        title="Supporting Projects"
        icon="🧩"
        description="Project tambahan dan eksplorasi yang mendukung perjalanan belajar saya."
        items={supporting}
      />
    </section>
  );
}
