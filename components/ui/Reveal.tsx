"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Fades and lifts content into view once. Content is always in the HTML (crawlers
 * and screen readers get it); with reduced motion it renders with no animation.
 * Use for secondary content only — never wrap a page's h1 or primary CTA.
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "figure";
}) {
  const reduce = useReducedMotion();
  const M = motion[as];
  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </M>
  );
}
