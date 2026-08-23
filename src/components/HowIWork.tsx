import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Bug, ClipboardList, Network, Rocket, ScanSearch, Sparkles } from "lucide-react";
import { WORKFLOW } from "../data/portfolio";
import Reveal from "./Reveal";

const ICONS = [ClipboardList, Network, Sparkles, ScanSearch, Bug, Rocket];

// Node positions on the desktop wave (percent of the 1100×220 viewBox) + the
// scroll-progress threshold at which each node becomes "reached".
const NODES = [
  { x: 7.27, y: 62.5, t: 0.0 },
  { x: 24.36, y: 37.5, t: 0.18 },
  { x: 41.45, y: 62.5, t: 0.36 },
  { x: 58.55, y: 37.5, t: 0.54 },
  { x: 75.64, y: 62.5, t: 0.72 },
  { x: 92.73, y: 41.67, t: 0.9 },
];

const WAVE_PATH =
  "M 80 150 C 168 150, 200 90, 268 90 C 356 90, 388 150, 456 150 " +
  "C 544 150, 576 90, 644 90 C 732 90, 764 150, 832 150 " +
  "C 920 150, 952 100, 1020 100";

function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const on = () => setReduce(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduce;
}

/* ── Desktop node: badge sits on the wave, label beneath ─────────────── */
function DesktopNode({
  node,
  index,
  progress,
  reduce,
}: {
  node: (typeof NODES)[number];
  index: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const Icon = ICONS[index] ?? Sparkles;
  const step = WORKFLOW[index];
  const activation = useTransform(progress, [node.t, node.t + 0.06], [0, 1]);
  const opacity = useTransform(activation, [0, 1], [0.5, 1]);
  const scale = useTransform(activation, [0, 1], [0.98, 1.04]);
  const glow = useTransform(
    activation,
    [0, 1],
    ["0 0 0px rgba(139,92,246,0)", "0 0 26px -4px rgba(139,92,246,0.85)"],
  );
  const labelY = useTransform(activation, [0, 1], [6, 0]);

  // Under reduced motion we must pass explicit end values (not an empty
  // object): framer-motion leaves the last-applied inline value in place if
  // the style key disappears, which would otherwise freeze labels at 0.5.
  const active = reduce ? { opacity: 1, scale: 1 } : { opacity, scale };
  const badgeStyle = reduce
    ? { boxShadow: "0 0 26px -4px rgba(139,92,246,0.85)", scale: 1 }
    : { boxShadow: glow, scale };

  return (
    <>
      <motion.div
        className="absolute z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/10 bg-surface"
        style={{ left: `${node.x}%`, top: `${node.y}%`, ...badgeStyle }}
      >
        <Icon className="h-5 w-5 text-violet" aria-hidden="true" />
        <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-base text-[10px] font-bold text-primary">
          {index + 1}
        </span>
      </motion.div>
      <motion.div
        className="absolute w-[150px] -translate-x-1/2 text-center"
        style={{ left: `${node.x}%`, top: `${node.y}%`, marginTop: 44, y: reduce ? 0 : labelY, ...active }}
      >
        <p className="text-sm font-semibold text-primary">{step.title}</p>
        <p className="mt-1 text-[12px] leading-snug text-muted">{step.description}</p>
      </motion.div>
    </>
  );
}

/* ── Mobile node: row with badge + text ─────────────────────────────── */
function MobileNode({
  node,
  index,
  progress,
  reduce,
}: {
  node: (typeof NODES)[number];
  index: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const Icon = ICONS[index] ?? Sparkles;
  const step = WORKFLOW[index];
  const activation = useTransform(progress, [node.t, node.t + 0.06], [0, 1]);
  const opacity = useTransform(activation, [0, 1], [0.55, 1]);
  const glow = useTransform(
    activation,
    [0, 1],
    ["0 0 0px rgba(139,92,246,0)", "0 0 24px -6px rgba(139,92,246,0.85)"],
  );

  return (
    <motion.li
      className="relative flex items-start gap-4"
      style={reduce ? { opacity: 1 } : { opacity }}
    >
      <motion.div
        className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-surface"
        style={reduce ? { boxShadow: "0 0 24px -6px rgba(139,92,246,0.85)" } : { boxShadow: glow }}
      >
        <Icon className="h-5 w-5 text-violet" aria-hidden="true" />
        <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-base text-[10px] font-bold text-primary">
          {index + 1}
        </span>
      </motion.div>
      <div className="pt-1">
        <p className="text-sm font-semibold text-primary">{step.title}</p>
        <p className="mt-1 text-[13px] leading-relaxed text-muted">{step.description}</p>
      </div>
    </motion.li>
  );
}

export default function HowIWork() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<SVGPathElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 40%"],
  });

  // Tracer dot follows the wave according to scroll progress.
  const cx = useMotionValue(80);
  const cy = useMotionValue(150);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const path = trackRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    const p = path.getPointAtLength(Math.max(0, Math.min(1, v)) * len);
    cx.set(p.x);
    cy.set(p.y);
  });

  // Mobile vertical active-line growth.
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="border-t border-white/5 py-24 sm:py-28">
      <div className="container-content">
        <Reveal>
          <p className="section-label">Process</p>
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">How I Work</h2>
          <p className="mt-4 max-w-2xl text-muted">
            A pragmatic loop — moving quickly with AI assistance, then reviewing and testing
            before anything ships. Scroll to trace the flow.
          </p>
        </Reveal>

        {/* Desktop: wave connecting all six nodes, drawn by scroll */}
        <div className="relative mt-16 hidden h-64 lg:block">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1100 220"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="proc" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6c63ff" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#d946ef" />
              </linearGradient>
            </defs>
            {/* static track */}
            <path
              ref={trackRef}
              d={WAVE_PATH}
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            {/* active, scroll-linked path */}
            <motion.path
              d={WAVE_PATH}
              fill="none"
              stroke="url(#proc)"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: reduce ? 1 : scrollYProgress }}
            />
            {/* scroll tracer */}
            {!reduce && (
              <motion.circle r="7" fill="#f4f5fb" style={{ cx, cy }} className="drop-shadow-[0_0_10px_rgba(139,92,246,0.9)]" />
            )}
          </svg>

          {NODES.map((node, i) => (
            <DesktopNode key={i} node={node} index={i} progress={scrollYProgress} reduce={reduce} />
          ))}
        </div>

        {/* Mobile: vertical track with a scroll-grown active line */}
        <div className="relative mt-12 lg:hidden">
          <div className="absolute bottom-2 left-[23px] top-2 w-0.5 bg-white/10" aria-hidden="true" />
          <motion.div
            aria-hidden="true"
            className="absolute bottom-2 left-[23px] top-2 w-0.5 origin-top bg-gradient-to-b from-indigo via-violet to-magenta"
            style={{ scaleY: reduce ? 1 : lineScaleY }}
          />
          <ol className="relative space-y-8">
            {NODES.map((node, i) => (
              <MobileNode key={i} node={node} index={i} progress={scrollYProgress} reduce={reduce} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
