"use client";

import { useSyncExternalStore } from "react";

/** Subscribe to a media query. Server snapshot is `false`. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mq = matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => matchMedia(query).matches,
    () => false,
  );
}

/** Current `location.search` (updates on back/forward). Server snapshot is "". */
export function useLocationSearch() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener("popstate", cb);
      return () => window.removeEventListener("popstate", cb);
    },
    () => window.location.search,
    () => "",
  );
}
