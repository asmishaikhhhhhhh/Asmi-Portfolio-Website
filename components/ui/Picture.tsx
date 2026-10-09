import Image from "next/image";
import manifest from "@/data/image-manifest.json";
import type { Img } from "@/lib/types";

const sizesFor = {
  full: "(min-width: 1440px) 1360px, 100vw",
  wide: "(min-width: 1024px) 70vw, 100vw",
  half: "(min-width: 768px) 50vw, 100vw",
  third: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
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
}: {
  img: Img;
  size?: keyof typeof sizesFor;
  className?: string;
  priority?: boolean;
  rounded?: boolean;
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
      className={`h-auto w-full ${rounded ? "rounded-media" : ""} bg-paper-deep ${className}`}
      style={img.focus ? { objectPosition: img.focus } : undefined}
    />
  );
}
