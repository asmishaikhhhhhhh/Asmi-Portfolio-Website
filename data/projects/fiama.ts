import { needed, type Project } from "@/lib/types";

const P = "/images/projects/fiama";

const project: Project = {
  slug: "fiama",
  title: "Fiama Packaging Redesign",
  subtitle: "Teaching a soap box to explain itself",
  oneLiner:
    "A research-led redesign of ITC Fiama's Blackcurrant & Bearberry gel bar carton, built to fix its hierarchy and legibility and to explain the product properly.",
  tier: "focused",
  order: 2,
  kind: "Packaging · Research-led redesign",
  year: needed("Project year (the Behance post is dated Aug 2025; the slides don't say)"),
  duration: needed("How long the project took"),
  role: needed("Asmi's role on the project, and how it was split with Sarah Anil"),
  team: { solo: false, collaborators: ["Sarah Anil"] },
  disciplines: ["research", "physical-brand"],
  thinking: ["research", "people", "visuals"],
  tags: ["Packaging", "Consumer research", "Information hierarchy", "Illustration", "3D mockups"],
  tools: ["Illustrator", "Figma", "Blender 3D"],
  accent: "#4F3D86",
  cover: {
    type: "motion",
    composition: "fiama",
    poster: {
      src: `${P}/cover/new-front.webp`,
      alt: "The redesigned Fiama gel bar carton front: hand-painted bearberries and blackcurrants above a deep purple wave with the product name",
    },
  },
  proofPoint: "13-step research protocol behind one carton",
  quickRead: {
    problem:
      "Fiama's gel bar box was easy to spot on a shelf and hard to read up close. The hierarchy was unclear and it used too many typefaces. The fine print was all caps on low contrast, there were no usage instructions, and nothing told you what “radiant glow” or bearberry actually meant.",
    insight:
      "The soap did its job; the box didn't. When we rated what shoppers expected against what they got, functionality scored 5 out of 5, while usability scored 2 and reliability 1. Creativity, the level that covers the packaging, was the only one that fell below the line on our mood map.",
    solution:
      "We redrew the carton. Hand-painted berries sit above a navy band. The front explains the benefits and carries the dermatologist-tested seal. The back gets a three-step how-to-use, and the fine print is reset in sentence case in a single font, with a high-contrast price box.",
    result: needed("Was the redesign tested or reviewed? Any feedback?"),
  },
  chapters: [
    {
      id: "context",
      label: "Context",
      title: "Easy to spot, hard to read",
      intro:
        "Fiama's gel bars come in five variants. We picked Blackcurrant & Bearberry and audited its carton panel by panel.",
      blocks: [
        {
          type: "stats",
          items: [
            { value: "₹95", label: "MRP for one bar" },
            { value: "125g", label: "Net weight" },
            { value: "5", label: "Variants in the gel bar range" },
            { value: "18–45", label: "Target age range", note: "Marketed as unisex, skewed towards women" },
          ],
        },
        {
          type: "features",
          heading: "What the old box got wrong (and right)",
          items: [
            {
              title: "Front: fun, but vague",
              body: "The colours make it easy to identify and the names spark curiosity. But the hierarchy is muddled, the benefits get lost, and “radiant glow” has no context.",
              image: {
                src: `${P}/06.webp`,
                alt: "A hand holding the existing purple Fiama gel bar box, with pink and green callouts annotating its front",
              },
            },
            {
              title: "Back: charming copy, tiny type",
              body: "The rhyming description is fun to read, if you can read it. There's a picture of the soap printed on the soap box, and no instructions on how to use it.",
              image: {
                src: `${P}/07.webp`,
                alt: "A hand holding the back of the existing box: rhyming copy, a product photo, a barcode and a dermatologist-tested seal, with callouts",
              },
            },
            {
              title: "Details: too many typefaces",
              body: "The flaps mix several typefaces and alignments. “Laboratoire Naturel” appears with no explanation of what it is.",
              image: {
                src: `${P}/08.webp`,
                alt: "Close-ups of the old box's front, top flap and price panel, annotated with notes on alignment and typefaces",
              },
            },
            {
              title: "Fine print: a wall of caps",
              body: "Ingredients, contact details and manufacturing info run together in small capitals with little contrast against the purple. The print quality doesn't help.",
              image: {
                src: `${P}/09.webp`,
                alt: "The old box's side panel, densely printed in small white capitals on purple, with callouts about contrast and readability",
              },
            },
          ],
        },
      ],
    },
    {
      id: "research",
      label: "Research",
      title: "Thirteen ways of looking at a soap",
      intro:
        "Before redrawing anything, we tried to understand why people pick a soap and where the box helps or gets in the way.",
      blocks: [
        {
          type: "researchMethods",
          methods: [
            { name: "Market research" },
            { name: "Questionnaire and survey" },
            { name: "Competitor analysis", detail: "Dove, Pears, Cinthol, Lux and Dettol" },
            { name: "Discourse analysis" },
            { name: "Personal interviews" },
            { name: "Detailed packaging analysis" },
            { name: "Brand positioning and perceptual mapping" },
            { name: "Personas, journey and experience maps" },
            { name: "Emotional and motivational drivers" },
          ],
        },
        {
          type: "image",
          size: "wide",
          image: {
            src: `${P}/13.webp`,
            alt: "Positioning map with pricing on the vertical axis and packaging quality on the horizontal; Fiama sits on the bad-packaging side, while Pears, Dove, Lux and Cinthol sit on the good side",
            caption: "On price against packaging, Fiama landed on the wrong side of the line.",
          },
        },
        {
          type: "personas",
          heading: "Two shoppers",
          items: [
            {
              name: "Shreya Daga",
              age: "20",
              descriptor: "Novice · University student in Mumbai · Curious",
              needs: ["A soap that suits her skin type", "More lemon and lime scents", "Skin that feels rejuvenated"],
              frustrations: [
                "Packaging that's hard to open",
                "Soaps feel drier than body wash",
                "Most soaps don't match her skin type",
              ],
            },
            {
              name: "Jennifer D'Souza",
              age: "43",
              descriptor: "Advanced · Mumbai · Caring",
              needs: ["Healthy, radiant skin", "Gentle, non-irritating products", "Better skin texture and tone"],
              frustrations: ["Hard to find certain Fiama variants in stores", "The higher price of some Fiama products"],
            },
          ],
        },
        {
          type: "image",
          size: "wide",
          image: {
            src: `${P}/20.webp`,
            alt: "Customer journey table for the novice persona, from pre-purchase to post-purchase, with actions, thoughts, a feelings curve, pain points and opportunities",
            caption: "The feelings curve drops at purchase and stays low through unboxing, where the packaging is hard to remove.",
          },
        },
        {
          type: "needed",
          items: [
            "Survey and questionnaire sample size and key results",
            "How many people were interviewed, and who",
          ],
        },
      ],
    },
    {
      id: "insight",
      label: "Insights",
      title: "The soap was fine, the box wasn't",
      blocks: [
        {
          type: "stats",
          heading: "Expectations met, out of 5",
          items: [
            { value: "5/5", label: "Functionality", note: "Lathers well, feels good on the skin" },
            { value: "4/5", label: "Gratification", note: "Spa-like feel, fragrance, lather" },
            { value: "3/5", label: "Creativity", note: "Vibrant colours, long-lasting fragrance" },
            { value: "2/5", label: "Usability", note: "Includes user-friendly packaging" },
            { value: "1/5", label: "Reliability", note: "Dermatologist tested, natural, all skin types" },
          ],
          source: "Our pre-purchase expectations vs expectations-met ratings",
        },
        {
          type: "text",
          body: [
            "The trust signals were on the box, just easy to miss. “Dermatologist tested” was tucked onto the back, and the benefits of bearberry and blackcurrant weren't explained anywhere.",
            "On our mood map, gratification, usability, reliability and functionality all sat above the line. Creativity, the packaging, was the only one below it. So the brief became clear: keep the colour and personality, and make the box explain itself.",
          ],
        },
      ],
    },
    {
      id: "redesign",
      label: "Solution",
      title: "Same box, clearer story",
      intro: "Drag to compare the old panels with the new ones.",
      blocks: [
        {
          type: "beforeAfter",
          heading: "Front",
          before: {
            src: `${P}/compare/front-old.webp`,
            alt: "The old front: Fiama logo, red gel bar tag, script variant name and a photo of the soap with berries, crossed by audit callout lines",
          },
          after: {
            src: `${P}/compare/front-new.webp`,
            alt: "The new front: painted blackcurrants and red berries around a translucent soap, above a navy band reading Bearberry & Blackcurrant Gel Bar, with a dermatologically tested seal",
          },
          caption: "More breathing space and fewer typefaces. The benefit line is up front, and so is the dermatologist-tested seal.",
        },
        {
          type: "beforeAfter",
          heading: "Back",
          before: {
            src: `${P}/compare/back-old.webp`,
            alt: "The old back: rhyming copy in small script, a photo of the soap and shower gel, a dermatologist-tested seal and a barcode",
          },
          after: {
            src: `${P}/compare/back-new.webp`,
            alt: "The new back on lilac: a three-step How to use with line illustrations, tidy customer care details, a Safe on Skin icon and a barcode",
          },
          caption: "The redundant soap photo gives way to a how-to-use: wet the bar, apply gently, rinse.",
        },
        {
          type: "beforeAfter",
          heading: "Fine print",
          before: {
            src: `${P}/compare/fineprint-old.webp`,
            alt: "The old side panel: ingredients, contact and manufacturing details in small white capitals on purple",
          },
          after: {
            src: `${P}/compare/fineprint-new.webp`,
            alt: "The new ingredients panel: a sentence-case ingredient list on lilac, a Laboratoire Naturel label and painted blackcurrants",
          },
          caption: "Sentence case, one font, real contrast, and a line explaining what Laboratoire Naturel is.",
        },
        {
          type: "features",
          heading: "What changed",
          items: [
            {
              title: "Benefits, explained",
              body: "A side panel says what each berry does for the skin: bearberry for dark spots and wrinkles, blackcurrant for hydration.",
            },
            {
              title: "Trust on the front",
              body: "The dermatologist-tested seal moved to the front, and a “Safe on Skin” mark joined the back.",
            },
            {
              title: "Legible essentials",
              body: "Price, use-before date, batch number and weight now sit in a high-contrast navy box, set in one consistent font.",
            },
          ],
        },
        {
          type: "image",
          size: "full",
          image: {
            src: `${P}/40.webp`,
            alt: "Two 3D-rendered mockups of the redesigned carton over a dark marbled surface: the front on the left, the back with How to use on the right",
          },
        },
        {
          type: "image",
          size: "wide",
          image: {
            src: `${P}/41.webp`,
            alt: "Six-panel illustrated storyboard: a woman in a red dress walks a supermarket aisle, notices the new Fiama box and reads its front, benefits and ingredients",
            caption: "A storyboard of the shopper's path with the new pack. It's a scenario, not a test.",
          },
        },
      ],
    },
    {
      id: "reflection",
      label: "Reflection",
      title: "What's next",
      blocks: [
        {
          type: "needed",
          items: [
            "Was the redesign tested or reviewed? Any feedback?",
            "What Asmi learned, or would do differently (e.g. the hard-to-open pack and the inner plastic wrap were flagged but not redesigned)",
          ],
        },
      ],
    },
  ],
  contribution: {
    mine: needed("What Asmi personally did on Fiama (research, illustration, layout, 3D mockups?)"),
    team: needed("What Sarah Anil led, so the split is clear"),
  },
  links: { behance: "https://www.behance.net/gallery/233068557/Fiama-Packaging-Redesign" },
  seo: {
    title: "Fiama Packaging Redesign · Asmi Shaikh",
    description:
      "A research-led redesign of Fiama's gel bar carton: consumer research, personas and journey maps, then a clearer, more legible box.",
  },
};

export default project;
