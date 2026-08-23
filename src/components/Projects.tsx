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

function liveLabel(project: Project): string {
  const live = project.links.find((l) => l.label.includes("Live"));
  if (live) return live.href.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return project.name.toLowerCase().replace(/\s+/g, "-");
}

function TechnicalVisual() {
  return (
    <div className="showcase group">
      <div className="glass overflow-hidden p-0 transition-transform duration-500 group-hover:-translate-y-1">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-coral/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-violet/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-indigo/70" />
          <span className="ml-2 flex items-center gap-1.5 text-xs font-medium text-muted">
            <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
            flowdesk-api
          </span>
        </div>

        <div className="bg-[#0a0b12] px-5 py-5">
          {/* animated request pulse */}
          <div className="relative mb-4 h-px w-full overflow-hidden rounded bg-white/10">
            <motion.span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-1/3 rounded bg-gradient-to-r from-transparent via-violet to-transparent"
              initial={{ x: "-40%" }}
              animate={{ x: "340%" }}
              transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.6 }}
            />
          </div>

          <pre className="overflow-x-auto text-[12.5px] leading-relaxed">
            <code>
              <span className="text-indigo">GET</span>{" "}
              <span className="text-primary">/api/v1/leads</span>
              <span className="text-muted">          → filtered · paginated</span>
              {"\n"}
              <span className="text-magenta">PATCH</span>{" "}
              <span className="text-primary">/api/v1/leads/{"{id}"}/status</span>
              <span className="text-muted"> → validated workflow</span>
            </code>
          </pre>

          <div className="mt-5 space-y-1 text-[13px] font-medium text-muted">
            <div className="text-primary">FastAPI</div>
            <div className="pl-3 text-violet/80">↓ Service / Business Rules</div>
            <div className="pl-3 text-violet/80">↓ SQLAlchemy</div>
            <div className="pl-3 text-indigo/80">↓ PostgreSQL</div>
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5">
            <span className="chip border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
              20 tests · CI green
            </span>
            <span className="chip">JWT · RBAC</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Visual({ project }: { project: Project }) {
  if (project.technical) return <TechnicalVisual />;
  return (
    <div className="showcase group [perspective:1200px]">
      <div className="glass overflow-hidden p-2 transition-transform duration-500 group-hover:-translate-y-1">
        {/* minimal browser bar */}
        <div className="flex items-center gap-1.5 px-2 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-2 truncate rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] text-muted">
            {liveLabel(project)}
          </span>
        </div>
        <div className="overflow-hidden rounded-xl border border-white/10">
          <img
            src={project.image}
            alt={`${project.name} interface`}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
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
            Projects built across AI, backend systems, and interactive products.
          </p>
        </Reveal>

        <div className="mt-16 flex flex-col gap-24 sm:gap-28">
          {PROJECTS.map((project, i) => (
            <ProjectRow key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
