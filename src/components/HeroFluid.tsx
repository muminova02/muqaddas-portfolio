import { useEffect, useState } from "react";

/**
 * Liquid-silk hero background: a single organic ribbon rendered with an SVG
 * gradient fill and a turbulence + displacement filter so it folds like cloth.
 * The background stays mostly black (transparent negative space); only the
 * ribbon is luminous. Motion is continuous (SMIL animate of the turbulence),
 * with a static fallback under prefers-reduced-motion.
 */
export default function HeroFluid() {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setAnimate(!mq.matches);
    const on = () => setAnimate(!mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // Ribbon silhouettes (thick wavy band across the lower-middle of the hero).
  const mainPath =
    "M -160 430 C 180 330 430 540 700 400 S 1080 340 1400 300 L 1400 560 " +
    "C 1080 640 820 520 560 630 S 160 690 -160 620 Z";
  const backPath =
    "M -160 480 C 210 380 450 600 720 450 S 1110 400 1400 360 L 1400 680 " +
    "C 1080 740 820 610 560 710 S 160 770 -160 700 Z";
  const edgePath = "M -160 430 C 180 330 430 540 700 400 S 1080 340 1400 300";

  return (
    <svg
      className="hero-fluid"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="silk" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor="#f4f5fb" />
          <stop offset="42%" stopColor="#c4c7d4" />
          <stop offset="72%" stopColor="#8b5cf6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0d1020" stopOpacity="0" />
        </linearGradient>

        <filter id="liquid" x="-25%" y="-40%" width="150%" height="180%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.006 0.011"
            numOctaves="2"
            seed="7"
            result="noise"
          >
            {animate && (
              <animate
                attributeName="baseFrequency"
                dur="22s"
                values="0.006 0.011; 0.009 0.007; 0.005 0.012; 0.006 0.011"
                repeatCount="indefinite"
              />
            )}
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" xChannelSelector="R" yChannelSelector="G">
            {animate && (
              <animate attributeName="scale" dur="18s" values="72; 104; 72" repeatCount="indefinite" />
            )}
            {!animate && <animate attributeName="scale" dur="0s" values="88" fill="freeze" />}
          </feDisplacementMap>
          <feGaussianBlur stdDeviation="7" />
        </filter>

        <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
      </defs>

      {/* depth: blurred, dimmer copy behind */}
      <path d={backPath} fill="url(#silk)" opacity="0.28" filter="url(#soft)" />

      {/* main folded silk ribbon */}
      <path d={mainPath} fill="url(#silk)" opacity="0.9" filter="url(#liquid)" />

      {/* bright satin highlight along the upper edge */}
      <path
        d={edgePath}
        fill="none"
        stroke="#f7f7fb"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.35"
        filter="url(#liquid)"
      />
    </svg>
  );
}
