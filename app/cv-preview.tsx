"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Cv = "cv" | "cv-portfolio";

export default function CvPreview() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLAnchorElement | null>(null);
  const close = useRef<HTMLButtonElement>(null);
  const [cv, setCv] = useState<Cv | null>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!link || link.closest(".cv-preview-dialog") || !dialog.current?.showModal) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || !["/cv.pdf", "/cv-portfolio.pdf"].includes(url.pathname)) return;
      event.preventDefault();
      trigger.current = link;
      setCv(url.pathname === "/cv.pdf" ? "cv" : "cv-portfolio");
      dialog.current.showModal();
      close.current?.focus();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => { dialog.current?.close(); setCv(null); }, [pathname]);
  useEffect(() => {
    if (!cv) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [cv]);

  const title = cv === "cv-portfolio" ? "CV illustré" : "CV classique";
  return (
    <dialog ref={dialog} className="cv-preview-dialog" aria-labelledby="cv-preview-title"
      onClose={() => { setCv(null); trigger.current?.focus({ preventScroll: true }); }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const box = event.currentTarget.getBoundingClientRect();
        if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.current?.close();
      }}>
      <div className="cv-preview-toolbar">
        <strong id="cv-preview-title">{title}</strong>
        <button ref={close} type="button" aria-label="Fermer l’aperçu du CV" title="Fermer"
          onClick={() => dialog.current?.close()}>×</button>
        {cv && <div className="cv-preview-actions">
          <a className="button primary" href={`/${cv}.pdf`} download>Télécharger</a>
          <a className="lk" href={`/${cv}.pdf`} target="_blank" rel="noreferrer">Ouvrir le PDF</a>
          <a className="lk" href="/cv.md" target="_blank" rel="noreferrer">Version texte</a>
        </div>}
      </div>
      {cv && <div className="cv-preview-document">
        <img src={`/${cv}-preview.jpg`} alt={`${title} de Jonas Suhard. Contenu accessible via le lien Version texte.`} width="1273" height="1800" />
      </div>}
    </dialog>
  );
}
