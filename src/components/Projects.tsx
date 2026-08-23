import { Check, ExternalLink, FileText, Github, Terminal } from "lucide-react";
import type { Project, ProjectLink } from "../data/portfolio";
import { PROJECTS } from "../data/portfolio";
import Reveal from "./Reveal";

function LinkButton({ link, primary }: { link: ProjectLink; primary: boolean }) {
  const icon =
    link.label.includes("Live") ? (
      <ExternalLink className="h-4 w-4" aria-hidden="true" />
    ) : link.label.includes("Source") ? (
      <Github className="h-4 w-4" aria-hidden="true" />
    ) : (
      <FileText className="h-4 w-4" aria-hidden="true" />
    );
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className={primary ? "btn-primary" : "btn-outline"}
    >
      {icon}
      {link.label}
    </a>
  );
}

function TechnicalVisual() {
  return (
    <div className="overflow-hidden rounded-xl border border-black/[0.08] bg-ink">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <Terminal className="h-4 w-4 text-indigo-300" aria-hidden="true" />
        <span className="text-xs font-medium text-white/60">flowdesk-api</span>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-[13px] leading-relaxed text-indigo-100">
        <code>{`POST /api/v1/auth/login        → JWT access token
GET  /api/v1/leads?status=new  → filtered + paginated
PATCH /api/v1/leads/{id}/status → validated workflow
GET  /api/v1/dashboard/summary → RBAC-protected

Router → Service (business rules) → SQLAlchemy → PostgreSQL`}</code>
      </pre>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card flex flex-col overflow-hidden">
      {project.image ? (
        <div className="aspect-[16/9] overflow-hidden border-b border-black/[0.06] bg-black/[0.03]">
          <img
            src={project.image}
            alt={`${project.name} interface`}
            loading="lazy"
            className="h-full w-full object-cover object-top"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-xl font-bold text-ink">{project.name}</h3>
          {project.role ? (
            <span className="text-xs font-medium text-ink/50">{project.role}</span>
          ) : null}
        </div>
        <p className="text-sm leading-relaxed text-ink/70">{project.tagline}</p>

        {project.technical ? (
          <div className="mt-4">
            <TechnicalVisual />
          </div>
        ) : null}

        <ul className="mt-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-ink/70">
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2 pt-1">
          {project.links.map((link, i) => (
            <LinkButton key={link.href} link={link} primary={i === 0} />
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 sm:py-24">
      <div className="container-content">
        <Reveal>
          <p className="section-label">Selected Work</p>
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Featured Projects
          </h2>
          <p className="mt-3 max-w-2xl text-ink/60">
            Real, shipped products and backend systems — from production-style APIs
            to AI-powered and interactive platforms.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
