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
