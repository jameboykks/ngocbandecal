import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Paintbrush, Shield, Sun, PenTool, Sparkles, Wrench } from 'lucide-react';
import { SERVICES } from '../data/site';

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  paint: Paintbrush,
  shield: Shield,
  sun: Sun,
  pen: PenTool,
  sparkle: Sparkles,
  wrench: Wrench,
};

export default function Services() {
  return (
    <section id="services" className="section-y bg-bg-primary relative">
      <div className="absolute inset-0 radial-glow opacity-40" />
      <div className="container-x relative z-10">
        <div className="max-w-3xl mb-16">
          <div className="eyebrow mb-5">Dịch Vụ Của Chúng Tôi</div>
          <h2 className="h-display text-5xl md:text-6xl lg:text-7xl mb-6">
            GIẢI PHÁP <span className="text-gold-gradient">TOÀN DIỆN</span><br />CHO XE CỦA BẠN
          </h2>
          <p className="font-serif italic text-lg text-text-secondary">
            Từ wrap đổi màu, dán PPF bảo vệ sơn cho đến chăm sóc xe chuyên sâu — chúng tôi mang đến trải nghiệm
            đẳng cấp showroom ngay tại Đà Nẵng.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <motion.article
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="group relative border studio-border bg-bg-card overflow-hidden flex flex-col h-full"
              >
                {/* Image header — much bigger now, full color, no heavy filter */}
                <Link to={`/dich-vu/${s.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-bg-contrast">
                  <img
                    src={s.cover}
                    alt={s.title}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                  />
                  {/* Subtle bottom gradient for contrast with overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-contrast/80 via-bg-contrast/15 to-transparent" />

                  {/* Number watermark — top-right */}
                  <span className="absolute top-4 right-5 font-display text-[64px] leading-none text-bg-primary/65 select-none pointer-events-none tracking-tight">
                    {s.n}
                  </span>

                  {/* Icon badge — bottom-left, half-overlapping the image edge */}
                  <div className="absolute -bottom-7 left-6 w-14 h-14 rounded-full border border-border-gold bg-bg-card flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-colors duration-500 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)]">
                    <Icon size={22} className="text-accent group-hover:text-bg-primary transition-colors" />
                  </div>

                  {/* Hover gold underline */}
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
                </Link>

                {/* Top gold border on hover */}
                <span className="absolute top-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-accent-light via-accent to-transparent transition-all duration-700 z-10" />

                {/* Content */}
                <div className="relative p-8 pt-12 flex-1 flex flex-col">
                  <h3 className="font-display text-2xl tracking-wider text-text-primary mb-3 text-balance break-words min-h-[3.5rem]">
                    {s.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6 text-balance break-words flex-1">
                    {s.desc}
                  </p>
                  <Link
                    to={`/dich-vu/${s.slug}`}
                    className="inline-flex items-center gap-2 text-[12px] tracking-[0.25em] uppercase text-accent group-hover:gap-3 transition-all mt-auto self-start"
                  >
                    Xem chi tiết <ArrowUpRight size={14} />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
