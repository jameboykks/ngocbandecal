import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import PageHero from '../components/PageHero';
import { POSTS } from '../data/site';

export default function Blog() {
  const [feature, ...rest] = POSTS;
  return (
    <>
      <PageHero
        eyebrow="Blog & Tin Tức"
        title="KIẾN THỨC"
        highlight="WRAP DECAL"
        subtitle="Mẹo chọn chất liệu, hướng dẫn chăm sóc xe, xu hướng mới nhất từ thế giới wrap decal — chia sẻ bởi đội ngũ Ngọc Bàn."
        crumbs={[{ label: 'Blog' }]}
      />

      <section className="section-y bg-bg-primary">
        <div className="container-x">
          {/* Featured */}
          <Link to={`/blog/${feature.slug}`} className="group block mb-16">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 aspect-[16/10] overflow-hidden border border-border-gold">
                <img src={feature.cover} alt={feature.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 border border-accent text-accent text-[10px] tracking-[0.25em] uppercase">Featured</span>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-text-secondary">{feature.cat}</span>
                </div>
                <h2 className="h-display text-3xl md:text-5xl mb-5 group-hover:text-accent transition-colors">
                  {feature.title}
                </h2>
                <p className="font-serif italic text-lg text-text-secondary mb-5">{feature.excerpt}</p>
                <div className="flex items-center gap-4 text-[12px] tracking-[0.18em] uppercase text-text-secondary">
                  <span>{feature.date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={12} /> {feature.readTime}</span>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-[12px] tracking-[0.25em] uppercase text-accent group-hover:gap-3 transition-all">
                  Đọc bài viết <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          </Link>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link to={`/blog/${p.slug}`} className="group block">
                  <div className="aspect-[16/10] overflow-hidden border border-border-gold mb-5 bg-bg-card">
                    <img src={p.cover} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  </div>
                  <div className="flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-text-secondary mb-3">
                    <span className="text-accent">{p.cat}</span>
                    <span>•</span>
                    <span>{p.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {p.readTime}</span>
                  </div>
                  <h3 className="font-display text-xl tracking-wider mb-3 group-hover:text-accent transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{p.excerpt}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
