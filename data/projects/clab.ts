import type { Project } from "@/lib/types";

const IMG = "/images/projects/clab";
const PDF = `${IMG}/pdf`;

const project: Project = {
  slug: "clab",
  title: "Clab",
  subtitle: "Connecting creative minds",
  oneLiner:
    "A mobile platform where companies, working professionals and university students meet, collaborate on projects, join webinars and competitions, and build portfolios in one place.",
  tier: "flagship",
  order: 2,
  kind: "Mobile app · Collaboration and networking platform",
  year: "2024",
  duration: "8 weeks",
  role: "User research, interviews and synthesis, UX design, material design, prototyping",
  team: { solo: false, collaborators: ["Adele P."] },
  disciplines: ["research", "ux-ui", "systems"],
  thinking: ["people", "research", "systems", "business"],
  tags: ["Web & mobile design", "Prototyping", "Branding", "UX/UI", "Team project"],
  tools: ["Figma"],
  accent: "#8F49CD",
  cover: {
    type: "motion",
    composition: "clab",
    poster: {
      src: `${IMG}/33-cut.webp`,
      cutout: true,
      alt: "Three CLAB phone screens side by side: the home feed as seen by a student, a professional and a company, each showing profile cards.",
    },
  },
  proofPoint: "20 user tests with professionals and students",
  quickRead: {
    problem:
      "Professional networking platforms don't support project work or mentorship. Companies, creative professionals and students can connect, but they can't really build anything together.",
    insight:
      "Users struggle with the inefficiency of switching between multiple collaboration tools, and trust in remote work depends on transparency and open dialogue.",
    solution:
      "CLAB: one mobile app with a home feed tailored to each user type, a shared project workspace, webinars and competitions hosted by companies, and portfolios generated straight from your CLAB projects.",
    result:
      "In 20 user tests, the workspace felt clean, intuitive and easy to navigate, and auto-generated portfolios looked polished and professional.",
  },
  chapters: [
    {
      id: "overview",
      stage: "overview",
      title: "Connecting creative minds",
      intro:
        "Existing professional networking platforms lack integrated features for collaborative project work and mentorship, so professionals and students can't connect meaningfully.",
      blocks: [
        {
          type: "text",
          body: [
            "That gap holds back real-time collaboration, skill development and career growth. Our project set out to create an innovative platform that bridges it, with tools for collaboration, mentorship and taking part in competitions.",
          ],
        },
        {
          type: "stakeholderRings",
          heading: "Stakeholder mapping",
          rings: [
            { name: "Core", members: ["Working professionals", "Students"] },
            {
              name: "Direct influence",
              members: ["Development team", "Product managers", "Customer support team", "Founders and executives", "Marketing and sales teams"],
            },
            {
              name: "Indirect influence",
              members: ["Investors and shareholders", "Partners and integrators", "Competitors", "Regulatory bodies", "Industry influencers and advocates"],
            },
          ],
        },
      ],
    },
    {
      id: "process",
      stage: "process",
      title: "A user-centred path",
      intro: "We followed a user-centred design approach, from choosing the topic to refining the tested design.",
      blocks: [
        {
          type: "processPath",
          steps: [
            "Topic selection",
            "Brainstorming",
            "Rich picture",
            "Secondary research",
            "Primary research",
            "Data analysis",
            "Problem statement",
            "Conceptualisation",
            "Paper prototype",
            "Mid-fidelity prototyping",
            "High-fidelity prototyping",
            "User testing",
            "Refinement",
          ],
        },
      ],
    },
    {
      id: "research",
      stage: "research",
      title: "What the research left open",
      blocks: [
        {
          type: "iconCards",
          heading: "Secondary gaps",
          items: [
            { title: "Creativity", icon: "creativity", body: "Limited research on how collaboration platforms **influence creativity** in professional settings." },
            { title: "Engagement", icon: "engagement", body: "The long-term impact on user engagement and **productivity is underexplored**." },
            { title: "Accessibility", icon: "accessibility", body: "**Insufficient understanding** of accessibility for users with disabilities or **low digital literacy**." },
            { title: "Emerging tech", icon: "emerging", body: "**A lack of studies on integration** with emerging technologies like AI, VR and AR." },
          ],
        },
        {
          type: "iconCards",
          heading: "Primary insights",
          items: [
            { title: "Leadership shapes teams", icon: "leadership", body: "Team motivation and performance are shaped by **leadership style, decision-making and cognitive biases**." },
            { title: "Too many tools", icon: "tools", body: "Users struggle with the inefficiency of **switching between multiple collaboration tools**." },
            { title: "Trust needs openness", icon: "trust", body: "**Transparency and open dialogue** are key to building trust in remote work settings." },
          ],
        },
      ],
    },
    {
      id: "problem",
      stage: "problem",
      title: "Connect, collaborate, mentor",
      blocks: [
        {
          type: "hmw",
          label: "Problem statement",
          statement:
            "Existing professional networking platforms lack integrated features for collaborative project work and mentorship, failing to provide a seamless environment where companies, creative professionals and students can connect, collaborate on competitions, and develop meaningful mentorship relationships.",
        },
        {
          type: "image",
          size: "full",
          fill: true,
          heading: "Rich picture",
          image: {
            src: `${PDF}/rich-picture.webp`,
            alt: "Isometric purple-and-blue illustration of modern collaboration, labelled web coding, new connections, online meets, hybrid work, next project, hiring, process, planning, collaboration, calendar, timeline, data transfer and security",
            caption: "A visual snapshot of modern collaboration, to inform our design direction.",
          },
        },
      ],
    },
    {
      id: "design",
      stage: "ideation",
      title: "From mind map to wireframes",
      intro:
        "During ideation we explored many ways, and products, that could deliver unique value to each stakeholder, which led us to Clab.",
      blocks: [
        {
          type: "image",
          size: "wide",
          heading: "Mind mapping",
          image: {
            src: `${PDF}/mind-map-v2.webp`,
            cutout: true,
            alt: "Large mind map centred on Work Collaboration, branching into challenges faced, current solutions and their drawbacks, target audience, impact and need to fix the problem, impact created by existing solutions, problems faced by existing solutions and impact on their work life, with colour-coded notes",
          },
        },
        {
          type: "image",
          size: "wide",
          heading: "Low-fidelity prototype",
          image: {
            src: `${PDF}/low-fidelity.webp`,
            alt: "Photos of hand-drawn paper screens: login pages, sign-up and account set-up steps, a CLAB splash screen, a home feed with professional and company cards, a premium subscription screen and portfolio screens",
            caption: "Rapid sketches to explore flows, tested for clarity and usability, then refined through feedback.",
          },
        },
        {
          type: "image",
          size: "wide",
          heading: "Mid-fidelity prototype",
          image: {
            src: `${PDF}/mid-fidelity.webp`,
            cutout: true,
            alt: "Seven greyscale wireframes: an ongoing webinar, Enter Your Details, a Coming Up Webinar with previous webinars, the Walmart company profile, a portfolio editor, a portfolio preview and Settings",
            caption: "Sketches turned into structured wireframes to test layout, flow and function before visual design.",
          },
        },
      ],
    },
    {
      id: "brand",
      stage: "ideation",
      title: "Colours and fonts",
      blocks: [
        {
          type: "colorSystem",
          groups: [
            {
              title: "Brand colours",
              note: "primary",
              display: "circles",
              swatches: [
                { name: "Light purple", hex: "#F0E5FA" },
                { name: "Purple", hex: "#8F49CD" },
                { name: "Dark purple", hex: "#63328D" },
              ],
            },
            {
              title: "Brand colours",
              note: "secondary",
              display: "circles",
              swatches: [
                { name: "Baby pink", hex: "#FCE5FF" },
                { name: "Pale yellow", hex: "#FFF0C3" },
                { name: "Light blue", hex: "#B7D6F2" },
                { name: "Baby blue", hex: "#C9ECF2" },
                { name: "Bright green", hex: "#D0FFD8" },
                { name: "Lilac purple", hex: "#E7DAFF" },
              ],
            },
            {
              title: "Premium colours",
              display: "bands",
              swatches: [
                { name: "Light blue", hex: "#D3E3F5" },
                { name: "Blue", hex: "#7F99B2" },
                { name: "Dark blue", hex: "#003466" },
              ],
            },
            {
              title: "Typeface colours",
              display: "ramp",
              swatches: [
                { name: "White", hex: "#FFFFFF" },
                { name: "Grey light 3", hex: "#E6E6E6" },
                { name: "Grey light 2", hex: "#CBCBCB" },
                { name: "Grey", hex: "#737373" },
                { name: "Grey dark 2", hex: "#191919" },
                { name: "Grey dark 3", hex: "#010101" },
              ],
            },
          ],
          specimen: {
            label: "Fonts used",
            image: {
              src: `${PDF}/fonts-v3.webp`,
              alt: "Poppins specimen: the alphabet in capitals and lower case, numerals and symbols, and the weights Black, ExtraBold, Bold, SemiBold, Medium, Regular, Light, Extralight and Thin",
            },
          },
        },
      ],
    },
    {
      id: "solution",
      stage: "solution",
      title: "One app, three front doors",
      intro:
        "We designed tailored interfaces for students, companies and working professionals, with personalised journeys, clear calls to action and seamless navigation for each group's needs. These screens reflect UX decisions refined through earlier testing and feedback.",
      blocks: [
        {
          type: "groups",
          columns: 2,
          groups: [
            {
              title: "For students",
              items: [
                "Discover companies, professionals and webinars on one feed",
                "Learn through courses and top mentors",
                "Turn CLAB projects into a portfolio with Premium",
              ],
            },
            {
              title: "For working professionals",
              items: [
                "Find students and professionals by their skills",
                "Create team projects, list the skills needed and accept requests",
                "Run the project in one workspace: files, tracker, mood board, documents, meetings and reports",
              ],
            },
          ],
        },
        {
          type: "clabPrototype",
          heading: "Try the prototype",
          intro: "Switch between the student, working professional and company experiences, or follow one of the four journeys. Everything on the phone works.",
        },
        {
          type: "clabMaterial",
          heading: "Material design",
        },
        {
          type: "keyFeatures",
          heading: "Key features",
          centre: "Clab",
          items: [
            {
              title: "Integrated connection and collaboration tools",
              body: "Real-time connecting and collaboration features that let users work together seamlessly.",
              icon: "collaborate",
            },
            {
              title: "Portfolio management",
              body: "An intuitive system for creating quick, professional portfolios and showcasing them within the same platform.",
              icon: "portfolio",
            },
            {
              title: "Competition and webinar participation",
              body: "Easy access to industry competitions and webinars, with tools to form teams and collaborate directly within the app.",
              icon: "community",
            },
          ],
        },
      ],
    },
    {
      id: "testing",
      stage: "testing",
      title: "20 people, one prototype",
      blocks: [
        {
          type: "testOverview",
          heading: "Testing solutions",
          rating: { value: 4, max: 5, label: "User testing rating" },
          total: { value: "20", label: "User tests" },
          groups: [
            { label: "Working professionals", value: 10, unit: "people", icon: "work" },
            { label: "Students", value: 10, unit: "people", icon: "students" },
          ],
          worked: [
            "The workspace was clean, intuitive and easy to navigate.",
            "Auto-generated portfolios looked polished and professional.",
            "Onboarding tutorials were helpful, though testers wanted more advanced guidance.",
          ],
        },
      ],
    },
    {
      id: "future",
      stage: "future",
      title: "Where Clab goes next",
      blocks: [
        {
          type: "list",
          items: [
            "Direct export and sharing to LinkedIn and personal sites.",
            "Better file management, with version control, tags and easy sharing.",
            "Visual cues like colour labels and progress bars for tracking status.",
            "In-app feedback for reporting issues and suggesting features.",
          ],
        },
        {
          type: "businessModel",
          heading: "Business model",
          partners: ["Legal team", "Marketing partners", "Payment gateway", "Companies and universities"],
          activities: ["Mentorship programmes", "User engagement through events, webinars and courses", "Portfolio creation"],
          resources: [
            "Legal team",
            "Web developers",
            "Design team",
            "Marketing team",
            "Technical infrastructure",
            "Partnerships with educational institutions, companies and industry experts",
          ],
          value: [
            "A platform for seamless collaboration among students, professionals and companies",
            "Webinars, projects, courses and mentorship in one place",
          ],
          relationships: ["Company – working professionals", "Student – company", "Student – working professionals"],
          channels: [
            "Social media",
            "Events",
            "Ads",
            "Competitions in colleges",
            "Word of mouth",
            "Blogs and vlogs",
            "Company and university recommendations",
          ],
          segments: ["Working professionals", "Students", "Companies"],
          revenue: ["Subscription", "Competition hosting", "Advertisements", "Partnerships with companies and universities"],
          costs: [
            "App development and maintenance",
            "Legal retainer fee",
            "Marketing team",
            "Design team",
            "Software subscriptions",
            "Content creation (blogs, videos)",
            "Events and promotions",
            "Infrastructure (servers, cloud services)",
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
            "Balancing creativity with brand consistency while redesigning an established platform.",
            "Why user-centred design depends on continuous feedback and usability testing.",
            "Turning user pain points into actionable design solutions.",
            "Stronger skills in visual hierarchy, content organisation and responsive design.",
            "How small interaction and navigation improvements can make a big difference to user satisfaction.",
          ],
        },
      ],
    },
  ],
  contribution: {
    mine: [
      "User research, interviews and synthesis",
      "UX design and material design",
      "Prototyping",
      "The complete high-fidelity screen design and execution in Figma, translating the research and concepts into the final visual experience",
    ],
    team: ["Adele P. created the project video and presentation deck, and wrote the research paper."],
  },
  links: { behance: "https://www.behance.net/gallery/234333025/Clab-Connecting-Creative-Minds" },
  seo: {
    title: "Clab: a collaboration platform for creatives · Asmi Shaikh",
    description:
      "A mobile app that connects companies, professionals and students to collaborate, mentor and compete, tested with 20 users.",
  },
};

export default project;
