import { Caveat, Special_Elite } from "next/font/google";

/** Extra faces for the typewriter letter; loaded only on that page. */
export const typewriterFace = Special_Elite({ weight: "400", subsets: ["latin"], variable: "--font-typewriter", display: "swap" });
export const handFace = Caveat({ weight: ["400", "600"], subsets: ["latin"], variable: "--font-hand", display: "swap" });
