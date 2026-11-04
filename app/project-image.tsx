"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";

type ProjectImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  quality?: number;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  className?: string;
};

export default function ProjectImage({
  src, alt, width, height, sizes, quality = 78, loading = "lazy", fetchPriority, className
}: ProjectImageProps) {
  const trigger = useRef<HTMLAnchorElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const originalLink = useRef<HTMLAnchorElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [expanded]);

  const open = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!dialog.current?.showModal) return;
    event.preventDefault();
    setExpanded(true);
    dialog.current.showModal();
    closeButton.current?.focus();
  };

  return (
    <>
      <a ref={trigger} className="project-image-link" href={src} onClick={open}
        aria-label={`Agrandir : ${alt}`} title="Agrandir l'image">
        <Image src={src} alt={alt} width={width} height={height} sizes={sizes}
          quality={quality} loading={loading} fetchPriority={fetchPriority} className={className} />
        <span className="image-zoom-mark" aria-hidden="true">+</span>
      </a>
      <dialog ref={dialog} className="project-image-dialog" aria-label={alt}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          if (event.shiftKey && document.activeElement === originalLink.current) {
            event.preventDefault();
            closeButton.current?.focus();
          } else if (!event.shiftKey && document.activeElement === closeButton.current) {
            event.preventDefault();
            originalLink.current?.focus();
          }
        }}
        onClose={() => {
          setExpanded(false);
          trigger.current?.focus({ preventScroll: true });
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const box = event.currentTarget.getBoundingClientRect();
          if (event.clientX < box.left || event.clientX > box.right ||
              event.clientY < box.top || event.clientY > box.bottom) {
            event.currentTarget.close();
          }
        }}>
        <div className="image-dialog-toolbar">
          <a ref={originalLink} href={src} target="_blank" rel="noreferrer">Image originale</a>
          <button ref={closeButton} type="button" aria-label="Fermer l'image" title="Fermer l'image"
            onClick={() => dialog.current?.close()}>×</button>
        </div>
        {expanded ? (
          <Image src={src} alt={alt} width={width} height={height} unoptimized
            className="image-original" />
        ) : null}
        <p>{alt}</p>
      </dialog>
    </>
  );
}
