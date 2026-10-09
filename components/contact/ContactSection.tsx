import { contact } from "@/data/portfolio";
import { ContactForm } from "./ContactForm";
import { CopyEmail } from "./CopyEmail";

/** The closing section on every page: an invitation, every channel, and a short form. */
export function ContactSection({ as: Heading = "h2" }: { as?: "h1" | "h2" }) {
  return (
    <section aria-labelledby="contact-heading" className="bg-night text-paper">
      <div className="container-page grid gap-14 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-6">
          <p className="meta text-marigold">Contact</p>
          <Heading id="contact-heading" className="mt-4 font-display-wonk text-h1">
            Got a messy problem? <span className="text-[0.6em] italic text-paper/70">Ping me</span>
          </Heading>
          <p className="mt-6 max-w-[34ch] text-lede text-paper/80">
            Open to roles, collaborations and good conversations. I reply to every message.
          </p>
          <ul className="mt-10 grid gap-3">
            <li>
              <CopyEmail email={contact.email} />
            </li>
            <li className="flex flex-wrap gap-x-6 gap-y-2 text-paper/80">
              <a className="underline-offset-4 hover:underline" href={contact.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
              <a className="underline-offset-4 hover:underline" href={contact.behance} target="_blank" rel="noreferrer">
                Behance ↗
              </a>
              <a className="underline-offset-4 hover:underline" href="/resume">
                View resume →
              </a>
            </li>
          </ul>
        </div>
        <div className="md:col-span-6 md:pt-10">
          <ContactForm tone="dark" />
        </div>
      </div>
    </section>
  );
}
