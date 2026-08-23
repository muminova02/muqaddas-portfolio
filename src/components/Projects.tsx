import { Check, ExternalLink, FileText, Github, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import type { Project, ProjectLink } from "../data/portfolio";
import { PROJECTS } from "../data/portfolio";
import Reveal from "./Reveal";

function LinkButton({ link, primary }: { link: ProjectLink; primary: boolean }) {
  const icon = link.label.includes("Live") ? (
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
      className={primary ? "btn-primary !py-2.5" : "btn-outline !py-2.5"}
    >
      {icon}
      {link.label}
    </a>
  );
}

function Visual({ project }: { project: Project }) {
  if (project.technical) {
    return (
      <div className="glass group relative overflow-hidden p-1">
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0b12]">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
            <Terminal className="h-4 w-4 text-violet" aria-hidden="true" />
            <span className="text-xs font-medium text-muted">flowdesk-api</span>
          </div>
          <pre className="overflow-x-auto px-4 py-4 text-[12.5px] leading-relaxed">
            <code>
              <span className="text-coral">POST</span>{" "}
              <span className="text-primary">/api/v1/auth/login</span>
              <span className="text-muted">        → JWT access token</span>
              {"\n"}
              <span className="text-indigo">GET</span>{" "}
              <span className="text-primary">/api/v1/leads?status=new</span>
              <span className="text-muted">  → filtered + paginated</span>
              {"\n"}
              <span className="text-magenta">PATCH</span>{" "}
              <span className="text-primary">/api/v1/leads/{"{id}"}/status</span>
              <span className="text-muted"> → validated workflow</span>
              {"\n\n"}
              <span className="text-muted">Router → Service → SQLAlchemy → PostgreSQL</span>
            </code>
          </pre>
        </div>
      </div>
    );
  }
  return (
    <div className="glass group overflow-hidden p-0">
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={`${project.name} interface`}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
    </div>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12"
    >
      <div className={reversed ? "lg:order-2" : ""}>
        <Visual project={project} />
      </div>

      <div className={reversed ? "lg:order-1" : ""}>
        <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-2xl font-bold text-primary sm:text-3xl">{project.name}</h3>
          {project.role ? (
            <span className="text-xs font-medium text-violet">{project.role}</span>
          ) : null}
        </div>
        <p className="text-base leading-relaxed text-muted">{project.tagline}</p>

        <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-muted">
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-violet" aria-hidden="true" />
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

        <div className="mt-6 flex flex-wrap gap-2.5">
          {project.links.map((link, i) => (
            <LinkButton key={link.href} link={link} primary={i === 0} />
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-28">
      <div className="container-content">
        <Reveal>
          <p className="section-label">Selected Work</p>
          <h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            Featured Projects
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Real, shipped products and backend systems — from production-style APIs to
            AI-powered and interactive platforms.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col gap-20">
          {PROJECTS.map((project, i) => (
            <ProjectRow key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
