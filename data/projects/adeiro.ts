import type { Project } from "@/lib/types";

const P = "/images/projects/adeiro";

const project: Project = {
  slug: "adeiro",
  title: "Adeiro",
  subtitle: "A botanical, elegant identity for skincare",
  oneLiner:
    "Brand identity and a full brand manual for Adeiro, a fictional Portuguese online skincare store with plans to expand to India.",
  tier: "playground",
  order: 1,
  kind: "Brand identity · Brand manual",
  year: "2023",
  duration: "15 days",
  role: "Graphic designer",
  team: { solo: true },
  disciplines: ["physical-brand"],
  thinking: ["visuals", "stories"],
  tags: ["Visual design", "Branding", "Brand identity", "Packaging"],
  tools: ["Illustrator", "Photoshop"],
  accent: "#404C42",
  // Matches the brand manual's paper, so the cut-out pages sit seamlessly
  pageBg: "#F9F8F6",
  cover: {
    type: "motion",
    composition: "adeiro",
    poster: {
      src: `${P}/cover/hero-poster.webp`,
      alt: "Adeiro face wash, skin mist toner and deep cleanser bottles beside a sage carton, each labelled ADEIRO, Make Them Adore, on cream and green plinths",
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
      stage: "overview",
      title: "Make them adore",
      blocks: [
        {
          type: "text",
          body: [
            "A branding project for a fictional company named Adeiro, a Portuguese word that means reality. It makes and sells skincare products and plans to expand to India.",
            "In keeping with the company's theme, the brand keeps a natural, intense vibe that suits its product category. So the visuals, typography and colours are sophisticated, botanical, rich and elegant.",
          ],
        },
        {
          type: "callout",
          label: "Brand promise",
          body: "Quality you can feel, comfort your skin can trust, and safety in every jar.",
        },
      ],
    },
    {
      id: "logo",
      stage: "solution",
      title: "Built on a grid, clear at any size",
      blocks: [
        {
          type: "text",
          heading: "Logo construction",
          body: ["Grid systems are a good starting point for balanced shapes in an identity. The grid also sets the clear space needed around the logo, which should be kept in every use."],
        },
        {
          type: "showcase",
          items: [
            {
              title: "Primary logo",
              body: "The wordmark and tagline, built on an X unit grid.",
              chips: ["8X wide", "5X tall"],
              span: 4,
              image: {
                src: `${P}/pdf/logo-primary-grid.webp`,
                cutout: true,
                alt: "The ADEIRO wordmark with Make Them Adore beneath it on a construction grid, measured in X units: 8X wide and 5X tall, with 2X, 0.5X and X spacings",
              },
            },
            {
              title: "Secondary logo",
              body: "The A monogram on its own grid.",
              chips: ["4.5X tall"],
              span: 2,
              image: {
                src: `${P}/pdf/logo-secondary-grid.webp`,
                cutout: true,
                alt: "The looped A monogram on a construction grid, 4.5X tall with 2X spacings",
              },
            },
          ],
        },
        {
          type: "text",
          heading: "Logo scalability",
          body: ["The logo stays clear even when scaled down to a small size, which gives flexibility."],
        },
        {
          type: "image",
          size: "wide",
          image: {
            src: `${P}/pdf/scalability.webp`,
            cutout: true,
            alt: "The primary lockup at 100mm, 50mm and 25mm, and the monogram at 15mm, 25mm and 50mm",
            caption: "Primary lockup from 100mm to 25mm; monogram from 50mm to 15mm.",
          },
        },
        {
          type: "text",
          heading: "Logo usability",
          body: ["How to use the logo on various backgrounds."],
        },
        {
          type: "image",
          size: "wide",
          image: {
            src: `${P}/pdf/usability-light-dark.webp`,
            cutout: true,
            alt: "The ADEIRO lockup in black on a white background and in white on a black background",
            caption: "On white and on black.",
          },
        },
        {
          type: "image",
          size: "wide",
          image: {
            src: `${P}/pdf/usability-backgrounds.webp`,
            alt: "Eight tiles with the Adeiro lockup: on two portrait photos, on light grey, deep olive, a leaf photo, dried leaves, sage and taupe",
            caption: "On photos and on the brand's earthy tones.",
          },
        },
        {
          type: "text",
          heading: "Final logo",
          body: ["The monogram combines the first two letters, A and D, so it can stand in for the brand on its own. The logo captures the essence of the brand, intense care, and reflects that it's for skincare."],
        },
        {
          type: "image",
          size: "inset",
          image: {
            src: `${P}/pdf/final-logo.webp`,
            cutout: true,
            alt: "The A monogram above the final ADEIRO wordmark with Make Them Adore, in dark green",
            caption: "Monogram and final logo.",
          },
        },
        {
          type: "text",
          heading: "Things you don't do",
          body: ["How not to use the logo."],
        },
        {
          type: "image",
          size: "wide",
          image: {
            src: `${P}/pdf/donts.webp`,
            cutout: true,
            alt: "Four misuse examples: the logo stretched out of proportion, rotated, in bright red, and at reduced opacity",
            caption: "Don't scale it out of proportion, rotate it, use a pop colour or reduce its opacity.",
          },
        },
      ],
    },
    {
      id: "system",
      stage: "solution",
      title: "One green, one blush, four typefaces",
      intro: "Colour and fonts, and how the type is used.",
      blocks: [
        {
          type: "palette",
          heading: "Colour",
          items: [
            {
              name: "Adeiro green",
              role: "Primary colour",
              hex: "#404C42",
              rgb: "64 · 76 · 66",
              cmyk: "16 · 0 · 13 · 70",
              body: "A deep, earthy green, used to highlight key features and elements.",
            },
            {
              name: "Serenade",
              role: "Secondary colour",
              hex: "#FFF0E4",
              rgb: "255 · 240 · 228",
              cmyk: "0 · 6 · 11 · 0",
              body: "A soft, warm blush that adds contrast in design and typography.",
            },
          ],
        },
        {
          type: "showcase",
          heading: "Typefaces",
          items: [
            {
              title: "Soage",
              body: "The primary typeface: tall, decorative capitals for the brand's voice.",
              chips: ["Primary"],
              span: 3,
              image: {
                src: `${P}/pdf/font-primary-specimen.webp`,
                cutout: true,
                alt: "Soage specimen: THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG and the numerals 0 to 9",
              },
            },
            {
              title: "Gilroy",
              body: "The secondary typeface: a clean geometric sans for everything else.",
              chips: ["Secondary"],
              span: 3,
              image: {
                src: `${P}/pdf/font-secondary-specimen.webp`,
                cutout: true,
                alt: "Gilroy specimen: The quick brown fox jumps over the lazy dog and the numerals 0 to 9",
              },
            },
          ],
        },
        {
          type: "text",
          heading: "Typographic usage",
          body: ["Lustria, a decorative font, for headers; Garet, a simple sans-serif, for sub-heads; and Garet Book for body copy."],
        },
        {
          type: "image",
          size: "wide",
          image: {
            src: `${P}/pdf/typography.webp`,
            cutout: true,
            alt: "Typographic usage table: Header in Lustria, sub-header in Garet, body copy in Garet Book, each with a sample",
          },
        },
      ],
    },
    {
      id: "applications",
      stage: "solution",
      title: "From letterhead to label",
      intro: "The brand manual, business collaterals and mockups.",
      blocks: [
        {
          type: "gallery",
          heading: "Brand manual",
          layout: "grid",
          columns: 2,
          images: [
            {
              src: `${P}/pdf/manual-cover.webp`,
              alt: "Hardcover brand manual mockup with the ADEIRO wordmark over a warm portrait",
            },
            {
              src: `${P}/pdf/manual-spread.webp`,
              alt: "The brand manual open on an introduction spread and an About Us spread",
            },
          ],
        },
        {
          type: "gallery",
          heading: "Business collaterals",
          layout: "grid",
          columns: 2,
          images: [
            {
              src: `${P}/pdf/collaterals-desk.webp`,
              alt: "Corporate stationery on a blush desk: a sealed envelope, a letterhead on a clipboard, business cards, a wax seal and a pen",
            },
            {
              src: `${P}/pdf/collaterals-set.webp`,
              alt: "Stationery set on grey: business cards, an envelope front and back, a letterhead and two pencils",
            },
          ],
        },
        {
          type: "image",
          size: "wide",
          image: {
            src: `${P}/pdf/envelope.webp`,
            alt: "Envelope front with the ADEIRO wordmark and address block, and back with the A monogram, 8.63 by 5.33 inches",
            caption: "Envelope, 8.63 × 5.33 in.",
          },
        },
        {
          type: "image",
          size: "wide",
          image: {
            src: `${P}/pdf/letterhead.webp`,
            alt: "Two A4 letterheads, 8.27 by 11.69 inches: a blank one and one with a sample letter, each with the ADEIRO wordmark",
            caption: "Letterhead, 8.27 × 11.69 in.",
          },
        },
        {
          type: "image",
          size: "wide",
          image: {
            src: `${P}/pdf/business-card.webp`,
            alt: "Business card front with the ADEIRO wordmark and a back with contact details and the A monogram, 3.5 by 2 inches",
            caption: "Business card, 3.5 × 2 in.",
          },
        },
        {
          type: "gallery",
          heading: "Mockups",
          layout: "grid",
          columns: 3,
          images: [
            {
              src: `${P}/pdf/mockup-bottles.webp`,
              alt: "Adeiro bottles and a carton in sage and cream on stone plinths",
            },
            {
              src: `${P}/pdf/mockup-candle.webp`,
              alt: "An Adeiro candle in a glass beside driftwood and dried pink branches",
            },
            {
              src: `${P}/pdf/mockup-oil.webp`,
              alt: "A matte white Adeiro bottle with a wooden cork",
            },
            {
              src: `${P}/pdf/mockup-cream.webp`,
              alt: "An Adeiro anti-ageing cream jar with its sage carton",
            },
            {
              src: `${P}/pdf/mockup-tags.webp`,
              alt: "Black and white Adeiro hang tags on string",
            },
            {
              src: `${P}/pdf/mockup-cards.webp`,
              alt: "Adeiro business cards on a round glass tray",
            },
          ],
        },
      ],
    },
    {
      id: "prototypes",
      stage: "solution",
      title: "Off the screen",
      intro: "High fidelity: mockups only go so far, so the labels also went onto real containers.",
      blocks: [
        {
          type: "gallery",
          layout: "grid",
          columns: 3,
          images: [
            {
              src: `${P}/pdf/hifi-serums.webp`,
              alt: "An Adeiro under-eye serum dropper (5ml) and a face serum tube (10ml) on black satin",
            },
            {
              src: `${P}/pdf/hifi-jars.webp`,
              alt: "Three Adeiro jars on black satin: nourishing gel, exfoliating scrub and firming mask pack",
            },
            {
              src: `${P}/pdf/hifi-set.webp`,
              alt: "The full Adeiro set stacked on white: jars, a dropper and a serum tube, with a printed Adeiro gift card in front",
            },
          ],
        },
      ],
    },
    {
      id: "takeaways",
      stage: "takeaways",
      title: "What I took away",
      blocks: [
        {
          type: "list",
          items: [
            "Translating a brand's core values into a visual identity through logo, typography and colour.",
            "Logo scalability, usability and construction, for a consistent brand presence.",
            "Why cohesive brand collateral, from stationery to packaging, strengthens recognition.",
            "Creating mockups to show the brand across real-world touchpoints.",
            "Balancing aesthetics and function so designs stay practical and appealing.",
            "Building a brand manual that keeps guidelines consistent across mediums.",
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
