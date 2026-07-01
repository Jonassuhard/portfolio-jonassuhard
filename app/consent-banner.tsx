"use client";

import { useEffect, useState } from "react";

// Microsoft Clarity : chargé UNIQUEMENT après consentement explicite (RGPD/CNIL).
// Aucun cookie ni enregistrement de session avant le clic « Accepter ».
const KEY = "js-consent";
const CLARITY_ID = "xfjx6pbupc";

function loadClarity() {
  const w = window as unknown as Record<string, any>;
  if (w.__clarityLoaded) return;
  w.__clarityLoaded = true;
  w.clarity =
    w.clarity ||
    function () {
      (w.clarity.q = w.clarity.q || []).push(arguments);
    };
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.clarity.ms/tag/" + CLARITY_ID;
  const first = document.getElementsByTagName("script")[0];
  if (first && first.parentNode) first.parentNode.insertBefore(s, first);
  else document.head.appendChild(s);
  w.clarity("consent");
}

export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let choice: string | null = null;
    try {
      choice = localStorage.getItem(KEY);
    } catch {
      /* localStorage indisponible */
    }
    if (choice === "granted") {
      loadClarity();
    } else if (choice !== "denied") {
      setShow(true);
    }

    // Le lien « Gérer les cookies » du footer rouvre la bannière (droit de retrait).
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest("[data-open-consent]")) {
        e.preventDefault();
        setShow(true);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  function decide(value: "granted" | "denied") {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    if (value === "granted") loadClarity();
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="consent" role="dialog" aria-label="Consentement aux cookies de mesure d'audience">
      <div className="consent-inner">
        <p className="consent-text">
          Ce site peut mesurer son audience avec Microsoft Clarity (cookies et relecture anonyme de
          la navigation) pour voir comment ses pages sont lues. Rien ne se charge tant que vous
          n'avez pas accepté. <a href="/confidentialite">En savoir plus</a>.
        </p>
        <div className="consent-actions">
          <button type="button" className="button" onClick={() => decide("denied")}>
            Refuser
          </button>
          <button type="button" className="button primary" onClick={() => decide("granted")}>
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
