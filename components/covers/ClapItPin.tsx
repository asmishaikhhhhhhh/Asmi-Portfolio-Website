"use client";

/**
 * Clap It hero: the side view of the pin from the Features slide, split into
 * its body and its hinged arm. A sheet of paper slides up into the open clip,
 * the arm swings shut on the hinge and settles with a small bounce, holding
 * it; then it opens and the paper drops away. Paused (or reduced motion) it
 * rests open with the paper in place. Keyframes in globals.css under `ci-`.
 */
const P = "/images/projects/clap-it/cover";

export function ClapItPin({ playing }: { playing: boolean }) {
  return (
    <svg
      // The render is 936 × 936; extra margin keeps it centred on wide covers
      viewBox="-200 30 1336 835"
      preserveAspectRatio="xMidYMid meet"
      className="ci-stage absolute inset-0 h-full w-full"
      data-playing={playing ? "true" : "false"}
      aria-hidden
    >
      <defs>
        <linearGradient id="ci-paper" x1="0" x2="1">
          <stop offset="0" stopColor="#e9e6df" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
      </defs>
      <ellipse cx="640" cy="812" rx="190" ry="16" fill="#000" opacity="0.1" />

      {/* The paper, angled away to the left, its top edge held in the gap */}
      <g className="ci-sheet">
        <path d="M606 122 L606 900 L300 860 L300 168 Z" fill="url(#ci-paper)" />
        <path d="M606 122 L606 900" stroke="#d9d4ca" strokeWidth="3" />
        {[260, 330, 400, 470, 540, 610].map((y, i) => (
          <path key={y} d={`M330 ${y + 10 - i * 2} L586 ${y - 26 + i * 2}`} stroke="#d8dde6" strokeWidth="3" />
        ))}
      </g>
      <image href={`${P}/side-body.webp`} x="0" y="0" width="936" height="936" />
      <g className="ci-arm" style={{ transformOrigin: "612px 108px" }}>
        <image href={`${P}/side-arm.webp`} x="0" y="0" width="936" height="936" />
      </g>
    </svg>
  );
}
