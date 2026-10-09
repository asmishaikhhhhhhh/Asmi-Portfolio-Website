import type { Metadata, Viewport } from "next";
import { Fraunces, Geist } from "next/font/google";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Cursor } from "@/components/ui/Cursor";
import { AskAsmi } from "@/components/chat/AskAsmi";
import { JsonLd } from "@/components/seo/JsonLd";
import { personJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s · Asmi Shaikh" },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    "Asmi Shaikh",
    "multidisciplinary designer",
    "UX designer Mumbai",
    "product designer",
    "service design",
    "design research",
    "NMIMS School of Design",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: "/",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#f4f0e8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${geist.variable}`}>
      <body className="min-h-dvh flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-control focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <AskAsmi />
        <Cursor />
        <JsonLd data={personJsonLd()} />
      </body>
    </html>
  );
}
