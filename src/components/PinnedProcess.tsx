import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { PROCESS } from '../data/site';

const COVERS = [
  '/images/ngoc-ban/portfolio/p033.webp',
  '/images/ngoc-ban/portfolio/p034.webp',
  '/images/ngoc-ban/portfolio/p035.webp',
  '/images/ngoc-ban/portfolio/p036.webp',
  '/images/ngoc-ban/portfolio/p037.webp',
];

function StepLabel({ p, i, progress }: { p: typeof PROCESS[number]; i: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [i - 0.5, i, i + 0.5, i + 1], [0.25, 1, 1, 0.25]);
  const scale = useTransform(progress, [i - 0.5, i, i + 1], [0.97, 1.02, 0.97]);
  return (
    <motion.div style={{ opacity, scale }} className="flex items-center gap-4 py-2 origin-left">
      <span className="font-display text-3xl text-accent w-12">{p.n}</span>
      <span className="font-display text-2xl tracking-wider">{p.title}</span>
    </motion.div>
  );
}

function StepVisual({ p, i, progress }: { p: typeof PROCESS[number]; i: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [i - 0.5, i, i + 0.5, i + 1], [0, 1, 1, 0]);
  const scale = useTransform(progress, [i, i + 1], [1, 1.08]);
  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.img
        src={COVERS[i % COVERS.length]}
        alt={p.title}
        style={{ scale }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-accent mb-2">Bước {p.n}</div>
            <div className="font-display text-3xl md:text-5xl tracking-wider mb-3">{p.title}</div>
            <p className="text-text-secondary max-w-md">{p.desc}</p>
          </div>
          <div className="hidden md:block font-display text-7xl md:text-9xl text-text-primary/[0.04]">
            {p.n}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PinnedProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const N = PROCESS.length;
  const stepProgress = useTransform(scrollYProgress, [0, 1], [0, N]);
  const fillScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative bg-bg-secondary"
      style={{ height: `${N * 90}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Progress bar (vertical on left, desktop) */}
        <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 h-[60vh]">
          <div className="relative h-full w-px bg-border-gold">
            <motion.div
              className="absolute inset-x-0 top-0 bg-gradient-to-b from-accent-light via-accent to-accent-dark w-px"
              style={{ height: '100%', transformOrigin: 'top', scaleY: fillScale }}
            />
          </div>
        </div>

        <div className="container-x relative z-10 grid lg:grid-cols-12 gap-10 items-center w-full">
          <div className="lg:col-span-5 lg:pl-12">
            <div className="eyebrow mb-5">Quy Trình Thi Công</div>
            <h2 className="h-display text-5xl md:text-6xl lg:text-7xl mb-6">
              5 BƯỚC<br /><span className="text-gold-gradient">CHUẨN MỰC</span>
            </h2>
            <p className="font-serif italic text-lg text-text-secondary mb-8">
              Mỗi bước được thực hiện minh bạch — bạn luôn biết xe đang ở giai đoạn nào.
            </p>

            <div className="space-y-1">
              {PROCESS.map((p, i) => (
                <StepLabel key={p.n} p={p} i={i} progress={stepProgress} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[4/5] md:aspect-[5/4] overflow-hidden border border-border-gold">
              {PROCESS.map((p, i) => (
                <StepVisual key={p.n} p={p} i={i} progress={stepProgress} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
