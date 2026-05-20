import { lazy, Suspense } from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import BrandMarquee from '../components/BrandMarquee';
import Services from '../components/Services';
import LazyMount from '../components/LazyMount';
import { BEFORE_AFTER } from '../data/site';

// Heavy below-the-fold sections — lazy-imported so they ship in separate chunks,
// then gated by LazyMount so they only mount when the user scrolls near them.
const StudioProof = lazy(() => import('../components/StudioProof'));
const HorizontalShowcase = lazy(() => import('../components/HorizontalShowcase'));
const Configurator3D = lazy(() => import('../components/Configurator3D'));
const BeforeAfter = lazy(() => import('../components/BeforeAfter'));
const Pricing = lazy(() => import('../components/Pricing'));
const QuoteCalculator = lazy(() => import('../components/QuoteCalculator'));
const PinnedProcess = lazy(() => import('../components/PinnedProcess'));
const WhyUs = lazy(() => import('../components/WhyUs'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const Videos = lazy(() => import('../components/Videos'));
const FAQ = lazy(() => import('../components/FAQ'));
const CTA = lazy(() => import('../components/CTA'));

export default function Home() {
  return (
    <>
      <SEO
        title="Ngọc Bàn Wrap Decal Đà Nẵng — Dán PPF, Wrap Đổi Màu, Film Cách Nhiệt"
        description="Trung tâm wrap đổi màu, dán PPF, film cách nhiệt ô tô số 1 Đà Nẵng. 9+ năm kinh nghiệm, 5000+ khách hàng. Hotline 0969.646.801."
        path="/"
      />
      <Hero />
      <BrandMarquee />

      <Suspense fallback={null}>
        <LazyMount minHeight="600px"><StudioProof /></LazyMount>
        <Services />
        <LazyMount minHeight="700px"><HorizontalShowcase /></LazyMount>
        <LazyMount minHeight="900px" rootMargin="400px"><Configurator3D /></LazyMount>
        <LazyMount minHeight="600px"><BeforeAfter items={BEFORE_AFTER} /></LazyMount>
        <LazyMount minHeight="700px"><Pricing /></LazyMount>
        <LazyMount minHeight="500px"><QuoteCalculator /></LazyMount>
        <LazyMount minHeight="600px"><PinnedProcess /></LazyMount>
        <LazyMount minHeight="500px"><WhyUs /></LazyMount>
        <LazyMount minHeight="400px"><Testimonials /></LazyMount>
        <LazyMount minHeight="400px"><Videos /></LazyMount>
        <LazyMount minHeight="400px"><FAQ /></LazyMount>
        <LazyMount minHeight="300px"><CTA /></LazyMount>
      </Suspense>
    </>
  );
}
