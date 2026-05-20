// Read SITE.heroImage from src/content/site.json and:
// 1. Aggressively compress the file (admin-uploaded images can be >200KB;
//    on mobile this dominates LCP). Resize to ≤900px @ q60 — covers
//    the desktop container (~800px wide at 56vw) and mobile (~400px).
// 2. Rewrite the hero preload <link> in index.html to point at it.
// Runs as prebuild so every Vercel deploy picks up the latest admin upload.
import { readFile, writeFile, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SITE_JSON = join(ROOT, 'src/content/site.json');
const INDEX_HTML = join(ROOT, 'index.html');

const site = JSON.parse(await readFile(SITE_JSON, 'utf8'));
const hero = (site.heroImage || '/images/ngoc-ban/studio-facade-supercars.webp').trim();

// Squeeze the hero image in place if it's still large and webp-able.
const heroFsPath = join(ROOT, 'public', hero.replace(/^\//, ''));
try {
  const buf = await readFile(heroFsPath);
  const meta = await sharp(buf).metadata();
  // Already small enough? Skip.
  if ((meta.width ?? 0) <= 1000 && buf.length <= 130 * 1024) {
    console.log(`[hero-preload] skip squeeze (${(buf.length / 1024).toFixed(0)}KB ${meta.width}px)`);
  } else {
    const out = await sharp(buf)
      .resize({ width: 900, withoutEnlargement: true })
      .webp({ quality: 60, effort: 6 })
      .toBuffer();
    if (out.length < buf.length) {
      await writeFile(heroFsPath, out);
      console.log(`[hero-preload] squeezed ${(buf.length / 1024).toFixed(0)}KB → ${(out.length / 1024).toFixed(0)}KB`);
    }
  }
} catch (err) {
  console.warn(`[hero-preload] couldn't squeeze ${hero}: ${err.message}`);
}

const html = await readFile(INDEX_HTML, 'utf8');

// Match the existing preload line (any href) and rewrite it.
const re = /<link\s+rel="preload"\s+as="image"\s+href="[^"]*"\s+fetchpriority="high"\s*\/?>/i;
const replacement = `<link rel="preload" as="image" href="${hero}" fetchpriority="high" />`;

let next;
if (re.test(html)) {
  next = html.replace(re, replacement);
  console.log(`[hero-preload] updated → ${hero}`);
} else {
  // First run — insert after the favicon preconnect block.
  next = html.replace(
    /<link rel="dns-prefetch" href="https:\/\/www\.google-analytics\.com"[^>]*\/?>/i,
    `$&\n    <!-- Preload LCP hero image so browser starts fetching before JS hydrates -->\n    ${replacement}`,
  );
  console.log(`[hero-preload] inserted → ${hero}`);
}
await writeFile(INDEX_HTML, next, 'utf8');
