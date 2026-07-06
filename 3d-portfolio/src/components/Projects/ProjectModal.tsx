"use client";
import React, { useEffect, useRef, useCallback } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, Globe } from "lucide-react";
import Link from "next/link";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Project } from "@/data/projects";
import TechStack from "./TechStack";
import VideoPreview from "./VideoPreview";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (project) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [project]);

  // ESC to close
  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Focus trap
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
          e.preventDefault();
          (e.shiftKey ? last : first).focus();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [project, onClose]);

  // Focus close button when modal opens
  useEffect(() => {
    if (project) {
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    }
  }, [project]);

  // Click outside overlay to close
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose]
  );

  const modalContent = (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            ref={overlayRef}
            onClick={handleOverlayClick}
            className="fixed inset-0 z-[9998] flex items-center justify-center p-4 md:p-8"
            style={{
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
            aria-hidden="true"
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} project details`}
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 30,
            }}
            className="
              fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8
              pointer-events-none
            "
          >
            <div
              className="
                relative w-full max-w-3xl max-h-[90vh]
                overflow-y-auto overscroll-contain
                rounded-[24px]
                pointer-events-auto
                border border-white/[0.1]
                shadow-[0_24px_80px_rgba(0,0,0,0.7)]
              "
              style={{
                background:
                  "linear-gradient(180deg, rgba(18,18,24,0.98) 0%, rgba(10,10,14,0.99) 100%)",
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(255,255,255,0.1) transparent",
              }}
            >
              {/* ── Header ── */}
              <div className="sticky top-0 z-20 flex items-start justify-between gap-4 p-6 pb-4 border-b border-white/[0.06]"
                style={{
                  background: "rgba(18,18,24,0.95)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block rounded-full border border-white/20 bg-white/5 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white/60">
                      {project.category}
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-white text-xl md:text-2xl leading-tight">
                    {project.title}
                  </h2>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 mt-1">
                  {project.demoUrl && (
                    <Link
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex items-center gap-1.5
                        bg-white text-black hover:bg-white/90
                        rounded-xl px-4 py-2 text-sm font-bold
                        transition-all duration-200 hover:scale-105
                        shadow-md
                      "
                      aria-label={`Visit live demo of ${project.title}`}
                    >
                      <Globe className="w-3.5 h-3.5" />
                      Visit Live
                    </Link>
                  )}
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex items-center gap-1.5
                        border border-white/20 bg-white/5 text-white hover:bg-white/10
                        rounded-xl px-3 py-2 text-sm font-semibold
                        transition-all duration-200 hover:scale-105
                      "
                      aria-label={`View GitHub for ${project.title}`}
                    >
                      <SiGithub className="w-4 h-4" />
                    </Link>
                  )}
                  <button
                    ref={closeButtonRef}
                    onClick={onClose}
                    aria-label="Close modal"
                    className="
                      w-9 h-9 rounded-xl
                      border border-white/20 bg-white/5 text-white hover:bg-white/10
                      flex items-center justify-center
                      transition-all duration-200 hover:scale-105
                      focus:outline-none focus:ring-2 focus:ring-white/30
                    "
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* ── Body ── */}
              <div className="p-6 space-y-8">

                {/* Preview Video */}
                {project.video && (
                  <div className="rounded-2xl overflow-hidden border border-white/[0.06] shadow-xl aspect-video">
                    <VideoPreview
                      src={project.video}
                      poster={project.image}
                      observerPlay={false}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Overview */}
                <div>
                  <SectionLabel>Project Overview</SectionLabel>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed font-sans mt-3">
                    {project.description}
                  </p>
                </div>

                {/* Features */}
                {project.features && project.features.length > 0 && (
                  <div>
                    <SectionLabel>Key Features</SectionLabel>
                    <ul className="mt-3 space-y-2">
                      {project.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack */}
                <div>
                  <SectionLabel>Tech Stack</SectionLabel>
                  <div className="mt-3">
                    <TechStack technologies={project.technologies} size="md" />
                  </div>
                </div>

                {/* Responsibilities */}
                {project.responsibilities && project.responsibilities.length > 0 && (
                  <div>
                    <SectionLabel>My Responsibilities</SectionLabel>
                    <ul className="mt-3 space-y-2">
                      {project.responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40 flex-shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Achievements */}
                {project.achievements && project.achievements.length > 0 && (
                  <div>
                    <SectionLabel>Achievements</SectionLabel>
                    <ul className="mt-3 space-y-2">
                      {project.achievements.map((a, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                          <span className="mt-1.5 text-amber-400 flex-shrink-0">★</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Screenshots */}
                {project.screenshots && project.screenshots.length > 0 && (
                  <div>
                    <SectionLabel>Screenshots</SectionLabel>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.screenshots.map((src, i) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={i}
                          src={src}
                          alt={`${project.title} screenshot ${i + 1}`}
                          className="rounded-xl border border-white/[0.06] w-full object-cover"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Actions */}
                <div className="pt-4 border-t border-white/[0.06]">
                  <div className="flex flex-wrap gap-3">
                    {project.demoUrl && (
                      <Link
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          flex items-center gap-2
                          bg-white text-black hover:bg-white/90
                          rounded-xl px-5 py-2.5 text-sm font-bold
                          transition-all duration-200 hover:scale-105 shadow-lg
                        "
                      >
                        <Globe className="w-4 h-4" />
                        Live Demo
                      </Link>
                    )}
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          flex items-center gap-2
                          border border-white/20 bg-white/5 text-white hover:bg-white/10
                          rounded-xl px-5 py-2.5 text-sm font-semibold
                          transition-all duration-200 hover:scale-105
                        "
                      >
                        <SiGithub className="w-4 h-4" />
                        GitHub
                      </Link>
                    )}
                    {project.linkedinUrl && (
                      <Link
                        href={project.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          flex items-center gap-2
                          bg-[#0077b5]/15 border border-[#0077b5]/30 text-[#0077b5] hover:bg-[#0077b5]/25
                          rounded-xl px-5 py-2.5 text-sm font-semibold
                          transition-all duration-200 hover:scale-105
                        "
                      >
                        <SiLinkedin className="w-4 h-4" />
                        LinkedIn Post
                      </Link>
                    )}
                    {project.caseStudyUrl && (
                      <Link
                        href={project.caseStudyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          flex items-center gap-2
                          border border-white/20 bg-white/5 text-white hover:bg-white/10
                          rounded-xl px-5 py-2.5 text-sm font-semibold
                          transition-all duration-200 hover:scale-105
                        "
                      >
                        Case Study ↗
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  if (typeof window === "undefined") return null;
  return ReactDOM.createPortal(modalContent, document.body);
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-white font-display font-bold text-sm uppercase tracking-widest opacity-50">
    {children}
  </h3>
);

export default ProjectModal;
