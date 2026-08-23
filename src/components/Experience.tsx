import { Briefcase, GraduationCap } from "lucide-react";
import { EDUCATION, EXPERIENCE } from "../data/portfolio";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="border-t border-white/5 py-24 sm:py-28">
      <div className="container-content grid gap-10 lg:grid-cols-5 lg:gap-12">
        <Reveal className="lg:col-span-3">
          <p className="section-label">Experience</p>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            Where I've worked
          </h2>

          <div className="card p-6">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-violet">
                <Briefcase className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-bold text-primary">{EXPERIENCE.title}</h3>
                  <span className="text-sm font-medium text-violet">{EXPERIENCE.period}</span>
                </div>
                <p className="mt-0.5 text-sm text-muted">
                  {EXPERIENCE.company} · {EXPERIENCE.location}
                </p>
                <ul className="mt-4 space-y-2">
                  {EXPERIENCE.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-magenta" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-2" delay={0.1}>
          <p className="section-label">Education</p>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            Learning
          </h2>

          <div className="card p-6">
            <div className="flex items-start gap-3">
              <GraduationCap className="mt-0.5 h-5 w-5 flex-shrink-0 text-violet" aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-primary">{EDUCATION.school}</h3>
                <p className="mt-0.5 text-sm text-muted">{EDUCATION.degree}</p>
                <p className="text-sm text-muted/70">{EDUCATION.period}</p>
              </div>
            </div>
            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted/70">
                Additional Training
              </p>
              <ul className="space-y-1.5">
                {EDUCATION.training.map((t) => (
                  <li key={t} className="text-sm text-muted">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
