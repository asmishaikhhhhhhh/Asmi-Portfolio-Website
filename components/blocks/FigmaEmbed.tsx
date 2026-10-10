"use client";

import { useState } from "react";

/**
 * A Figma prototype embedded with Figma's own embed player. It loads on
 * request, so the page stays light until someone wants to explore.
 */
export function FigmaEmbed({ url, title, poster, note }: { url: string; title: string; poster?: string; note?: string }) {
  const [on, setOn] = useState(false);
  const src = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
  return (
    <div>
      <div className="relative overflow-hidden rounded-media border border-line bg-[#141414]" style={{ height: "min(860px, 88vh)" }}>
        {on ? (
          <iframe
            src={src}
            title={title}
            className="absolute inset-0 h-full w-full"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <button type="button" onClick={() => setOn(true)} className="group absolute inset-0 flex flex-col items-center justify-center gap-6 p-6 text-paper">
            {poster && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={poster} alt="" className="absolute inset-0 h-full w-full object-contain p-10 opacity-35 transition-opacity duration-500 group-hover:opacity-50" />
            )}
            <span className="relative grid h-20 w-20 place-items-center rounded-full shadow-[0_10px_40px_rgba(0,0,0,.4)] transition-transform duration-300 group-hover:scale-105" style={{ background: "var(--accent)" }}>
              <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8" fill="currentColor" aria-hidden>
                <path d="M8 5.5v13l10.5-6.5Z" />
              </svg>
            </span>
            <span className="relative text-center">
              <span className="block font-display-soft text-[1.6rem] leading-tight">Load interactive prototype</span>
              <span className="mt-1 block text-sm text-paper/70">Opens my Figma prototype right here. Click through it as a user would.</span>
            </span>
          </button>
        )}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-ink-mute">
        <span>{note ?? "Built in Figma. Hotspots and transitions are from the original prototype."}</span>
        <a href={url} target="_blank" rel="noopener noreferrer" className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
          Open in Figma ↗
        </a>
      </div>
    </div>
  );
}
