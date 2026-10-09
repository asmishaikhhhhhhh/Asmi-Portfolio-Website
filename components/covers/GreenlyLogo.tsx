"use client";

/**
 * Greenly hero: the project's logo (three nested growing channels and a
 * two-leaf sprout), redrawn in SVG from the logo artwork so it stays crisp.
 *
 * Loop: the channels draw in one after another, then the sprout grows out of
 * the gap and sways: "A greener way to grow". Paused (or reduced motion) it
 * shows the finished logo, which is the still frame.
 */

const BG = "#46992a";
const FG = "#f9f8f6";

/** A channel: a rounded loop that starts at the left end of the top opening,
 *  runs anticlockwise around, and finishes as a short stub turning down. */
function channel(T: number, B: number, L: number, R: number, r: number, stubX: number) {
  return [
    `M 497 ${T}`,
    `H ${L + r}`,
    `A ${r} ${r} 0 0 0 ${L} ${T + r}`,
    `V ${B - r}`,
    `A ${r} ${r} 0 0 0 ${L + r} ${B}`,
    `H ${R - r}`,
    `A ${r} ${r} 0 0 0 ${R} ${B - r}`,
    `V ${T + r}`,
    `A ${r} ${r} 0 0 0 ${R - r} ${T}`,
    `H ${stubX}`,
    `V 393`,
  ].join(" ");
}

// Measured from the logo artwork (1090 × 640).
const CHANNELS = [
  channel(327, 467.5, 383, 694.5, 60, 552),
  channel(347.5, 447.5, 399.5, 678, 46, 569.5),
  channel(367.5, 427.5, 416.5, 661.5, 30, 587),
];

export function GreenlyLogo({ playing }: { playing: boolean }) {
  return (
    <svg
      viewBox="0 0 1090 640"
      preserveAspectRatio="xMidYMid slice"
      className="gl-stage absolute inset-0 h-full w-full"
      data-playing={playing ? "true" : "false"}
      aria-hidden
    >
      <rect width="1090" height="640" fill={BG} />
      {/* Soft ground glow so the mark sits on something */}
      <ellipse cx="540" cy="500" rx="260" ry="26" fill="#000" opacity="0.07" />

      {CHANNELS.map((d, i) => (
        <path
          key={i}
          d={d}
          pathLength={1}
          className="gl-channel"
          style={{ animationDelay: `${i * 260}ms` }}
          fill="none"
          stroke={FG}
          strokeWidth={9}
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
      ))}

      {/* Sprout: grows from the gap at the top of the channels */}
      <g className="gl-sprout">
        <g className="gl-leaf-l">
          <path d="M 401 215 Q 478 168 531 284 Q 438 318 401 215 Z" fill={FG} />
        </g>
        <g className="gl-leaf-r">
          <path d="M 538 251 Q 560 160 667 186 Q 652 278 538 251 Z" fill={FG} />
        </g>
      </g>
    </svg>
  );
}
