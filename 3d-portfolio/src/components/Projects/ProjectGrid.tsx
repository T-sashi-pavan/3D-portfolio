"use client";
import React, { useState, useCallback } from "react";
import { Project } from "@/data/projects";
import projects from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

const ProjectGrid = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const isModalOpen = selectedProject !== null;

  const openModal = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <>
      <div
        className="
          grid gap-6 md:gap-7
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

      <ProjectModal project={selectedProject} onClose={closeModal} />
    </>
  );
};

export default ProjectGrid;
