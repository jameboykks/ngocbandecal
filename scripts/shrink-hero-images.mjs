// Aggressive squeeze pass 3 for studio images. Lighthouse still flags
// each one as "larger than needed for displayed dimensions (312x234)".
// Drop max width to 900px (covers up to 2x retina at 450px display)
// and quality 60 to cut another 30-40%.
import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const TARGETS = [
  'public/images/ngoc-ban/studio-facade-supercars.webp',
  'public/images/ngoc-ban/studio-workshop-cars.webp',
  'public/images/ngoc-ban/studio-front-lexus.webp',
  'public/images/ngoc-ban/studio-street-front.webp',
];

const MAX_WIDTH = 900;
const QUALITY = 60;

let totalBefore = 0, totalAfter = 0;
for (const rel of TARGETS) {
  const path = join(ROOT, rel);
  try {
    const buf = await readFile(path);
    const out = await sharp(buf)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toBuffer();
    if (out.length < buf.length) {
      await writeFile(path, out);
      totalBefore += buf.length;
      totalAfter += out.length;
      console.log(`✓ ${rel} (${(buf.length/1024).toFixed(0)}KB → ${(out.length/1024).toFixed(0)}KB)`);
    } else {
      console.log(`~ ${rel} (already smaller)`);
    }
  } catch (err) {
    console.error(`✗ ${rel}: ${err.message}`);
  }
}
console.log(`\nSaved ${((totalBefore - totalAfter)/1024).toFixed(0)}KB.`);
