import { GraduationCap } from "lucide-react";
import { EDUCATION, EXPERIENCE } from "../data/portfolio";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section
      id="experience"
      className="border-t border-black/[0.06] bg-white/40 py-20 sm:py-24"
    >
      <div className="container-content grid gap-10 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <p className="section-label">Experience</p>
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Where I've worked
          </h2>

          <div className="card mt-6 p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-bold text-ink">{EXPERIENCE.title}</h3>
              <span className="text-sm font-medium text-accent">{EXPERIENCE.period}</span>
            </div>
            <p className="mt-0.5 text-sm text-ink/60">
              {EXPERIENCE.company} · {EXPERIENCE.location}
            </p>
            <ul className="mt-4 space-y-2">
              {EXPERIENCE.bullets.map((b) => (
                <li key={b} className="flex gap-2 text-sm leading-relaxed text-ink/70">
                  <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-2" delay={0.1}>
          <p className="section-label">Education</p>
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Learning</h2>

          <div className="card mt-6 p-6">
            <div className="flex items-start gap-3">
              <GraduationCap className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-ink">{EDUCATION.school}</h3>
                <p className="mt-0.5 text-sm text-ink/70">{EDUCATION.degree}</p>
                <p className="text-sm text-ink/50">{EDUCATION.period}</p>
              </div>
            </div>
            <div className="mt-4 border-t border-black/[0.06] pt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-ink/50">
                Additional Training
              </p>
              <ul className="space-y-1.5">
                {EDUCATION.training.map((t) => (
                  <li key={t} className="text-sm text-ink/70">
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
