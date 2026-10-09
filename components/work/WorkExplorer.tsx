"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLocationSearch } from "@/lib/use-browser";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { Cover } from "@/components/covers/Cover";
import type { ProjectSummary } from "@/lib/projects";
import { disciplineLabels } from "@/lib/projects";
import type { Discipline } from "@/lib/types";

type Filter = { id: Discipline; label: string; count: number };

function Card({ p }: { p: ProjectSummary }) {
  const [active, setActive] = useState(false);
  return (
    <Link
      href={p.href}
      {...(p.external ? { target: "_blank", rel: "noreferrer" } : {})}
      data-cursor="Explore"
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className="group block"
    >
      <Cover cover={p.cover} label={`${p.title} cover animation`} active={active} transitionName={p.external ? undefined : `cover-${p.slug}`} />
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display-soft text-h3">{p.title}</h2>
          <p className="mt-1 text-ink-soft">{p.subtitle}</p>
        </div>
        <span aria-hidden className="mt-1 text-xl transition-transform duration-300 group-hover:translate-x-1">{p.external ? "↗" : "→"}</span>
      </div>
      <p className="meta mt-3 flex flex-wrap gap-x-3 gap-y-1 text-ink-mute">
        <span>{p.kind}</span>
        {p.year && <span>{p.year}</span>}
        {p.collaborative && <span>Team project</span>}
      </p>
    </Link>
  );
}

/** Filterable work index. Filtering is instant, keeps the URL shareable (?filter=), never reloads. */
export function WorkExplorer({ projects, filters }: { projects: ProjectSummary[]; filters: Filter[] }) {
  const reduce = useReducedMotion();
  // The URL (?filter=) is the initial choice; clicking a filter overrides it.
  const search = useLocationSearch();
  const fromUrl = new URLSearchParams(search).get("filter") as Discipline | null;
  const [chosen, setChosen] = useState<Discipline | "all" | null>(null);
  const filter: Discipline | "all" = chosen ?? (fromUrl && filters.some((x) => x.id === fromUrl) ? fromUrl : "all");

  const choose = (f: Discipline | "all") => {
    setChosen(f);
    const url = new URL(window.location.href);
    if (f === "all") url.searchParams.delete("filter");
    else url.searchParams.set("filter", f);
    window.history.replaceState(null, "", url);
  };

  const shown = useMemo(() => (filter === "all" ? projects : projects.filter((p) => p.disciplines.includes(filter))), [filter, projects]);

  return (
    <div>
      <div role="group" aria-label="Filter work by discipline" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
        {[{ id: "all" as const, label: "All", count: projects.length }, ...filters].map((f) => {
          const on = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={on}
              onClick={() => choose(f.id)}
              className={`relative shrink-0 rounded-full border px-4 py-2 text-[0.95rem] font-medium transition-colors ${on ? "border-ink text-paper" : "border-ink/15 text-ink hover:border-ink"}`}
            >
              {on && (
                <motion.span layoutId="filter-pill" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 40 }} />
              )}
              {f.label} <span className={`ml-1 text-xs tabular-nums ${on ? "text-marigold" : "text-ink-mute"}`}>{f.count}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} project{shown.length === 1 ? "" : "s"}
        {filter !== "all" ? ` in ${disciplineLabels[filter]}` : ""}.
      </p>

      <LayoutGroup>
        <motion.ul layout={!reduce} className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((p) => (
              <motion.li
                key={p.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <Card p={p} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>
    </div>
  );
}
