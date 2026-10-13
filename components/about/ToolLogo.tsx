import { TOOL_MARKS } from "./tool-marks";

// Tools Simple Icons doesn't carry, drawn as letter tiles. Adobe's own app icons
// are exactly this: two letters on a rounded square, in each app's colours.
const TILES: Record<string, { t: string; fg: string; bg: string }> = {
  Photoshop: { t: "Ps", fg: "#31A8FF", bg: "#001E36" },
  Illustrator: { t: "Ai", fg: "#FF9A00", bg: "#330000" },
  InDesign: { t: "Id", fg: "#FF3366", bg: "#49021F" },
  "Premiere Pro": { t: "Pr", fg: "#9999FF", bg: "#00005B" },
  "After Effects": { t: "Ae", fg: "#9999FF", bg: "#00005B" },
  "Fusion 360": { t: "F", fg: "#FF6B00", bg: "#1A1916" },
  Tableau: { t: "Tb", fg: "#E97627", bg: "#1F3A5F" },
};

/**
 * A tool's mark, drawn in the ink colour so the list stays calm, then in the
 * brand's own colours when its row is hovered (`group/tool`). Decorative: the
 * tool's name is always written next to it.
 */
export function ToolLogo({ name, className = "h-6 w-6" }: { name: string; className?: string }) {
  const mark = TOOL_MARKS[name];
  if (mark) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className={`shrink-0 fill-current transition-colors duration-300 group-hover/tool:text-[var(--brand)] ${className}`}
        style={{ ["--brand" as string]: mark.hex }}
      >
        <path d={mark.d} />
      </svg>
    );
  }
  const tile = TILES[name] ?? { t: name.slice(0, 2), fg: "#FFFFFF", bg: "#1A1916" };
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={`shrink-0 ${className}`}
      style={{ ["--fg" as string]: tile.fg, ["--bg" as string]: tile.bg }}
    >
      <rect
        x="1"
        y="1"
        width="22"
        height="22"
        rx="5"
        strokeWidth="1.6"
        className="fill-transparent stroke-current transition-[fill,stroke] duration-300 group-hover/tool:fill-[var(--bg)] group-hover/tool:stroke-[var(--bg)]"
      />
      <text
        x="12"
        y="16.2"
        textAnchor="middle"
        fontSize={tile.t.length > 1 ? 10.5 : 12}
        fontWeight="700"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        className="fill-current transition-[fill] duration-300 group-hover/tool:fill-[var(--fg)]"
      >
        {tile.t}
      </text>
    </svg>
  );
}
