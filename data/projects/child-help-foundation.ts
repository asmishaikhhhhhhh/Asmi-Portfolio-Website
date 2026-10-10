import { needed, type Project } from "@/lib/types";

const IMG = "/images/projects/child-help-foundation";

// Source: docs/sources/child-help-foundation.md (transcribed from Asmi's PDF, portfolio pages 45–47)

const project: Project = {
  slug: "child-help-foundation",
  title: "Child Help Foundation",
  subtitle: "An NGO internship across app, print and photography",
  oneLiner:
    "An internship with Child Help Foundation: an event tracker prototype, an annual report and print materials, and photography of the foundation's events.",
  tier: "flagship",
  order: 2,
  kind: "Internship · NGO design",
  // From Asmi's resume: Design Intern (NGO), May 2024 – Jun 2024
  year: "2024",
  duration: "2 months",
  role: "Design Intern (NGO)",
  team: {
    solo: true,
    note: "The PDF is written in first person (\"I collaborated with Child Help Foundation\"); supervisors or other designers are not named",
  },
  disciplines: ["ux-ui", "physical-brand"],
  thinking: ["people", "visuals", "stories"],
  tags: [
    "NGO",
    "Social impact",
    "Event management app",
    "Editorial design",
    "Annual report",
    "Brand collaterals",
    "Photography",
  ],
  tools: [],
  accent: "#0E2E51",
  cover: {
    type: "motion",
    composition: "child-help-foundation",
    poster: {
      src: `${IMG}/01.webp`,
      alt: "Five phone screens from the Child Help Foundation event tracker on light grey: sign-in, an event submission form, recommended events, an events list and a dashboard with beneficiary and volunteer counts.",
      focus: "50% 45%",
    },
  },
  proofPoint: "5 design tracks in one internship: UX/UI, editorial, print, collaterals, photography",
  quickRead: {
    problem:
      "Child Help Foundation runs events, coordinates volunteers and reports on its work across several UN SDGs. It needed design on both sides: managing events day to day, and presenting the foundation to the world.",
    insight:
      "The same organisation speaks to very different audiences, from the people running events in an app to the readers of an annual report. The work had to adapt to each and stay clear.",
    solution:
      "A high-fidelity event tracker prototype for mobile and desktop, plus an annual report, editorial SDG pages, a desk calendar, a brochure, stationery and event photography.",
    result: needed(
      "Outcome of the internship: was the event tracker built or adopted, and were the annual report and print materials published or used?",
    ),
  },
  chapters: [
    /* 1 ─────────────────────────────────────────────── */
    {
      id: "context",
      stage: "overview",
      title: "One NGO, many kinds of design",
      intro:
        "An NGO internship with Child Help Foundation, with work ranging from a product prototype to the foundation's printed materials and event photography.",
      blocks: [
        {
          type: "text",
          body: [
            "I worked across five tracks: UX/UI for an event tracker, editorial design, printables, business collaterals and photography.",
            "The foundation's report pages list the UN Sustainable Development Goals it works on, including Zero Hunger, Good Health and Well-being, Quality Education, Decent Work and Reduced Inequalities.",
          ],
        },
        {
          type: "needed",
          items: [
            "How the internship came about, who Asmi reported to, and how the work was briefed",
          ],
        },
      ],
    },

    /* 2 ─────────────────────────────────────────────── */
    {
      id: "event-tracker",
      stage: "solution",
      title: "An event tracker for the people running events",
      intro:
        "A high-fidelity prototype to streamline event management, volunteer coordination and engagement, designed for mobile and desktop.",
      blocks: [
        {
          type: "image",
          image: {
            src: `${IMG}/01.webp`,
            alt: "Five labelled phone screens: Sign In page, User Landing page, Admin Landing page, Event and Dashboard.",
            caption: "The five core screens of the prototype.",
          },
          size: "full",
        },
        {
          type: "features",
          heading: "What each screen does",
          items: [
            {
              title: "Sign in",
              body: "A photo of the children the foundation works with, a welcome line and a simple username and password login.",
              image: {
                src: `${IMG}/02.webp`,
                alt: "Phone sign-in screen with a photo of smiling children above 'Welcome to Child Help Foundation', username and password fields and a navy Login button.",
              },
            },
            {
              title: "Log an event",
              body: "One form captures an event: project name, files, description, date, organiser, special guest, number of beneficiaries, total time, location and remarks.",
              image: {
                src: `${IMG}/03.webp`,
                alt: "Phone screen headed 'Welcome, Jay' with a long form: project name, file uploads, description, date, event name, organiser, special guest, number of beneficiaries, total time, location, additional remarks and a Submit button.",
              },
            },
            {
              title: "Find events",
              body: "Recommended events with filters for For you, This week, Upcoming and SDGs, each card leading to View Event.",
              image: {
                src: `${IMG}/04.webp`,
                alt: "Phone screen titled Events with a search bar, filter tabs (For you, This week, Up coming, SDGs) and a 'Recommended for you' card showing a child eating, with a mustard View Event button.",
              },
            },
            {
              title: "Event list",
              body: "A searchable, sortable, paginated table of events by name, date and organiser.",
              image: {
                src: `${IMG}/05.webp`,
                alt: "Phone screen listing events in a table: International Parent Day, Beach Cleaning Day, Children's Day, Food Distribution Day, Educational Day, Charity Day and Equality Day, each with a date and organiser.",
              },
            },
            {
              title: "Dashboard",
              body: "Number of beneficiaries, total volunteers, an events trend line and the list of organisers at a glance.",
              image: {
                src: `${IMG}/06.webp`,
                alt: "Phone dashboard for Child Help Foundation with cards for Number of Beneficiary and Total Volunteers, a rising Events line chart and an Organizers list.",
              },
            },
          ],
        },
        {
          type: "text",
          body: [
            "The interface keeps to the foundation's navy, with mustard reserved for the main call to action on event cards.",
          ],
        },
        {
          type: "needed",
          items: [
            "Desktop screens of the event tracker (the PDF says mobile and desktop but shows mobile only)",
            "How Asmi understood the foundation's event and volunteer workflow (conversations, observation, existing tools)",
            "The difference between the user and admin roles in the app",
            "Whether the prototype was tested with staff or volunteers, and what changed",
            "Tools used for the prototype",
          ],
        },
      ],
    },

    /* 3 ─────────────────────────────────────────────── */
    {
      id: "print",
      stage: "solution",
      title: "One voice from report to letterhead",
      intro:
        "I collaborated with Child Help Foundation to design an annual report and other visual materials, strengthening their branding and communication while reflecting their mission and values.",
      blocks: [
        {
          type: "gallery",
          heading: "Editorial design: the SDGs, one colour each",
          layout: "strip",
          images: [
            {
              src: `${IMG}/08.webp`,
              alt: "Report page titled 'SDGs we work on': a grid of UN SDG icons mixed with photos of children and communities, above a navy footer.",
            },
            {
              src: `${IMG}/09.webp`,
              alt: "Report page with a black-and-white photo of two children eating inside a mustard frame: SDG 02 Zero Hunger, 20,01457 beneficiaries.",
            },
            {
              src: `${IMG}/10.webp`,
              alt: "Report page with a black-and-white photo of a mother holding a sleeping baby inside a green frame: SDG 03 Good Health & Well Being, 49,779 beneficiaries, Emergency Medical Support 521.",
            },
            {
              src: `${IMG}/11.webp`,
              alt: "Report page with a black-and-white photo of a smiling woman at a sewing machine inside a magenta frame: SDG 08 and SDG 10, 1,334 beneficiaries.",
            },
          ],
        },
        {
          type: "text",
          body: [
            "Each goal gets its official SDG colour as a frame around a black-and-white photograph, with the beneficiary count set large beside it. The foundation's numbers carry the page.",
          ],
        },
        {
          type: "image",
          image: {
            src: `${IMG}/12.webp`,
            alt: "Annual report mockup: the cover reads 'Enriching Minds, Providing Care.' over a collage of child photos; the open spread shows Objectives & Activities with SDG 3 and SDG 4 statistics and before-and-after portraits.",
            caption: "Annual report: \"Enriching Minds, Providing Care.\"",
          },
          size: "full",
        },
        {
          type: "gallery",
          heading: "Printables",
          layout: "grid",
          columns: 2,
          images: [
            {
              src: `${IMG}/13.webp`,
              alt: "Two tent-style desk calendars for January 2025 with the Child Help Foundation logo, one with a photo of a child eating and a quote.",
              caption: "Desk calendar.",
            },
            {
              src: `${IMG}/16.webp`,
              alt: "Tri-fold brochure mockup on pale blue: an Awards panel with trophies on shelves, a Today timeline of SDG commitments, a By 2030 goals list and a Child Help Foundation cover.",
              caption: "Tri-fold brochure.",
            },
          ],
        },
        {
          type: "beforeAfter",
          heading: "From file to print",
          before: {
            src: `${IMG}/14.webp`,
            alt: "Roll-up banner design for Skypath Solutions India Pvt. Ltd. in blue, with a cloud illustration and icons for its digital services.",
            caption: "Design",
          },
          after: {
            src: `${IMG}/15.webp`,
            alt: "Photo of the printed Skypath Solutions India Pvt. Ltd. roll-up banner standing indoors.",
            caption: "Execution",
          },
          caption: "A roll-up banner, designed during the internship and then printed.",
        },
        {
          type: "image",
          image: {
            src: `${IMG}/17.webp`,
            alt: "Stationery mockup in navy and white: letterheads, business cards, a folder, a notebook reading 'Changing Lives of Children in Need', an envelope, a badge and a coffee cup, all carrying the Child Help Foundation logo.",
            caption: "Business collaterals.",
          },
          size: "full",
        },
        {
          type: "needed",
          items: [
            "Whether the annual report, calendar and brochure were printed and distributed",
            "The posters, website improvements and brand manual mentioned in the takeaways (not shown in the PDF)",
            "Tools used for the print work",
          ],
        },
      ],
    },

    /* 4 ─────────────────────────────────────────────── */
    {
      id: "reflection",
      stage: "takeaways",
      title: "Design as a tool for social impact",
      intro:
        "I also documented the foundation's International Parent's Day celebration, capturing joy, unity and the essence of family bonds.",
      blocks: [
        {
          type: "gallery",
          heading: "International Parent's Day",
          layout: "grid",
          columns: 3,
          images: [
            {
              src: `${IMG}/18.webp`,
              alt: "A young woman hands something to a boy in a yellow jersey in front of a Child Help Foundation banner celebrating International Day of Family, 15th May 2024, Palghar, Maharashtra.",
            },
            {
              src: `${IMG}/19.webp`,
              alt: "Young children sitting close together on a patterned mat.",
            },
            {
              src: `${IMG}/20.webp`,
              alt: "A large group of children and adults gathered in a hall with green walls.",
            },
            {
              src: `${IMG}/21.webp`,
              alt: "Volunteers in yellow T-shirts around an event table while a photographer takes pictures.",
            },
            {
              src: `${IMG}/22.webp`,
              alt: "A group of people smiling around a table full of food.",
            },
            {
              src: `${IMG}/23.webp`,
              alt: "Two people standing in front of a Child Help Foundation wall covered in photos of children.",
            },
          ],
        },
        {
          type: "text",
          heading: "What I took away",
          body: [
            "Hands-on work on an event management app and website improvements strengthened my UX/UI skills. Posters, brochures and a brand manual gave me practical experience in visual communication.",
            "Covering International Parent's Day sharpened my photography and storytelling. I learned to adapt designs for diverse audiences, keeping them both creative and clear.",
            "I came away with a deeper understanding of NGO operations, project workflows and cross-functional collaboration, and better at managing time across several design projects at once.",
          ],
        },
        {
          type: "pullQuote",
          quote:
            "Experienced the value of design as a tool for social impact, aligning creative work with meaningful causes.",
          attribution: "Asmi, on her takeaways",
        },
        {
          type: "needed",
          items: [
            "What Asmi would do differently or next on the event tracker",
            "Any feedback from the foundation on the work",
          ],
        },
      ],
    },
  ],
  contribution: {
    mine: [
      "Designed a high-fidelity event tracker prototype: sign-in, event logging, event discovery, event list and dashboard",
      "Designed editorial SDG pages and an annual report for Child Help Foundation",
      "Designed printables including a desk calendar and a tri-fold brochure, and business collaterals",
      "Photographed the foundation's International Parent's Day celebration",
      "Created banners, standees and merchandise for NGO initiatives",
    ],
  },
  seo: {
    title: "Child Help Foundation — NGO design internship · Asmi Shaikh",
    description:
      "An NGO internship: a high-fidelity event tracker prototype, an annual report, SDG editorial pages, print collaterals and event photography.",
  },
};

export default project;
