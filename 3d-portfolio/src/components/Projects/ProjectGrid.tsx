"use client";
import React, { useState, useRef, useCallback } from "react";
import { Project } from "@/data/projects";
import projects from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

const ProjectGrid = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // Collect all card video refs so we can pause them when modal opens
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  const openModal = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const isModalOpen = selectedProject !== null;

  return (
    <>
      <div
        className="
          grid gap-5
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={openModal}
            forcePause={isModalOpen}
          />
        ))}
      </div>

      {/* Portal modal — rendered into document.body */}
      <ProjectModal project={selectedProject} onClose={closeModal} />
    </>
  );
};

export default ProjectGrid;
