import { profile } from "@/lib/data";
import { container } from "./ui";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className={`${container} flex flex-col gap-4 py-8 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between`}>
        <p>
          © {new Date().getFullYear()} {profile.name}. Designed in Figma, built with Next.js.
        </p>
        <a href="#main" className="link-u self-start text-fg/80 hover:text-fg sm:self-auto">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
