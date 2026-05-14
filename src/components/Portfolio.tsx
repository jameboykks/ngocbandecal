import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { PORTFOLIO, FILTERS } from '../data/site';

export default function Portfolio() {
  const [filter, setFilter] = useState('Tất cả');
  const [lightbox, setLightbox] = useState<typeof PORTFOLIO[number] | null>(null);

  const items = filter === 'Tất cả' ? PORTFOLIO : PORTFOLIO.filter(p => p.tag === filter);

  return (
    <section id="portfolio" className="section-y bg-bg-contrast relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 radial-glow" />
      <div className="container-x relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <div className="eyebrow mb-5">Tác Phẩm Nổi Bật</div>
            <h2 className="h-display text-5xl md:text-6xl lg:text-7xl text-bg-primary">
              GALLERY <span className="text-gold-gradient">DỰ ÁN</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={[
                  'px-4 py-2 text-[11px] tracking-[0.18em] uppercase transition border',
                  filter === f
                    ? 'border-accent text-bg-contrast bg-accent'
                    : 'border-accent/30 text-bg-primary/65 hover:border-accent hover:text-accent',
                ].join(' ')}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3">
          <AnimatePresence mode="popLayout">
            {items.map((p, i) => (
              <motion.button
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05, duration: 0.45 }}
                onClick={() => setLightbox(p)}
                className={[
                  'group relative overflow-hidden bg-gradient-to-br from-bg-elevated via-bg-card to-steel/20 cursor-pointer text-left border border-accent/15',
                  p.size === 'tall' ? 'row-span-2' : '',
                  p.size === 'wide' ? 'col-span-2' : '',
                ].join(' ')}
              >
                <img
                  src={p.img}
                  alt={p.car}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-bg-contrast/95 via-bg-contrast/35 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="text-[10px] tracking-[0.25em] uppercase text-accent mb-1">{p.tag}</div>
                  <div className="font-display text-xl tracking-wider text-bg-primary">{p.car}</div>
                </div>
                <span className="absolute top-3 right-3 w-9 h-9 border border-border-gold rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <ArrowRight size={14} className="text-accent" />
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 border border-accent/35 text-[12px] tracking-[0.25em] uppercase text-bg-primary hover:border-accent hover:text-accent transition"
          >
            Xem Tất Cả Tác Phẩm <ArrowRight size={14} />
          </a>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[60] bg-bg-primary/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 p-2 text-text-primary hover:text-accent"
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full"
            >
              <img src={lightbox.img} alt={lightbox.car} className="w-full max-h-[75vh] object-contain" />
              <div className="mt-4 text-center">
                <div className="text-[11px] tracking-[0.3em] uppercase text-accent mb-2">{lightbox.tag}</div>
                <div className="font-display text-3xl tracking-wider">{lightbox.car}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
