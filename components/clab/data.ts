// Sample data for the CLAB prototype, taken from the high-fidelity screens.
// Nothing here is live: registration, payment and messaging are simulated.

export const A = "/images/projects/clab/proto";

export type Role = "student" | "professional" | "company";
export type Tab = "home" | "event" | "workspace" | "explore" | "account";

export type Company = {
  id: string;
  kind: "company";
  name: string;
  logo: string;
  location: string;
  about: string;
  skills: string[];
};
export type Person = {
  id: string;
  kind: "student" | "professional";
  name: string;
  photo: string;
  title: string;
  about: string;
  experience: string[];
  skills: string[];
};
export type Card = Company | Person;

export const COMPANIES: Company[] = [
  {
    id: "pilgrim",
    kind: "company",
    name: "Pilgrim",
    logo: `${A}/logo-pilgrim.webp`,
    location: "Mumbai, Maharashtra, India (On-site)",
    about: "A beauty and personal care brand looking for students to collaborate on brand and marketing projects.",
    skills: ["Public speaking", "Leadership", "Finance and marketing", "Adaptability", "Problem-solving"],
  },
  {
    id: "zomato",
    kind: "company",
    name: "Zomato",
    logo: `${A}/logo-zomato.webp`,
    location: "Mumbai, Maharashtra, India (On-site)",
    about: "A food delivery platform hosting webinars and projects for students and early-career professionals.",
    skills: ["Public speaking", "Leadership", "Finance and marketing", "Adaptability", "Problem-solving"],
  },
];

const ABOUT =
  "I am a dedicated and enthusiastic learner, passionate about using digital channels to achieve organisational goals. I have a Bachelor of Commerce degree from the University of Mumbai, majoring in Finance and Marketing.";

export const PEOPLE: Person[] = [
  {
    id: "ajay",
    kind: "professional",
    name: "Ajay",
    photo: `${A}/person-ajay.webp`,
    title: "Marketing professional",
    about: ABOUT,
    experience: ["Bachelor of Commerce in Finance and Marketing", "Developed and implemented marketing strategies", "Executed digital marketing campaigns"],
    skills: ["Public speaking", "Leadership", "Finance and marketing", "Adaptability", "Problem-solving"],
  },
  {
    id: "susan",
    kind: "professional",
    name: "Susan",
    photo: `${A}/person-susan.webp`,
    title: "Marketing professional",
    about: ABOUT,
    experience: ["Bachelor of Commerce in Finance and Marketing", "Developed and implemented marketing strategies"],
    skills: ["Strategic planning", "SEO", "Social media marketing", "Communication"],
  },
  {
    id: "aditya",
    kind: "student",
    name: "Aditya",
    photo: `${A}/person-aditya.webp`,
    title: "Commerce student",
    about: ABOUT,
    experience: ["Bachelor of Commerce in Finance and Marketing", "Developed and implemented marketing strategies", "Executed digital marketing campaigns"],
    skills: ["Public speaking", "Leadership", "Finance and marketing", "Adaptability", "Problem-solving"],
  },
  {
    id: "aditi",
    kind: "student",
    name: "Aditi",
    photo: `${A}/person-aditi.webp`,
    title: "Design student",
    about: "A design student focused on UX, from research and usability testing to wireframes and prototypes.",
    experience: ["Conducted user research and usability testing", "Created wireframes, prototypes and user flows", "Collaborated with cross-functional teams to implement design solutions"],
    skills: ["Strategic planning", "SEO", "Social media marketing", "Communication", "Creativity"],
  },
];

// Which profile tabs each role sees on Home, as in the two home screens
export const HOME_TABS: Record<Role, { key: Card["kind"]; label: string }[]> = {
  student: [
    { key: "company", label: "Company" },
    { key: "professional", label: "Professional" },
  ],
  professional: [
    { key: "student", label: "Student" },
    { key: "professional", label: "Professionals" },
    { key: "company", label: "Company" },
  ],
  company: [
    { key: "student", label: "Student" },
    { key: "professional", label: "Professional" },
  ],
};

export type Webinar = {
  id: string;
  title: string;
  host: string;
  poster: string;
  about: string;
  date: string;
  time: string;
  guests: string[];
  participants: number;
  status: "ongoing" | "upcoming" | "previous";
  kind?: "webinar" | "competition";
  rules?: string[];
  mine?: boolean;
};

export const DEFAULT_RULES = [
  "Mute your microphone unless speaking, to avoid background noise.",
  "Engage respectfully through the chat or Q&A; stay on topic.",
  "Ensure a stable internet connection and test your audio and video before joining.",
  "Do not record or take screenshots unless the host allows it.",
];
export const POSTERS = [`${A}/poster-walmart.webp`, `${A}/poster-zomato.webp`, `${A}/poster-ventura.webp`];

export const WEBINARS: Webinar[] = [
  {
    id: "zomato-live",
    title: "Strategies at Zomato",
    host: "Zomato",
    poster: `${A}/poster-zomato.webp`,
    about:
      "Join us live to explore innovative strategies and technological advancements. Discover how cutting-edge technology, sustainable practices and a customer-centric approach help a business stay competitive.",
    date: "31 Aug, 2024",
    time: "11:00 AM onwards",
    guests: ["Zomato strategy team"],
    participants: 70,
    status: "ongoing",
  },
  {
    id: "walmart",
    title: "Innovations and Strategies at Walmart",
    host: "Walmart",
    poster: `${A}/poster-walmart.webp`,
    about:
      "Join Walmart's exclusive webinar to explore its innovative strategies and technological advancements in retail. Discover how it uses cutting-edge technology, sustainable practices and a customer-centric approach to stay competitive. Perfect for retail professionals, tech enthusiasts and anyone interested in the future of shopping.",
    date: "5 Aug, 2024",
    time: "9:00 AM onwards",
    guests: ["Matt Turner", "Shruti Tiwari", "Akash Chadda"],
    participants: 30,
    status: "upcoming",
  },
  {
    id: "ventura",
    title: "Innovations and Strategies at Ventura",
    host: "Ventura",
    poster: `${A}/poster-ventura.webp`,
    about:
      "Discover how Ventura uses cutting-edge technology, sustainable practices and a customer-centric approach to stay competitive.",
    date: "1 Sept, 2024",
    time: "6:00 PM onwards",
    guests: ["Ventura leadership team"],
    participants: 30,
    status: "upcoming",
  },
  { id: "event-1", title: "Event 1", host: "CLAB", poster: `${A}/poster-walmart.webp`, about: "A past CLAB webinar.", date: "2 Jul, 2024", time: "10:00 AM", guests: [], participants: 42, status: "previous" },
  { id: "event-2", title: "Event 2", host: "CLAB", poster: `${A}/poster-ventura.webp`, about: "A past CLAB webinar.", date: "16 Jul, 2024", time: "4:00 PM", guests: [], participants: 35, status: "previous" },
  { id: "event-3", title: "Event 3", host: "CLAB", poster: `${A}/poster-zomato.webp`, about: "A past CLAB webinar.", date: "28 Jul, 2024", time: "11:00 AM", guests: [], participants: 51, status: "previous" },
];

export type Tool = "file" | "tracker" | "mood" | "docs" | "meetings" | "reports";
export const TOOLS: { key: Tool; label: string; bg: string; ink?: string; add: string; empty: string }[] = [
  { key: "file", label: "New File", bg: "#E7DAFF", add: "File name", empty: "No files yet. Start one for your team." },
  { key: "tracker", label: "Tracker", bg: "#FFF0C3", add: "New task", empty: "No tasks yet. Add the first one." },
  { key: "mood", label: "Mood board", bg: "#B7D6F2", add: "Reference or link", empty: "Collect references for the look and feel." },
  { key: "docs", label: "Documents", bg: "#D0FFD8", add: "Document name", empty: "Share briefs, research and notes here." },
  { key: "meetings", label: "Meetings", bg: "#FCE5FF", add: "Meeting, e.g. Review · 2 Sept 4 PM", empty: "No meetings scheduled." },
  { key: "reports", label: "Reports", bg: "#003466", ink: "#fff", add: "Report title", empty: "Reports you write will appear here." },
];

export type Item = { id: string; text: string; done?: boolean; due?: string };
export type Project = {
  id: string;
  kind: "team" | "personal";
  name: string;
  description: string;
  start: string;
  end: string;
  time: string;
  skills: string[];
  thumb: number; // index into THUMBS
  visibility: "public" | "private";
  teamSize: number;
  members: string[];
  requests: string[];
  tools: Partial<Record<Tool, Item[]>>;
  saved?: boolean;
  createdAt: number;
};

// Thumbnail styles for project cards (from the coloured project tiles)
export const THUMBS = ["#D0FFD8", "#E7DAFF", "#FFE2CC", "#FCE5FF", "#FFF0C3", "#C9ECF2"];

export const SKILLS = ["UX / UI Designer", "Researcher", "Web Developer", "Marketing", "Event Manager", "HR", "Content Writer", "Data Analyst"];

const seedProject = (id: string, name: string, thumb: number, extra: Partial<Project> = {}): Project => ({
  id,
  kind: "team",
  name,
  description: "Brief background research, problem framing and a plan for the deliverables.",
  start: "2024-08-05",
  end: "2024-08-20",
  time: "09:00",
  skills: ["UX / UI Designer"],
  thumb,
  visibility: "public",
  teamSize: 4,
  members: ["You"],
  requests: [],
  tools: {},
  createdAt: 0,
  ...extra,
});

export const SEED_PROJECTS: Project[] = [
  seedProject("project-1", "Project 1", 1, {
    members: ["You", "Aditi"],
    requests: ["aditya", "susan"],
    tools: {
      tracker: [
        { id: "t1", text: "Finalise research questions", due: "1 Sept" },
        { id: "t2", text: "Book interview slots", due: "1 Sept" },
        { id: "t3", text: "Share the affinity map", due: "1 Sept" },
        { id: "t4", text: "Draft the problem statement", due: "1 Sept" },
        { id: "t5", text: "Review moodboard", due: "1 Sept" },
      ],
      docs: [{ id: "d1", text: "Project brief" }],
      meetings: [{ id: "m1", text: "Kick-off · 5 Aug 9:00 AM" }],
    },
  }),
  seedProject("ica-1", "ICA 1", 0),
  seedProject("tee-1", "TEE 1", 5),
  seedProject("project-2", "Project 2", 2),
  seedProject("ica-2", "ICA 2", 3),
  seedProject("ica-3", "ICA 3", 4),
  seedProject("tee-2", "TEE 2", 1),
];

export type Portfolio = {
  id: string;
  title: string;
  heading: string;
  body: string;
  projects: string[]; // names from RECENT_PROJECTS
  accent: string;
  cover: number; // index into COVERS
  updatedAt: number;
};
export const COVERS = [`${A}/folio-1.webp`, `${A}/folio-2.webp`, `${A}/folio-3.webp`];
export const RECENT_PROJECTS = ["Product Design", "Interface Design", "Interaction Design", "Data Visualisation", "Design Thinking", "NGO"];
export const PORTFOLIO_ACCENTS = ["#8F49CD", "#63328D", "#003466", "#7F99B2"];

const seedFolio = (id: string, title: string, cover: number, projects: string[], accent = "#8F49CD"): Portfolio => ({
  id,
  title,
  heading: title,
  body: "Selected work from my CLAB projects.",
  projects,
  accent,
  cover,
  updatedAt: 0,
});
export const SEED_PORTFOLIOS: Portfolio[] = [
  seedFolio("clab-1", "Clab Portfolio 1", 0, ["Product Design", "Interface Design"]),
  seedFolio("ngo", "Portfolio NGO", 2, ["NGO", "Design Thinking"], "#63328D"),
  seedFolio("target", "Target Portfolio", 1, ["Data Visualisation"], "#003466"),
  seedFolio("job", "Job Portfolio", 0, ["Product Design", "Interaction Design"]),
];

export type Course = { id: string; title: string; length: string; lessons: number; image: string; mentor: string };
export const COURSES: Course[] = [
  { id: "ui", title: "UI Design Course", length: "2h 40min", lessons: 15, image: `${A}/course-ui.webp`, mentor: "harvey" },
  { id: "ux", title: "UX Design Course", length: "2h 40min", lessons: 15, image: `${A}/course-ux.webp`, mentor: "harvey" },
  { id: "web", title: "Web Design Course", length: "4h 20min", lessons: 24, image: `${A}/course-web.webp`, mentor: "asep" },
  { id: "wire", title: "Wireframe", length: "1h 50min", lessons: 14, image: `${A}/course-wire.webp`, mentor: "steve" },
];
export type Mentor = { id: string; name: string; role: string; courses: number; photo: string };
export const MENTORS: Mentor[] = [
  { id: "steve", name: "Steve M", role: "Full-stack Developer", courses: 22, photo: `${A}/mentor-steve.webp` },
  { id: "harvey", name: "Harvey J", role: "UI/UX Designer", courses: 18, photo: `${A}/mentor-harvey.webp` },
  { id: "asep", name: "Asep Yanto", role: "Front End Developer", courses: 24, photo: `${A}/mentor-asep.webp` },
];

export type Profile = { name: string; headline: string; location: string; about: string; skills: string[]; experience: string[] };
export const PROFILES: Record<Role, Profile> = {
  student: {
    name: "Asmi Shaikh",
    headline: "Connecting dots",
    location: "Mumbai, India",
    about: "Design student exploring UX, research and visual communication.",
    skills: ["User research", "UX design", "Prototyping", "Visual design"],
    experience: ["B.Des, NMIMS School of Design", "Design intern"],
  },
  company: {
    name: "Walmart",
    headline: "Save money. Live better.",
    location: "Bentonville, USA",
    about: "Hosting webinars and competitions on CLAB to meet students and professionals.",
    skills: ["Retail", "Technology", "Sustainability"],
    experience: ["Webinars", "Competitions"],
  },
  professional: {
    name: "Arihant Khicha",
    headline: "Marketing manager",
    location: "Mumbai, India",
    about: "Marketing manager with 10+ years in digital marketing, looking for student projects and partners.",
    skills: ["Digital marketing", "Strategic planning", "Leadership", "Mentoring"],
    experience: ["Marketing manager", "Digital marketing lead"],
  },
};

export type Thread = { id: string; name: string; handle: string; messages: { from: "them" | "me"; text: string }[] };
export const THREADS: Thread[] = [
  { id: "jane", name: "Jane Steward", handle: "@janesteward", messages: [{ from: "them", text: "Hi! About that important meeting: we can all agree that this time will be different." }] },
  { id: "alexandra", name: "Alexandra Bennett", handle: "@alexandrab", messages: [{ from: "them", text: "Hey, long time no chat! How's life treating you?" }] },
  { id: "jordan", name: "Jordan Rodriguez", handle: "@JRunninFree", messages: [{ from: "them", text: "Hey buddy! Guess who just registered for a half marathon? This guy!" }] },
  { id: "emily", name: "Emily Chang", handle: "@emilyc", messages: [{ from: "them", text: "Hey there! I finally took the plunge and signed up for that cooking class." }] },
];

export const DAYS = [
  { id: "30 Aug", label: "30", month: "Aug" },
  { id: "31 Aug", label: "31", month: "Aug", today: true },
  { id: "1 Sept", label: "1", month: "Sept" },
];

export type Post = { id: string; author: string; handle: string; place: string; image: string; caption: string; when: string; likes: number; comments: string[] };
export const POSTS: Post[] = [
  { id: "paris", author: "Paris", handle: "john_doe", place: "Paris", image: `${A}/post-paris.webp`, caption: "Business tour", when: "2 days ago", likes: 21, comments: [] },
];
