import { needed, type Project } from "@/lib/types";

const IMG = "/images/projects/netflix-mobile";

const project: Project = {
  slug: "netflix-mobile",
  title: "Netflix Mobile Web Redesign",
  subtitle: "Less menu digging, more watching",
  oneLiner:
    "A redesign of Netflix's mobile web experience (netflix.com in a phone browser) to make finding something to watch quicker and less confusing.",
  tier: "focused",
  order: 1,
  kind: "Redesign · Mobile web · Usability testing",
  year: needed("Year the project was done (Behance published Aug 2025; the screenshots show 2023 titles)"),
  duration: needed("Project duration"),
  role: needed("Asmi's role on the project"),
  team: { solo: false, collaborators: ["Deep Udeshi"] },
  disciplines: ["ux-ui", "research"],
  thinking: ["people", "research", "visuals"],
  tags: ["Redesign", "Mobile web", "Usability testing", "A/B comparison", "UI design", "Paper prototyping"],
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
  proofPoint: "50% → 80% task success (Task 2)",
  quickRead: {
    problem:
      "On a phone browser, Netflix has no navigation tabs, buries its categories in a cluttered burger menu, and keeps nudging you towards the app.",
    insight:
      "Choosing what to watch is the hard part. The goal was to make selecting content easier and cut the time spent searching.",
    solution:
      "Persistent TV shows / Movies / My List tabs, a search bar with a filter, poster grids with one-tap add to My List, and a floating Recommend me button.",
    result:
      "In a Task 2 comparison against the existing site, success went from 50% to 80% and confusion fell from 70% to 40%. Average time went up from 34s to 40s.",
  },
  chapters: [
    {
      id: "problem",
      label: "Problem",
      title: "Lost in the burger menu",
      intro:
        "We opened netflix.com/browse on a phone and went looking for problems. They weren't hard to find.",
      blocks: [
        {
          type: "features",
          heading: "Four problems, four fixes",
          items: [
            {
              title: "There's no navigation tab",
              body: "Fix: add a panel of category buttons just below the header.",
            },
            {
              title: "The burger menu is very cluttered",
              body: "Fix: move some of its categories into that new navigation tab.",
            },
            {
              title: "It keeps pushing you to the app",
              body: "Fix: bring the app's features into the website instead. That could also cut down app-maintenance costs.",
            },
            {
              title: "You can't tell which category you're in",
              body: "Fix: make the category name bold and big, so people know they've landed in the right place.",
            },
          ],
        },
        {
          type: "gallery",
          layout: "grid",
          columns: 2,
          images: [
            {
              src: `${IMG}/03.webp`,
              alt: "Two screenshots of the existing Netflix mobile site. Left: horizontal rows of titles, annotated 'Navigation Tab is not available'. Right: the burger menu open over a long category list, annotated 'The Burger Menu is very cluttered'. Green boxes suggest fixes.",
            },
            {
              src: `${IMG}/04.webp`,
              alt: "Two more screenshots of the existing site. Left: a logged-out Hindi-language Films & TV page with Join Now and Sign In buttons, annotated 'Prompts to join the app version'. Right: a Thrillers page where the category name is small, annotated 'Category name is not highlighted'.",
            },
          ],
        },
      ],
    },
    {
      id: "design",
      label: "Exploration",
      title: "Paper first",
      intro: "We set up a style guide, then sketched on paper before touching pixels.",
      blocks: [
        {
          type: "process",
          steps: [
            {
              title: "Style guide",
              body: "A palette of three reds, greys and blacks, a Netflix Sans type scale (headings at 36, 32 and 24px, body at 18px), background blocks, and an icon set in 14 categories.",
              image: {
                src: `${IMG}/06.webp`,
                alt: "Style guide sheet with a colour palette of reds, greys and blacks, a Netflix Sans type scale table, background blocks in white, transparent, grey and red, and an icon library grouped into categories.",
              },
            },
            {
              title: "Paper prototype",
              body: "A long home page scroll, a 'Sort by' sheet, and pop-ups to filter by category, language, genre, region, maturity and year released. The 'Recommend me' idea first appears here, as a sticky note.",
              image: {
                src: `${IMG}/08.webp`,
                alt: "Photos of hand-drawn paper phone screens: a splash screen, a long home page with labelled sections, a Sort By sheet, filter pop-ups for language, genre, region and year, a grid results screen and a title page.",
              },
            },
            {
              title: "Mid fidelity",
              body: "Greyscale screens for the home page, poster grids, the filter dropdown and its options, and a title page with a cast row.",
              image: {
                src: `${IMG}/10.webp`,
                alt: "Six greyscale mid-fidelity phone wireframes: a long home page, poster grid views, an open filter dropdown, a sub-option dropdown and a title-detail page with cast avatars.",
              },
            },
          ],
        },
      ],
    },
    {
      id: "solution",
      label: "Solution",
      title: "Tabs, filters and a nudge",
      blocks: [
        {
          type: "beforeAfter",
          heading: "Same task, two sites",
          before: {
            src: `${IMG}/compare/old.webp`,
            alt: "Existing Netflix mobile site at netflix.com/browse: a burger menu, a small search box and horizontal rows for US TV Shows, Trending Now, US Movies and Documentaries.",
          },
          after: {
            src: `${IMG}/compare/new.webp`,
            alt: "Redesigned TV shows tab: a search bar with a filter icon, pill tabs for TV shows, Movies and My List, and a three-column poster grid with a + on each poster.",
          },
          caption: "The phones used in the Task 2 old-versus-new comparison.",
        },
        {
          type: "features",
          heading: "What changed",
          items: [
            {
              title: "Tabs that stay put",
              body: "TV shows, Movies and My List sit as pill tabs under the header on every screen, and the active one is highlighted.",
            },
            {
              title: "Search, plus a filter",
              body: "The search bar covers movies, TV shows or people. A filter icon beside it narrows things down by category, language, genre, region, rating and year.",
            },
            {
              title: "Poster grids with one-tap add",
              body: "Each tab is a three-column grid of posters, each with a + to add it to My List.",
            },
            {
              title: "Recommend me",
              body: "A floating button for when you just want to be told what to watch.",
            },
            {
              title: "A fuller home and title page",
              body: "The home page has Continue Watching with progress bars, Top 10, New Releases and more. Title pages show the cast, episodes by season and 'More like this'.",
            },
          ],
        },
        {
          type: "image",
          size: "wide",
          image: {
            src: `${IMG}/12.webp`,
            alt: "Five full-length dark screens of the redesign: the home page scrolled top to bottom, TV shows, Movies and My List grids, and a title page for The Witcher with cast, Season 2 episodes and 'More like this'.",
            caption: "The full scroll of each screen.",
          },
        },
      ],
    },
    {
      id: "testing",
      label: "Validation",
      title: "Easier to find, slower to finish",
      intro:
        "Our test goal: to make selecting content easier and cut the time people spend searching for it.",
      blocks: [
        {
          type: "researchMethods",
          heading: "How we tested",
          methods: [
            { name: "Metrics evaluation", detail: "Task completion time, error rate and assistance needed" },
            { name: "Think-aloud protocol", detail: "Participants talked through their thinking as they went" },
            { name: "Observational analysis", detail: "Moderators noted interactions, behaviour and hesitations" },
            { name: "Usability lab", detail: "A user and moderator room, with an observer in a separate room" },
          ],
          note: "Two tasks: (1) use the Recommend me button; (2) use the filter and the Add to My List button. The Task 2 per-user chart shows 8 participants.",
        },
        {
          type: "image",
          size: "inset",
          image: {
            src: `${IMG}/24.webp`,
            alt: "Two greyscale photos of a usability lab: a user and moderator at an iMac in one room, and an observer watching on a screen in a separate room.",
            caption: "The usability lab, with the user and moderator in one room and the observer next door.",
          },
        },
        {
          type: "personas",
          heading: "Who we tested for",
          items: [
            {
              name: "Ritika Sharma",
              age: "18",
              descriptor: "Student · Binge watcher, decisive · Mumbai",
              needs: [
                "Clear categories, search and recommendations to navigate a huge library",
                "Smooth streaming without buffering",
              ],
              frustrations: [
                "Too many choices make it hard to decide what to watch",
                "Not knowing the platform well at first makes it harder to find good content",
              ],
            },
            {
              name: "Mansoor Shaikh",
              age: "28",
              descriptor: "Lawyer · Casual viewer with limited time · Mumbai",
              quote: "Less screen time, more real-life moments.",
              needs: [
                "Access whenever his schedule allows",
                "Efficient use of the little viewing time he has",
                "Help discovering content that matches his preferences",
              ],
              frustrations: [
                "Finding time to watch at all",
                "Missing recommendations and trending shows released between sessions",
                "A subscription fee that doesn't match his occasional use",
              ],
            },
            {
              name: "Anushree Mehra",
              age: "50",
              descriptor: "Homemaker · Casual watcher, indecisive · Mumbai",
              quote: "Find what you'd die for and live for it",
            },
          ],
        },
        {
          type: "needed",
          items: [
            "Anushree Mehra's needs and pain points (the slide repeats Ritika's word for word)",
            "Whether the personas came from research or were proto-personas (on the slides they appear after the final design, inside the testing section)",
          ],
        },
        {
          type: "text",
          heading: "Task 1: the Recommend me button",
          body: [
            "Most users noticed the white button at the bottom, but only 2 mentioned it when asked what they remembered. Most only spotted it once they started scrolling, because it floats over the page. One user thought it was a shuffle-play button.",
            "Users suggested making it more prominent (bigger, a different colour or a different position), and offering a set of recommendations to swipe through.",
          ],
        },
        {
          type: "testing",
          heading: "Task 2: filter and Add to My List, old vs new",
          summary: "We compared the existing site with the redesign on the same task.",
          metrics: [
            {
              label: "Success rate",
              before: "50%",
              after: "80%",
              better: true,
              note: "On the old site, 2–3 users didn't find the filter button and used search instead.",
            },
            { label: "Confusion", before: "70%", after: "40%", better: true },
            {
              label: "Star rating, existing vs new",
              before: "2/5",
              after: "4/5",
              better: true,
              note: "From a separate ratings slide; not tied to Task 2, and who rated is not stated.",
            },
            {
              label: "Average time",
              before: "34s",
              after: "40s",
              better: false,
              note: "The filter offers more specific options. Users were comfortable taking time to pick a specific category instead of searching.",
            },
          ],
          negatives: [
            "Users had trouble working out how to close the filter options.",
            "The filter icon was too small and dark to spot easily.",
            "The + button sometimes blended into the poster behind it.",
          ],
        },
        {
          type: "gallery",
          layout: "grid",
          columns: 2,
          images: [
            {
              src: `${IMG}/38.webp`,
              alt: "Grouped bar chart of Task 2 completion time for users 1 to 8, old versus new. Most users took a little longer on the new design. User 3 took 1:46 on the old site and 1:20 on the new one; user 5 took 12s on the old site and 44s on the new one.",
              caption: "Time per user. Slower for most, but not for everyone.",
            },
            {
              src: `${IMG}/37.webp`,
              alt: "User emotions across finding the button, using the feature and results. Old: sad, sad, then neutral. New: neutral, happy, then happy.",
              caption: "How users felt at each step, old vs new.",
            },
          ],
        },
        {
          type: "text",
          heading: "What users asked for",
          body: [
            "Fix how the filter closes and make it a little easier. Make the filter and Add to My List buttons more noticeable, with better colours.",
          ],
        },
        {
          type: "needed",
          items: [
            "How success rate, confusion and the star ratings were measured, and who gave the ratings",
            "Total number of participants and Task 1 results",
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
            "What changed after testing (no post-test screens are shown)",
            "Asmi's learnings and reflection",
          ],
        },
      ],
    },
  ],
  contribution: {
    mine: needed("What Asmi did personally versus Deep Udeshi"),
    team: [
      "Interface analysis of the existing mobile web site",
      "Style guide",
      "Paper, mid-fidelity and high-fidelity prototypes",
      "Moderated usability testing in a lab, with an old-vs-new comparison",
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
