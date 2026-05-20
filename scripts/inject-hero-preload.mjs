// Read SITE.heroImage from src/content/site.json and rewrite the
// hero preload <link> in index.html so the browser preloads the
// actual displayed hero (which is admin-editable), not a stale
// default. Runs as prebuild alongside the sitemap generator.
import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SITE_JSON = join(ROOT, 'src/content/site.json');
const INDEX_HTML = join(ROOT, 'index.html');

const site = JSON.parse(await readFile(SITE_JSON, 'utf8'));
const hero = (site.heroImage || '/images/ngoc-ban/studio-facade-supercars.webp').trim();

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
