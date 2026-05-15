// Split content/portfolio.json (1 array) into individual files content/portfolio/<slug>.json
// Each file gets: slug, title, tag, cover, gallery (cover + 3 unused images), size, featured, specs, description.
// Used images set is global so 16 items × 3 = 48 unique extra images picked from p044..p112.
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = 'd:/Khanh/Support sharing/ngocbandecal/web';
const SRC  = join(ROOT, 'src/content/portfolio.json');
const OUT  = join(ROOT, 'src/content/portfolio');

// Diacritic-safe Vietnamese → ASCII slug
function slugify(s) {
  return s
    .normalize('NFD').replace(/\p{Diacritic}/gu, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/—/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const data = JSON.parse(await readFile(SRC, 'utf-8'));
const items = data.items;

// Collect already-used images, then build pool of unused (p044..p112)
const used = new Set(items.map(i => i.img));
const pool = [];
for (let n = 44; n <= 112; n++) {
  const path = `/images/ngoc-ban/portfolio/p${String(n).padStart(3, '0')}.webp`;
  if (!used.has(path)) pool.push(path);
}
// Shuffle
for (let i = pool.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [pool[i], pool[j]] = [pool[j], pool[i]];
}

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

let pIdx = 0;
const written = [];
for (const item of items) {
  const slug = slugify(item.car);
  const extras = pool.slice(pIdx, pIdx + 3);
  pIdx += 3;
  const gallery = [item.img, ...extras];

  const out = {
    slug,
    id: item.id,
    tag: item.tag,
    title: item.car,
    car: item.car,
    cover: item.img,
    gallery,
    size: item.size,
    featured: item.id <= 4,
    specs: [
      { label: 'Dòng xe',           value: item.car.split('—')[0].trim() },
      { label: 'Dịch vụ',           value: item.tag },
      { label: 'Chất liệu',         value: 'Liên hệ Ngọc Bàn để biết chi tiết' },
      { label: 'Thời gian thi công', value: 'Liên hệ' },
    ],
    description:
      `${item.car} — một trong những tác phẩm nổi bật được thực hiện tại Ngọc Bàn Wrap Decal.\n\n` +
      `Đội ngũ kỹ thuật của chúng tôi đã tỉ mỉ thi công từng chi tiết, sử dụng chất liệu chính hãng để đảm bảo độ bền và thẩm mỹ tối đa cho chiếc ${item.car.split('—')[0].trim()}.\n\n` +
      `Liên hệ Ngọc Bàn để được tư vấn chi tiết về dịch vụ ${item.tag.toLowerCase()} cho xe của bạn.`,
  };

  const file = join(OUT, `${slug}.json`);
  await writeFile(file, JSON.stringify(out, null, 2) + '\n', 'utf-8');
  written.push(`${slug}.json (gallery: ${gallery.length})`);
}

console.log(`Wrote ${written.length} portfolio files to ${OUT}:`);
written.forEach(w => console.log(' -', w));
