import { Component, Suspense, lazy, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Phone, RotateCw, Maximize2, Minimize2, Car, Armchair, PanelRightClose, PanelRightOpen, Gauge } from 'lucide-react';
import { SITE } from '../data/site';

const Car3D = lazy(() => import('./Car3D'));

const CARS = [
  { id: 'sport',    name: 'Sport Coupe', url: '/models/car.glb',     note: 'Concept · 1.7MB',   credit: 'Three.js',       hasInterior: true  },
  { id: 'hypercar', name: 'Hypercar',    url: '/models/mclaren.glb', note: 'Senna GTR · ~24MB', credit: 'mixmamo.studio', hasInterior: true  },
  { id: 'sedan',    name: 'Sedan',       url: '/models/sedan.glb',   note: 'Generic · ~16MB',   credit: 'MMC Works',      hasInterior: true  },
  { id: 'suv',      name: 'SUV',         url: '/models/suv.glb',     note: 'Generic · ~19MB',   credit: 'MMC Works',      hasInterior: true  },
  { id: 'pickup',   name: 'Pickup',      url: '/models/pickup.glb',  note: 'Hilux · ~24MB',     credit: 'Santi_Zeiss',    hasInterior: false },
] as const;

type CarId = typeof CARS[number]['id'];

const COLORS = [
  // Classic
  { name: 'Pearl White', hex: '#ecebe6' },
  { name: 'Glacier White', hex: '#dadada' },
  { name: 'Stealth Grey', hex: '#3a3a3a' },
  { name: 'Gunmetal', hex: '#2a2e33' },
  { name: 'Jet Black', hex: '#0c0c0e' },
  { name: 'Matte Black', hex: '#1a1a1a' },
  // Metallic / luxury
  { name: 'Satin Gold', hex: '#c9a96e' },
  { name: 'Champagne', hex: '#d4bf85' },
  { name: 'Bronze', hex: '#7d5b34' },
  { name: 'Copper', hex: '#9c5a35' },
  { name: 'Chrome Silver', hex: '#a0a0a8' },
  { name: 'Mustard', hex: '#c9a445' },
  // Reds
  { name: 'Cherry Red', hex: '#c0392b' },
  { name: 'Candy Red', hex: '#d11a2a' },
  { name: 'Burgundy', hex: '#5c1c2c' },
  { name: 'Wine', hex: '#722f3a' },
  { name: 'Coral', hex: '#e87968' },
  { name: 'Hot Pink', hex: '#e84a8a' },
  // Blues
  { name: 'Frozen Blue', hex: '#5a8db3' },
  { name: 'Sky Blue', hex: '#7cb1d4' },
  { name: 'Midnight Blue', hex: '#1e2a48' },
  { name: 'Cobalt', hex: '#2c4a8a' },
  { name: 'Teal', hex: '#1f6e6e' },
  { name: 'Mint', hex: '#7dc8a8' },
  // Greens / earth
  { name: 'Forest Green', hex: '#2c4a3a' },
  { name: 'Sage Green', hex: '#9aa890' },
  { name: 'Olive', hex: '#6b6a3a' },
  { name: 'Sand', hex: '#c8b896' },
  // Unique / fashion
  { name: 'Lavender', hex: '#8c7ab5' },
  { name: 'Plum', hex: '#5e3a5e' },
  { name: 'Tangerine', hex: '#e07a2a' },
  { name: 'Neon Yellow', hex: '#e8e23a' },
];

const FINISH = [
  { id: 'gloss' as const, name: 'Bóng (Gloss)' },
  { id: 'matte' as const, name: 'Mờ (Matte)' },
  { id: 'satin' as const, name: 'Satin' },
  { id: 'metallic' as const, name: 'Metallic' },
  { id: 'chrome' as const, name: 'Chrome' },
];

const SEAT_COLORS = [
  { name: 'Đen', hex: '#1a1a1a' },
  { name: 'Carbon', hex: '#0c0c0e' },
  { name: 'Xám Khói', hex: '#4a4a52' },
  { name: 'Xám Đá', hex: '#6e6e76' },
  { name: 'Be', hex: '#c8b896' },
  { name: 'Be Sữa', hex: '#e0d4b8' },
  { name: 'Trắng Kem', hex: '#e8e0cf' },
  { name: 'Trắng Ngà', hex: '#f0e8d8' },
  { name: 'Cognac', hex: '#8a4a26' },
  { name: 'Chocolate', hex: '#4a2c1c' },
  { name: 'Nâu Caramel', hex: '#a06840' },
  { name: 'Đỏ Rượu', hex: '#5c1c2c' },
  { name: 'Đỏ Cherry', hex: '#a02830' },
  { name: 'Cam Tan', hex: '#c9612e' },
  { name: 'Navy', hex: '#1e2a48' },
  { name: 'Xanh Lá Đậm', hex: '#2c4a3a' },
  { name: 'Hồng Pastel', hex: '#e8b8c0' },
  { name: 'Tím Plum', hex: '#5e3a5e' },
];

const TRIM_COLORS = [
  { name: 'Đen Piano', hex: '#0a0a0a' },
  { name: 'Đen Matte', hex: '#1a1a1c' },
  { name: 'Carbon', hex: '#1c1c20' },
  { name: 'Gỗ Walnut', hex: '#3a2820' },
  { name: 'Gỗ Oak', hex: '#7a5a3a' },
  { name: 'Gỗ Ash', hex: '#c0a880' },
  { name: 'Gỗ Ebony', hex: '#2a1c14' },
  { name: 'Bạc', hex: '#b8b8c0' },
  { name: 'Bạc Anodised', hex: '#8a8a92' },
  { name: 'Vàng Champagne', hex: '#a89060' },
  { name: 'Đồng Brushed', hex: '#9c6a3a' },
  { name: 'Trắng Pearl', hex: '#e8e0d4' },
  { name: 'Đỏ Bordeaux', hex: '#4a1c24' },
  { name: 'Xanh Midnight', hex: '#162236' },
  { name: 'Nâu Cocoa', hex: '#4a3424' },
];

const STITCHING_COLORS = [
  { name: 'Vàng Gold', hex: '#c9a96e' },
  { name: 'Vàng Chanh', hex: '#e8d23a' },
  { name: 'Đỏ', hex: '#c0392b' },
  { name: 'Đỏ Đậm', hex: '#7a1c1c' },
  { name: 'Cam', hex: '#d97834' },
  { name: 'Cam Tan', hex: '#e85a1a' },
  { name: 'Trắng', hex: '#f0ece0' },
  { name: 'Đen', hex: '#0a0a0a' },
  { name: 'Bạc', hex: '#b8b8c0' },
  { name: 'Xanh Cobalt', hex: '#2c4a8a' },
  { name: 'Xanh Lá', hex: '#3a8a4a' },
  { name: 'Xanh Mint', hex: '#7dc8a8' },
  { name: 'Hồng', hex: '#e85a8a' },
  { name: 'Tím', hex: '#7a4ab5' },
  { name: 'Đồng', hex: '#9c6a3a' },
];

const RIM_COLORS = [
  { name: 'Gold', hex: '#dfc693' },
  { name: 'Silver', hex: '#c4c4cc' },
  { name: 'Chrome', hex: '#e8e8ec' },
  { name: 'Anthracite', hex: '#3a3a40' },
  { name: 'Gunmetal', hex: '#4a4e54' },
  { name: 'Matte Black', hex: '#1a1a1c' },
  { name: 'Black', hex: '#0a0a0a' },
  { name: 'Bronze', hex: '#8a6534' },
  { name: 'Copper', hex: '#9c5a35' },
  { name: 'Rose Gold', hex: '#c89a8a' },
  { name: 'Red', hex: '#a02830' },
  { name: 'Blue', hex: '#2c4a8a' },
];

type FinishId = typeof FINISH[number]['id'];
type ViewKey = 'exterior' | 'interior' | 'cockpit';

type EBProps = { children: ReactNode; modelName: string; resetKey: string };
type EBState = { error: Error | null; retries: number };

class ModelErrorBoundary extends Component<EBProps, EBState> {
  state: EBState = { error: null, retries: 0 };
  private retryTimer: ReturnType<typeof setTimeout> | null = null;

  static getDerivedStateFromError(error: Error) { return { error }; }

  componentDidCatch() {
    // Auto-retry up to 2 times — handles StrictMode double-mount + transient suspense errors on first load.
    if (this.state.retries < 2) {
      this.retryTimer = setTimeout(() => {
        this.setState((s) => ({ error: null, retries: s.retries + 1 }));
      }, 120);
    }
  }

  componentDidUpdate(prev: EBProps) {
    if (prev.resetKey !== this.props.resetKey && (this.state.error || this.state.retries > 0)) {
      if (this.retryTimer) { clearTimeout(this.retryTimer); this.retryTimer = null; }
      this.setState({ error: null, retries: 0 });
    }
  }

  componentWillUnmount() {
    if (this.retryTimer) clearTimeout(this.retryTimer);
  }

  render() {
    if (this.state.error && this.state.retries >= 2) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 pointer-events-none">
          <div className="text-[10px] tracking-[0.3em] uppercase text-accent mb-3">Model chưa sẵn sàng</div>
          <div className="text-sm text-text-secondary font-serif italic max-w-md">
            File <code className="text-accent">{this.props.modelName}</code> không tải được.
            <br />Chọn dòng xe khác hoặc bấm Reset để thử lại.
          </div>
        </div>
      );
    }
    if (this.state.error) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <div className="w-12 h-12 rounded-full border-2 border-accent border-t-transparent animate-spin mb-4" />
          <div className="text-[11px] tracking-[0.3em] uppercase text-accent">Đang thử lại...</div>
        </div>
      );
    }
    return this.props.children;
  }
}

function CanvasFallback() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
      <div className="w-12 h-12 rounded-full border-2 border-accent border-t-transparent animate-spin mb-4" />
      <div className="text-[11px] tracking-[0.3em] uppercase text-accent">Đang tải Showroom 3D</div>
      <div className="text-xs text-text-muted mt-1 font-serif italic">Model thật · ~1.7MB · cache sau lần đầu</div>
    </div>
  );
}

export default function Configurator3D() {
  const [carId, setCarId] = useState<CarId>(CARS[0].id);
  const car = CARS.find(c => c.id === carId) ?? CARS[0];
  const [color, setColor] = useState(COLORS[0]);
  const [finish, setFinish] = useState<FinishId>('satin');
  const [seat, setSeat] = useState(SEAT_COLORS[0]);
  const [trim, setTrim] = useState(TRIM_COLORS[0]);
  const [stitching, setStitching] = useState(STITCHING_COLORS[0]);
  const [rim, setRim] = useState(RIM_COLORS[0]);
  const [view, setView] = useState<ViewKey>('exterior');
  const [reset, setReset] = useState(0);

  // Force exterior view if the current car has no interior modeled.
  useEffect(() => {
    if (!car.hasInterior && view !== 'exterior') setView('exterior');
  }, [car, view]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fsPanelOpen, setFsPanelOpen] = useState(true);
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setIsFullscreen(document.fullscreenElement === viewerRef.current);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current?.requestFullscreen().catch((err) => {
        console.warn('[Configurator3D] Fullscreen failed:', err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const controlsContent = (
    <>
      {/* Car selector */}
      <div className="pb-4 border-b border-border-gold/40">
        <div className="text-[10px] tracking-[0.3em] uppercase text-accent mb-3 flex items-center gap-2">
          <Car size={12} /> Dòng Xe
        </div>
        <div className="grid grid-cols-2 gap-2">
          {CARS.map(c => (
            <button
              key={c.id}
              onClick={() => setCarId(c.id)}
              data-cursor="link"
              className={[
                'py-2.5 px-2 text-left border transition',
                carId === c.id ? 'border-accent bg-accent/10' : 'border-border-gold hover:border-accent',
              ].join(' ')}
            >
              <div className={[
                'text-[10px] tracking-[0.15em] uppercase font-semibold',
                carId === c.id ? 'text-accent' : 'text-text-primary',
              ].join(' ')}>{c.name}</div>
              <div className="text-[9px] text-text-muted font-serif italic mt-0.5">{c.note}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Exterior section */}
      <div className="pb-4 border-b border-border-gold/40">
        <div className="text-[10px] tracking-[0.3em] uppercase text-accent mb-3 flex items-center gap-2">
          <Car size={12} /> Ngoại Thất
        </div>

        <div className="mb-4">
          <div className="text-[10px] tracking-[0.3em] uppercase text-text-muted mb-2">Màu sơn</div>
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

        <div className="mb-4">
          <div className="text-[10px] tracking-[0.3em] uppercase text-text-muted mb-2">Hoàn thiện</div>
          <div className="grid grid-cols-2 gap-2">
            {FINISH.map(f => (
              <button
                key={f.id}
                onClick={() => setFinish(f.id)}
                data-cursor="link"
                className={[
                  'py-2.5 text-[10px] tracking-[0.2em] uppercase border transition',
                  finish === f.id ? 'border-accent text-bg-primary bg-accent' : 'border-border-gold text-text-secondary hover:border-accent hover:text-accent',
                ].join(' ')}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-text-muted mb-2">Mâm xe</div>
          <div className="grid grid-cols-4 gap-2">
            {RIM_COLORS.map(r => (
              <button
                key={r.name}
                onClick={() => setRim(r)}
                data-cursor="link"
                title={r.name}
                className={[
                  'py-2 text-[9px] tracking-[0.2em] uppercase border transition flex flex-col items-center gap-1',
                  rim.name === r.name ? 'border-accent text-accent' : 'border-border-gold text-text-secondary hover:border-accent',
                ].join(' ')}
              >
                <span className="w-5 h-5 rounded-full ring-1 ring-white/20" style={{ background: r.hex }} />
                {r.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interior section — hidden when current car has no interior modeled */}
      {!car.hasInterior ? (
        <div className="text-[10px] text-text-muted font-serif italic">
          🚚 Dòng <span className="text-accent">{car.name}</span> không có nội thất chi tiết trong model 3D — chỉ tuỳ biến ngoại thất.
        </div>
      ) : (<>
      <div>
        <div className="text-[10px] tracking-[0.3em] uppercase text-accent mb-3 flex items-center gap-2">
          <Armchair size={12} /> Nội Thất
          {view === 'exterior' && (
            <button
              onClick={() => setView('cockpit')}
              data-cursor="link"
              className="ml-auto text-[9px] text-text-muted hover:text-accent transition normal-case tracking-normal italic font-serif"
            >
              → Vào trong xe
            </button>
          )}
        </div>

        <div className="mb-4">
          <div className="text-[10px] tracking-[0.3em] uppercase text-text-muted mb-2">Ghế da</div>
          <div className="grid grid-cols-6 gap-2">
            {SEAT_COLORS.map(c => (
              <button
                key={c.name}
                onClick={() => setSeat(c)}
                data-cursor="link"
                title={c.name}
                className={[
                  'aspect-square rounded-sm border-2 transition relative',
                  seat.name === c.name ? 'border-accent scale-110' : 'border-transparent hover:scale-110',
                ].join(' ')}
                style={{ background: c.hex, boxShadow: seat.name === c.name ? `0 0 14px ${c.hex}aa` : 'none' }}
              />
            ))}
          </div>
          <div className="mt-1 text-xs text-text-secondary text-center font-serif italic">{seat.name}</div>
        </div>

        <div className="mb-4">
          <div className="text-[10px] tracking-[0.3em] uppercase text-text-muted mb-2">Taplo / Trim</div>
          <div className="grid grid-cols-5 gap-2">
            {TRIM_COLORS.map(c => (
              <button
                key={c.name}
                onClick={() => setTrim(c)}
                data-cursor="link"
                title={c.name}
                className={[
                  'aspect-square rounded-sm border-2 transition',
                  trim.name === c.name ? 'border-accent scale-110' : 'border-transparent hover:scale-110',
                ].join(' ')}
                style={{ background: c.hex, boxShadow: trim.name === c.name ? `0 0 14px ${c.hex}aa` : 'none' }}
              />
            ))}
          </div>
          <div className="mt-1 text-xs text-text-secondary text-center font-serif italic">{trim.name}</div>
        </div>

        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-text-muted mb-2">Chỉ may / Accent</div>
          <div className="grid grid-cols-5 gap-2">
            {STITCHING_COLORS.map(c => (
              <button
                key={c.name}
                onClick={() => setStitching(c)}
                data-cursor="link"
                title={c.name}
                className={[
                  'aspect-square rounded-sm border-2 transition',
                  stitching.name === c.name ? 'border-accent scale-110' : 'border-transparent hover:scale-110',
                ].join(' ')}
                style={{ background: c.hex, boxShadow: stitching.name === c.name ? `0 0 14px ${c.hex}aa` : 'none' }}
              />
            ))}
          </div>
          <div className="mt-1 text-xs text-text-secondary text-center font-serif italic">{stitching.name}</div>
        </div>
      </div>
      </>)}
    </>
  );

  return (
    <section className="section-y bg-bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 radial-glow opacity-50" />

      <div className="container-x relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="eyebrow mb-5 justify-center">3D Configurator · Real-time</div>
          <h2 className="h-display text-5xl md:text-6xl lg:text-7xl mb-5">
            THIẾT KẾ XE <span className="text-gold-gradient">CỦA BẠN</span><br />TRONG KHÔNG GIAN 3D
          </h2>
          <p className="font-serif italic text-lg text-text-secondary">
            Xe thật, xoay 360°, vào tận khoang nội thất. Chọn màu sơn, hoàn thiện, ghế da, nội thất, chỉ may và mâm xe — tất cả render real-time.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* 3D Viewer */}
          <div className="lg:col-span-8">
            <div ref={viewerRef} className="relative aspect-[5/3] bg-bg-card border border-border-gold overflow-hidden fs-viewer">
              <ModelErrorBoundary modelName={car.url.split('/').pop() ?? car.url} resetKey={`${carId}-${reset}`}>
                <Suspense fallback={<CanvasFallback />}>
                  {/* Outer Suspense only for the lazy Car3D module load (one-time). Model loads handled inside Canvas. */}
                  <Car3D
                    key={reset}
                    modelUrl={car.url}
                    bodyColor={color.hex}
                    finish={finish}
                    seatColor={seat.hex}
                    trimColor={trim.hex}
                    stitchingColor={stitching.hex}
                    rimColor={rim.hex}
                    view={view}
                  />
                </Suspense>
              </ModelErrorBoundary>

              {/* HUD overlays */}
              <div className="absolute top-4 left-4 right-4 flex items-start justify-between text-[10px] tracking-[0.25em] uppercase pointer-events-none">
                <div>
                  <div className="text-text-muted mb-1">Model · View</div>
                  <div className="text-accent font-display text-base tracking-wider">{car.name} · {view === 'exterior' ? 'Ngoại' : view === 'cockpit' ? 'Vô Lăng' : 'Nội'}</div>
                </div>
                <div className="text-right">
                  <div className="text-text-muted mb-1">Finish</div>
                  <div className="text-accent font-display text-base tracking-wider">{FINISH.find(f => f.id === finish)?.name}</div>
                </div>
              </div>

              {/* View toggle */}
              {car.hasInterior && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 flex border border-border-gold bg-bg-primary/80 backdrop-blur-sm pointer-events-auto">
                  <button
                    onClick={() => setView('exterior')}
                    data-cursor="link"
                    className={[
                      'px-3 py-2 text-[10px] tracking-[0.2em] uppercase flex items-center gap-1.5 transition',
                      view === 'exterior' ? 'bg-accent text-bg-primary' : 'text-text-secondary hover:text-accent',
                    ].join(' ')}
                  >
                    <Car size={12} /> Ngoại Thất
                  </button>
                  <button
                    onClick={() => setView('interior')}
                    data-cursor="link"
                    className={[
                      'px-3 py-2 text-[10px] tracking-[0.2em] uppercase flex items-center gap-1.5 transition border-l border-border-gold',
                      view === 'interior' ? 'bg-accent text-bg-primary' : 'text-text-secondary hover:text-accent',
                    ].join(' ')}
                  >
                    <Armchair size={12} /> Nội Thất
                  </button>
                  <button
                    onClick={() => setView('cockpit')}
                    data-cursor="link"
                    className={[
                      'px-3 py-2 text-[10px] tracking-[0.2em] uppercase flex items-center gap-1.5 transition border-l border-border-gold',
                      view === 'cockpit' ? 'bg-accent text-bg-primary' : 'text-text-secondary hover:text-accent',
                    ].join(' ')}
                  >
                    <Gauge size={12} /> Vô Lăng
                  </button>
                </div>
              )}

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
                    aria-label="Reset camera"
                  >
                    <RotateCw size={14} />
                  </button>
                  <button
                    onClick={toggleFullscreen}
                    data-cursor="link"
                    className="w-9 h-9 border border-border-gold text-text-secondary hover:border-accent hover:text-accent transition flex items-center justify-center bg-bg-primary/80"
                    aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                  >
                    {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                  </button>
                </div>
              </div>

              {/* Hint */}
              <div className="absolute top-1/2 -translate-y-1/2 left-4 text-[9px] tracking-[0.4em] uppercase text-accent/60 [writing-mode:vertical-rl] rotate-180 pointer-events-none">
                Drag · Zoom · Rotate
              </div>

              {/* Fullscreen-only controls overlay */}
              {isFullscreen && (
                <>
                  <button
                    onClick={() => setFsPanelOpen(o => !o)}
                    data-cursor="link"
                    className="absolute top-1/2 -translate-y-1/2 right-4 z-30 w-10 h-10 border border-border-gold bg-bg-primary/85 backdrop-blur-md text-text-secondary hover:text-accent hover:border-accent transition flex items-center justify-center"
                    style={{ right: fsPanelOpen ? 'calc(380px + 1rem)' : '1rem' }}
                    aria-label={fsPanelOpen ? 'Đóng panel' : 'Mở panel'}
                  >
                    {fsPanelOpen ? <PanelRightClose size={16} /> : <PanelRightOpen size={16} />}
                  </button>

                  <div
                    className={[
                      'absolute top-4 right-4 bottom-4 w-[380px] bg-bg-primary/92 backdrop-blur-md border border-border-gold p-5 overflow-y-auto z-20 transition-transform duration-300',
                      fsPanelOpen ? 'translate-x-0' : 'translate-x-[calc(100%+1rem)]',
                    ].join(' ')}
                  >
                    <div className="text-[10px] tracking-[0.3em] uppercase text-text-muted mb-4 pb-3 border-b border-border-gold/40">
                      Cấu Hình Xe · Real-time
                    </div>
                    <div className="space-y-5">
                      {controlsContent}
                    </div>
                    <a
                      href={`tel:${SITE.hotlineRaw}`}
                      data-cursor="link"
                      className="mt-5 flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-br from-accent-light via-accent to-accent-dark text-bg-primary text-[11px] tracking-[0.22em] uppercase font-semibold hover:shadow-[0_15px_40px_-15px_rgba(201,169,110,0.7)] transition"
                    >
                      <Phone size={12} /> Báo Giá
                    </a>
                  </div>
                </>
              )}
            </div>

            <a
              href={`tel:${SITE.hotlineRaw}`}
              data-cursor="link"
              className="mt-4 flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-br from-accent-light via-accent to-accent-dark text-bg-primary text-[12px] tracking-[0.25em] uppercase font-semibold hover:shadow-[0_15px_40px_-15px_rgba(201,169,110,0.7)] transition"
            >
              <Phone size={14} /> Báo Giá · {car.name} · {color.name} · {FINISH.find(f => f.id === finish)?.name}
            </a>
          </div>

          {/* Controls (side panel — non-fullscreen) */}
          <div className="lg:col-span-4 space-y-5 max-h-[640px] overflow-y-auto pr-2">
            {controlsContent}
            <div className="text-[10px] text-text-muted font-serif italic pt-4 border-t border-border-gold/40">
              💡 Showroom 3D real-time bằng WebGL — minh hoạ chất liệu. Màu wrap & chất liệu da thực tế trên xe của bạn được tư vấn trực tiếp tại xưởng.
            </div>
            <div className="text-[9px] text-text-muted/70 font-serif">
              3D models: Three.js · mixmamo.studio · MMC Works · Santi_Zeiss · <span className="italic">CC BY 4.0</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
