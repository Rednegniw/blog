import type { CollectionEntry } from "astro:content";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/utils";

interface ProjectCardGridProps {
  title: string;
  projects: CollectionEntry<"projects">[];
  className?: string;
}

export const ProjectCardGrid = ({ title, projects, className }: ProjectCardGridProps) => {
  return (
    <div className={cn("space-y-6", className)}>
      <h2 className="text-3xl font-bold">{title}</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.data.id} project={project.data} />
        ))}
      </div>
    </div>
  );
}; 