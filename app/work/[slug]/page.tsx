import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { featured, profile } from "@/lib/data";
import Phone from "@/components/Phone";
import Reveal from "@/components/Reveal";
import StoreLinks from "@/components/StoreLinks";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return featured.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = featured.find((x) => x.slug === slug);
  return p ? { title: `${p.name} — Case study · ${profile.name}`, description: p.tagline } : {};
}

function Block({ label, title, children, accent }: { label: string; title: string; children: React.ReactNode; accent: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal className="mb-10 grid gap-4 lg:grid-cols-[220px_1fr]">
        <p className="pt-2 font-mono text-xs uppercase tracking-[0.2em]" style={{ color: accent }}>
          {label}
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      </Reveal>
      <div className="lg:pl-[236px]">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const index = featured.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();
  const p = featured[index];
  const cs = p.caseStudy!;
  const next = featured[(index + 1) % featured.length];
  const shots = p.screenshots.length ? p.screenshots : [undefined, undefined, undefined, undefined];

  return (
    <article>
      {/* Header */}
      <header className="relative overflow-hidden pt-28 sm:pt-36">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[760px] -translate-x-1/2 rounded-full blur-[120px]" style={{ background: `${p.accent}26` }} />
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <Link href="/#work" className="text-sm text-muted hover:text-fg">
            ← All work
          </Link>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em]" style={{ color: p.accent }}>
            Case study · {p.category}
          </p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight sm:text-7xl">{p.name}</h1>
          <p className="mt-5 max-w-2xl text-xl text-muted">{p.tagline}</p>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-6 text-sm sm:grid-cols-4">
            {[
              ["Role", p.role],
              ["Timeline", cs.timeline],
              ["Platforms", p.platforms.join(" · ")],
              ["Year", p.year],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-muted">{k}</dt>
                <dd className="mt-1 font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6">
            <StoreLinks links={p.links} />
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-3 gap-4 sm:gap-8">
            {shots.slice(0, 3).map((src, i) => (
              <div key={i} className={i === 1 ? "-translate-y-8" : ""}>
                <Phone bare={p.storeGraphics} src={src} alt={`${p.name} screen ${i + 1}`} accent={p.accent} seed={i} priority />
              </div>
            ))}
          </div>
        </div>
      </header>

      <Block label="Overview" title="The short version" accent={p.accent}>
        <Reveal>
          <p className="max-w-3xl text-xl leading-relaxed">{cs.summary}</p>
        </Reveal>
      </Block>

      <Block label="Problem" title="What wasn't working" accent={p.accent}>
        <Reveal>
          <p className="max-w-3xl text-lg leading-relaxed text-muted">{cs.problem}</p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {cs.users.map((u, i) => (
            <Reveal key={u.name} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-line bg-panel p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full font-display font-bold text-ink" style={{ background: p.accent }}>
                    {u.name.replace("TODO: ", "").charAt(0)}
                  </span>
                  <h3 className="font-semibold">{u.name}</h3>
                </div>
                <p className="mt-4 text-muted">{u.need}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <ul className="mt-10 space-y-3">
            {cs.goals.map((g) => (
              <li key={g} className="flex gap-3 text-lg">
                <span style={{ color: p.accent }}>→</span>
                {g}
              </li>
            ))}
          </ul>
        </Reveal>
      </Block>

      <Block label="User flow" title="Mapping the journey" accent={p.accent}>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cs.flow.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <li className="relative h-full rounded-2xl border border-line bg-panel p-5">
                <span className="font-mono text-xs" style={{ color: p.accent }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted">{f.caption}</p>
                {i < cs.flow.length - 1 && (
                  <span aria-hidden className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-muted lg:block">
                    ›
                  </span>
                )}
              </li>
            </Reveal>
          ))}
        </ol>
      </Block>

      <Block label="Wireframes" title="Structure before style" accent={p.accent}>
        <div className="grid grid-cols-3 gap-4 sm:gap-8">
          {cs.wireframes.map((w, i) => (
            <Reveal key={w.caption} delay={i * 0.08}>
              <figure>
                {w.src ? (
                  <div className="relative aspect-[9/19.5] overflow-hidden rounded-3xl border border-line">
                    <Image src={w.src} alt={w.caption} fill sizes="(max-width: 768px) 33vw, 260px" className="object-cover" />
                  </div>
                ) : (
                  <Phone variant="wire" seed={i} />
                )}
                <figcaption className="mt-3 text-center text-xs text-muted sm:text-sm">{w.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Block>

      <Block label="Design decisions" title="Why it looks the way it does" accent={p.accent}>
        <div className="grid gap-4 sm:grid-cols-2">
          {cs.decisions.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-line bg-panel p-7">
                <h3 className="font-display text-xl font-bold">{d.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{d.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-6 rounded-3xl border border-line p-7">
            <h3 className="font-semibold">Accessibility &amp; trust</h3>
            <ul className="mt-4 grid gap-2 text-muted sm:grid-cols-2">
              {cs.accessibility.map((a) => (
                <li key={a} className="flex gap-2">
                  <span style={{ color: p.accent }}>✓</span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Block>

      <section className="border-y border-line bg-panel/40 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mb-12 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: p.accent }}>
              Final UI
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">The shipped app</h2>
          </Reveal>
          <div className={`mx-auto grid grid-cols-2 gap-6 ${shots.length % 3 === 0 ? "max-w-4xl sm:grid-cols-3" : "sm:grid-cols-4"}`}>
            {shots.map((src, i) => (
              <Reveal key={i} delay={i * 0.06} className={i % 2 ? "sm:translate-y-10" : ""}>
                <Phone bare={p.storeGraphics} src={src} alt={`${p.name} screen ${i + 1}`} accent={p.accent} seed={i + 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Block label="Engineering" title="How it was built" accent={p.accent}>
        <ul className="mb-8 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <li key={s} className="rounded-full border border-line bg-panel px-3 py-1.5 text-sm">
              {s}
            </li>
          ))}
        </ul>
        <div className="grid gap-4 sm:grid-cols-2">
          {cs.engineering.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-line bg-panel p-7">
                <h3 className="font-display text-xl font-bold">{e.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{e.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Block>

      <Block label="Outcome" title="What happened next" accent={p.accent}>
        {p.metrics && (
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {p.metrics.map((m) => (
              <div key={m.label} className="rounded-3xl border border-line bg-panel p-6">
                <p className="font-display text-3xl font-bold" style={{ color: p.accent }}>
                  {m.value}
                </p>
                <p className="mt-1 text-sm text-muted">{m.label}</p>
              </div>
            ))}
          </div>
        )}
        <Reveal>
          <p className="max-w-3xl text-xl leading-relaxed">{cs.outcome}</p>
        </Reveal>
      </Block>

      {next.slug !== p.slug && (
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <Link
            href={`/work/${next.slug}`}
            className="group flex items-center justify-between gap-6 rounded-[2rem] border border-line bg-panel p-8 transition hover:border-white/25 sm:p-12"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Next case study</p>
              <p className="mt-3 font-display text-3xl font-bold sm:text-5xl">{next.name}</p>
            </div>
            <span className="text-4xl transition group-hover:translate-x-2" style={{ color: next.accent }}>
              →
            </span>
          </Link>
        </section>
      )}
    </article>
  );
}
