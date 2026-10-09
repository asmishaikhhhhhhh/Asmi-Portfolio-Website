import type { CSSProperties, ReactNode } from "react";

export type Enter = "up" | "down" | "left" | "right" | "scale" | "fade" | "wipe";

export type Layer = {
  src: string;
  /** Layers are decorative inside a cover (the cover has one accessible label). */
  /** Position/size as % of the stage: left/top/width (height follows the image ratio). */
  x: number;
  y: number;
  w: number;
  /** Resting rotation in degrees. */
  rotate?: number;
  enter?: Enter;
  /** Delay within the scene (ms). */
  delay?: number;
  /** Rounded corners (cqw units). Phones already have their own frame. */
  radius?: number;
  shadow?: boolean;
  z?: number;
  /** Gentle idle drift while the scene is showing. */
  drift?: boolean;
  style?: CSSProperties;
  /** Base layers only: per-scene overrides, indexed by scene. Lets one element move between scenes. */
  at?: Array<Partial<Pick<Layer, "x" | "y" | "w" | "rotate">> & { hidden?: boolean }>;
};

export type Composition = {
  /** Stage background (CSS colour or gradient). */
  bg: string;
  /** Layers shown in every scene. */
  base?: Layer[];
  /** Each scene's layers. Scene 0 is the still/poster state. */
  scenes: Layer[][];
  /** Milliseconds per scene. */
  sceneMs?: number;
  /** Optional coded overlay (counters, labels…), told which scene is active. */
  overlay?: (props: { scene: number; playing: boolean }) => ReactNode;
  /** Dark stages get light UI. */
  dark?: boolean;
};
