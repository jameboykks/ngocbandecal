import SEO from '../components/SEO';
import Hero from '../components/Hero';
import BrandMarquee from '../components/BrandMarquee';
import StudioProof from '../components/StudioProof';
import Services from '../components/Services';
import HorizontalShowcase from '../components/HorizontalShowcase';
import Configurator3D from '../components/Configurator3D';
import BeforeAfter from '../components/BeforeAfter';
import Pricing from '../components/Pricing';
import QuoteCalculator from '../components/QuoteCalculator';
import PinnedProcess from '../components/PinnedProcess';
import WhyUs from '../components/WhyUs';
import Testimonials from '../components/Testimonials';
import Videos from '../components/Videos';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import { BEFORE_AFTER } from '../data/site';

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
      <StudioProof />
      <Services />
      <HorizontalShowcase />
      <Configurator3D />
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
