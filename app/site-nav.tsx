"use client";

import Link from "next/link";
import Image from "next/image";
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
      <Link className="brand" href="/" aria-label="Accueil Jonas Suhard" prefetch={false} onClick={close}>
        <Image
          className="brand-mark"
          src="/brand/js-medallion-sm.webp"
          alt="Jonas Suhard"
          width={36}
          height={36}
          sizes="36px"
          quality={85}
        />
      </Link>
      {parent ? (
        <Link className="nav-back" href={parent} aria-label="Retour" prefetch={false} onClick={close}>
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
        <Link href="/recruteurs" prefetch={false} onClick={close}>Recruteurs</Link>
        <Link href="/projets" prefetch={false} onClick={close}>Projets</Link>
        <Link href="/competences" prefetch={false} onClick={close}>Compétences</Link>
        <Link href="/methode" prefetch={false} onClick={close}>Méthode</Link>
        <Link href="/preuves" prefetch={false} onClick={close}>Preuves</Link>
        <Link href="/a-propos" prefetch={false} onClick={close}>À propos</Link>
      </nav>
    </div>
  );
}
