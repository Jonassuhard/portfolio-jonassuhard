"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Glitch Steins;Gate sur les titres, re-armé à CHAQUE page (dépend de pathname).
// - Entrée : burst one-shot sur tous les titres (h1 + h2) de la page, en cascade,
//   déclenché après le premier paint -> le LCP du hero reste intact.
// - Ambiant : un h1 au hasard grésille discrètement toutes les ~10-14s.
// Respecte prefers-reduced-motion.
export default function GlitchController() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timers: number[] = [];
    const glitchOnce = (el: HTMLElement, hold = 480) => {
      el.classList.add("glitching");
      timers.push(window.setTimeout(() => el.classList.remove("glitching"), hold));
    };

    // Burst d'entrée : tous les titres décodent en cascade, après le paint (LCP intact).
    const raf = window.requestAnimationFrame(() => {
      const titles = Array.from(
        document.querySelectorAll<HTMLElement>("main h1, main h2")
      );
      titles.forEach((el, i) => {
        timers.push(window.setTimeout(() => glitchOnce(el), 120 + i * 90));
      });
    });

    // Ambiant : un h1 au hasard grésille de temps en temps.
    const fire = () => {
      const heads = Array.from(document.querySelectorAll<HTMLElement>("main h1"));
      if (heads.length) glitchOnce(heads[Math.floor(Math.random() * heads.length)]);
      timers.push(window.setTimeout(fire, 10000 + Math.random() * 4000));
    };
    timers.push(window.setTimeout(fire, 10000 + Math.random() * 4000));

    return () => {
      window.cancelAnimationFrame(raf);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [pathname]);

  return null;
}
