import { showNeeded } from "@/lib/site";
import { isNeeded, type Maybe } from "@/lib/types";

/**
 * Visible placeholder for content Asmi still needs to supply.
 * Shown in development only; renders nothing in production.
 */
export function Needed({ children, inline = false }: { children: React.ReactNode; inline?: boolean }) {
  if (!showNeeded) return null;
  const Tag = inline ? "span" : "div";
  return (
    <Tag
      className={`${inline ? "inline-block" : "block my-4"} rounded-control border border-dashed border-marigold bg-marigold/10 px-3 py-2 font-sans text-sm text-marigold-ink`}
    >
      <strong className="meta mr-2">[Content needed from Asmi]</strong>
      {children}
    </Tag>
  );
}

/**
 * Renders a Maybe<string>: the value if present, otherwise a placeholder in dev
 * and `fallback` (or nothing) in production.
 */
export function MaybeText({ value, fallback }: { value: Maybe<string>; fallback?: string }) {
  if (!isNeeded(value)) return <>{value}</>;
  if (showNeeded) return <Needed inline>{value.needed}</Needed>;
  return fallback ? <>{fallback}</> : null;
}
