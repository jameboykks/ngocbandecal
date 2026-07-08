import { BRAND_ITEMS } from '../data/site';

export default function BrandMarquee() {
  const items = [...BRAND_ITEMS, ...BRAND_ITEMS];
  return (
    <section className="py-12 border-y border-border-gold/30 bg-bg-secondary overflow-hidden">
      <div className="flex items-center animate-marquee whitespace-nowrap">
        {items.map((b, i) => (
          <div key={i} className="flex items-center shrink-0 mx-8 md:mx-12">
            {b.logo ? (
              <img
                src={b.logo}
                alt={b.name}
                loading="lazy"
                width={120}
                height={48}
                className="h-11 md:h-16 w-auto object-contain hover:scale-110 transition duration-300"
              />
            ) : (
              <span className="font-display text-2xl md:text-3xl tracking-[0.15em] text-text-secondary hover:text-accent transition">
                {b.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
