/**
 * Streaming re-releases in 2024, by platform, month and IMDB rating.
 *
 * Re-plotted from Asmi's original Tableau visualisation: each point is one
 * movie (bubble size = IMDB rating). Ratings were read off the chart, so they
 * are approximate (±0.2). Replace with the source dataset for exact values and
 * titles; the chart reads everything from here.
 */
export type Platform = "Amazon" | "Netflix" | "Others";
export type Release = { platform: Platform; month: number; rating: number; title?: string };

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

/** Month colours from the original legend. */
export const MONTH_COLORS = [
  "#6f8fb3", "#d8c2b6", "#f0b2b6", "#f8c597", "#b685ad", "#9fcf86",
  "#b9a35a", "#e2db74", "#b5d6ee", "#8fbcb2", "#e38aa6", "#f39f7c",
];

const r = (platform: Platform, month: number, ...ratings: number[]): Release[] =>
  ratings.map((rating) => ({ platform, month, rating }));

export const releases: Release[] = [
  // Amazon (no releases in January or October)
  ...r("Amazon", 2, 6.2),
  ...r("Amazon", 3, 7.6, 7.0, 5.8, 4.8),
  ...r("Amazon", 4, 8.0, 3.8),
  ...r("Amazon", 5, 7.4),
  ...r("Amazon", 6, 7.8, 6.2),
  ...r("Amazon", 7, 4.7),
  ...r("Amazon", 8, 6.9, 6.6),
  ...r("Amazon", 9, 5.1),
  ...r("Amazon", 11, 7.2, 4.9),
  ...r("Amazon", 12, 7.4),
  // Netflix (no releases in December)
  ...r("Netflix", 1, 6.9, 6.2),
  ...r("Netflix", 2, 7.8, 6.1),
  ...r("Netflix", 3, 8.3, 6.5, 5.8, 5.4),
  ...r("Netflix", 4, 7.8, 3.9),
  ...r("Netflix", 5, 7.4, 6.2, 5.9, 5.0),
  ...r("Netflix", 6, 6.5, 6.3, 6.2),
  ...r("Netflix", 7, 6.2),
  ...r("Netflix", 8, 6.4, 6.0, 5.9),
  ...r("Netflix", 9, 7.1, 6.0),
  ...r("Netflix", 10, 6.4, 6.2, 6.1, 5.3),
  ...r("Netflix", 11, 6.1, 6.0, 4.8),
  // Others
  ...r("Others", 1, 7.0, 6.2),
  ...r("Others", 2, 5.4, 4.8),
  ...r("Others", 3, 7.8, 6.6),
  ...r("Others", 4, 9.3, 6.7),
  ...r("Others", 5, 6.9),
  ...r("Others", 6, 8.3, 8.0, 6.6, 5.9),
  ...r("Others", 7, 7.5, 2.9),
  ...r("Others", 8, 7.8, 6.1),
  ...r("Others", 9, 7.5, 5.8),
  ...r("Others", 10, 8.6, 6.7, 4.5),
  ...r("Others", 11, 6.6),
  ...r("Others", 12, 6.2),
];

/** Asmi's own description of the visualisation. */
export const description =
  "The visualization shows how Netflix, Amazon, and others supplemented theatrical releases in 2024, revealing trends like March’s peak re-releases, platform-specific gaps, and the link between IMDB ratings, release months, and audience preferences.";

/** Annotations from the original chart. */
export const notes: { platform: Platform; month: number; text: string }[] = [
  { platform: "Amazon", month: 1, text: "Amazon had no releases in January" },
  { platform: "Amazon", month: 10, text: "Amazon had no releases in October" },
  { platform: "Netflix", month: 12, text: "Netflix had no releases in December" },
];
