import type { Project } from "@/lib/types";

const IMG = "/images/projects/netflix-mobile";
const PDF = `${IMG}/pdf`;

const project: Project = {
  slug: "netflix-mobile",
  title: "Netflix Mobile Web Redesign",
  subtitle: "See what's next",
  oneLiner:
    "A redesign of Netflix's mobile web experience (netflix.com in a phone browser) to make finding something to watch quicker and less confusing.",
  tier: "focused",
  order: 1,
  kind: "Redesign · Mobile web · Usability testing",
  year: "2024",
  duration: "8 weeks",
  role: "User research, UX design, prototyping, user testing",
  team: { solo: false, collaborators: ["Deep U.", "Palak J."] },
  disciplines: ["ux-ui", "research"],
  thinking: ["people", "research", "visuals"],
  tags: ["Interface design", "Prototyping", "Re-branding", "UX/UI", "Team project"],
  tools: ["Photoshop", "Illustrator", "Figma"],
  accent: "#8B0810",
  cover: {
    type: "motion",
    composition: "netflix-mobile",
    poster: {
      src: "/images/projects/netflix-mobile/cover/intro-poster.webp",
      alt: "The red NETFLIX wordmark on black",
    },
  },
  proofPoint: "50% → 80% task success",
  quickRead: {
    problem:
      "On a phone browser, Netflix has no navigation tabs, buries its categories in a cluttered burger menu, and keeps nudging you towards the app.",
    insight:
      "Choosing what to watch is the hard part. The goal was to make selecting content easier and cut the time spent searching.",
    solution:
      "Persistent TV shows / Movies / My List tabs, a search bar with a filter, poster grids with one-tap add to My List, and a floating Recommend me button.",
    result:
      "Against the existing site, success went from 50% to 80% and confusion fell from 70% to 40%. Average time went up from 34s to 40s.",
  },
  chapters: [
    {
      id: "overview",
      stage: "overview",
      title: "Who watches, and who's involved",
      blocks: [
        {
          type: "text",
          body: [
            "Netflix on a phone browser is a different product from the app: no navigation tabs, a cluttered burger menu, hidden filter options and category pages that don't say where you are. We set out to redesign the mobile website so choosing something to watch takes less searching.",
            "We analysed the existing interface, proposed cleaner navigation tabs, more visible buttons and clearer category labels, then tested the redesign against the original site.",
          ],
        },
        {
          type: "iconRow",
          heading: "Target audience",
          items: [
            { title: "Broad", body: "A broad range of target audience.", icon: "broad" },
            { title: "More women", body: "More female users than male.", icon: "women" },
            { title: "Younger adults", body: "Primarily targets younger adults.", icon: "young" },
          ],
        },
        {
          type: "stakeholderRings",
          heading: "Stakeholder mapping",
          centre: "Netflix",
          rings: [
            { name: "Production and distribution", members: ["Producers", "Licensors", "Studios", "Distributors"] },
            {
              name: "Filming, support and viewers",
              members: ["Directors", "Actors", "Music", "Advertising agencies", "Subscribers", "Subscribers' family and friends"],
            },
            {
              name: "Other industries",
              members: ["Theatres", "Drama and plays", "Cable operators", "Internet providers", "Competitors", "National regulatory bodies"],
            },
          ],
        },
      ],
    },
    {
      id: "analysis",
      stage: "research",
      title: "Lost in the burger menu",
      intro:
        "Interface analysis of netflix.com on a phone found cluttered navigation, hidden filter options and unclear category indicators. We proposed cleaner navigation tabs, more visible buttons and clearer category labels.",
      blocks: [
        {
          type: "problemFix",
          heading: "Interface analysis: four problems, four fixes",
          items: [
            { problem: "The navigation tab is not available", fix: "Add a panel of navigation buttons for the different categories just below the header." },
            { problem: "The burger menu is very cluttered", fix: "Shift some of the menu's categories into the suggested navigation tab." },
            { problem: "It keeps prompting you to join the app", fix: "Bring the app's features into the website. This can also cut down app-managing costs." },
            { problem: "The category name is not highlighted", fix: "Make the category name bold and big, so users know they've reached the category they wanted." },
          ],
        },
        {
          type: "image",
          size: "wide",
          image: {
            src: `${PDF}/interface-analysis-1.webp`,
            cutout: true,
            alt: "Two screenshots of the existing Netflix mobile site with annotations. Left: rows of titles, 'Navigation Tab is not available'. Right: the burger menu open over a long category list, 'The Burger Menu is very cluttered'. Green dashed boxes suggest what can be done.",
          },
        },
        {
          type: "image",
          size: "wide",
          image: {
            src: `${PDF}/interface-analysis-2.webp`,
            cutout: true,
            alt: "Two more screenshots of the existing site with annotations. Left: a Hindi-language Films & TV page with Join Now and Sign In buttons, 'Prompts to join the app version of the website'. Right: a Thrillers page with a small category name, 'Category name is not highlighted'. Green dashed boxes suggest what can be done.",
          },
        },
      ],
    },
    {
      id: "design",
      stage: "ideation",
      title: "From paper sketches to wireframes",
      intro: "We sketched every screen on paper before touching pixels, then moved to greyscale wireframes.",
      blocks: [
        {
          type: "image",
          size: "wide",
          heading: "Low-fidelity paper prototypes",
          image: {
            src: `${PDF}/paper-prototypes-v2.webp`,
            cutout: true,
            alt: "Photos of hand-drawn paper phone screens: a splash screen, a home page with Continue Watching, Trending Now, Top 10 and My List, poster grids, a title page with cast and More like this, sign-up and payment steps, all laid out on a table",
          },
        },
        {
          type: "image",
          size: "wide",
          heading: "Mid-fidelity prototypes",
          image: {
            src: `${PDF}/mid-fidelity.webp`,
            cutout: true,
            alt: "Six greyscale mid-fidelity phone wireframes: a long home page, Movies and TV shows poster grids, a filter dropdown with Categories, Language, Genre, Region, Rating and Year Release, the Category option expanded to Documentary, Cartoon and Anime, and a title page with a cast row",
          },
        },
      ],
    },
    {
      id: "solution",
      stage: "solution",
      title: "Tabs, filters and a nudge",
      blocks: [
        {
          type: "figmaEmbed",
          heading: "Final high-fidelity prototype",
          title: "Netflix mobile web redesign, interactive Figma prototype",
          url: "https://www.figma.com/proto/Y25pJJG6UmgagzRpbdOtpK/NETFLIX-ICA-3--wireframing---prototyping-?page-id=1%3A2&type=design&node-id=946-7319&viewport=-6005%2C-2232%2C0.88&t=iaqAAgSKEN76cfZX-1&scaling=scale-down&starting-point-node-id=946%3A7319",
          poster: `${PDF}/high-fidelity.webp`,
        },
        {
          type: "uiFeatures",
          heading: "What changed",
          items: [
            {
              title: "Tabs that stay put",
              body: "TV shows, Movies and My List sit as tabs under the header, and the active one is highlighted.",
              image: { src: `${PDF}/ui-tabs.webp`, alt: "TV shows, Movies and My List tabs, with TV shows highlighted in white" },
            },
            {
              title: "Search, plus a filter",
              body: "Search by movies, TV shows or people, and filter by category, language, genre, region, rating and year.",
              image: { src: `${PDF}/ui-search.webp`, alt: "Search bar reading 'Search by Movies, TV shows or people' with a filter icon beside it" },
            },
            {
              title: "Poster grids with one-tap add",
              body: "Each tab is a three-column grid of posters, each with a + to add it to My List.",
              image: { src: `${PDF}/ui-grid.webp`, alt: "Three-column grid of TV show posters, each with a + in the corner" },
              crop: "top",
            },
            {
              title: "Recommend me",
              body: "A fixed, floating button for when you just want to be told what to watch.",
              image: { src: `${PDF}/ui-recommend-v2.webp`, alt: "The white Recommend me button with a red outline" },
            },
          ],
        },
      ],
    },
    {
      id: "testing",
      stage: "testing",
      title: "Easier to find, slower to finish",
      blocks: [
        {
          type: "beforeAfter",
          before: {
            src: `${PDF}/old-phone.webp`,
            cutout: true,
            caption: "Old version",
            alt: "Old version: the existing Netflix mobile site at netflix.com/browse, with a burger menu, a small search box and rows for US TV Shows, Trending Now, US Movies and Documentaries",
          },
          after: {
            src: `${PDF}/new-phone.webp`,
            cutout: true,
            caption: "New version",
            alt: "New version: the redesigned TV shows tab, with a search bar and filter icon, TV shows, Movies and My List tabs, a three-column poster grid with a + on each poster, and a Recommend me button",
          },
          caption: "Drag to compare the old and new versions.",
        },
        {
          type: "testing",
          heading: "Old version vs new version",
          rating: { value: 4, max: 5, label: "User testing rating" },
          metrics: [
            {
              label: "Success rate",
              icon: "success",
              before: "50%",
              after: "80%",
              better: true,
              note: "On the old version, 2–3 users didn't find the filter button and used search instead.",
            },
            { label: "Confusion", icon: "confusion", before: "70%", after: "40%", better: true },
            {
              label: "Navigation",
              icon: "navigate",
              before: "4/5",
              after: "2.5/5",
              better: true,
              note: "On a scale from easy to difficult.",
            },
            {
              label: "Average time",
              icon: "time",
              before: "34s",
              after: "40s",
              better: false,
              note: "Users took more time because the filter had more specific options.",
            },
          ],
        },
        {
          type: "image",
          size: "wide",
          heading: "User emotions",
          image: {
            src: `${PDF}/emotions.webp`,
            cutout: true,
            alt: "User emotions across finding the button, using the feature and results. Old version: sad, sad, then neutral. New version: neutral, happy, then happy.",
          },
        },
        {
          type: "image",
          size: "wide",
          heading: "Task analysis",
          image: {
            src: `${PDF}/task-analysis-v2.webp`,
            cutout: true,
            alt: "Bar chart of how much time each user took to complete the task, old versus new, for users 1 to 8: 20s and 28s, 25s and 31s, 1:46m and 1:20m, 44s and 39s, 12s and 44s, 22s and 32s, 24s and 34s, 19s and 32s.",
          },
        },
        {
          type: "image",
          size: "wide",
          image: {
            src: `${PDF}/hierarchy-v2.webp`,
            cutout: true,
            alt: "Four interface elements in order: the featured title banner, the Continue Watching row, the header with tabs, and the Recommend me button",
            caption: "The hierarchy in which users recognised the elements.",
          },
        },
        {
          type: "insightThemes",
          heading: "User insights",
          themes: [
            {
              title: "The Recommend me button",
              pill: "Recommend me",
              stat: { value: "2", label: "users mentioned it among the things they remembered" },
              points: [
                "Most users noticed it as a white button at the bottom, but didn't mention it among the things they remembered.",
                "Most only noticed it once they started scrolling, because it's a fixed, floating button.",
                "One user thought it was a shuffle-play option that would play content at random.",
              ],
            },
            {
              title: "The filter",
              icon: "filter",
              stat: { value: "34s → 40s", label: "average time, because the filter had more specific options" },
              points: [
                "Users had trouble working out how to close the options in the filter.",
                "They took more time because the filter had more specific options.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "future",
      stage: "future",
      title: "What could come next",
      blocks: [
        {
          type: "list",
          items: [
            "Advanced personalisation with AI-driven recommendations.",
            "Better accessibility features for diverse user needs.",
            "More filter options, with multi-criteria selection and smart suggestions.",
            "Real-time collaborative watchlists for shared viewing.",
            "A mobile web experience that matches the app's functionality.",
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
            "Hands-on experience in user-centred design backed by usability testing.",
            "Turning user feedback into actionable design improvements.",
            "Stronger skills in interface analysis: spotting pain points and proposing solutions.",
            "Why clear navigation, visible UI elements and streamlined search matter.",
            "Stronger teamwork, project management and data-driven decision-making.",
          ],
        },
      ],
    },
  ],
  contribution: {
    mine: [
      "User research, interviews and synthesis",
      "UX design",
      "Material design",
      "Prototyping",
      "User testing",
    ],
    team: [
      "Interface analysis of the existing mobile web site",
      "Paper, mid-fidelity and high-fidelity prototypes",
      "User testing comparing the old and new versions",
    ],
  },
  links: { behance: "https://www.behance.net/gallery/233076709/Re-Designed-Netflix-Website" },
  seo: {
    title: "Netflix Mobile Web Redesign · Asmi Shaikh",
    description:
      "Redesigning Netflix in the phone browser with tabs, filters and a Recommend me button. In testing, task success rose from 50% to 80%.",
  },
};

export default project;
