"use client";

import Link from "next/link";
import { useState } from "react";
import { Cover } from "@/components/covers/Cover";
import type { ProjectSummary } from "@/lib/projects";
import { disciplineLabels } from "@/lib/projects";

/**
 * One editorial row in Selected Work. The whole row is a single link, so there's
 * one tab stop per project. Hovering (or focusing) the row plays its cover.
 */
export function WorkRow({ p, index, flip }: { p: ProjectSummary; index: number; flip: boolean }) {
  const [active, setActive] = useState(false);
  return (
    <li>
      <Link
        href={`/work/${p.slug}`}
        data-cursor="Explore"
        onPointerEnter={() => setActive(true)}
        onPointerLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        className="group grid gap-6 rounded-media py-10 outline-offset-8 md:grid-cols-12 md:items-center md:gap-10 md:py-16"
        aria-label={`${p.title}: ${p.subtitle}. Explore case study.`}
      >
        <div className={`md:col-span-7 ${flip ? "md:order-2 md:col-start-6" : ""}`}>
          <div className="transition-transform duration-700 ease-out-soft group-hover:scale-[1.01]">
            <Cover cover={p.cover} label={`${p.title} cover animation`} active={active} transitionName={`cover-${p.slug}`} />
          </div>
        </div>
        <div className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
          <p className="meta flex items-center gap-3 text-ink-mute">
            <span className="tabular-nums" style={{ color: p.accentInk }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{p.kind}</span>
            {p.year && <span className="tabular-nums">{p.year}</span>}
          </p>
          <h3 className="mt-4 font-display-soft text-h1 leading-[1.3] transition-colors">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 [box-decoration-break:clone] [-webkit-box-decoration-break:clone] transition-[background-size] duration-500 ease-out-soft group-hover:bg-[length:100%_2px]">
              {p.title}
            </span>
          </h3>
          <p className="mt-6 font-display-wonk text-h3 italic text-ink-soft md:mt-8">{p.subtitle}</p>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Disciplines">
            {p.disciplines.map((d) => (
              <li key={d} className="rounded-tag border border-line px-2 py-1 text-xs font-medium text-ink-soft">
                {disciplineLabels[d]}
              </li>
            ))}
            {p.collaborative && (
              <li className="rounded-tag bg-paper-deep px-2 py-1 text-xs font-medium text-ink-soft">Team project</li>
            )}
          </ul>
          {p.proofPoint && (
            <p className="mt-6 border-l-2 pl-4 text-sm font-medium" style={{ borderColor: p.accent }}>
              {p.proofPoint}
            </p>
          )}
          <p className="mt-8 inline-flex items-center gap-2 font-medium">
            Explore case study
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </p>
        </div>
      </Link>
    </li>
  );
}
