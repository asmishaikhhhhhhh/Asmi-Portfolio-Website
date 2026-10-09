"use client";

/**
 * Celestial Influence hero: the zodiac wheel over the moon, from Asmi's artwork.
 * The wheel (cut out of the artwork) turns slowly through the signs while the
 * starfield and compass points stay put, and a few stars twinkle.
 * Paused (or reduced motion) it shows the artwork as is, the still frame.
 */

const IMG = "/images/projects/celestial-influence";
// Wheel centre and radius in the artwork (1400 × 1180), measured from the image.
const CX = 685, CY = 620, R = 383;

// A few extra stars that twinkle (fixed positions so server and client match).
const STARS = [
  [140, 210], [260, 90], [420, 160], [1180, 140], [1290, 330], [1230, 980],
  [110, 900], [330, 1080], [980, 1100], [1340, 760], [60, 520], [1100, 60],
];

export function CelestialWheel({ playing }: { playing: boolean }) {
  return (
    <svg
      // Extra dark margin so the whole wheel stays in frame on wide and tall covers
      viewBox="-200 40 1800 1100"
      preserveAspectRatio="xMidYMid slice"
      className="cw-stage absolute inset-0 h-full w-full"
      data-playing={playing ? "true" : "false"}
      aria-hidden
    >
      <rect x="-200" y="0" width="1800" height="1180" fill="#050505" />
      <image href={`${IMG}/cover.webp`} x="0" y="0" width="1400" height="1180" />
      <g className="cw-wheel" style={{ transformOrigin: `${CX}px ${CY}px` }}>
        <image href={`${IMG}/wheel.webp`} x={CX - R} y={CY - R} width={R * 2} height={R * 2} />
      </g>
      {STARS.map(([x, y], i) => (
        <circle key={i} className="cw-star" cx={x} cy={y} r={3} fill="#fff" style={{ animationDelay: `${(i * 370) % 2600}ms` }} />
      ))}
    </svg>
  );
}
