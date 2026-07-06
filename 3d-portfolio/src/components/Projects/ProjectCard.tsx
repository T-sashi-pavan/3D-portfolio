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

const ProjectCard = ({ project, onClick, forcePause = false }: ProjectCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    onClick(project);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(project);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative w-full cursor-pointer"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Open ${project.title} project details`}
    >
      {/* Card shell */}
      <div
        className="
          relative overflow-hidden rounded-[20px] w-full
          border border-white/[0.08]
          bg-gradient-to-b from-white/[0.06] to-white/[0.02]
          backdrop-blur-md
          shadow-[0_4px_24px_rgba(0,0,0,0.3)]
          transition-all duration-300 ease-out
          group-hover:-translate-y-2
          group-hover:shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.12)]
          group-hover:border-white/[0.18]
        "
        style={{ height: "380px" }}
      >
        {/* Video layer */}
        <div className="absolute inset-0 overflow-hidden">
          {project.video ? (
            <VideoPreview
              src={project.video}
              poster={project.image}
              videoRef={videoRef}
              forcePause={forcePause}
              observerPlay={true}
              className="
                w-full h-full object-cover
                transition-transform duration-500 ease-out
                group-hover:scale-105
              "
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>

        {/* Dark gradient overlay — stronger on hover */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t from-black/90 via-black/30 to-transparent
            transition-opacity duration-300
            opacity-80 group-hover:opacity-95
          "
        />

        {/* Category badge — top left */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="
              inline-block rounded-full
              border border-white/20 bg-black/40 backdrop-blur-sm
              px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/80
            "
          >
            {project.category}
          </span>
        </div>

        {/* Tap hint icon — top right */}
        <div
          className="
            absolute top-3 right-3 z-10
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
          "
        >
          <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-white"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </div>

        {/* Bottom text area */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
          <h3
            className="
              font-display font-bold text-white leading-snug tracking-tight
              text-base md:text-lg
              transition-all duration-300
              group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]
              line-clamp-2
            "
          >
            {project.title}
          </h3>
          {project.shortDescription && (
            <p className="mt-1 text-xs text-white/60 line-clamp-1 font-medium">
              {project.shortDescription}
            </p>
          )}
        </div>

        {/* Glow border on hover */}
        <div
          className="
            absolute inset-0 rounded-[20px] pointer-events-none
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
            ring-1 ring-white/20
          "
        />
      </div>
    </motion.div>
  );
};

export default ProjectCard;
