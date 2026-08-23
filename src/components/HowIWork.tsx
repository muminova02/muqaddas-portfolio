import { motion } from "framer-motion";
import { WORKFLOW } from "../data/portfolio";
import Reveal from "./Reveal";

export default function HowIWork() {
  return (
    <section className="border-t border-white/5 py-24 sm:py-28">
      <div className="container-content">
        <Reveal>
          <p className="section-label">Process</p>
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">How I Work</h2>
          <p className="mt-4 max-w-2xl text-muted">
            A pragmatic loop — moving quickly with AI assistance, then reviewing and testing
            before anything ships.
          </p>
        </Reveal>

        <div className="relative mt-14">
          {/* glowing connector line */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-indigo/40 via-violet/50 to-magenta/40 lg:block"
          />
          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            {WORKFLOW.map((step, i) => (
              <motion.li
                key={step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.08 }}
                className="relative"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-surface text-sm font-bold text-primary shadow-[0_0_24px_-6px_rgba(139,92,246,0.6)]">
                  <span className="gradient-text">{i + 1}</span>
                </div>
                <p className="text-sm font-semibold text-primary">{step}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
