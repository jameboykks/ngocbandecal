import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Paintbrush, Shield, Sun, PenTool, Sparkles, Wrench } from 'lucide-react';
import { SERVICES } from '../data/site';
import Tilt from './Tilt';

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <Tilt key={s.n} max={6} className="group relative luxury-surface border studio-border overflow-hidden cursor-pointer">
              <div className="absolute inset-x-0 top-0 h-24 overflow-hidden">
                <img
                  src={s.cover}
                  alt=""
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  className="h-full w-full object-cover opacity-45 grayscale-[25%] transition duration-700 group-hover:scale-105 group-hover:opacity-60"
                />
                <span className="absolute inset-0 bg-gradient-to-b from-bg-contrast/30 via-bg-primary/15 to-bg-card" />
                <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
              </div>
              <motion.div
                className="relative z-10 p-10 pt-28"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
              >
                {/* Top gold border on hover */}
                <span className="absolute top-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-accent-light via-accent to-transparent transition-all duration-700" />

                {/* Watermark number */}
                <span className="absolute top-4 right-5 font-display text-[86px] leading-none text-accent/[0.16] select-none pointer-events-none">
                  {s.n}
                </span>

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full border border-border-gold bg-bg-card/85 flex items-center justify-center mb-6 group-hover:border-accent group-hover:bg-accent transition-colors">
                    <Icon size={22} className="text-accent group-hover:text-bg-primary transition-colors" />
                  </div>
                  <h3 className="font-display text-2xl tracking-wider text-text-primary mb-3">
                    {s.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">
                    {s.desc}
                  </p>
                  <Link
                    to={`/dich-vu/${s.slug}`}
                    className="inline-flex items-center gap-2 text-[12px] tracking-[0.25em] uppercase text-accent group-hover:gap-3 transition-all"
                  >
                    Xem chi tiết <ArrowUpRight size={14} />
                  </Link>
                </div>

                {/* Hover glow */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" style={{
                  background: 'radial-gradient(circle at 50% 100%, rgba(201,169,110,0.08), transparent 70%)'
                }} />
              </motion.div>
              </Tilt>
            );
          })}
        </div>
      </div>
    </section>
  );
}
