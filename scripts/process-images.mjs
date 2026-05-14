// Convert + resize all images from updateimage/ → public/images/ngoc-ban/portfolio/
// HEIC → JPEG via heic-convert; then sharp resize/encode to WebP @ ~1600px.
import { readdir, readFile, writeFile, stat, mkdir } from 'node:fs/promises';
import { join, basename } from 'node:path';
import sharp from 'sharp';
import heicConvert from 'heic-convert';

const SRC = 'd:/Khanh/Support sharing/ngocbandecal/updateimage';
const OUT = 'd:/Khanh/Support sharing/ngocbandecal/web/public/images/ngoc-ban/portfolio';
const MAX_WIDTH = 1600;
const QUALITY = 78;

await mkdir(OUT, { recursive: true });

const files = (await readdir(SRC)).sort();
console.log(`Found ${files.length} files in source.`);

let count = 0;
let totalOut = 0;

for (const file of files) {
  const fullPath = join(SRC, file);
  const ext = file.split('.').pop().toLowerCase();
  const baseName = `p${String(++count).padStart(3, '0')}`;
  const outPath = join(OUT, `${baseName}.webp`);

  try {
    let buf;
    if (ext === 'heic') {
      const heicBuf = await readFile(fullPath);
      const out = await heicConvert({ buffer: heicBuf, format: 'JPEG', quality: 0.92 });
      buf = Buffer.from(out);
    } else {
      buf = await readFile(fullPath);
    }

    const meta = await sharp(buf).metadata();
    const resized = await sharp(buf)
      .rotate() // honor EXIF orientation
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toBuffer();

    await writeFile(outPath, resized);
    const stats = await stat(outPath);
    totalOut += stats.size;
    console.log(`[${count}/${files.length}] ${file} (${meta.width}x${meta.height}) → ${baseName}.webp (${(stats.size/1024).toFixed(0)}KB)`);
  } catch (err) {
    console.error(`✗ Failed: ${file} — ${err.message}`);
  }
}

console.log(`\nDone. Total output: ${(totalOut / 1024 / 1024).toFixed(1)}MB across ${count} files.`);
