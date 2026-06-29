"use client";

import { useEffect } from "react";

// Glitch léger et aléatoire (toutes les 10-15s) sur les grands titres (h1),
// après l'animation chroma initiale. Respecte prefers-reduced-motion.
export default function GlitchController() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>("h1"));
    if (targets.length === 0) return;

    let timer: number;

    const fire = () => {
      const el = targets[Math.floor(Math.random() * targets.length)];
      el.classList.add("glitching");
      window.setTimeout(() => el.classList.remove("glitching"), 480);
      timer = window.setTimeout(fire, 10000 + Math.random() * 5000);
    };

    timer = window.setTimeout(fire, 10000 + Math.random() * 5000);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
