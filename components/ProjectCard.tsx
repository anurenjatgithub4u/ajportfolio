import Link from "next/link";
import type { Project } from "@/lib/data";
import Phone from "./Phone";
import StoreLinks from "./StoreLinks";
import Reveal from "./Reveal";

export function FeaturedProject({ p, index }: { p: Project; index: number }) {
  const flip = index % 2 === 1;
  return (
    <Reveal>
      <article
        className="group relative overflow-hidden rounded-[2rem] border border-line bg-panel"
        style={{ backgroundImage: `radial-gradient(ellipse 60% 80% at ${flip ? "10%" : "90%"} 50%, ${p.accent}1f, transparent 70%)` }}
      >
        <div className={`grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:p-14 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em]" style={{ color: p.accent }}>
              Case study {String(index + 1).padStart(2, "0")} · {p.category}
            </p>
            <h3 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">{p.name}</h3>
            <p className="mt-3 text-lg text-muted">{p.tagline}</p>

            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-muted">Role</dt>
                <dd className="mt-1">{p.role}</dd>
              </div>
              <div>
                <dt className="text-muted">Platforms</dt>
                <dd className="mt-1">{p.platforms.join(" · ")}</dd>
              </div>
            </dl>

            <ul className="mt-6 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li key={s} className="rounded-full border border-line bg-ink/60 px-3 py-1 text-xs text-muted">
                  {s}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={`/work/${p.slug}`}
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5"
                style={{ background: p.accent }}
              >
                Read case study →
              </Link>
              <StoreLinks links={p.links} />
            </div>
          </div>

          <Link href={`/work/${p.slug}`} aria-label={`${p.name} case study`} className="relative mx-auto flex w-full max-w-[420px] justify-center gap-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-1/3 transition duration-500 ${i === 1 ? "-translate-y-6 group-hover:-translate-y-9" : "translate-y-4 group-hover:translate-y-2"}`}
              >
                <Phone bare={p.storeGraphics} src={p.screenshots[i]} alt={`${p.name} screen ${i + 1}`} accent={p.accent} seed={i + index} />
              </div>
            ))}
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

export function SmallProject({ p, index }: { p: Project; index: number }) {
  return (
    <Reveal delay={index * 0.08}>
      <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-panel transition hover:border-white/20">
        <div
          className="relative flex h-72 items-end justify-center gap-3 overflow-hidden px-6 pt-8"
          style={{ background: `radial-gradient(ellipse 80% 90% at 50% 100%, ${p.accent}33, transparent 70%)` }}
        >
          {(p.screenshots.length >= 2 ? [0, 1] : [0]).map((i) => (
            <div
              key={i}
              className={`w-[38%] shrink-0 translate-y-10 transition duration-500 group-hover:translate-y-6 ${i === 1 ? "mb-6" : ""}`}
            >
              <Phone bare={p.storeGraphics} src={p.screenshots[i]} alt={`${p.name} screen ${i + 1}`} accent={p.accent} seed={index + i} />
            </div>
          ))}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: p.accent }}>
            {p.category}
          </p>
          <h3 className="mt-2 font-display text-xl font-bold">{p.name}</h3>
          <p className="mt-2 text-sm text-muted">{p.tagline}</p>
          <p className="mt-3 text-xs text-muted">{p.stack.join(" · ")}</p>
          <div className="mt-auto pt-4">
            <StoreLinks links={p.links} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}
