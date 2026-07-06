"use client";
import React, { useRef, useEffect } from "react";

interface VideoPreviewProps {
  src: string;
  poster?: string;
  className?: string;
  /** When true, will auto-play via IntersectionObserver */
  observerPlay?: boolean;
  /** External imperative control — force pause when true */
  forcePause?: boolean;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
}

const VideoPreview = ({
  src,
  poster,
  className = "",
  observerPlay = true,
  forcePause = false,
  videoRef: externalRef,
}: VideoPreviewProps) => {
  const internalRef = useRef<HTMLVideoElement>(null);
  const ref = externalRef ?? internalRef;

  // IntersectionObserver: auto-play when 40% visible, pause otherwise
  useEffect(() => {
    if (!observerPlay) return;
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !forcePause) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [observerPlay, forcePause, ref]);

  // External force-pause control (when modal opens)
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (forcePause) {
      video.pause();
    }
  }, [forcePause, ref]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
      aria-hidden="true"
    />
  );
};

export default VideoPreview;
