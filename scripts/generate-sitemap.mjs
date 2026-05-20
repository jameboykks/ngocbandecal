// Build-time sitemap generator.
// Reads portfolio + posts + services slugs, writes public/sitemap.xml.
// Triggered by package.json "prebuild" so every Vercel deploy ships
// an up-to-date sitemap.
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SITE = 'https://ngocbandecal.vn';
const today = new Date().toISOString().slice(0, 10);

const STATIC_ROUTES = [
  { path: '/',          changefreq: 'weekly',  priority: '1.0' },
  { path: '/dich-vu',   changefreq: 'monthly', priority: '0.9' },
  { path: '/tac-pham',  changefreq: 'weekly',  priority: '0.9' },
  { path: '/bang-gia',  changefreq: 'monthly', priority: '0.8' },
  { path: '/lien-he',   changefreq: 'yearly',  priority: '0.6' },
  { path: '/blog',      changefreq: 'weekly',  priority: '0.7' },
];

async function readJsonDir(dir) {
  try {
    const files = await readdir(dir);
    const out = [];
    for (const f of files) {
      if (!f.endsWith('.json')) continue;
      const data = JSON.parse(await readFile(join(dir, f), 'utf8'));
      if (data?.slug) out.push(data);
    }
    return out;
  } catch {
    return [];
  }
}

async function readJsonFile(path) {
  try {
    return JSON.parse(await readFile(path, 'utf8'));
  } catch {
    return null;
  }
}

const portfolio = await readJsonDir(join(ROOT, 'src/content/portfolio'));
const posts = await readJsonDir(join(ROOT, 'src/content/posts'));
const servicesFile = await readJsonFile(join(ROOT, 'src/content/services.json'));
const services = servicesFile?.items ?? [];

const urls = [
  ...STATIC_ROUTES.map(r => ({ loc: SITE + r.path, lastmod: today, changefreq: r.changefreq, priority: r.priority })),
  ...services.filter(s => s.slug).map(s => ({
    loc: `${SITE}/dich-vu/${encodeURIComponent(s.slug)}`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.8',
  })),
  ...portfolio.map(p => ({
    loc: `${SITE}/tac-pham/${encodeURIComponent(p.slug)}`,
    lastmod: p.date || today,
    changefreq: 'monthly',
    priority: '0.7',
  })),
  ...posts.map(p => ({
    loc: `${SITE}/blog/${encodeURIComponent(p.slug)}`,
    lastmod: p.date || today,
    changefreq: 'monthly',
    priority: '0.6',
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const outPath = join(ROOT, 'public/sitemap.xml');
await writeFile(outPath, xml, 'utf8');
console.log(`[sitemap] wrote ${urls.length} URLs → public/sitemap.xml`);
