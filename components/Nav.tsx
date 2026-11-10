"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { profile } from "@/lib/data";
import { Roll } from "./ui";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#process", label: "Process" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

function useLocalTime() {
  const [t, setT] = useState<string | null>(null);
  useEffect(() => {
    const fmt = () => new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }).format(new Date());
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 30_000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const time = useLocalTime();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160);
    setSolid(y > 24);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid ? "border-b border-line/70 bg-ink/75 backdrop-blur-xl" : "border-b border-transparent"}`}
    >
      <nav className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-4 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${profile.name}, home`}>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-fg text-[12px] font-semibold tracking-tight text-ink">{profile.initials}</span>
          <span className="text-[15px] font-medium tracking-tight">
            <Roll>{profile.name}</Roll>
          </span>
        </Link>

        <div className="hidden items-center gap-2 font-mono text-[12px] text-muted lg:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3ddc84]" aria-hidden />
          <span>Available for work</span>
          {time && <span className="text-fg/70">· India {time} IST</span>}
        </div>

        <ul className="flex items-center gap-5 text-[14px] sm:gap-7">
          {links.map((l) => (
            <li key={l.href} className={l.label === "Process" || l.label === "About" ? "hidden sm:block" : ""}>
              <Link href={l.href} className="group text-fg/75 transition-colors hover:text-fg">
                <Roll>{l.label}</Roll>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
