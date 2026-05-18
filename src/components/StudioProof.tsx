import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, MapPin, Clock, Wrench } from 'lucide-react';
import { SITE } from '../data/site';
import Counter from './Counter';

const PHOTOS = {
  hero: {
    src: '/images/ngoc-ban/studio-facade-supercars.jpeg',
    label: 'Front Façade',
    coord: '16.0544° N · 108.2022° E',
  },
  workshop: {
    src: '/images/ngoc-ban/studio-workshop-cars.jpeg',
    label: 'Production Bay',
    spec: 'LED 5000K · Dust-controlled',
  },
  lexus: {
    src: '/images/ngoc-ban/studio-front-lexus.jpeg',
    label: 'Delivery Bay',
    spec: 'PPF · Wrap · Detailing',
  },
  street: {
    src: '/images/ngoc-ban/studio-street-front.jpeg',
    label: 'Street View',
    spec: '21 Thành Thái',
  },
};

const STATS = [
  { to: 200, suffix: 'm²', label: 'Diện tích studio' },
  { to: 6, suffix: '', label: 'Khoang thi công' },
  { to: 9, suffix: '+', label: 'Năm hoạt động' },
  { to: 24, suffix: '/7', label: 'Hỗ trợ sau bán' },
];

const MARQUEE = ['Wrap Decal', 'PPF Bảo Vệ Sơn', 'Film Cách Nhiệt', 'Detailing', 'Đánh Bóng', 'Studio Đà Nẵng', 'Đèn LED 5000K', 'Phòng Kiểm Tra Sơn'];

function useLiveTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  const hh = String(time.getHours()).padStart(2, '0');
  const mm = String(time.getMinutes()).padStart(2, '0');
  const isOpen = time.getHours() >= 8 && time.getHours() < 18;
  return { clock: `${hh}:${mm}`, isOpen };
}

function ParallaxImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18 });
  const sy = useSpring(my, { stiffness: 80, damping: 18 });
  const tx = useTransform(sx, (v) => v * 8);
  const ty = useTransform(sy, (v) => v * 8);

  const onMove = (e: React.PointerEvent) => {
    if (!ref.current || window.matchMedia('(pointer: coarse)').matches) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * -2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * -2);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ x: tx, y: ty, scale: 1.08 }}
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
      />
    </div>
  );
}

export default function StudioProof() {
  const { clock, isOpen } = useLiveTime();

  return (
    <section id="studio" className="section-y bg-bg-primary relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 radial-glow opacity-50" />

      <div className="container-x relative z-10">
        {/* Header bar — editorial / IDE-inspired */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border-gold/40 pb-6 mb-12">
          <div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] mb-4">
              <span className={`h-2 w-2 rounded-full ${isOpen ? 'bg-emerald-500 animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.7)]' : 'bg-text-muted'}`} />
              <span className={isOpen ? 'text-emerald-500' : 'text-text-muted'}>
                {isOpen ? 'On-air · Đang mở cửa' : 'Studio đã đóng'}
              </span>
              <span className="text-text-muted">·</span>
              <span className="text-text-secondary font-mono">{clock} ICT</span>
              <span className="text-text-muted">·</span>
              <span className="text-text-secondary">Đà Nẵng, VN</span>
            </div>
            <h2 className="h-display text-5xl md:text-6xl lg:text-7xl tracking-tight">
              KHÔNG GIAN <span className="text-gold-gradient">THẬT</span>
            </h2>
            <p className="mt-4 max-w-xl font-serif text-lg italic leading-relaxed text-text-secondary">
              Không phải showroom render. Không ảnh stock. Đây là xưởng thật — nơi từng chiếc xe được wrap thủ công, kiểm tra dưới đèn LED 5000K trước khi rời studio.
            </p>
          </div>

          <div className="flex items-center gap-6 text-right">
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-text-muted mb-1">File</div>
              <div className="font-mono text-sm text-text-primary">studio_001.scene</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-text-muted mb-1">Coord</div>
              <div className="font-mono text-sm text-text-primary">{PHOTOS.hero.coord}</div>
            </div>
          </div>
        </div>

        {/* Bento mosaic */}
        <div className="grid grid-cols-12 gap-3 md:gap-4 mb-12">
          {/* Hero — big left (keeps parallax for "wow") */}
          <div className="group relative col-span-12 lg:col-span-8 row-span-2 aspect-[16/11] lg:aspect-auto lg:min-h-[520px] border border-border-gold overflow-hidden bg-bg-contrast">
            <ParallaxImage src={PHOTOS.hero.src} alt={PHOTOS.hero.label} className="absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-contrast via-bg-contrast/30 to-transparent" />

            {/* Corner labels — Antigravity-style metadata */}
            <div className="absolute top-5 left-5 right-5 flex items-start justify-between text-[10px] uppercase tracking-[0.28em]">
              <div className="flex items-center gap-2 px-2.5 py-1 bg-bg-primary/15 backdrop-blur-sm border border-bg-primary/20">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-bg-primary">REC · Studio Live</span>
              </div>
              <div className="text-bg-primary/65 font-mono">01 / 04</div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10">
              <div className="h-px w-12 bg-accent mb-4 transition-all duration-500 group-hover:w-20" />
              <div className="text-[11px] uppercase tracking-[0.3em] text-accent mb-2 font-mono">{PHOTOS.hero.label}</div>
              <h3 className="font-display text-4xl md:text-5xl uppercase tracking-tight text-bg-primary leading-[0.95]">
                STUDIO NGỌC BÀN
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-bg-primary/72">
                Mặt tiền 21 Thành Thái — không gian thi công siêu xe và xe sang ngay tại trung tâm Đà Nẵng.
              </p>
            </div>
          </div>

          {/* Stats card top-right */}
          <div className="col-span-12 lg:col-span-4 grid grid-cols-2 gap-3 md:gap-4 content-stretch">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="relative border border-border-gold bg-bg-card p-5 group hover:border-accent/60 transition-colors overflow-hidden min-h-[110px] flex flex-col justify-between"
              >
                <div className="absolute top-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-accent via-accent-light to-transparent transition-all duration-700" />
                <div className="font-display text-3xl md:text-4xl text-gold-gradient leading-none">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-text-secondary mt-3 leading-tight text-balance">
                  {s.label}
                </div>
              </motion.div>
            ))}

            {/* Workshop photo — fills below stats */}
            <div className="col-span-2 group relative aspect-[5/3] border border-border-gold overflow-hidden bg-bg-contrast">
              <img
                src={PHOTOS.workshop.src}
                alt={PHOTOS.workshop.label}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover scale-[1.04] group-hover:scale-[1.1] transition-transform duration-[1.4s] ease-out will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-contrast/95 via-bg-contrast/20 to-transparent" />
              <div className="absolute top-4 left-4 px-2 py-1 bg-bg-primary/15 backdrop-blur-sm border border-bg-primary/20 text-[9px] uppercase tracking-[0.3em] text-bg-primary font-mono">
                02 / 04
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="text-[10px] uppercase tracking-[0.28em] text-accent mb-1 font-mono">{PHOTOS.workshop.label}</div>
                <div className="text-sm text-bg-primary">{PHOTOS.workshop.spec}</div>
              </div>
            </div>
          </div>

          {/* Bottom row — 2 photos */}
          <div className="group relative col-span-6 aspect-[4/3] border border-border-gold overflow-hidden bg-bg-contrast">
            <img
              src={PHOTOS.lexus.src}
              alt={PHOTOS.lexus.label}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover scale-[1.04] group-hover:scale-[1.1] transition-transform duration-[1.4s] ease-out will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-contrast/95 via-bg-contrast/20 to-transparent" />
            <div className="absolute top-4 left-4 px-2 py-1 bg-bg-primary/15 backdrop-blur-sm border border-bg-primary/20 text-[9px] uppercase tracking-[0.3em] text-bg-primary font-mono">
              03 / 04
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
              <div className="text-[10px] uppercase tracking-[0.28em] text-accent mb-1 font-mono">{PHOTOS.lexus.label}</div>
              <div className="text-sm text-bg-primary">{PHOTOS.lexus.spec}</div>
            </div>
          </div>

          <div className="group relative col-span-6 aspect-[4/3] border border-border-gold overflow-hidden bg-bg-contrast">
            <img
              src={PHOTOS.street.src}
              alt={PHOTOS.street.label}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover scale-[1.04] group-hover:scale-[1.1] transition-transform duration-[1.4s] ease-out will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-contrast/95 via-bg-contrast/20 to-transparent" />
            <div className="absolute top-4 left-4 px-2 py-1 bg-bg-primary/15 backdrop-blur-sm border border-bg-primary/20 text-[9px] uppercase tracking-[0.3em] text-bg-primary font-mono">
              04 / 04
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
              <div className="text-[10px] uppercase tracking-[0.28em] text-accent mb-1 font-mono">{PHOTOS.street.label}</div>
              <div className="text-sm text-bg-primary">{PHOTOS.street.spec}</div>
            </div>
          </div>
        </div>

        {/* Address card + CTA */}
        <div className="grid lg:grid-cols-2 gap-4 mb-12">
          <div className="relative border border-border-gold bg-bg-card p-7 md:p-9 group overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-accent via-accent-dark to-transparent" />
            <div className="flex items-start gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-accent/40 text-accent group-hover:bg-accent group-hover:text-bg-primary transition-colors">
                <MapPin size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] uppercase tracking-[0.28em] text-text-muted mb-2 font-mono">addr.studio</div>
                <div className="font-display text-xl md:text-2xl text-text-primary leading-snug">{SITE.address}</div>
                <a href={SITE.maps} target="_blank" rel="noopener" className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em] text-accent hover:gap-3 transition-all">
                  Mở Google Maps <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>

          <div className="relative border border-border-gold bg-bg-card p-7 md:p-9 group overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-accent via-accent-dark to-transparent" />
            <div className="flex items-start gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-accent/40 text-accent group-hover:bg-accent group-hover:text-bg-primary transition-colors">
                <Clock size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] uppercase tracking-[0.28em] text-text-muted mb-2 font-mono">hours.studio</div>
                <div className="font-display text-xl md:text-2xl text-text-primary leading-snug">{SITE.hours}</div>
                <div className="mt-3 flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase">
                  <Wrench size={12} className="text-accent" />
                  <span className="text-text-secondary">Đặt lịch trước qua Hotline để được phục vụ nhanh</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee strip — full bleed */}
      <div className="relative border-y border-border-gold/60 py-6 bg-bg-secondary overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap animate-marquee will-change-transform">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className="flex items-center gap-12 font-display text-2xl md:text-3xl uppercase tracking-[0.18em] text-text-primary">
              {item}
              <span className="text-accent text-3xl">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
