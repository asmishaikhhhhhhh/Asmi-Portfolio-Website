"use client";

/**
 * Adeiro hero: the product photo (face wash, toner, deep cleanser and carton).
 * Loop (7s): the photo drifts in slowly, then a soft band of light sweeps across
 * the bottles from left to right, like a turn under a studio lamp. The packs
 * already carry the ADEIRO lockup, so nothing is laid over them. Paused (or
 * reduced motion) it shows the still photo. Keyframes in globals.css under `ad-`.
 */
const P = "/images/projects/adeiro/cover";

export function AdeiroWord({ playing }: { playing: boolean }) {
  return (
    <svg
      viewBox="0 0 960 620"
      preserveAspectRatio="xMidYMid slice"
      className="ad-stage absolute inset-0 h-full w-full"
      data-playing={playing ? "true" : "false"}
      aria-hidden
    >
      <defs>
        <linearGradient id="ad-sheen" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.32" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g className="ad-photo">
        <image href={`${P}/hero-photo.webp`} x="0" y="0" width="960" height="620" preserveAspectRatio="xMidYMid slice" />
      </g>
      <rect className="ad-sheen" x="-260" y="-80" width="240" height="780" fill="url(#ad-sheen)" style={{ mixBlendMode: "soft-light" }} />
    </svg>
  );
}
