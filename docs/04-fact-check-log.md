# 04 · Fact-check log

Adversarial audit of `data/projects/*.ts` against `docs/sources/*.md` (Behance transcriptions, Medium article and resume). Each change is listed below by file, with the claim, the problem type and the fix. Claims not listed were checked and found to be supported or acceptable paraphrase. Image paths were checked; every referenced file exists.

Problem types: UNSUPPORTED · WRONG · OVERCLAIM · QUOTE

## leapsters.ts (10)

| Claim | Type | Fix |
|---|---|---|
| quickRead.problem: "Most learning tools treat it as a content problem and ignore the fear." | UNSUPPORTED | Changed to what slide 07 shows: none of the platforms reviewed addressed emotional and behavioural needs. |
| quickRead.solution: "a floor board game" | UNSUPPORTED | Changed to "a mat-based board game" (slide 27: "2 Feet Mat"). |
| Abhay persona quote: "Main samajhta hoon, par thode time mein bhool bhi jaata hoon." | QUOTE (respelled, not verbatim) | Restored the slide spelling: "Main samajhta hoon, Par thode time mei bhul bhi jata hu". |
| Piyu persona quote: "…Par main toh bas…aata." | QUOTE (respelled) | Restored the slide wording: "…Par mai toh bas sir hila deti hoon... samajh toh aadha bhi nahi aata". |
| Insights intro: "Affinity mapping sorted hundreds of notes" | UNSUPPORTED (the slides hold about 90 notes) | Changed to "sorted the notes". |
| Challenge Spinner: "Rated highest of the three for impact, engagement and accessibility" | OVERCLAIM (Story Blocks is also rated high on two criteria) | Changed to "Rated highest of the three overall on…". |
| Reveal intro: "A board game for the classroom floor" | UNSUPPORTED | Changed to "A board game played on a mat". |
| "an illustrated instruction manual" | UNSUPPORTED | Removed "illustrated". |
| Alt text: "a pink pillow-shaped mascot waving" | WRONG (the source says a pink cube mascot; waving is not stated) | Changed to "a pink cube-shaped mascot". |
| Testing summary: "Children enjoyed it" | OVERCLAIM | Changed to "Players found it fun and engaging" (slide 38 wording). |

## greenly.ts (8)

| Claim | Type | Fix |
|---|---|---|
| Logistics observation: shipments "arrive late or damaged" | OVERCLAIM | Changed to "face delays and quality issues" (slide 08). |
| System intro: "Before drawing a single screen, we built the system up in six layers, each one feeding the next." | UNSUPPORTED (sequence and causal claim) | Changed to a plain list of the six layers. |
| Scenario: "a logistics manager rerouting delayed deliveries" | OVERCLAIM | Changed to "tracking delayed deliveries and managing routes". |
| Site-map caption: "Every node is tagged" | OVERCLAIM | Changed to "Nodes are tagged". |
| Rack: "piping that recirculates water" | UNSUPPORTED (the slide only shows inflow/outflow arrows) | Changed to "inflow and outflow piping". |
| Validation intro: "We tested the hi-fi designs with each stakeholder group." | OVERCLAIM (testers are not stated) | Changed to "went through a usability test for each stakeholder…". |
| Farmer UT: "…monitoring at the outflow would help" | UNSUPPORTED (it rests on a guessed reading of a typo, "otlfoew") | Removed. The remaining text: per-row sensors would mainly increase cost. |
| Future scope: "Nutritionists and gyms could adopt hydroponic produce" | WRONG (the source says "hydroponic farming") | Corrected to "adopt hydroponic farming and target…". |

## fire-safe.ts (3)

| Claim | Type | Fix |
|---|---|---|
| quickRead.solution: VR "before final assessment" | WRONG (the VR module is in the Final Assessments stage) | Changed to "in the final-assessment stage". |
| Head-tilt AR concept: "It sped up decisions" | OVERCLAIM (only a stated value of a concept that was never tested) | Changed to "It aimed to improve decision-making speed, but was judged too gamified". |
| Trainee pull quote: "…our training. We didn't have access…" | QUOTE (punctuation altered) | Restored the verbatim em dash: "…our training—we didn't have access…". |

## clab.ts (11)

| Claim | Type | Fix |
|---|---|---|
| Context intro: "LinkedIn is good at connecting people. It's less good at what happens after that" | UNSUPPORTED opinion | Reframed on the source's "No Workspace" problem for LinkedIn. |
| "Everything else did one or two things" | WRONG (Slack has 3 ticks) | Changed to "The rest covered one to three." |
| People intro: "We turned the interviews into two personas" | UNSUPPORTED (the source does not say how the personas were made) | Changed to "We built two personas…". |
| Insight 2: "Professionals and students both said … steep learning curves…" | WRONG (only professionals cited learning curves and complex navigation) | Split the claim by group, as on slide 11. |
| Opportunity: "A small, consistent bottom nav" | WRONG (the nav varies: Workspace vs Explore) | Changed to "A five-item bottom nav". |
| Insight 3 observation: "Remote work made collaboration harder for the people we spoke to." | UNSUPPORTED attribution to interviews | Replaced with the literature finding: virtual teams struggle with communication, coordination and cohesion. |
| HMW/problem statement paraphrased | QUOTE (not verbatim) | Replaced with the verbatim slide 24 statement. |
| Solution intro: "Each home feed shows you the other two user types…" | WRONG (the professional feed includes a Professional tab, and the role reading is inferred) | Changed to "The home feed changes with the user type, with tabs for browsing companies, professionals or students." |
| "every project lists the key skills it needs" | OVERCLAIM | Changed to "projects list the key skills they need". |
| Caption: "the portfolio builds itself" | OVERCLAIM | Changed to "generate the portfolio from them". |
| Alt text on image 33: "tabs for the other user types" | WRONG (same reason as above) | Changed to "user-type tabs". |

## netflix-mobile.ts (5)

| Claim | Type | Fix |
|---|---|---|
| proofPoint: "Task success rose from 50% to 80%" | OVERCLAIM (Task 2 only) | Changed to "Task 2 success rose…". |
| "The 'Recommend me' idea started here as a sticky note." | OVERCLAIM (origin claim) | Changed to "first appears here, as a sticky note". |
| Chapter title: "Faster to find, slower to finish" | WRONG (the average time went up) | Changed to "Easier to find, slower to finish" (success up, confusion down). |
| Anushree quote: trailing full stop added | QUOTE | Removed it to match the slide. |
| The 2/5 to 4/5 rating listed as a Task 2 metric | WRONG attribution (the ratings slide is separate, and who rated is not stated) | Relabelled "Star rating, existing vs new", with a note that it is not tied to Task 2 and the raters are not stated. |

## fiama.ts (0)

All claims checked against the source. No changes.

## clap-it.ts (5)

| Claim | Type | Fix |
|---|---|---|
| role: "Product designer (solo)" | UNSUPPORTED title | Changed to "Solo project". |
| "Stacking multiple sheets makes it worse." | OVERCLAIM (the mind map only lists "Multiple papers") | Changed to "Holding multiple sheets is another problem." |
| "Every idea had to pass five design concerns" | OVERCLAIM | Changed to "The sketches were guided by five design concerns". |
| Caption: "Sized for a thumb-and-finger pinch." | UNSUPPORTED design intent | Changed to "Held in a thumb-and-finger pinch." |
| Testing: "holding the sheet at its top edge" | UNSUPPORTED detail | Changed to "holding a sheet on the board". |

## adeiro.ts (3)

| Claim | Type | Fix |
|---|---|---|
| role: "Brand designer (solo)" | UNSUPPORTED title | Changed to "Solo project". |
| Scalability: "Primary lockup, tested sizes" | OVERCLAIM (the slide shows sizes it "scaled down", not tested) | Changed to "sizes shown". |
| Scalability: "Monogram, tested sizes" | OVERCLAIM | Changed to "sizes shown". |

## celestial-influence.ts (3)

| Claim | Type | Fix |
|---|---|---|
| year: "2025" | UNSUPPORTED (2025 is the publish date; the study year is not stated) | Converted to `needed(…)`, matching how the other projects handle publish dates. |
| "the emotional weight of the topic" | UNSUPPORTED paraphrase | Replaced with the source's "ethics around privacy and emotional impact". |
| "The adjectives in media and in people's descriptions overlapped a lot, though the tone varied by sign…"; "could confirm the stereotype or flip it" | WRONG attribution (tone variation is about media descriptions) and OVERCLAIM ("confirm") | Rewrote it so media tone and public perception are separate; "add nuance, or flip the descriptors". |

## Notes, unchanged but worth confirming with Asmi

- Leapsters `team.solo: true` rests on Behance ownership. The slides don't state it.
- Clap It and Adeiro `contribution.mine` lists rest on solo ownership (Behance metadata; Adeiro's contact slide says "Designed by Asmi Shaikh"). They describe work shown on the slides.
- Leapsters "How I chose" pairs each selection criterion with one bullet. Slide 26 shows the circles and the bullets separately, so the one-to-one pairing is an editorial reading.
- Fire Safe "1 carried forward" (VR) is implied by the IMPACT-vs-EXCLUSION card format and by the VR module in the final design. The deck never says "selected".
- `tools` for Greenly, Fire Safe, Netflix, Fiama, Clap It and Adeiro come from Behance metadata, not the slides.

TypeScript check (`npx tsc --noEmit`) after the edits: no errors in `data/projects`.
