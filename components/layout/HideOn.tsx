"use client";

import { usePathname } from "next/navigation";

/** Renders children except on the given paths. */
export function HideOn({ paths, children }: { paths: string[]; children: React.ReactNode }) {
  const pathname = usePathname();
  return paths.includes(pathname) ? null : <>{children}</>;
}
