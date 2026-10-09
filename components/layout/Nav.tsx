"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { nav } from "@/lib/site";
import { contact } from "@/data/portfolio";

const isActive = (pathname: string, href: string) =>
  pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

/**
 * Desktop: a slim floating bar that tucks away while scrolling down and returns
 * on scroll up, so it's always one flick away but never covers work.
 * Mobile: a minimal top bar plus a thumb-reach bottom bar (Work · About · Ask · Menu).
 */
export function Nav() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      setScrolled(y > 8);
      if (y < 240 || dy < -4) setHidden(false);
      else if (dy > 4) setHidden(true);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation (adjust state during render, not in an effect).
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  // Lock scroll while the mobile menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <>
      {/* Slim top header, identical on every screen size: logo + one call to action.
          Navigation lives in the bottom bar so it never changes between devices. */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out-soft ${
          hidden && !menuOpen ? "-translate-y-full" : ""
        }`}
      >
        <div
          className={`container-page flex h-16 items-center justify-between gap-6 transition-[background-color,box-shadow] duration-300 ${
            scrolled || menuOpen ? "bg-paper/95 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "bg-transparent"
          }`}
        >
          <Link
            href="/"
            className="group flex items-baseline gap-1.5 font-display-soft text-[1.35rem] font-medium tracking-tight"
            aria-label="Asmi Shaikh, home"
          >
            Asmi
            <span aria-hidden className="inline-block text-marigold transition-transform duration-500 group-hover:rotate-90">
              ✦
            </span>
          </Link>
          <Link href="/contact" className="meta text-ink-soft transition-colors hover:text-ink">
            Let&rsquo;s talk
          </Link>
        </div>
      </header>

      {/* Bottom bar on every screen size: Work · About · Menu, full width beside
          the round Ask Asmi button at the bottom right. */}
      <nav
        aria-label="Primary"
        className="fixed bottom-3 left-3 right-[4.75rem] z-50"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="flex items-stretch justify-between rounded-full bg-ink/95 p-1.5 text-paper shadow-float backdrop-blur">
          {[
            { href: "/work", label: "Work" },
            { href: "/about", label: "About" },
          ].map((item) => (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className="flex h-11 items-center justify-center rounded-full text-[0.95rem] aria-[current=page]:bg-paper/15"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="flex-1">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-11 w-full items-center justify-center rounded-full text-[0.95rem]"
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </li>
        </ul>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 flex flex-col bg-paper px-6 pb-28 pt-24 md:px-10"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
            onKeyDown={(e) => e.key === "Escape" && setMenuOpen(false)}
          >
            <ul className="flex flex-col gap-1">
              {[{ href: "/", label: "Home" }, ...nav, { href: "/contact", label: "Contact" }].map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="block py-2 font-display-soft text-h1 aria-[current=page]:text-forest"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 text-ink-soft">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href={contact.behance} target="_blank" rel="noreferrer">Behance ↗</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
