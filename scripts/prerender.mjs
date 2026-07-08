// Post-build prerender: spin up `vite preview`, crawl every public route
// with Puppeteer, and write the fully rendered HTML into dist/<path>/index.html.
// Vercel serves static files before applying rewrites, so Googlebot (and any
// browser with JS disabled) sees the full content immediately.
//
// Runs as `npm postbuild` after `vite build`.
import { spawn } from 'node:child_process';
import { readFile, readdir, writeFile, mkdir, appendFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Dual env: local dev uses full `puppeteer` (ships its own Chromium that
// works on Windows/macOS). Vercel build env is Amazon Linux without
// libnss3 etc, so we swap to puppeteer-core + @sparticuz/chromium which
// bundles a serverless-friendly Chromium with the required shared libs.
const IS_SERVERLESS = !!(process.env.VERCEL || process.env.CI);
const puppeteer = (await import(IS_SERVERLESS ? 'puppeteer-core' : 'puppeteer')).default;
const chromium = IS_SERVERLESS ? (await import('@sparticuz/chromium')).default : null;

// Mirror every log line to disk so we can monitor progress in real time
// (stdout buffering from npm/background harnesses hides per-URL output).
const LOG_FILE = process.env.PRERENDER_LOG || 'prerender.log';
const log = async (...parts) => {
  const line = parts.join(' ');
  console.log(line);
  try { await appendFile(LOG_FILE, line + '\n'); } catch {}
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const PORT = 4318;
const ORIGIN = `http://localhost:${PORT}`;

if (!existsSync(DIST)) {
  console.error('[prerender] dist/ not found — run `vite build` first.');
  process.exit(1);
}

// ──────────────────── URL list (mirrors generate-sitemap.mjs) ────────────────────
const STATIC_ROUTES = [
  '/',
  '/dich-vu',
  '/tac-pham',
  '/bang-gia',
  '/lien-he',
  '/blog',
  '/chinh-sach-bao-mat',
  '/dieu-khoan',
];

async function readSlugDir(dir) {
  try {
    const files = await readdir(dir);
    const slugs = [];
    for (const f of files) {
      if (!f.endsWith('.json')) continue;
      const data = JSON.parse(await readFile(join(dir, f), 'utf8'));
      if (data?.slug) slugs.push(data.slug);
    }
    return slugs;
  } catch {
    return [];
  }
}

const portfolio = await readSlugDir(join(ROOT, 'src/content/portfolio'));
const posts = await readSlugDir(join(ROOT, 'src/content/posts'));
const servicesFile = JSON.parse(await readFile(join(ROOT, 'src/content/services.json'), 'utf8'));
const services = (servicesFile?.items ?? []).filter(s => s.slug).map(s => s.slug);

const urls = [
  ...STATIC_ROUTES,
  ...services.map(s => `/dich-vu/${s}`),
  ...portfolio.map(s => `/tac-pham/${s}`),
  ...posts.map(s => `/blog/${s}`),
];

await log(`[prerender] ${urls.length} URLs to render`);

// ──────────────────── Vite preview server ────────────────────
await log(`[prerender] starting vite preview on :${PORT}...`);
const isWindows = process.platform === 'win32';
const server = spawn(
  isWindows ? 'npx.cmd' : 'npx',
  ['vite', 'preview', '--port', String(PORT), '--strictPort'],
  { cwd: ROOT, stdio: 'pipe', shell: isWindows },
);

// Make sure we never leak the preview server on crash/Ctrl-C
const killServer = () => {
  if (!server.killed) {
    try { server.kill('SIGKILL'); } catch {}
  }
};
process.on('exit', killServer);
process.on('SIGINT', () => { killServer(); process.exit(130); });
process.on('SIGTERM', () => { killServer(); process.exit(143); });
process.on('uncaughtException', err => { killServer(); console.error(err); process.exit(1); });

const serverLog = [];
const stripAnsi = s => s.replace(/\x1b\[[0-9;]*m/g, '');
const onChunk = chunk => serverLog.push(chunk.toString());
server.stdout.on('data', onChunk);
server.stderr.on('data', onChunk);

await new Promise((resolve, reject) => {
  const start = Date.now();
  const tick = () => {
    const joined = stripAnsi(serverLog.join(''));
    if (joined.includes(`localhost:${PORT}`)) return resolve();
    if (Date.now() - start > 15000) {
      return reject(new Error(`preview server timeout. Log:\n${joined}`));
    }
    setTimeout(tick, 100);
  };
  tick();
});
console.log('[prerender] preview server ready');

// ──────────────────── Puppeteer crawl ────────────────────
const browser = await puppeteer.launch(
  IS_SERVERLESS
    ? {
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      }
    : {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      },
);

let ok = 0;
let fail = 0;

// Render URLs concurrently with a small worker pool sharing one browser.
// Prerender time scales with page count (portfolio/blog keep growing), so a
// sequential crawl is the main build bottleneck — a pool of N cuts it ~Nx.
// Tune with PRERENDER_CONCURRENCY; 4 is safe for Vercel build memory.
const CONCURRENCY = Number(process.env.PRERENDER_CONCURRENCY) || 4;

async function renderPage(url) {
  await log(`→ ${url}`);
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900 });

  // Block analytics + heavy third-party so networkidle resolves predictably
  await page.setRequestInterception(true);
  page.on('request', req => {
    const u = req.url();
    if (
      u.includes('googletagmanager.com') ||
      u.includes('google-analytics.com') ||
      u.includes('googleadservices.com') ||
      u.includes('doubleclick.net')
    ) {
      return req.abort();
    }
    req.continue();
  });

  try {
    // `networkidle*` can hang if a page keeps a connection open (gltf loaders,
    // image lazy loading). domcontentloaded + a generous fixed delay is more
    // reliable for a SPA whose initial render is synchronous after JS parse.
    await page.goto(ORIGIN + url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    // Wait for React + framer-motion + initial lazy content to render
    await page.waitForFunction(
      () => document.getElementById('root')?.children.length > 0,
      { timeout: 10000 },
    );
    await new Promise(r => setTimeout(r, 1200));

    // Dedupe head + mark root so client-side main.tsx uses hydrateRoot.
    // React 19's head element hoisting persists tags after component unmount,
    // so route changes during initial render (e.g. <Route path="*" element={<Home />} />
    // briefly matching before the URL is parsed) leak stale title/meta into <head>.
    // Strategy: <title> keep FIRST (React hoists titles at top of head; the page-
    // specific one is rendered first), other meta/canonical keep LAST (React
    // appends them after static index.html tags; the page-specific one ends up last).
    await page.evaluate(() => {
      const head = document.head;
      const titles = [...head.querySelectorAll('title')];
      titles.slice(1).forEach(el => el.remove());

      const dedupeKeepLast = (selector, keyAttr) => {
        const els = [...head.querySelectorAll(selector)];
        const lastByKey = new Map();
        els.forEach(el => lastByKey.set(el.getAttribute(keyAttr), el));
        els.forEach(el => {
          if (lastByKey.get(el.getAttribute(keyAttr)) !== el) el.remove();
        });
      };
      dedupeKeepLast('meta[name]', 'name');
      dedupeKeepLast('meta[property]', 'property');

      const canonicals = [...head.querySelectorAll('link[rel="canonical"]')];
      canonicals.slice(0, -1).forEach(el => el.remove());

      const root = document.getElementById('root');
      if (root) root.setAttribute('data-prerendered', 'true');
    });

    const html = await page.content();
    const outPath =
      url === '/' ? join(DIST, 'index.html') : join(DIST, url, 'index.html');
    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, html, 'utf8');
    await log(`✓ ${url}`);
    ok++;
  } catch (err) {
    await log(`✗ ${url}: ${err.message}`);
    fail++;
  } finally {
    await page.close();
  }
}

try {
  let cursor = 0;
  const worker = async () => {
    while (true) {
      const i = cursor++;
      if (i >= urls.length) break;
      await renderPage(urls[i]);
    }
  };
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, urls.length) }, worker),
  );
} finally {
  await browser.close();
  server.kill();
}

console.log(`\n[prerender] done — ${ok} ok, ${fail} failed`);
if (fail > 0) process.exitCode = 1;
