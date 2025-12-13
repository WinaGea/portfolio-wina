// app/types/project.ts
export type ProjectImage = {
  src: string;
  alt?: string;
};

export type Project = {
  id: string;
  category: "featured" | "academic" | "supporting";
  kind: string;
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
