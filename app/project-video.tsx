"use client";

import { useEffect, useRef } from "react";

type ProjectVideoProps = {
  src: string;
  poster: string;
  label: string;
};

export default function ProjectVideo({ src, poster, label }: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      if (motionPreference.matches) {
        video.pause();
      } else {
        void video.play().catch(() => {
          // L'utilisateur peut toujours lancer la vidéo avec les contrôles natifs.
        });
      }
    };

    syncPlayback();
    motionPreference.addEventListener("change", syncPlayback);
    return () => motionPreference.removeEventListener("change", syncPlayback);
  }, []);

  return (
    <video
      ref={videoRef}
      className="case-video"
      src={src}
      poster={poster}
      controls
      loop
      muted
      playsInline
      preload="metadata"
      aria-label={label}
    />
  );
}
