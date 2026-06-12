"use client";

const VANISH_X = 50;
const SPREAD = 168;
const RAYS = 11;

/** Static perspective rays — vertical fan only, anchored low near scroll hint */
export function HeroBackground() {
  const startX = VANISH_X - SPREAD / 2;

  const rayBottomXs = Array.from({ length: RAYS + 1 }, (_, i) => startX + (i / RAYS) * SPREAD);

  const radialLines = rayBottomXs.map((x2, i) => (
    <line
      key={`v-${i}`}
      x1={`${VANISH_X}%`}
      y1="0%"
      x2={`${x2}%`}
      y2="100%"
      stroke="url(#heroVertGrad)"
      strokeWidth="0.6"
    />
  ));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#030712]" />

      <div className="hero-top-bloom absolute inset-0" />
      <div className="hero-horizon-glow absolute inset-x-0 bottom-0 h-[40%]" />

      <svg
        className="hero-perspective-grid absolute left-1/2 w-full -translate-x-1/2"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="heroVertGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(94, 234, 212)" stopOpacity="0.5" />
            <stop offset="40%" stopColor="rgb(45, 212, 191)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="rgb(20, 184, 166)" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <g>{radialLines}</g>
      </svg>

      <div className="hero-horizon-line absolute inset-x-0 h-px" />

      <div className="hero-vignette absolute inset-0" />
    </div>
  );
}
