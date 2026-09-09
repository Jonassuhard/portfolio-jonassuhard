"use client";

import { useEffect } from "react";

const MIN_DELAY = 5000;
const MAX_DELAY = 10000;
const BURST_DURATION = 700;

function randomDelay() {
  return MIN_DELAY + Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1));
}

export default function GlitchScheduler() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let stopped = false;
    let active: HTMLElement | null = null;
    let startTimer = 0;
    let finishTimer = 0;

    const schedule = () => {
      if (stopped) return;
      startTimer = window.setTimeout(() => {
        const headings = Array.from(document.querySelectorAll<HTMLElement>("h1, h2"));
        const candidates = headings.filter((heading) => heading !== active);
        const next = candidates[Math.floor(Math.random() * candidates.length)];

        if (!next) {
          schedule();
          return;
        }

        active = next;
        active.classList.add("glitch-active");
        finishTimer = window.setTimeout(() => {
          active?.classList.remove("glitch-active");
          active = null;
          schedule();
        }, BURST_DURATION);
      }, randomDelay());
    };

    schedule();
    return () => {
      stopped = true;
      window.clearTimeout(startTimer);
      window.clearTimeout(finishTimer);
      active?.classList.remove("glitch-active");
    };
  }, []);

  return null;
}
