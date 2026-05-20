// Walk public/images/ngoc-ban/, convert every .jpeg/.jpg/.jfif/.png to a
// sibling .webp (≤1800px wide, q=78). Keep originals so nothing breaks if
// a reference is missed; we'll grep + replace JSON/TSX afterwards.
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join, dirname, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TARGET = join(ROOT, 'public/images/ngoc-ban');
const MAX_WIDTH = 1800;
const QUALITY = 78;
const EXT_CONVERT = new Set(['.jpeg', '.jpg', '.jfif', '.png']);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const out = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const files = await walk(TARGET);
let converted = 0, skipped = 0, savedBytes = 0;

for (const file of files) {
  const ext = extname(file).toLowerCase();
  if (!EXT_CONVERT.has(ext)) { skipped++; continue; }

  const outFile = file.slice(0, -ext.length) + '.webp';
  try {
    // Skip if .webp already exists and is newer than source
    try {
      const [srcStat, outStat] = await Promise.all([stat(file), stat(outFile)]);
      if (outStat.mtimeMs >= srcStat.mtimeMs) { skipped++; continue; }
    } catch { /* outFile missing — proceed */ }

    const srcBuf = await readFile(file);
    const srcSize = srcBuf.length;
    const resized = await sharp(srcBuf)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toBuffer();
    await writeFile(outFile, resized);
    const saved = srcSize - resized.length;
    savedBytes += Math.max(0, saved);
    converted++;
    const rel = file.replace(ROOT + '/', '').replace(ROOT + '\\', '');
    console.log(`✓ ${rel} (${(srcSize/1024).toFixed(0)}KB → ${(resized.length/1024).toFixed(0)}KB)`);
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`);
  }
}

console.log(`\nDone. Converted ${converted}, skipped ${skipped}. Saved ~${(savedBytes/1024/1024).toFixed(1)} MB.`);
