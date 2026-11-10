import Image from "next/image";

type Variant = "ui" | "wire";

export default function Phone({
  src,
  alt = "",
  accent = "#7cffb2",
  variant = "ui",
  seed = 0,
  className = "",
  priority = false,
  bare = false,
}: {
  src?: string;
  alt?: string;
  accent?: string;
  variant?: Variant;
  seed?: number;
  className?: string;
  priority?: boolean;
  bare?: boolean; // store graphics that already contain a phone: show without our bezel
}) {
  if (src && bare) {
    return (
      <div className={`relative aspect-[1/2] w-full overflow-hidden rounded-[1.6rem] border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ${className}`}>
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 50vw, 300px" className="object-cover" priority={priority} />
      </div>
    );
  }
  return (
    <div
      className={`relative aspect-[9/19.5] w-full rounded-[2.4rem] border border-white/10 bg-[#0b0c11] p-[7px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-panel-2">
        {src ? (
          <Image src={src} alt={alt} fill sizes="(max-width: 768px) 50vw, 280px" className="object-cover" priority={priority} />
        ) : variant === "wire" ? (
          <WireScreen seed={seed} />
        ) : (
          <UiScreen accent={accent} seed={seed} />
        )}
        <div className="absolute left-1/2 top-2 h-[18px] w-[30%] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}

// Placeholder app UI, shown until real screenshots are added.
function UiScreen({ accent, seed }: { accent: string; seed: number }) {
  const layout = seed % 3;
  return (
    <div className="flex h-full flex-col gap-2.5 px-3 pb-3 pt-9 text-[0px]" aria-hidden>
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <div className="h-1.5 w-10 rounded-full bg-white/25" />
          <div className="h-3 w-20 rounded-full bg-white/80" />
        </div>
        <div className="h-7 w-7 rounded-full" style={{ background: accent }} />
      </div>

      {layout === 0 && (
        <>
          <div className="rounded-2xl p-3" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}66)` }}>
            <div className="h-1.5 w-12 rounded-full bg-black/40" />
            <div className="mt-2 h-4 w-24 rounded-full bg-black/70" />
            <div className="mt-4 h-1.5 w-full rounded-full bg-black/20">
              <div className="h-full w-2/3 rounded-full bg-black/60" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="aspect-square rounded-xl bg-white/[0.06] p-2">
                <div className="h-5 w-5 rounded-lg" style={{ background: i === 0 ? accent : "rgb(255 255 255 / 0.12)" }} />
                <div className="mt-6 h-1.5 w-10 rounded-full bg-white/30" />
              </div>
            ))}
          </div>
        </>
      )}

      {layout === 1 && (
        <div className="flex flex-col gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl bg-white/[0.06] p-2">
              <div className="h-7 w-7 shrink-0 rounded-lg" style={{ background: i === 1 ? accent : "rgb(255 255 255 / 0.12)" }} />
              <div className="flex-1 space-y-1">
                <div className="h-1.5 w-3/4 rounded-full bg-white/50" />
                <div className="h-1.5 w-1/2 rounded-full bg-white/20" />
              </div>
              <div className="h-3 w-6 rounded-full" style={{ background: i === 1 ? accent : "rgb(255 255 255 / 0.1)" }} />
            </div>
          ))}
        </div>
      )}

      {layout === 2 && (
        <div className="flex flex-1 flex-col items-center justify-center gap-3">
          <div className="grid h-24 w-24 place-items-center rounded-full" style={{ background: `conic-gradient(${accent} 0 72%, rgb(255 255 255 / 0.08) 72% 100%)` }}>
            <div className="h-[76px] w-[76px] rounded-full bg-panel-2" />
          </div>
          <div className="h-3 w-24 rounded-full bg-white/80" />
          <div className="h-1.5 w-32 rounded-full bg-white/25" />
          <div className="h-1.5 w-28 rounded-full bg-white/25" />
          <div className="mt-2 h-8 w-full rounded-xl" style={{ background: accent }} />
        </div>
      )}

      <div className="mt-auto flex justify-around rounded-2xl bg-white/[0.06] py-2.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-3.5 w-3.5 rounded-md" style={{ background: i === layout ? accent : "rgb(255 255 255 / 0.2)" }} />
        ))}
      </div>
    </div>
  );
}

// Low-fidelity wireframe placeholder.
function WireScreen({ seed }: { seed: number }) {
  const box = "rounded-md border border-dashed border-white/25";
  return (
    <div className="flex h-full flex-col gap-2 bg-[#15171f] px-3 pb-3 pt-9" aria-hidden>
      <div className={`${box} h-5 w-2/3`} />
      <div className={`${box} relative h-24`}>
        <svg className="absolute inset-0 h-full w-full text-white/15" preserveAspectRatio="none">
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" />
        </svg>
      </div>
      {Array.from({ length: 3 + (seed % 2) }).map((_, i) => (
        <div key={i} className={`${box} flex items-center gap-2 p-1.5`}>
          <div className="h-5 w-5 rounded border border-dashed border-white/25" />
          <div className="h-1.5 flex-1 rounded-full bg-white/15" />
        </div>
      ))}
      <div className="mt-auto h-8 rounded-md border border-white/40" />
    </div>
  );
}
