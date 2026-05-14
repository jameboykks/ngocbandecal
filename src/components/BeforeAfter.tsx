import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

type Item = { title: string; before: string; after: string; tag: string };

function Slider({ item }: { item: Item }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  };

  return (
    <div className="group">
      <div className="text-[11px] tracking-[0.25em] uppercase text-accent mb-2">{item.tag}</div>
      <h3 className="font-display text-2xl md:text-3xl tracking-wider mb-5">{item.title}</h3>
      <div
        ref={ref}
        className="relative aspect-[16/10] overflow-hidden border border-border-gold cursor-ew-resize select-none touch-none"
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as Element).setPointerCapture?.(e.pointerId);
          updateFromClientX(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && updateFromClientX(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
      >
        {/* After (full background) */}
        <img src={item.after} alt="after" className="absolute inset-0 w-full h-full object-cover pointer-events-none" draggable={false} />
        {/* Before (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)` }}
        >
          <img src={item.before} alt="before" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-bg-primary/80 text-[10px] tracking-[0.3em] uppercase text-text-primary border border-border-gold">
          Trước
        </div>
        <div className="absolute top-4 right-4 px-3 py-1 bg-accent text-[10px] tracking-[0.3em] uppercase text-bg-primary font-bold">
          Sau
        </div>

        {/* Slider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-accent shadow-[0_0_15px_rgba(201,169,110,0.6)] pointer-events-none"
          style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
        />
        {/* Handle */}
        <div
          className="absolute top-1/2 w-12 h-12 -translate-y-1/2 -translate-x-1/2 rounded-full bg-bg-primary border-2 border-accent flex items-center justify-center pointer-events-none shadow-[0_0_25px_rgba(201,169,110,0.5)]"
          style={{ left: `${pos}%` }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent">
            <polyline points="15 18 9 12 15 6" />
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
      <p className="mt-3 text-xs text-text-secondary text-center">Kéo thanh trượt để so sánh trước & sau</p>
    </div>
  );
}

export default function BeforeAfter({ items }: { items: Item[] }) {
  return (
    <section className="section-y bg-bg-primary relative">
      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="eyebrow mb-5 justify-center">Trước & Sau</div>
          <h2 className="h-display text-5xl md:text-6xl lg:text-7xl mb-5">
            SỰ <span className="text-gold-gradient">KHÁC BIỆT</span><br />NHÌN THẤY ĐƯỢC
          </h2>
          <p className="font-serif italic text-lg text-text-secondary">
            Không lời nói nào bằng hình ảnh. Kéo thanh trượt để xem chiếc xe được biến đổi như thế nào tại Ngọc Bàn.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <Slider item={it} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
