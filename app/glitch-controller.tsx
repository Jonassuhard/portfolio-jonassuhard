"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Vrai glitch sur tous les titres (h1 + h2) de chaque page, déclenché toutes les 10s.
// L'animation d'entrée (flou + chroma) joue au chargement ; le glitch commence 10s
// après et se répète toutes les 10s. Re-armé à chaque changement de page (pathname).
// Respecte prefers-reduced-motion. Déclenché bien après le LCP -> zéro impact perf.
export default function GlitchController() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const titles = Array.from(
      document.querySelectorAll<HTMLElement>("main h1, main h2")
    );
    if (titles.length === 0) return;

    // Les copies RGB (::before/::after) lisent le texte via data-text.
    titles.forEach((el) => {
      el.setAttribute("data-text", el.textContent ?? "");
      el.classList.add("glitch-title");
    });

    const timers: number[] = [];
    const fireAll = () => {
      titles.forEach((el, i) => {
        timers.push(
          window.setTimeout(() => {
            el.classList.add("glitching");
            timers.push(
              window.setTimeout(() => el.classList.remove("glitching"), 520)
            );
          }, i * 45)
        );
      });
    };

    // Premier déclenchement à 10s, puis toutes les 10s.
    const interval = window.setInterval(fireAll, 10000);

    return () => {
      window.clearInterval(interval);
      timers.forEach((t) => window.clearTimeout(t));
      titles.forEach((el) => {
        el.classList.remove("glitching", "glitch-title");
        el.removeAttribute("data-text");
      });
    };
  }, [pathname]);

  return null;
}
