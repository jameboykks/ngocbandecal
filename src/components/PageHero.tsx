import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

type Crumb = { label: string; to?: string };

export default function PageHero({
  eyebrow,
  title,
  highlight,
  subtitle,
  crumbs = [],
  cover,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  crumbs?: Crumb[];
  cover?: string;
}) {
  return (
    <section className="relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden border-b border-border-gold/40">
      {cover && (
        <>
          <div className="absolute inset-0 opacity-25 bg-cover bg-center" style={{ backgroundImage: `url('${cover}')` }} />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/80 via-bg-primary/90 to-bg-primary" />
        </>
      )}
      <div className="absolute inset-0 radial-glow" />
      <div className="container-x relative z-10">
        <nav className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-text-secondary mb-6">
          <Link to="/" className="hover:text-accent transition flex items-center gap-1.5"><Home size={12} /> Trang chủ</Link>
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-2">
              <ChevronRight size={12} className="text-text-muted" />
              {c.to ? <Link to={c.to} className="hover:text-accent transition">{c.label}</Link> : <span className="text-accent">{c.label}</span>}
            </span>
          ))}
        </nav>
        <div className="eyebrow mb-5">{eyebrow}</div>
        <h1 className="h-display text-5xl md:text-6xl lg:text-8xl mb-6 max-w-4xl">
          {title} {highlight && <span className="text-gold-gradient">{highlight}</span>}
        </h1>
        {subtitle && (
          <p className="font-serif italic text-lg md:text-xl text-text-secondary max-w-3xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
