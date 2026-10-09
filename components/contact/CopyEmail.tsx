"use client";

import { useState } from "react";

/** The email as a big, tappable link, with a one-click copy for people who use webmail. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={`mailto:${email}`}
        className="font-display-soft text-h3 underline decoration-paper/30 underline-offset-[6px] transition-colors hover:decoration-marigold"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          } catch {
            /* clipboard blocked: the mailto link still works */
          }
        }}
        className="meta rounded-full border border-paper/25 px-3 py-1.5 text-paper/80 transition-colors hover:border-marigold hover:text-paper"
      >
        <span aria-live="polite">{copied ? "Copied ✓" : "Copy"}</span>
      </button>
    </div>
  );
}
