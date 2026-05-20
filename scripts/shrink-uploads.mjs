// Round 2 image squeeze for /uploads/ specifically. These are portfolio
// thumbnails (≤300px on mobile grid) + lightbox/detail (≤1200px), so 1800px
// q78 sources are wasteful. Re-encode in place at ≤1400px q70.
import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIR = join(ROOT, 'public/images/ngoc-ban/uploads');
const MAX_WIDTH = 1400;
const QUALITY = 70;

const files = (await readdir(DIR)).filter(f => extname(f).toLowerCase() === '.webp');
let totalBefore = 0, totalAfter = 0, touched = 0, skipped = 0;
for (const f of files) {
  const path = join(DIR, f);
  try {
    const buf = await readFile(path);
    const meta = await sharp(buf).metadata();
    // Skip if already small enough (≤900px and ≤200KB)
    if ((meta.width ?? 0) <= 900 && buf.length <= 200 * 1024) { skipped++; continue; }
    const out = await sharp(buf)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toBuffer();
    // Only overwrite if smaller (otherwise we just wasted quality)
    if (out.length < buf.length * 0.95) {
      await writeFile(path, out);
      totalBefore += buf.length;
      totalAfter += out.length;
      touched++;
    } else {
      skipped++;
    }
  } catch (err) {
    console.error(`✗ ${f}: ${err.message}`);
  }
}
console.log(`\nTouched ${touched}, skipped ${skipped}.`);
console.log(`Saved ${((totalBefore - totalAfter)/1024/1024).toFixed(1)} MB.`);
