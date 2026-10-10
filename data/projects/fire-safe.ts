import { needed, type Project } from "@/lib/types";

const img = (n: string) => `/images/projects/fire-safe/${n}.webp`;
const PAGE = "/images/projects/fire-safe/page";

const project: Project = {
  slug: "fire-safe",
  title: "Fire Safe",
  subtitle: "Practise the emergency before it's real",
  oneLiner:
    "An immersive training supplement for firefighter trainees in Mumbai: a mobile app, an AR extinguisher game, hologram demonstrations and a VR rescue simulation, woven into their existing curriculum.",
  tier: "focused",
  order: 0,
  kind: "Immersive training · AR, hologram, VR",
  year: "2025",
  duration: "120 hours",
  role: "Research, UX/UI design, ideation, storyboarding, AR/VR experience design, 3D modelling, prototyping, presentation design",
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
      stage: "overview",
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
          type: "breakdown",
          heading: "The current flow of training",
          unit: "h",
          total: { value: 600, label: "Total training" },
          parts: [
            { value: 420, label: "Professional skills (practical)", icon: "fire" },
            { value: 120, label: "Professional knowledge (theory)", icon: "students" },
            { value: 60, label: "Employability skills", icon: "work" },
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
      stage: "research",
      title: "39 papers, 35 people",
      intro:
        "We set out to find what stops experienced Indian firefighters from adopting VR and simulation-based training, and where current programmes fall short on physical endurance and psychological resilience.",
      blocks: [
        {
          type: "researchExplorer",
          heading: "How we researched",
          methods: [
            {
              name: "Literature review",
              value: 60,
              unit: "sources",
              icon: "students",
              viz: "docs",
              detail: "39 research papers and 21 articles.",
              parts: [
                { label: "research papers", value: 39 },
                { label: "articles", value: 21 },
              ],
              chips: ["Emergency response simulation", "Cognitive load", "Decision-making", "Firefighter training"],
            },
            {
              name: "Primary interviews",
              value: 35,
              unit: "people",
              icon: "people",
              viz: "people",
              detail: "35 people: trainees and the station officers who train them.",
              parts: [
                { label: "trainees", value: 25 },
                { label: "station officers", value: 10 },
              ],
            },
            {
              name: "Ecosystem mapping",
              value: 1,
              unit: "map",
              icon: "broad",
              viz: "map",
              detail: "Around the BMC fire brigade: recruitment, funding, vendors, and the colonies and industries it serves.",
              link: { label: "Explore the map", href: "#ecosystem-map" },
            },
          ],
        },
        {
          type: "iconCards",
          heading: "What the literature said",
          items: [
            {
              title: "Communication isn't simulated",
              icon: "trust",
              body: "Immersive training rarely includes realistic communication challenges, leaving a gap between simulated and real emergencies.",
            },
            {
              title: "Live fire is rare",
              icon: "fire",
              body: "Cost and safety concerns keep live fire training infrequent, so theory and practice drift apart.",
            },
            {
              title: "Pressure is missing",
              icon: "pressure",
              body: "Current immersive systems don't adequately simulate the physical demands and psychological pressure of firefighting.",
            },
            {
              title: "Unequal access",
              icon: "scales",
              body: "Limited budgets, support and infrastructure keep smaller departments from immersive training, unlike larger urban units.",
            },
          ],
        },
        {
          type: "stats",
          heading: "The BMC fire brigade, by the numbers",
          items: [
            { value: "35", label: "Fire stations under the BMC", icon: "fire" },
            {
              icon: "price",
              value: "₹200–300 crore",
              label: "Allotted by the government to the BMC fire brigade department each year",
            },
            {
              icon: "students",
              value: "6 months",
              label: "Training after an aptitude test and a physical test",
              note: "With a ₹3k per month stipend until positioned",
            },
          ],
        },
        {
          type: "ecosystem",
          heading: "Ecosystem map",
          centre: "BMC",
          centreNote: "35 fire stations",
          caption: "The BMC fire brigade and the people, money and places it connects to.",
          nodes: [
            {
              title: "Recruitment",
              icon: "person",
              notes: ["Aptitude test, physical test, then 6 months of training, with a ₹3k monthly stipend until positioned."],
              list: {
                label: "Ranks",
                items: ["Chief fire officer", "Deputy chief fire officer", "Divisional officer", "Additional divisional officer", "Senior station officer", "Station officer", "Assistant station officer", "Sub officer", "Trainee"],
              },
            },
            {
              title: "Residential colonies",
              icon: "building",
              notes: [
                "Firefighters go to teach mock drills in the societies when scheduled.",
                "Checks are done once a year by the brigade to make sure all protocols are followed.",
                "All management of fire extinguishers, exchange and return, is supposed to be done by the building owner.",
              ],
            },
            { title: "Supplies", icon: "extinguisher", notes: ["The BMC places an order for the supplies required by the fire stations."] },
            { title: "Private firefighting teams", icon: "helmet", notes: ["Either they come to the government training or train within the company."] },
            { title: "Private industries", icon: "factory", notes: ["Certain industries are marked as high importance and have a separate hotline to reach the department."] },
            { title: "Funding", icon: "bank", notes: ["The government allots ₹200–300 crores each year to the BMC fire brigade department."] },
            { title: "Vendors", icon: "store", notes: ["The BMC has a vendor list that provides the required equipment."] },
            {
              title: "Call records",
              icon: "phone",
              notes: ["Records are sought out by calls: how many trucks went to the site, what was rescued, and what material was used to extinguish.", "There are 4 levels."],
            },
            {
              title: "Building records",
              icon: "info",
              notes: ["The number of high- and low-rise buildings, floor plans, NOCs and maintenance certificates."],
            },
          ],
        },
        {
          type: "heard",
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
      stage: "research",
      title: "Watch and learn isn't enough",
      intro:
        "Trainees wait 6 months to a year for situational training at big urban stations. Until then, the policy is watch and learn.",
      blocks: [
        {
          type: "insightFlow",
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
          type: "hmw",
          label: "Problem statement",
          statement:
            "How might we create a supplement for firefighter trainees that enhances their situational awareness and decision making skills in controlled environments before they enter real-world scenarios?",
        },
      ],
    },
    {
      id: "exploration",
      stage: "ideation",
      title: "Three ways to fight a fire you can't light",
      intro: "We explored three immersive concepts. Two didn't make the cut, for different reasons.",
      blocks: [
        {
          type: "conceptTabs",
          concepts: [
            {
              name: "Hologram",
              verdict: "dropped",
              columns: [
                { label: "Concept", items: ["A 3D holographic model of the affected building, dynamically updated with real-time data, showing fire spread, structural integrity and potential hazards."] },
                { label: "Value", items: ["Situational awareness", "Strategise entry and approach", "Enables a command system to oversee, optimise and guide resources"] },
                { label: "Exclusion", items: ["High implementation costs", "Resource allocation", "Lack of real-world trials", "Complexity of data integration", "Hardware constraints"] },
              ],
            },
            {
              name: "AR",
              verdict: "dropped",
              columns: [
                { label: "Concept", items: ["Rapid-fire training where users tilt their head left or right to choose the correct response."] },
                { label: "Value", items: ["Improves decision-making speed in high-pressure situations"] },
                { label: "Exclusion", items: ["Too gamified for firefighters; better suited for a general audience"] },
              ],
            },
            {
              name: "VR",
              verdict: "kept",
              columns: [
                { label: "Concept", items: ["A fully immersive VR training programme where trainees engage in simulated fire scenarios, gradually increasing in complexity."] },
                { label: "Value", items: ["Bridges the classroom-to-emergency gap", "Builds decision skills", "Develops situational awareness through unpredictable fire exposures"] },
                { label: "Impact", items: ["Creates safe yet challenging training, builds psychological resilience, and prepares firefighters for real crises through progressive learning experiences."] },
              ],
            },
          ],
          footnote:
            "AR and holograms didn't disappear, though. They came back in different roles: an extinguisher game on a phone, and hologram demonstrations you can watch without a headset.",
        },
      ],
    },
    {
      id: "solution",
      stage: "solution",
      title: "FireSafe, in three stages",
      intro:
        "Rooted in the belief that effective learning comes from experience, FireSafe enhances traditional field training by embedding it with immersive technologies.",
      blocks: [
        {
          type: "callout",
          label: "What we offer",
          body: "Through immersive simulation, trainees experience complex emergency scenarios, tactical procedures and high-risk environments, without the real-world danger.",
        },
        {
          type: "circles",
          heading: "Over the 6-month period",
          items: [
            { label: "Mobile app", icon: "phone" },
            { label: "Smart watch integration", icon: "watch" },
            { label: "Three-stage technology use", icon: "branch" },
          ],
        },
        {
          type: "iconCards",
          heading: "What trainees gain",
          items: [
            { title: "Situational awareness", body: "Sharpen situational awareness.", icon: "engagement" },
            { title: "Decisions under pressure", body: "Enhance critical decision-making under pressure.", icon: "leadership" },
            { title: "Memory retention", body: "Improve memory retention of firefighting techniques and protocols.", icon: "creativity" },
          ],
        },
        {
          type: "stageStairs",
          heading: "Where we come in",
          mark: "FireSafe",
          stages: [
            {
              title: "Foundation and basic firefighting techniques",
              image: `/images/projects/fire-safe/stages/stage-1.webp`,
              ours: {
                label: "mobile app and AR",
                photo: `/images/projects/fire-safe/deck/stage-1.webp`,
                weeks: ["Week 1: Orientation and basic safety", "Week 2: Fire science and chemistry of fire", "Week 3: Firefighting equipment and extinguishing methods", "Week 4: Hose and hydrant drills"],
                body: "Trainees onboard onto the mobile app in week 1, and use the AR module on extinguisher methods.",
              },
            },
            { title: "Fire science and chemistry of fire", image: `/images/projects/fire-safe/stages/stage-2.webp` },
            {
              title: "Industrial and high-risk firefighting",
              image: `/images/projects/fire-safe/stages/stage-3.webp`,
              ours: {
                label: "hologram",
                photo: `/images/projects/fire-safe/deck/stage-3.webp`,
                weeks: ["Week 9: Industrial and hazardous material firefighting", "Week 10: Confined space and special fire situations", "Week 11: Fire safety in high-rise buildings", "Week 12: Advanced fire suppression tactics"],
                body: "Holographic projections demonstrate hand signals, knots and the fire truck.",
              },
            },
            { title: "Medical first response and emergency rescues", image: `/images/projects/fire-safe/stages/stage-4.webp` },
            { title: "Specialised firefighting and hazardous environments", image: `/images/projects/fire-safe/stages/stage-5.webp` },
            {
              title: "Final assessments, real-world scenarios and certification",
              image: `/images/projects/fire-safe/stages/stage-6.webp`,
              ours: {
                label: "VR",
                photo: `/images/projects/fire-safe/deck/stage-6.webp`,
                weeks: ["Week 13: First aid and casualty management", "Week 14: Rescues in natural and man-made disasters", "Week 15: Fire investigation and reporting", "Week 16: Search and rescue drills"],
                body: "The VR training module, alongside real-world scenarios and certification.",
              },
            },
          ],
        },
        {
          type: "image",
          size: "full",
          fill: true,
          heading: "The app ties it together",
          image: {
            src: `/images/projects/fire-safe/deck/app-screens-v2.webp`,
            cutout: true,
            alt: "Four FireSafe app screens: a splash reading 'Endorsed by the Department of Fire', a Week 3 home with 28% progress, 92% recovery, high readiness and modules to continue, a Training tab of recommended modules, and an Insights tab with strengths, areas for improvement against the class average and a progress trend",
          },
        },
        {
          type: "features",
          items: [
            { title: "Home", body: "Each week's module and progress, health readiness and recovery, and where you left off." },
            { title: "Training", body: "Recommended modules for the week, with the key skills for each." },
            { title: "Insights", body: "Strengths and areas to improve against the class average, with the AR, hologram or drill session that would help, and a progress trend." },
          ],
        },
        {
          type: "iconCards",
          heading: "Hologram: no headset needed",
          items: [
            { title: "Life-sized, in 3D", body: "Interactive demonstrations without the need for headsets or special glasses.", icon: "broad" },
            { title: "360-degree view", body: "Better spatial understanding and technique replication.", icon: "variants" },
            { title: "Many trainees at once", body: "Several trainees learn together in a hands-free, equipment-free environment.", icon: "people" },
            { title: "Recall and muscle memory", body: "Safe, repeated practice builds recall, muscle memory and readiness.", icon: "creativity" },
          ],
        },
        {
          type: "imageTabs",
          dark: true,
          items: [
            { label: "Firefighting signals", image: `/images/projects/fire-safe/deck/holo-signals.webp`, alt: "Hologram interface with four red firefighter silhouettes in a cross for a four-sided projection, playing 'Water Pressure Decrease'", caption: "Demonstrates essential firefighter hand gestures used during rescue operations." },
            { label: "Knot tying", image: `/images/projects/fire-safe/deck/holo-knots.webp`, alt: "Hologram interface showing four views of a blue rope tied around a green pole, playing 'Constrictor Knot'", caption: "Knot-tying tutorials with clear, step-by-step visual guides." },
            { label: "Firefighting truck", image: `/images/projects/fire-safe/deck/holo-truck.webp`, alt: "Hologram of the fire truck's parts with the fog nozzle labelled, playing 'Master Stream'", caption: "The fire truck and its parts, like the fog nozzle." },
            { label: "In the room", image: `/images/projects/fire-safe/page/hologram.webp`, alt: "Two holographic projections in a dark room", caption: "The hologram projections in use." },
          ],
        },
        {
          type: "iconCards",
          heading: "AR: pick the right extinguisher, fast",
          items: [
            { title: "Five fire types", body: "Class A to E: wood or solid, liquid, gas, electrical and metal fires, each with distinct visual characteristics.", icon: "fire" },
            { title: "Score and high score", body: "Score tracking with a high score system encourages repeated practice and skill improvement.", icon: "engagement" },
            { title: "Time pressure", body: "Fires grow larger if not extinguished quickly, simulating real emergency conditions.", icon: "pressure" },
            { title: "Three lives", body: "Feedback whenever the wrong extinguisher is chosen for a fire type.", icon: "safe" },
          ],
        },
        {
          type: "imageTabs",
          dark: true,
          items: [
            { label: "In a real room", image: `/images/projects/fire-safe/deck/ar-room.webp`, alt: "Three phones running the AR module: dispatch information reading 'Fire reported in the electric room' with a blue fire, and 'Fire reported in the kitchen' with a yellow fire and a white fire, each with Wet Chemical, Water / Foam, CO2 / Dry Chemical and CO2 / Non-conductive choices", caption: "Virtual fires appear in your real room, with dispatch information and the four extinguisher choices." },
            { label: "The game", image: `/images/projects/fire-safe/deck/ar-phone.webp`, alt: "Phone running the AR game: flames over a real room, level 1, timer, high score 140, three hearts, and Class A water, B foam, C and D powder, E CO2 buttons", caption: "Level, timer, score, lives and the four extinguisher classes." },
            { label: "Feedback", image: `/images/projects/fire-safe/deck/ar-states.webp`, alt: "Four AR game states: the default game, a safety tip reading 'Aim at the base of the fire, not the flames', an 'Incorrect choice!' message, and '+67 Perfect!'", caption: "Safety tips, instant feedback on wrong choices, and points for the right one." },
          ],
        },
        {
          type: "iconCards",
          heading: "VR: the full emergency",
          items: [
            { title: "New environments", body: "Each level has a different environment and fire scenario, challenging adaptability and response strategy.", icon: "broad" },
            { title: "Break and grab", body: "Players break doors and grab the objects they need for the rescue.", icon: "grip" },
            { title: "People to save", body: "Each level has civilians trapped in different parts of the burning environment.", icon: "people" },
            { title: "Against the clock", body: "Locate, assist and safely evacuate them to the ambulances within a limited time.", icon: "pressure" },
          ],
        },
        {
          type: "image",
          size: "wide",
          image: {
            src: `/images/projects/fire-safe/page/vr.webp`,
            cutout: true,
            alt: "Four VR scenes: a trainee by an ambulance and fire truck, a car on fire, trainees in the training hub, and a fiery portal into story mode",
          },
        },
        {
          type: "imageTabs",
          heading: "Interactions",
          intro: "Built in Unity. Every interaction from the VR module, in the order a trainee meets them.",
          dark: true,
          items: [
            { label: "NPC animation and voice", image: `/images/projects/fire-safe/deck/vr-npc.webp`, alt: "VR controllers in front of an animated firefighter NPC" },
            { label: "Portal to story mode", image: `/images/projects/fire-safe/deck/vr-portal.webp`, alt: "A fiery portal labelled Story Mode with a Start button" },
            { label: "Button to next scene", image: `/images/projects/fire-safe/deck/vr-next.webp`, alt: "A Fire Level 3 objectives board with a Next button" },
            { label: "Grabbable extinguishers", image: `/images/projects/fire-safe/deck/vr-grab.webp`, alt: "Grabbable CO2, gas and electric extinguishers by a fire truck" },
            { label: "Extinguisher to house fires", image: `/images/projects/fire-safe/deck/vr-house.webp`, alt: "Spraying an extinguisher near a red car" },
            { label: "Getting the child to safety", image: `/images/projects/fire-safe/deck/vr-child.webp`, alt: "Carrying a child towards firefighters" },
            { label: "Axe to destroy the door", image: `/images/projects/fire-safe/deck/vr-axe.webp`, alt: "VR hands holding an axe at a door" },
            { label: "Moving the cabinet to save the man", image: `/images/projects/fire-safe/deck/vr-cabinet.webp`, alt: "Moving a cabinet away from a trapped man" },
            { label: "Getting the man to safety", image: `/images/projects/fire-safe/deck/vr-man.webp`, alt: "Guiding the man out" },
            { label: "The right extinguisher for the fire", image: `/images/projects/fire-safe/deck/vr-extinguisher.webp`, alt: "Choosing an extinguisher near a gas cylinder" },
            { label: "Axe to break the door, part 2", image: `/images/projects/fire-safe/deck/vr-axe-2.webp`, alt: "Swinging an axe at a second door" },
            { label: "Saving the trapped boy", image: `/images/projects/fire-safe/deck/vr-boy.webp`, alt: "Reaching a trapped boy" },
          ],
        },
        {
          type: "features",
          heading: "UI screen and handbook",
          items: [
            {
              title: "A report, not just a score",
              body: "After each task: time taken, task completion, lives used, rescue rate, a heatmap of fire left, time per level, and feedback, like why water was the wrong call on an electrical fire.",
              image: {
                src: `/images/projects/fire-safe/deck/ui-report.webp`,
                alt: "Dark post-task report: task status completed, 12:08 minutes, 3/4 tasks, 3/6 lives, rescue rate with one rescue pending, 38% of fire left heatmap, time per level chart and feedback recommending a CO2 extinguisher",
              },
            },
            {
              title: "The trainee's handbook",
              body: "A printed guide book that goes with the training, with FireSafe's vision and mission inside, in Hindi.",
              image: {
                src: `/images/projects/fire-safe/page/guide-book.webp`,
                native: true,
                alt: "Two firefighter trainees in helmets and turnout gear reading a black FireSafe Trainee's Hand Book",
              },
            },
          ],
        },
      ],
    },
    {
      id: "validation",
      stage: "testing",
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
      stage: "future",
      title: "Who pays for practice",
      intro: "We mapped how FireSafe could sustain itself.",
      blocks: [
        {
          type: "businessModel",
          heading: "Business model",
          partners: [
            "Fire departments and training academies",
            "Technology providers (AR, VR and hologram hardware)",
            "Educational institutions and research bodies",
            "Government safety agencies",
            "Software developers and simulation designers",
          ],
          activities: ["Immersive training modules using AR, VR and holographic simulations", "Researching real-life fire emergency scenarios"],
          resources: [
            "AR/VR hardware (VR headsets, AR glasses)",
            "Holographic display technology",
            "Software development teams",
            "Funding for R&D and prototype development",
          ],
          value: [
            "Realistic scenarios for training",
            "Exposure to visual and psychological pressure: situational training",
            "Interactive learning: execution and evaluation",
            "Reduction in on-ground training risks",
          ],
          relationships: ["Feedback loops to and from trainees and instructors", "Dedicated training sessions and user onboarding"],
          channels: ["Partnership with departments", "Workshops and industry seminars"],
          segments: ["Firefighter trainees and training academies", "Government and municipal fire departments", "Private fire safety organisations", "Oil and gas industries"],
          costs: [
            "Development and maintenance of AR, VR and hologram training modules",
            "Equipment costs (VR headsets, AR devices, holographic displays)",
            "Salaries for developers, designers and researchers",
            "Marketing, outreach and customer support expenses",
          ],
          revenue: ["Licensing fees for using the AR/VR training platform", "Service packages"],
        },
        {
          type: "needed",
          items: ["Asmi's reflection: what she learned on Fire Safe and what she'd do next"],
        },
      ],
    },
  ],
  contribution: {
    mine: [
      "Research and interviews: user research and interviews to understand fire safety awareness, challenges and training needs",
      "Ideation and storyboarding: explored concepts and mapped the experience through storyboards to communicate the solution",
      "UX/UI design: designed the interface screens for the digital experience",
      "AR experience: designed the augmented reality screens for interactive fire safety learning",
      "VR training game: worked on the Unity-based VR game that simulates fire safety training",
      "Hologram prototype: developed a real-life hologram model to demonstrate the concept physically",
      "3D modelling: created a physical 3D model of the game setup to demonstrate the experience",
      "Handbook and presentation: designed the project handbook and the presentation deck",
    ],
    team: [
      "Research and interviews, ideation, and defining the problem statement",
      "A video explaining the problem, and the narrative video",
      "The Unity experience, the UX/UI screens and the final presentation",
    ],
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
