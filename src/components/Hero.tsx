import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { SITE } from '../data/site';
import Counter from './Counter';
import Magnetic from './Magnetic';

const STATS_C = [
  { to: 5000, suffix: '+', label: 'Khách hàng' },
  { to: 5, suffix: '+ năm', label: 'Kinh nghiệm' },
  { to: 50, suffix: '+', label: 'Dòng xe' },
  { to: 100, suffix: '%', label: 'Bảo hành' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const FINISHES = [
  { name: 'Satin Black', className: 'from-bg-contrast via-bg-contrast-soft to-steel' },
  { name: 'Pearl White', className: 'from-white via-bg-primary to-bg-elevated' },
  { name: 'Champagne', className: 'from-accent-light via-accent to-accent-dark' },
  { name: 'Steel PPF', className: 'from-steel via-bg-elevated to-white' },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);
  const heroImage = '/images/ngoc-ban/portfolio/p038.webp';

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-[100svh] overflow-hidden bg-bg-primary"
    >
      <div className="absolute inset-0 bg-bg-primary" />
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(248,247,243,1)_0%,rgba(248,247,243,0.98)_47%,rgba(23,19,15,0.96)_47%,rgba(23,19,15,0.98)_100%)] lg:block" />
      <div className="absolute left-0 top-0 h-full w-[58%] bg-[radial-gradient(circle_at_18%_20%,rgba(201,169,110,0.14),transparent_34%)]" />
      <div className="absolute right-0 top-0 hidden h-full w-[58%] bg-[radial-gradient(circle_at_60%_48%,rgba(109,118,128,0.42),transparent_28%),linear-gradient(180deg,rgba(23,19,15,0.08),rgba(23,19,15,0.82))] lg:block" />

      <motion.div
        aria-hidden
        style={{ y: visualY }}
        className="absolute bottom-0 right-0 top-[118px] hidden w-[56%] lg:block"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-10 right-12 top-[7%] overflow-hidden border border-accent/18 bg-gradient-to-br from-bg-contrast-soft via-steel/40 to-bg-contrast shadow-[0_45px_120px_-60px_rgba(0,0,0,0.8)]">
          <img
            src={heroImage}
            alt=""
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            className="absolute inset-0 h-full w-full object-cover object-[58%_50%] opacity-72 grayscale saturate-0 contrast-[1.08] brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-contrast via-bg-contrast/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-contrast/35 via-transparent to-bg-contrast/60" />
          <div className="absolute left-6 top-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-accent">
            <span className="h-px w-8 bg-accent" />
            Paint-safe wrap
          </div>
          <div className="absolute bottom-7 left-7 right-7 grid grid-cols-3 gap-px bg-accent/24">
            {['Wrap', 'PPF', 'Film'].map((item) => (
              <div key={item} className="bg-bg-contrast/90 px-4 py-4 text-center text-[10px] uppercase tracking-[0.28em] text-bg-primary/75">
                {item}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="container-x relative z-10 flex min-h-[100svh] items-center pb-24 pt-24 sm:pt-28 lg:items-start lg:pb-24 lg:pt-20"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div initial="hidden" animate="visible" className="w-full max-w-[500px]">
          <motion.div custom={0} variants={fadeUp} className="eyebrow mb-6">
            Ngọc Bàn Automotive Studio
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            className="h-display max-w-[720px] text-[17vw] leading-[0.88] sm:text-[5.2rem] md:text-[6rem] lg:text-[6rem] xl:text-[6.4rem]"
          >
            WRAP
            <span className="block text-gold-gradient">DECAL</span>
            STUDIO
          </motion.h1>

          <motion.p custom={2} variants={fadeUp} className="mt-6 w-full max-w-[21rem] pr-2 font-serif text-lg italic leading-relaxed text-text-secondary sm:max-w-[30rem] sm:text-xl md:text-2xl">
            Dán PPF, wrap đổi màu, film cách nhiệt và tem xe cao cấp cho những chiếc xe cần bề mặt đẹp, đường cắt gọn và bảo vệ sơn zin.
          </motion.p>

          <motion.div custom={3} variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
            <Magnetic strength={0.3}>
              <a
                href={`tel:${SITE.hotlineRaw}`}
                data-cursor="link"
                className="group inline-flex items-center gap-3 bg-gradient-to-br from-accent-light via-accent to-accent-dark px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-bg-primary transition-all duration-500 hover:shadow-[0_25px_60px_-15px_rgba(201,169,110,0.7)]"
              >
                <Phone size={16} />
                Gọi ngay {SITE.hotline}
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href="#showcase"
                data-cursor="link"
                className="inline-flex items-center gap-3 border border-border-gold bg-bg-card/45 px-7 py-4 text-sm uppercase tracking-[0.2em] text-text-primary backdrop-blur-sm transition hover:border-accent hover:text-accent"
              >
                Xem tác phẩm <ArrowRight size={16} />
              </a>
            </Magnetic>
          </motion.div>

          <motion.div custom={4} variants={fadeUp} className="mt-7 overflow-hidden border border-accent/20 bg-bg-contrast shadow-[0_28px_70px_-42px_rgba(0,0,0,0.75)] lg:hidden">
            <div className="relative aspect-[16/11] bg-gradient-to-br from-bg-contrast-soft via-steel/50 to-bg-contrast">
              <img
                src={heroImage}
                alt=""
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                className="absolute inset-0 h-full w-full object-cover object-center opacity-75 grayscale saturate-0 contrast-[1.08] brightness-[0.76]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-contrast via-bg-contrast/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between border-t border-accent/25 pt-4">
                <span className="text-[10px] uppercase tracking-[0.28em] text-accent">Signature finish</span>
                <span className="font-display text-2xl uppercase tracking-[0.08em] text-bg-primary">PPF</span>
              </div>
            </div>
          </motion.div>

          <motion.div custom={5} variants={fadeUp} className="mt-8 grid max-w-[30rem] grid-cols-2 gap-3 sm:grid-cols-4">
            {FINISHES.map((finish) => (
              <div key={finish.name} className="border border-border-gold bg-bg-card/78 p-2 backdrop-blur-sm">
                <div className={`mb-3 h-10 bg-gradient-to-br ${finish.className}`} />
                <div className="text-[10px] uppercase tracking-[0.18em] text-text-secondary">{finish.name}</div>
              </div>
            ))}
          </motion.div>

          <motion.div custom={6} variants={fadeUp} className="mt-12 grid max-w-3xl grid-cols-2 gap-6 border-t border-border-gold pt-8 md:grid-cols-4 md:gap-10">
            {STATS_C.map((s) => (
              <div key={s.label}>
                <div className="mb-1 font-display text-4xl text-gold-gradient md:text-5xl">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-text-secondary">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="h-10 w-px bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  );
}
