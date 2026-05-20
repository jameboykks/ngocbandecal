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

// Simple SVG logo (1200×1200) — gold "NGỌC BÀN" on dark backdrop.
// Used for the optional "Biểu tượng" / logo upload.
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#dfc693"/>
      <stop offset="50%" stop-color="#c9a96e"/>
      <stop offset="100%" stop-color="#a3843a"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="1200" fill="#17130f"/>
  <text x="600" y="540" font-family="'Oswald','Be Vietnam Pro',sans-serif" font-size="180" font-weight="700" text-anchor="middle" fill="url(#g)" letter-spacing="6">NGỌC BÀN</text>
  <text x="600" y="710" font-family="'Be Vietnam Pro',sans-serif" font-size="68" text-anchor="middle" fill="#dfc693" letter-spacing="14">WRAP DECAL STUDIO</text>
  <rect x="430" y="780" width="340" height="2" fill="#c9a96e"/>
  <text x="600" y="850" font-family="'Be Vietnam Pro',sans-serif" font-size="44" text-anchor="middle" fill="#dfc693" opacity="0.7">ĐÀ NẴNG · TỪ 2017</text>
</svg>`;

await sharp(Buffer.from(logoSvg))
  .png({ quality: 90 })
  .toFile(join(OUT_DIR, 'logo-1200.png'));

console.log(`✓ logo-1200.png`);
console.log(`\nDone. Files in /public/images/ngoc-ban/ads/`);
