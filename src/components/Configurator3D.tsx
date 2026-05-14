import { Suspense, lazy, useState } from 'react';
import { Phone, RotateCw, Maximize2 } from 'lucide-react';
import { SITE } from '../data/site';

const Car3D = lazy(() => import('./Car3D'));

const CARS = [
  { id: 'coupe', name: 'Coupe / Sedan' },
  { id: 'suv', name: 'SUV' },
  { id: 'pickup', name: 'Pickup' },
];

const COLORS = [
  { name: 'Satin Gold', hex: '#c9a96e' },
  { name: 'Matte Black', hex: '#1a1a1a' },
  { name: 'Frozen Blue', hex: '#5a8db3' },
  { name: 'Cherry Red', hex: '#c0392b' },
  { name: 'Pearl White', hex: '#ecebe6' },
  { name: 'Stealth Grey', hex: '#3a3a3a' },
  { name: 'Forest Green', hex: '#2c4a3a' },
  { name: 'Lavender', hex: '#8c7ab5' },
  { name: 'Bronze', hex: '#7d5b34' },
  { name: 'Chrome Silver', hex: '#a0a0a8' },
  { name: 'Burgundy', hex: '#5c1c2c' },
  { name: 'Mustard', hex: '#c9a445' },
];

const FINISH = [
  { id: 'gloss' as const, name: 'Bóng (Gloss)' },
  { id: 'matte' as const, name: 'Mờ (Matte)' },
  { id: 'satin' as const, name: 'Satin' },
  { id: 'metallic' as const, name: 'Metallic' },
  { id: 'chrome' as const, name: 'Chrome' },
];

type FinishId = typeof FINISH[number]['id'];

function CanvasFallback() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
      <div className="w-12 h-12 rounded-full border-2 border-accent border-t-transparent animate-spin mb-4" />
      <div className="text-[11px] tracking-[0.3em] uppercase text-accent">Đang tải 3D Engine</div>
      <div className="text-xs text-text-muted mt-1 font-serif italic">~250KB · chỉ tải lần đầu</div>
    </div>
  );
}

export default function Configurator3D() {
  const [car, setCar] = useState(CARS[0]);
  const [color, setColor] = useState(COLORS[0]);
  const [finish, setFinish] = useState<FinishId>('satin');
  const [reset, setReset] = useState(0);

  return (
    <section className="section-y bg-bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 radial-glow opacity-50" />

      <div className="container-x relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="eyebrow mb-5 justify-center">3D Configurator · Real-time</div>
          <h2 className="h-display text-5xl md:text-6xl lg:text-7xl mb-5">
            CHỌN MÀU <span className="text-gold-gradient">CHO XE</span><br />TRONG KHÔNG GIAN 3D
          </h2>
          <p className="font-serif italic text-lg text-text-secondary">
            Concept car xoay 360° — chọn màu, chất liệu hoàn thiện và xem ngay trong môi trường real-time WebGL.
            Di chuột để xe phản ứng theo bạn.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* 3D Viewer */}
          <div className="lg:col-span-8">
            <div className="relative aspect-[5/3] bg-bg-card border border-border-gold overflow-hidden">
              <Suspense fallback={<CanvasFallback />}>
                <Car3D key={reset} color={color.hex} finish={finish} />
              </Suspense>

              {/* HUD overlays */}
              <div className="absolute top-4 left-4 right-4 flex items-start justify-between text-[10px] tracking-[0.25em] uppercase pointer-events-none">
                <div>
                  <div className="text-text-muted mb-1">Model</div>
                  <div className="text-accent font-display text-base tracking-wider">{car.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-text-muted mb-1">Finish</div>
                  <div className="text-accent font-display text-base tracking-wider">{FINISH.find(f => f.id === finish)?.name}</div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                <div className="px-3 py-1.5 bg-bg-primary/80 border border-border-gold flex items-center gap-2 backdrop-blur-sm">
                  <span className="w-3 h-3 rounded-full ring-1 ring-white/20" style={{ background: color.hex }} />
                  <span className="text-[11px] tracking-[0.25em] uppercase text-text-primary">{color.name}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setReset(r => r + 1)}
                    data-cursor="link"
                    className="w-9 h-9 border border-border-gold text-text-secondary hover:border-accent hover:text-accent transition flex items-center justify-center bg-bg-primary/80"
                    aria-label="Reset rotation"
                  >
                    <RotateCw size={14} />
                  </button>
                  <button
                    data-cursor="link"
                    className="w-9 h-9 border border-border-gold text-text-secondary hover:border-accent hover:text-accent transition flex items-center justify-center bg-bg-primary/80"
                    aria-label="Fullscreen (coming soon)"
                  >
                    <Maximize2 size={14} />
                  </button>
                </div>
              </div>

              {/* Hint */}
              <div className="absolute top-1/2 -translate-y-1/2 left-4 text-[9px] tracking-[0.4em] uppercase text-accent/60 [writing-mode:vertical-rl] rotate-180 pointer-events-none">
                Move mouse · Rotate live
              </div>
            </div>

            <a
              href={`tel:${SITE.hotlineRaw}`}
              data-cursor="link"
              className="mt-4 flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-br from-accent-light via-accent to-accent-dark text-bg-primary text-[12px] tracking-[0.25em] uppercase font-semibold hover:shadow-[0_15px_40px_-15px_rgba(201,169,110,0.7)] transition"
            >
              <Phone size={14} /> Báo Giá Cho {car.name} · {color.name} · {FINISH.find(f => f.id === finish)?.name}
            </a>
          </div>

          {/* Controls */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-text-muted mb-3">Bước 1 — Dòng xe</div>
              <div className="grid grid-cols-3 gap-2">
                {CARS.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setCar(c)}
                    data-cursor="link"
                    className={[
                      'py-3 text-[10px] tracking-[0.18em] uppercase border transition',
                      car.id === c.id ? 'border-accent text-bg-primary bg-accent' : 'border-border-gold text-text-secondary hover:border-accent hover:text-accent',
                    ].join(' ')}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
              <div className="mt-2 text-[10px] text-text-muted font-serif italic">Concept stylized — minh hoạ cho mọi dòng xe</div>
            </div>

            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-text-muted mb-3">Bước 2 — Màu wrap</div>
              <div className="grid grid-cols-6 gap-2">
                {COLORS.map(c => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c)}
                    data-cursor="link"
                    title={c.name}
                    className={[
                      'aspect-square rounded-full border-2 transition relative',
                      color.name === c.name ? 'border-accent scale-110' : 'border-transparent hover:scale-110',
                    ].join(' ')}
                    style={{ background: c.hex, boxShadow: color.name === c.name ? `0 0 18px ${c.hex}88` : 'none' }}
                  >
                    {color.name === c.name && (
                      <span className="absolute inset-0 rounded-full ring-2 ring-accent ring-offset-2 ring-offset-bg-secondary" />
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-2 text-xs text-text-secondary text-center font-serif italic">{color.name}</div>
            </div>

            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-text-muted mb-3">Bước 3 — Hoàn thiện</div>
              <div className="grid grid-cols-2 gap-2">
                {FINISH.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setFinish(f.id)}
                    data-cursor="link"
                    className={[
                      'py-3 text-[11px] tracking-[0.2em] uppercase border transition',
                      finish === f.id ? 'border-accent text-bg-primary bg-accent' : 'border-border-gold text-text-secondary hover:border-accent hover:text-accent',
                    ].join(' ')}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-[10px] text-text-muted font-serif italic pt-4 border-t border-border-gold/40">
              💡 Concept car render real-time bằng WebGL — chỉ minh hoạ. Chất liệu thực tế trên xe của bạn được tư vấn trực tiếp tại xưởng.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
