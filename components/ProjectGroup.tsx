// components/ProjectGroup.tsx
import ProjectCard from "./ProjectCard";
import type { Project } from "../app/types/project";

export default function ProjectGroup(props: {
  title: string;
  icon: string;
  description: string;
  items: Project[];
}) {
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
