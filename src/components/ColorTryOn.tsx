import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { SITE } from '../data/site';

const CARS = [
  { id: 'sedan', name: 'Sedan', d: 'M50 220 L80 160 Q100 130 150 125 L350 125 Q400 130 420 160 L450 220 L450 260 Q450 275 435 275 L420 275 Q415 295 395 295 Q375 295 370 275 L130 275 Q125 295 105 295 Q85 295 80 275 L65 275 Q50 275 50 260 Z M120 175 L180 130 L240 130 L260 175 Z M260 175 L290 130 L350 130 L380 175 Z' },
  { id: 'suv', name: 'SUV', d: 'M40 230 L60 150 Q70 110 130 105 L370 105 Q430 110 440 150 L460 230 L460 270 Q460 285 445 285 L425 285 Q420 305 400 305 Q380 305 375 285 L125 285 Q120 305 100 305 Q80 305 75 285 L55 285 Q40 285 40 270 Z M105 165 L170 115 L240 115 L260 165 Z M260 165 L300 115 L370 115 L395 165 Z' },
  { id: 'coupe', name: 'Coupe', d: 'M40 230 L70 175 Q120 125 200 122 L320 122 Q380 130 410 175 L460 230 L460 260 Q460 275 445 275 L425 275 Q420 295 400 295 Q380 295 375 275 L125 275 Q120 295 100 295 Q80 295 75 275 L55 275 Q40 275 40 260 Z M120 180 Q170 135 230 130 L290 130 Q350 140 380 180 Z' },
  { id: 'pickup', name: 'Pickup', d: 'M30 230 L50 160 Q60 130 110 125 L230 125 Q250 130 255 160 L260 200 L460 200 L460 270 Q460 285 445 285 L425 285 Q420 305 400 305 Q380 305 375 285 L125 285 Q120 305 100 305 Q80 305 75 285 L55 285 Q40 285 30 275 Z M90 175 L150 130 L220 130 L240 175 Z' },
];

const COLORS = [
  { name: 'Satin Gold', hex: '#c9a96e', filter: 'sepia(0.3) saturate(1.5)' },
  { name: 'Matte Midnight', hex: '#1a1a1a' },
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
  { id: 'gloss', name: 'Bóng (Gloss)', filter: 'brightness(1.1) saturate(1.15)' },
  { id: 'matte', name: 'Mờ (Matte)', filter: 'saturate(0.8) brightness(0.92)' },
  { id: 'satin', name: 'Satin', filter: 'saturate(1) brightness(1.02)' },
  { id: 'metallic', name: 'Metallic', filter: 'saturate(1.3) brightness(1.05) contrast(1.1)' },
];

export default function ColorTryOn() {
  const [car, setCar] = useState(CARS[0]);
  const [color, setColor] = useState(COLORS[0]);
  const [finish, setFinish] = useState(FINISH[0]);

  return (
    <section className="section-y bg-bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 radial-glow opacity-50" />
      <div className="container-x relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="eyebrow mb-5 justify-center">Thử Màu Wrap</div>
          <h2 className="h-display text-5xl md:text-6xl lg:text-7xl mb-5">
            CHỌN MÀU <span className="text-gold-gradient">CHO XE</span><br />CỦA BẠN
          </h2>
          <p className="font-serif italic text-lg text-text-secondary">
            Tool tương tác — chọn dòng xe, màu wrap và lớp hoàn thiện để xem trước diện mạo xe sau khi thi công tại Ngọc Bàn.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Preview */}
          <div className="lg:col-span-8">
            <div className="relative aspect-[5/3] bg-bg-card border border-border-gold overflow-hidden">
              {/* Stage backdrop */}
              <div className="absolute inset-0" style={{
                background: 'radial-gradient(ellipse at 50% 60%, rgba(201,169,110,0.18), transparent 60%)',
              }} />
              {/* Floor grid perspective */}
              <div
                className="absolute inset-x-0 bottom-0 h-1/2 opacity-25"
                style={{
                  backgroundImage: 'linear-gradient(rgba(201,169,110,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.5) 1px, transparent 1px)',
                  backgroundSize: '50px 50px',
                  transform: 'perspective(600px) rotateX(60deg)',
                  transformOrigin: 'center bottom',
                  maskImage: 'linear-gradient(to top, black 0%, transparent 90%)',
                }}
              />

              {/* Car SVG */}
              <motion.svg
                key={car.id}
                viewBox="0 0 500 320"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full p-12"
                style={{ filter: `drop-shadow(0 20px 30px ${color.hex}55) ${finish.filter}` }}
              >
                <motion.path
                  d={car.d}
                  initial={{ fill: '#444' }}
                  animate={{ fill: color.hex }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  stroke="rgba(0,0,0,0.4)"
                  strokeWidth="1.5"
                />
                {/* Wheels */}
                <circle cx="105" cy="285" r="22" fill="#0a0a0a" />
                <circle cx="105" cy="285" r="10" fill="#333" />
                <circle cx="395" cy="285" r="22" fill="#0a0a0a" />
                <circle cx="395" cy="285" r="10" fill="#333" />
                {/* Window highlight */}
                <path d={car.d.split('Z')[0] + 'Z'} fill="url(#shine)" opacity="0.18" pointerEvents="none" />
                <defs>
                  <linearGradient id="shine" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#fff" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </motion.svg>

              {/* HUD readout */}
              <div className="absolute top-4 left-4 right-4 flex items-start justify-between text-[10px] tracking-[0.25em] uppercase">
                <div>
                  <div className="text-text-muted mb-1">Model</div>
                  <div className="text-accent font-display text-base tracking-wider">{car.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-text-muted mb-1">Finish</div>
                  <div className="text-accent font-display text-base tracking-wider">{finish.name}</div>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div className="px-3 py-1.5 bg-bg-primary/80 border border-border-gold flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ background: color.hex }} />
                  <span className="text-[11px] tracking-[0.25em] uppercase text-text-primary">{color.name}</span>
                </div>
                <div className="text-[10px] text-text-muted tracking-[0.2em] uppercase">Preview minh hoạ</div>
              </div>
            </div>

            <a
              href={`tel:${SITE.hotlineRaw}`}
              data-cursor="link"
              className="mt-4 flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-br from-accent-light via-accent to-accent-dark text-bg-primary text-[12px] tracking-[0.25em] uppercase font-semibold hover:shadow-[0_15px_40px_-15px_rgba(201,169,110,0.7)] transition"
            >
              <Phone size={14} /> Báo Giá Cho {car.name} {color.name}
            </a>
          </div>

          {/* Controls */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-text-muted mb-3">Bước 1 — Dòng xe</div>
              <div className="grid grid-cols-2 gap-2">
                {CARS.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setCar(c)}
                    data-cursor="link"
                    className={[
                      'py-3 text-[11px] tracking-[0.2em] uppercase border transition',
                      car.id === c.id ? 'border-accent text-bg-primary bg-accent' : 'border-border-gold text-text-secondary hover:border-accent hover:text-accent',
                    ].join(' ')}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
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
                    style={{ background: c.hex, boxShadow: color.name === c.name ? `0 0 20px ${c.hex}88` : 'none' }}
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
                    onClick={() => setFinish(f)}
                    data-cursor="link"
                    className={[
                      'py-3 text-[11px] tracking-[0.2em] uppercase border transition',
                      finish.id === f.id ? 'border-accent text-bg-primary bg-accent' : 'border-border-gold text-text-secondary hover:border-accent hover:text-accent',
                    ].join(' ')}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
