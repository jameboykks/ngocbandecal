import { motion } from 'framer-motion';
import { PROCESS } from '../data/site';

export default function Process() {
  return (
    <section id="process" className="section-y bg-bg-secondary relative overflow-hidden">
      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow mb-5 justify-center">Quy Trình Thi Công</div>
          <h2 className="h-display text-5xl md:text-6xl lg:text-7xl mb-5">
            5 BƯỚC <span className="text-gold-gradient">CHUẨN MỰC</span>
          </h2>
          <p className="font-serif italic text-lg text-text-secondary">
            Quy trình minh bạch — chuyên nghiệp — bảo đảm chất lượng từ tư vấn đến bàn giao xe.
          </p>
        </div>

        <div className="relative">
          {/* Horizontal connecting line (desktop) */}
          <div className="hidden lg:block absolute top-7 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-4">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative text-center group"
              >
                <div className="relative inline-flex">
                  <div className="w-14 h-14 rounded-full bg-bg-primary border border-border-gold flex items-center justify-center mb-5 mx-auto group-hover:border-accent group-hover:bg-accent transition-colors duration-300">
                    <span className="font-display text-lg tracking-wider text-accent group-hover:text-bg-primary transition-colors">
                      {p.n}
                    </span>
                  </div>
                </div>
                <h3 className="font-display text-xl tracking-wider mb-3 text-text-primary">{p.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed max-w-[220px] mx-auto">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
