import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import { WORKFLOW } from "../data/portfolio";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="border-t border-black/[0.06] bg-white/40 py-20 sm:py-24">
      <div className="container-content grid gap-12 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <p className="section-label">About Me</p>
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Turning ideas into working software
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-ink/70">
            <p>
              I'm an AI-Assisted Full-Stack Developer with a strong Python backend
              focus. I enjoy turning product ideas and business requirements into
              working applications, APIs, and internal tools.
            </p>
            <p>
              My strongest areas are Python, FastAPI, Django/DRF, REST APIs,
              databases, authentication, backend business logic, and React.
            </p>
            <p>
              I also work with AI development tools such as Claude Code, Cursor, and
              ChatGPT for codebase exploration, prototyping, debugging,
              implementation, and refactoring — while manually reviewing and testing
              the final result.
            </p>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-2" delay={0.1}>
          <div className="card h-full p-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-ink/50">
              How I Work
            </h3>
            <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2">
              {WORKFLOW.map((step, i) => (
                <Fragment key={step}>
                  <span className="rounded-lg bg-accent-soft px-3 py-1.5 text-sm font-medium text-ink">
                    {step}
                  </span>
                  {i < WORKFLOW.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-ink/30" aria-hidden="true" />
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
