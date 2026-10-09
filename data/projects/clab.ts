import { needed, type Project } from "@/lib/types";

const IMG = "/images/projects/clab";

const project: Project = {
  slug: "clab",
  title: "Clab",
  subtitle: "Connecting creative minds",
  oneLiner:
    "A mobile platform where companies, working professionals and university students meet, collaborate on projects, join webinars and competitions, and build portfolios in one place.",
  tier: "focused",
  order: 0,
  kind: "Mobile app · Collaboration and networking platform",
  year: needed("Year the project was done (Behance published Sept 2025; the UI mock data uses Aug 2024)"),
  duration: needed("Project duration"),
  role: "User research, interviews and synthesis, UX design, material design, prototyping",
  team: {
    solo: false,
    collaborators: ["Adele P."],
    note: "Credited on the cover; Adele's role not stated",
  },
  disciplines: ["research", "ux-ui", "systems"],
  thinking: ["people", "research", "systems", "business"],
  tags: ["Mobile app", "UX research", "Collaboration", "Networking", "Design system", "Prototyping", "Branding"],
  tools: ["Figma"],
  accent: "#8F49CD",
  cover: {
    type: "motion",
    composition: "clab",
    poster: {
      src: `${IMG}/33.webp`,
      alt: "Three CLAB phone screens side by side: the home feed as seen by a student, a professional and a company, each showing profile cards.",
    },
  },
  proofPoint: "30 interviews · 20 user tests",
  quickRead: {
    problem:
      "Professional networking platforms don't support project work or mentorship. Companies, creative professionals and students can connect, but they can't really build anything together.",
    insight:
      "People were frustrated at juggling several platforms for one project: one for chat, one for files, one for tasks. That fragmentation led to inefficiency and miscommunication.",
    solution:
      "CLAB: one mobile app with a home feed tailored to each user type, a shared project workspace, webinars and competitions hosted by companies, and portfolios generated straight from your CLAB projects.",
    result: needed("Outcome of the project (no results, grade or impact are stated on the slides)"),
  },
  chapters: [
    {
      id: "context",
      label: "Context",
      title: "Networking, minus the work",
      intro:
        "LinkedIn is built for connecting people, but it has no workspace for what happens next, when people actually need to work together.",
      blocks: [
        {
          type: "text",
          body: [
            "Existing professional networking platforms don't have integrated features for collaborative project work or mentorship. Professionals and university students can find each other, but there's no seamless place to work together, learn from each other, or enter competitions as a team.",
            "We set out to design a platform that closes that gap, with tools for collaboration, mentorship and competitions built in from the start.",
            "We designed for three groups: companies and universities, working professionals, and students.",
          ],
        },
        {
          type: "text",
          heading: "What we wanted to find out",
          body: [
            "What are the limits of the platforms people already use?",
            "What do companies, creative professionals and students each need?",
            "How does relying on several platforms affect the speed and quality of collaboration in the creative industry?",
          ],
        },
        {
          type: "image",
          size: "wide",
          image: {
            src: `${IMG}/04.webp`,
            alt: "Left: a mind map centred on 'Work Collaboration' branching into problems, existing solutions, uniqueness, business, impact and analysis. Right: an isometric purple-and-blue illustration labelled with web coding, new connections, online meets, hybrid work, hiring, planning, calendar, timeline, data transfer and security.",
            caption: "We started with a mind map and a rich picture to map the space before doing any research.",
          },
        },
      ],
    },
    {
      id: "research",
      label: "Research",
      title: "63 sources, 30 conversations",
      intro: "Secondary research first, then the people themselves.",
      blocks: [
        {
          type: "researchMethods",
          heading: "How we listened",
          groups: [
            { label: "Working professionals interviewed", value: 20 },
            { label: "University students interviewed", value: 10 },
          ],
          methods: [
            {
              name: "Literature review",
              detail: "63 sources: 29 articles, 18 research papers, 10 blogs, 4 theses, 2 conference papers",
            },
            { name: "Online survey", detail: "35 responses" },
            { name: "Interviews", detail: "30 interviews: 20 working professionals, 10 university students" },
            {
              name: "Competitor analysis",
              detail: "9 tools: LinkedIn, Bumble Bizz, Slack, Microsoft Teams, Zoom, Google Meet, Figma, Canva, Instagram",
            },
            { name: "Synthesis", detail: "Personas, user journeys, empathy maps, affinity mapping, gap analysis" },
          ],
        },
        {
          type: "text",
          heading: "What the literature said",
          body: [
            "Collaboration measurably improves performance. Teams achieve more than individuals working alone.",
            "Social networking platforms play a real role in career growth.",
            "Virtual teams struggle with communication, coordination and staying cohesive.",
            "In education, good collaboration deepens learning and better prepares students for real work.",
          ],
        },
        {
          type: "text",
          heading: "Where the competitors fall short",
          body: [
            "Of the eight tools we compared feature by feature, only LinkedIn covered networking, group collaboration, live chat, video calls and document sharing. Microsoft Teams covered everything except networking. The rest covered one to three.",
            "LinkedIn: information overload, job-application spam, unfamiliar terminology, and no workspace. Bumble Bizz: a small user base and a mix of personal and professional. Slack: notification overload, a learning curve, and channels that are hard to manage.",
          ],
        },
        {
          type: "text",
          heading: "What people told us",
          body: [
            "Professionals: complex navigation and feature overload; expensive premium tiers and limited free versions; steep learning curves with little training.",
            "Students: switching between apps for different tasks; too many features, when the essentials should be easy to reach; free tiers that cap collaborators, storage and advanced features.",
          ],
        },
      ],
    },
    {
      id: "people",
      label: "Personas",
      title: "Two people, two journeys",
      intro: "We built two personas and mapped how each one looks for collaborators and opportunities today.",
      blocks: [
        {
          type: "personas",
          items: [
            {
              name: "Arihant Khicha",
              age: "35",
              descriptor: "Working professional · Marketing manager in Mumbai with 10+ years in digital marketing · Prefers hybrid work",
              needs: [
                "Partnerships with educational institutions for student projects and talent development",
                "Like-minded professionals and startups for business ventures",
              ],
              frustrations: [
                "Balancing daily responsibilities with collaborative projects",
                "Keeping communication and coordination working across teams and projects",
                "Finding partners whose goals and values match the company's",
              ],
            },
            {
              name: "Suhani Mishra",
              age: "23",
              descriptor: "Student · Design student in Mumbai focused on visual communication and UX · Prefers working in an office",
              needs: [
                "Connections with professionals and peers in the design community",
                "Guidance and mentorship from experienced professionals",
              ],
              frustrations: [
                "Balancing coursework with extracurriculars and collaborative projects",
                "Keeping up with fast-moving design trends and tools",
                "Finding mentors willing to guide her",
              ],
            },
          ],
        },
        { type: "needed", items: ["Confirm the professional persona's name: the slide calls him Arihant Khicha, but his bio calls him 'Alex'"] },
        {
          type: "gallery",
          heading: "User journeys",
          layout: "grid",
          columns: 2,
          images: [
            {
              src: `${IMG}/14.webp`,
              alt: "User journey grid for a working professional across four stages, with rows for task, thinking, emotions, an emotion curve, pain points and suggestions. The curve starts lowest at stage one and peaks at stage four.",
              caption: "The professional starts out 'overwhelming and confusing', searching LinkedIn and forums for partners.",
            },
            {
              src: `${IMG}/15.webp`,
              alt: "User journey grid for a student across five stages, from exploring LinkedIn for opportunities to networking with professionals, with an emotion curve that is low at first and peaks at stage four.",
              caption: "The student's lowest point is the first one: too much information online to find relevant opportunities.",
            },
          ],
        },
        {
          type: "image",
          size: "wide",
          image: {
            src: `${IMG}/20.webp`,
            alt: "Affinity map of colour-coded sticky notes grouped under networking behaviours, challenges and barriers to collaboration, environmental influences, applications and tools used, behavioural insights, and student needs and wants.",
            caption: "Affinity mapping, part one of two.",
          },
        },
      ],
    },
    {
      id: "insights",
      label: "Insights",
      title: "Too many tabs, not enough trust",
      blocks: [
        {
          type: "insightChain",
          heading: "What the research added up to",
          items: [
            {
              observation:
                "People were frustrated at having to use several platforms to manage one project: communication in one, files in another, tasks in a third.",
              insight: "This platform fragmentation often led to inefficiency and miscommunication.",
              opportunity: "One collaboration space with project management built in, next to the network itself.",
            },
            {
              observation:
                "Professionals flagged feature overload, complex navigation and steep learning curves; students said too many features were overwhelming.",
              insight: "Essential functions need to be easy to reach. More features isn't the answer.",
              opportunity: "A five-item bottom nav (Home, Event, Create, Workspace, Account) and a single Create menu.",
            },
            {
              observation: "Virtual teams often struggle with communication, coordination and staying cohesive.",
              insight: "Building trust through transparency and collaborative practice helps teams overcome the challenges of remote work.",
              opportunity: "Transparent profiles: company verification, plus skills and experience visible on every card.",
            },
          ],
        },
        {
          type: "text",
          heading: "Gaps we found",
          body: [
            "Our gap analysis flagged four areas that existing research hasn't covered well: how collaboration platforms help or hinder creativity; integration with emerging technologies like AI, VR and AR; long-term engagement and productivity; and accessibility for people with disabilities or lower tech literacy.",
          ],
        },
        {
          type: "hmw",
          label: "Problem statement",
          statement:
            "Professional networking platforms lack integrated features for collaborative project work and mentorship, failing to provide a seamless environment where Companies, creative professionals and university students can connect and collaborate on competitions, and develop meaningful mentorship relationships.",
        },
      ],
    },
    {
      id: "design",
      label: "Exploration",
      title: "Three tasks, three flows",
      intro: "Before we drew any screens, we wrote one key task for each type of user and mapped how they'd complete it.",
      blocks: [
        {
          type: "process",
          heading: "How we got from idea to screens",
          steps: [
            { title: "Structure", body: "Site maps and information architecture, then task identification." },
            { title: "Flows", body: "A task flow and user journey for each of the three user types." },
            { title: "Paper prototype", body: "Hand-drawn screens tested with users, then refined." },
            { title: "Mid fidelity", body: "Greyscale screens, followed by a round of feedback." },
            { title: "High fidelity", body: "Full visual design, then user testing and refinement." },
          ],
        },
        {
          type: "image",
          size: "wide",
          image: {
            src: `${IMG}/27.webp`,
            alt: "Three columns of prototype screens: two photos of hand-drawn paper screens, two greyscale mid-fidelity screens (a Walmart company profile and Settings), and two high-fidelity screens (company Verification and a Webinar page).",
            caption: "Paper, then grey, then purple.",
          },
        },
        {
          type: "features",
          heading: "One task per user type",
          items: [
            {
              title: "Company: sign in and host a webinar",
              body: "Three parts: sign up and choose a membership; sign in, complete the company profile and upload verification documents; then go to Event, create a webinar, enter the details and host it.",
              image: {
                src: `${IMG}/29.webp`,
                alt: "Task flow diagram in three parts, from Start and Sign Up through verification and membership payment, then profile completion and document upload, then creating and hosting a webinar to Finish.",
              },
            },
            {
              title: "Professional: create a project and build a team",
              body: "Create a project, add details and the skills you need, wait for requests, view profiles and accept members, then open the project workspace and set permissions and roles.",
              image: {
                src: `${IMG}/30.webp`,
                alt: "Task flow diagram: Home Dashboard, Events, Projects, Create Project, add project details and skill requirements, wait for request, view and accept requests, team management, open workspace, share terms, set permissions and configure workspace settings.",
              },
            },
            {
              title: "Student: create a portfolio with premium",
              body: "Go to Create, then Portfolio. Start from scratch, upload work from the app, subscribe to premium, then edit, save and view the finished portfolio.",
              image: {
                src: `${IMG}/31.webp`,
                alt: "Task flow diagram: Create, Portfolio, Create Portfolio, create from scratch, add content, upload from app, view subscription, subscribe, then upload, edit, save and view the portfolio.",
              },
            },
          ],
        },
      ],
    },
    {
      id: "solution",
      label: "Solution",
      title: "One app, three front doors",
      intro:
        "CLAB looks different depending on who opens it. The home feed changes with the user type, with tabs for browsing companies, professionals or students.",
      blocks: [
        {
          type: "image",
          size: "wide",
          image: {
            src: `${IMG}/33.webp`,
            alt: "Three high-fidelity CLAB home screens labelled Student, Professional and Company. Each has a search bar, date pills and user-type tabs, with profile cards for Pilgrim and Zomato, Aditya and Aditi, and Ajay and Susan.",
          },
        },
        {
          type: "features",
          heading: "What's inside",
          items: [
            {
              title: "All-inclusive collaboration space",
              body: "One place for professionals and students to connect, collaborate on projects and share ideas across disciplines.",
            },
            {
              title: "Project management",
              body: "Every team project opens into New File, Tracker, Mood board, Documents, Meetings and Reports.",
            },
            {
              title: "Competitions and webinars",
              body: "Organisations post competitions and host webinars; users register, join and form teams without leaving the app.",
            },
            {
              title: "Portfolio creation",
              body: "Pick your CLAB projects and generate a portfolio from them, then show it off on the same platform.",
            },
            {
              title: "Cross-disciplinary collaboration",
              body: "Profile cards put skills and experience up front, and projects list the key skills they need.",
            },
          ],
        },
        {
          type: "gallery",
          heading: "The three tasks, screen by screen",
          layout: "strip",
          images: [
            {
              src: `${IMG}/34.webp`,
              alt: "Eight company screens in a row: company home page, Event, Create menu, Verification form, Enter Webinar Details, My Coming Up Webinar, Explore feed and the Walmart account page.",
              caption: "Task 1, company: verify, then host a webinar.",
            },
            {
              src: `${IMG}/35.webp`,
              alt: "Seven professional screens: home page, Your Workspace with illustrated tiles, Create menu, New Team Projects form, Project Preview, Team Projects grid and the Project 1 options (New File, Tracker, Mood board, Documents, Meetings, Reports).",
              caption: "Task 2, professional: from an empty form to a working project space.",
            },
            {
              src: `${IMG}/36.webp`,
              alt: "Six student screens: home page with Pilgrim and Zomato, Event, Your Workspace, Course page with progress bar and top mentors, Portfolio page, and the 'Clab with Confidence!' premium screen.",
              caption: "Task 3, student: courses, portfolios and the premium upsell.",
            },
            {
              src: `${IMG}/37.webp`,
              alt: "Six student screens: CLAB Premium payment options, UPI AutoPay setup at ₹287 a month for students, the portfolio editor, a Select Projects checklist, the generated portfolio, and the portfolio list.",
              caption: "Task 3 continued: pay, pick projects, and generate the portfolio from them.",
            },
          ],
        },
        {
          type: "gallery",
          heading: "Design system",
          layout: "grid",
          columns: 2,
          images: [
            {
              src: `${IMG}/39.webp`,
              alt: "Branding sheet: a grid of 30 filled purple icons, large purple and navy buttons, medium and small buttons, and inactive versus active button states.",
              caption: "Purple for everyday actions, navy for premium.",
            },
            {
              src: `${IMG}/41.webp`,
              alt: "Component sheet: illustrated speciality tiles, three dropdowns for state, country and city, an August 2024 calendar, a Previous Webinar list, the bottom navigation bar, a Coming Up Webinar card and two profile cards.",
              caption: "The component sheet: tiles, dropdowns, calendar, cards and navigation.",
            },
          ],
        },
        {
          type: "text",
          heading: "Typography and colour",
          body: [
            "Poppins in Regular, Medium and Bold, from 36px headings down to 10px caps. The core palette is light purple #F0E5FA, purple #8F49CD and dark purple #63328D, with a blue set (#D3E3F5, #7F99B2, #003466) reserved for premium.",
          ],
        },
        {
          type: "image",
          size: "wide",
          image: {
            src: `${IMG}/43.webp`,
            alt: "CLAB business model canvas in pastel blocks: key partners, activities, resources, value propositions, customer relationships, channels, customer segments, cost structure and revenue streams.",
            caption: "Revenue comes from subscriptions, competition hosting, ads, and partnerships with companies and universities.",
          },
        },
      ],
    },
    {
      id: "testing",
      label: "Validation",
      title: "20 people, four asks",
      blocks: [
        {
          type: "testing",
          heading: "User testing",
          summary:
            "We put the high-fidelity prototype in the hands of 20 people, 10 working professionals and 10 students.",
        },
        {
          type: "image",
          size: "wide",
          image: {
            src: `${IMG}/44.webp`,
            alt: "Left: a diagram splitting 20 user tests into 10 working professionals and 10 students. Right: six photos of hands using the CLAB prototype on phones, showing the Verification form, a home feed and other screens.",
          },
        },
        {
          type: "text",
          heading: "What testers asked for",
          body: [
            "Drag and drop for organising tasks, files and project elements, to make things easier and faster.",
            "A way to collaborate on portfolios, or get feedback from peers before finalising one.",
            "A count of how many times a portfolio has been viewed or downloaded.",
            "A step-by-step guide for first-time users of the portfolio feature.",
          ],
        },
        {
          type: "needed",
          items: [
            "Which tasks testers were given, and how they performed (success rates, time, issues)",
            "What changed in the design after testing (the process lists 'Refinement' but doesn't show it)",
          ],
        },
      ],
    },
    {
      id: "reflection",
      label: "Reflection",
      title: "What I'd do next",
      blocks: [
        {
          type: "needed",
          items: [
            "Asmi's reflection: what she learned, what she'd change, and next steps (for example, the four testing suggestions)",
          ],
        },
      ],
    },
  ],
  contribution: {
    mine: ["User research", "Interviews and synthesis", "UX design", "Material design", "Prototyping"],
    team: needed("Adele P.'s contribution and how the work was split"),
  },
  links: { behance: "https://www.behance.net/gallery/234333025/Clab-Connecting-Creative-Minds" },
  seo: {
    title: "Clab: a collaboration platform for creatives · Asmi Shaikh",
    description:
      "A mobile app that connects companies, professionals and students to collaborate, mentor and compete. Built from 30 interviews and tested with 20 users.",
  },
};

export default project;
