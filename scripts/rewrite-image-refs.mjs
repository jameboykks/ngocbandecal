// After convert-to-webp.mjs, swap every .jpeg/.jpg/.jfif/.png reference
// inside /images/ngoc-ban/ to its .webp sibling, across:
//   - src/content/**/*.json
//   - src/**/*.{ts,tsx}
//   - index.html
//   - public/admin/index.html (just in case)
// Only rewrite paths that start with /images/ngoc-ban/ so we don't touch
// unrelated extensions (e.g. icon SVGs or external URLs).
import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Files/dirs to scan
const TARGET_DIRS = [join(ROOT, 'src'), join(ROOT, 'public/admin')];
const TARGET_FILES = [join(ROOT, 'index.html')];

const SCAN_EXTS = new Set(['.json', '.ts', '.tsx', '.html', '.css']);
const RE = /(\/images\/ngoc-ban\/[^"'\s)]+?)\.(jpe?g|jfif|png)\b/gi;

async function walk(dir) {
  const out = [];
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); }
  catch { return out; }
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (SCAN_EXTS.has(extname(e.name).toLowerCase())) out.push(full);
  }
  return out;
}

const allFiles = [];
for (const d of TARGET_DIRS) allFiles.push(...(await walk(d)));
for (const f of TARGET_FILES) {
  try { await stat(f); allFiles.push(f); } catch {}
}

let totalChanges = 0;
let touchedFiles = 0;
for (const f of allFiles) {
  const src = await readFile(f, 'utf8');
  let n = 0;
  const out = src.replace(RE, (_m, base) => { n++; return `${base}.webp`; });
  if (n > 0) {
    await writeFile(f, out, 'utf8');
    totalChanges += n;
    touchedFiles++;
    console.log(`✓ ${f.replace(ROOT + '\\', '').replace(ROOT + '/', '')} (${n} refs)`);
  }
}
console.log(`\nDone. ${totalChanges} refs rewritten across ${touchedFiles} files.`);
