import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { FeaturedProject, SmallProject } from "@/components/ProjectCard";
import { ai, featured, others, process, profile, toolkit } from "@/lib/data";

const marqueeWords = ["React Native", "Expo", "EAS", "TypeScript", "User flows", "Wireframes", "Figma", "Accessibility", "Push notifications", "REST APIs", "Secure auth"];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Marquee */}
      <div className="overflow-hidden border-y border-line bg-panel/60 py-5" aria-hidden>
        <div className="marquee flex w-max gap-10 whitespace-nowrap font-display text-2xl font-semibold text-muted/70">
          {[...marqueeWords, ...marqueeWords].map((w, i) => (
            <span key={i} className="flex items-center gap-10">
              {w} <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
          {profile.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="bg-ink p-8">
              <p className="font-display text-3xl font-bold text-fg sm:text-4xl">{s.value}</p>
              <p className="mt-2 text-sm text-muted">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Work */}
      <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Selected work"
          title={<>Apps I&apos;ve designed <span className="text-muted">and</span> shipped.</>}
          intro="Each case study walks through the problem, user flows, wireframes, final UI and how it was built."
        />
        <div className="space-y-8">
          {featured.map((p, i) => (
            <FeaturedProject key={p.slug} p={p} index={i} />
          ))}
        </div>

        {others.length > 0 && (
          <>
            <Reveal>
              <h3 className="mb-6 mt-20 font-display text-2xl font-bold">More apps</h3>
            </Reveal>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {others.map((p, i) => (
                <SmallProject key={p.slug} p={p} index={i} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Process */}
      <section id="process" className="scroll-mt-24 border-y border-line bg-panel/40">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <SectionHeading
            eyebrow="How I work"
            title={<>Design and code, <span className="text-gradient">one person, no handoff gap.</span></>}
            intro="Because I design what I build, the flow in Figma is the flow in the app — edge cases included."
          />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {process.map((s, i) => (
              <Reveal key={s.step} delay={(i % 3) * 0.08}>
                <li className="group h-full rounded-3xl border border-line bg-ink p-7 transition hover:border-accent/40">
                  <span className="font-mono text-sm text-accent">{s.step}</span>
                  <h3 className="mt-4 font-display text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Toolkit */}
      <section id="toolkit" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="Toolkit" title="What I build with." />
        <div className="grid gap-5 lg:grid-cols-3">
          {toolkit.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-line bg-panel p-7">
                <h3 className="font-display text-lg font-bold">{g.group}</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((t) => (
                    <li key={t} className="rounded-full border border-line bg-ink px-3 py-1.5 text-sm text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* AI */}
      {ai.enabled && (
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-line bg-panel p-8 sm:p-12">
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent-2/25 blur-[90px]" />
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-2">AI</p>
              <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">{ai.title}</h2>
              <p className="mt-4 max-w-2xl text-muted">{ai.intro}</p>
              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                {ai.points.map((p) => (
                  <div key={p.title} className="border-t border-line pt-5">
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-24 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="About" title={<>Hi, I&apos;m {profile.name}.</>} />
          <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
            {profile.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-24 px-4 pb-24 sm:px-6">
        <Reveal>
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-accent px-6 py-16 text-ink sm:px-14 sm:py-20">
            <div className="grid-bg pointer-events-none absolute inset-0 opacity-30 invert" />
            <p className="relative font-mono text-xs uppercase tracking-[0.2em]">Contact</p>
            <h2 className="relative mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Have an app that needs to feel right? Let&apos;s build it.
            </h2>
            <div className="relative mt-10 flex flex-wrap gap-3">
              <a href={`mailto:${profile.email}`} className="rounded-full bg-ink px-6 py-3 font-semibold text-fg transition hover:-translate-y-0.5">
                {profile.email}
              </a>
              <a href={profile.cvUrl} download="Anurenj-CV.pdf" className="rounded-full border-2 border-ink px-6 py-3 font-semibold transition hover:bg-ink hover:text-fg">
                Download CV
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
