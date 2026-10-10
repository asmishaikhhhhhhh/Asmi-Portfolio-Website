/**
 * Content model for the portfolio.
 *
 * Every fact on the site lives in /data and conforms to these types. The website,
 * the work filters and the Ask Asmi chatbot all read from the same objects, so
 * updating a project file updates everything.
 *
 * Rule: never invent facts. When something is unknown, use `needed("…")` instead.
 * Placeholders render as a visible dashed box in development and are omitted in
 * production, so recruiters never see "[CONTENT NEEDED]".
 */

/* ───────────────────────────── placeholders ───────────────────────────── */

export type Needed = { needed: string };
/** A value that may still be missing. */
export type Maybe<T> = T | Needed;

export const needed = (what: string): Needed => ({ needed: what });
export const isNeeded = (v: unknown): v is Needed =>
  typeof v === "object" && v !== null && "needed" in v;

/* ───────────────────────────── media ───────────────────────────── */

export type Img = {
  /** Path under /public, e.g. "/images/projects/leapsters/27.webp" */
  src: string;
  /** Describe what is shown, not what it means. */
  alt: string;
  caption?: string;
  /** object-position when the image is cropped into a fixed frame. */
  focus?: string;
  /** Background already removed (transparent PNG/WebP): render without the card backdrop. */
  cutout?: boolean;
  /** Low-resolution source: don't show it much larger than its natural width. */
  native?: boolean;
  /** Render in black and white. */
  mono?: boolean;
};

/** Names of coded cover animations in components/covers/compositions. */
export type CoverComposition =
  | "leapsters"
  | "greenly"
  | "fire-safe"
  | "clab"
  | "netflix-mobile"
  | "fiama"
  | "clap-it"
  | "adeiro"
  | "celestial-influence"
  | "child-help-foundation"
  | "aistrike";

export type Cover =
  /** Coded animation built from the project's real assets. `poster` is the still frame. */
  | { type: "motion"; composition: CoverComposition; poster: Img }
  /** Looping muted video (≈100–300 KB). Add one with scripts/make-video-cover.sh */
  | { type: "video"; src: string; poster: Img }
  | { type: "image"; image: Img };

/* ───────────────────────────── taxonomy ───────────────────────────── */

/** Work filters. Keep this list short; empty filters are hidden automatically. */
export type Discipline = "research" | "ux-ui" | "systems" | "physical-brand";

/** Nodes in the "How I think" map on the home page. */
export type ThinkingNode =
  | "people"
  | "research"
  | "systems"
  | "play"
  | "stories"
  | "visuals"
  | "technology"
  | "business";

export type Tier = "flagship" | "focused" | "playground";

/* ───────────────────────────── content blocks ───────────────────────────── */

export type Stat = { value: string; label: string; note?: string; icon?: RowIconName };
export type RowIconName =
  | "students" | "work" | "home" | "people" | "broad" | "women" | "young"
  | "durable" | "grip" | "safe" | "versatile"
  | "price" | "weight" | "variants"
  | "creativity" | "engagement" | "accessibility" | "emerging" | "leadership" | "tools" | "trust"
  | "fire" | "pressure" | "scales" | "phone" | "watch" | "branch";

export type Block =
  | { type: "text"; heading?: string; body: string[] }
  | { type: "pullQuote"; quote: string; attribution?: string }
  /** layout "row": one line, hairline separated, with icons (no empty grid cells). */
  | { type: "stats"; heading?: string; items: Stat[]; source?: Maybe<string>; layout?: "grid" | "row" }
  /** Scores out of a maximum, drawn as segmented meters. */
  | { type: "ratings"; heading?: string; items: { label: string; value: number; max: number; note?: string }[]; source?: string }
  | {
      type: "researchMethods";
      heading?: string;
      /** PEOPLE only, by group, e.g. { label: "Parents", value: 30 }. Summed into "N people in the research", so never put sessions, sources or surveys here. */
      groups?: { label: string; value: number }[];
      /** Methods with optional details, e.g. { name: "Interviews", detail: "25 trainees, 10 officers" } */
      methods: { name: string; detail?: string }[];
      note?: string;
    }
  | {
      type: "personas";
      heading?: string;
      items: {
        name: string;
        age?: string;
        descriptor: string;
        quote?: string;
        needs?: string[];
        frustrations?: string[];
        image?: Img;
      }[];
    }
  | {
      type: "insightChain";
      heading?: string;
      items: { observation: string; insight: string; opportunity: string }[];
    }
  /** The problem statement card. Wrap key phrases in **double asterisks** to underline them. */
  | { type: "hmw"; statement: string; label?: string }
  /** Interactive double diamond: four phases between "don't know" and "do know". */
  | {
      type: "doubleDiamond";
      heading?: string;
      from: string;
      to: string;
      phases: { name: string; mode: string; steps: string[] }[];
    }
  | {
      type: "conceptFunnel";
      heading?: string;
      /** e.g. [{count:"30+", label:"concept sketches"}, {count:"3", label:"shortlisted"}, {count:"1", label:"ecosystem"}] */
      stages: { count: string; label: string }[];
      concepts?: {
        name: string;
        verdict: "kept" | "shortlisted" | "dropped";
        reason?: string;
        image?: Img;
      }[];
    }
  | {
      type: "process";
      heading?: string;
      steps: { title: string; body: string; image?: Img }[];
    }
  | { type: "features"; heading?: string; items: { title: string; body: string; image?: Img }[] }
  /** Test findings grouped by the feature they're about, each led by a key number. */
  | {
      type: "insightThemes";
      heading?: string;
      themes: { title: string; pill?: string; icon?: "filter"; stat?: { value: string; label: string }; points: string[] }[];
    }
  /** Interface features, each shown with a crop of the real screen on a dark panel. crop "top" fills the panel from the top and fades out. */
  | { type: "uiFeatures"; heading?: string; items: { title: string; body: string; image: Img; crop?: "top" }[] }
  /** A colour system: groups of named swatches, e.g. brand, premium and type colours. */
  | {
      type: "colorSystem";
      heading?: string;
      groups: { title: string; note?: string; display?: "circles" | "bands" | "ramp"; swatches: { name: string; hex: string }[] }[];
      /** Type specimen shown under the swatches, with the same label style */
      specimen?: { label: string; image: Img };
    }
  /** Concepts explored, as tabs: concept, value and why they stayed or went. */
  | { type: "conceptTabs"; heading?: string; footnote?: string; concepts: { name: string; verdict: "kept" | "dropped"; columns: { label: string; items: string[] }[] }[] }
  /** Research methods as interactive tabs with a picture of their scale. */
  | {
      type: "researchExplorer";
      heading?: string;
      methods: {
        name: string;
        value: number;
        unit: string;
        detail: string;
        icon: RowIconName;
        viz: "docs" | "people" | "map";
        parts?: { label: string; value: number }[];
        chips?: string[];
        link?: { label: string; href: string };
      }[];
    }
  /** A few labelled parts shown as outlined circles with icons. */
  | { type: "circles"; heading?: string; note?: string; items: { label: string; icon: RowIconName }[] }
  /** Related images browsed one at a time, with a list of labels. */
  | { type: "imageTabs"; heading?: string; intro?: string; dark?: boolean; items: { label: string; image: string; alt: string; caption?: string }[] }
  /** An embedded Figma prototype, loaded on request. */
  | { type: "figmaEmbed"; heading?: string; url: string; title: string; poster?: string; note?: string }
  /** Training stages as an interactive staircase, with ours marked. */
  | { type: "stageStairs"; heading?: string; mark: string; stages: { title: string; image: string; ours?: { label: string; body: string; weeks?: string[]; photo?: string } }[] }
  /** Findings as interactive observation → insight → opportunity flows. */
  | { type: "insightFlow"; heading?: string; items: { observation: string; insight: string; opportunity: string }[] }
  /** Interview takeaways as speech bubbles. */
  | { type: "heard"; heading?: string; source?: string; items: { title: string; body: string }[] }
  /** A total split into parts, drawn as one proportional bar. */
  | { type: "breakdown"; heading?: string; unit: string; total: { value: number; label: string }; parts: { value: number; label: string; icon?: RowIconName }[] }
  /** An ecosystem map as an interactive hub. */
  | {
      type: "ecosystem";
      heading?: string;
      centre: string;
      centreNote?: string;
      caption?: string;
      nodes: {
        title: string;
        icon: "person" | "info" | "phone" | "store" | "bank" | "extinguisher" | "building" | "factory" | "helmet";
        notes: string[];
        list?: { label: string; items: string[] };
      }[];
    }
  /** Secondary gaps above the soil, primary insights as roots (Greenly). */
  | {
      type: "surfaceRoots";
      heading?: string;
      gaps: { title: string; body: string }[];
      roots: { title: string; observation: string; insight: string; opportunity: string }[];
    }
  /** Value map between four actors, filterable by core value (Greenly). */
  | {
      type: "valueMap";
      heading?: string;
      caption?: string;
      edges: {
        from: "supplier" | "customer" | "farmer" | "logistics";
        to: "supplier" | "customer" | "farmer" | "logistics";
        values: ("reliability" | "transparency" | "efficiency" | "networking" | "sustainability")[];
      }[];
    }
  /** A tech plan as swimlanes; each flow traces steps across lanes (lane = index into lanes). */
  | {
      type: "techPlan";
      heading?: string;
      lanes: string[];
      flows: { name: string; body: string; steps: { lane: number; label: string; via?: string }[] }[];
      image?: Img;
    }
  /** Dashboards as a guided tour: numbered pins (x, y in % of the image) that zoom in. */
  | {
      type: "screenTour";
      heading?: string;
      screens: {
        name: string;
        lede: string;
        image: { src: string; alt: string; width: number; height: number };
        spots: { x: number; y: number; title: string; body: string }[];
      }[];
    }
  /** A role card: title, what Asmi did, tool icons and skills. */
  | { type: "roleCard"; title: string; items: string[]; tools: ("photoshop" | "illustrator" | "figma" | "jira")[]; skills: string[] }
  /** A process as overlapping circles; x, y are % positions of each step in the diagram. */
  | { type: "vennProcess"; heading?: string; phases: string[]; items: { label: string; phases: number[]; x: number; y: number }[] }
  /** Product modules: screens plus challenge → approach → impact. Several modules become tabs. */
  | {
      type: "moduleStory";
      modules: {
        num: string;
        name: string;
        kicker?: string;
        headline?: string;
        body?: string;
        shots: { label: string; image: Img; views?: string[] }[];
        chips?: string[];
        challenge?: string[];
        approach?: string[];
        impact?: string[];
      }[];
    }
  /** Type scale and spacing tokens, live. */
  | {
      type: "systemSpecimen";
      family: string;
      tracking?: string;
      scale: { name: string; size: number; line?: number; weight: number; italic?: boolean }[];
      spacing: number[];
    }
  /** Learnings as expandable cards. */
  | { type: "learnings"; items: { title: string; lead: string; points: string[] }[] }
  /** Usability feedback as plants on a rack: one tier per stakeholder. */
  | { type: "testRack"; heading?: string; tiers: { title: string; notes: { tone: "worked" | "fix" | "learned"; text: string }[] }[] }
  /** CLAB's material design as a live component sheet (Clab case study only). */
  | { type: "clabMaterial"; heading?: string }
  /** The interactive CLAB prototype (Clab case study only). */
  | { type: "clabPrototype"; heading?: string; intro?: string }
  /** A design process as a winding, steppable path (up to 13 steps). */
  | { type: "processPath"; heading?: string; steps: string[]; caption?: string }
  /** Stakeholder map as concentric rings, innermost first; interactive. */
  | { type: "stakeholderRings"; heading?: string; centre?: string; rings: { name: string; members: string[] }[]; caption?: string }
  /** Interactive hub of key features: hover or tap a satellite to read it. */
  | {
      type: "keyFeatures";
      heading?: string;
      centre: string;
      items: { title: string; body: string; icon: "collaborate" | "portfolio" | "community" }[];
    }
  /** Who took part in testing and what worked, side by side. */
  | {
      type: "testOverview";
      heading?: string;
      rating?: { value: number; max: number; label: string };
      total: { value: string; label: string };
      groups: { label: string; value: number; unit: string; icon: RowIconName }[];
      worked: string[];
    }
  /** Short findings as tinted cards in one row, each led by an icon. */
  | { type: "iconCards"; heading?: string; items: { title: string; body: string; icon: RowIconName }[] }
  /** Problems found and the fix proposed for each, laid out in one row. */
  | { type: "problemFix"; heading?: string; items: { problem: string; fix: string }[] }
  | { type: "image"; image: Img; size?: "full" | "wide" | "inset"; heading?: string; /** span the column width with no height cap */ fill?: boolean }
  | {
      type: "gallery";
      heading?: string;
      images: Img[];
      layout?: "grid" | "strip";
      columns?: 2 | 3;
    }
  | { type: "beforeAfter"; heading?: string; before: Img; after: Img; caption?: string }
  | {
      type: "testing";
      heading?: string;
      summary?: string;
      /** Overall rating, drawn as a row of squares beside the heading. */
      rating?: { value: number; max: number; label: string };
      metrics?: { label: string; before?: string; after: string; better?: boolean; note?: string; icon?: MetricIcon }[];
      positives?: string[];
      negatives?: string[];
    }
  /** Labelled groups of short points, e.g. test feedback per stakeholder or a business model canvas. */
  | { type: "groups"; heading?: string; groups: { title: string; items: string[] }[]; columns?: 2 | 3 }
  /** Bento grid of parts or artefacts, each with its own picture and spec chips. span = columns out of 6. */
  | {
      type: "showcase";
      heading?: string;
      items: { title: string; body: string; image: Img; chips?: string[]; span?: 2 | 3 | 4 | 6 }[];
    }
  /** Business model canvas, with costs drawn as ranges on a shared scale. Amounts in rupees. */
  | {
      type: "businessModel";
      heading?: string;
      partners?: string[];
      activities?: string[];
      resources?: string[];
      value: string[];
      relationships?: string[];
      channels?: string[];
      segments?: string[];
      revenue?: string[];
      /** Ranges in rupees draw as bars; plain strings list as points. */
      costs?: ({ label: string; min: number; max: number; per?: "unit" | "month"; note?: string } | string)[];
    }
  /** Colour palette drawn in code, so the values shown are exact. */
  | {
      type: "palette";
      heading?: string;
      items: { name: string; role: string; hex: string; rgb: string; cmyk: string; body: string }[];
    }
  /** A single row of short points, each with a line icon (target audience, key features). */
  | {
      type: "iconRow";
      heading?: string;
      items: {
        title: string;
        body: string;
        icon: RowIconName;
      }[];
    }
  /** One feature card beside a compact card of measurements, same height. */
  | { type: "featureStats"; feature: { title: string; body: string; image?: Img }; statsTitle?: string; stats: Stat[] }
  /** A picture card beside a text card of the same height. */
  | {
      type: "mediaText";
      image: Img;
      label?: string;
      title: string;
      body: string[];
      /** e.g. a user-testing score, drawn as filled squares */
      rating?: { value: number; max: number; label: string };
    }
  /** A plain list of points, e.g. takeaways. */
  | { type: "list"; heading?: string; items: string[] }
  | { type: "callout"; body: string; label?: string }
  /** Visible placeholder for missing content. Dev-only. */
  | { type: "needed"; items: string[] };

/**
 * Every case study follows the same flow (from Asmi's Greenly document). Chapters
 * are placed into these stages; the label and order come from here, so every
 * project reads the same way. A stage with no material is simply skipped.
 */
export type MetricIcon = "success" | "confusion" | "navigate" | "time";

export const STAGES = [
  { key: "overview", label: "Overview" },
  { key: "process", label: "Process" },
  { key: "research", label: "Research" },
  { key: "problem", label: "Problem" },
  { key: "ideation", label: "Ideation" },
  { key: "solution", label: "Solution" },
  { key: "testing", label: "Testing" },
  { key: "future", label: "Future scope" },
  { key: "takeaways", label: "Takeaways" },
] as const;
export type Stage = (typeof STAGES)[number]["key"];

export type Chapter = {
  /** Unique within the project */
  id: string;
  /** Where this chapter sits in the shared flow */
  stage: Stage;
  /** Editorial chapter title, e.g. "63 people, one question" */
  title: string;
  intro?: string;
  blocks: Block[];
};

/* ───────────────────────────── project ───────────────────────────── */

export type Project = {
  slug: string;
  title: string;
  /** Short subtitle, e.g. "Nurturing confidence through play" */
  subtitle: string;
  /** One sentence: what it is and for whom. */
  oneLiner: string;
  tier: Tier;
  /** Lower numbers come first within a tier. */
  order: number;
  kind: string; // "Capstone · Learning ecosystem"
  year: Maybe<string>;
  duration: Maybe<string>;
  role: Maybe<string>;
  team: {
    solo: boolean;
    /** Collaborators other than Asmi, as credited on Behance or the slides. */
    collaborators?: string[];
    note?: string;
    /** Don't show the solo/team line at all (e.g. an internship). */
    hidden?: boolean;
  };
  disciplines: Discipline[];
  thinking: ThinkingNode[];
  tags: string[];
  tools: string[];
  /** Project accent colour used inside its case study (hex). */
  accent: string;
  cover: Cover;
  /** One real, verifiable number shown on the home page. */
  proofPoint?: string;
  /** The "60-second version". */
  quickRead: {
    problem: string;
    insight: string;
    solution: string;
    result: Maybe<string>;
  };
  chapters: Chapter[];
  contribution: {
    /** Don't show the "My contribution" box for this project. */
    hidden?: boolean;
    /** What Asmi personally did. Critical for recruiters. */
    mine: Maybe<string[]>;
    /** What the wider team did (team projects only). */
    team?: Maybe<string[]>;
  };
  links?: { behance?: string; external?: { label: string; href: string } };
  /** Page background for this case study only (e.g. to match the project document's paper). */
  pageBg?: string;
  /** No case-study page: every link to this project goes to `links.external.href` instead. */
  externalOnly?: boolean;
  seo: { title: string; description: string };
};

/* ───────────────────────────── profile ───────────────────────────── */

export type ExperienceItem = {
  role: string;
  org: string;
  start: string;
  end: string;
  location: string;
  summary: Maybe<string>;
};

export type EducationItem = {
  qualification: string;
  institution: string;
  period: string;
  location?: string;
  note?: string;
};

export type SkillGroup = {
  name: "Think" | "Make" | "Explore";
  /** Industry terms shown on the About page: the stage verb and its discipline label. */
  verb: string;
  label: string;
  blurb: string;
  /** evidence = project slugs; links = other pages that show the skill (e.g. a playground piece). */
  skills: { name: string; evidence?: string[]; links?: { label: string; href: string }[] }[];
};

export type Recognition = { title: string; detail: string; date: string; href?: string };
