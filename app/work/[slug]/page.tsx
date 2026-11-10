import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { featured, profile } from "@/lib/data";
import Phone from "@/components/Phone";
import Reveal from "@/components/Reveal";
import MaskLines from "@/components/motion/MaskLines";
import { StoreText } from "@/components/ProjectCard";
import { Eyebrow, container } from "@/components/ui";

type Params = { params: Promise<{ slug: string }> };

const tint = (accent: string, pct: number) => `color-mix(in oklab, ${accent} ${pct}%, #121213)`;

export function generateStaticParams() {
  return featured.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = featured.find((x) => x.slug === slug);
  return p ? { title: `${p.name} — Case study · ${profile.name}`, description: p.tagline } : {};
}

function Block({ n, label, title, children }: { n: string; label: string; title: string; children: React.ReactNode }) {
  return (
    <section className={`${container} border-t border-line py-20 sm:py-28`}>
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Eyebrow index={n}>{label}</Eyebrow>
        </div>
        <div className="lg:col-span-9">
          <h2 className="mb-10 text-[clamp(1.9rem,3.8vw,3.1rem)] font-medium leading-[1] tracking-[-0.04em]">
            <MaskLines lines={[title]} />
          </h2>
          {children}
        </div>
      </div>
    </section>
  );
}

function Rows({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="border-b border-line">
      {items.map((d, i) => (
        <Reveal key={d.title} delay={i * 0.05}>
          <div className="grid gap-3 border-t border-line py-7 sm:grid-cols-9">
            <h3 className="text-[19px] font-medium tracking-[-0.02em] sm:col-span-3">{d.title}</h3>
            <p className="text-[16px] leading-relaxed text-muted sm:col-span-6">{d.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
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
      <header className="pt-28 sm:pt-36">
        <div className={container}>
          <Link href="/#work" className="link-u font-mono text-[12px] uppercase tracking-[0.14em] text-muted hover:text-fg">
            ← All work
          </Link>
          <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Eyebrow index={String(index + 1).padStart(2, "0")}>Case study · {p.category}</Eyebrow>
              <h1 className="mt-6 text-[clamp(3rem,9vw,8rem)] font-medium leading-[0.9] tracking-[-0.055em]">
                <MaskLines immediate delay={0.1} lines={[p.name]} />
              </h1>
            </div>
            <Reveal className="lg:col-span-4" delay={0.3}>
              <p className="text-[18px] leading-relaxed text-muted">{p.tagline}</p>
            </Reveal>
          </div>

          <Reveal delay={0.35}>
            <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-line pt-6 text-[14px] sm:grid-cols-5">
              {[
                ["Role", p.role],
                ["Timeline", cs.timeline],
                ["Platform", p.platforms.join(", ")],
                ["Year", p.year],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-muted">{k}</dt>
                  <dd className="mt-1">{v}</dd>
                </div>
              ))}
              <div>
                <dt className="text-muted">Get the app</dt>
                <dd className="mt-1">
                  <StoreText links={p.links} />
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-14 overflow-hidden rounded-[22px]" style={{ background: tint(p.accent, 16) }}>
              <div className="mx-auto flex max-w-5xl justify-center gap-[3.5%] px-[6%] pt-[7%]">
                {shots.slice(0, 3).map((src, i) => (
                  <div key={i} className={`w-[30%] shrink-0 sm:w-[26%] ${i === 1 ? "-translate-y-[2%]" : "translate-y-[8%]"}`}>
                    <Phone bare={p.storeGraphics} src={src} alt={`${p.name} screen ${i + 1}`} accent={p.accent} seed={i} priority />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      <div className="mt-24">
        <Block n="01" label="Overview" title="The short version">
          <Reveal>
            <p className="max-w-3xl text-[clamp(1.25rem,2vw,1.6rem)] leading-[1.4] tracking-[-0.015em]">{cs.summary}</p>
          </Reveal>
        </Block>

        <Block n="02" label="Problem" title="What wasn't working">
          <Reveal>
            <p className="max-w-3xl text-[18px] leading-relaxed text-muted">{cs.problem}</p>
          </Reveal>
          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            {cs.users.map((u, i) => (
              <Reveal key={u.name} delay={i * 0.08}>
                <div className="border-t border-line pt-5">
                  <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">User {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-[22px] font-medium tracking-[-0.025em]">{u.name}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-muted">{u.need}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-12 border-t border-line pt-5">
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Goals</p>
              <ul className="mt-4 space-y-3">
                {cs.goals.map((g) => (
                  <li key={g} className="flex gap-4 text-[18px] tracking-[-0.01em]">
                    <span className="text-accent">→</span>
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Block>

        <Block n="03" label="User flow" title="Mapping the journey">
          <ol className="grid gap-px overflow-hidden rounded-[18px] bg-line sm:grid-cols-2 lg:grid-cols-4">
            {cs.flow.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.07} className="bg-ink">
                <li className="h-full p-6">
                  <span className="font-mono text-[12px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-8 text-[18px] font-medium tracking-[-0.02em]">{f.title}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-muted">{f.caption}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Block>

        <Block n="04" label="Wireframes" title="Structure before style">
          <div className="grid grid-cols-3 gap-4 sm:gap-8">
            {cs.wireframes.map((w, i) => (
              <Reveal key={w.caption} delay={i * 0.08}>
                <figure>
                  {w.src ? (
                    <div className="relative aspect-[9/19.5] overflow-hidden rounded-[18px] border border-line">
                      <Image src={w.src} alt={w.caption} fill sizes="(max-width: 768px) 33vw, 260px" className="object-cover" />
                    </div>
                  ) : (
                    <Phone variant="wire" seed={i} />
                  )}
                  <figcaption className="mt-4 text-[13px] text-muted">
                    <span className="font-mono text-fg/70">{String(i + 1).padStart(2, "0")}</span> {w.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Block>

        <Block n="05" label="Design decisions" title="Why it looks the way it does">
          <Rows items={cs.decisions} />
          <Reveal>
            <div className="mt-12">
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Accessibility & trust</p>
              <ul className="mt-5 grid gap-x-8 gap-y-3 text-[16px] sm:grid-cols-2">
                {cs.accessibility.map((a) => (
                  <li key={a} className="flex gap-3 border-t border-line pt-3">
                    <span className="text-accent">✓</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Block>
      </div>

      <section className="border-t border-line py-20 sm:py-28" style={{ background: tint(p.accent, 8) }}>
        <div className={container}>
          <div className="mb-14 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <Eyebrow index="06">Final UI</Eyebrow>
            </div>
            <h2 className="text-[clamp(1.9rem,3.8vw,3.1rem)] font-medium leading-[1] tracking-[-0.04em] lg:col-span-9">
              <MaskLines
                lines={[
                  <span key="l1">
                    The shipped app, <span className="font-serif font-normal italic">screen by screen.</span>
                  </span>,
                ]}
              />
            </h2>
          </div>
          <div className={`mx-auto grid grid-cols-2 gap-5 sm:gap-8 ${shots.length % 3 === 0 ? "max-w-4xl sm:grid-cols-3" : "sm:grid-cols-4"}`}>
            {shots.map((src, i) => (
              <Reveal key={i} delay={(i % 4) * 0.06} className={i % 2 ? "sm:translate-y-12" : ""}>
                <Phone bare={p.storeGraphics} src={src} alt={`${p.name} screen ${i + 1}`} accent={p.accent} seed={i + 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Block n="07" label="Engineering" title="How it was built">
        <p className="mb-8 text-[15px] text-muted">{p.stack.join(" · ")}</p>
        <Rows items={cs.engineering} />
      </Block>

      <Block n="08" label="Outcome" title="What happened next">
        {p.metrics && (
          <dl className="mb-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
            {p.metrics.map((m) => (
              <div key={m.label} className="border-t border-line pt-4">
                <dt className="text-[clamp(2rem,4vw,3rem)] font-medium leading-none tracking-[-0.04em]">{m.value}</dt>
                <dd className="mt-2 text-[14px] text-muted">{m.label}</dd>
              </div>
            ))}
          </dl>
        )}
        <Reveal>
          <p className="max-w-3xl text-[clamp(1.25rem,2vw,1.6rem)] leading-[1.4] tracking-[-0.015em]">{cs.outcome}</p>
        </Reveal>
      </Block>

      {next.slug !== p.slug && (
        <Link href={`/work/${next.slug}`} className="group block border-t border-line">
          <div className={`${container} flex items-end justify-between gap-6 py-20 sm:py-28`}>
            <div>
              <Eyebrow>Next case study</Eyebrow>
              <p className="mt-6 text-[clamp(2.75rem,8vw,7rem)] font-medium leading-[0.9] tracking-[-0.055em] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3">
                {next.name}
              </p>
            </div>
            <span className="mb-3 text-[clamp(2rem,5vw,4rem)] text-accent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2">
              →
            </span>
          </div>
        </Link>
      )}
    </article>
  );
}
