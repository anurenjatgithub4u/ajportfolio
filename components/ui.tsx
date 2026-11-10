import Link from "next/link";
import Magnetic from "./motion/Magnetic";

// Text that rolls up to a copy of itself when its .group parent is hovered.
export function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}

type ButtonProps = { href: string; children: string; variant?: "solid" | "ghost"; download?: string; external?: boolean };

export function Button({ href, children, variant = "solid", download, external }: ButtonProps) {
  const cls =
    variant === "solid"
      ? "group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3.5 text-[15px] font-medium text-ink transition-colors hover:bg-white"
      : "group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-[15px] font-medium text-fg transition-colors hover:border-fg/40";
  const inner = (
    <>
      <Roll>{children}</Roll>
      <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-0.5">
        {variant === "solid" ? "→" : "↓"}
      </span>
    </>
  );
  return (
    <Magnetic>
      {download || external ? (
        <a href={href} download={download} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className={cls}>
          {inner}
        </a>
      ) : (
        <Link href={href} className={cls}>
          {inner}
        </Link>
      )}
    </Magnetic>
  );
}

// "(01)  Label" eyebrow used to open every section.
export function Eyebrow({ index, children }: { index?: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
      {index && <span className="text-fg">({index})</span>}
      <span>{children}</span>
    </p>
  );
}

export const container = "mx-auto w-full max-w-[1240px] px-4 sm:px-8";
