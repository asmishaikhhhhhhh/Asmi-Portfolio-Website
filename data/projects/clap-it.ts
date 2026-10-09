import { needed, type Project } from "@/lib/types";

const P = "/images/projects/clap-it";

const project: Project = {
  slug: "clap-it",
  title: "Clap It",
  subtitle: "A board pin that leaves your paper alone",
  oneLiner:
    "A magnetic, hinged board pin that clamps paper instead of piercing it, with back options for cork, magnetic and glossy surfaces.",
  tier: "focused",
  order: 3,
  kind: "Product design · Everyday object",
  year: needed("Project year (the Behance post is dated Aug 2025; the slides don't say)"),
  duration: "75 hours",
  role: needed("Role title (e.g. Product designer)"),
  team: { solo: true },
  disciplines: ["physical-brand"],
  thinking: ["people", "play", "visuals"],
  tags: ["Product design", "Ergonomics", "Prototyping", "CAD", "CMF", "3D rendering"],
  tools: ["Photoshop", "Blender 3D"],
  accent: "#1C2B3F",
  cover: {
    type: "motion",
    composition: "clap-it",
    poster: {
      src: `${P}/cover/side-poster.webp`,
      alt: "Side view of Clap It in matte black: the hinged arm open at an angle from the rounded body, the pin tip at its end",
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
    result: needed("What did user testing show? (The testing slide has photos and an unlabelled 4.5/5 graphic, but no findings.)"),
  },
  chapters: [
    {
      id: "problem",
      label: "Problem",
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
            src: `${P}/02.webp`,
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
      id: "ideas",
      label: "Exploration",
      title: "Nine sketches, five rules",
      intro: "The sketches were guided by five design concerns: easy push and pull, a strong grip, a definite hold, better accuracy, and safety.",
      blocks: [
        {
          type: "image",
          size: "wide",
          image: {
            src: `${P}/03.webp`,
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
      label: "Prototyping",
      title: "From foam to clamshell",
      blocks: [
        {
          type: "process",
          steps: [
            {
              title: "Mid-fidelity mock-ups",
              body: "I made quick physical tests: a paperclip on a small block clipped over a paper corner, and a foam wedge with a needle, shaped for a pinch grip.",
              image: {
                src: `${P}/04.webp`,
                alt: "Four greyscale photos: a paperclip-and-block mock-up on a paper corner, the same mock-up alone, and a white foam wedge with a needle held between finger and thumb",
              },
            },
            {
              title: "First CAD model",
              body: "A rounded capsule seen from the top, and a block with a slot and a pin from the side.",
              image: {
                src: `${P}/05.webp`,
                alt: "CAD renders on dark grey: a white rounded capsule from the top, and a wood-textured block with a slot and protruding pin from the side",
              },
            },
            {
              title: "Final form",
              body: "A D-shaped, two-part clamshell. The lid hinges open, and a pin on the back of the base goes into the board.",
              image: {
                src: `${P}/06.webp`,
                alt: "CAD renders on mid grey: the black D-shaped body from the top with a small tab, and from the side with the lid hinged open and a pin protruding from the back",
              },
            },
          ],
        },
      ],
    },
    {
      id: "solution",
      label: "Solution",
      title: "Clap, hold, done",
      blocks: [
        {
          type: "features",
          items: [
            {
              title: "Magnets do the holding",
              body: "Magnets on both inner faces clamp the sheet. The aim is to hold paper of any GSM without making a hole in it.",
              image: {
                src: `${P}/07.webp`,
                alt: "Close-up render of the closed device with callouts for the grip cap and the magnet line, beside three renders of the open device with magnet, suction-cup and pin backs",
              },
            },
            {
              title: "One body, three ways to mount",
              body: "A magnet for magnetic boards, a suction cup for smooth glossy surfaces, and a pin for soft or cork boards. A small cap gives your thumb something to grip.",
            },
            {
              title: "CMF",
              body: "PLA, rubber and stainless steel in a semi-gloss near-black (#242422).",
              image: {
                src: `${P}/08.webp`,
                alt: "CMF board: suction-cup and pin variants of the device linked by leader lines to a near-black colour swatch, rubber, stainless steel and PLA material swatches, and a semi-gloss finish sample",
              },
            },
          ],
        },
        {
          type: "stats",
          items: [
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
              src: `${P}/09.webp`,
              alt: "Grey technical side elevation of the open device with dimension lines in millimetres",
              caption: "Technical view, in mm.",
            },
            {
              src: `${P}/10.webp`,
              alt: "Two hands pinching the closed black device between thumb and forefinger, with a bracket marking its 2.7cm height",
              caption: "Held in a thumb-and-finger pinch.",
            },
          ],
        },
      ],
    },
    {
      id: "testing",
      label: "Validation",
      title: "On the board",
      blocks: [
        {
          type: "gallery",
          layout: "strip",
          images: [
            {
              src: `${P}/11.webp`,
              alt: "Three photos of a black physical prototype clipping a white sheet to a beige pinboard; in the middle photo a hand lifts the device off the sheet",
            },
          ],
        },
        {
          type: "testing",
          summary: "I tested a physical prototype by clipping a sheet to a pinboard. The photos show it holding a sheet on the board.",
        },
        {
          type: "needed",
          items: [
            "Who tested it, how, and what they said (and what the 4.5/5 graphic on the testing slide measures)",
            "How the tested prototype was made",
            "Whether the three backs are interchangeable or separate versions",
            "What Asmi learned, or would change next",
          ],
        },
      ],
    },
  ],
  contribution: {
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
