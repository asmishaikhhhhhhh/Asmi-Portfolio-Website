"use client";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="rounded-full border border-ink/20 px-5 py-3 font-medium hover:border-ink">
      Print
    </button>
  );
}
