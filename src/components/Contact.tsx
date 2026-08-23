import { Github, Globe, Linkedin, Mail, Send } from "lucide-react";
import { CONTACTS } from "../data/portfolio";
import Reveal from "./Reveal";

const ICONS: Record<string, typeof Mail> = {
  Website: Globe,
  Email: Mail,
  GitHub: Github,
  LinkedIn: Linkedin,
  Telegram: Send,
};

export default function Contact() {
  return (
    <section id="contact" className="border-t border-white/5 py-24 sm:py-32">
      <div className="container-content">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-label">Contact</p>
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-primary sm:text-6xl">
              Let's build something <span className="gradient-text">useful</span>.
            </h2>
            <p className="mt-5 text-lg text-muted">
              Open to remote Full-Stack and Python Backend opportunities.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
            {CONTACTS.map((c) => {
              const Icon = ICONS[c.label] ?? Mail;
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="card flex items-center gap-3 p-4"
                >
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-violet">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-medium uppercase tracking-wider text-muted/70">
                      {c.label}
                    </span>
                    <span className="block truncate text-sm font-medium text-primary">
                      {c.value}
                    </span>
                  </span>
                </a>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
