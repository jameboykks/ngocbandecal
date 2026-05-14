import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import PageHero from '../components/PageHero';
import { PORTFOLIO, FILTERS, BRANDS } from '../data/site';

const BRAND_FILTERS = ['Tất cả hãng', ...BRANDS.slice(0, 12)];

export default function PortfolioFull() {
  const [tag, setTag] = useState('Tất cả');
  const [brand, setBrand] = useState('Tất cả hãng');
  const [lightbox, setLightbox] = useState<typeof PORTFOLIO[number] | null>(null);

  const items = useMemo(() => {
    return PORTFOLIO.filter(p => {
      const okTag = tag === 'Tất cả' || p.tag === tag;
      const okBrand = brand === 'Tất cả hãng' || p.car.toUpperCase().includes(brand);
      return okTag && okBrand;
    });
  }, [tag, brand]);

  return (
    <>
      <PageHero
        eyebrow="Tác Phẩm"
        title="GALLERY"
        highlight="DỰ ÁN"
        subtitle="Hơn 5.000 chiếc xe đã đi qua xưởng. Đây là một vài tác phẩm tiêu biểu — từ wrap đổi màu sang trọng đến PPF bảo vệ trọn xe."
        crumbs={[{ label: 'Tác phẩm' }]}
      />

      <section className="py-10 border-b border-border-gold/40 bg-bg-secondary">
        <div className="container-x flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          <div>
            <div className="text-[11px] tracking-[0.25em] uppercase text-text-muted mb-2">Lọc theo dịch vụ</div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setTag(f)}
                  className={[
                    'px-4 py-2 text-[11px] tracking-[0.18em] uppercase transition border',
                    tag === f ? 'border-accent text-bg-primary bg-accent' : 'border-border-gold text-text-secondary hover:border-accent hover:text-accent',
                  ].join(' ')}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[11px] tracking-[0.25em] uppercase text-text-muted mb-2">Lọc theo hãng xe</div>
            <select
              value={brand}
              onChange={e => setBrand(e.target.value)}
              className="bg-bg-primary border border-border-gold px-4 py-2 text-sm text-text-primary focus:border-accent outline-none min-w-[200px]"
            >
              {BRAND_FILTERS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>
      </section>

      <section className="section-y bg-bg-primary">
        <div className="container-x">
          {items.length === 0 ? (
            <div className="text-center py-20 text-text-secondary">
              <p className="font-serif italic text-lg">Chưa có tác phẩm phù hợp với bộ lọc — thử kết hợp khác nhé.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] md:auto-rows-[240px] gap-3">
              <AnimatePresence mode="popLayout">
                {items.map((p, i) => (
                  <motion.button
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: Math.min(i * 0.04, 0.4), duration: 0.4 }}
                    onClick={() => setLightbox(p)}
                    className={[
                      'group relative overflow-hidden bg-bg-card cursor-pointer text-left',
                      p.size === 'tall' ? 'row-span-2' : '',
                      p.size === 'wide' ? 'col-span-2' : '',
                    ].join(' ')}
                  >
                    <img src={p.img} alt={p.car} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <span className="absolute inset-0 bg-gradient-to-t from-bg-primary/95 via-bg-primary/40 to-transparent opacity-70 group-hover:opacity-95 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="text-[10px] tracking-[0.25em] uppercase text-accent mb-1">{p.tag}</div>
                      <div className="font-display text-xl tracking-wider text-text-primary">{p.car}</div>
                    </div>
                    <span className="absolute top-3 right-3 w-9 h-9 border border-border-gold rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <ArrowRight size={14} className="text-accent" />
                    </span>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[60] bg-bg-primary/95 flex items-center justify-center p-6"
          >
            <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 p-2 text-text-primary hover:text-accent" aria-label="Close"><X size={28} /></button>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={e => e.stopPropagation()} className="max-w-5xl w-full">
              <img src={lightbox.img} alt={lightbox.car} className="w-full max-h-[75vh] object-contain" />
              <div className="mt-4 text-center">
                <div className="text-[11px] tracking-[0.3em] uppercase text-accent mb-2">{lightbox.tag}</div>
                <div className="font-display text-3xl tracking-wider">{lightbox.car}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
