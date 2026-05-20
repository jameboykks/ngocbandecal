// Centralized schema.org JSON-LD builders. Each helper returns a plain object
// that <JsonLd data={...} /> serializes. The values come from data/site.ts
// so admin edits to site.json propagate without touching schema code.
import { SITE } from '../data/site';
import type { Post, PortfolioItem } from '../data/site';

const BASE = 'https://www.ngocbandecal.vn';

const abs = (path: string) => (path.startsWith('http') ? path : `${BASE}${path.startsWith('/') ? path : `/${path}`}`);

// Reusable LocalBusiness — referenced as `provider` / `publisher` in other schemas.
// `@id` lets Google de-duplicate this entity across the page.
export const businessRef = () => ({
  '@type': 'LocalBusiness',
  '@id': `${BASE}/#business`,
  name: SITE.fullName,
  alternateName: SITE.name,
  url: BASE,
  telephone: `+84${SITE.hotlineRaw.replace(/^0/, '')}`,
  email: SITE.email,
  image: `${BASE}/images/ngoc-ban/studio-facade-supercars.webp`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '21 Thành Thái, Khuê Trung',
    addressLocality: 'Cẩm Lệ',
    addressRegion: 'Đà Nẵng',
    addressCountry: 'VN',
  },
  areaServed: { '@type': 'City', name: 'Đà Nẵng' },
  priceRange: '$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
  sameAs: [SITE.facebook, SITE.tiktok, SITE.zalo].filter(Boolean),
});

type ServiceLike = { slug: string; title: string; desc: string; cover: string; priceFrom?: string };

export const serviceSchema = (s: ServiceLike) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${BASE}/dich-vu/${s.slug}#service`,
  name: s.title,
  description: s.desc,
  url: `${BASE}/dich-vu/${s.slug}`,
  image: abs(s.cover),
  serviceType: s.title,
  provider: businessRef(),
  areaServed: { '@type': 'City', name: 'Đà Nẵng' },
  ...(s.priceFrom
    ? {
        offers: {
          '@type': 'Offer',
          priceCurrency: 'VND',
          price: s.priceFrom.replace(/\./g, ''),
          availability: 'https://schema.org/InStock',
          url: `${BASE}/dich-vu/${s.slug}`,
        },
      }
    : {}),
});

export const portfolioSchema = (p: PortfolioItem) => {
  const images = (p.gallery?.length ? p.gallery : [p.cover]).map(abs);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${BASE}/tac-pham/${p.slug}#article`,
    headline: p.title,
    description:
      p.description ||
      `${p.title} — tác phẩm ${p.tag.toLowerCase()} thi công tại Ngọc Bàn Decal Đà Nẵng.`,
    image: images,
    url: `${BASE}/tac-pham/${p.slug}`,
    ...(p.date ? { datePublished: p.date, dateModified: p.date } : {}),
    articleSection: p.tag,
    author: { '@type': 'Organization', name: SITE.fullName, url: BASE },
    publisher: businessRef(),
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/tac-pham/${p.slug}` },
  };
};

export const blogPostSchema = (p: Post) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': `${BASE}/blog/${p.slug}#post`,
  headline: p.title,
  description: p.excerpt,
  image: abs(p.cover),
  url: `${BASE}/blog/${p.slug}`,
  datePublished: p.date,
  dateModified: p.date,
  articleSection: p.cat,
  author: { '@type': 'Organization', name: SITE.fullName, url: BASE },
  publisher: businessRef(),
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/blog/${p.slug}` },
});

type Crumb = { label: string; path: string };

export const breadcrumbSchema = (crumbs: Crumb[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.label,
    item: c.path.startsWith('http') ? c.path : `${BASE}${c.path.startsWith('/') ? c.path : `/${c.path}`}`,
  })),
});

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});
