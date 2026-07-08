import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import PageHero from '../components/PageHero';
import SEO from '../components/SEO';
import JsonLd from '../components/JsonLd';
import { breadcrumbSchema, serviceSchema } from '../utils/schemas';
import { SERVICES, PORTFOLIO, SITE } from '../data/site';

const Zalo = ({ size = 14 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M12 2C6.48 2 2 5.94 2 10.8c0 2.74 1.45 5.18 3.71 6.79L4.93 21l3.62-1.83c1.07.31 2.22.48 3.45.48 5.52 0 10-3.94 10-8.85S17.52 2 12 2Z"/></svg>
);

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const idx = SERVICES.findIndex(s => s.slug === slug);
  const s = SERVICES[idx];
  if (!s) return <Navigate to="/dich-vu" replace />;
  const next = SERVICES[(idx + 1) % SERVICES.length];

  // gallery from portfolio matching this service
  const tagMatch: Record<string, string> = {
    'wrap-doi-mau': 'Wrap đổi màu',
    'dan-ppf': 'PPF',
    'film-cach-nhiet': 'Film cách nhiệt',
    'tem-xe': 'Tem xe',
  };
  const gallery = PORTFOLIO.filter(p => p.tag === tagMatch[s.slug]).slice(0, 6);

  return (
    <>
      <SEO
        title={`${s.title}`}
        description={s.desc}
        path={`/dich-vu/${s.slug}`}
        image={s.cover}
      />
      <JsonLd
        data={[
          serviceSchema(s),
          breadcrumbSchema([
            { label: 'Trang chủ', path: '/' },
            { label: 'Dịch vụ', path: '/dich-vu' },
            { label: s.title, path: `/dich-vu/${s.slug}` },
          ]),
        ]}
      />
      <PageHero
        eyebrow={`Dịch vụ ${s.n}`}
        title={s.title}
        subtitle={s.desc}
        cover={s.cover}
        crumbs={[
          { label: 'Dịch vụ', to: '/dich-vu' },
          { label: s.title },
        ]}
      />

      <section className="section-y bg-bg-primary">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <div className="eyebrow mb-5">Đặc Điểm Nổi Bật</div>
            <h2 className="h-display text-4xl md:text-5xl mb-8">
              VÌ SAO CHỌN <span className="text-gold-gradient">DỊCH VỤ NÀY</span>?
            </h2>
            <ul className="space-y-5 mb-12">
              {s.features.map((f, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <span className="mt-1 w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                    <Check size={14} className="text-accent" />
                  </span>
                  <span className="text-text-primary text-lg leading-relaxed">{f}</span>
                </motion.li>
              ))}
            </ul>

            {gallery.length > 0 && (
              <>
                <div className="eyebrow mb-5 mt-12">Một Số Tác Phẩm</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {gallery.map(g => (
                    <Link key={g.id} to={`/tac-pham/${g.slug}`} className="aspect-square overflow-hidden bg-bg-card group cursor-pointer block">
                      <img src={g.cover ?? g.img} alt={g.title ?? g.car ?? ''} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sticky sidebar */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 bg-bg-card border border-border-gold p-8">
              <div className="text-[11px] tracking-[0.25em] uppercase text-accent mb-2">Giá Tham Khảo</div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-text-secondary">Từ</span>
                <span className="font-display text-5xl text-gold-gradient">{s.priceFrom}</span>
              </div>
              <div className="text-sm text-text-secondary mb-6">VNĐ / xe 4 chỗ</div>
              <p className="text-sm text-text-secondary mb-8 font-serif italic">
                Giá thực tế tuỳ dòng xe và chất liệu lựa chọn. Liên hệ trực tiếp để nhận báo giá chính xác.
              </p>
              <a
                href={`${SITE.zalo}?msg=${encodeURIComponent(`Xin báo giá dịch vụ: ${s.title}`)}`}
                target="_blank"
                rel="noopener"
                className="flex items-center justify-center gap-2 w-full py-4 mb-3 bg-gradient-to-br from-accent-light via-accent to-accent-dark text-bg-primary text-[12px] tracking-[0.25em] uppercase font-semibold hover:shadow-[0_15px_40px_-15px_rgba(201,169,110,0.7)] transition"
              >
                <Zalo size={14} /> Báo Giá Qua Zalo
              </a>

              <div className="mt-8 pt-6 border-t border-border-gold space-y-3 text-sm text-text-secondary">
                <div className="flex justify-between"><span>Thời gian thi công</span><span className="text-text-primary">2-5 ngày</span></div>
                <div className="flex justify-between"><span>Bảo hành</span><span className="text-text-primary">1-10 năm</span></div>
                <div className="flex justify-between"><span>Giảm giá combo</span><span className="text-accent">Liên hệ</span></div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Next service nav */}
      <section className="border-y border-border-gold bg-bg-secondary">
        <div className="container-x flex items-center justify-between py-8 gap-4">
          <Link to="/dich-vu" className="inline-flex items-center gap-2 text-[12px] tracking-[0.25em] uppercase text-text-secondary hover:text-accent transition">
            <ArrowLeft size={14} /> Tất cả dịch vụ
          </Link>
          <Link to={`/dich-vu/${next.slug}`} className="inline-flex items-center gap-3 group">
            <div className="text-right">
              <div className="text-[11px] tracking-[0.25em] uppercase text-text-secondary">Dịch vụ tiếp theo</div>
              <div className="font-display text-lg md:text-xl tracking-wider text-text-primary group-hover:text-accent transition">{next.title}</div>
            </div>
            <ArrowRight size={20} className="text-accent group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </section>
    </>
  );
}
