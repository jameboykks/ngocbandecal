import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import { SERVICES } from '../data/site';

export default function ServicesList() {
  return (
    <>
      <PageHero
        eyebrow="Dịch vụ Ngọc Bàn"
        title="GIẢI PHÁP TOÀN DIỆN"
        highlight="CHO XE CỦA BẠN"
        subtitle="6 nhóm dịch vụ chính — phục vụ mọi nhu cầu từ wrap đổi màu, dán PPF, film cách nhiệt đến chăm sóc xe chuyên sâu và đồ độ phụ kiện."
        crumbs={[{ label: 'Dịch vụ' }]}
      />

      <section className="section-y bg-bg-primary">
        <div className="container-x">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.6 }}
              >
                <Link
                  to={`/dich-vu/${s.slug}`}
                  className="group block bg-bg-card border border-border-gold overflow-hidden gold-hover-glow"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={s.cover} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent" />
                    <span className="absolute top-4 left-4 font-display text-2xl text-accent">{s.n}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl tracking-wider mb-3">{s.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">{s.desc}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-border-gold">
                      <span className="text-[11px] tracking-[0.2em] uppercase text-text-secondary">Từ <span className="text-gold-gradient font-display text-lg">{s.priceFrom}đ</span></span>
                      <span className="inline-flex items-center gap-1 text-[12px] tracking-[0.25em] uppercase text-accent group-hover:gap-2 transition-all">
                        Chi tiết <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
