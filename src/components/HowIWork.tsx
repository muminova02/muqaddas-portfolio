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

// Desktop composition is a strict 6-column grid. Node x-centers line up with
// the grid column centers ((i + 0.5) / 6), so every node sits exactly above
// its own text column. y is the % height inside the upper visual band; the
// wave path (below) passes through these exact centres. t = scroll-progress
// threshold at which the step becomes "reached".
const NODES = [
  { x: 8.333, y: 41.18, t: 0.0 },
  { x: 25.0, y: 64.71, t: 0.2 },
  { x: 41.667, y: 41.18, t: 0.4 },
  { x: 58.333, y: 64.71, t: 0.6 },
  { x: 75.0, y: 41.18, t: 0.8 },
  { x: 91.667, y: 64.71, t: 0.95 },
];

// viewBox is 1200×170. Node centres are (100,70) (300,110) (500,70) (700,110)
// (900,70) (1100,110) — the cubic handles are placed at the segment midpoints
// with horizontal tangents so the curve flows smoothly *through* each centre.
const WAVE_PATH =
  "M 100 70 C 200 70, 200 110, 300 110 C 400 110, 400 70, 500 70 " +
  "C 600 70, 600 110, 700 110 C 800 110, 800 70, 900 70 " +
  "C 1000 70, 1000 110, 1100 110";

const BAND_VIEWBOX_H = 170;

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

/* ── Desktop node: badge sits ON the curve (upper visual layer) ───────── */
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
  const activation = useTransform(progress, [node.t, node.t + 0.06], [0, 1]);
  const scale = useTransform(activation, [0, 1], [0.96, 1.05]);
  const glow = useTransform(
    activation,
    [0, 1],
    ["0 0 0px rgba(139,92,246,0)", "0 0 26px -4px rgba(139,92,246,0.85)"],
  );

  // NB: centre the node with framer's own x/y (not Tailwind -translate-*),
  // because the `scale` below writes `transform` and would otherwise clobber
  // the Tailwind translate utilities.
  const style = reduce
    ? {
        left: `${node.x}%`,
        top: `${node.y}%`,
        x: "-50%",
        y: "-50%",
        boxShadow: "0 0 26px -4px rgba(139,92,246,0.85)",
        scale: 1,
      }
    : { left: `${node.x}%`, top: `${node.y}%`, x: "-50%", y: "-50%", boxShadow: glow, scale };

  return (
    <motion.div
      className="absolute z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-surface"
      style={style}
    >
      <Icon className="h-5 w-5 text-violet" aria-hidden="true" />
      <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-base text-[10px] font-bold text-primary">
        {index + 1}
      </span>
    </motion.div>
  );
}

/* ── Desktop step text: lower content layer, baseline-aligned column ──── */
function DesktopStepText({
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
  const step = WORKFLOW[index];
  const activation = useTransform(progress, [node.t, node.t + 0.06], [0, 1]);
  const opacity = useTransform(activation, [0, 1], [0.5, 1]);
  const y = useTransform(activation, [0, 1], [8, 0]);

  const style = reduce ? { opacity: 1 } : { opacity, y };

  return (
    <motion.div className="px-3 text-center" style={style}>
      <p className="flex min-h-[2.75rem] items-start justify-center text-sm font-semibold leading-snug text-primary">
        {step.title}
      </p>
      <p className="mt-2 text-[12px] leading-relaxed text-muted">{step.description}</p>
    </motion.div>
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
  const cx = useMotionValue(100);
  const cy = useMotionValue(70);
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

        {/* Desktop: two-layer composition — curve + nodes above, aligned text grid below */}
        <div className="mt-20 hidden lg:block">
          {/* upper visual layer: curve + nodes */}
          <div className="relative h-[170px]">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox={`0 0 1200 ${BAND_VIEWBOX_H}`}
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
              {/* static, subtle track */}
              <path
                ref={trackRef}
                d={WAVE_PATH}
                fill="none"
                stroke="rgba(255,255,255,0.10)"
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
                <motion.circle
                  r="6"
                  fill="#f4f5fb"
                  style={{ cx, cy }}
                  className="drop-shadow-[0_0_10px_rgba(139,92,246,0.9)]"
                />
              )}
            </svg>

            {NODES.map((node, i) => (
              <DesktopNode key={i} node={node} index={i} progress={scrollYProgress} reduce={reduce} />
            ))}
          </div>

          {/* lower content layer: baseline-aligned 6-column text grid */}
          <div className="mt-10 grid grid-cols-6">
            {NODES.map((node, i) => (
              <DesktopStepText
                key={i}
                node={node}
                index={i}
                progress={scrollYProgress}
                reduce={reduce}
              />
            ))}
          </div>
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
