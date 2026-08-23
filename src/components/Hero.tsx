import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github } from "lucide-react";
import HeroFluid from "./HeroFluid";

const FLOATING = [
  { label: "FastAPI", className: "left-[6%] top-[26%]", delay: "0s" },
  { label: "PostgreSQL", className: "right-[8%] top-[22%]", delay: "1.2s" },
  { label: "Python", className: "left-[12%] bottom-[16%]", delay: "0.6s" },
  { label: "React", className: "right-[10%] bottom-[20%]", delay: "1.8s" },
  { label: "JWT · RBAC", className: "left-[2%] top-[54%]", delay: "2.4s" },
  { label: "Docker", className: "right-[3%] top-[52%]", delay: "0.9s" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);

  // Subtle mouse-reactive glow — skipped for reduced-motion / coarse pointers.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse || !glowRef.current) return;
    const el = glowRef.current;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${e.clientX}px`);
        el.style.setProperty("--my", `${e.clientY}px`);
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="top" className="relative flex min-h-[92vh] items-center overflow-hidden">
      {/* liquid-silk fluid ribbon (primary hero motion) */}
      <HeroFluid />
      {/* dark veil behind central text for readability */}
      <div className="hero-veil" aria-hidden="true" />

      {/* mouse-reactive glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden md:block"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx, 50%) var(--my, 30%), rgba(139,92,246,0.10), transparent 70%)",
        }}
      />

      {/* decorative floating tech chips */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 hidden opacity-60 lg:block">
        {FLOATING.map((f) => (
          <span
            key={f.label}
            className={`chip absolute animate-float bg-white/[0.05] ${f.className}`}
            style={{ animationDelay: f.delay }}
          >
            {f.label}
          </span>
        ))}
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-content flex flex-col items-center py-20 text-center"
      >
        <motion.span variants={item} className="chip mb-6">
          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-coral" />
          Open to remote Full-Stack / Python Backend opportunities
        </motion.span>

        <motion.h1
          variants={item}
          className="max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl"
        >
          Muqaddas <span className="gradient-text">Muminova</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 text-xl font-semibold text-primary sm:text-2xl"
        >
          AI-Assisted Full-Stack Developer
        </motion.p>

        <motion.p
          variants={item}
          style={{ color: "#C0C6D6" }}
          className="mt-3 text-sm font-semibold tracking-wide sm:text-base"
        >
          Python · FastAPI · Django/DRF · React · PostgreSQL
        </motion.p>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          I build full-stack products, backend systems, AI-powered applications, and
          interactive digital experiences — with a strong focus on Python, FastAPI, and
          business-oriented backend architecture.
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap justify-center gap-3">
          <a href="#projects" className="btn-primary">
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
          <a href="/cv.pdf" download className="btn-outline">
            <Download className="h-4 w-4" aria-hidden="true" />
            Download CV
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
