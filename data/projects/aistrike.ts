import { needed, type Project } from "@/lib/types";

// Source: docs/sources/aistrike.md (internship deck) + resume line.
// Screenshots 02, 04, 06 and 08 have IPs, account numbers, resource IDs, names and emails blurred.
const IMG = "/images/projects/aistrike";

const project: Project = {
  slug: "aistrike",
  title: "AiStrike",
  subtitle: "Making complex security data readable",
  oneLiner:
    "Cybersecurity dashboards, an AI assistant and a design system for AiStrike, a startup building AI-powered cybersecurity.",
  tier: "flagship",
  order: 3,
  kind: "Industry internship · Cybersecurity UX/UI",
  year: "2025–26", // resume: Nov 2025 – Apr 2026 (deck cover says "November - May")
  duration: "6 months",
  role: "UX/UI Intern",
  team: {
    solo: false,
    hidden: true,
    note: "Industry internship at AiStrike Cybersecurity",
  },
  disciplines: ["ux-ui", "systems", "research"],
  thinking: ["systems", "technology", "visuals", "research"],
  tags: [
    "Cybersecurity",
    "SaaS dashboards",
    "Data visualisation",
    "AI assistant",
    "Design system",
    "Dark and light mode",
  ],
  tools: ["Figma", "Photoshop", "Illustrator", "Jira"],
  accent: "#E56646",
  cover: {
    type: "motion",
    composition: "aistrike",
    poster: {
      src: `${IMG}/01.webp`,
      alt: "A tablet in tent mode showing the dark AI Alert Dashboard: an Alerts Triage bubble diagram, an Alerts overview bar chart with severity counts, filter chips and an alerts table, over an orange band.",
      focus: "50% 40%",
    },
  },
  proofPoint: "15 light-mode options · 2–4 iterations per screen",
  quickRead: {
    problem:
      "Security alerts were complex and data-heavy, hard to scan quickly, with no clear line between critical and low threats. Cases had no central place to live, and AI outputs were hard to understand.",
    insight:
      "In complex systems, users struggle because there's too much. Clarity comes from removing, and from designing the system, not isolated screens.",
    solution:
      "Dashboards for alerts, vulnerabilities and case management in dark and light mode, an AI assistant that turns outputs into summaries, insights and recommendations, and a design system to hold it all together.",
    result: needed(
      "Outcome: which designs shipped, and any feedback or metrics from AiStrike (the deck's impact points are qualitative)",
    ),
  },
  chapters: [
    /* 1 ─────────────────────────────────────────────── */
    {
      id: "context",
      label: "Context",
      title: "A startup building smarter defences",
      intro:
        "AiStrike is a startup cybersecurity company working on intelligent, adaptive digital defence systems, with a growing focus on AI-powered security.",
      blocks: [
        {
          type: "text",
          body: [
            "I joined as a UX/UI intern for the industry internship in my B.Des final year at NMIMS School of Design.",
            "I designed cybersecurity dashboards and an AI chatbot, simplifying complex security information through intuitive and user-friendly interfaces.",
          ],
        },
        {
          type: "features",
          heading: "What I worked on",
          items: [
            { title: "Dashboards", body: "In both light mode and dark mode." },
            {
              title: "Core modules",
              body: "Alert systems, the case center and vulnerability modules.",
            },
            {
              title: "Design system and prototypes",
              body: "Reusable foundations and interactive prototypes.",
            },
            { title: "LinkedIn creatives", body: "Marketing posts for the company page." },
          ],
        },
        {
          type: "process",
          heading: "How the work moved",
          steps: [
            {
              title: "Discovery",
              body: "Exploration, requirement gathering, competitive analysis and problem understanding.",
            },
            {
              title: "Analysis",
              body: "User and technical analysis, feature prioritisation, iterations and feedback.",
            },
            {
              title: "Design",
              body: "UX and UI design, design system creation, interaction design, prototyping and a component library.",
            },
          ],
        },
      ],
    },

    /* 2 ─────────────────────────────────────────────── */
    {
      id: "problem",
      label: "Problem",
      title: "Too much data, not enough hierarchy",
      intro:
        "Analysts need to monitor, prioritise and investigate threats fast. The interfaces were working against them.",
      blocks: [
        {
          type: "features",
          heading: "What got in the way",
          items: [
            {
              title: "Hard to scan",
              body: "Complex, data-heavy security alerts were difficult to scan quickly, and dense layouts were hard to read.",
            },
            {
              title: "No clear priority",
              body: "Nothing clearly separated critical threats from low ones.",
            },
            {
              title: "Scattered risk",
              body: "There was no structured view for risk and remediation, and managing vulnerabilities across hosts and containers was complex.",
            },
            {
              title: "No home for cases",
              body: "Tasks, timelines and dashboards had no central system, and the work needed both manual and AI-assisted flows.",
            },
            {
              title: "AI that confused",
              body: "AI outputs were complex and hard to understand, and AI had to be added without overwhelming users.",
            },
          ],
        },
      ],
    },

    /* 3 ─────────────────────────────────────────────── */
    {
      id: "research",
      label: "Research",
      title: "Learning the language first",
      intro:
        "Before designing anything, I had to understand the domain: the terms, the workflows and how much complexity sits behind each alert.",
      blocks: [
        {
          type: "researchMethods",
          methods: [
            { name: "Cybersecurity terminology", detail: "Getting fluent in the domain's language" },
            { name: "Competitive analysis", detail: "Comparing existing platforms and solutions" },
            { name: "Requirement gathering" },
            { name: "User and technical analysis", detail: "User needs, workflows and system complexity" },
            { name: "Reference gathering" },
            { name: "Feature prioritisation" },
          ],
        },
        {
          type: "image",
          image: {
            src: `${IMG}/13.webp`,
            alt: "A laptop showing a zoomed-out research board on black: dozens of small white frames and notes arranged in columns, with two collaborator avatars marked A and S.",
            caption: "The research board, zoomed out.",
          },
          size: "inset",
        },
        {
          type: "needed",
          items: [
            "Who the research was with (analysts, internal team?) and how many people",
            "Which existing platforms were compared, and what came out of it",
          ],
        },
      ],
    },

    /* 4 ─────────────────────────────────────────────── */
    {
      id: "solution",
      label: "Solution",
      title: "From alert to resolution",
      intro:
        "Four connected modules, each designed to take an analyst from spotting a threat to closing it out.",
      blocks: [
        {
          type: "text",
          heading: "01 · Alert dashboard",
          body: [
            "A centralised interface to monitor, prioritise and investigate alerts in real time. It combines AI-driven insights, severity indicators and structured data visualisation.",
            "I designed it with severity-based colour coding, worked through multiple layout iterations for better hierarchy, added collapsible panels to manage data density, and improved table readability with spacing, tags and filters.",
          ],
        },
        {
          type: "image",
          image: {
            src: `${IMG}/02.webp`,
            alt: "Collage of five dark alert detail screens around a laptop: Timeline, Attack path, AI Overview, Investigation and Remediation tabs for one alert, with an AiStrike Verdict panel and prioritisation factors. Identifying details are blurred.",
            caption: "One alert, five views: timeline, attack path, AI overview, investigation and remediation.",
          },
          size: "full",
        },
        {
          type: "text",
          heading: "02 · Vulnerability overview",
          body: [
            "A structured interface to identify, assess and remediate security risks across systems, with severity indicators, asset-level insights and actionable remediation steps.",
            "I designed vulnerability, host and container views, and detail pages with risk indicators, remediation steps and an attack path.",
          ],
        },
        {
          type: "image",
          image: {
            src: `${IMG}/03.webp`,
            alt: "A tablet showing the dark Vulnerabilities Dashboard: group-by toggles for Vulnerability, Host and Container, a stacked bar chart of 50 vulnerabilities by severity, and a cases table.",
          },
          size: "wide",
        },
        {
          type: "image",
          image: {
            src: `${IMG}/04.webp`,
            alt: "Collage of dark vulnerability screens around a laptop: the dashboard, an incident detail table, a CVE AI overview with key findings, a code-to-cloud remediation flow and an attack path graph. Identifying details are blurred.",
            caption: "Dashboard, incident detail, AI overview, remediation and attack path.",
          },
          size: "full",
        },
        {
          type: "text",
          heading: "03 · Case center",
          body: [
            "A centralised case management system to investigate, track and resolve incidents, combining AI-driven insights, task management, timelines and real-time collaboration.",
            "I designed the Case Center dashboard and table views, built user flows for creating dashboards and widgets, and created a task system with manual and AI options, a timeline view and case insights.",
          ],
        },
        {
          type: "image",
          image: {
            src: `${IMG}/05.webp`,
            alt: "A laptop showing the dark Case Center dashboard: a Dashboard Categories sidebar, a New Dashboard button, case count cards, three ring charts for status, severity and priority, and pie charts by tag, stage and product.",
          },
          size: "wide",
        },
        {
          type: "image",
          image: {
            src: `${IMG}/06.webp`,
            alt: "Collage of dark Case Center screens around a laptop: a widget added to a dashboard, an event timeline, the case dashboard, a selected task's details and a task table, each with a green success toast. Names and identifiers are blurred.",
            caption: "Widgets, timeline, dashboard, task detail and task list.",
          },
          size: "full",
        },
        {
          type: "text",
          heading: "04 · AI integration",
          body: [
            "An AI layer across the platform, built on models from OpenAI, that generates contextual insights, summaries and actionable recommendations so analysts can understand complex data faster.",
            "I iterated multiple versions for clarity and created a clean UI for AI explanations. I designed AI summaries, insights, recommendations and AI-assisted flows.",
            "Every creation panel offers two paths side by side: build it yourself in Custom, or ask the assistant.",
          ],
        },
        {
          type: "image",
          image: {
            src: `${IMG}/07.webp`,
            alt: "A dark Create Dashboard panel with the AI tab selected. The user asks for an alert workload trend for the last 30 days; the assistant replies with three dashboard options, Threat Intelligence View, Health & Attack Matrix View and SOC Operational Overview, and asks which to create.",
            caption: "Asking the assistant for a dashboard instead of building one.",
          },
          size: "wide",
        },
        {
          type: "image",
          image: {
            src: `${IMG}/08.webp`,
            alt: "Collage of AI assistant flows around a laptop showing the assistant home, 'How can I help you Today?', with suggestions for Alert Details, Investigation, Remediation and Attack Path; around it, chat panels to create events, a dashboard, a task and a widget.",
            caption: "The same assistant creates events, dashboards, tasks and widgets.",
          },
          size: "full",
        },
      ],
    },

    /* 5 ─────────────────────────────────────────────── */
    {
      id: "system",
      label: "System",
      title: "One system for data-heavy screens",
      intro:
        "Across this many screens, the UI was drifting and there were no reusable components. So I built the foundations.",
      blocks: [
        {
          type: "features",
          items: [
            { title: "Typography", body: "Inter, with a scale from Header 1 to body and input styles." },
            {
              title: "Colour",
              body: "A dark-mode system of base neutrals plus brand and severity colours: critical, high, medium and low.",
            },
            { title: "Spacing", body: "A 4–8 px scale, from 4 px to 40 px." },
            {
              title: "Components",
              body: "A library of buttons, tabs, cards, accordions, sidebar states and icons.",
            },
          ],
        },
        {
          type: "image",
          image: {
            src: `${IMG}/09.webp`,
            alt: "Design system board: accordion components, ten sidebar navigation states, active and inactive icon sets, New Case buttons, and rows of base neutral and base brand colour swatches with hex codes.",
            caption: "Components and colour tokens.",
          },
          size: "full",
        },
        {
          type: "image",
          image: {
            src: `${IMG}/10.webp`,
            alt: "Typography and spacing board: an Inter character specimen, the Inter type scale from Header 1 to input field, accordion default, hover and clicked states, and a spacing ladder from 4 px to 40 px.",
            caption: "Inter type scale and spacing conventions.",
          },
          size: "wide",
        },
      ],
    },

    /* 6 ─────────────────────────────────────────────── */
    {
      id: "prototyping",
      label: "Prototyping",
      title: "Two to four tries per screen",
      intro:
        "Early designs lacked usability clarity, and complex flows needed testing before they could be trusted.",
      blocks: [
        {
          type: "text",
          body: [
            "I created 2–4 iterations per screen and developed interactive prototypes, with flows for the Case Center, dashboards, widgets, alert security and vulnerabilities.",
          ],
        },
        {
          type: "image",
          image: {
            src: `${IMG}/11.webp`,
            alt: "A laptop showing a Figma prototype map: rows of frames labelled Dashboard, Widget, Table, AI Overview and Timeline, joined by dense blue connector wires.",
            caption: "Prototype wiring across dashboard, widget, table, AI overview and timeline flows.",
          },
          size: "wide",
        },
      ],
    },

    /* 7 ─────────────────────────────────────────────── */
    {
      id: "light-mode",
      label: "Exploration",
      title: "15 ways to turn the lights on",
      intro:
        "The platform was dark. Moving it to light mode meant keeping readability and contrast intact.",
      blocks: [
        {
          type: "text",
          body: [
            "I tested different colour palettes and created 15 light-mode options, researching how UI behaves in light mode and what it takes to keep accessibility and contrast.",
          ],
        },
        {
          type: "image",
          image: {
            src: `${IMG}/12.webp`,
            alt: "A laptop showing the light-mode AI Alert Dashboard: a pale blue header, an Alerts Triage bubble diagram, a stacked bar chart with severity counts, filters, and an alerts table with red, amber and green priority tags.",
            caption: "The alert dashboard in light mode.",
          },
          size: "wide",
        },
        {
          type: "needed",
          items: ["Which light-mode direction was chosen, and why"],
        },
        {
          type: "text",
          heading: "Beyond the product",
          body: [
            "I also designed LinkedIn posts for AiStrike, aligned with the brand: New Year, Christmas, Republic Day and welcome posts, which went through 8+ iterations.",
          ],
        },
        {
          type: "image",
          image: {
            src: `${IMG}/14.webp`,
            alt: "Four AiStrike LinkedIn posts: a Merry Christmas octopus in a Santa hat, a Happy New Year 2026 card with fireworks, and two Republic Day posts with the Indian flag.",
            caption: "Festive posts for the company page.",
          },
          size: "inset",
        },
      ],
    },

    /* 8 ─────────────────────────────────────────────── */
    {
      id: "reflection",
      label: "Reflection",
      title: "Clarity is power",
      blocks: [
        {
          type: "pullQuote",
          quote:
            "The most valuable thing I learned is that great design doesn't live in isolated screens — it lives in systems.",
          attribution: "Asmi, on the internship",
        },
        {
          type: "features",
          items: [
            {
              title: "Clarity is power",
              body: "Design is not about adding, it's about removing. I distil complexity into clear, intuitive, usable experiences.",
            },
            {
              title: "Systems over screens",
              body: "If the system breaks, no individual screen can save it. That's where real impact lies.",
            },
            {
              title: "Empathy",
              body: "What is stressing them right now? What can I remove to make their job easier? How can this design give them confidence, not confusion?",
            },
          ],
        },
        {
          type: "image",
          image: {
            src: `${IMG}/15.webp`,
            alt: "Hand-drawn learnings sheet: 'Clarity is Power' with a cluttered screen becoming a simple one, 'System > Individual apps' with linked phone, laptop and tablet, and 'Empathy' with a stressed figure becoming a calm one.",
            caption: "My learnings, sketched.",
          },
          size: "wide",
        },
        {
          type: "needed",
          items: [
            "Validation: any usability testing or feedback from analysts or the AiStrike team",
            "Which modules shipped, and any measured impact",
            "Who Asmi worked with at AiStrike (design lead, PM, developers)",
          ],
        },
      ],
    },
  ],
  contribution: {
    mine: [
      "Researched cybersecurity terminology, existing platforms, user needs and workflows",
      "Designed the alert, vulnerability and case center modules",
      "Designed dashboards in light and dark mode, including 15 light-mode options",
      "Designed the AI chatbot: summaries, insights, recommendations and AI-assisted flows",
      "Built the design system (typography, dark-mode colour, spacing, components)",
      "Built interactive prototypes, with 2–4 iterations per screen",
      "Created LinkedIn marketing creatives",
    ],
  },
  seo: {
    title: "AiStrike — Cybersecurity dashboards & AI UX · Asmi Shaikh",
    description:
      "UX/UI internship at AiStrike: alert, vulnerability and case management dashboards, an AI assistant and a design system for complex security data.",
  },
};

export default project;
