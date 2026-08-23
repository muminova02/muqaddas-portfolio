import { motion } from "framer-motion";
import {
  Bug,
  ClipboardList,
  Network,
  Rocket,
  ScanSearch,
  Sparkles,
} from "lucide-react";
import { WORKFLOW } from "../data/portfolio";
import Reveal from "./Reveal";

const ICONS = [ClipboardList, Network, Sparkles, ScanSearch, Bug, Rocket];

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

        <div className="relative mt-16">
          {/* Desktop: curved gradient path that draws on scroll */}
          <svg
            className="pointer-events-none absolute inset-x-0 top-7 hidden h-16 w-full lg:block"
            viewBox="0 0 1000 60"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="flowline" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6c63ff" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#d946ef" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0,30 C 140,-6 220,64 360,30 S 640,-6 780,30 S 940,54 1000,30"
              fill="none"
              stroke="url(#flowline)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.2 }}
              whileInView={{ pathLength: 1, opacity: 0.75 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
          </svg>

          {/* Mobile: vertical glowing line */}
          <div
            aria-hidden="true"
            className="absolute bottom-4 left-[27px] top-4 w-px bg-gradient-to-b from-indigo via-violet to-magenta opacity-50 lg:hidden"
          />

          <ol className="grid grid-cols-1 gap-8 lg:grid-cols-6 lg:gap-4">
            {WORKFLOW.map((step, i) => {
              const Icon = ICONS[i] ?? Sparkles;
              return (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.12 }}
                  className="relative flex items-start gap-4 lg:block"
                >
                  {/* node */}
                  <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-surface shadow-[0_0_28px_-6px_rgba(139,92,246,0.7)] lg:mb-4">
                    <Icon className="h-5 w-5 text-violet" aria-hidden="true" />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-base text-[10px] font-bold text-primary">
                      {i + 1}
                    </span>
                  </div>
                  <div className="pt-1 lg:pt-0">
                    <p className="text-sm font-semibold text-primary">{step.title}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
