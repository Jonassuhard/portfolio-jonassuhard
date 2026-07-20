"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Glitch réservé au titre explicitement marqué de la home. Il ne perturbe plus
// tous les intertitres et reste désactivé avec prefers-reduced-motion.
export default function GlitchController() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const titles = Array.from(
      document.querySelectorAll<HTMLElement>("main h1[data-glitch]")
    );
    if (titles.length === 0) return;

    // Les copies RGB (::before/::after) lisent le texte via data-text.
    titles.forEach((el) => {
      const visibleTitle = el.querySelector<HTMLElement>(".title-text");
      el.setAttribute("data-text", visibleTitle?.textContent ?? "");
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

    const first = window.setTimeout(fireAll, 15000);
    const interval = window.setInterval(fireAll, 30000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(first);
      timers.forEach((t) => window.clearTimeout(t));
      titles.forEach((el) => {
        el.classList.remove("glitching", "glitch-title");
        el.removeAttribute("data-text");
      });
    };
  }, [pathname]);

  return null;
}
