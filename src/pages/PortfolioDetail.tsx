import { useMemo, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Phone, X, ZoomIn } from 'lucide-react';
import PageHero from '../components/PageHero';
import { PORTFOLIO, SITE } from '../data/site';

export default function PortfolioDetail() {
  const { slug } = useParams<{ slug: string }>();
  const idx = PORTFOLIO.findIndex(p => p.slug === slug);
  const item = PORTFOLIO[idx];

  // Hooks must run before any early return
  const [activeImg, setActiveImg] = useState(0);
  const [zoom, setZoom] = useState(false);

  const related = useMemo(() => {
    if (!item) return [];
    return PORTFOLIO.filter(p => p.tag === item.tag && p.slug !== item.slug).slice(0, 3);
  }, [item]);

  if (!item) return <Navigate to="/tac-pham" replace />;

  const prev = PORTFOLIO[(idx - 1 + PORTFOLIO.length) % PORTFOLIO.length];
  const next = PORTFOLIO[(idx + 1) % PORTFOLIO.length];
  const gallery = item.gallery?.length ? item.gallery : [item.cover];
  const mainImg = gallery[Math.min(activeImg, gallery.length - 1)];

  return (
    <>
      <PageHero
        eyebrow={item.tag}
        title={item.title}
        crumbs={[
          { label: 'Tác phẩm', to: '/tac-pham' },
          { label: item.tag },
        ]}
      />

      <section className="section-y bg-bg-primary">
        <div className="container-x grid lg:grid-cols-12 gap-10">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <button
              onClick={() => setZoom(true)}
              data-cursor="view"
              className="group relative block w-full aspect-[16/11] overflow-hidden border border-border-gold bg-bg-card"
              aria-label="Phóng to ảnh"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={mainImg}
                  src={mainImg}
                  alt={item.title}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <span className="absolute inset-0 bg-bg-primary/0 group-hover:bg-bg-primary/30 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity w-14 h-14 rounded-full bg-accent text-bg-primary flex items-center justify-center">
                  <ZoomIn size={20} />
                </span>
              </span>
            </button>

            {/* Thumbnail strip */}
            {gallery.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-2">
                {gallery.map((src, i) => (
                  <button
                    key={src + i}
                    onClick={() => setActiveImg(i)}
                    data-cursor="link"
                    className={[
                      'aspect-[4/3] overflow-hidden border transition-all',
                      i === activeImg
                        ? 'border-accent ring-1 ring-accent'
                        : 'border-border-gold/40 hover:border-accent/70 opacity-70 hover:opacity-100',
                    ].join(' ')}
                  >
                    <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar — specs + CTA */}
          <aside className="lg:col-span-5">
            <div className="sticky top-28 bg-bg-card border border-border-gold p-7">
              <div className="text-[11px] tracking-[0.25em] uppercase text-accent mb-2">{item.tag}</div>
              <h2 className="font-display text-3xl md:text-4xl tracking-wider mb-5">{item.title}</h2>

              {item.description && (
                <p className="text-text-secondary leading-relaxed mb-6 font-serif italic">
                  {item.description}
                </p>
              )}

              {item.specs && item.specs.length > 0 && (
                <dl className="border-t border-border-gold pt-5 mb-7 space-y-3">
                  {item.specs.map(s => (
                    <div key={s.label} className="flex justify-between gap-4 text-sm">
                      <dt className="text-text-muted uppercase tracking-[0.18em] text-[11px] pt-0.5 shrink-0">{s.label}</dt>
                      <dd className="text-text-primary text-right">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <a
                href={`tel:${SITE.hotlineRaw}`}
                data-cursor="link"
                className="flex items-center justify-center gap-2 w-full py-4 mb-3 bg-gradient-to-br from-accent-light via-accent to-accent-dark text-bg-primary text-[12px] tracking-[0.25em] uppercase font-semibold hover:shadow-[0_15px_40px_-15px_rgba(201,169,110,0.7)] transition"
              >
                <Phone size={14} /> Báo Giá Cho Xe Của Bạn
              </a>
              <a
                href={SITE.zalo}
                target="_blank"
                rel="noopener"
                data-cursor="link"
                className="flex items-center justify-center gap-2 w-full py-4 border border-border-gold text-text-primary text-[12px] tracking-[0.25em] uppercase hover:border-accent hover:text-accent transition"
              >
                Chat Zalo Tư Vấn
              </a>
            </div>
          </aside>
        </div>

        {/* Long-form content */}
        {item.content && item.content.trim().length > 0 && (
          <div className="container-x mt-16">
            <div className="max-w-3xl mx-auto">
              <div className="eyebrow mb-5">Chi Tiết Quá Trình</div>
              <div className="space-y-5 text-lg leading-relaxed text-text-primary">
                {item.content.split(/\n\s*\n/).map((para, i) => (
                  <p key={i} className="whitespace-pre-line">{para}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Prev/Next */}
      <section className="border-y border-border-gold bg-bg-secondary">
        <div className="container-x flex items-center justify-between gap-4 py-8">
          <Link to={`/tac-pham/${prev.slug}`} className="inline-flex items-center gap-3 group min-w-0">
            <ArrowLeft size={20} className="text-accent shrink-0 group-hover:-translate-x-1 transition" />
            <div className="min-w-0">
              <div className="text-[11px] tracking-[0.25em] uppercase text-text-secondary">Tác phẩm trước</div>
              <div className="font-display text-base md:text-lg tracking-wider text-text-primary group-hover:text-accent transition truncate">
                {prev.title}
              </div>
            </div>
          </Link>
          <Link to="/tac-pham" className="hidden sm:inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-text-secondary hover:text-accent transition shrink-0">
            Tất cả tác phẩm
          </Link>
          <Link to={`/tac-pham/${next.slug}`} className="inline-flex items-center gap-3 group min-w-0 text-right">
            <div className="min-w-0">
              <div className="text-[11px] tracking-[0.25em] uppercase text-text-secondary">Tác phẩm tiếp</div>
              <div className="font-display text-base md:text-lg tracking-wider text-text-primary group-hover:text-accent transition truncate">
                {next.title}
              </div>
            </div>
            <ArrowRight size={20} className="text-accent shrink-0 group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section-y bg-bg-primary">
          <div className="container-x">
            <div className="flex items-end justify-between mb-8">
              <h3 className="h-display text-3xl md:text-4xl">
                CÙNG <span className="text-gold-gradient">CHỦ ĐỀ</span>
              </h3>
              <Link to="/tac-pham" className="hidden md:inline-flex items-center gap-2 text-[12px] tracking-[0.25em] uppercase text-text-secondary hover:text-accent transition">
                Xem tất cả <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map(r => (
                <Link key={r.slug} to={`/tac-pham/${r.slug}`} className="group block">
                  <div className="aspect-[4/3] overflow-hidden border border-border-gold mb-3 bg-bg-card">
                    <img src={r.cover} alt={r.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="text-[10px] tracking-[0.25em] uppercase text-accent mb-1">{r.tag}</div>
                  <div className="font-display text-lg tracking-wider group-hover:text-accent transition">{r.title}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setZoom(false)}
            className="fixed inset-0 z-[60] bg-bg-primary/95 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <button
              onClick={() => setZoom(false)}
              className="absolute top-6 right-6 p-2 text-text-primary hover:text-accent z-10"
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <motion.img
              key={mainImg}
              src={mainImg}
              alt={item.title}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] max-w-[92vw] object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
