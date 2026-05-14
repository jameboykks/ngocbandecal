import { motion } from 'framer-motion';
import { Check, Phone, Sparkles } from 'lucide-react';
import { PRICING, SITE } from '../data/site';

export default function Pricing() {
  return (
    <section id="pricing" className="section-y bg-bg-primary relative">
      <div className="absolute inset-0 radial-glow opacity-50" />
      <div className="container-x relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow mb-5 justify-center">Bảng Giá Tham Khảo</div>
          <h2 className="h-display text-5xl md:text-6xl lg:text-7xl mb-5">
            ĐẦU TƯ <span className="text-gold-gradient">XỨNG ĐÁNG</span><br />CHO CHIẾC XE
          </h2>
          <p className="font-serif italic text-lg text-text-secondary">
            Ba gói dịch vụ phù hợp mọi nhu cầu — từ wrap đổi màu cơ bản đến combo bảo vệ toàn diện đẳng cấp showroom.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {PRICING.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              className={[
                'relative p-8 md:p-10 border transition-all duration-500 group',
                p.featured
                  ? 'border-accent bg-gradient-to-b from-accent/[0.06] to-transparent lg:scale-[1.04] lg:-translate-y-2'
                  : 'border-border-gold bg-bg-card hover:border-accent/60',
              ].join(' ')}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-accent-light to-accent-dark text-bg-primary text-[10px] tracking-[0.25em] uppercase font-bold flex items-center gap-1.5">
                  <Sparkles size={12} /> Phổ Biến Nhất
                </div>
              )}

              <div className="text-[11px] tracking-[0.25em] uppercase text-accent mb-2">{p.sub}</div>
              <h3 className="font-display text-3xl tracking-wider mb-6">{p.name}</h3>

              <div className="mb-8 pb-8 border-b border-border-gold">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-text-secondary text-sm">Từ</span>
                  <span className="font-display text-5xl text-gold-gradient">{p.price}</span>
                </div>
                <div className="text-xs text-text-secondary">{p.unit}</div>
              </div>

              <ul className="space-y-3 mb-10">
                {p.features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm text-text-primary/90">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                      <Check size={12} className="text-accent" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={`tel:${SITE.hotlineRaw}`}
                className={[
                  'flex items-center justify-center gap-2 w-full py-4 text-[12px] tracking-[0.25em] uppercase font-semibold transition',
                  p.featured
                    ? 'bg-gradient-to-br from-accent-light via-accent to-accent-dark text-bg-primary hover:shadow-[0_15px_40px_-15px_rgba(201,169,110,0.7)]'
                    : 'border border-border-gold text-text-primary hover:border-accent hover:text-accent',
                ].join(' ')}
              >
                <Phone size={14} /> Liên Hệ Báo Giá
              </a>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-text-secondary max-w-2xl mx-auto font-serif italic">
          ⚠️ Giá chỉ mang tính tham khảo — giá thực tế tuỳ dòng xe và chất liệu lựa chọn. Vui lòng liên hệ
          để nhận báo giá chính xác cho xe của bạn.
        </p>
      </div>
    </section>
  );
}
