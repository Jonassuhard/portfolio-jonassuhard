"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Parent de retour pour les sous-pages (projet / knowledge). null sur les pages de 1er niveau.
function backTarget(pathname: string | null): string | null {
  if (!pathname) return null;
  if (pathname.startsWith("/projets/")) return "/projets";
  if (pathname.startsWith("/knowledge/")) return "/knowledge";
  return null;
}

// Barre de navigation avec menu burger sur mobile (dans la DA : cadre ink, dépliant cream).
export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const parent = backTarget(usePathname());

  return (
    <div className="menubar">
      <Link className="brand" href="/" aria-label="Accueil Jonas Suhard" onClick={close}>
        <img className="brand-mark" src="/brand/js-medallion-sm.webp" alt="Jonas Suhard" width={36} height={36} />
      </Link>
      {parent ? (
        <Link className="nav-back" href={parent} aria-label="Retour" onClick={close}>
          ←
        </Link>
      ) : null}
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
        <Link href="/methode" onClick={close}>Méthode</Link>
        <Link href="/a-propos" onClick={close}>À propos</Link>
      </nav>
    </div>
  );
}
