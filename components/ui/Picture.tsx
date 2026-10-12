import Image from "next/image";
import manifest from "@/data/image-manifest.json";
import type { Img } from "@/lib/types";

const sizesFor = {
  full: "(min-width: 1440px) 1360px, 100vw",
  wide: "(min-width: 1024px) 70vw, 100vw",
  half: "(min-width: 768px) 50vw, 100vw",
  third: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  /** a phone mockup shown at a fixed size, about 220px wide */
  phone: "240px",
} as const;

/**
 * Responsive, lazy image with intrinsic dimensions from data/image-manifest.json
 * (run `npm run images` after adding files), so nothing shifts while loading.
 */
export function Picture({
  img,
  size = "wide",
  className = "",
  priority = false,
  rounded = true,
  fit = false,
  contain = false,
}: {
  img: Img;
  size?: keyof typeof sizesFor;
  className?: string;
  priority?: boolean;
  rounded?: boolean;
  /** Keep the whole picture on screen: cap the height and centre it, never upscale past the column. */
  fit?: boolean;
  /** Fill the parent box and show the whole picture inside it (object-contain). */
  contain?: boolean;
}) {
  const dim = (manifest as Record<string, { w: number; h: number }>)[img.src] ?? { w: 1600, h: 1000 };
  return (
    <Image
      src={img.src}
      alt={img.alt}
      width={dim.w}
      height={dim.h}
      sizes={sizesFor[size]}
      priority={priority}
      className={`${contain ? "h-full w-full object-contain" : fit ? "mx-auto block h-auto" : "h-auto w-full"} ${img.cutout ? "" : `${rounded ? "rounded-media" : ""} bg-paper-deep`} ${img.mono ? "grayscale" : ""} ${className}`}
      style={{
        // fit: as wide as the column allows, but never taller than ~64vh, so the whole picture stays on screen
        ...(fit ? { width: `min(100%, calc(min(64vh, 560px) * ${(dim.w / dim.h).toFixed(4)})${img.native ? `, ${Math.round(dim.w * 1.15)}px` : ""})` } : {}),
        ...(img.focus ? { objectPosition: img.focus } : {}),
      }}
    />
  );
}
