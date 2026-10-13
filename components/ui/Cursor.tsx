"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE = "a, button, [role=button], label, summary, select, input[type=range], [data-cursor]";

/**
 * A soft ring that appears around the pointer only over things you can click
 * (links, buttons, cards, CTAs). Everywhere else it is hidden and the native
 * cursor does the work, so plain content never looks interactive. The native
 * cursor is never hidden. Only for fine pointers with motion allowed.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!enabled) {
      root.removeAttribute("data-custom-cursor");
      return;
    }
    root.setAttribute("data-custom-cursor", "on");

    let x = -100, y = -100, cx = -100, cy = -100, raf = 0;
    const loop = () => {
      cx += (x - cx) * 0.25;
      cy += (y - cy) * 0.25;
      if (dot.current) dot.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      setVisible(true);
      const el = e.target as Element | null;
      setHovering(!!el?.closest?.(INTERACTIVE));
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      root.removeAttribute("data-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  const size = pressed ? 34 : 42;
  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200]"
      // Difference blending keeps the ring visible on light and dark sections alike.
      style={{ opacity: visible && hovering ? 1 : 0, transition: "opacity 200ms", mixBlendMode: "difference" }}
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,transform] duration-300 ease-out-soft"
        style={{
          width: size,
          height: size,
          transform: `scale(${hovering ? 1 : 0.4})`,
          backgroundColor: "rgb(255 255 255 / 0.1)",
          borderColor: "#fff",
          borderWidth: 1.5,
        }}
      />
    </div>
  );
}
