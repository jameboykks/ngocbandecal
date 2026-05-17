import { motion } from 'framer-motion';
import { Trophy, Shield, Hand, FileCheck } from 'lucide-react';
import { WHY_US } from '../data/site';

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  trophy: Trophy,
  shield: Shield,
  hand: Hand,
  doc: FileCheck,
};

export default function WhyUs() {
  return (
    <section className="section-y bg-bg-primary relative overflow-hidden">
      {/* Background image with overlay (no bg-fixed — causes jank on Windows) */}
      <div
        className="absolute inset-0 opacity-[0.08] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/ngoc-ban/studio-front-lexus.jpeg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-primary/95 to-bg-primary" />

      <div className="container-x relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 charcoal-panel border border-accent/25 p-8 lg:p-10">
            <div className="eyebrow mb-5">Vì Sao Chọn Ngọc Bàn?</div>
            <h2 className="h-display text-5xl md:text-6xl lg:text-7xl mb-6 text-bg-primary">
              CHẤT LƯỢNG <br />
              <span className="text-gold-gradient">LÀM NÊN</span> THƯƠNG HIỆU
            </h2>
            <p className="font-serif italic text-lg text-bg-primary/68 leading-relaxed mb-8">
              Hơn 5.000 khách hàng đã tin tưởng — không phải ngẫu nhiên. Đó là kết quả của sự tỉ mỉ trong từng đường cắt, sự
              minh bạch trong báo giá, và cam kết chất lượng bằng văn bản bảo hành dài hạn.
            </p>
            <div className="inline-flex items-center gap-3 px-5 py-3 border border-accent/30">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[12px] tracking-[0.25em] uppercase text-bg-primary/65">
                Đang phục vụ khách tại Đà Nẵng & Miền Trung
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4 items-stretch">
            {WHY_US.map((w, i) => {
              const Icon = ICONS[w.icon];
              return (
                <motion.div
                  key={w.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className={[
                    'p-7 border studio-border gold-hover-glow group h-full flex flex-col',
                    i % 2 === 0 ? 'luxury-surface' : 'bg-bg-elevated',
                  ].join(' ')}
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent transition-colors shrink-0">
                    <Icon size={20} className="text-accent group-hover:text-bg-primary transition-colors" />
                  </div>
                  <h3 className="font-display text-xl tracking-wider mb-3 text-balance break-words">{w.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed text-balance break-words">{w.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
