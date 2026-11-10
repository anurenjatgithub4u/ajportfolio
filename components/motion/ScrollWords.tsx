"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

// A paragraph whose words light up one by one as it scrolls through the viewport.
// Wrap a word in *asterisks* to set it in the serif italic.
export default function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const em = w.startsWith("*");
        const clean = w.replace(/\*/g, "");
        return (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} still={!!reduce} em={em}>
            {clean}
          </Word>
        );
      })}
    </p>
  );
}

function Word({ children, progress, range, still, em }: { children: string; progress: MotionValue<number>; range: [number, number]; still: boolean; em: boolean }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <>
      <motion.span style={still ? undefined : { opacity }} className={em ? "font-serif italic text-accent" : undefined}>
        {children}
      </motion.span>{" "}
    </>
  );
}
