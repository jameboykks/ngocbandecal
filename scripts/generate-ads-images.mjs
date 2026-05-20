// Generate Google Ads ready images (1200×1200 square + 1200×628 landscape)
// from the existing studio + portfolio webp files. Output as JPG so it's
// 100% accepted by Google Ads (.webp support is patchy on some ad formats).
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'public/images/ngoc-ban/ads');
await mkdir(OUT_DIR, { recursive: true });

const SOURCES = [
  { src: 'public/images/ngoc-ban/studio-facade-supercars.webp', name: 'studio-facade' },
  { src: 'public/images/ngoc-ban/studio-workshop-cars.webp',    name: 'studio-workshop' },
  { src: 'public/images/ngoc-ban/studio-front-lexus.webp',      name: 'studio-lexus' },
  { src: 'public/images/ngoc-ban/studio-street-front.webp',     name: 'studio-street' },
  { src: 'public/images/ngoc-ban/uploads/z7826579986632_fa91d4791cf2344d6d04b1e63b58a8a6.webp', name: 'hero-current' },
];

for (const s of SOURCES) {
  const buf = await readFile(join(ROOT, s.src)).catch(() => null);
  if (!buf) { console.log(`✗ skip ${s.name} (not found)`); continue; }

  // Square 1200×1200 — Google "Hình vuông"
  await sharp(buf)
    .resize(1200, 1200, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(OUT_DIR, `${s.name}-square.jpg`));

  // Landscape 1200×628 (≈1.91:1) — Google "Hình ngang"
  await sharp(buf)
    .resize(1200, 628, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(OUT_DIR, `${s.name}-landscape.jpg`));

  console.log(`✓ ${s.name} → square + landscape`);
}

// Logo: 1200×1200 dark backdrop + gold border + text rendered via
// Sharp's Pango text feature (reliable on Vercel/Linux without
// needing Oswald installed — uses whatever sans-serif Pango finds).
const bg = await sharp({
  create: { width: 1200, height: 1200, channels: 4, background: '#17130f' },
}).png().toBuffer();

// Gold border (8px) using a simple stroked rect
const borderSvg = `<svg width="1200" height="1200" xmlns="http://www.w3.org/2000/svg">
  <rect x="60" y="60" width="1080" height="1080" fill="none" stroke="#c9a96e" stroke-width="3"/>
  <rect x="80" y="80" width="1040" height="1040" fill="none" stroke="#a3843a" stroke-width="1"/>
</svg>`;

// Big "NGỌC BÀN" wordmark via Pango (built into libvips → works
// even where TrueType "Oswald" isn't installed).
const wordmark = await sharp({
  text: {
    text: '<span foreground="#dfc693" weight="800" letter_spacing="6144">NGỌC BÀN</span>',
    rgba: true,
    width: 900,
    align: 'center',
    font: 'sans 200',
  },
}).png().toBuffer();

// Subtitle line
const subtitle = await sharp({
  text: {
    text: '<span foreground="#c9a96e" letter_spacing="12288">WRAP DECAL STUDIO</span>',
    rgba: true,
    width: 800,
    align: 'center',
    font: 'sans 56',
  },
}).png().toBuffer();

// Bottom line
const tagline = await sharp({
  text: {
    text: '<span foreground="#dfc693" letter_spacing="10240">ĐÀ NẴNG · TỪ 2017</span>',
    rgba: true,
    width: 700,
    align: 'center',
    font: 'sans 40',
  },
}).png().toBuffer();

// Get heights so we can center vertically
const wmMeta = await sharp(wordmark).metadata();
const subMeta = await sharp(subtitle).metadata();
const tagMeta = await sharp(tagline).metadata();

await sharp(bg)
  .composite([
    { input: Buffer.from(borderSvg), top: 0, left: 0 },
    { input: wordmark, top: Math.round((1200 - wmMeta.height) / 2 - 80), left: Math.round((1200 - wmMeta.width) / 2) },
    { input: subtitle, top: Math.round((1200 - wmMeta.height) / 2 - 80) + wmMeta.height + 30, left: Math.round((1200 - subMeta.width) / 2) },
    { input: Buffer.from(`<svg width="340" height="2"><rect width="340" height="2" fill="#c9a96e"/></svg>`), top: 850, left: 430 },
    { input: tagline, top: 880, left: Math.round((1200 - tagMeta.width) / 2) },
  ])
  .png({ quality: 90 })
  .toFile(join(OUT_DIR, 'logo-1200.png'));

console.log(`✓ logo-1200.png (Pango-rendered, no Oswald dependency)`);
console.log(`\nDone. Files in /public/images/ngoc-ban/ads/`);
