"use client";

import { useEffect } from "react";

const MIN_DELAY = 5000;
const MAX_DELAY = 10000;
const BURST_DURATION = 1200;

function randomDelay() {
  return MIN_DELAY + Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1));
}

export default function GlitchScheduler() {
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let stopped = false;
    let active: HTMLElement | null = null;
    let previous: HTMLElement | null = null;
    let startTimer = 0;
    let finishTimer = 0;

    const schedule = () => {
      if (stopped || motion.matches || document.hidden) return;
      startTimer = window.setTimeout(() => {
        const headings = Array.from(document.querySelectorAll<HTMLElement>("h1, h2"));
        const visible = headings.filter((heading) => {
          const bounds = heading.getBoundingClientRect();
          const style = getComputedStyle(heading);
          return bounds.width > 0 && bounds.height > 0 && bounds.top >= 0 &&
            bounds.bottom <= window.innerHeight && style.visibility === "visible" &&
            style.opacity !== "0";
        });
        const candidates = visible.length > 1 ? visible.filter((heading) => heading !== previous) : visible;
        const next = candidates[Math.floor(Math.random() * candidates.length)];

        if (!next) {
          schedule();
          return;
        }

        active = next;
        previous = next;
        active.classList.add("glitch-active");
        finishTimer = window.setTimeout(() => {
          active?.classList.remove("glitch-active");
          active = null;
          schedule();
        }, BURST_DURATION);
      }, randomDelay());
    };

    const reset = () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(finishTimer);
      active?.classList.remove("glitch-active");
      active = null;
      schedule();
    };
    motion.addEventListener("change", reset);
    document.addEventListener("visibilitychange", reset);
    schedule();
    return () => {
      stopped = true;
      window.clearTimeout(startTimer);
      window.clearTimeout(finishTimer);
      active?.classList.remove("glitch-active");
      motion.removeEventListener("change", reset);
      document.removeEventListener("visibilitychange", reset);
    };
  }, []);

  return null;
}
