"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Flou d'entrée sur TOUTE la page à chaque transition de route (1s).
// key={pathname} -> le sous-arbre remonte à chaque navigation et rejoue l'animation.
// Le premier chargement est volontairement exclu (first) : pas de flou sur le LCP
// du hero au boot, l'effet ne joue qu'aux transitions suivantes.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    first.current = false;
  }, []);

  return (
    <div key={pathname} className={first.current ? undefined : "page-transition"}>
      {children}
    </div>
  );
}
