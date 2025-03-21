import type { CollectionEntry } from "astro:content";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Globe, Github } from "lucide-react";
import { cn } from "@/lib/utils";

// Import the SVG icons
import appStoreIcon from "@/assets/images/icons/app-store.svg";
import playStoreIcon from "@/assets/images/icons/play-store.svg";

interface ProjectCardProps {
  project: CollectionEntry<"projects">["data"];
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  console.log(project.image);

  return (
    <Card className="space-y-4 hover:border-primary/50 transition-all duration-300">
      <CardContent className="p-0 flex h-full">
        <div className="flex flex-col gap-2 w-full">
          <img
            src={project.image.src}
            alt={project.title}
            className="w-full h-48 object-cover border-b"
          />
          <div className="space-y-2 px-6 pt-4 flex flex-col justify-around grow">
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="text-sm text-gray-500">{project.description}</p>
            <h4 className="font-semibold mt-4">Created with:</h4>
            <div className="flex items-center">
              {project.techStack.map((tech) => (
                <div className="p-2 rounded-full" key={tech.name}>
                  <img src={tech.icon.src} alt={tech.name} className="w-5" />
                </div>
              ))}
            </div>
	
            {(project.link ||
              project.githubLink ||
              project.playStoreLink ||
              project.appStoreLink) && (
              <div className="flex flex-wrap gap-2 mt-4">
                {project.link && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1.5"
                    asChild
                  >
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="size-4" />
                      Website
                    </a>
                  </Button>
                )}
                {project.githubLink && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1.5"
                    asChild
                  >
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="size-4" />
                      GitHub
                    </a>
                  </Button>
                )}
                {project.playStoreLink && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1.5"
                    asChild
                  >
                    <a
                      href={project.playStoreLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={playStoreIcon.src}
                        alt="Play Store"
                        className="size-4"
                      />
                      Play Store
                    </a>
                  </Button>
                )}
                {project.appStoreLink && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1.5"
                    asChild
                  >
                    <a
                      href={project.appStoreLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={appStoreIcon.src}
                        alt="App Store"
                        className="size-4"
                      />
                      App Store
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
