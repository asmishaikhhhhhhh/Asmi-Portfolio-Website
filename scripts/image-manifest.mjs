// Generates data/image-manifest.json with intrinsic sizes for every image in /public/images.
// Run after adding or replacing images: `npm run images`
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('public');
const out = {};
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (/\.(webp|jpe?g|png|avif)$/i.test(f)) out['/' + path.relative(root, p).split(path.sep).join('/')] = p;
  }
}
walk(path.join(root, 'images'));
const manifest = {};
for (const [url, file] of Object.entries(out).sort()) {
  const { width, height } = await sharp(file).metadata();
  manifest[url] = { w: width, h: height };
}
fs.writeFileSync('data/image-manifest.json', JSON.stringify(manifest, null, 0));
console.log(`image-manifest: ${Object.keys(manifest).length} images`);
