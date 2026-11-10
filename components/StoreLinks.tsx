import type { StoreLinks as Links } from "@/lib/data";

function Badge({ href, label, sub, icon }: { href: string; label: string; sub: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2.5 rounded-xl border border-line bg-panel px-3.5 py-2 transition hover:border-white/30 hover:bg-panel-2"
    >
      {icon}
      <span className="leading-tight">
        <span className="block text-[10px] uppercase tracking-wide text-muted">{sub}</span>
        <span className="block text-sm font-semibold">{label}</span>
      </span>
    </a>
  );
}

export default function StoreLinks({ links }: { links: Links }) {
  if (!links.playStore && !links.appStore && !links.web) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {links.appStore && (
        <Badge
          href={links.appStore}
          sub="Download on the"
          label="App Store"
          icon={
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
              <path d="M16.37 12.6c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.82-.81-3-.79-1.54.02-2.97.9-3.76 2.28-1.6 2.78-.41 6.9 1.15 9.16.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.76-2.23.87-1.27 1.23-2.51 1.25-2.57-.03-.01-2.4-.92-2.42-3.66zM14.1 5.86c.63-.77 1.06-1.83.94-2.89-.91.04-2.01.61-2.66 1.37-.58.67-1.1 1.76-.96 2.8 1.02.08 2.05-.52 2.68-1.28z" />
            </svg>
          }
        />
      )}
      {links.playStore && (
        <Badge
          href={links.playStore}
          sub="Get it on"
          label="Google Play"
          icon={
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
              <path fill="#34d399" d="M3.6 2.3 13.8 12 3.6 21.7c-.4-.2-.6-.6-.6-1.1V3.4c0-.5.2-.9.6-1.1z" />
              <path fill="#60a5fa" d="m17.1 8.7-3.3 3.3-10.2-9.7c.3-.2.8-.2 1.2 0l12.3 6.4z" />
              <path fill="#f87171" d="m17.1 15.3-12.3 6.4c-.4.2-.9.2-1.2 0l10.2-9.7 3.3 3.3z" />
              <path fill="#fbbf24" d="m20.4 10.4-3.3-1.7-3.3 3.3 3.3 3.3 3.3-1.7c.9-.5.9-2.7 0-3.2z" />
            </svg>
          }
        />
      )}
      {links.web && <Badge href={links.web} sub="Visit" label="Website" icon={<span className="text-lg">↗</span>} />}
    </div>
  );
}
