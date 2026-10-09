/** Contrast helpers so project accents can be used for text without failing WCAG. */

const toRgb = (hex: string) => {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.replace(/./g, "$&$&") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const toHex = (rgb: number[]) => "#" + rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");

const lum = (hex: string) => {
  const [r, g, b] = toRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const contrast = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

/** Darken `hex` toward ink until it reaches `min` contrast against `bg`. */
export function readableOn(hex: string, bg = "#fbf9f4", min = 4.5) {
  const ink = toRgb("#1a1916");
  const base = toRgb(hex);
  for (let t = 0; t <= 1; t += 0.05) {
    const c = toHex(base.map((v, i) => v + (ink[i] - v) * t));
    if (contrast(c, bg) >= min) return c;
  }
  return "#1a1916";
}
