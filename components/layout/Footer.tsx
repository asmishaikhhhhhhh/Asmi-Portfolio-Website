import Link from "next/link";
import { ContactSection } from "@/components/contact/ContactSection";
import { HideOn } from "@/components/layout/HideOn";
import { nav } from "@/lib/site";

// Evaluated once when the module loads (build time for static pages).
const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer>
      {/* /contact renders its own contact section as the page itself */}
      <HideOn paths={["/contact"]}>
        <ContactSection />
      </HideOn>
      <div className="bg-night pb-28 text-paper/60">
        <div className="container-page flex flex-col gap-4 border-t border-paper/10 py-8 text-sm md:flex-row md:items-center md:justify-between">
          <p>© {year} Asmi Shaikh. Designed and built with too many iterations.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-paper">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
