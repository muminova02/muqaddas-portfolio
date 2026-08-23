import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* subtle gradient wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(79,70,229,0.08), transparent 70%)",
        }}
      />
      <div className="container-content pb-16 pt-20 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="chip mb-5">
            Open to remote Full-Stack / Python Backend opportunities
          </span>

          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Muqaddas Muminova
          </h1>
          <p className="mt-3 text-xl font-semibold text-accent sm:text-2xl">
            AI-Assisted Full-Stack Developer
          </p>
          <p className="mt-2 text-sm font-medium text-ink/60 sm:text-base">
            Python · FastAPI · Django/DRF · React · PostgreSQL
          </p>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg">
            I build and ship full-stack products, backend systems, AI-powered
            applications, and interactive platforms. I use modern AI development
            tools to move quickly — while manually reviewing, debugging, testing,
            and validating the final implementation.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn-accent">
              View Projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="https://github.com/muminova02"
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
