// Aggressively re-compress the LCP-critical hero/studio images to ≤1200px
// wide at quality 65. They're displayed in a max ~600px container on mobile
// so 1800px source was overkill (~270-370KB each → ~80-150KB).
import { readFile, writeFile, stat } from 'node:fs/promises';
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

const MAX_WIDTH = 1200;
const QUALITY = 65;

let totalBefore = 0, totalAfter = 0;
for (const rel of TARGETS) {
  const path = join(ROOT, rel);
  try {
    const buf = await readFile(path);
    const before = buf.length;
    const out = await sharp(buf)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toBuffer();
    await writeFile(path, out);
    totalBefore += before;
    totalAfter += out.length;
    console.log(`✓ ${rel} (${(before/1024).toFixed(0)}KB → ${(out.length/1024).toFixed(0)}KB)`);
  } catch (err) {
    console.error(`✗ ${rel}: ${err.message}`);
  }
}
console.log(`\nSaved ${((totalBefore - totalAfter)/1024).toFixed(0)}KB across ${TARGETS.length} files.`);
