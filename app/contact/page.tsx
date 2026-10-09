import type { Metadata } from "next";
import { ContactSection } from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Asmi Shaikh about roles, collaborations or projects. Email, LinkedIn, Behance, or a quick message.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="pt-16">
      <ContactSection as="h1" />
    </div>
  );
}
