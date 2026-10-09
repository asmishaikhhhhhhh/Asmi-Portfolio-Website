import { needed, type Project } from "@/lib/types";

const P = "/images/projects/adeiro";

const project: Project = {
  slug: "adeiro",
  title: "Adeiro",
  subtitle: "A brand manual for a skincare label that doesn't exist (yet)",
  oneLiner:
    "Brand identity and a full brand manual for Adeiro, a fictional Portuguese online skincare store with plans to expand to India.",
  tier: "playground",
  order: 1,
  kind: "Brand identity · Brand manual",
  year: "2023",
  duration: needed("How long the project took"),
  role: needed("Role title (e.g. Product designer)"),
  team: { solo: true },
  disciplines: ["physical-brand"],
  thinking: ["visuals", "stories"],
  tags: ["Branding", "Logo design", "Brand manual", "Packaging", "Stationery"],
  tools: ["Illustrator", "Photoshop"],
  accent: "#404C42",
  cover: {
    type: "motion",
    composition: "adeiro",
    poster: {
      src: `${P}/cover/hero-poster.webp`,
      alt: "The ADEIRO wordmark and “Make Them Adore” in white over a soft photo of a woman with curly hair holding a palm frond",
    },
  },
  proofPoint: "5 products prototyped with real Adeiro labels",
  quickRead: {
    problem:
      "Adeiro is a made-up skincare store with a real-sounding brief. It needed an identity that feels natural, intense and caring, and works at every size, from a 15mm monogram to a 650ml bottle.",
    insight:
      "The brand promises warmth, comfort and intense care, so the visuals had to feel earthy and mature rather than bright and clinical: botanical cues, a deep green, and no pop colours.",
    solution:
      "A wordmark with an A/D monogram, built on a construction grid. A two-colour palette, four typefaces, and rules for scale, backgrounds and misuse. All of it carried through stationery, packaging, a gift card and a brand manual.",
    result:
      "A complete brand manual, plus five products with Adeiro labels, photographed off-screen as physical prototypes.",
  },
  chapters: [
    {
      id: "brief",
      label: "Brief",
      title: "Make them adore",
      blocks: [
        {
          type: "text",
          body: [
            "Adeiro is a fictional online skincare store of Portuguese origin, planning to expand to India. The story: it started as a simple website that made it easy for women to order cleansers, serums, moisturisers and other essentials.",
            "I wanted the brand to feel sophisticated, botanical and elegant, with earthy, mature colours. The feelings it should leave behind are warmth, comfort and intense care. The tagline says the rest: Make Them Adore.",
          ],
        },
        {
          type: "callout",
          label: "Brand values",
          body: "Quality, comfort and safety.",
        },
      ],
    },
    {
      id: "logo",
      label: "Logo",
      title: "An A that holds a D",
      blocks: [
        {
          type: "image",
          size: "wide",
          image: {
            src: `${P}/05.webp`,
            alt: "Final logo page: the A monogram above the full ADEIRO wordmark with the tagline Make Them Adore, in dark green on cream",
          },
        },
        {
          type: "text",
          body: [
            "The monogram combines the first two letters, A and D, so it can stand in for the brand on its own. The same looped A leads the wordmark, so the two always read as a pair.",
          ],
        },
        {
          type: "image",
          size: "wide",
          image: {
            src: `${P}/06.webp`,
            alt: "Logo construction grids: the primary wordmark-and-tagline lockup measured in X and Y units (8X wide, 5X high), and the secondary A monogram on its own grid",
            caption: "Both logos sit on a grid that also sets the clear space around them.",
          },
        },
        {
          type: "stats",
          heading: "Scalability",
          items: [
            { value: "100 → 25mm", label: "Primary lockup, sizes shown" },
            { value: "50 → 15mm", label: "Monogram, sizes shown" },
          ],
        },
        {
          type: "gallery",
          layout: "grid",
          columns: 2,
          images: [
            {
              src: `${P}/09.webp`,
              alt: "Grid of eight tiles showing the Adeiro lockup on photos of women and foliage, dried leaves, and solid grey, olive, sage and taupe backgrounds",
              caption: "Logo on photos and on the brand's earthy tones.",
            },
            {
              src: `${P}/10.webp`,
              alt: "Four logo misuse examples: horizontally stretched, rotated, in bright red, and at reduced opacity",
              caption: "No stretching, rotating, pop colours or fading.",
            },
          ],
        },
      ],
    },
    {
      id: "system",
      label: "Colour & type",
      title: "One green, one blush, four typefaces",
      blocks: [
        {
          type: "features",
          heading: "Colour",
          items: [
            {
              title: "Primary · #404C42",
              body: "A deep, earthy green (R64 G76 B66 · C16 M0 Y13 K70) for highlighting key features and elements.",
            },
            {
              title: "Secondary · Serenade #FFF0E4",
              body: "A soft, warm blush (C0 M6 Y11 K0) used for contrast in layouts and typography.",
            },
          ],
        },
        {
          type: "needed",
          items: [
            "Confirm the secondary colour: the slide prints HEX #FFF0E4 but RGB 225/240/228, which don't match (#FFF0E4 = 255/240/228)",
          ],
        },
        {
          type: "features",
          heading: "Typography",
          items: [
            { title: "Soage", body: "Primary typeface." },
            { title: "Gilroy", body: "Secondary typeface." },
            { title: "Lustria", body: "A decorative face for headers." },
            { title: "Garet · Garet Book", body: "A simple sans-serif for sub-heads, with the Book weight for body copy." },
          ],
        },
      ],
    },
    {
      id: "applications",
      label: "Applications",
      title: "From letterhead to label",
      blocks: [
        {
          type: "gallery",
          layout: "grid",
          columns: 2,
          images: [
            {
              src: `${P}/20.webp`,
              alt: "Stationery set on light grey: business card front and back, a DL envelope front and back, an A4 letterhead and two pencils in dark green and taupe",
            },
            {
              src: `${P}/21.webp`,
              alt: "Two hang tags on string: a black tag with a cream A monogram and a textured white tag with the black ADEIRO wordmark",
            },
            {
              src: `${P}/27.webp`,
              alt: "A matte white bottle with a wooden cork and a gold Adeiro lockup on a white background",
            },
            {
              src: `${P}/31.webp`,
              alt: "Hardcover brand manual mockup with the ADEIRO wordmark and tagline over a warm, blurred portrait",
            },
          ],
        },
        {
          type: "image",
          size: "wide",
          image: {
            src: `${P}/33.webp`,
            alt: "The brand manual open on a spread: a photo page with the wordmark on the left, the logo usability grid on the right",
            caption: "The rules, collected into a manual.",
          },
        },
      ],
    },
    {
      id: "prototypes",
      label: "Prototypes",
      title: "Off the screen",
      intro: "Mockups only go so far. The labels also went onto real containers.",
      blocks: [
        {
          type: "gallery",
          layout: "grid",
          columns: 2,
          images: [
            {
              src: `${P}/35.webp`,
              alt: "Photo of real products on black satin: a dropper and a tube labelled Under-Eye Serum and Face Serum, and three jars labelled Nourishing Gel, Exfoliating Scrub and Firming Mask Pack",
            },
            {
              src: `${P}/36.webp`,
              alt: "The same jars, dropper and tube stacked on a white surface, with a printed Adeiro gift card in front",
            },
          ],
        },
        {
          type: "needed",
          items: [
            "Who made and printed the physical prototypes, and how",
            "What Asmi learned, or would do differently",
          ],
        },
      ],
    },
  ],
  contribution: {
    mine: [
      "Brand concept, name rationale and tagline",
      "Wordmark, A/D monogram and construction grid",
      "Colour palette, typography and usage rules",
      "Stationery, packaging, hang tags and gift card applications",
      "Brand manual layout",
    ],
  },
  links: { behance: "https://www.behance.net/gallery/232296895/Adeiro-A-skincare-branding-project" },
  seo: {
    title: "Adeiro skincare brand identity · Asmi Shaikh",
    description:
      "Brand identity and manual for Adeiro, a fictional skincare brand: monogram, logo grid, palette, typography, stationery and physical product prototypes.",
  },
};

export default project;
