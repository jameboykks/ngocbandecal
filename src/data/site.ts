// Content is sourced from JSON files in ../content/.
// Edit those JSON files (or use the /admin Decap CMS) to change site content.
// This file just re-exports them for compatibility with existing component imports.

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

// Glob-import every blog post JSON; sort newest first.
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
export const STATS = statsData;
export const BRANDS = brandsData;
export const SERVICES = servicesData;
export const PORTFOLIO = portfolioData as PortfolioItem[];
export const BEFORE_AFTER = beforeAfterData;
export const PRICING = pricingData;
export const PROCESS = processData;
export const WHY_US = whyUsData;
export const TESTIMONIALS = testimonialsData;
export const FAQS = faqsData;
export const VIDEOS = videosData;

export const FILTERS = ['Tất cả', 'Wrap đổi màu', 'PPF', 'Tem xe', 'Film cách nhiệt'];

export const POSTS: Post[] = Object.values(postModules)
  .map(m => m.default)
  .sort((a, b) => (a.date < b.date ? 1 : -1));
