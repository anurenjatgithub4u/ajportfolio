import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import MaskLines from "@/components/motion/MaskLines";
import ScrollWords from "@/components/motion/ScrollWords";
import LocalTime from "@/components/LocalTime";
import { FeaturedProject, SmallProject } from "@/components/ProjectCard";
import { Button, Eyebrow, container } from "@/components/ui";
import { ai, featured, others, process, profile, projects, toolkit } from "@/lib/data";

const serif = "font-serif font-normal italic tracking-[-0.01em]";

function SectionHead({ index, label, lines, aside }: { index: string; label: string; lines: React.ReactNode[]; aside?: string }) {
  return (
    <div className="mb-14 grid gap-6 sm:mb-20 lg:grid-cols-12">
      <div className="lg:col-span-3">
        <Eyebrow index={index}>{label}</Eyebrow>
      </div>
      <div className="lg:col-span-9">
        <h2 className="text-[clamp(2.1rem,5vw,4.25rem)] font-medium leading-[0.98] tracking-[-0.045em]">
          <MaskLines lines={lines} />
        </h2>
        {aside && (
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">{aside}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const names = projects.map((p) => p.name);

  return (
    <>
      <Hero />

      {/* Apps strip */}
      <div className="mt-24 overflow-hidden border-y border-line py-6 sm:mt-32" aria-label={`Live apps: ${names.join(", ")}`}>
        <div className="marquee flex w-max items-center gap-12 whitespace-nowrap" aria-hidden>
          {[...names, ...names, ...names, ...names].map((n, i) => (
            <span key={i} className="flex items-center gap-12 text-[clamp(1.5rem,3vw,2.25rem)] tracking-[-0.03em] text-fg/80">
              <span className={i % 2 ? serif : "font-medium"}>{n}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>

      {/* Work */}
      <section id="work" className={`${container} scroll-mt-20 py-28 sm:py-40`}>
        <SectionHead
          index="01"
          label="Selected work"
          lines={[
            <span key="l1">
              Real apps, <span className={serif}>in real</span>
            </span>,
            "people's pockets.",
          ]}
          aside="Each case study walks through the problem, the user flow, wireframes, the final UI and how it was built."
        />
        <div className="space-y-28 sm:space-y-40">
          {featured.map((p, i) => (
            <FeaturedProject key={p.slug} p={p} index={i} />
          ))}
        </div>

        {others.length > 0 && (
          <div className="mt-32 sm:mt-44">
            <div className="mb-10 flex items-end justify-between gap-6 border-b border-line pb-5">
              <h3 className="text-[clamp(1.6rem,3vw,2.25rem)] font-medium tracking-[-0.04em]">
                More apps <span className={`${serif} text-muted`}>on the stores</span>
              </h3>
              <span className="font-mono text-[12px] text-muted">{String(others.length).padStart(2, "0")}</span>
            </div>
            <div className="grid gap-x-6 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              {others.map((p, i) => (
                <SmallProject key={p.slug} p={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Process */}
      <section id="process" className="scroll-mt-20 border-t border-line">
        <div className={`${container} py-28 sm:py-40`}>
          <SectionHead
            index="02"
            label="Process"
            lines={[
              "One person from",
              <span key="l2">
                sketch <span className={serif}>to store.</span>
              </span>,
            ]}
            aside="Because I design what I build, the flow in Figma is the flow in the app, edge cases included. Nothing gets lost in a handoff."
          />
          <ol className="border-b border-line">
            {process.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.04}>
                <li className="group grid gap-3 border-t border-line py-7 sm:grid-cols-12 sm:items-baseline sm:py-9">
                  <span className="font-mono text-[12px] text-muted transition-colors duration-500 group-hover:text-accent sm:col-span-1">{s.step}</span>
                  <h3 className="text-[clamp(1.5rem,2.6vw,2.1rem)] font-medium tracking-[-0.035em] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 sm:col-span-4">
                    {s.title}
                  </h3>
                  <p className="max-w-xl text-[16px] leading-relaxed text-muted sm:col-span-7">{s.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Toolkit + AI */}
      <section id="toolkit" className={`${container} scroll-mt-20 pb-28 sm:pb-40`}>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Eyebrow index="03">Toolkit</Eyebrow>
          </div>
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-9">
            {toolkit.map((g, i) => (
              <Reveal key={g.group} delay={i * 0.08}>
                <h3 className="border-b border-line pb-3 text-[15px] font-medium">{g.group}</h3>
                <ul className="mt-4 space-y-2 text-[15px] text-muted">
                  {g.items.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>

        {ai.enabled && (
          <div className="mt-24 grid gap-10 border-t border-line pt-14 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <Eyebrow>On AI</Eyebrow>
            </div>
            <div className="lg:col-span-9">
              <h3 className="max-w-3xl text-[clamp(1.75rem,3.4vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.04em]">
                <MaskLines
                  lines={[
                    "Useful where it helps,",
                    <span key="l3">
                      with a <span className={serif}>human in the loop.</span>
                    </span>,
                  ]}
                />
              </h3>
              <div className="mt-10 grid gap-8 sm:grid-cols-3">
                {ai.points.map((p, i) => (
                  <Reveal key={p.title} delay={i * 0.08}>
                    <h4 className="text-[15px] font-medium">{p.title}</h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.body}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-20 border-t border-line">
        <div className={`${container} py-28 sm:py-40`}>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <Eyebrow index="04">About</Eyebrow>
            </div>
            <div className="lg:col-span-9">
              <ScrollWords
                text={profile.statement}
                className="text-[clamp(1.6rem,3.3vw,2.85rem)] font-medium leading-[1.14] tracking-[-0.035em]"
              />
              <div className="mt-16 grid gap-10 border-t border-line pt-10 sm:grid-cols-2">
                <Reveal className="space-y-4 text-[16px] leading-relaxed text-muted">
                  {profile.bio.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </Reveal>
                <Reveal delay={0.1}>
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-6 text-[14px]">
                    {[
                      ["Based in", "India"],
                      ["Working", "Remote or on-site"],
                      ["Focus", "React Native, Expo, UX"],
                      ["Local time", <LocalTime key="t" />],
                    ].map(([k, v]) => (
                      <div key={k as string}>
                        <dt className="text-muted">{k}</dt>
                        <dd className="mt-1">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-20 border-t border-line">
        <div className={`${container} py-28 sm:py-40`}>
          <Eyebrow index="05">Contact</Eyebrow>
          <h2 className="mt-10 text-[clamp(2.8rem,9vw,8.5rem)] font-medium leading-[0.92] tracking-[-0.055em]">
            <MaskLines
              lines={[
                "Let's build",
                <span key="l4">
                  something <span className={`${serif} text-accent`}>good.</span>
                </span>,
              ]}
            />
          </h2>

          <Reveal delay={0.15}>
            <a
              href={`mailto:${profile.email}`}
              className="link-u mt-14 inline-block break-all text-[clamp(1.35rem,3.6vw,3rem)] font-medium tracking-[-0.035em] sm:break-normal"
            >
              {profile.email}
            </a>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-16 grid gap-8 border-t border-line pt-8 text-[15px] sm:grid-cols-4">
              <div>
                <p className="text-[13px] text-muted">Phone</p>
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="link-u mt-1 inline-block">
                  {profile.phone}
                </a>
              </div>
              <div>
                <p className="text-[13px] text-muted">Elsewhere</p>
                <ul className="mt-1 space-y-1">
                  {profile.socials.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noreferrer" className="link-u">
                        {s.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[13px] text-muted">Local time</p>
                <p className="mt-1">
                  <LocalTime />
                </p>
              </div>
              <div className="sm:text-right">
                <Button href={profile.cvUrl} variant="ghost" download="Anurenj-CV.pdf">
                  Download CV
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
