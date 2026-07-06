"use client";
import React, { useRef } from "react";
import { motion } from "motion/react";
import { Project } from "@/data/projects";
import VideoPreview from "./VideoPreview";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  forcePause?: boolean;
}

const ProjectCard = ({
  project,
  onClick,
  forcePause = false,
}: ProjectCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(project);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group w-full cursor-pointer"
      onClick={() => onClick(project)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Open ${project.title} project details`}
    >
      {/* Outer card wrapper */}
      <div
        className="
          flex flex-col w-full rounded-2xl overflow-hidden
          bg-card border border-border
          shadow-[0_2px_16px_rgba(0,0,0,0.15)] dark:shadow-[0_2px_16px_rgba(0,0,0,0.45)]
          transition-all duration-300 ease-out
          group-hover:-translate-y-1.5
          group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.25),0_0_0_1px_rgba(var(--primary),0.1)] dark:group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.13)]
          group-hover:border-border/80 dark:group-hover:border-white/[0.16]
        "
      >
        {/* ── Thumbnail / Video (16:9) ── */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
          {project.video ? (
            <VideoPreview
              src={project.video}
              poster={project.image}
              videoRef={videoRef}
              forcePause={forcePause}
              observerPlay={true}
              className="
                w-full h-full object-cover object-top
                transition-transform duration-500 ease-out
                group-hover:scale-[1.03]
              "
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
          )}

          {/* Subtle bottom fade for seamless blend into card body */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/20 dark:from-[rgba(12,12,16,0.6)] to-transparent pointer-events-none" />

          {/* Hover overlay with arrow hint */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
            <div
              className="
                w-10 h-10 rounded-full bg-white/10 dark:bg-white/15 backdrop-blur-sm
                border border-white/20 dark:border-white/30
                flex items-center justify-center
                opacity-0 group-hover:opacity-100
                scale-75 group-hover:scale-100
                transition-all duration-300
              "
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-foreground dark:text-white"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>
        </div>

        {/* ── Card Body (below the thumbnail) ── */}
        <div className="px-4 py-3 flex flex-col gap-1.5">
          {/* Title */}
          <h3
            className="
              font-display font-bold leading-snug tracking-tight text-foreground
              text-sm md:text-base
              line-clamp-2
              transition-colors duration-200
            "
          >
            {project.title}
          </h3>

          {/* Category badge */}
          <span
            className="
              inline-block self-start
              rounded-full border border-border bg-muted
              px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest
              text-muted-foreground
            "
          >
            {project.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
