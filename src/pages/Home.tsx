import { lazy, Suspense } from 'react';
import SEO from '../components/SEO';
import JsonLd from '../components/JsonLd';
import { faqSchema } from '../utils/schemas';
import Hero from '../components/Hero';
import BrandMarquee from '../components/BrandMarquee';
import StudioProof from '../components/StudioProof';
import Services from '../components/Services';
import HorizontalShowcase from '../components/HorizontalShowcase';
import StudioDesigner from '../components/StudioDesigner';
import BeforeAfter from '../components/BeforeAfter';
import Pricing from '../components/Pricing';
import QuoteCalculator from '../components/QuoteCalculator';
import PinnedProcess from '../components/PinnedProcess';
import WhyUs from '../components/WhyUs';
import Testimonials from '../components/Testimonials';
import Videos from '../components/Videos';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import LazyMount from '../components/LazyMount';
import { BEFORE_AFTER, FAQS } from '../data/site';

// Configurator3D is by far the heaviest section (Three.js + drei + GLB
// models). Keep it lazy + IntersectionObserver-gated; everything else
// renders inline so PageSpeed sees a complete page above the fold.
const Configurator3D = lazy(() => import('../components/Configurator3D'));

export default function Home() {
  return (
    <>
      <SEO
        title="Ngọc Bàn Wrap Decal Đà Nẵng — Dán PPF, Wrap Đổi Màu, Film Cách Nhiệt"
        description="Trung tâm wrap đổi màu, dán PPF, film cách nhiệt ô tô số 1 Đà Nẵng. 9+ năm kinh nghiệm, 5000+ khách hàng. Hotline 0969.646.801."
        path="/"
      />
      <JsonLd data={faqSchema(FAQS)} />
      <Hero />
      <BrandMarquee />
      <StudioProof />
      <Services />
      <HorizontalShowcase />
      <StudioDesigner />
      <LazyMount minHeight="900px" rootMargin="600px">
        <Suspense fallback={null}>
          <Configurator3D />
        </Suspense>
      </LazyMount>
      <BeforeAfter items={BEFORE_AFTER} />
      <Pricing />
      <QuoteCalculator />
      <PinnedProcess />
      <WhyUs />
      <Testimonials />
      <Videos />
      <FAQ />
      <CTA />
    </>
  );
}
