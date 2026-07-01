"use client";

import { usePathname } from "next/navigation";

// Flou d'entrée sur TOUTE la page : au chargement / à l'arrivée sur le site ET à
// chaque changement de page. key={pathname} -> le sous-arbre remonte à chaque
// navigation, ce qui rejoue l'animation CSS page-blur-in.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}
