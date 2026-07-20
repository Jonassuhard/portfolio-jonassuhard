"use client";

import { useEffect, useState } from "react";

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "short",
  day: "2-digit",
  month: "short",
  year: "numeric"
});
const timeFormatter = new Intl.DateTimeFormat("fr-FR", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
});

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
        lun. 00 sept. 0000 · 00:00:00
      </time>
    );
  }

  const date = dateFormatter.format(now);
  const time = timeFormatter.format(now);

  return (
    <time className="nixie-clock" dateTime={now.toISOString()} suppressHydrationWarning>
      {date} · {time}
    </time>
  );
}
