"use client";

import Link from "next/link";
import { useState } from "react";

// Barre de navigation avec menu burger sur mobile (dans la DA : cadre ink, dépliant cream).
export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="menubar">
      <Link className="brand" href="/" aria-label="Accueil Jonas Suhard" onClick={close}>
        <img className="brand-mark" src="/brand/js-medallion-sm.webp" alt="Jonas Suhard" width={36} height={36} />
      </Link>
      <button
        type="button"
        className="nav-toggle"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={open ? "main-nav open" : "main-nav"} aria-label="Navigation principale">
        <Link href="/recruteurs" onClick={close}>Recruteurs</Link>
        <Link href="/projets" onClick={close}>Projets</Link>
        <Link href="/competences" onClick={close}>Compétences</Link>
        <Link href="/a-propos" onClick={close}>À propos</Link>
        <a href="/cv.pdf" onClick={close}>CV</a>
      </nav>
    </div>
  );
}
