"use client";

import { useEffect, useState } from "react";

// Horloge live (jour · date · heure) en style nixie. Rendu client only :
// l'heure n'existe pas au build, on évite tout mismatch d'hydratation.
export default function NixieClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) {
    return (
      <time className="nixie-clock" suppressHydrationWarning>
        --- -- --- ---- · --:--:--
      </time>
    );
  }

  const date = new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(now);
  const time = new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(now);

  return (
    <time className="nixie-clock" dateTime={now.toISOString()} suppressHydrationWarning>
      {date} · {time}
    </time>
  );
}
