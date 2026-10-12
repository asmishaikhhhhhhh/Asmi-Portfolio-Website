// Flatten a screen photographed at an angle: map four points on the photo to
// four points on a flat reference, resample with a homography (bilinear), then
// crop and optionally blur. Used to turn device mockups into flat screens,
// e.g. blurred for work under NDA.
//
//   node scripts/unwarp-screen.mjs <in> <out.webp> '<json opts>'
//   opts: { src: [[x,y]×4], dst: [[x,y]×4], crop: [left,top,width,height], blur?: sigma, fill?: [r,g,b] }
import sharp from "sharp";

/** Solve the 3×3 homography H with H·dst ≈ src (8 unknowns, h33 = 1). */
function homography(dst, src) {
  const A = [];
  const b = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = dst[i];
    const [u, v] = src[i];
    A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]);
    b.push(u);
    A.push([0, 0, 0, x, y, 1, -v * x, -v * y]);
    b.push(v);
  }
  // Gaussian elimination with partial pivoting
  const n = 8;
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    [A[c], A[p]] = [A[p], A[c]];
    [b[c], b[p]] = [b[p], b[c]];
    for (let r = c + 1; r < n; r++) {
      const f = A[r][c] / A[c][c];
      for (let k = c; k < n; k++) A[r][k] -= f * A[c][k];
      b[r] -= f * b[c];
    }
  }
  const h = new Array(n);
  for (let r = n - 1; r >= 0; r--) {
    let s = b[r];
    for (let k = r + 1; k < n; k++) s -= A[r][k] * h[k];
    h[r] = s / A[r][r];
  }
  return [...h, 1];
}

export async function unwarp(input, output, { src, dst, crop, blur, fill = [11, 14, 18] }) {
  const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const h = homography(dst, src);
  const [L, T, OW, OH] = crop;
  const out = Buffer.alloc(OW * OH * 3);
  for (let y = 0; y < OH; y++) {
    for (let x = 0; x < OW; x++) {
      const X = x + L;
      const Y = y + T;
      const w = h[6] * X + h[7] * Y + h[8];
      const u = (h[0] * X + h[1] * Y + h[2]) / w;
      const v = (h[3] * X + h[4] * Y + h[5]) / w;
      const o = (y * OW + x) * 3;
      if (u < 0 || v < 0 || u > W - 2 || v > H - 2) {
        out[o] = fill[0];
        out[o + 1] = fill[1];
        out[o + 2] = fill[2];
        continue;
      }
      const x0 = u | 0;
      const y0 = v | 0;
      const fx = u - x0;
      const fy = v - y0;
      for (let c = 0; c < 3; c++) {
        const p = (yy, xx) => data[(yy * W + xx) * 3 + c];
        const top = p(y0, x0) * (1 - fx) + p(y0, x0 + 1) * fx;
        const bot = p(y0 + 1, x0) * (1 - fx) + p(y0 + 1, x0 + 1) * fx;
        out[o + c] = Math.round(top * (1 - fy) + bot * fy);
      }
    }
  }
  let img = sharp(out, { raw: { width: OW, height: OH, channels: 3 } });
  if (blur) img = img.blur(blur);
  await img.webp({ quality: 86 }).toFile(output);
}

if (process.argv[1]?.endsWith("unwarp-screen.mjs")) {
  const [, , input, output, opts] = process.argv;
  await unwarp(input, output, JSON.parse(opts));
}
