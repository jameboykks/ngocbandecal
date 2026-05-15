import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PORTFOLIO, SHOWCASE } from '../data/site';

// Use admin-curated featured items; fall back to first 6 by id if admin hasn't ticked any.
const featuredItems = PORTFOLIO.filter(p => p.featured);
const FEATURED = (featuredItems.length > 0 ? featuredItems : PORTFOLIO).slice(0, 8);

export default function HorizontalShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  // translate horizontally as user scrolls vertically
  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-78%']);

  return (
    <section id="showcase" ref={ref} className="relative bg-bg-contrast" style={{ height: `${FEATURED.length * 65}vh` }}>
      <div className="absolute inset-0 opacity-25 radial-glow" />
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Heading sticky on left */}
        <div className="absolute left-0 top-0 h-full w-full pointer-events-none">
          <div className="container-x h-full flex flex-col justify-center">
            <div className="max-w-md">
              <div className="eyebrow mb-5">{SHOWCASE.eyebrow}</div>
              <h2 className="h-display text-5xl md:text-6xl mb-5 text-bg-primary">
                {SHOWCASE.headingLine1}<br /><span className="text-gold-gradient">{SHOWCASE.headingLine2}</span>
              </h2>
              <p className="font-serif italic text-bg-primary/65 mb-6">
                {SHOWCASE.description}
              </p>
              <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-bg-primary/45">
                <span className="w-8 h-px bg-accent" />
                {SHOWCASE.scrollHint}
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal track */}
        <motion.div style={{ x }} className="flex gap-6 pl-[44vw] pr-[6vw] will-change-transform">
          {FEATURED.map((p, i) => (
            <div
              key={p.id}
              className="relative shrink-0 w-[70vw] md:w-[55vw] lg:w-[42vw] xl:w-[36vw] aspect-[4/5] overflow-hidden bg-gradient-to-br from-bg-elevated via-bg-card to-steel/20 border border-accent/20 group shadow-[0_35px_90px_-55px_rgba(0,0,0,0.8)]"
              data-cursor="view"
            >
              <img
                src={p.cover ?? p.img}
                alt={p.title ?? p.car ?? ''}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-contrast/95 via-bg-contrast/30 to-transparent" />

              {/* HUD overlay */}
              <div className="absolute top-5 left-5 text-[10px] tracking-[0.3em] uppercase text-accent font-display">
                {String(i + 1).padStart(2, '0')} / {String(FEATURED.length).padStart(2, '0')}
              </div>
              <div className="absolute top-5 right-5 text-[10px] tracking-[0.3em] uppercase text-bg-primary/55">
                {p.tag}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="font-display text-2xl md:text-3xl tracking-wider mb-3 text-bg-primary">{p.title ?? p.car}</h3>
                <Link to={`/tac-pham/${p.slug}`} className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-accent hover:gap-3 transition-all">
                  Xem chi tiết <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}

          {/* End card — CTA */}
          <Link
            to="/tac-pham"
            className="relative shrink-0 w-[70vw] md:w-[55vw] lg:w-[42vw] xl:w-[36vw] aspect-[4/5] flex items-center justify-center bg-gradient-to-br from-accent/20 via-bg-contrast-soft to-bg-contrast border border-accent group"
          >
            <div className="text-center">
              <div className="text-[10px] tracking-[0.3em] uppercase text-accent mb-4">{SHOWCASE.endCardEyebrow}</div>
              <div className="font-display text-4xl md:text-5xl text-gold-gradient mb-4">{SHOWCASE.endCardHeading}</div>
              <div className="inline-flex items-center gap-2 text-sm tracking-[0.25em] uppercase text-bg-primary">
                {SHOWCASE.endCardCTA} <ArrowRight size={16} className="group-hover:translate-x-2 transition" />
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
