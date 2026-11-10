"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { profile, featured, projects, heroScreens } from "@/lib/data";
import Phone from "./Phone";

const chips = [
  { label: "React Native", className: "left-0 top-[18%]" },
  { label: "Expo · EAS", className: "right-0 top-[8%]" },
  { label: "Figma → Code", className: "left-[4%] bottom-[16%]" },
  { label: "iOS + Android", className: "right-[2%] bottom-[26%]" },
];

export default function Hero() {
  const reduce = useReducedMotion();
  // Hero phones come from heroScreens in lib/data.ts; fall back to the first real screenshots.
  const real = featured.flatMap((p) => p.screenshots.map((src) => ({ ...p, screenshots: [src] })));
  const picked = heroScreens
    .map(({ slug, shot }) => projects.find((p) => p.slug === slug && p.screenshots[shot]))
    .map((p, i) => (p ? { ...p, screenshots: [p.screenshots[heroScreens[i].shot]] } : undefined));
  const a = picked[0] ?? real[0] ?? featured[0];
  const b = picked[1] ?? real[1] ?? featured[1] ?? featured[0];
  const float = (d: number) =>
    reduce ? {} : { animate: { y: [0, -14, 0] }, transition: { duration: 6, delay: d, repeat: Infinity, ease: "easeInOut" as const } };

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pb-28">
        <div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-panel/80 px-3 py-1.5 font-mono text-xs text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for new roles · {profile.location}
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-[2.6rem] font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {profile.headline.split(" ").slice(0, -2).join(" ")}{" "}
            <span className="text-gradient">{profile.headline.split(" ").slice(-2).join(" ")}</span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            <span className="text-fg">{profile.role}.</span> {profile.intro}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link href="#work" className="rounded-full bg-accent px-6 py-3 font-semibold text-ink transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_var(--color-accent)]">
              See my work
            </Link>
            <a href={profile.cvUrl} download="Anurenj-CV.pdf" className="rounded-full border border-line px-6 py-3 font-semibold transition hover:border-white/40">
              Download CV
            </a>
          </motion.div>
        </div>

        <div className="relative mx-auto h-[440px] w-full max-w-[460px] sm:h-[520px]">
          <motion.div {...float(0)} className="absolute left-[8%] top-6 w-[46%] -rotate-6 sm:w-[44%]">
            <Phone src={a?.screenshots[0]} bare={a?.storeGraphics} accent={a?.accent} seed={0} priority />
          </motion.div>
          <motion.div {...float(1.2)} className="absolute right-[6%] top-16 w-[46%] rotate-6 sm:w-[44%]">
            <Phone src={b?.screenshots[0]} bare={b?.storeGraphics} accent={b?.accent} seed={1} priority />
          </motion.div>
          {chips.map((c, i) => (
            <motion.span
              key={c.label}
              initial={reduce ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.12 }}
              className={`absolute z-10 rounded-full border border-white/10 bg-panel/90 px-3 py-1.5 font-mono text-[11px] text-fg shadow-lg backdrop-blur ${c.className}`}
            >
              {c.label}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
