"use client";

import { askStore } from "@/lib/ask-store";

/** A contextual nudge at the end of a case study: ask the chatbot about this project. */
export function AskAbout({ title }: { title: string; slug: string }) {
  const qs = [`What was Asmi's role in ${title}?`, `What would she do differently on ${title}?`];
  return (
    <div className="mt-10 flex flex-wrap items-center gap-3 rounded-media bg-paper-deep/70 p-5 md:p-6">
      <p className="mr-2 font-medium">
        Still curious? <span className="text-marigold-ink">✦</span>
      </p>
      {qs.map((q) => (
        <button
          key={q}
          type="button"
          onClick={() => askStore.open(q)}
          className="rounded-full border border-ink/15 bg-card px-4 py-2 text-sm transition-colors hover:border-ink"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
