"use client";
import React, { useEffect, useRef, useCallback } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, Globe, ExternalLink } from "lucide-react";
import Link from "next/link";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Project } from "@/data/projects";
import TechStack from "./TechStack";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [project]);

  // ESC + focus trap
  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "Tab" && modalRef.current) {
        const focusable = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [project, onClose]);

  // Auto-focus close button
  useEffect(() => {
    if (project) setTimeout(() => closeButtonRef.current?.focus(), 60);
  }, [project]);

  // Click outside
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
          {/* ── Backdrop ── */}
          <motion.div
            key="backdrop"
            ref={overlayRef}
            onClick={handleOverlayClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9998]"
            style={{
              background: "rgba(4,4,8,0.82)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
            aria-hidden="true"
          />

          {/* ── Modal positioner ── */}
          <div
            className="
              fixed inset-0 z-[9999]
              flex items-center justify-center
              p-3 sm:p-5 md:p-8
              pointer-events-none
            "
          >
            <motion.div
              key="modal"
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-label={`${project.title} project details`}
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
              className="
                pointer-events-auto
                relative flex flex-col
                w-full
                rounded-2xl md:rounded-[22px]
                border border-white/[0.1]
                shadow-[0_32px_96px_rgba(0,0,0,0.8)]
                overflow-hidden
              "
              style={{
                maxWidth: "min(900px, 92vw)",
                maxHeight: "min(85vh, 860px)",
                background: "linear-gradient(160deg,rgb(16,17,23) 0%,rgb(10,10,15) 100%)",
              }}
            >

              {/* ═══ STICKY HEADER ═══ */}
              <div
                className="
                  flex-shrink-0
                  flex items-center justify-between gap-3
                  px-5 py-4
                  border-b border-white/[0.07]
                "
                style={{
                  background: "rgba(14,15,20,0.95)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Left: badge + title */}
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/40 mb-0.5">
                    {project.category}
                  </p>
                  <h2
                    className="font-display font-bold text-white leading-tight line-clamp-1"
                    style={{ fontSize: "clamp(0.95rem, 2vw, 1.25rem)" }}
                  >
                    {project.title}
                  </h2>
                </div>

                {/* Right: action buttons + close */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {project.demoUrl && (
                    <Link
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        hidden sm:flex items-center gap-1.5
                        bg-white text-black text-xs font-bold
                        rounded-xl px-3.5 py-2
                        hover:bg-white/90 transition-all duration-200 hover:scale-105
                        shadow-md whitespace-nowrap
                      "
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
                        hidden sm:flex items-center gap-1.5
                        border border-white/20 bg-white/5 text-white text-xs font-semibold
                        rounded-xl px-3 py-2
                        hover:bg-white/10 transition-all duration-200 hover:scale-105
                      "
                    >
                      <SiGithub className="w-3.5 h-3.5" />
                      <span className="hidden md:inline">GitHub</span>
                    </Link>
                  )}
                  <button
                    ref={closeButtonRef}
                    onClick={onClose}
                    aria-label="Close modal"
                    className="
                      w-8 h-8 rounded-xl flex items-center justify-center
                      border border-white/20 bg-white/5 text-white/70
                      hover:bg-white/12 hover:text-white
                      transition-all duration-200 hover:scale-105
                      focus:outline-none focus:ring-2 focus:ring-white/30
                    "
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* ═══ SCROLLABLE BODY ═══ */}
              <div
                className="flex-1 overflow-y-auto overscroll-contain"
                style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.08) transparent" }}
              >

                {/* ── Two-panel layout on md+ ── */}
                <div className="flex flex-col md:flex-row gap-0">

                  {/* LEFT: Video Preview */}
                  {project.video && (
                    <div className="md:sticky md:top-0 md:self-start md:w-[52%] flex-shrink-0">
                      <div className="relative bg-black" style={{ aspectRatio: "16/9" }}>
                        <video
                          src={project.video}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Mobile-only quick action row */}
                      <div className="flex sm:hidden gap-2 px-4 py-3 border-b border-white/[0.06]">
                        {project.demoUrl && (
                          <Link
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 bg-white text-black text-xs font-bold rounded-xl py-2 hover:bg-white/90 transition-all"
                          >
                            <Globe className="w-3.5 h-3.5" /> Live Demo
                          </Link>
                        )}
                        {project.githubUrl && (
                          <Link
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 border border-white/20 bg-white/5 text-white text-xs font-semibold rounded-xl py-2 hover:bg-white/10 transition-all"
                          >
                            <SiGithub className="w-3.5 h-3.5" /> GitHub
                          </Link>
                        )}
                      </div>
                    </div>
                  )}

                  {/* RIGHT: Details */}
                  <div className="flex-1 px-5 py-5 space-y-5">

                    {/* Short description */}
                    {project.shortDescription && (
                      <p className="text-white/90 text-sm font-semibold leading-relaxed">
                        {project.shortDescription}
                      </p>
                    )}

                    {/* Overview */}
                    <div>
                      <SLabel>Overview</SLabel>
                      <p className="text-white/60 text-xs leading-relaxed mt-1.5">
                        {project.description}
                      </p>
                    </div>

                    {/* Key Features */}
                    {project.features && project.features.length > 0 && (
                      <div>
                        <SLabel>Key Features</SLabel>
                        <ul className="mt-1.5 space-y-1.5">
                          {project.features.map((f, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-white/60">
                              <span className="mt-[5px] w-1 h-1 rounded-full bg-white/35 flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tech Stack */}
                    <div>
                      <SLabel>Tech Stack</SLabel>
                      <div className="mt-2">
                        <TechStack technologies={project.technologies} size="sm" />
                      </div>
                    </div>

                    {/* Responsibilities */}
                    {project.responsibilities && project.responsibilities.length > 0 && (
                      <div>
                        <SLabel>My Role</SLabel>
                        <ul className="mt-1.5 space-y-1.5">
                          {project.responsibilities.map((r, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-white/60">
                              <span className="mt-[5px] w-1 h-1 rounded-full bg-white/35 flex-shrink-0" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Achievements */}
                    {project.achievements && project.achievements.length > 0 && (
                      <div>
                        <SLabel>Highlights</SLabel>
                        <ul className="mt-1.5 space-y-1.5">
                          {project.achievements.map((a, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-white/60">
                              <span className="mt-[3px] text-amber-400 text-[10px] flex-shrink-0">★</span>
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Screenshots */}
                    {project.screenshots && project.screenshots.length > 0 && (
                      <div>
                        <SLabel>Screenshots</SLabel>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          {project.screenshots.map((src, i) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              key={i}
                              src={src}
                              alt={`Screenshot ${i + 1}`}
                              className="rounded-lg border border-white/[0.06] w-full object-cover aspect-video"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA row */}
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-white/[0.06]">
                      {project.demoUrl && (
                        <Link
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 bg-white text-black text-xs font-bold rounded-xl px-4 py-2 hover:bg-white/90 hover:scale-105 transition-all duration-200 shadow-md"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                        </Link>
                      )}
                      {project.githubUrl && (
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 border border-white/20 bg-white/5 text-white text-xs font-semibold rounded-xl px-4 py-2 hover:bg-white/10 hover:scale-105 transition-all duration-200"
                        >
                          <SiGithub className="w-3.5 h-3.5" /> GitHub
                        </Link>
                      )}
                      {project.linkedinUrl && (
                        <Link
                          href={project.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 bg-[#0077b5]/15 border border-[#0077b5]/30 text-[#4fa3d1] text-xs font-semibold rounded-xl px-4 py-2 hover:bg-[#0077b5]/25 hover:scale-105 transition-all duration-200"
                        >
                          <SiLinkedin className="w-3.5 h-3.5" /> LinkedIn
                        </Link>
                      )}
                      {project.caseStudyUrl && (
                        <Link
                          href={project.caseStudyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 border border-white/20 bg-white/5 text-white text-xs font-semibold rounded-xl px-4 py-2 hover:bg-white/10 hover:scale-105 transition-all duration-200"
                        >
                          Case Study ↗
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  if (typeof window === "undefined") return null;
  return ReactDOM.createPortal(modalContent, document.body);
};

const SLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-white/35 mb-0.5">
    {children}
  </p>
);

export default ProjectModal;
