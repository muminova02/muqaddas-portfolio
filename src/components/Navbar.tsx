import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";

const LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-base/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-content flex h-16 items-center justify-between">
        <a href="#top" className="font-bold tracking-tight text-primary">
          Muqaddas <span className="gradient-text">Muminova</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <a href="/Muqaddas_Muminova_CV.pdf" download className="btn-outline !px-4 !py-2">
            <Download className="h-4 w-4" aria-hidden="true" />
            Download CV
          </a>
        </div>

        <button
          className="rounded-md p-2 text-primary md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-base/95 backdrop-blur-xl md:hidden">
          <div className="container-content flex flex-col gap-1 py-3">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm font-medium text-muted hover:bg-white/5 hover:text-primary"
              >
                {l.label}
              </a>
            ))}
            <a href="/Muqaddas_Muminova_CV.pdf" download className="btn-outline mt-2 w-full !py-2">
              <Download className="h-4 w-4" aria-hidden="true" />
              Download CV
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
