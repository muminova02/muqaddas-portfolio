import { Github, Linkedin, Mail, Send } from "lucide-react";
import { CONTACTS } from "../data/portfolio";
import Reveal from "./Reveal";

const ICONS: Record<string, typeof Mail> = {
  Email: Mail,
  GitHub: Github,
  LinkedIn: Linkedin,
  Telegram: Send,
};

export default function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="container-content">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-label">Contact</p>
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Let's Work Together
            </h2>
            <p className="mt-4 text-ink/70">
              I'm open to remote Full-Stack and Python Backend opportunities.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
            {CONTACTS.map((c) => {
              const Icon = ICONS[c.label] ?? Mail;
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="card flex items-center gap-3 p-4 transition-colors hover:border-accent/40"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-medium uppercase tracking-wider text-ink/50">
                      {c.label}
                    </span>
                    <span className="block truncate text-sm font-medium text-ink">
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
