import { BRANDS } from '../data/site';

export default function BrandMarquee() {
  const items = [...BRANDS, ...BRANDS];
  return (
    <section className="py-12 border-y border-border-gold/30 bg-bg-secondary overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((b, i) => (
          <div key={i} className="flex items-center shrink-0 mx-8">
            <span className="font-display text-2xl md:text-3xl tracking-[0.15em] text-text-secondary hover:text-accent transition">
              {b}
            </span>
            <span className="text-accent/60 ml-16 text-xs">◆</span>
          </div>
        ))}
      </div>
    </section>
  );
}
