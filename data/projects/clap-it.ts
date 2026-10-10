import type { Project } from "@/lib/types";

const P = "/images/projects/clap-it";

const project: Project = {
  slug: "clap-it",
  title: "Clap It",
  subtitle: "Don't pin it, just Clap it!",
  oneLiner:
    "A magnetic, hinged board pin that clamps paper instead of piercing it, with back options for cork, magnetic and glossy surfaces.",
  tier: "focused",
  order: 3,
  kind: "Product design · Everyday object",
  year: "2022",
  duration: "75 hours",
  role: "Product designer",
  team: { solo: true },
  disciplines: ["physical-brand"],
  thinking: ["people", "play", "visuals"],
  tags: ["Simple product design", "Ideation & conceptualisation", "Branding", "Redesign", "CAD", "CMF"],
  tools: ["Photoshop", "Blender 3D"],
  accent: "#1C2B3F",
  cover: {
    type: "video",
    src: `${P}/cover/hero.mp4`,
    poster: {
      src: `${P}/cover/hero-poster.webp`,
      alt: "3D render of Clap It in matte black, its hinged lid gently opening and closing above the pin",
    },
  },
  proofPoint: "75 hours from mind map to prototype",
  quickRead: {
    problem:
      "Push pins punch holes, tear and crease paper, roll away, and poke the hands and feet of whoever finds them on the floor. The tiny thing we use to hold up notices quietly damages the notices.",
    insight:
      "Pinning through the paper holds it firmly but damages it. Pinning at the edge is kinder but weaker. So the grip has to come from something other than a hole.",
    solution:
      "A 2.7cm hinged clamshell that closes on the paper with magnets on both inner faces. A small cap gives you something to grip when opening it. Three back options (a pin, a magnet or a suction cup) let it sit on cork, magnetic boards or glossy surfaces.",
    result: "Rated 4.5 out of 5 in user testing.",
  },
  chapters: [
    {
      id: "overview",
      stage: "overview",
      title: "Holds paper without a single hole",
      intro:
        "Soft board pins designed to attach documents easily and securely, without damaging the paper. An enhanced grip and a larger surface reduce thumb discomfort, for better organisation, presentation and comfort at work and in school.",
      blocks: [
        {
          type: "iconRow",
          heading: "Target audience",
          items: [
            { title: "Students and teachers", body: "Pinning projects, notices and class work.", icon: "students" },
            { title: "Working professionals", body: "Updates, reports and targets on office boards.", icon: "work" },
            { title: "Home users", body: "Soft boards for organisation, reminders and creative displays.", icon: "home" },
            { title: "Anyone", body: "Any individual who uses board pins.", icon: "people" },
          ],
        },
      ],
    },
    {
      id: "mind-map",
      stage: "research",
      title: "Small pin, lots of problems",
      intro:
        "I started with a mind map of everything a board pin touches: the pin, the paper, the board and the people who use it.",
      blocks: [
        {
          type: "callout",
          label: "The goal",
          body: "Minimise the damage board pins do to paper, while still holding it firmly in place.",
        },
        {
          type: "image",
          size: "full",
          image: {
            src: `${P}/02-cut.webp`,
            cutout: true,
            alt: "Radial mind map around the goal statement, with branches for pin types, parts, materials, paper sizes, boards, users, uses and problems, plus photos of fingers holding a push pin and of damaged paper",
          },
        },
        {
          type: "features",
          heading: "What goes wrong",
          items: [
            { title: "Damage", body: "Holes from the pin, tears from thin paper or wind, and creases from pin pressure." },
            { title: "Handling", body: "Straight pins need more force; at the wrong angle the paper falls. Holding multiple sheets is another problem." },
            { title: "Safety", body: "An exposed tip pokes hands, and a dropped pin rolls away until a shoe sole finds it." },
          ],
        },
        {
          type: "text",
          heading: "Who pins things",
          body: [
            "Students putting up projects and exhibitions, children doing crafts, and teachers, project heads and organisations posting notices, reports and monthly targets.",
          ],
        },
      ],
    },
    {
      id: "problem",
      stage: "problem",
      title: "Small surface, sore thumbs",
      blocks: [
        {
          type: "hmw",
          label: "Problem statement",
          statement:
            "Users struggle with traditional soft board pins: documents are hard to secure and the small surface hurts the thumb, which leads to disorganisation, damaged materials and less effective communication at work and in school.",
        },
        {
          type: "features",
          heading: "Product MVP",
          items: [
            { title: "Comfort", body: "An enlarged surface and ergonomic grip to reduce thumb discomfort." },
            { title: "Hold", body: "A secure attachment that holds documents without damage or slipping." },
            { title: "Durability", body: "Durable materials and robust construction for longevity and reliability." },
          ],
        },
      ],
    },
    {
      id: "ideas",
      stage: "ideation",
      title: "Nine sketches, five rules",
      intro: "The sketches were guided by five design concerns: easy push and pull, a strong grip, a definite hold, better accuracy, and safety.",
      blocks: [
        {
          type: "image",
          size: "wide",
          image: {
            src: `${P}/03-cut.webp`,
            cutout: true,
            alt: "Sheet of pencil concept sketches: a grooved pinch-grip pin, a wedge head with an extended needle, a magnetic N/S clip, stacked adhesive discs, a bent-wire clip, a pin dispenser and a pen-style pusher",
          },
        },
        {
          type: "text",
          body: [
            "The sketches explored grip (grooves, an easy pinch), accuracy (an extended needle you can see) and gentler contact (soft edges so the paper doesn't crease).",
            "Two ideas pointed away from piercing altogether: adhesive discs that “stick everywhere” and a clip held shut by magnets.",
          ],
        },
      ],
    },
    {
      id: "making",
      stage: "ideation",
      title: "From foam to clamshell",
      intro: "Mid-fidelity prototypes and testing, then CAD models.",
      blocks: [
        {
          type: "process",
          steps: [
            {
              title: "Mid-fidelity mock-ups",
              body: "I made quick physical tests: a paperclip on a small block clipped over a paper corner, and a foam wedge with a needle, shaped for a pinch grip.",
              image: {
                src: `${P}/04-notitle.webp`,
                alt: "Four greyscale photos: a paperclip-and-block mock-up on a paper corner, the same mock-up alone, and a white foam wedge with a needle held between finger and thumb",
              },
            },
            {
              title: "First CAD model",
              body: "A rounded capsule seen from the top, and a block with a slot and a pin from the side.",
              image: {
                src: `${P}/05-notitle.webp`,
                alt: "CAD renders on dark grey: a white rounded capsule from the top, and a wood-textured block with a slot and protruding pin from the side",
              },
            },
            {
              title: "Final form",
              body: "A D-shaped, two-part clamshell. The lid hinges open, and a pin on the back of the base goes into the board.",
              image: {
                src: `${P}/06-notitle.webp`,
                alt: "CAD renders on mid grey: the black D-shaped body from the top with a small tab, and from the side with the lid hinged open and a pin protruding from the back",
              },
            },
          ],
        },
      ],
    },
    {
      id: "solution",
      stage: "solution",
      title: "Clap, hold, done",
      intro: "The final high-fidelity prototype.",
      blocks: [
        {
          type: "iconRow",
          heading: "Key features",
          items: [
            { title: "Durable", body: "Durable construction for longevity.", icon: "durable" },
            { title: "Easy grip", body: "An easy-grip head for comfortable handling.", icon: "grip" },
            { title: "Safe", body: "Safety considerations to prevent injuries.", icon: "safe" },
            { title: "Versatile", body: "Works on various surfaces.", icon: "versatile" },
          ],
        },
        {
          type: "features",
          items: [
            {
              title: "Magnets do the holding",
              body: "Magnets on both inner faces clamp the sheet. The aim is to hold paper of any GSM without making a hole in it.",
              image: {
                src: `${P}/magnet-detail.webp`,
                cutout: true,
                alt: "Close-up render of the closed device, with callouts: a cap for better grip while opening, and a magnet line to hold paper of any GSM without damaging it",
              },
            },
            {
              title: "One body, three ways to mount",
              body: "A magnet for magnetic boards, a suction cup for smooth glossy surfaces, and a pin for soft or cork boards. A small cap gives your thumb something to grip.",
              image: {
                src: `${P}/mounts.webp`,
                cutout: true,
                alt: "Three renders of the open device: with a magnet back for magnetic boards, a suction cup for smooth glossy surfaces, and a pin for soft or cork boards",
              },
            },
          ],
        },
        {
          type: "featureStats",
          feature: {
            title: "CMF",
            body: "Rubber, stainless steel and PLA, in a semi-gloss finish. Colours: a warm sand (#E6B87A) and a near-black (#242422).",
            image: {
              src: `${P}/08-cut.webp`,
              cutout: true,
              alt: "CMF board: suction-cup and pin variants of the device linked by leader lines to a near-black colour swatch, rubber, stainless steel and PLA material swatches, and a semi-gloss finish sample",
            },
          },
          statsTitle: "Measurements",
          stats: [
            { value: "2.7cm", label: "Tall, held in a pinch" },
            { value: "5mm", label: "Thickness of each half" },
            { value: "13.2mm", label: "Pin length" },
            { value: "3", label: "Mounting backs" },
          ],
        },
        {
          type: "gallery",
          layout: "grid",
          columns: 2,
          images: [
            {
              src: `${P}/09-cut.webp`,
              cutout: true,
              alt: "Grey technical side elevation of the open device with dimension lines in millimetres",
              caption: "Technical view, in mm.",
            },
            {
              src: `${P}/10-cut.webp`,
              cutout: true,
              alt: "Two hands pinching the closed black device between thumb and forefinger, with a bracket marking its 2.7cm height",
              caption: "Held in a thumb-and-finger pinch.",
            },
          ],
        },
      ],
    },
    {
      id: "testing",
      stage: "testing",
      title: "On the board",
      blocks: [
        {
          type: "mediaText",
          image: {
            src: `${P}/11-photos.webp`,
            alt: "Three photos of the black physical prototype clipping a white sheet to a beige pinboard; in the middle photo a hand lifts the device off the sheet",
          },
          label: "User testing",
          title: "Tested on a real pinboard",
          body: [
            "I tested a physical prototype by clipping a sheet to a pinboard.",
            "It held the paper in place at the top edge, with no hole through it, and came off again with one hand, ready for the next notice.",
          ],
          rating: { value: 4.5, max: 5, label: "User testing rating" },
        },
        {
          type: "groups",
          heading: "SWOT analysis",
          groups: [
            {
              title: "Strengths",
              items: ["Versatile for multiple uses", "Low-cost and widely available", "Simple and user-friendly design", "Customisable in colour, size and finish"],
            },
            {
              title: "Weaknesses",
              items: ["Low load capacity", "Safety risks from sharp tips", "Perceived as low-quality", "High market saturation"],
            },
            {
              title: "Opportunities",
              items: ["Innovative product applications", "Personalised and custom designs", "Expansion into new markets (toys, DIY, office)"],
            },
            {
              title: "Threats",
              items: ["High market competition", "Shifting consumer preferences", "Regulatory and safety changes", "Supply chain disruptions"],
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
            "Balancing functionality with user comfort matters, even in everyday tools.",
            "Simple, overlooked products hold real opportunities for design innovation.",
            "Safety and usability count in shared spaces like homes, schools and offices.",
            "Experience running a SWOT analysis to judge a product's viability.",
            "Market gaps and customisation are strategies for standing out.",
          ],
        },
      ],
    },
  ],
  contribution: {
    hidden: true,
    mine: [
      "Mapped the problem space: pins, papers, boards, users and failure modes",
      "Sketched about nine concepts against five design concerns",
      "Built foam and paperclip mock-ups",
      "Modelled, rendered and specified the final form (CAD, CMF, dimensions)",
      "Tested a physical prototype on a pinboard",
    ],
  },
  links: { behance: "https://www.behance.net/gallery/233082833/Clap-It-Simple-Product-Design" },
  seo: {
    title: "Clap It: a board pin that doesn't pierce · Asmi Shaikh",
    description:
      "A 75-hour product design project: a magnetic, hinged board pin that holds paper without holes, from mind map and sketches to CAD and a tested prototype.",
  },
};

export default project;
