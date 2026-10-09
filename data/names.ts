/**
 * "Asmi Shaikh" in the scripts of India, for the hero name rotation.
 *
 * Languages that share a script appear once with a combined label (e.g. Hindi and
 * Marathi both use Devanagari). `font` is a Google Fonts family; only the glyphs
 * in `text` are downloaded (via the `text=` parameter), so each script costs a
 * few KB and loads after the page is interactive.
 *
 * `verified: false` = transliteration not yet checked by a native speaker.
 * Scripts with `verified: false` stay in the rotation, but double-check them
 * before launch.
 */
export type NameScript = {
  text: string;
  /** Language(s) shown in the caption. */
  languages: string;
  script: string;
  /** BCP-47 tag for the `lang` attribute (correct shaping + screen readers). */
  lang: string;
  dir?: "rtl";
  font?: string;
  /**
   * Size relative to the display size, chosen so every script reads at the same
   * visual size: min(80 / inkHeight, 400 / width), with both measured at 100px.
   * Re-measure if you change a spelling or font.
   */
  scale?: number;
  /** Vertical nudge in em, for scripts whose glyphs sit low (Nastaliq). */
  shift?: number;
  verified: boolean;
};

export const nameScripts: NameScript[] = [
  { text: "Asmi Shaikh", languages: "English", script: "Latin", lang: "en", scale: 0.82, verified: true },
  { text: "अस्मी शेख", languages: "Hindi · Marathi", script: "Devanagari", lang: "hi", font: "Noto Serif Devanagari", scale: 0.88, verified: false },
  { text: "اسمی شیخ", languages: "Urdu", script: "Nastaliq", lang: "ur", dir: "rtl", font: "Noto Nastaliq Urdu", scale: 0.5, verified: false },
  { text: "અસ્મી શેખ", languages: "Gujarati", script: "Gujarati", lang: "gu", font: "Noto Serif Gujarati", scale: 0.88, verified: false },
  { text: "অস্মি শেখ", languages: "Bengali · Assamese", script: "Bengali–Assamese", lang: "bn", font: "Noto Serif Bengali", scale: 0.84, verified: false },
  { text: "ਅਸਮੀ ਸ਼ੇਖ਼", languages: "Punjabi", script: "Gurmukhi", lang: "pa", font: "Noto Serif Gurmukhi", scale: 0.81, verified: false },
  { text: "ଅସ୍ମି ଶେଖ", languages: "Odia", script: "Odia", lang: "or", font: "Noto Serif Oriya", scale: 0.7, verified: false },
  { text: "அஸ்மி ஷேக்", languages: "Tamil", script: "Tamil", lang: "ta", font: "Noto Serif Tamil", scale: 0.55, verified: false },
  { text: "అస్మి షేక్", languages: "Telugu", script: "Telugu", lang: "te", font: "Noto Serif Telugu", scale: 0.66, verified: false },
  { text: "ಅಸ್ಮಿ ಶೇಖ್", languages: "Kannada", script: "Kannada", lang: "kn", font: "Noto Serif Kannada", scale: 0.66, verified: false },
  { text: "അസ്മി ഷെയ്ഖ്", languages: "Malayalam", script: "Malayalam", lang: "ml", font: "Noto Serif Malayalam", scale: 0.52, verified: false },
  { text: "ᱟᱥᱢᱤ ᱥᱮᱠᱷ", languages: "Santali", script: "Ol Chiki", lang: "sat", font: "Noto Sans Ol Chiki", scale: 0.76, verified: false },
  { text: "ꯑꯁꯃꯤ ꯁꯦꯈ", languages: "Manipuri", script: "Meitei Mayek", lang: "mni", font: "Noto Sans Meetei Mayek", scale: 0.81, verified: false },
];
