"use client";

import { useRef } from "react";

/**
 * Nudges its child toward the pointer (max ~6px). Used on primary CTAs only.
 * Purely decorative: no effect on touch, keyboard or reduced motion.
 */
export function Magnetic({ children, strength = 0.25 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * strength;
    const dy = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${Math.max(-6, Math.min(6, dx))}px, ${Math.max(-6, Math.min(6, dy))}px)`;
  };
  const reset = () => ref.current && (ref.current.style.transform = "");
  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="inline-block transition-transform duration-300 ease-out-soft"
    >
      {children}
    </span>
  );
}
