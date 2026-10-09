import { needed, type Project } from "@/lib/types";

const project: Project = {
  slug: "celestial-influence",
  title: "Celestial Influence in Modern Media",
  subtitle: "Why the morning news still reads your stars",
  oneLiner:
    "An ethnographic study of how zodiac predictions are portrayed in modern media, and how different people believe, enjoy or dismiss them.",
  tier: "playground",
  // Lives on Medium; the site links straight there instead of rendering a page.
  externalOnly: true,
  order: 2,
  kind: "Ethnographic study · Media research",
  year: needed("Year the study was done (the Medium article was published Aug 2025)"),
  duration: needed("How long the study took, and when the fieldwork happened"),
  role: "Researcher and writer",
  team: { solo: true },
  disciplines: ["research"],
  thinking: ["research", "people", "stories"],
  tags: ["Ethnography", "Interviews", "Group discussions", "Content analysis", "Media studies"],
  tools: [],
  accent: "#1B2238",
  cover: {
    type: "motion",
    composition: "celestial-influence",
    poster: {
      src: "/images/projects/celestial-influence/cover.webp",
      alt: "A zodiac wheel laid over a glowing full moon in a starry sky, with the twelve signs, their symbols and a sun face at the centre",
    },
  },
  proofPoint: "16 interviews and 2 group discussions",
  quickRead: {
    problem:
      "Why do news channels and newspapers run daily zodiac predictions, often first thing in the morning? And whether people believe them or just play along, how do they shape routines, decisions and moods?",
    insight:
      "In the media, astrology works less as a belief system and more as entertainment and cultural identity: a shared, playful language for talking about yourself and other people.",
    solution:
      "A mixed-method study. I observed morning broadcasts, ran one-on-one interviews and group discussions, analysed the adjectives media use for each sign, and compared them with how people describe the signs.",
    result:
      "Three audience types (Believers, Enthusiasts and Sceptics), with clear differences by age and gender. Published on Medium in August 2025.",
  },
  chapters: [
    {
      id: "question",
      label: "Question",
      title: "Why are the stars on the morning news?",
      blocks: [
        {
          type: "text",
          body: [
            "Zodiac predictions are everywhere: TV, newspapers, websites, magazines. I wanted to understand why media keep running them, and what they actually do to the people who read them.",
          ],
        },
        {
          type: "features",
          heading: "Three aims",
          items: [
            { title: "Representation", body: "How astrology and celestial motifs show up across modern media." },
            { title: "Perception", body: "How different demographic groups see and respond to those portrayals." },
            { title: "Influence", body: "Whether media portrayals shape personal beliefs or daily practices." },
          ],
        },
        {
          type: "callout",
          label: "The hard part",
          body: "Interpretations vary widely, and media influence is difficult to separate from everything else in a person's life. Cultural differences, participant bias, and ethics around privacy and emotional impact all needed care.",
        },
      ],
    },
    {
      id: "method",
      label: "Method",
      title: "Watching, asking, counting adjectives",
      blocks: [
        {
          type: "researchMethods",
          groups: [{ label: "One-on-one interviewees", value: 16 }],
          methods: [
            { name: "Observation", detail: "Morning news segments on several channels: tone, format, timing and viewer reactions" },
            { name: "Interviews", detail: "People who regularly engage with predictions: why they read them, how accurate they seem, how they affect decisions" },
            { name: "Group discussions", detail: "2 discussions of 5–6 participants, exploring differences by gender" },
            { name: "Content analysis", detail: "Adjectives used for each sign across broadcasts, newspapers, websites, magazines and books" },
            { name: "Comparative analysis", detail: "Media descriptions set against public perceptions" },
          ],
          note: "Participants varied in age, gender and culture, from adolescents to older adults, and from believers to sceptics.",
        },
        {
          type: "needed",
          items: [
            "Is “5–6 participants” per group discussion or in total?",
            "Where the study took place, and how participants were recruited",
          ],
        },
      ],
    },
    {
      id: "findings",
      label: "Findings",
      title: "Believers, enthusiasts, sceptics",
      blocks: [
        {
          type: "features",
          items: [
            { title: "Believers", body: "Treat their sign as guidance." },
            { title: "Enthusiasts", body: "A substantial group who read it for fun." },
            { title: "Sceptics", body: "Smaller but vocal, and see it as pseudoscience." },
          ],
        },
        {
          type: "text",
          heading: "Age and gender change the reading",
          body: [
            "Younger people were more open, using signs to start conversations and even to make dating choices. Older people were more sceptical and treated signs as entertainment.",
            "Some participants mapped gender stereotypes onto signs. Women showed more interest in romantic compatibility, and men in the group discussions were more sceptical. Younger women were the most likely to use zodiac signs for daily life and self-reflection, and older men the most likely to dismiss them as superstition.",
          ],
        },
        {
          type: "text",
          heading: "Media and people mostly agree",
          body: [
            "Media tone varied by sign: Libra came off well, while Scorpio sometimes got negative descriptors. People's descriptions largely matched the media's adjectives, but they were richer and shaped by experience. Knowing someone of a sign could add nuance, or flip the descriptors entirely.",
          ],
        },
      ],
    },
    {
      id: "meaning",
      label: "Meaning",
      title: "Less prophecy, more language",
      blocks: [
        {
          type: "text",
          body: [
            "Media visibility gives astrology its reach, but the audience gives it meaning. Even sceptics end up speaking its language: a shared set of symbols for identity, relationships and fate.",
          ],
        },
        {
          type: "needed",
          items: ["What Asmi learned from running the study, or would do differently"],
        },
      ],
    },
  ],
  contribution: {
    mine: [
      "Framed the research question and aims",
      "Observed morning news broadcasts",
      "Ran 16 one-on-one interviews and 2 group discussions",
      "Analysed media language for each sign and compared it with public perception",
      "Wrote and published the study",
    ],
  },
  links: {
    external: {
      label: "Read the full study on Medium",
      href: "https://medium.com/@shaikhasmi003/celestial-influence-in-modern-media-7b88ae98b22e",
    },
  },
  seo: {
    title: "Celestial Influence in Modern Media · Asmi Shaikh",
    description:
      "An ethnographic study of zodiac predictions in media: 16 interviews, 2 group discussions and content analysis, finding believers, enthusiasts and sceptics.",
  },
};

export default project;
