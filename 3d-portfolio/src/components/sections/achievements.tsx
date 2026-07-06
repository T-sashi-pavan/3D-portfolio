"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Award,
  Trophy,
  Star,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */

type Achievement = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: ReactNode;
  images: string[];
};

const achievementsData: Achievement[] = [
  {
    id: 1,
    title: "Gold Badge & Top 1% in Cloud Computing",
    subtitle: "NPTEL - IIT Kharagpur",
    description:
      "Achieved the prestigious Gold Badge in Cloud Computing course evaluated by NPTEL & IIT Kharagpur, scoring 95% overall and securing a position in the Top 1% candidates across India.",
    icon: <Star className="w-4 h-4 text-amber-500" />,
    images: [
      "/assets/sashi/NPTEL1.jpeg",
      "/assets/sashi/NPTEL2.jpeg",
      "/assets/sashi/NPTEL3.jpeg",
    ],
  },
  {
    id: 2,
    title: "Winner – Bharat Tech League Hackathon 2024",
    subtitle: "National Level Hackathon (Team Anveshna)",
    description:
      "Secured first place in the national hackathon. Represented the college under Team Anveshna, delivering an innovative project combining software automation and systems engineering under tight competition.",
    icon: <Trophy className="w-4 h-4 text-amber-500" />,
    images: [
      "/assets/sashi/BHARATECH1.jpeg",
      "/assets/sashi/BHARATTECH2.jpeg",
      "/assets/sashi/BHARATTECH3.jpeg",
    ],
  },
  {
    id: 3,
    title: "Winner – AVISHKAAR National-level Hackathon",
    subtitle: "Akela (Individual Participant)",
    description:
      "Won first prize in the national-level technical competition 'AVISHKAAR' under the tag team Akela, demonstrating rapid prototyping, architectural execution, and robust technical logic.",
    icon: <Award className="w-4 h-4 text-amber-500" />,
    images: [
      "/assets/sashi/AVISHKAAR1.jpeg",
      "/assets/sashi/AVISHKAAR2.jpeg",
      "/assets/sashi/AVISHKAAR3.jpeg",
    ],
  },
  {
    id: 4,
    title: "IDE Bootcamp 2025 at PSNA College",
    subtitle: "Tamil Nadu Innovation Initiative",
    description:
      "Selected to represent CIET in the prestigious Innovation Design and Entrepreneurship (IDE) Bootcamp 2025 organized by AICTE, held at PSNA College, Tamil Nadu.",
    icon: <Lightbulb className="w-4 h-4 text-amber-500" />,
    images: [
      "/assets/sashi/PSNA1.jpeg",
      "/assets/sashi/PSNA2.jpeg",
      "/assets/sashi/PSNA3.jpeg",
      "/assets/sashi/PSNA4.jpeg",
      "/assets/sashi/PSNA5.jpeg",
      "/assets/sashi/PSNA6.jpeg",
      "/assets/sashi/PSNA7.jpeg",
    ],
  },
];

/* ═══════════════════════════════════════════════════════
   LIGHTBOX PORTAL
═══════════════════════════════════════════════════════ */

interface LightboxProps {
  images: string[];
  index: number;
  title: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Lightbox = ({
  images,
  index,
  title,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) => {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    setZoom(1);
  }, [index]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "+" || e.key === "=")
        setZoom((z) => Math.min(z + 0.25, 3));
      if (e.key === "-") setZoom((z) => Math.max(z - 0.25, 1));
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [onClose, onNext, onPrev]);

  const content = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{
        background: "rgba(4,4,8,0.93)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Image viewer: ${title}`}
    >
      {/* Top bar */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="text-white/40 text-xs font-mono">
            {index + 1} / {images.length}
          </span>
          <span className="text-white/70 text-sm font-semibold truncate max-w-[55vw]">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.25, 1))}
            className="w-8 h-8 rounded-lg border border-white/15 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-white/40 text-xs font-mono w-10 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.25, 3))}
            className="w-8 h-8 rounded-lg border border-white/15 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-white/15 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all ml-1"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Image area */}
      <div
        className="flex-1 relative flex items-center justify-center px-14 overflow-hidden"
        onClick={onClose}
      >
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-3 z-10 w-10 h-10 rounded-full border border-white/15 bg-black/50 flex items-center justify-center text-white hover:bg-white/10 transition-all hover:scale-110 active:scale-95"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[index]}
              alt={`${title} — image ${index + 1}`}
              width={1920}
              height={1200}
              className="rounded-xl shadow-2xl ring-1 ring-white/10"
              style={{
                maxHeight: "80vh",
                maxWidth: "80vw",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                transform: `scale(${zoom})`,
                transition: "transform 0.2s ease",
                transformOrigin: "center center",
              }}
              priority
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-3 z-10 w-10 h-10 rounded-full border border-white/15 bg-black/50 flex items-center justify-center text-white hover:bg-white/10 transition-all hover:scale-110 active:scale-95"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Dot indicators */}
      {images.length > 1 && (
        <div
          className="flex-shrink-0 flex items-center justify-center gap-1.5 py-4"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === index
                  ? "w-5 h-1.5 bg-white"
                  : "w-1.5 h-1.5 bg-white/25"
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );

  if (typeof window === "undefined") return null;
  return ReactDOM.createPortal(
    <AnimatePresence>{content}</AnimatePresence>,
    document.body
  );
};

/* ═══════════════════════════════════════════════════════
   ACHIEVEMENT IMAGE GALLERY
   — All images stay in the DOM; only opacity changes.
     This means they are decoded once and shown instantly.
═══════════════════════════════════════════════════════ */

const AchievementGallery = ({
  images,
  title,
}: {
  images: string[];
  title: string;
}) => {
  const [current, setCurrent] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const total = images.length;

  const startAuto = useCallback(() => {
    if (total <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 4000);
  }, [total]);

  const stopAuto = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAuto();
    return () => stopAuto();
  }, [startAuto, stopAuto]);

  const goTo = useCallback(
    (i: number) => {
      stopAuto();
      setCurrent((i + total) % total);
      startAuto();
    },
    [total, startAuto, stopAuto]
  );

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <>
      <div
        className="relative w-full select-none"
        onMouseEnter={stopAuto}
        onMouseLeave={startAuto}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* ── Image stage ── */}
        {/*
          ALL images are rendered simultaneously as stacked absolute layers.
          Only opacity/visibility changes — no unmount/remount = instant transitions.
          next/image priority=true on all → browser eagerly fetches every image.
        */}
        <div
          className="
            relative w-full overflow-hidden rounded-2xl
            bg-muted/40 border border-border/50
          "
          style={{ minHeight: "220px" }}
        >
          {/* Stacked image layers */}
          {images.map((src, i) => (
            <div
              key={src}
              className="
                absolute inset-0 flex items-center justify-center p-3
                transition-opacity duration-400 ease-in-out
              "
              style={{
                opacity: i === current ? 1 : 0,
                zIndex: i === current ? 1 : 0,
                pointerEvents: i === current ? "auto" : "none",
              }}
            >
              <div
                className="group relative flex items-center justify-center w-full cursor-zoom-in"
                onClick={() => setLightboxIndex(i)}
                role="button"
                tabIndex={i === current ? 0 : -1}
                onKeyDown={(e) =>
                  e.key === "Enter" && setLightboxIndex(i)
                }
                aria-label={`View ${title} image ${i + 1} fullscreen`}
              >
                <Image
                  src={src}
                  alt={`${title} — photo ${i + 1} of ${total}`}
                  width={900}
                  height={700}
                  // All images get priority=true so browser fetches all eagerly
                  priority
                  className="
                    rounded-xl shadow-md
                    object-contain
                    max-w-full
                    transition-transform duration-300 ease-out
                    group-hover:scale-[1.02]
                  "
                  style={{
                    maxHeight: "320px",
                    width: "auto",
                    height: "auto",
                    display: "block",
                    margin: "0 auto",
                  }}
                  sizes="(max-width: 640px) 95vw, (max-width: 1024px) 45vw, 500px"
                />
                {/* Expand hint */}
                <span
                  className="
                    pointer-events-none absolute bottom-2 right-2
                    flex items-center gap-1 rounded-full
                    border border-border bg-background/80 backdrop-blur-sm
                    px-2.5 py-1 text-[10px] font-medium text-foreground/70
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-200
                  "
                >
                  <Maximize2 className="w-3 h-3" />
                  Expand
                </span>
              </div>
            </div>
          ))}

          {/* Reserve height: invisible spacer matches the tallest real image slot */}
          <div
            className="invisible pointer-events-none flex items-center justify-center p-3 w-full"
            aria-hidden="true"
          >
            <div style={{ height: "280px" }} />
          </div>
        </div>

        {/* ── External arrows (outside the image) ── */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="
                absolute -left-4 top-1/2 -translate-y-1/2 z-10
                w-8 h-8 rounded-full
                flex items-center justify-center
                border border-border bg-background/80 backdrop-blur-sm
                text-foreground/60 hover:text-foreground hover:bg-background
                transition-all duration-200 hover:scale-110 active:scale-95
                shadow-sm
              "
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="
                absolute -right-4 top-1/2 -translate-y-1/2 z-10
                w-8 h-8 rounded-full
                flex items-center justify-center
                border border-border bg-background/80 backdrop-blur-sm
                text-foreground/60 hover:text-foreground hover:bg-background
                transition-all duration-200 hover:scale-110 active:scale-95
                shadow-sm
              "
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* ── Dot indicators (below, never overlapping) ── */}
      {total > 1 && (
        <div className="flex items-center justify-center gap-1.5 pt-3 pb-1">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-5 h-1.5 bg-foreground/70"
                  : "w-1.5 h-1.5 bg-foreground/20 hover:bg-foreground/40"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Lightbox portal */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          title={title}
          onClose={() => setLightboxIndex(null)}
          onNext={() =>
            setLightboxIndex((i) => ((i ?? 0) + 1) % total)
          }
          onPrev={() =>
            setLightboxIndex((i) => ((i ?? 0) - 1 + total) % total)
          }
        />
      )}
    </>
  );
};

/* ═══════════════════════════════════════════════════════
   ACHIEVEMENT CARD
═══════════════════════════════════════════════════════ */

const AchievementCard = ({
  achievement,
  index,
}: {
  achievement: Achievement;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{
      duration: 0.5,
      delay: index * 0.08,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="
      group flex flex-col w-full
      rounded-2xl overflow-visible
      border border-border
      bg-card
      shadow-sm
      hover:shadow-md
      hover:border-border/80
      transition-all duration-300 ease-out
      hover:-translate-y-1
    "
  >
    {/* ── Gallery (hero element) ── */}
    <div className="px-5 pt-5 pb-2">
      <AchievementGallery
        images={achievement.images}
        title={achievement.title}
      />
    </div>

    {/* ── Text content ── */}
    <div className="px-5 pb-5 pt-2 flex flex-col gap-3">
      {/* Icon + title + subtitle */}
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-xl border border-amber-500/20 bg-amber-500/10 flex items-center justify-center">
          {achievement.icon}
        </div>
        <div className="min-w-0">
          <h4 className="font-display font-bold text-foreground text-sm md:text-base leading-snug">
            {achievement.title}
          </h4>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold tracking-wide mt-0.5">
            {achievement.subtitle}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-sans">
        {achievement.description}
      </p>
    </div>
  </motion.div>
);

/* ═══════════════════════════════════════════════════════
   SECTION
═══════════════════════════════════════════════════════ */

const AchievementsSection = () => (
  <SectionWrapper
    id="achievements"
    className="flex flex-col items-center justify-center py-12 z-10"
  >
    <div className="w-full max-w-5xl px-4 md:px-8 mx-auto">
      <SectionHeader
        id="achievements"
        title="Achievements"
        desc="Milestones and recognitions."
        className="static mb-12 md:mb-16 mt-0"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {achievementsData.map((ach, i) => (
          <AchievementCard key={ach.id} achievement={ach} index={i} />
        ))}
      </div>
    </div>
  </SectionWrapper>
);

export default AchievementsSection;
