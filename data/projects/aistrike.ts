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
      stage: "overview",
      title: "A startup building smarter defences",
      intro:
        "AiStrike is a startup cybersecurity company working on intelligent, adaptive digital defence systems, with a growing focus on AI-powered security.",
      blocks: [
        {
          type: "callout",
          label: "Disclaimer · under NDA",
          body: "I've signed a non-disclosure agreement with AiStrike, and the product isn't live yet, so I can't show the screens in full. What's shared here is limited, with identifying details blurred. I'm happy to walk you through the work in more depth in person.",
        },
        {
          type: "text",
          body: [
            "I joined as a UX/UI intern for the industry internship in my B.Des final year at NMIMS School of Design.",
            "I designed cybersecurity dashboards and an AI chatbot, simplifying complex security information through intuitive and user-friendly interfaces.",
          ],
        },
        {
          type: "roleCard",
          title: "UI/UX Designer Intern",
          items: [
            "Worked on dashboards in light mode and dark mode",
            "Designed alert systems, the case center and vulnerability modules",
            "Built design systems and interactive prototypes",
            "Created marketing creatives for LinkedIn",
          ],
          tools: ["photoshop", "illustrator", "figma", "jira"],
          skills: ["Figma (UI design & prototyping)", "Design systems", "UX research & analysis", "Interaction design", "Data visualisation"],
        },
        {
          type: "vennProcess",
          heading: "Process",
          phases: ["Discovery", "Analysis", "Design"],
          items: [
            { label: "Exploration", phases: [0], x: 20, y: 32.3 },
            { label: "Requirement gathering", phases: [0], x: 14.3, y: 57 },
            { label: "Competitive analysis", phases: [0], x: 19.8, y: 75.7 },
            { label: "Problem understanding", phases: [0, 1], x: 35, y: 43.8 },
            { label: "User + technical analysis", phases: [1], x: 50, y: 64.5 },
            { label: "Feature prioritisation", phases: [1], x: 50.3, y: 82.5 },
            { label: "Iterations & feedback", phases: [1, 2], x: 66.6, y: 32.3 },
            { label: "UX & UI design", phases: [2], x: 88.3, y: 33.8 },
            { label: "Design system creation", phases: [2], x: 74.7, y: 48 },
            { label: "Prototyping", phases: [2], x: 90.9, y: 59.1 },
            { label: "Interaction design", phases: [2], x: 74, y: 64.9 },
            { label: "Component library", phases: [2], x: 81.7, y: 81.6 },
          ],
        },
      ],
    },

    /* 2 ─────────────────────────────────────────────── */
    {
      id: "problem",
      stage: "problem",
      title: "Too much data, not enough hierarchy",
      intro:
        "Analysts need to monitor, prioritise and investigate threats fast. The interfaces were working against them.",
      blocks: [
        {
          type: "issueFeed",
          heading: "What got in the way",
          items: [
            {
              title: "Hard to scan",
              body: "Complex, data-heavy security alerts were difficult to scan quickly, and dense layouts were hard to read.",
              module: "01 Alert dashboard",
              fix: ["Severity-based colour coding", "Collapsible panels to manage data density", "Table readability through spacing, tags and filters"],
            },
            {
              title: "No clear priority",
              body: "Nothing clearly separated critical threats from low ones.",
              module: "01 Alert dashboard",
              fix: ["A structured dashboard with severity-based colour coding", "Multiple layout iterations for better hierarchy"],
            },
            {
              title: "Scattered risk",
              body: "There was no structured view for risk and remediation, and managing vulnerabilities across hosts and containers was complex.",
              module: "02 Vulnerabilities",
              fix: ["Vulnerability, host and container views", "Detail pages with risk indicators, remediation steps and an attack path"],
            },
            {
              title: "No home for cases",
              body: "Tasks, timelines and dashboards had no central system, and the work needed both manual and AI-assisted flows.",
              module: "03 Case center",
              fix: ["A Case Center dashboard and table views", "User flows for creating dashboards and widgets", "A task system (manual and AI), a timeline view and case insights"],
            },
            {
              title: "AI that confused",
              body: "AI outputs were complex and hard to understand, and AI had to be added without overwhelming users.",
              module: "04 AI integration",
              fix: ["Multiple versions iterated for clarity", "A clean UI for AI explanations", "AI summaries, insights, recommendations and AI-assisted flows"],
            },
          ],
        },
      ],
    },

    /* 3 ─────────────────────────────────────────────── */
    {
      id: "research",
      stage: "research",
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
          type: "termMap",
          heading: "The vocabulary behind the screens",
          intro: "A map of the cybersecurity language the platform runs on, grouped by where each term shows up in the product. Pick a term to read what it means, or search.",
          centre: "Security operations",
          branches: [
            {
              name: "Detection & alerts",
              module: "01 Alert dashboard",
              terms: [
                { term: "Alert", def: "A signal that something suspicious happened, raised by a detection rule or a security tool." },
                { term: "Triage", def: "Sorting incoming alerts to decide which need attention first and which can wait or be closed." },
                { term: "Severity", def: "How much damage a threat could do, usually graded critical, high, medium, low or info." },
                { term: "False positive", def: "An alert that fires when nothing malicious actually happened. Too many of them bury the real threats." },
                { term: "Alert fatigue", def: "When analysts see so many alerts that they start missing or ignoring the important ones." },
                { term: "MITRE ATT&CK", def: "A public framework that catalogues attacker tactics and techniques, used to label what an alert represents." },
                { term: "Composite alert", def: "Several related alerts grouped into one, so a single attack doesn't show up as dozens of separate rows." },
                { term: "IOC", def: "Indicator of compromise: evidence such as a malicious IP address, file hash or domain that points to an attack." },
              ],
            },
            {
              name: "Vulnerabilities",
              module: "02 Vulnerabilities",
              terms: [
                { term: "Vulnerability", def: "A weakness in software or configuration that an attacker could exploit." },
                { term: "CVE", def: "Common Vulnerabilities and Exposures: a public ID given to each known vulnerability." },
                { term: "CVSS", def: "A 0–10 score that rates how severe a vulnerability is." },
                { term: "Host", def: "A machine, such as a server or virtual machine, that runs software and can be exposed." },
                { term: "Container", def: "A packaged application that runs isolated on a host; one image can carry vulnerabilities into many containers." },
                { term: "Misconfiguration", def: "A setting left insecure, like an open storage bucket or an over-permissive rule." },
                { term: "Patch", def: "An update that fixes a vulnerability." },
                { term: "Attack surface", def: "Everything reachable that an attacker could try to break into." },
              ],
            },
            {
              name: "Incident response",
              module: "03 Case center",
              terms: [
                { term: "Incident", def: "A confirmed security event that needs a response, not just an alert to look at." },
                { term: "Case", def: "The record that tracks one investigation, from the first alert to closing it out." },
                { term: "SOC", def: "Security operations centre: the team that monitors, investigates and responds to threats." },
                { term: "Playbook", def: "A step-by-step procedure for responding to a known type of incident." },
                { term: "Timeline", def: "The ordered sequence of events in an incident, used to reconstruct what happened." },
                { term: "Escalation", def: "Passing a case to a more senior analyst or team when it's more serious than first thought." },
                { term: "Remediation", def: "The actions that remove a threat or fix its cause." },
                { term: "MTTR", def: "Mean time to respond (or resolve): how long, on average, it takes to deal with an incident." },
              ],
            },
            {
              name: "Attacks & threats",
              module: "attack paths across modules",
              terms: [
                { term: "Attack path", def: "The chain of steps an attacker could take from an entry point to a valuable target." },
                { term: "Credential access", def: "Techniques for stealing usernames, passwords or keys." },
                { term: "Privilege escalation", def: "Gaining higher permissions than an account was meant to have." },
                { term: "Lateral movement", def: "Moving from one compromised system to others inside the network." },
                { term: "Backdoor", def: "A hidden way back into a system that bypasses normal authentication." },
                { term: "Impossible travel", def: "Logins from two places too far apart to travel between in the time that passed." },
                { term: "Phishing", def: "Tricking people into revealing credentials or running malicious files, usually by email." },
                { term: "Exfiltration", def: "Moving stolen data out of an organisation." },
              ],
            },
            {
              name: "Cloud & identity",
              terms: [
                { term: "IAM", def: "Identity and access management: who can access what, and with which permissions." },
                { term: "Least privilege", def: "Giving every account only the access it needs, and nothing more." },
                { term: "MFA", def: "Multi-factor authentication: a second proof of identity beyond a password." },
                { term: "Audit log", def: "A record of who did what, and when, across cloud services." },
                { term: "Zero trust", def: "Never assume a request is safe because it comes from inside the network; verify every time." },
                { term: "Cloud workload", def: "Anything running in the cloud, such as virtual machines, containers or functions." },
              ],
            },
            {
              name: "AI in security",
              module: "04 AI integration",
              terms: [
                { term: "Anomaly detection", def: "Spotting behaviour that differs from what's normal, without a fixed rule." },
                { term: "AI summary", def: "A plain-language overview of an alert or case, so analysts don't read raw data first." },
                { term: "Recommendation", def: "A suggested next action, such as isolating a host or resetting credentials." },
                { term: "Verdict", def: "The system's judgement on an alert: likely malicious, suspicious or benign." },
                { term: "Explainability", def: "Showing why the AI reached a conclusion, so people can trust or challenge it." },
                { term: "Human in the loop", def: "AI proposes, people decide: analysts confirm actions before they happen." },
              ],
            },
          ],
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
      stage: "solution",
      title: "From alert to resolution",
      intro:
        "Four connected modules, each designed to take an analyst from spotting a threat to closing it out.",
      blocks: [
        {
          type: "moduleStory",
          modules: [
            {
              num: "01",
              name: "Alert dashboard",
              kicker: "Security alerts & monitoring",
              headline: "Security insights that drive faster threat response.",
              body: "A centralised security interface that lets analysts monitor, prioritise and investigate alerts in real time. AI-driven insights, severity indicators and structured data visualisation simplify complex threat data and support faster, more accurate decisions.",
              shots: [
                {
                  label: "Dashboard",
                  nda: true,
                  image: {
                    src: `${IMG}/nda/alert-dashboard-dark.webp`,
                    alt: "The dark AI Alert Dashboard, deliberately blurred: an alerts triage bubble diagram, an alerts overview bar chart in severity colours, filters and an alerts table with red, amber and yellow priority tags.",
                  },
                },
                {
                  label: "Alert detail",
                  views: ["Timeline", "Attack path", "AI overview", "Investigation", "Remediation"],
                  image: {
                    src: `${IMG}/02.webp`,
                    alt: "Collage of five dark alert detail screens around a laptop: Timeline, Attack path, AI Overview, Investigation and Remediation tabs for one alert, with an AiStrike Verdict panel and prioritisation factors. Identifying details are blurred.",
                  },
                },
              ],
              challenge: [
                "Complex, data-heavy security alerts were difficult to scan quickly",
                "No clear prioritisation between critical and low threats",
                "Poor readability in dense dashboard layouts",
              ],
              approach: [
                "Designed a structured dashboard with severity-based colour coding",
                "Created multiple layout iterations for better hierarchy",
                "Introduced collapsible panels to manage data density",
                "Improved table readability with spacing, tags and filters",
              ],
              impact: ["Improved quick scanning and decision-making", "Reduced visual clutter in the dashboard", "Built a scalable layout used across modules"],
            },
            {
              num: "02",
              name: "Vulnerability overview",
              kicker: "Risk identification & remediation",
              headline: "Proactive vulnerability management for a stronger security posture.",
              body: "A structured vulnerability management interface that helps teams identify, assess and remediate security risks across systems. Severity indicators, asset-level insights and actionable remediation steps enable faster prioritisation and reduce exposure to critical threats.",
              chips: ["Vulnerability view", "Host view", "Container view"],
              shots: [
                {
                  label: "Dashboard",
                  nda: true,
                  image: {
                    src: `${IMG}/nda/vulnerabilities-dashboard.webp`,
                    alt: "The dark Vulnerabilities Dashboard, deliberately blurred: group-by toggles, a row of severity counters, a stacked bar chart in severity colours and a cases table.",
                  },
                },
                {
                  label: "Detail pages",
                  views: ["Dashboard", "Incident detail", "AI overview", "Remediation", "Attack path"],
                  image: {
                    src: `${IMG}/04.webp`,
                    alt: "Collage of dark vulnerability screens around a laptop: the dashboard, an incident detail table, a CVE AI overview with key findings, a code-to-cloud remediation flow and an attack path graph. Identifying details are blurred.",
                  },
                },
              ],
              challenge: ["No structured view for risk and remediation", "Managing vulnerabilities across hosts and containers was complex"],
              approach: [
                "Designed vulnerability, host and container views",
                "Created detailed pages with risk indicators, remediation steps and an attack path",
              ],
              impact: ["Simplified vulnerability tracking", "Improved clarity of risk and actions"],
            },
            {
              num: "03",
              name: "Case center",
              kicker: "Incident management & workflow",
              headline: "Streamlining security operations from detection to resolution.",
              body: "A centralised case management system for investigating, tracking and resolving security incidents. AI-driven insights, task management, timelines and real-time collaboration streamline complex workflows for faster, better-informed incident response.",
              shots: [
                {
                  label: "Dashboard",
                  nda: true,
                  image: {
                    src: `${IMG}/nda/case-center-dashboard.webp`,
                    alt: "The dark Case Center dashboard, deliberately blurred: a dashboard categories sidebar with a green New Dashboard button, case count cards, three ring charts and three pie charts.",
                  },
                },
                {
                  label: "Tasks & timeline",
                  views: ["Widget", "Timeline", "Case center dashboard", "Selected task", "Task"],
                  image: {
                    src: `${IMG}/06.webp`,
                    alt: "Collage of dark Case Center screens around a laptop: a widget added to a dashboard, an event timeline, the case dashboard, a selected task's details and a task table, each with a green success toast. Names and identifiers are blurred.",
                  },
                },
              ],
              challenge: [
                "Complex workflows across tasks, timeline and dashboard",
                "No centralised system to manage cases efficiently",
                "A need for both manual and AI-assisted flows",
              ],
              approach: [
                "Designed the Case Center dashboard and table views",
                "Built user flows for creating dashboards and widgets",
                "Created a task system (manual and AI), a timeline view and case insights",
              ],
              impact: ["Structured the case management workflow", "Improved efficiency for analysts", "Enabled better tracking and collaboration"],
            },
            {
              num: "04",
              name: "AI integration",
              kicker: "Insights, automation & assistance",
              headline: "AI-powered intelligence for smarter security decisions.",
              body: "An AI layer integrated across the platform to support decisions and cut analysis time. Using models from OpenAI, it generates contextual insights, summaries and actionable recommendations, so analysts understand complex security data quickly. Every creation panel offers two paths: build it yourself, or ask the assistant.",
              shots: [
                {
                  label: "Ask for a dashboard",
                  nda: true,
                  image: {
                    src: `${IMG}/nda/ai-create-dashboard.webp`,
                    alt: "A dark Create Dashboard panel with the AI tab selected, deliberately blurred. The user asks for an alert workload trend for the last 30 days; the assistant replies with three dashboard options, Threat Intelligence View, Health & Attack Matrix View and SOC Operational Overview, and asks which to create.",
                  },
                },
                {
                  label: "Assistant flows",
                  views: ["Create events", "Create a dashboard", "Assistant home", "Create a task", "Create a widget"],
                  image: {
                    src: `${IMG}/08.webp`,
                    alt: "Collage of AI assistant flows around a laptop showing the assistant home, 'How can I help you Today?', with suggestions for Alert Details, Investigation, Remediation and Attack Path; around it, chat panels to create events, a dashboard, a task and a widget.",
                  },
                },
              ],
              challenge: ["Integrating AI without overwhelming users", "AI outputs were complex and hard to understand"],
              approach: [
                "Iterated multiple versions for clarity",
                "Created a clean UI for AI explanations",
                "Designed AI summaries, insights, recommendations and AI-assisted flows",
              ],
              impact: ["Reduced decision-making time", "Made AI outputs actionable and understandable", "Improved user trust in the AI system"],
            },
          ],
        },
      ],
    },

    /* 5 ─────────────────────────────────────────────── */
    {
      id: "system",
      stage: "solution",
      title: "One system for data-heavy screens",
      intro:
        "Across this many screens, the UI was drifting and there were no reusable components. So I built the foundations.",
      blocks: [
        {
          type: "moduleStory",
          modules: [
            {
              num: "05",
              name: "Design system & components",
              kicker: "Scalable UI foundations",
              headline: "Consistency at scale through a structured design system.",
              body: "Typography, colour tokens, spacing and reusable components that keep the platform consistent, speed up iteration and make collaboration easier. The system supports complex, data-heavy interfaces while keeping clarity and visual hierarchy.",
              chips: ["Typography", "Colour (dark mode)", "Spacing", "Buttons, tabs, cards"],
              shots: [
                {
                  label: "Components & colour",
                  nda: true,
                  image: {
                    src: `${IMG}/nda/components-colour.webp`,
                    alt: "The design system board, deliberately blurred: accordion components, ten sidebar navigation states, active and inactive icon sets, buttons, and rows of neutral and brand colour swatches.",
                  },
                },
              ],
              challenge: ["Inconsistent UI across multiple screens", "A lack of reusable components"],
              approach: [
                "Iterated multiple versions for clarity",
                "Built reusable, scalable components",
                "Created a typography system, a dark-mode colour system and a component library of buttons, tabs and cards",
              ],
              impact: ["Improved design consistency", "A faster design workflow"],
            },
          ],
        },
        {
          type: "systemSpecimen",
          family: "Inter",
          tracking: "-2%",
          scale: [
            { name: "Header 1", size: 48, line: 64, weight: 500 },
            { name: "Header 2", size: 32, line: 40, weight: 500 },
            { name: "Header 3", size: 24, line: 32, weight: 400 },
            { name: "Header 4", size: 20, line: 28, weight: 400 },
            { name: "Header 5", size: 16, line: 24, weight: 400 },
            { name: "Header 6", size: 14, line: 20, weight: 500 },
            { name: "Body lg", size: 20, line: 28, weight: 400 },
            { name: "Body md", size: 16, line: 24, weight: 400 },
            { name: "Body sm", size: 14, line: 20, weight: 400 },
            { name: "Body xs", size: 12, line: 16, weight: 400 },
            { name: "Input field", size: 14, line: 24, weight: 300, italic: true },
          ],
          spacing: [4, 8, 12, 16, 20, 24, 28, 32, 40],
        },
      ],
    },

    /* 6 ─────────────────────────────────────────────── */
    {
      id: "prototyping",
      stage: "ideation",
      title: "Two to four tries per screen",
      intro:
        "Early designs lacked usability clarity, and complex flows needed testing before they could be trusted.",
      blocks: [
        {
          type: "moduleStory",
          modules: [
            {
              num: "06",
              name: "Iterations & prototyping",
              kicker: "Exploration & interaction design",
              headline: "Two to four iterations per screen, then wired into prototypes.",
              chips: ["Case Center", "Dashboard", "Widgets", "Alert security", "Vulnerability"],
              shots: [
                {
                  label: "Prototype map",
                  bands: [
                    { label: "Dashboard", top: 9, height: 23 },
                    { label: "Widget", top: 35, height: 14 },
                    { label: "Table", top: 58, height: 10.5 },
                    { label: "AI overview", top: 75.5, height: 10 },
                    { label: "Timeline", top: 87, height: 10.5 },
                  ],
                  image: {
                    src: `${IMG}/nda/prototype-map.webp`,
                    alt: "A Figma prototype map on dark: rows of small frames for the Case Centre dashboard, widgets, table, AI overview and timeline, joined by dense blue connector wires, with manual and AI branches.",
                  },
                },
              ],
              challenge: ["Initial designs lacked usability clarity", "Complex flows required testing"],
              approach: [
                "Created 2–4 iterations per screen",
                "Developed interactive prototypes",
                "Built flows for the Case Center, dashboards, widgets, alert security and vulnerabilities",
              ],
              impact: ["Improved usability through iteration", "Clearer user flows"],
            },
          ],
        },
      ],
    },

    /* 7 ─────────────────────────────────────────────── */
    {
      id: "light-mode",
      stage: "ideation",
      title: "15 ways to turn the lights on",
      intro:
        "The platform was dark. Moving it to light mode meant keeping readability and contrast intact.",
      blocks: [
        {
          type: "moduleStory",
          modules: [
            {
              num: "07",
              name: "Light mode exploration",
              kicker: "Exploration & interaction design",
              headline: "Moving a dark platform into light, without losing contrast.",
              chips: ["15 light-mode options"],
              shots: [
                {
                  label: "Light",
                  nda: true,
                  image: {
                    src: `${IMG}/nda/alert-dashboard-light.webp`,
                    alt: "The light-mode AI Alert Dashboard, deliberately blurred: a pale blue header, an alerts triage bubble diagram, a stacked bar chart in severity colours, filters and an alerts table with red, amber and green priority tags.",
                  },
                },
                {
                  label: "Dark",
                  nda: true,
                  image: {
                    src: `${IMG}/nda/alert-dashboard-dark.webp`,
                    alt: "The same AI Alert Dashboard in dark mode, deliberately blurred.",
                  },
                },
              ],
              challenge: ["Transitioning from dark mode to light mode", "Maintaining readability and contrast"],
              approach: [
                "Tested different colour palettes",
                "Created 15 light-mode options",
                "Researched UI behaviour in light mode, and accessibility and contrast",
              ],
              impact: ["Provided multiple design directions", "Improved readability strategies", "Expanded the system's design capability"],
            },
          ],
        },
        {
          type: "needed",
          items: ["Which light-mode direction was chosen, and why"],
        },
        {
          type: "moduleStory",
          modules: [
            {
              num: "08",
              name: "LinkedIn creative posts",
              kicker: "Branding & visual communication",
              headline: "Creative communication aligned with the brand identity.",
              body: "Posts for AiStrike's company page, designed to the brand and now live on LinkedIn.",
              chips: ["New Year", "Christmas", "Republic Day", "Welcome posts (8+ iterations)"],
            },
          ],
        },
        {
          type: "phoneCarousel",
          heading: "Swipe through the live posts",
          intro: "The posts as they appear on AiStrike's LinkedIn page, captured on my phone.",
          slides: [
            {
              kind: "Welcome",
              title: "Welcoming the Sr. Director Engineering & India Head",
              image: {
                src: `${IMG}/linkedin/phone-welcome-sr-director.webp`,
                alt: "Phone screenshot of AiStrike's LinkedIn posts: a 'Welcome to the team' post with bold black type on a white-to-peach gradient, orange brand shapes and a portrait of the new Sr. Director Engineering & India Head.",
              },
            },
            {
              kind: "Festive",
              title: "Happy New Year 2026",
              image: {
                src: `${IMG}/linkedin/phone-new-year-2026.webp`,
                alt: "Phone screenshot of AiStrike's LinkedIn New Year post: 'Happy New Year 2026' on deep navy, the 5 of 2025 giving way to a 6, with red fireworks.",
              },
            },
            {
              kind: "Welcome",
              title: "Welcome on board, two new hires",
              image: {
                src: `${IMG}/linkedin/phone-welcome-two.webp`,
                alt: "Phone screenshot of AiStrike's LinkedIn post: 'Congratulations, welcome on board' over dark, rust and teal shapes, with two portrait cards and orange name plates.",
              },
            },
            {
              kind: "Welcome",
              title: "Welcoming the VP of Sales",
              image: {
                src: `${IMG}/linkedin/phone-welcome-vp-sales.webp`,
                alt: "Phone screenshot of AiStrike's LinkedIn post: a giant white 'Welcome' behind a portrait of the new VP of Sales on a dark grid, with a hand-drawn orange arrow to his name.",
              },
            },
            {
              kind: "Festive",
              title: "Merry Christmas",
              image: {
                src: `${IMG}/linkedin/phone-christmas.webp`,
                alt: "Phone screenshot of AiStrike's LinkedIn Christmas post: an orange octopus in a Santa hat wrapped in fairy lights, with 'Merry Christmas' in red.",
              },
            },
          ],
        },
      ],
    },

    /* 8 ─────────────────────────────────────────────── */
    {
      id: "reflection",
      stage: "takeaways",
      title: "Clarity is power",
      blocks: [
        {
          type: "pullQuote",
          quote:
            "The most valuable thing I learned is that great design doesn't live in isolated screens — it lives in systems.",
          attribution: "Asmi, on the internship",
        },
        {
          type: "learnings",
          items: [
            {
              title: "Clarity is power",
              lead: "Design is not about adding, it's about removing.",
              points: [
                "In complex systems, users struggle because there's too much.",
                "I distil complexity into clear, intuitive and usable experiences.",
                "Clarity isn't just good design, it's a competitive advantage.",
              ],
            },
            {
              title: "Systems over screens",
              lead: "Great design doesn't live in isolated screens; it lives in systems.",
              points: ["If the system breaks, no individual screen can save it.", "That's where real impact lies."],
            },
            {
              title: "Empathy",
              lead: "Good design doesn't just serve users, it supports them.",
              points: [
                "What is stressing them right now?",
                "What can I remove to make their job easier?",
                "How can this design give them confidence, not confusion?",
              ],
            },
          ],
        },
        {
          type: "image",
          image: {
            src: `${IMG}/15-cut.webp`,
            cutout: true,
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
