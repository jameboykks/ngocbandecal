// Generate one JSON file per portfolio item under src/content/portfolio/.
// Pulls source data from src/content/portfolio.json (legacy single-file array)
// and enriches each item with: slug, gallery (4 imgs), specs, description, content.
// Run once (idempotent).
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC = join(ROOT, 'src/content/portfolio.json');
const OUT_DIR = join(ROOT, 'src/content/portfolio');
const IMG_DIR = join(ROOT, 'public/images/ngoc-ban/portfolio');

const stripVi = s =>
  s.normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D');
const slugify = s =>
  stripVi(s).toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

await mkdir(OUT_DIR, { recursive: true });

const data = JSON.parse(await readFile(SRC, 'utf8'));
const items = data.items ?? data;

// Find unused images (p044..p112) for gallery enrichment.
const usedAlready = new Set(items.map(i => i.img));
const allImages = (await readdir(IMG_DIR))
  .filter(f => f.startsWith('p') && f.endsWith('.webp'))
  .sort();
const pool = allImages
  .map(f => `/images/ngoc-ban/portfolio/${f}`)
  .filter(p => !usedAlready.has(p));

// Deterministic shuffle (seedable) — same image set every run for reproducibility.
let seed = 42;
const rng = () => {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
};
const shuffled = [...pool].sort(() => rng() - 0.5);

let cursor = 0;
const pick = (n) => {
  const out = shuffled.slice(cursor, cursor + n);
  cursor += n;
  return out;
};

const tagToService = {
  'Wrap đổi màu': 'Wrap đổi màu ô tô',
  'PPF': 'Dán PPF bảo vệ sơn',
  'Tem xe': 'Thiết kế & dán tem xe',
  'Film cách nhiệt': 'Film cách nhiệt',
};

for (const it of items) {
  const slug = slugify(it.car);
  const extra = pick(3); // 3 random unused images
  const gallery = [it.img, ...extra];

  const out = {
    slug,
    id: it.id,
    title: it.car,                 // dài hơn nếu owner edit
    tag: it.tag,
    cover: it.img,
    gallery,
    size: it.size,
    featured: it.id <= 4,          // 4 đầu là featured
    date: '',                       // owner có thể fill ngày thi công
    specs: [
      { label: 'Dòng xe', value: it.car.split('—')[0].trim() || it.car },
      { label: 'Dịch vụ', value: tagToService[it.tag] ?? it.tag },
      { label: 'Chất liệu', value: 'Liên hệ để biết chi tiết' },
      { label: 'Thời gian thi công', value: '2-3 ngày' },
    ],
    description: `${it.car} — một tác phẩm tiêu biểu của Ngọc Bàn Wrap Decal. Quá trình thi công được thực hiện tỉ mỉ bởi đội ngũ kỹ thuật giàu kinh nghiệm.`,
    content: '',
  };

  const file = join(OUT_DIR, `${slug}.json`);
  await writeFile(file, JSON.stringify(out, null, 2) + '\n', 'utf8');
  console.log(`✓ ${slug}.json (gallery: ${gallery.length} imgs)`);
}

console.log(`\nDone. Generated ${items.length} portfolio item files.`);
