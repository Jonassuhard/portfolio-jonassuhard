"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

// Parent de retour pour les sous-pages (projet / knowledge). null sur les pages de 1er niveau.
function backTarget(pathname: string | null): string | null {
  if (!pathname) return null;
  if (pathname.startsWith("/projets/")) return "/projets";
  if (pathname.startsWith("/knowledge/")) return "/knowledge";
  return null;
}

// Barre de navigation avec menu burger sur mobile (dans la DA : cadre ink, dépliant cream).
export default function SiteNav({ name, role }: { name: string; role: string }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);
  const pathname = usePathname();
  const parent = backTarget(pathname);

  return (
    <div className="menubar" onKeyDown={(event) => {
      if (event.key === "Escape" && open) {
        close();
        toggle.current?.focus();
      }
    }}>
      <Link className="brand" href="/" aria-label="Accueil Jonas Suhard" prefetch={false} onClick={close}>
        <span className="brand-name">{name}</span>
        <span className="brand-role">{role}</span>
      </Link>
      {parent ? (
        <Link className="nav-back" href={parent} aria-label="Retour" prefetch={false} onClick={close}>
          ←
        </Link>
      ) : null}
      <button
        ref={toggle}
        type="button"
        className="nav-toggle"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        aria-controls="main-navigation"
        onClick={(event) => {
          // Safari does not focus buttons on pointer activation.
          event.currentTarget.focus();
          setOpen((v) => !v);
        }}
      >
        <span />
        <span />
        <span />
      </button>
      <nav id="main-navigation" className={open ? "main-nav open" : "main-nav"} aria-label="Navigation principale">
        <Link href="/recruteurs" prefetch={false} onClick={close} aria-current={pathname === "/recruteurs" ? "page" : undefined}>Recruteurs</Link>
        <Link href="/projets" prefetch={false} onClick={close} aria-current={pathname?.startsWith("/projets") ? "page" : undefined}>Projets</Link>
        <Link href="/a-propos" prefetch={false} onClick={close} aria-current={pathname === "/a-propos" ? "page" : undefined}>À propos</Link>
        <Link href="/contact" prefetch={false} onClick={close} aria-current={pathname === "/contact" ? "page" : undefined}>Contact</Link>
      </nav>
    </div>
  );
}
