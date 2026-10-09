"use client";

import { useEffect, useId, useRef, useState, ViewTransition } from "react";
import type { Cover as CoverData } from "@/lib/types";
import { compositions } from "./compositions";
import { Stage } from "./Stage";

/* Only one cover animates at a time, site-wide. */
let activeId: string | null = null;
const subs = new Set<() => void>();
function claim(id: string | null) {
  activeId = id;
  subs.forEach((s) => s());
}

type Mode = "hover" | "view";

/**
 * A project's cover: coded motion, looping video, or still image.
 *
 * - `active` (when provided) controls playback directly, e.g. a hovered row.
 * - Otherwise it plays while ≥60% visible (touch devices) and pauses off-screen.
 * - Reduced motion: never plays; shows the composed still.
 * - `transitionName` morphs the cover into the case-study hero on navigation.
 */
export function Cover({
  cover,
  label,
  active,
  className = "",
  aspect = "16 / 11",
  transitionName,
  priority = false,
  autoplay = false,
}: {
  cover: CoverData;
  label: string;
  active?: boolean;
  className?: string;
  aspect?: string;
  transitionName?: string;
  priority?: boolean;
  /** Play whenever mostly visible, even on hover devices (used for case-study heroes). */
  autoplay?: boolean;
}) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [mostlyVisible, setMostlyVisible] = useState(false);
  const [near, setNear] = useState(priority);
  const [mode, setMode] = useState<Mode>("hover");
  const [reduce, setReduce] = useState(true);
  const [, force] = useState(0);

  useEffect(() => {
    const mqHover = matchMedia("(hover: hover) and (pointer: fine)");
    const mqReduce = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setMode(mqHover.matches ? "hover" : "view");
      setReduce(mqReduce.matches);
    };
    sync();
    mqHover.addEventListener("change", sync);
    mqReduce.addEventListener("change", sync);
    const s = () => force((n) => n + 1);
    subs.add(s);
    return () => {
      mqHover.removeEventListener("change", sync);
      mqReduce.removeEventListener("change", sync);
      subs.delete(s);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.intersectionRatio > 0);
        setMostlyVisible(e.intersectionRatio >= 0.6);
      },
      { threshold: [0, 0.01, 0.6] },
    );
    io.observe(el);
    // Separate, wider observer: start loading the stage's images before it scrolls in.
    const pre = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "400px 0px" });
    pre.observe(el);
    return () => {
      io.disconnect();
      pre.disconnect();
    };
  }, []);

  const wants = !reduce && visible && (active ?? ((autoplay || mode === "view") && mostlyVisible));
  useEffect(() => {
    if (wants) claim(id);
    else if (activeId === id) claim(null);
  }, [wants, id]);
  const playing = wants && activeId === id;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) v.play().catch(() => {});
    else v.pause();
  }, [playing]);

  const inner = (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className={`relative w-full overflow-hidden rounded-media bg-paper-deep ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {cover.type === "motion" &&
        (near ? (
          <Stage comp={compositions[cover.composition]} playing={playing} />
        ) : (
          // Until the cover is near the viewport, show only the lightweight poster.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover.poster.src} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
        ))}
      {cover.type === "video" && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster={cover.poster.src}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
        >
          <source src={cover.src} type={cover.src.endsWith(".webm") ? "video/webm" : "video/mp4"} />
        </video>
      )}
      {cover.type === "image" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cover.image.src}
          alt=""
          aria-hidden
          loading={priority ? "eager" : "lazy"}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: cover.image.focus }}
        />
      )}
    </div>
  );

  return transitionName ? (
    <ViewTransition name={transitionName} share="morph" default="none">
      {inner}
    </ViewTransition>
  ) : (
    inner
  );
}
