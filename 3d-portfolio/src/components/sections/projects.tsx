"use client";
import React from "react";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";
import ProjectGrid from "../Projects/ProjectGrid";

const ProjectsSection = () => {
  return (
    <SectionWrapper id="projects" className="max-w-7xl mx-auto py-12 px-4 z-10">
      <SectionHeader
        id="projects"
        title="Projects"
        className="static mb-8 md:mb-12 mt-0"
      />
      <ProjectGrid />
    </SectionWrapper>
  );
};

export default ProjectsSection;
