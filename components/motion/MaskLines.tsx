"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

// Each line slides up from behind a mask. Animates on mount (immediate) or when scrolled into view.
export default function MaskLines({
  lines,
  className = "",
  delay = 0,
  stagger = 0.09,
  immediate = false,
}: {
  lines: React.ReactNode[];
  className?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const trigger = immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "-12% 0px" } };
  return (
    <motion.span className={`block ${className}`} initial={reduce ? false : "hide"} {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
          <motion.span
            className="block"
            variants={{ hide: { y: "108%" }, show: { y: "0%", transition: { duration: 1.05, delay: delay + i * stagger, ease } } }}
          >
            {line}
          </motion.span>
          {i < lines.length - 1 && " "}
        </span>
      ))}
    </motion.span>
  );
}
