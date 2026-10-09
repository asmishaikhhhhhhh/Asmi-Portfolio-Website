"use client";

import { useEffect, useState } from "react";
import type { Composition, Enter, Layer } from "./types";

const offset: Record<Enter, string> = {
  up: "translate3d(0, 14%, 0)",
  down: "translate3d(0, -14%, 0)",
  left: "translate3d(-18%, 0, 0)",
  right: "translate3d(18%, 0, 0)",
  scale: "scale(0.86)",
  fade: "none",
  wipe: "none",
};

function LayerImg({ layer: base, state, scene }: { layer: Layer; state: "in" | "out"; scene?: number }) {
  const o = scene !== undefined ? base.at?.[scene] : undefined;
  const layer = o ? { ...base, ...o } : base;
  if (o?.hidden) state = "out";
  const enter = layer.enter ?? "up";
  const rest = `rotate(${layer.rotate ?? 0}deg)`;
  const hidden = state === "out";
  return (
    // Decorative: the Cover carries a single descriptive label.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={layer.src}
      alt=""
      aria-hidden
      draggable={false}
      loading="lazy"
      decoding="async"
      className={`absolute select-none ${layer.drift && !hidden ? "cover-drift" : ""}`}
      style={{
        left: `${layer.x}%`,
        top: `${layer.y}%`,
        width: `${layer.w}%`,
        zIndex: layer.z,
        borderRadius: layer.radius ? `${layer.radius}cqw` : undefined,
        boxShadow: layer.shadow ? "0 2cqw 5cqw -1.5cqw rgb(0 0 0 / .35)" : undefined,
        opacity: hidden ? 0 : 1,
        clipPath: enter === "wipe" ? (hidden ? "inset(0 100% 0 0)" : "inset(0 0 0 0)") : undefined,
        transform: hidden ? `${offset[enter] === "none" ? "" : offset[enter]} ${rest}` : rest,
        transition: `opacity 700ms var(--ease-out-soft), transform 900ms var(--ease-out-soft), clip-path 1100ms var(--ease-in-out-soft), left 900ms var(--ease-out-soft), top 900ms var(--ease-out-soft), width 900ms var(--ease-out-soft)`,
        transitionDelay: hidden ? "0ms" : `${layer.delay ?? 0}ms`,
        ...layer.style,
      }}
    />
  );
}

/**
 * Renders a coded cover composition. When `playing` is false it shows scene 0,
 * fully composed: that is the still frame (and the reduced-motion experience).
 */
export function Stage({ comp, playing }: { comp: Composition; playing: boolean }) {
  const [scene, setScene] = useState(0);
  const n = comp.scenes.length;

  useEffect(() => {
    if (!playing) {
      setScene(0);
      return;
    }
    const ms = comp.sceneMs ?? 2600;
    // Start the first change sooner so hovering feels responsive.
    let t = setTimeout(function step() {
      setScene((s) => (s + 1) % n);
      t = setTimeout(step, ms);
    }, 700);
    return () => clearTimeout(t);
  }, [playing, n, comp.sceneMs]);

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: comp.bg, containerType: "inline-size" }}>
      {comp.base?.map((l, i) => <LayerImg key={`b${i}`} layer={l} state="in" scene={scene} />)}
      {comp.scenes.map((layers, si) =>
        layers.map((l, li) => <LayerImg key={`${si}-${li}`} layer={l} state={si === scene ? "in" : "out"} />),
      )}
      {comp.overlay?.({ scene, playing })}
    </div>
  );
}
