// Content is sourced from JSON files in ../content/.
// Edit those JSON files (or use the /admin Decap CMS) to change site content.
// Each list-style file is wrapped in { "items": [...] } so Decap can edit it
// as a "files" collection — we unwrap the .items here for the components.

import siteData from '../content/site.json';
import statsData from '../content/stats.json';
import brandsData from '../content/brands.json';
import servicesData from '../content/services.json';
import portfolioData from '../content/portfolio.json';
import beforeAfterData from '../content/beforeAfter.json';
import pricingData from '../content/pricing.json';
import processData from '../content/process.json';
import whyUsData from '../content/whyUs.json';
import testimonialsData from '../content/testimonials.json';
import faqsData from '../content/faqs.json';
import videosData from '../content/videos.json';

const postModules = import.meta.glob<{ default: Post }>('../content/posts/*.json', { eager: true });

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

export type PortfolioItem = {
  id: number;
  tag: string;
  car: string;
  img: string;
  size: 'tall' | 'wide' | 'normal';
};

export const SITE = siteData;
export const STATS = statsData.items;
export const BRANDS = brandsData.items.map(b => b.name);
export const SERVICES = servicesData.items;
export const PORTFOLIO = portfolioData.items as PortfolioItem[];
export const BEFORE_AFTER = beforeAfterData.items;
export const PRICING = pricingData.items;
export const PROCESS = processData.items;
export const WHY_US = whyUsData.items;
export const TESTIMONIALS = testimonialsData.items;
export const FAQS = faqsData.items;
export const VIDEOS = videosData.items;

export const FILTERS = ['Tất cả', 'Wrap đổi màu', 'PPF', 'Tem xe', 'Film cách nhiệt'];

export const POSTS: Post[] = Object.values(postModules)
  .map(m => m.default)
  .sort((a, b) => (a.date < b.date ? 1 : -1));
