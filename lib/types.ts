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

export type Stat = { value: string; label: string; note?: string };

export type Block =
  | { type: "text"; heading?: string; body: string[] }
  | { type: "pullQuote"; quote: string; attribution?: string }
  | { type: "stats"; heading?: string; items: Stat[]; source?: Maybe<string> }
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
  | { type: "hmw"; statement: string; label?: string }
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
  | { type: "image"; image: Img; size?: "full" | "wide" | "inset" }
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
      metrics?: { label: string; before?: string; after: string; better?: boolean; note?: string }[];
      positives?: string[];
      negatives?: string[];
    }
  | { type: "callout"; body: string; label?: string }
  /** Visible placeholder for missing content. Dev-only. */
  | { type: "needed"; items: string[] };

export type Chapter = {
  /** URL hash, e.g. "research" */
  id: string;
  /** Short label for the chapter rail, e.g. "Research" */
  label: string;
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
    /** What Asmi personally did. Critical for recruiters. */
    mine: Maybe<string[]>;
    /** What the wider team did (team projects only). */
    team?: Maybe<string[]>;
  };
  links?: { behance?: string; external?: { label: string; href: string } };
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
