import { profile } from "@/data/portfolio";

/**
 * Where Asmi works now, as a live badge: a pulsing dot (still for reduced
 * motion), "Now", and the role. Used in the hero, About and Resume.
 */
export function CurrentRole({ className = "" }: { className?: string }) {
  const { role, org } = profile.current;
  return (
    <span className={`inline-flex items-center gap-2.5 rounded-full bg-forest py-1.5 pl-3 pr-4 text-sm text-paper shadow-[0_6px_18px_-8px_rgb(31_77_58/.65)] ${className}`}>
      <span aria-hidden className="relative inline-flex h-2 w-2">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#7ee2a8] motion-reduce:hidden" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7ee2a8]" />
      </span>
      <span className="meta text-paper/70">Now</span>
      <span className="font-medium">
        {role} <span className="text-paper/70">at</span> {org}
      </span>
    </span>
  );
}
