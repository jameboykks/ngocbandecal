import { motion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { VIDEOS, SITE } from '../data/site';

export default function Videos() {
  return (
    <section className="section-y bg-bg-primary">
      <div className="container-x">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <div className="eyebrow mb-5">TikTok & Video Thực Tế</div>
            <h2 className="h-display text-5xl md:text-6xl lg:text-7xl">
              XEM <span className="text-gold-gradient">QUY TRÌNH</span><br />THI CÔNG THẬT
            </h2>
          </div>
          <a
            href={SITE.tiktok}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 px-5 py-3 border border-border-gold text-[12px] tracking-[0.2em] uppercase text-text-primary hover:border-accent hover:text-accent transition self-start"
          >
            Theo Dõi TikTok <ArrowRight size={14} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {VIDEOS.map((v, i) => (
            <motion.a
              key={i}
              href={v.url}
              target="_blank"
              rel="noopener"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative block aspect-[9/12] overflow-hidden bg-bg-card"
            >
              <img
                src={v.thumb}
                alt={v.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                loading="lazy"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/50 to-transparent" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-accent/20 backdrop-blur-sm border border-accent flex items-center justify-center group-hover:scale-110 group-hover:bg-accent transition-all duration-500">
                  <Play size={28} className="text-accent group-hover:text-bg-primary translate-x-0.5 transition-colors" fill="currentColor" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-[10px] tracking-[0.3em] uppercase text-accent mb-2">TikTok</div>
                <div className="font-display text-xl tracking-wider text-text-primary">{v.title}</div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
