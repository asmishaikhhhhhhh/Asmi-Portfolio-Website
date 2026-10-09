/**
 * Playground: smaller explorations, shown on a pinboard where every card is held
 * up by a Clap It clip (Asmi's own product design).
 *
 * `href` can be internal (/work/…) or external. Items marked `needs` still need
 * details from Asmi before they're fully publishable.
 */
import type { Img } from "@/lib/types";

export type PlaygroundItem = {
  id: string;
  title: string;
  kind: string;
  blurb: string;
  image?: Img;
  href?: string;
  external?: boolean;
  /** Sticky-note style card with no image. */
  note?: boolean;
  needs?: string;
  /** Used by the home page "Beyond the main four" filter. */
  group?: "case" | "experiment";
};

export const playground: PlaygroundItem[] = [
  {
    id: "streaming-rereleases",
    title: "Streaming re-releases, 2024",
    kind: "Data visualisation",
    blurb: "How Netflix, Amazon and others re-released movies through 2024, by month and IMDB rating. Interactive.",
    image: { src: "/images/playground/streaming-rereleases.webp", alt: "A bubble chart in three rows of pastel circles by month, with March highlighted" },
    href: "/playground/streaming-rereleases",
  },
  {
    id: "haldi-on-water",
    title: "Haldi on water",
    kind: "Interactive experiment",
    blurb: "The Marangoni effect, kitchen edition. Drop soap or pigment and watch surface tension pull it apart.",
    image: { src: "/images/playground/haldi-on-water.webp", alt: "A bowl of water dusted with dark specks pushed outward in a ring by a drop, with a halo of yellow haldi" },
    href: "/playground/haldi-on-water",
  },
  {
    id: "write-a-letter",
    title: "Write a letter today",
    kind: "Interactive experiment",
    blurb: "Type a letter to someone on a typewriter, keys clacking, and download it as a PDF.",
    image: { src: "/images/playground/write-a-letter.webp", alt: "An ink-black typewriter with cream round keys and marigold return keys, a lined sheet of paper rolled in" },
    href: "/playground/write-a-letter",
  },
  {
    id: "celestial-influence",
    title: "Celestial Influence",
    kind: "Ethnographic study",
    blurb: "16 interviews and 2 group discussions on how zodiac signs shape identity and media.",
    image: { src: "/images/projects/celestial-influence/cover.webp", alt: "A zodiac wheel laid over a glowing full moon in a starry sky" },
    href: "https://medium.com/@shaikhasmi003/celestial-influence-in-modern-media-7b88ae98b22e",
    external: true,
  },
];
