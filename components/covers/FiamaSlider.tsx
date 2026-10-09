"use client";

/**
 * Fiama hero: the old and redesigned carton fronts, full bleed, with a
 * before/after divider that sweeps across on its own (after → before → after).
 * Paused (or reduced motion) it rests at the halfway split. Keyframes in
 * globals.css under `fs2-`.
 */
const P = "/images/projects/fiama/cover";

export function FiamaSlider({ playing }: { playing: boolean }) {
  return (
    <div className="fs2-stage absolute inset-0 overflow-hidden" data-playing={playing ? "true" : "false"} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${P}/new-front.webp`} alt="" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <div className="fs2-before absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${P}/old-front.webp`} alt="" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      </div>
      <div className="fs2-handle absolute inset-y-0 w-0">
        <span className="absolute inset-y-0 -left-px w-[2px] bg-white/90 shadow-[0_0_0_1px_rgb(0_0_0/.15)]" />
        <span className="absolute left-1/2 top-1/2 flex h-[4.5cqw] min-h-9 w-[4.5cqw] min-w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[1.8cqw] font-semibold text-[#2a1f4a] shadow-float">
          ↔
        </span>
      </div>
      <span className="absolute left-[3%] top-[5%] rounded-full bg-black/60 px-[1.6cqw] py-[0.6cqw] text-[1.5cqw] font-medium uppercase tracking-wider text-white">Before</span>
      <span className="absolute right-[3%] top-[5%] rounded-full bg-white/90 px-[1.6cqw] py-[0.6cqw] text-[1.5cqw] font-medium uppercase tracking-wider text-[#2a1f4a]">After</span>
    </div>
  );
}
