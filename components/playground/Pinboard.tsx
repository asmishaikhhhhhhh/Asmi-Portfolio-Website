"use client";

import Link from "next/link";
import { useRef } from "react";
import { useMediaQuery } from "@/lib/use-browser";
import { motion, useReducedMotion } from "motion/react";
import type { PlaygroundItem } from "@/data/playground";

/** The Clap It clip: a hinged black clamshell, drawn in SVG. */
function Clip() {
  return (
    <svg viewBox="0 0 44 30" className="absolute -top-4 left-1/2 z-10 h-8 w-12 -translate-x-1/2 drop-shadow" aria-hidden>
      <path d="M4 22 L18 4 Q22 0 26 4 L40 22 Q42 26 38 26 L6 26 Q2 26 4 22 Z" fill="#242422" />
      <rect x="8" y="24" width="28" height="5" rx="2" fill="#3a3a37" />
      <circle cx="22" cy="15" r="3" fill="#4a4a46" />
    </svg>
  );
}

const tilt = (i: number) => [-3, 2, -1.5, 3, -2, 1.5, -2.5][i % 7];

/**
 * A board of small explorations, each held up by a Clap It clip. Cards can be
 * dragged around for fun on pointer devices; links and keyboard work as normal.
 */
export function Pinboard({ items }: { items: PlaygroundItem[] }) {
  const board = useRef<HTMLDivElement>(null);
  const dragged = useRef(false);
  const reduce = useReducedMotion();
  // Dragging only for mouse/trackpad, so it never fights touch scrolling.
  const fine = useMediaQuery("(pointer: fine)");

  return (
    <div
      ref={board}
      className="grain relative grid gap-x-6 gap-y-12 rounded-media bg-[#d9c9ad] p-6 pt-12 sm:grid-cols-2 md:p-10 md:pt-14 lg:grid-cols-3"
      style={{ boxShadow: "inset 0 0 0 10px #b89a6c, inset 0 0 40px rgb(0 0 0 / .15)" }}
    >
      {items.map((it, i) => {
        const card = (
          <div className={`relative h-full rounded-[6px] p-4 shadow-[0_10px_24px_-10px_rgb(0_0_0/.45)] ${it.note ? "bg-[#fff6c9]" : "bg-card"}`}>
            <Clip />
            {it.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={it.image.src}
                alt={it.image.alt}
                loading="lazy"
                draggable={false}
                className="aspect-[4/3] w-full rounded-[3px] object-cover"
                style={{ objectPosition: it.image.focus }}
              />
            )}
            <p className="meta mt-4 text-ink-mute">{it.kind}</p>
            <p className={`mt-1 text-h3 ${it.note ? "font-display-wonk italic" : "font-display-soft"}`}>{it.note ? `“${it.blurb}”` : it.title}</p>
            {!it.note && <p className="mt-2 text-sm text-ink-soft">{it.blurb}</p>}
            {it.note && <p className="mt-2 text-sm text-ink-soft">{it.title}</p>}
            {it.href && (
              <p className="mt-3 text-sm font-medium">
                {it.external ? "Read ↗" : "Explore →"}
              </p>
            )}
          </div>
        );
        return (
          <motion.div
            key={it.id}
            drag={fine && !reduce}
            dragConstraints={board}
            dragElastic={0.15}
            dragMomentum={false}
            onDragStart={() => (dragged.current = true)}
            onDragEnd={() => setTimeout(() => (dragged.current = false), 0)}
            onClickCapture={(e) => {
              // A drag that ends over a link shouldn't navigate.
              if (dragged.current) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            whileDrag={{ scale: 1.04, rotate: 0, zIndex: 30, cursor: "grabbing" }}
            initial={false}
            style={{ rotate: tilt(i) }}
            className="relative touch-pan-y"
            data-cursor={fine && !reduce ? "Drag" : undefined}
          >
            {it.href ? (
              it.external ? (
                <a href={it.href} target="_blank" rel="noreferrer" draggable={false} className="block h-full">
                  {card}
                </a>
              ) : (
                <Link href={it.href} draggable={false} className="block h-full">
                  {card}
                </Link>
              )
            ) : (
              card
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
