import { Fredoka, Poppins } from "next/font/google";

// Leapsters' typefaces, from the deck's material design sheet
export const fredoka = Fredoka({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
export const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });
