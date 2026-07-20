"use client";

import { usePathname } from "next/navigation";

// Transition courte sans flou : le contenu reste lisible dès le premier frame.
// key={pathname} rejoue uniquement le léger fondu lors d'une navigation.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}
