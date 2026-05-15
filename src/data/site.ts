// Content is sourced from JSON files in ../content/.
// Edit those JSON files (or use the /admin Decap CMS) to change site content.
// Each list-style file is wrapped in { "items": [...] } so Decap can edit it
// as a "files" collection — we unwrap the .items here for the components.

import siteData from '../content/site.json';
import statsData from '../content/stats.json';
import brandsData from '../content/brands.json';
import servicesData from '../content/services.json';
import beforeAfterData from '../content/beforeAfter.json';
import pricingData from '../content/pricing.json';
import processData from '../content/process.json';
import whyUsData from '../content/whyUs.json';
import testimonialsData from '../content/testimonials.json';
import faqsData from '../content/faqs.json';
import videosData from '../content/videos.json';

const postModules = import.meta.glob<{ default: Post }>('../content/posts/*.json', { eager: true });
const portfolioModules = import.meta.glob<{ default: PortfolioItem }>('../content/portfolio/*.json', { eager: true });

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  date: string;
  cat: string;
  readTime: string;
  body: string[];
};

export type PortfolioSpec = { label: string; value: string };

export type PortfolioItem = {
  slug: string;
  id: number;
  title: string;
  tag: string;
  cover: string;
  gallery: string[];
  size: 'tall' | 'wide' | 'normal';
  featured?: boolean;
  date?: string;
  specs?: PortfolioSpec[];
  description?: string;
  content?: string;
  /** legacy field — keep optional for old code paths still using it */
  car?: string;
  img?: string;
};

// Single-source-of-truth for "years of experience". Owner edits this in
// /admin > Cài đặt chung; Stats card "Năm kinh nghiệm" + WhyUs card đầu
// đều tự động đồng bộ từ con số này (override JSON gốc bên dưới).
const years = (siteData as { yearsOfExperience?: number }).yearsOfExperience ?? 5;

export const SITE = {
  ...siteData,
  experience: `${years}+ năm kinh nghiệm`,
};

export const STATS = statsData.items.map(s =>
  s.label === 'Năm kinh nghiệm' ? { ...s, value: `${years}+` } : s,
);

export const WHY_US = whyUsData.items.map((w, i) =>
  i === 0 ? { ...w, title: `${years}+ Năm Kinh Nghiệm` } : w,
);

export const BRANDS = brandsData.items.map(b => b.name);
export const SERVICES = servicesData.items;
export const PORTFOLIO: PortfolioItem[] = Object.values(portfolioModules)
  .map(m => {
    const p = m.default;
    // Backward-compat aliases for components still reading `car` / `img`.
    return { ...p, car: p.car ?? p.title, img: p.img ?? p.cover };
  })
  .sort((a, b) => a.id - b.id);
export const BEFORE_AFTER = beforeAfterData.items;
export const PRICING = pricingData.items;
export const PROCESS = processData.items;
export const TESTIMONIALS = testimonialsData.items;
export const FAQS = faqsData.items;
export const VIDEOS = videosData.items;

export const FILTERS = ['Tất cả', 'Wrap đổi màu', 'PPF', 'Tem xe', 'Film cách nhiệt'];

export const POSTS: Post[] = Object.values(postModules)
  .map(m => m.default)
  .sort((a, b) => (a.date < b.date ? 1 : -1));
