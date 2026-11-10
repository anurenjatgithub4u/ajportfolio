"use client";

import { useEffect, useState } from "react";

export default function LocalTime({ zone = "Asia/Kolkata", label = "IST" }: { zone?: string; label?: string }) {
  const [t, setT] = useState<string | null>(null);
  useEffect(() => {
    const fmt = () => new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: zone }).format(new Date());
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 30_000);
    return () => clearInterval(id);
  }, [zone]);
  return <span suppressHydrationWarning>{t ? `${t} ${label}` : "—"}</span>;
}
