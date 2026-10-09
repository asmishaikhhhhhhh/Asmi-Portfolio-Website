"use client";

/**
 * Coded "living covers", one per project, built only from real project assets
 * (cropped from the Behance slides into /public/images/projects/<slug>/cover/).
 *
 * Coordinates are % of a 16:11 stage. A layer's height follows its image ratio:
 * height% = w% × (imgH / imgW) × 16/11.
 *
 * Captions only state what the slides say.
 */
import type { CoverComposition } from "@/lib/types";
import type { Composition } from "./types";
import { LeapstersShapes } from "./LeapstersShapes";
import { GreenlyLogo } from "./GreenlyLogo";
import { FireSafeLogo } from "./FireSafeLogo";
import { ClabLogo } from "./ClabLogo";
import { ChildHelpLogo } from "./ChildHelpLogo";
import { AiStrikeLogo } from "./AiStrikeLogo";
import { CelestialWheel } from "./CelestialWheel";
import { NetflixIntro } from "./NetflixIntro";
import { FiamaSlider } from "./FiamaSlider";
import { ClapItPin } from "./ClapItPin";
import { AdeiroWord } from "./AdeiroWord";


function Caption({ labels, scene, dark }: { labels: string[]; scene: number; dark?: boolean }) {
  return (
    <div
      aria-hidden
      className="absolute bottom-[5%] left-[4%] z-20 flex items-center gap-[1cqw] rounded-full px-[2cqw] py-[0.9cqw] text-[1.7cqw] font-medium tracking-wide"
      style={{
        background: dark ? "rgb(255 255 255 / .1)" : "rgb(255 255 255 / .75)",
        color: dark ? "#f4f0e8" : "#1a1916",
        backdropFilter: "blur(6px)",
      }}
    >
      <span className="inline-block h-[0.9cqw] w-[0.9cqw] rounded-full bg-marigold" />
      <span key={scene} className="cover-caption">
        {labels[scene % labels.length]}
      </span>
    </div>
  );
}

const leapsters: Composition = {
  bg: "#f18c21",
  // No image layers: the three Leapsters characters are drawn in code (LeapstersShapes).
  scenes: [[], []],
  sceneMs: 4200,
  overlay: ({ scene, playing }) => (
    <>
      <LeapstersShapes playing={playing} />
      <Caption scene={scene} labels={["Take small leaps with confidence.", "Board game + app, ages 5–12"]} />
    </>
  ),
};

const greenly: Composition = {
  bg: "#46992a",
  // No image layers: the Greenly logo is drawn and animated in code (GreenlyLogo).
  scenes: [[]],
  sceneMs: 5200,
  overlay: ({ scene, playing }) => (
    <>
      <GreenlyLogo playing={playing} />
      <Caption dark scene={scene} labels={["Connecting small-scale farmers to the market"]} />
    </>
  ),
};

const fireSafe: Composition = {
  dark: true,
  bg: "#141414",
  // No image layers: the Fire Safe mark is drawn and animated in code (FireSafeLogo).
  scenes: [[]],
  sceneMs: 6000,
  overlay: ({ playing }) => <FireSafeLogo playing={playing} />,
};

const clab: Composition = {
  dark: true,
  bg: "#8f49cd",
  // No image layers: the CLAB wordmark is drawn and animated in code (ClabLogo).
  scenes: [[]],
  sceneMs: 5000,
  overlay: ({ scene, playing }) => (
    <>
      <ClabLogo playing={playing} />
      <Caption dark scene={scene} labels={["Connecting creative minds"]} />
    </>
  ),
};

const netflix: Composition = {
  bg: "#000",
  // No image layers: the wordmark and ribbon N are drawn and animated in code (NetflixIntro).
  scenes: [[]],
  sceneMs: 8000,
  overlay: ({ playing }) => <NetflixIntro playing={playing} />,
};

const fiama: Composition = {
  dark: true,
  bg: "#2a1f4a",
  // No image layers: a full-bleed before/after slider that sweeps on its own (FiamaSlider).
  scenes: [[]],
  sceneMs: 7000,
  overlay: ({ playing }) => <FiamaSlider playing={playing} />,
};

const clapIt: Composition = {
  bg: "#ebebeb",
  // No image layers: the pin's arm swings open and shut on its hinge (ClapItPin).
  scenes: [[]],
  sceneMs: 5000,
  overlay: ({ playing }) => <ClapItPin playing={playing} />,
};

const adeiro: Composition = {
  dark: true,
  bg: "#2b211a",
  // No image layers: the brand photo with the wordmark spelling itself in (AdeiroWord).
  scenes: [[]],
  sceneMs: 7000,
  overlay: ({ playing }) => <AdeiroWord playing={playing} />,
};

const celestial: Composition = {
  dark: true,
  bg: "#050505",
  // The zodiac wheel artwork, with the wheel turning in code (CelestialWheel).
  scenes: [[], [], []],
  sceneMs: 2200,
  overlay: ({ scene, playing }) => (
    <>
      <CelestialWheel playing={playing} />
      <Caption dark scene={scene} labels={["Believers", "Enthusiasts", "Sceptics"]} />
    </>
  ),
};

const childHelp: Composition = {
  dark: true,
  bg: "#003466",
  // No image layers: the foundation's mark is drawn and animated in code (ChildHelpLogo).
  scenes: [[]],
  sceneMs: 5600,
  overlay: ({ playing }) => <ChildHelpLogo playing={playing} />,
};

const aistrike: Composition = {
  bg: "#fff9eb",
  // No image layers: the AiStrike wordmark and mark are drawn and animated in code (AiStrikeLogo).
  scenes: [[]],
  sceneMs: 6000,
  overlay: ({ playing }) => <AiStrikeLogo playing={playing} />,
};

export const compositions: Record<CoverComposition, Composition> = {
  aistrike,
  "child-help-foundation": childHelp,
  leapsters,
  greenly,
  "fire-safe": fireSafe,
  clab,
  "netflix-mobile": netflix,
  fiama,
  "clap-it": clapIt,
  adeiro,
  "celestial-influence": celestial,
};
