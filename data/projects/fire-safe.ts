import { needed, type Project } from "@/lib/types";

const img = (n: string) => `/images/projects/fire-safe/${n}.webp`;

const project: Project = {
  slug: "fire-safe",
  title: "Fire Safe",
  subtitle: "Practise the emergency before it's real",
  oneLiner:
    "An immersive training supplement for firefighter trainees in Mumbai: a mobile app, an AR extinguisher game, hologram demonstrations and a VR rescue simulation, woven into their existing curriculum.",
  tier: "focused",
  order: 0,
  kind: "Immersive training · AR, hologram, VR",
  year: needed("Year the project was done (Behance publish date is not the project year)"),
  duration: needed("Project duration"),
  role: needed("Asmi's role on the Fire Safe team"),
  team: {
    solo: false,
    collaborators: ["Anwesha Patnaik", "Anushka K", "Lyric Gupta"],
  },
  disciplines: ["research", "ux-ui", "systems"],
  thinking: ["play", "technology", "research", "people", "business"],
  tags: ["AR/VR", "Hologram", "Gamification", "App design", "Training"],
  tools: ["Figma", "Unity 3D"],
  accent: "#FA341A",
  cover: {
    type: "motion",
    composition: "fire-safe",
    poster: {
      src: img("37"),
      alt: "FireSafe AR game on a phone: virtual flames and a red 3D extinguisher over a real room, with level, timer, score and lives, and buttons for Class A to E extinguishers",
    },
  },
  proofPoint: "35 interviews with trainees and station officers",
  quickRead: {
    problem:
      "Firefighter trainees wait months for situational training, rarely handle equipment, and live fire drills are rare because they're costly and risky.",
    insight:
      "Firefighting is as much about decisions under stress as physical skill, and the training gap sits between the classroom and the real emergency.",
    solution:
      "FireSafe adds three immersive modes to the existing curriculum: an AR extinguisher game early on, hologram demonstrations mid-way, and a VR rescue simulation in the final-assessment stage, tracked in a mobile app.",
    result: needed("A stated result or outcome for Fire Safe beyond the qualitative usability feedback"),
  },
  chapters: [
    {
      id: "context",
      label: "Context",
      title: "Why trainees",
      intro:
        "We chose firefighter training for three reasons: critical safety needs, real technological advances, and a lot of impact potential.",
      blocks: [
        {
          type: "text",
          body: [
            "We focused on trainees. They need advanced, hands-on training, situational awareness, decision-making, and the ability to adapt under extreme conditions.",
            "Those are hard things to learn from a lecture.",
          ],
        },
        {
          type: "stats",
          heading: "The current flow of training",
          items: [
            { value: "600 h", label: "Total training" },
            { value: "420 h", label: "Professional skills (practical)" },
            { value: "120 h", label: "Professional knowledge (theory)" },
            { value: "60 h", label: "Employability skills" },
          ],
        },
        {
          type: "text",
          body: [
            "The curriculum runs 24 weeks in six four-week blocks: basic firefighting techniques; fire science and chemistry; industrial and high-risk firefighting; medical first response and rescues; specialised firefighting and hazardous environments; and final assessments and certification.",
          ],
        },
      ],
    },
    {
      id: "research",
      label: "Research",
      title: "39 papers, 35 people",
      intro:
        "We set out to find what stops experienced Indian firefighters from adopting VR and simulation-based training, and where current programmes fall short on physical endurance and psychological resilience.",
      blocks: [
        {
          type: "researchMethods",
          heading: "How we researched",
          groups: [
            { label: "Trainees", value: 25 },
            { label: "Station officers", value: 10 },
          ],
          methods: [
            { name: "Literature review", detail: "39 research papers, 21 articles" },
            { name: "Primary interviews", detail: "35 people: 25 trainees, 10 station officers" },
            { name: "Ecosystem mapping", detail: "Around the BMC fire brigade" },
          ],
          note: "Literature themes: emergency response simulation, cognitive load, decision-making and firefighter training.",
        },
        {
          type: "features",
          heading: "What the literature said",
          items: [
            {
              title: "Communication isn't simulated",
              body: "Immersive training rarely includes realistic communication challenges, leaving a gap between simulated and real emergencies.",
            },
            {
              title: "Live fire is rare",
              body: "Cost and safety concerns keep live fire training infrequent, so theory and practice drift apart.",
            },
            {
              title: "Pressure is missing",
              body: "Current immersive systems don't adequately simulate the physical demands and psychological pressure of firefighting.",
            },
            {
              title: "Unequal access",
              body: "Limited budgets, support and infrastructure keep smaller departments from immersive training, unlike larger urban units.",
            },
          ],
        },
        {
          type: "stats",
          heading: "The BMC fire brigade, by the numbers",
          items: [
            { value: "35", label: "Fire stations under the BMC" },
            {
              value: "₹200–300 crore",
              label: "Allotted by the government to the BMC fire brigade department each year",
            },
            {
              value: "6 months",
              label: "Training after an aptitude test and a physical test",
              note: "With a ₹3k per month stipend until positioned",
            },
          ],
        },
        {
          type: "image",
          size: "wide",
          image: {
            src: img("11"),
            alt: "Hand-drawn ecosystem map centred on the BMC and its 35 fire stations, linking recruitment and the rank hierarchy from chief fire officer to trainee, vendors, government funding, residential colonies, private firefighting teams and private industries",
            caption:
              "Ecosystem map: recruitment, ranks, funding, vendors, and the colonies and industries the brigade serves.",
          },
        },
        {
          type: "features",
          heading: "What we heard",
          items: [
            {
              title: "No picture to train against",
              body: "Trainees struggle to connect physical training with real scenarios because their drills lack visual representation.",
            },
            {
              title: "Individual skills lag",
              body: "Team coordination and command get attention. Commanders still struggle to visualise, communicate and coordinate resources in complex operations.",
            },
            {
              title: "Knowledge fades",
              body: "There's a long gap between training and deployment, and theory is lost without regular revision.",
            },
            {
              title: "Seniors fill the gap",
              body: "After training, senior firefighters walk new recruits back through equipment use and procedures.",
            },
            {
              title: "Assist first, act later",
              body: "Early on, trainees mostly assist. Hands-on training starts only after probation.",
            },
          ],
        },
      ],
    },
    {
      id: "insights",
      label: "Insights",
      title: "Watch and learn isn't enough",
      intro:
        "Trainees wait 6 months to a year for situational training at big urban stations. Until then, the policy is watch and learn.",
      blocks: [
        {
          type: "insightChain",
          heading: "From findings to opportunities",
          items: [
            {
              observation:
                "Situational training happens late, at big urban stations, after a wait of 6 months to a year.",
              insight:
                "Live fire training is rare because of high costs and safety risks, and current simulations don't recreate real communication challenges.",
              opportunity: "Safe, repeatable practice trainees can get long before their turn at a live drill.",
            },
            {
              observation:
                "Trainees rarely get to use equipment, and even officers don't use it regularly, relying on theory.",
              insight:
                "Immersive tech helps visualisation, but senior officers stay hesitant, clinging to how they trained. Trainees carry knowledge gaps into real emergencies.",
              opportunity: "Hands-on equipment practice built into the curriculum trainees already follow.",
            },
            {
              observation:
                "Commanders struggle to visualise and coordinate during complex operations, and trainees find it hard to track equipment and its functions day to day.",
              insight:
                "Firefighting goes beyond physical training: it needs decision-making under stress, cognitive-load management and emotional regulation.",
              opportunity: "Train decisions under time pressure, not just drills.",
            },
            {
              observation:
                "Knowledge fades in the gap between training and deployment.",
              insight:
                "There needs to be a pathway from training-only systems to operational tools. Today's tech struggles with the jump from controlled settings to unpredictable fields.",
              opportunity: "Scenarios that grow in complexity, staged across the whole training period.",
            },
          ],
        },
        {
          type: "personas",
          heading: "Two people, one station",
          items: [
            {
              name: "Arjun Kumar, the trainee",
              age: "22",
              descriptor: "Firefighter trainee from Mumbai, in his 4th month of training",
              needs: [
                "Hands-on experience to feel confident in real emergencies",
                "Mentorship from senior firefighters",
                "Eager to learn modern firefighting tech, though it feels intimidating",
              ],
              frustrations: [
                "Constant physical exhaustion from the training routine",
                "Balancing heavy theory with practical field experience",
                "Anxiety about the job's life-threatening hazards",
              ],
            },
            {
              name: "Arjun Kumar, the station officer",
              age: "35",
              descriptor:
                "Station officer in Mumbai's fire service with an engineering background in hazardous materials and high-rise firefighting; leads a team of 6–8",
              needs: [
                "Mentor younger recruits and pass on hard-earned lessons",
                "Continuous professional growth, especially in modern tech",
                "A healthier work-life balance",
              ],
              frustrations: [
                "The physical toll of the job",
                "Mental stress from repeated exposure to trauma",
                "Slow adoption of new technology in firefighting",
              ],
            },
          ],
        },
        {
          type: "needed",
          items: [
            "Confirm persona names: both personas are named 'Arjun Kumar' on the slides",
            "Confirm the station officer's years of service (slides say both '8 years' and 'two decades')",
          ],
        },
        {
          type: "hmw",
          label: "Problem statement",
          statement:
            "How might we create a supplement for firefighter trainees that enhances their situational awareness and decision making skills in controlled environments before they enter real-world scenarios?",
        },
      ],
    },
    {
      id: "exploration",
      label: "Exploration",
      title: "Three ways to fight a fire you can't light",
      intro: "We explored three immersive concepts. Two didn't make the cut, for different reasons.",
      blocks: [
        {
          type: "conceptFunnel",
          stages: [
            { count: "3", label: "immersive concepts" },
            { count: "1", label: "carried forward" },
          ],
          concepts: [
            {
              name: "Hologram building model",
              verdict: "dropped",
              reason:
                "A live 3D model of the affected building showing fire spread, structural integrity and hazards. Strong for situational awareness and command, but dropped for high implementation costs, resource allocation, no real-world trials, complex data integration and hardware constraints.",
            },
            {
              name: "Head-tilt AR quiz",
              verdict: "dropped",
              reason:
                "Rapid-fire training where you tilt your head left or right to pick the right response. It aimed to improve decision-making speed, but was judged too gamified for firefighters and better suited to a general audience.",
            },
            {
              name: "Progressive VR training",
              verdict: "kept",
              reason:
                "Fully immersive fire scenarios that grow in complexity. It bridges the classroom-to-emergency gap, builds decision skills and resilience, and stays safe while still challenging.",
            },
          ],
        },
        {
          type: "text",
          body: [
            "AR and holograms didn't disappear, though. They came back in different roles: an extinguisher game on a phone, and hologram demonstrations you can watch without a headset.",
          ],
        },
      ],
    },
    {
      id: "solution",
      label: "Solution",
      title: "FireSafe, in three stages",
      intro:
        "FireSafe enhances traditional field training by embedding it with immersive technology. Trainees experience complex emergencies, tactics and high-risk environments without the real-world danger.",
      blocks: [
        {
          type: "image",
          size: "wide",
          image: {
            src: img("30"),
            alt: "Staircase diagram of six training stages from Foundation and Basic Firefighting Techniques to Final Assessments, Real-World Scenarios and Certification, with red dots marking stages one, three and six",
            caption: "Where we come in: three of the six training stages.",
          },
        },
        {
          type: "process",
          heading: "Over the 6-month programme",
          steps: [
            {
              title: "Stage 1 · Foundation",
              body: "Weeks 1–4. Trainees onboard onto the mobile app in week 1, and use the AR module on extinguisher methods.",
            },
            {
              title: "Stage 3 · Industrial and high-risk",
              body: "Weeks 9–12. Holographic projections demonstrate hand signals, knots and the fire truck.",
            },
            {
              title: "Stage 6 · Final assessments",
              body: "The VR training module, alongside real-world scenarios and certification.",
            },
          ],
        },
        {
          type: "needed",
          items: [
            "Confirm the weeks for the VR stage (slides pair Final Assessments with weeks 13–16 in one place and weeks 21–24 in another)",
            "What 'Smart Watch Integration' does in the system (only named on the slides)",
          ],
        },
        {
          type: "features",
          heading: "The app ties it together",
          items: [
            {
              title: "Progress, readiness and next steps",
              body: "Each week's module and progress, health readiness, where you left off, and recommendations. A performance view shows strengths and areas to improve against the class average, with the AR, hologram or drill session that would help.",
              image: {
                src: img("28"),
                alt: "Four phone screens of the FireSafe app: a red logo splash, a Week 3 home with progress and health readiness, a recommended-for-you module list, and a performance tab with strengths and areas for improvement",
              },
            },
          ],
        },
        {
          type: "features",
          heading: "Hologram: no headset needed",
          items: [
            {
              title: "Firefighting signals",
              body: "Life-sized 3D demonstrations of the hand signals used in rescue operations, viewable from all sides by several trainees at once.",
              image: {
                src: img("35"),
                alt: "Black hologram interface with four red firefighter silhouettes arranged in a cross for a four-sided projection, a Firefighting Signals menu and 'Water Pressure Decrease' playing",
              },
            },
            {
              title: "Knot tying",
              body: "Step-by-step visual guides for knots and coils, from the bowline to the fireman chair coil, repeated as often as needed.",
              image: {
                src: img("36"),
                alt: "Hologram interface showing four views of a blue rope tied around a green pole, with a Knot Tying menu and 'Constrictor Knot' playing",
              },
            },
          ],
        },
        {
          type: "features",
          heading: "AR: pick the right extinguisher, fast",
          items: [
            {
              title: "Five fire classes",
              body: "Virtual fires appear in your real room, each class (A to E) with its own look. Choose water, foam, powder or CO2 before the fire grows.",
              image: {
                src: img("37"),
                alt: "Phone running the AR game in a browser: flames and a 3D extinguisher over a real room, with level, timer, high score and three hearts, and Class A to E extinguisher buttons",
              },
            },
            {
              title: "Feedback that sticks",
              body: "Three lives, a score and a high score to beat, safety tips, and instant feedback on wrong choices.",
              image: {
                src: img("38"),
                alt: "Four AR game states side by side: the default game, a safety tip reading 'Aim at the base of the fire, not the flames', an 'Incorrect choice!' message, and '+67 Perfect!'",
              },
            },
          ],
        },
        {
          type: "image",
          size: "wide",
          image: {
            src: img("39"),
            alt: "Pencil storyboard in four rows: a user puts on a VR headset and enters a hub of training areas, an instructor briefs them, they rescue a baby from a car fire, break into an apartment with an axe, free a man under a cabinet, put out an electrical fire and see 'Task completed'",
            caption: "VR storyboard: from the training hub to a completed rescue.",
          },
        },
        {
          type: "features",
          heading: "VR: the full emergency",
          items: [
            {
              title: "Levels with people in them",
              body: "Each level has a different environment and fire, with civilians trapped inside. Trainees break doors, grab what they need and get people to ambulances within a time limit.",
              image: {
                src: img("41"),
                alt: "Grid of six Unity VR screenshots: an animated NPC, a fiery portal to story mode, a Fire Level 3 objectives panel, grabbable CO2, gas and electric extinguishers by a fire truck, spraying a house fire and carrying a child to safety",
              },
            },
            {
              title: "Built in Unity",
              body: "Axes for doors, a cabinet to move off a trapped man, and the right extinguisher for each kind of fire.",
              image: {
                src: img("42"),
                alt: "Grid of six Unity VR screenshots: controller hands swinging an axe at a door, moving a cabinet to free a man, guiding him out, choosing an extinguisher near a gas cylinder, breaking a second door and saving a trapped boy",
              },
            },
            {
              title: "A report, not just a score",
              body: "After each task: time taken, task completion, lives used, rescue rate, a heatmap of fire left, time per level, and feedback, like why water was the wrong call on an electrical fire.",
              image: {
                src: img("43"),
                alt: "Dark post-task report card: task status completed, 12:08 minutes, 3/4 tasks, 3/6 lives, rescue rate with one rescue pending, 38% of fire left heatmap, time per level chart and feedback recommending a CO2 extinguisher",
              },
            },
          ],
        },
        {
          type: "image",
          size: "inset",
          image: {
            src: img("26"),
            alt: "Mock-up of an open printed FireSafe Trainee's Handbook in Hindi, with a vision and mission spread",
            caption: "A trainee's handbook in Hindi.",
          },
        },
      ],
    },
    {
      id: "validation",
      label: "Validation",
      title: "What trainees said",
      intro: "We tested FireSafe with trainees.",
      blocks: [
        {
          type: "testing",
          positives: [
            "The immersive experience would greatly improve their training, especially in the foundational and intermediate phases.",
            "VR would be highly effective at recreating high-pressure decision-making situations.",
          ],
          negatives: ["VR scenarios might need some initial adjustment."],
        },
        {
          type: "pullQuote",
          quote:
            "This would have undoubtedly been beneficial in certain segments of our training—we didn't have access to such visual clarity or decision-making exposure before.",
          attribution: "Firefighter trainee, usability testing",
        },
        {
          type: "callout",
          label: "Trainees suggested",
          body: "Showing existing public fire safety infrastructure inside the virtual settings, such as sprinklers, extinguishers and the firefighting systems in high-rise buildings.",
        },
        {
          type: "needed",
          items: [
            "What the unlabelled '8+' on the UT results slide counts",
            "How testing was run, and whether trainees tried the built VR prototype, the AR game and the hologram, or concepts",
          ],
        },
      ],
    },
    {
      id: "reflection",
      label: "Reflection",
      title: "Who pays for practice",
      intro: "We mapped how FireSafe could sustain itself.",
      blocks: [
        {
          type: "features",
          heading: "Business model",
          items: [
            {
              title: "Value",
              body: "Realistic scenarios for training, exposure to visual and psychological pressure, interactive execution and evaluation, and fewer on-ground training risks.",
            },
            {
              title: "Customers",
              body: "Trainees and training academies, government and municipal fire departments, private fire safety organisations, and oil and gas industries.",
            },
            {
              title: "Partners",
              body: "Fire departments and academies, AR, VR and hologram hardware providers, research bodies, government safety agencies, and simulation developers.",
            },
            {
              title: "Revenue",
              body: "Licensing fees for the training platform, and service packages.",
            },
          ],
        },
        {
          type: "needed",
          items: ["Asmi's reflection: what she learned on Fire Safe and what she'd do next"],
        },
      ],
    },
  ],
  contribution: {
    mine: needed("Asmi's personal contribution on this team project (3–5 bullets)"),
    team: needed("How the work was split across Anwesha Patnaik, Anushka K, Lyric Gupta and Asmi"),
  },
  links: {
    behance: "https://www.behance.net/gallery/233101337/Fire-Safe-Immersive-Experience-(ARHOLOGRAMVR)",
  },
  seo: {
    title: "Fire Safe: AR, hologram and VR firefighter training · Asmi Shaikh",
    description:
      "Immersive training for firefighter trainees in Mumbai: an AR extinguisher game, hologram demos and a VR rescue simulation, built on 35 interviews.",
  },
};

export default project;
