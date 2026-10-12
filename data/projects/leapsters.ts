import { needed, type Project } from "@/lib/types";

const IMG = "/images/projects/leapsters";

const project: Project = {
  slug: "leapsters",
  title: "Leapsters",
  subtitle: "Nurturing confidence through play",
  oneLiner:
    "A board game and companion app that help children aged 5–12 build English skills and the confidence to use them.",
  tier: "flagship",
  order: 1,
  kind: "Capstone · Learning ecosystem",
  year: needed("Year the Leapsters capstone was completed"),
  duration: "6 months", // confirmed by Asmi (2026-10-08)
  role: needed("Asmi's role title on Leapsters"),
  team: {
    solo: true,
  },
  disciplines: ["research", "ux-ui", "systems", "physical-brand"],
  thinking: ["people", "research", "play", "systems"],
  tags: [
    "EdTech",
    "Children 5–12",
    "English literacy",
    "Board game",
    "Mobile app",
    "Play-based learning",
  ],
  tools: [],
  accent: "#E27274",
  cover: {
    type: "motion",
    composition: "leapsters",
    poster: {
      src: `${IMG}/27.webp`,
      alt: "The Leapsters board game laid out on white: a polka-dot play mat with an orange border, four challenge card decks, an instruction manual, three coloured tokens and a green sand timer.",
      focus: "60% 50%",
    },
  },
  proofPoint: "63 research participants · 122 user tests",
  quickRead: {
    problem:
      "Many children in India struggle with basic English, and the gap chips away at their confidence. None of the existing platforms reviewed addressed children's emotional and behavioural needs.",
    insight:
      "Children often know the answer but are scared to say it. What they need isn't perfect guidance; it's presence, play and a pace that fits them.",
    solution:
      "Leapsters: a mat-based board game where children win skill zones by completing speaking, listening, writing and creative-thinking challenges, plus a mobile app with Koko the mascot for daily, self-paced practice.",
    result:
      "122 user tests. An overall feedback score of 3.6/5: the visuals and the learn-through-play idea landed; game length and the XP system did not.",
  },
  chapters: [
    /* 1 ─────────────────────────────────────────────── */
    {
      id: "quiet-kid",
      stage: "overview",
      title: "The answer is in there",
      intro:
        "Every class has one: the child who knows more than they let on and says less than they know.",
      blocks: [
        {
          type: "pullQuote",
          quote: "I know the answer in my head… but I can't say it in English.",
          attribution: "A child's perspective, from the research",
        },
        {
          type: "text",
          body: [
            "I didn't start with a missing skill. I started with a feeling. Children told us reading feels scary, that they get shy to read aloud, that they know the word but can't say it fast.",
            "What they hear doesn't help: \"Don't ask silly questions in class.\" \"Other kids do it, why can't you?\" \"You're not trying hard enough.\"",
            "So they adapt. They go silent to avoid being questioned, fake understanding to avoid embarrassment, and quietly decide that studying is not for them.",
          ],
        },
        {
          type: "image",
          image: {
            src: `${IMG}/19.webp`,
            alt: "Four pastel jigsaw pieces on an orange background, each holding a child's quote about English, beside three smiling geometric characters: a triangle, a circle and a square.",
            caption: "Piecing together the kid's perspective.",
          },
          size: "wide",
        },
      ],
    },

    /* 2 ─────────────────────────────────────────────── */
    {
      id: "gap",
      stage: "research",
      title: "Showing up isn't the same as learning",
      blocks: [
        {
          type: "stats",
          items: [
            {
              value: "70%+",
              label: "of Grade 3 students in India cannot read a simple Grade 2-level English text",
            },
          ],
          source: needed("Source for the 70% Grade 3 reading statistic"),
        },
        {
          type: "text",
          body: [
            "Millions of children attend school every year and still struggle with basic English. That gap doesn't stay academic for long; it shows up as lost confidence.",
            "The research pointed to two kinds of causes. External: uniform teaching methods, language mismatch, outdated pedagogy, overcrowded classrooms. Internal: low confidence, learning anxiety, performance pressure, less interaction in class.",
            "The gap is widest from senior KG to Class 1 and from Class 3 to Class 5. Class 3 is often the turning point, when foundational gaps start to seriously hold a child back.",
          ],
        },
        {
          type: "callout",
          label: "Blind spots in existing platforms",
          body: "I compared P&G Shiksha + Mindspark, iDream iPrep PAL, DIKSHA & ePathshala and Amrita Learning on accessibility, infrastructure, emotional and behavioural focus, scalability, teacher/parent involvement and innovation. None of the four addressed emotional and behavioural needs, and none involved teachers or parents.",
        },
        {
          type: "features",
          heading: "Gaps I found",
          items: [
            {
              title: "Slower isn't adaptive",
              body: "Remedial tools slow content down instead of adapting it to how a child learns.",
            },
            {
              title: "Urban-English centric",
              body: "Content leaves out regional and diverse learners.",
            },
            {
              title: "Assumes the basics",
              body: "Most adaptive tools need stable devices, internet or digital literacy that many learners don't have.",
            },
            {
              title: "The holiday slide",
              body: "Children forget earlier concepts over vacations.",
            },
          ],
        },
      ],
    },

    /* 3 ─────────────────────────────────────────────── */
    {
      id: "research",
      stage: "research",
      title: "63 people, one child at the centre",
      intro:
        "The objective: understand children's learning challenges, engagement barriers and emotional responses in hybrid learning environments.",
      blocks: [
        {
          type: "researchMethods",
          groups: [
            { label: "Students", value: 17 },
            { label: "Teachers", value: 14 },
            { label: "Parents", value: 30 },
            { label: "Counsellors", value: 2 },
          ],
          methods: [
            {
              name: "Primary research",
              detail:
                "17 students (12 smart learners, 5 weak learners), 14 teachers (12 subject, 2 class), 30 parents (15 working, 15 non-working), 2 counsellors",
            },
            {
              name: "Camera study",
              detail: "Photographs of classrooms, annotated for behaviours such as teacher-led instruction, peer collaboration and distraction",
            },
            {
              name: "Literature review",
              detail: "Academic papers, media reports, and NEP 2020, NCERT, UNICEF and UNESCO documents",
            },
            {
              name: "Competitor analysis",
              detail: "BYJU'S, Khan Academy, DIKSHA, P&G Shiksha + Mindspark, iDream iPrep PAL, Amrita Learning",
            },
            { name: "Stakeholder mapping", detail: "Core, intermediary and ancillary rings" },
            { name: "Mind mapping, affinity mapping, empathy and value mapping" },
          ],
          note: "Students aged 5–12, teachers and parents/guardians formed the core stakeholder ring; principals, coordinators, child psychologists, school counsellors and EdTech developers sat around them.",
        },
        {
          type: "needed",
          items: [
            "Research method breakdown: which participants were interviewed vs surveyed vs observed",
            "Where the research and camera study took place (schools / cities) and how participants were recruited",
          ],
        },
        {
          type: "image",
          image: {
            src: `${IMG}/11.webp`,
            alt: "Collage of eight black-and-white classroom photographs with orange handwritten labels: note taking, teacher-led instruction, vocal leadership, digital learning, distracted, peer collaboration and flexible seating.",
            caption: "Camera study: what a school day actually looks like.",
          },
          size: "full",
        },
        {
          type: "personas",
          heading: "Two children I designed for",
          items: [
            {
              name: "Abhay Shetty",
              age: "6",
              descriptor:
                "A cheerful, curious first grader who loves drawing and cartoons, but struggles to keep up with reading and basic maths and feels left out when others finish faster.",
              quote: "Main samajhta hoon, Par thode time mei bhul bhi jata hu",
              needs: [
                "Learn reading and maths at his own pace",
                "Learn through play, stories and visual activities",
                "Feel encouraged, not judged",
              ],
              frustrations: [
                "Anxious when others learn faster",
                "Doesn't like being corrected in front of others",
                "Avoids subjects he finds tough",
              ],
            },
            {
              name: "Piyu Sharma",
              age: "11",
              descriptor:
                "A sensitive, observant girl with autism who loves patterns, repetition and visual learning, and becomes anxious with noise or sudden change.",
              quote:
                "Teacher bolte hain samajh aa gaya? Par mai toh bas sir hila deti hoon... samajh toh aadha bhi nahi aata",
              needs: [
                "Understand lessons, not just memorise them",
                "Read fluently in her own language",
                "Enjoy learning through games or visuals",
              ],
              frustrations: [
                "Can't keep up and forgets quickly",
                "Finds textbooks boring and hard to understand",
                "Too shy to ask for help",
              ],
            },
          ],
        },
      ],
    },

    /* 4 ─────────────────────────────────────────────── */
    {
      id: "insights",
      stage: "research",
      title: "Presence over perfection",
      intro:
        "Affinity mapping sorted the notes into cognitive barriers, emotional support, home environment, school methods and the pull of screens. Five threads kept coming back.",
      blocks: [
        {
          type: "pullQuote",
          quote: "Mummy sat with me.",
          attribution: "A student, on what made learning feel better",
        },
        {
          type: "text",
          body: [
            "Children lit up when they mentioned moments like \"Mummy sat with me\" or \"Sir asked if I was okay.\" One-on-one emotional attention, not just academic help, became a lifeline.",
          ],
        },
        {
          type: "insightChain",
          items: [
            {
              observation:
                "Remedial tools slow content down; classes race to finish the syllabus.",
              insight: "One pace fits almost nobody. Slower isn't the same as adapted.",
              opportunity:
                "Personalised learning journeys that grow with each child's pace and style.",
            },
            {
              observation:
                "\"I like English songs, but reading feels scary.\" Children are afraid of making mistakes, so they hesitate to try.",
              insight: "Fear blocks practice before ability does.",
              opportunity: "Playful learning: game-based, sensory activities that make English feel natural.",
            },
            {
              observation:
                "Children switch between their mother tongue at home and English at school, and know answers they can't voice.",
              insight: "The knowledge is often there; the words aren't.",
              opportunity: "A visual and verbal blend of imagery, sound and motion to aid understanding.",
            },
            {
              observation: "Lessons rarely use real-life examples or activities.",
              insight: "English without context doesn't stick.",
              opportunity: "Contextual spaces: story-led, real-world settings that give learning meaning.",
            },
            {
              observation:
                "Schools assume parents will follow up; parents assume the school has it covered.",
              insight: "The child slips through, thinking just showing up is enough.",
              opportunity:
                "Guided support: tools that help teachers and parents track and nurture progress.",
            },
          ],
        },
        {
          type: "text",
          heading: "What everyone needed from each other",
          body: [
            "Value mapping between kids, parents, teachers and counsellors surfaced five shared values: trust, transparency, adaptivity, well-being and clarity.",
          ],
        },
      ],
    },

    /* 5 ─────────────────────────────────────────────── */
    {
      id: "opportunity",
      stage: "problem",
      title: "Learn joyfully, feel seen",
      blocks: [
        {
          type: "hmw",
          statement:
            "How might we create a playful learning system that adapts to each child's pace, helping them learn joyfully and feel seen in the process?",
        },
        {
          type: "features",
          heading: "Three words to design against",
          items: [
            { title: "Fun", body: "Engagement through play." },
            { title: "Simple", body: "Clear communication pathways." },
            { title: "Adaptive", body: "Personalised practice and emotional support." },
          ],
        },
        {
          type: "text",
          body: [
            "The goal in one line: learning that adapts, supports and connects, without pressure.",
          ],
        },
      ],
    },

    /* 6 ─────────────────────────────────────────────── */
    {
      id: "exploration",
      stage: "ideation",
      title: "30 ideas, 3 survivors",
      intro:
        "I sketched widely: focus pets, emotion dice, mood tiles, story blocks, counsellor dashboards, an AI study buddy, adaptive report cards.",
      blocks: [
        {
          type: "image",
          image: {
            src: `${IMG}/25-cut.webp`,
            cutout: true,
            alt: "Grid of thirty numbered black-and-white concept sketches, including emotion dice, mood floor tiles, story blocks, a growth jar, a heatmap dashboard, a play-to-learn arcade and a collaboration hub.",
            caption: "30+ concept sketches.",
          },
          size: "full",
        },
        {
          type: "features",
          heading: "How I chose",
          items: [
            { title: "Engagement", body: "Builds curiosity and participation." },
            { title: "Confidence", body: "Easy for all learners to use." },
            { title: "Sustainability", body: "Simple and scalable to implement." },
          ],
        },
        {
          type: "conceptFunnel",
          stages: [
            { count: "30+", label: "concept sketches" },
            { count: "3", label: "shortlisted" },
            { count: "1", label: "system, revealed next" },
          ],
          concepts: [
            {
              name: "Challenge Spinner + Mood Tiles",
              verdict: "shortlisted",
              reason:
                "A spinner with Draw, Explain and Act prompts reveals strengths across modes; floor tiles with emotions give real-time emotional feedback. Rated highest of the three overall on impact, engagement and accessibility.",
            },
            {
              name: "Story Blocks",
              verdict: "shortlisted",
              reason:
                "Interlocking story-prompt blocks for creativity and flexible thinking, adapting to different comprehension levels.",
            },
            {
              name: "Micro-Learning Bursts",
              verdict: "shortlisted",
              reason:
                "Five-minute adaptive puzzles delivered daily to prevent overload. Rated lowest of the three on all criteria.",
            },
          ],
        },
        {
          type: "image",
          image: {
            src: `${IMG}/23-cut.webp`,
            cutout: true,
            alt: "Three cards of pencil concept sketches, each rated Low to High on Impactful, Engaging and Accessibility sliders: a challenge spinner with mood tiles, story blocks, and micro-learning bursts.",
            caption: "The shortlist, scored on impact, engagement and accessibility.",
          },
          size: "wide",
        },
        {
          type: "needed",
          items: [
            "Why the other ~27 concepts were dropped",
            "Which shortlisted concept (or combination) led to the final design, and why",
          ],
        },
      ],
    },

    /* 7 ─────────────────────────────────────────────── */
    {
      id: "reveal",
      stage: "solution",
      title: "Meet Leapsters",
      intro:
        "A board game played on a mat, with an app inside it for everyday practice. The manual says it best: take small leaps with confidence.",
      blocks: [
        {
          type: "image",
          image: {
            src: `${IMG}/24.webp`,
            alt: "Nested-circle diagram: an outer Outcome ring, a Context shape, a blue Design Focus shape, and at the core an orange Board Game circle containing a red App circle.",
            caption:
              "The framework: the board game at the core, the app inside it, aimed at boosting confidence.",
          },
          size: "inset",
        },
        {
          type: "image",
          image: {
            src: `${IMG}/27.webp`,
            alt: "Leapsters board game components on white: a polka-dot 2 ft mat, four illustrated challenge card decks, an instruction manual, three tokens in navy, purple and green, and a green sand timer.",
          },
          size: "full",
        },
        {
          type: "features",
          heading: "In the box",
          items: [
            {
              title: "2 ft play mat",
              body: "Coloured circles, each colour a skill zone.",
            },
            {
              title: "4 challenge decks",
              body: "Creative Thinking, Listening Skills, Writing Skills and Speaking Skills.",
            },
            { title: "3 magnetic tokens", body: "One colour per player, used to claim circles." },
            { title: "Timer and manual", body: "A sand timer and an instruction manual." },
          ],
        },
        {
          type: "process",
          heading: "How to play",
          steps: [
            {
              title: "Choose your colour",
              body: "Each player picks a token colour that represents them for the game.",
            },
            {
              title: "Spot the circles",
              body: "The coloured circles on the mat are skill zones: creative thinking, listening, writing and speaking.",
            },
            {
              title: "Draw a challenge card",
              body: "Pick the circle you want, then draw a card in its colour. A pink circle means a Speaking Skills card.",
            },
            {
              title: "Do it to win it",
              body: "Speak, act, write or think creatively. Succeed, and your token claims the circle.",
            },
            {
              title: "Keep conquering",
              body: "Take turns claiming circles, blocking opponents or connecting circles into your own zones.",
            },
          ],
        },
        {
          type: "callout",
          label: "Bonus round",
          body: "Form a square of four tokens and you unlock a bonus round: draw a card from any deck and complete it to choose one reward: 2 extra points, an extra token anywhere on the mat, or a swap with an opponent's token.",
        },
        {
          type: "text",
          heading: "Why it motivates",
          body: [
            "I checked the game against the Octalysis framework. It leans on accomplishment, social influence and creative empowerment, with avoidance kept deliberately low to reduce fear and pressure.",
          ],
        },
        {
          type: "image",
          image: {
            src: `${IMG}/30.webp`,
            alt: "A phone on a coral background showing the app splash screen: a pink cube-shaped mascot above the leapsters wordmark.",
            caption: "Koko says hello.",
          },
          size: "wide",
        },
        {
          type: "text",
          heading: "The app",
          body: [
            "The app is mobile first, because most children and parents rely on smartphones. That means access on the go and practice that carries on beyond the classroom.",
            "Koko, the mascot, greets children on launch. Onboarding asks for a learning goal, English level, skills to improve, daily study time and a reminder time, then generates a learning plan.",
          ],
        },
        {
          type: "features",
          items: [
            { title: "Home", body: "Daily challenges." },
            {
              title: "Lessons that talk back",
              body: "Interactive dialogue where children speak their answers, fill a progress bar, earn streaks and unlock the next lesson.",
            },
            {
              title: "Phrasebook",
              body: "Chapters such as greetings, travel and directions, dining, shopping and emergencies.",
            },
            {
              title: "Word Cards",
              body: "Illustrated vocabulary by theme: animals, fruit, numbers, insects, food, vegetables.",
            },
            {
              title: "Insights",
              body: "Streaks, achievements and a growth chart across listening, pronunciation, fluency, intonation, word stress and grammar.",
            },
          ],
        },
        {
          type: "image",
          image: {
            src: `${IMG}/35.webp`,
            alt: "Six high-fidelity phone screens on coral: English level selection with Koko, a 'Say the sentence' speaking exercise, the Phrasebook list, Word Cards, a My Progress radar chart, and Account settings.",
            caption: "High-fidelity screens.",
          },
          size: "full",
        },
        {
          type: "image",
          image: {
            src: `${IMG}/31.webp`,
            alt: "UI style sheet: Fredoka and Poppins type specimens in coral, a colour arc around the leapsters wordmark, and active and inactive navigation icons for Home, Phrasebook, Word cards, Insights and Account.",
            caption: "Type, colour and icons: Fredoka for headings, Poppins for everything else.",
          },
          size: "wide",
        },
        {
          type: "needed",
          items: [
            "How the board game and the app connect in use (shared progress, QR codes, sync, or separate use)",
          ],
        },
      ],
    },

    /* 8 ─────────────────────────────────────────────── */
    {
      id: "testing",
      stage: "testing",
      title: "122 tests later",
      intro: "Then I put it in front of children: at tables, on classroom floors, phones in hand.",
      blocks: [
        {
          type: "image",
          image: {
            src: `${IMG}/37.webp`,
            alt: "Collage of colour photos of children with faces blurred: groups playing on the dot mat and on an earlier path-style board, and individual children using the app on phones.",
            caption: "Testing the prototype. Some sessions used an earlier path-style board.",
          },
          size: "full",
        },
        {
          type: "testing",
          summary:
            "122 user tests across the board game and the app. Players found it fun and engaging; younger players and the reward system told me what to fix.",
          metrics: [
            {
              label: "Overall feedback score",
              after: "3.6/5",
              note: "How the score was collected isn't specified",
            },
          ],
          positives: [
            "The visual design and illustrations of both the board game and the app were highly appreciated.",
            "Players found learning through play fun and engaging.",
            "Parents and teachers liked the blend of education and entertainment.",
          ],
          negatives: [
            "Gameplay felt too long for younger players.",
            "Short attention spans led to loss of focus and patience.",
            "The XP and rewards system wasn't well understood.",
          ],
        },
        {
          type: "needed",
          items: [
            "What the Fun 60% / Simple 50% / Adaptive 45% figures on the feedback slide measure, and how they were collected",
            "Who the 122 tests were with (ages, settings, unique children vs sessions) and the test protocol",
          ],
        },
      ],
    },

    /* 9 ─────────────────────────────────────────────── */
    {
      id: "reflection",
      stage: "future",
      title: "What I'd do next",
      blocks: [
        {
          type: "text",
          body: [
            "The project moved through research, ideation with experts (therapists, caregivers and educators), low- to high-fidelity prototyping and testing, and a final pilot.",
            "Testing left two clear threads to pull: a game that fits younger attention spans, and rewards children actually understand.",
          ],
        },
        {
          type: "needed",
          items: [
            "Asmi's reflection: key learnings and what she would change",
            "Iterations made after testing (game length, XP/rewards), if any",
            "Learning or confidence outcomes measured (before/after), if any",
            "Year, duration and the unit of the 1–12 timeline",
            "Asmi's role and what she personally did",
            "Faculty guide/mentor and any collaborators",
            "Tools used (e.g. for UI, illustration, 3D renders, research boards)",
            "Institution credit to show (NMIMS School of Design is not on the slides)",
          ],
        },
      ],
    },
  ],
  contribution: {
    mine: needed(
      "What Asmi personally did on Leapsters (research, synthesis, game design, UI, illustration, testing…)",
    ),
  },
  links: {
    behance:
      "https://www.behance.net/gallery/248075551/Leapsters-Nurturing-Confidence-Through-Play",
  },
  seo: {
    title: "Leapsters — Play-based English for ages 5–12 · Asmi Shaikh",
    description:
      "A board game and app that help children aged 5–12 learn English with confidence. Research with 63 people, 30+ concepts, 122 user tests.",
  },
};

export default project;
