"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { profile, featured, projects, heroScreens } from "@/lib/data";
import Phone from "./Phone";
import MaskLines from "./motion/MaskLines";
import RotatingWord from "./motion/RotatingWord";
import { Button, container } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();

  // Hero phones come from heroScreens in lib/data.ts; fall back to the first real screenshots.
  const real = featured.flatMap((p) => p.screenshots.map((src) => ({ ...p, screenshots: [src] })));
  const picked = heroScreens
    .map(({ slug, shot }) => projects.find((p) => p.slug === slug && p.screenshots[shot]))
    .map((p, i) => (p ? { ...p, screenshots: [p.screenshots[heroScreens[i].shot]] } : undefined));
  const a = picked[0] ?? real[0] ?? featured[0];
  const b = picked[1] ?? real[1] ?? featured[1] ?? featured[0];

  // Pointer parallax for the phones.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const ax = useTransform(sx, (v) => v * -18);
  const ay = useTransform(sy, (v) => v * -12);
  const bx = useTransform(sx, (v) => v * 26);
  const by = useTransform(sy, (v) => v * 18);

  const fade = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: d, ease },
  });

  return (
    <section
      className="relative pt-28 sm:pt-36"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      <div className={container}>
        <motion.div {...fade(0.05)} className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
          <span>{profile.role}</span>
          <span className="hidden h-px w-10 bg-line sm:block" />
          <span>{profile.location}</span>
        </motion.div>

        <div className="mt-8 grid items-end gap-12 lg:grid-cols-12">
          <h1 className="text-[clamp(2.6rem,7.4vw,6.4rem)] font-medium leading-[0.94] tracking-[-0.045em] lg:col-span-8">
            <MaskLines
              immediate
              delay={0.12}
              lines={[
                "I design and build",
                "mobile apps that",
                <span key="l1">
                  feel{" "}
                  <RotatingWord words={["obvious.", "calm.", "fast.", "trustworthy."]} className="font-serif font-normal italic tracking-[-0.02em] text-accent" />
                </span>,
              ]}
            />
          </h1>

          <div className="relative mx-auto h-[380px] w-full max-w-[420px] sm:h-[460px] lg:col-span-4 lg:mr-0">
            <motion.div style={{ x: ax, y: ay }} className="absolute left-[4%] top-0 w-[50%]">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 60, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: -6 }}
                transition={{ duration: 1.3, delay: 0.35, ease }}
              >
                <Phone src={a?.screenshots[0]} bare={a?.storeGraphics} accent={a?.accent} alt={`${a?.name} app screen`} seed={0} priority />
              </motion.div>
            </motion.div>
            <motion.div style={{ x: bx, y: by }} className="absolute right-[2%] top-[14%] w-[50%]">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 80, rotate: 2 }}
                animate={{ opacity: 1, y: 0, rotate: 5 }}
                transition={{ duration: 1.3, delay: 0.5, ease }}
              >
                <Phone src={b?.screenshots[0]} bare={b?.storeGraphics} accent={b?.accent} alt={`${b?.name} app screen`} seed={1} priority />
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="mt-14 grid gap-8 border-t border-line pt-8 sm:grid-cols-12 sm:items-start">
          <motion.p {...fade(0.7)} className="max-w-[34rem] text-[17px] leading-relaxed text-muted sm:col-span-7">
            {profile.intro}
          </motion.p>
          <motion.div {...fade(0.8)} className="flex flex-wrap gap-3 sm:col-span-5 sm:justify-end">
            <Button href="/#work">See selected work</Button>
            <Button href={profile.cvUrl} variant="ghost" download="Anurenj-CV.pdf">
              Download CV
            </Button>
          </motion.div>
        </div>

        <motion.dl {...fade(0.9)} className="mt-14 grid grid-cols-3 gap-4 border-t border-line pt-6">
          {[
            { k: String(projects.length), v: "apps live on Google Play and the App Store" },
            { k: profile.stats[0].value, v: "years designing and shipping mobile products" },
            { k: "1", v: "codebase for iOS and Android, built in React Native" },
          ].map((s) => (
            <div key={s.v}>
              <dt className="text-[clamp(1.75rem,4vw,3rem)] font-medium leading-none tracking-[-0.04em]">{s.k}</dt>
              <dd className="mt-2 max-w-[16rem] text-[13px] leading-snug text-muted sm:text-sm">{s.v}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
