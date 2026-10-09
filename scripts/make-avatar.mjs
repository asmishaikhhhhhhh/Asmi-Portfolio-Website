// Creates the round hero avatar from any photo.
// Usage: npm run avatar -- "/path/to/photo.jpg" [focusX 0–1] [focusY 0–1] [zoom]
//   focusX/focusY = where the face is (default 0.5, 0.42); zoom = 1 uses the largest square.
import sharp from "sharp";

const [src, fx = "0.5", fy = "0.42", zoom = "1.35"] = process.argv.slice(2);
if (!src) {
  console.error('Usage: npm run avatar -- "/path/to/photo.jpg" [focusX] [focusY] [zoom]');
  process.exit(1);
}
const img = sharp(src).rotate();
const { width, height } = await img.metadata();
const side = Math.round(Math.min(width, height) / Number(zoom));
const left = Math.max(0, Math.min(width - side, Math.round(width * Number(fx) - side / 2)));
const top = Math.max(0, Math.min(height - side, Math.round(height * Number(fy) - side / 2)));
await img.extract({ left, top, width: side, height: side }).resize(480, 480).webp({ quality: 84 }).toFile("public/images/about/avatar.webp");
console.log(`avatar.webp written (crop ${side}px at ${left},${top}). Run npm run images next.`);
