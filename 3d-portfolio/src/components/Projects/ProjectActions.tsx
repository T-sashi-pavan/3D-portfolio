"use client";
import React from "react";
import Link from "next/link";
import { Globe } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Project } from "@/data/projects";

interface ProjectActionsProps {
  project: Project;
  variant?: "modal" | "card";
}

const ProjectActions = ({ project, variant = "modal" }: ProjectActionsProps) => {
  const baseClass =
    "flex items-center gap-2 font-semibold transition-all duration-300 rounded-xl cursor-pointer";

  const primaryClass =
    variant === "modal"
      ? `${baseClass} bg-white text-black hover:bg-white/90 px-5 py-2.5 text-sm shadow-lg hover:shadow-xl hover:scale-105`
      : `${baseClass} bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 text-xs`;

  const secondaryClass =
    variant === "modal"
      ? `${baseClass} border border-white/20 bg-white/5 text-white hover:bg-white/10 px-5 py-2.5 text-sm backdrop-blur-sm hover:scale-105`
      : `${baseClass} border border-border bg-secondary hover:bg-secondary/70 px-4 py-2 text-xs`;

  const linkedinClass =
    variant === "modal"
      ? `${baseClass} bg-[#0077b5]/20 border border-[#0077b5]/30 text-[#0077b5] hover:bg-[#0077b5]/30 px-5 py-2.5 text-sm hover:scale-105`
      : `${baseClass} bg-[#0077b5] text-white hover:bg-[#0077b5]/90 px-4 py-2 text-xs`;

  return (
    <div className="flex flex-wrap gap-3">
      {project.demoUrl && (
        <Link
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={primaryClass}
          aria-label={`Visit live demo of ${project.title}`}
        >
          <Globe className={variant === "modal" ? "w-4 h-4" : "w-3.5 h-3.5"} />
          Live Demo
        </Link>
      )}
      {project.githubUrl && (
        <Link
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={secondaryClass}
          aria-label={`View GitHub repo for ${project.title}`}
        >
          <SiGithub className={variant === "modal" ? "w-4 h-4" : "w-3.5 h-3.5"} />
          GitHub
        </Link>
      )}
      {project.linkedinUrl && (
        <Link
          href={project.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={linkedinClass}
          aria-label={`View LinkedIn post for ${project.title}`}
        >
          <SiLinkedin className={variant === "modal" ? "w-4 h-4" : "w-3.5 h-3.5"} />
          LinkedIn Post
        </Link>
      )}
      {project.caseStudyUrl && (
        <Link
          href={project.caseStudyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={secondaryClass}
          aria-label={`Read case study for ${project.title}`}
        >
          Case Study ↗
        </Link>
      )}
    </div>
  );
};

export default ProjectActions;
