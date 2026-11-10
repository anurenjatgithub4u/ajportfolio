"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { Project, StoreLinks } from "@/lib/data";
import Phone from "./Phone";
import Reveal from "./Reveal";

const tint = (accent: string, pct: number) => `color-mix(in oklab, ${accent} ${pct}%, #121213)`;

export function StoreText({ links }: { links: StoreLinks }) {
  const items = [
    links.appStore && { href: links.appStore, label: "App Store" },
    links.playStore && { href: links.playStore, label: "Google Play" },
    links.web && { href: links.web, label: "Website" },
  ].filter(Boolean) as { href: string; label: string }[];
  if (!items.length) return null;
  return (
    <span className="flex flex-wrap gap-x-5 gap-y-1">
      {items.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="link-u text-fg/85 hover:text-fg">
          {l.label} ↗
        </a>
      ))}
    </span>
  );
}

export function FeaturedProject({ p, index }: { p: Project; index: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const shots = [0, 1, 2];

  return (
    <article>
      <Reveal>
        <div className="grid gap-6 pb-7 sm:grid-cols-12 sm:items-end">
          <span className="font-mono text-[12px] text-muted sm:col-span-1">{String(index + 1).padStart(2, "0")}</span>
          <div className="sm:col-span-6">
            <h3 className="text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[0.95] tracking-[-0.045em]">{p.name}</h3>
            <p className="mt-3 max-w-md text-[16px] leading-relaxed text-muted">{p.tagline}</p>
          </div>
          <dl className="grid grid-cols-3 gap-4 text-[13px] sm:col-span-5">
            {[
              ["Field", p.category.split(" · ")[0]],
              ["Platform", p.platforms.join(", ")],
              ["Year", p.year],
            ].map(([k, v]) => (
              <div key={k} className="border-t border-line pt-3">
                <dt className="text-muted">{k}</dt>
                <dd className="mt-1 text-fg">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <Link
          ref={ref}
          href={`/work/${p.slug}`}
          aria-label={`Read the ${p.name} case study`}
          className="group relative block overflow-hidden rounded-[20px]"
          style={{ background: tint(p.accent, 16) }}
          onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
          onPointerLeave={() => setHover(false)}
          onPointerMove={(e) => {
            const r = ref.current?.getBoundingClientRect();
            if (!r) return;
            x.set(e.clientX - r.left);
            y.set(e.clientY - r.top);
          }}
        >
          <div className="flex aspect-[4/3.4] justify-center gap-[3.5%] px-[6%] pt-[9%] sm:aspect-[16/8.5] sm:px-[12%] sm:pt-[6%]">
            {shots.map((i) => (
              <div
                key={i}
                className={`w-[30%] shrink-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:w-[24%] ${
                  i === 1 ? "translate-y-[-3%] group-hover:translate-y-[-7%]" : "translate-y-[6%] group-hover:translate-y-[2%]"
                }`}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <Phone bare={p.storeGraphics} src={p.screenshots[i]} alt={`${p.name} screen ${i + 1}`} accent={p.accent} seed={i + index} />
              </div>
            ))}
          </div>

          {!reduce && (
            <motion.span
              aria-hidden
              style={{ x: sx, y: sy }}
              animate={{ scale: hover ? 1 : 0, opacity: hover ? 1 : 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute left-0 top-0 -ml-12 -mt-12 grid h-24 w-24 place-items-center rounded-full bg-fg text-center text-[13px] font-medium leading-tight text-ink"
            >
              View
              <br />
              case study
            </motion.span>
          )}
        </Link>
      </Reveal>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-[14px]">
        <span className="text-muted">{p.stack.join(", ")}</span>
        <span className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <StoreText links={p.links} />
          <Link href={`/work/${p.slug}`} className="link-u font-medium">
            Read case study →
          </Link>
        </span>
      </div>
    </article>
  );
}

export function SmallProject({ p, index }: { p: Project; index: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });
  const rotateX = useTransform(srx, (v) => `${v}deg`);
  const rotateY = useTransform(sry, (v) => `${v}deg`);

  return (
    <Reveal delay={index * 0.08}>
      <article className="group">
        <div style={{ perspective: 1000 }}>
          <motion.div
            ref={ref}
            style={reduce ? { background: tint(p.accent, 14) } : { rotateX, rotateY, background: tint(p.accent, 14) }}
            onPointerMove={(e) => {
              if (reduce || e.pointerType !== "mouse" || !ref.current) return;
              const r = ref.current.getBoundingClientRect();
              ry.set(((e.clientX - r.left) / r.width - 0.5) * 8);
              rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
            }}
            onPointerLeave={() => {
              rx.set(0);
              ry.set(0);
            }}
            className="relative flex aspect-[4/3.6] justify-center gap-[5%] overflow-hidden rounded-[18px] px-[10%] pt-[11%]"
          >
            {(p.screenshots.length >= 2 ? [0, 1] : [0]).map((i) => (
              <div
                key={i}
                className={`w-[40%] shrink-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  i === 1 ? "translate-y-[10%] group-hover:translate-y-[4%]" : "translate-y-[2%] group-hover:translate-y-[-2%]"
                }`}
              >
                <Phone bare={p.storeGraphics} src={p.screenshots[i]} alt={`${p.name} screen ${i + 1}`} accent={p.accent} seed={index + i} />
              </div>
            ))}
          </motion.div>
        </div>
        <div className="mt-5 flex items-baseline justify-between gap-4">
          <h3 className="text-[22px] font-medium tracking-[-0.03em]">{p.name}</h3>
          <span className="font-mono text-[12px] text-muted">{p.year}</span>
        </div>
        <p className="mt-1 text-[13px] text-muted">{p.category}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-fg/80">{p.tagline}</p>
        <div className="mt-4 text-[14px]">
          <StoreText links={p.links} />
        </div>
      </article>
    </Reveal>
  );
}
