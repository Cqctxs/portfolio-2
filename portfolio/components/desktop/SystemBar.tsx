"use client";

import { useEffect, useState } from "react";

function formatTime(date: Date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function SystemBar() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-center justify-between bg-black/70 px-6 py-2 text-[11px] uppercase tracking-[0.18em] text-white">
      <span className="pointer-events-auto">
        menu
      </span>
      <span className="pointer-events-auto">{formatTime(now)}</span>
    </footer>
  );
}
