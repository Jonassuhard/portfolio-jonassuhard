"use client";

import { useEffect, useRef } from "react";

type ProjectVideoProps = {
  src: string;
  poster: string;
  label: string;
  width?: number;
  height?: number;
  eager?: boolean;
};

export default function ProjectVideo({ src, poster, label, width = 1080, height = 1920, eager = true }: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = eager;
    let userPaused = false;
    const syncPlayback = () => {
      if (motionPreference.matches || !visible || document.hidden || userPaused) {
        video.pause();
      } else {
        if (!video.getAttribute("src")) video.src = src;
        void video.play().catch(() => {
          // Le poster reste visible lorsque le navigateur refuse la lecture.
        });
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.15 });
    const togglePlayback = (event: KeyboardEvent) => {
      if (event.key !== " " && event.key !== "Enter") return;
      event.preventDefault();
      userPaused = !video.paused;
      syncPlayback();
    };
    video.muted = true;
    observer.observe(video);
    syncPlayback();
    motionPreference.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    video.addEventListener("keydown", togglePlayback);
    return () => {
      observer.disconnect();
      video.pause();
      motionPreference.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      video.removeEventListener("keydown", togglePlayback);
    };
  }, [src, eager]);

  return (
    <video
      ref={videoRef}
      className="case-video"
      src={eager ? src : undefined}
      poster={poster}
      width={width}
      height={height}
      autoPlay={eager}
      controls={false}
      disablePictureInPicture
      loop
      muted
      playsInline
      preload={eager ? "auto" : "none"}
      tabIndex={0}
      aria-label={label}
    />
  );
}
