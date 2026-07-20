"use client";

import { useEffect, useState } from "react";

// Microsoft Clarity : chargé UNIQUEMENT après consentement explicite (RGPD/CNIL).
// Aucun cookie ni enregistrement de session avant le clic « Accepter ».
const KEY = "js-consent";
const CLARITY_ID = "xfjx6pbupc";

const clarityConsent = {
  granted: { ad_Storage: "denied", analytics_Storage: "granted" },
  denied: { ad_Storage: "denied", analytics_Storage: "denied" }
} as const;

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
  w.clarity("consentv2", clarityConsent.granted);
}

function revokeClarity() {
  const w = window as unknown as Record<string, any>;
  if (typeof w.clarity !== "function" || !w.__clarityLoaded) return false;

  // Consent V2 coupe le stockage analytique et publicitaire. L'appel V1 avec
  // false reste la commande documentée par Microsoft pour effacer les cookies
  // Clarity existants ; le rechargement retire ensuite entièrement le script.
  w.clarity("consentv2", clarityConsent.denied);
  w.clarity("consent", false);
  return true;
}

export default function ConsentBanner() {
  const [show, setShow] = useState(false);
  const [detail, setDetail] = useState(false);

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
    if (value === "granted") {
      loadClarity();
    } else if (revokeClarity()) {
      window.location.reload();
      return;
    }
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="consent" role="region" aria-labelledby="consent-title">
      <div className="consent-inner">
        <p className="consent-text" id="consent-title">
          Microsoft Clarity peut mesurer la lecture des pages. Clarity ne se charge qu'après votre accord.{" "}
          <button
            type="button"
            className="consent-toggle"
            aria-expanded={detail}
            onClick={() => setDetail((v) => !v)}
          >
            {detail ? "Masquer le détail" : "Voir le détail"}
          </button>
        </p>
        <div className="consent-actions">
          <button type="button" className="button" onClick={() => decide("denied")}>
            Refuser
          </button>
          <button type="button" className="button primary" onClick={() => decide("granted")}>
            Accepter
          </button>
        </div>
        {detail ? (
          <p className="consent-detail">
            Microsoft Clarity utilise des cookies analytiques et une relecture de navigation pour
            comprendre les parcours. Vercel fournit séparément des mesures techniques agrégées.
            Aucun cookie publicitaire, aucune revente de données. Vous pouvez revenir sur ce choix
            via « Gérer les cookies » en bas de page. <a href="/confidentialite">Politique de confidentialité</a>.
          </p>
        ) : null}
      </div>
    </div>
  );
}
