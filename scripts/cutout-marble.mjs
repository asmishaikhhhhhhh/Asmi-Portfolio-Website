// Remove a light, low-colour textured background (e.g. a pale lavender marble)
// that a flat-colour cutout can't: every pixel that is both light and nearly
// grey/lavender fades out, with soft edges; coloured or dark artwork stays.
import sharp from "sharp";

export async function cutoutMarble(input, output, { lMin = 196, lFull = 226, cMax = 24, cSoft = 8 } = {}) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const n = info.width * info.height;
  for (let p = 0; p < n; p++) {
    const r = data[p * 4], g = data[p * 4 + 1], b = data[p * 4 + 2];
    const L = 0.299 * r + 0.587 * g + 0.114 * b;
    const chroma = Math.max(r, g, b) - Math.min(r, g, b);
    const warm = r - b; // skin, wood and other warm tones are never background
    const light = Math.min(1, Math.max(0, (L - lMin) / (lFull - lMin)));
    const grey = Math.min(1, Math.max(0, (cMax - chroma) / cSoft));
    const notWarm = warm > 12 ? 0 : 1;
    const bg = light * grey * notWarm;
    data[p * 4 + 3] = Math.round(data[p * 4 + 3] * (1 - bg));
  }
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).webp({ nearLossless: true, quality: 80, alphaQuality: 100 }).toFile(output);
}
