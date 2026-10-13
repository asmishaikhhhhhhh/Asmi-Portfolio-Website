/**
 * Profile data — the single source of truth for everything about Asmi that
 * isn't a project. Used by the About page, Resume page, footer, SEO and the
 * Ask Asmi chatbot.
 *
 * Sources: resume (2026), asmishaikh.framer.website, behance.net/asmishaikh24.
 * Unknowns use needed("…") — see lib/types.ts.
 *
 * GPA is intentionally omitted (Asmi's request). Do not add it.
 */
import {
  needed,
  type EducationItem,
  type ExperienceItem,
  type Maybe,
  type Recognition,
  type SkillGroup,
} from "@/lib/types";

export const profile = {
  name: "Asmi Shaikh",
  role: "Multidisciplinary Designer",
  location: "Mumbai, India",
  /** Shown in the hero. */
  headline: "I connect far-flung ideas into experiences that feel simple",
  /** From the resume, lightly edited. */
  intro:
    "I enjoy working across different domains and bringing ideas together in unexpected ways. I like finding creative ways around constraints and making complex ideas feel simple and usable.",
  /** Her quote, shown above the bio on the About page. */
  aboutQuote: "A solution is effective when no one notices the problem ever existed.",
  /** Her words, from the current site. Used on the About page, the resume and Ask Asmi. */
  bio: [
    "As a multidisciplinary designer, I take pride in my versatility. Drawing from a wide range of experiences and fields of study, I approach challenges with fresh, creative perspectives and enjoy weaving insights across domains to craft meaningful solutions.",
    "I am inclined towards connecting far-flung thoughts into a single theme.",
  ],
  /** Her own value proposition from the current site. */
  valueProposition: "Inclined towards connecting far-flung thoughts into a single theme.",
  /**
   * Her statement, in her words, shown as the "gathering" sentence on the home page.
   * Segments with `link` or `theme` are the key phrases the thread connects.
   */
  statement: [
    { text: "I am dedicated to making " },
    { text: "complex ideas", link: "greenly" },
    { text: " more accessible by " },
    { text: "working around constraints", link: "fire-safe" },
    { text: " and finding " },
    { text: "creative ways", link: "clap-it" },
    { text: " to satisfy them." },
  ] as { text: string; link?: string; theme?: boolean }[],
  positioning:
    "I design systems: the research, products, services and screens in between, usually where something physical meets something digital.",
  /** Where she works now. Shown in the hero, About and Resume as the highlighted current role. */
  current: { role: "User Experience Designer", org: "IBM" },
  availability: {
    status: "Currently a User Experience Designer at IBM",
    detail: needed("What kind of roles (full-time / freelance / internship) and from when?") as Maybe<string>,
  },
  photo: { src: "/images/about/hilltop-portrait.webp", alt: "Asmi Shaikh smiling at a hilltop viewpoint, a hand in her hair, with a valley and lake behind her" },
  /** Round hero photo. Regenerate from any picture: npm run avatar -- "/path/to/photo.jpg" */
  avatar: { src: "/images/about/avatar-hilltop-wide.webp", alt: "Asmi Shaikh smiling at a hilltop viewpoint, with a valley and lake behind her" },
};

export const contact = {
  email: "shaikhasmi003@gmail.com",
  linkedin: "https://www.linkedin.com/in/asmi-shaikh-10a815275/",
  behance: "https://www.behance.net/asmishaikh24",
  medium: "https://medium.com/@shaikhasmi003",
  /** Put the PDF at /public/asmi-shaikh-resume.pdf */
  resumePdf: "/asmi-shaikh-resume.pdf",
};

export const education: EducationItem[] = [
  {
    qualification: "B.Des, Humanising Technology",
    institution: "NMIMS School of Design",
    period: "2022 – 2026",
    location: "Vile Parle, Mumbai",
  },
  {
    qualification: "Science (PCM), ISC — 12th",
    institution: "NL Dalmia High School",
    period: "2019 – 2021",
    location: "Mira Road",
  },
  {
    qualification: "Science + Art, ICSE — 10th",
    institution: "RBK School",
    period: "2015 – 2019",
    location: "Mira Road",
  },
];

export const experience: ExperienceItem[] = [
  {
    role: "User Experience Designer",
    org: "IBM",
    start: "", // needed: month and year Asmi started at IBM
    end: "Present",
    location: "", // needed: city · on-site / hybrid / remote
    summary: needed("One line on what Asmi does at IBM (team, product area, focus)"),
    current: true,
  },
  {
    role: "UX/UI Intern",
    org: "AiStrike Cybersecurity",
    start: "Nov 2025",
    end: "Apr 2026",
    location: "Mumbai",
    summary: "Designed cybersecurity dashboards and an AI chatbot, simplifying complex security information through intuitive, user-friendly interfaces.",
  },
  {
    role: "Founding Partner",
    org: "Dilatio & Co. (outreach firm)",
    start: "Oct 2024",
    end: "Feb 2026",
    location: "Dubai, UAE · Hybrid",
    summary: "Led design and brand communication while supporting outreach initiatives and developing the firm’s visual identity.",
  },
  {
    role: "Design Intern",
    org: "Quawd",
    start: "Apr 2025",
    end: "Jun 2025",
    location: "Mumbai",
    summary: "Created packaging visuals and brand assets for Pedigree, Sheba, Chabi and Whiskas, translating brand identities into engaging consumer-facing designs.",
  },
  {
    role: "Design Intern (NGO)",
    org: "Child Help Foundation",
    start: "May 2024",
    end: "Jun 2024",
    location: "Mumbai",
    summary: "Designed an event management app and created banners, standees, annual reports and merchandise for NGO initiatives.",
  },
  {
    role: "Joint Secretary",
    org: "Rotaract Club of New Bombay",
    start: "Aug 2023",
    end: "2024",
    location: "Mumbai",
    summary: "Coordinated events and club initiatives while managing communication, outreach and creative requirements across projects.",
  },
];

export const recognition: Recognition[] = [
  {
    title: "Award of Excellence",
    detail: "NMIMS Research Embedded Learning Symposium",
    date: "January 2025",
  },
  {
    title: "Published white paper",
    detail:
    "“A New Era of Connectivity: Exploring the Potential of PI Network”, selected for publishing by Iterative International Publishers in their IIP Series 2024 book series",
    date: "January 2025",
    href: "https://www.iipseries.org/viewpaper.php?pid=4523&pt=a-new-era-of-connectivity-exploring-the-potential-of-pi-network",
  },
];

/** Grouped the way she works. `evidence` = project slugs that show the skill. */
export const skills: SkillGroup[] = [
  {
    name: "Think",
    verb: "Research",
    label: "Research & Discovery",
    blurb: "Understanding people and the systems around them before designing anything.",
    skills: [
      { name: "Design research", evidence: ["leapsters", "fire-safe", "clab"] },
      { name: "Ethnographic research", evidence: ["celestial-influence"] },
      { name: "User testing", evidence: ["leapsters", "netflix-mobile", "clab"] },
      { name: "Ideation & conceptualisation", evidence: ["leapsters", "fire-safe", "clap-it"] },
    ],
  },
  {
    name: "Make",
    verb: "Conceptualise",
    label: "Design & Prototyping",
    blurb: "Turning insight into things people can hold, tap and test.",
    skills: [
      { name: "UI / UX design", evidence: ["clab", "netflix-mobile", "greenly"] },
      { name: "Prototyping", evidence: ["clap-it", "fire-safe", "greenly"] },
      { name: "Visual communication", evidence: ["adeiro", "fiama"] },
      { name: "Data visualisation", links: [{ label: "Streaming re-releases, 2024", href: "/playground/streaming-rereleases" }] },
    ],
  },
  {
    name: "Explore",
    verb: "Experiment",
    label: "Systems & Experimentation",
    blurb: "The edges where design meets other fields.",
    skills: [
      { name: "Ecosystem design", evidence: ["greenly", "leapsters", "fire-safe"] },
      { name: "Service design", evidence: ["greenly"] },
      { name: "Physical computing (Arduino)" },
      { name: "Photography & videography" },
      { name: "Marketing" },
    ],
  },
];

export const tools = {
  daily: ["Figma", "Framer", "Illustrator", "Photoshop", "InDesign"],
  also: [
    "Premiere Pro",
    "After Effects",
    "DaVinci Resolve",
    "Blender",
    "Fusion 360",
    "Unity",
    "Tableau",
    "Arduino",
    "Webflow",
    "Relume",
    "Lovable",
    "Hotjar",
    "Notion",
    "Google Workspace",
  ],
  basic: ["Rive", "HTML", "CSS", "JavaScript"],
};

/** Her own lines from the current site ("Through my design lens"). */
export const designConfessions = [
  "My Figma files have more versions than Marvel movies.",
  "The only shortcut I truly mastered is Ctrl+Z.",
  "The real challenge of design? Explaining to your mom what you actually do.",
  "The hardest part of design? Knowing when to stop fixing what only you can see.",
  "My moodboards have more remixes than my Spotify playlists.",
  "My iterations stack faster than Zomato bills.",
  "Design feedback changes shades faster than Nykaa lipsticks.",
];

export const offScreen = [
  { label: "Animals", line: "I love animals.", image: { src: "/images/about/dog.webp", alt: "A fluffy cream puppy held up in front of pink flowers" } },
  { label: "Food", line: "Endless love for food.", image: { src: "/images/about/food-box.webp", alt: "Asmi grinning at the camera beside an open takeaway box of food topped with sauce and spring onions", focus: "50% 62%" } },
  { label: "Adventure", line: "Adventure fuels me.", image: { src: "/images/about/horse-riding.webp", alt: "Asmi on a rearing dark horse on a hilltop, hair flying, with hills and a lake far below", focus: "55% 50%" } },
];

/** "Unfolding my designed life": photos of Asmi at work, from the current site (same order). Permission to reuse: confirm with Asmi. */
export const atWork = [
  { src: "/images/about/prototype-lamps.webp", alt: "Asmi grinning while holding two white faceted paper forms, one in each hand" },
  { src: "/images/about/research-poster.webp", alt: "Asmi smiling beside a research poster titled “Revolutionizing Workspace Furniture for Professional Workers”" },
  { src: "/images/about/presenting-board.webp", alt: "Asmi presenting her Clap It product board, with sketches, CAD models and renders, at NMIMS School of Design" },
  { src: "/images/about/sketching.webp", alt: "Asmi sitting at a café table, painting a small cat figurine with a fine brush, a watercolour palette beside her" },
  { src: "/images/about/certificate.webp", alt: "Asmi receiving a certificate, standing between two faculty members" },
];
