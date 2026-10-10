// Remove the flat page background around a diagram or screenshot without
// touching the artwork: flood-fill from the edges through pixels close to the
// background colour, and turn only those into transparency (with colour-to-alpha
// unblending, so anti-aliased edges stay clean). Saved as near-lossless WebP.
//
//   node scripts/cutout.mjs <in> <out.webp> [left,top,width,height]
import sharp from "sharp";

// global: also clear pixels of the background colour that are enclosed by the
// artwork (letter counters, the inside of loops), not just those reachable
// from the edge. Use with a tight tol so near-white artwork is kept.
export async function cutout(input, output, crop, tol = 16, global = false) {
  let img = sharp(input).ensureAlpha();
  if (crop) img = img.extract(crop);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  // Background = median of the border pixels
  const border = [];
  for (let x = 0; x < W; x++) border.push(x, (H - 1) * W + x);
  for (let y = 0; y < H; y++) border.push(y * W, y * W + W - 1);
  const ch = [0, 1, 2].map((c) => border.map((p) => data[p * 4 + c]).sort((a, b) => a - b)[border.length >> 1]);
  const dist = (p) => Math.max(...[0, 1, 2].map((c) => Math.abs(data[p * 4 + c] - ch[c])));
  const seen = new Uint8Array(W * H);
  const stack = global ? [...Array(W * H).keys()].filter((p) => dist(p) <= tol) : border.filter((p) => dist(p) <= tol);
  stack.forEach((p) => (seen[p] = 1));
  while (stack.length) {
    const p = stack.pop();
    const x = p % W, y = (p / W) | 0;
    for (const q of [x > 0 ? p - 1 : -1, x < W - 1 ? p + 1 : -1, y > 0 ? p - W : -1, y < H - 1 ? p + W : -1]) {
      if (q >= 0 && !seen[q] && dist(q) <= tol) { seen[q] = 1; stack.push(q); }
    }
  }
  // Grow the region by 1px so the anti-aliased rim gets unblended too
  const rim = new Uint8Array(W * H);
  for (let p = 0; p < W * H; p++) {
    if (seen[p]) continue;
    const x = p % W, y = (p / W) | 0;
    if ((x > 0 && seen[p - 1]) || (x < W - 1 && seen[p + 1]) || (y > 0 && seen[p - W]) || (y < H - 1 && seen[p + W])) rim[p] = 1;
  }
  for (let p = 0; p < W * H; p++) {
    if (!seen[p] && !rim[p]) continue;
    // colour-to-alpha against the background
    let a = 0;
    for (let c = 0; c < 3; c++) {
      const v = data[p * 4 + c], b = ch[c];
      a = Math.max(a, v > b ? (v - b) / (255 - b || 1) : (b - v) / (b || 1));
    }
    if (seen[p]) a = Math.min(a, 1);
    if (a <= 0.001) { data[p * 4 + 3] = 0; continue; }
    for (let c = 0; c < 3; c++) {
      const v = data[p * 4 + c], b = ch[c];
      data[p * 4 + c] = Math.max(0, Math.min(255, Math.round((v - b) / a + b)));
    }
    data[p * 4 + 3] = Math.round(a * (data[p * 4 + 3] / 255) * 255);
  }
  await sharp(data, { raw: { width: W, height: H, channels: 4 } }).webp({ nearLossless: true, quality: 80, alphaQuality: 100, effort: 5 }).toFile(output);
  return { W, H, bg: ch };
}

if (process.argv[1]?.endsWith("cutout.mjs") && process.argv[2]) {
  const [, , i, o, c] = process.argv;
  const crop = c ? Object.fromEntries(["left", "top", "width", "height"].map((k, j) => [k, Number(c.split(",")[j])])) : undefined;
  console.log(await cutout(i, o, crop));
}
