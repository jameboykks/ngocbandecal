import { useRef, useState } from 'react';
import { Upload, Sparkles, Download, RefreshCw, X, ImageIcon, Wand2 } from 'lucide-react';
import { SITE } from '../data/site';
import { WRAP_STYLES, STYLE_GROUPS } from '../data/wrapStyles';

const Zalo = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M12 2C6.48 2 2 5.94 2 10.8c0 2.74 1.45 5.18 3.71 6.79L4.93 21l3.62-1.83c1.07.31 2.22.48 3.45.48 5.52 0 10-3.94 10-8.85S17.52 2 12 2Z"/></svg>
);

// Downscale the uploaded photo before sending — keeps payload small & fast.
function fileToScaledDataUrl(file: File, max = 1024): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas không khả dụng'));
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Không đọc được ảnh')); };
    img.src = url;
  });
}

export default function StudioDesigner() {
  const [image, setImage] = useState<string | null>(null);
  const [styleId, setStyleId] = useState<string>('matte-black');
  const [customText, setCustomText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const activeStyle = WRAP_STYLES.find(s => s.id === styleId);
  const usingCustom = customText.trim().length > 0;

  async function onPick(file?: File) {
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Vui lòng chọn file ảnh.'); return; }
    setError(null);
    try {
      setImage(await fileToScaledDataUrl(file));
    } catch (e) {
      setError((e as Error).message);
    }
  }

  async function generate() {
    if (!image || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/generate-wrap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image, styleId, customText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Không tạo được ảnh.');
      setResult(data.image);
      if (typeof data.remaining === 'number') setRemaining(data.remaining);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function download() {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result;
    a.download = 'ngocban-studio-decal.png';
    a.click();
  }

  const chosenLabel = usingCustom ? customText.trim() : (activeStyle?.name || 'tự chọn');
  const zaloMsg = `Chào Ngọc Bàn, mình vừa thiết kế mẫu decal ở Ngọc Bàn Studio (phong cách: ${chosenLabel}) và muốn được tư vấn thi công.`;
  const zaloHref = `${SITE.zalo}?msg=${encodeURIComponent(zaloMsg)}`;

  return (
    <section id="studio" className="section-y bg-bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 radial-glow" />
      <div className="container-x relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="eyebrow justify-center mb-5">Ngọc Bàn Studio</div>
          <h2 className="h-display text-4xl md:text-6xl mb-5">
            THIẾT KẾ <span className="text-gold-gradient">DECAL</span> CHO XE CỦA BẠN
          </h2>
          <p className="font-serif italic text-lg text-text-secondary">
            Tải ảnh xe của bạn, chọn phong cách — Ngọc Bàn Studio dựng ngay mẫu wrap/decal đầy đủ 6 mặt trong vài giây.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* ── Controls ─────────────────────────────── */}
          <div className="lg:col-span-4 space-y-8">
            {/* Step 1 — upload */}
            <div>
              <div className="text-[11px] tracking-[0.3em] uppercase text-accent-dark font-semibold mb-3">Bước 1 — Ảnh xe của bạn</div>
              {!image ? (
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full aspect-[16/10] border border-dashed border-border-gold rounded-sm bg-bg-card flex flex-col items-center justify-center gap-3 text-text-secondary hover:border-accent hover:text-accent transition"
                >
                  <Upload size={30} />
                  <span className="text-sm tracking-wide">Bấm để tải ảnh lên</span>
                  <span className="text-[11px] text-text-muted">Chụp rõ góc 3/4 trước cho kết quả đẹp nhất</span>
                </button>
              ) : (
                <div className="relative">
                  <img src={image} alt="Xe của bạn" className="w-full aspect-[16/10] object-cover rounded-sm border border-border-gold" />
                  <button
                    onClick={() => { setImage(null); setResult(null); }}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-bg-primary/80 border border-border-gold flex items-center justify-center text-text-primary hover:text-accent transition"
                    aria-label="Xoá ảnh"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => onPick(e.target.files?.[0])} />
            </div>

            {/* Step 2 — style */}
            <div>
              <div className="text-[11px] tracking-[0.3em] uppercase text-accent-dark font-semibold mb-3">
                Bước 2 — Chọn phong cách
                {usingCustom && <span className="ml-2 normal-case tracking-normal text-[11px] text-text-muted font-normal italic">(đang bị bỏ qua — dùng mô tả bên dưới)</span>}
              </div>
              <div className={['space-y-4 max-h-[300px] overflow-y-auto pr-1 transition', usingCustom ? 'opacity-40' : ''].join(' ')}>
                {STYLE_GROUPS.map(group => (
                  <div key={group}>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-text-muted mb-2">{group}</div>
                    <div className="flex flex-wrap gap-2">
                      {WRAP_STYLES.filter(s => s.group === group).map(s => (
                        <button
                          key={s.id}
                          onClick={() => setStyleId(s.id)}
                          className={[
                            'px-3 py-2 text-[12px] rounded-sm border transition',
                            styleId === s.id
                              ? 'border-accent bg-accent/10 text-accent'
                              : 'border-border-gold text-text-secondary hover:border-accent hover:text-accent',
                          ].join(' ')}
                        >
                          {s.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Custom text */}
              <div className="mt-4">
                <div className="text-[10px] tracking-[0.2em] uppercase text-text-muted mb-2 flex items-center gap-1.5"><Wand2 size={12} /> Hoặc tự mô tả (không bắt buộc)</div>
                <input
                  type="text"
                  value={customText}
                  onChange={e => setCustomText(e.target.value)}
                  placeholder="VD: xanh mint phối trắng, tem sườn phong cách Nhật..."
                  className="w-full bg-bg-card border border-border-gold px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-accent outline-none transition"
                />
                <p className="mt-1.5 text-[11px] text-text-muted italic">Mô tả <b>màu sắc &amp; phong cách</b> (VD: "camo xanh rêu", "gradient tím than"). Tránh gõ chữ/tên thương hiệu — hệ thống có thể vẽ nguyên chữ đó lên xe.</p>
                {usingCustom && (
                  <p className="mt-1.5 text-[11px] text-accent italic">Đang dùng mô tả này — phong cách chọn ở trên sẽ được bỏ qua. Xoá ô này để quay lại chọn phong cách.</p>
                )}
              </div>
            </div>

            {/* Generate */}
            <button
              onClick={generate}
              disabled={!image || loading}
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-br from-accent-light via-accent to-accent-dark text-bg-primary text-[13px] tracking-[0.2em] uppercase font-semibold hover:shadow-[0_15px_40px_-15px_rgba(201,169,110,0.7)] transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? <><RefreshCw size={16} className="animate-spin" /> Đang thiết kế...</> : <><Sparkles size={16} /> Tạo mẫu decal</>}
            </button>
            {remaining !== null && (
              <p className="text-[12px] text-text-secondary text-center">Còn lại <b className="text-accent">{remaining}</b> lượt tạo miễn phí hôm nay.</p>
            )}
            {error && <div className="text-sm text-red-400 border border-red-400/40 bg-red-400/5 px-3 py-2 rounded-sm">{error}</div>}
            <p className="text-[11px] text-text-muted font-serif italic">
              * Ảnh minh hoạ do Ngọc Bàn Studio tạo — các mặt khuất được dựng tương đối. Kết quả thực tế sẽ được chốt chính xác tại xưởng.
            </p>
          </div>

          {/* ── Result (large) ───────────────────────── */}
          <div className="lg:col-span-8">
            <div className="text-[11px] tracking-[0.3em] uppercase text-accent-dark font-semibold mb-3">Kết quả — Car sheet 6 mặt</div>
            <div className="border border-border-gold rounded-sm bg-bg-card aspect-[3/2] overflow-hidden flex items-center justify-center relative">
              {loading ? (
                <div className="flex flex-col items-center gap-4 text-text-secondary px-6 text-center">
                  <div className="w-16 h-16 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
                  <div className="text-base tracking-wide">Ngọc Bàn Studio đang dựng xe của bạn</div>
                  <div className="text-[12px] text-text-muted">Thường mất khoảng 30–60 giây, đừng đóng trang nhé</div>
                </div>
              ) : result ? (
                <img src={result} alt="Mẫu decal 6 mặt" className="w-full h-full object-contain" />
              ) : (
                <div className="flex flex-col items-center gap-3 text-text-muted px-6 text-center">
                  <ImageIcon size={48} />
                  <div className="text-base">Kết quả sẽ hiện ở đây</div>
                </div>
              )}
            </div>

            {result && (
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={download}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-border-gold text-text-primary text-[12px] tracking-[0.2em] uppercase hover:border-accent hover:text-accent transition"
                >
                  <Download size={15} /> Tải ảnh
                </button>
                <button
                  onClick={generate}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-border-gold text-text-primary text-[12px] tracking-[0.2em] uppercase hover:border-accent hover:text-accent transition disabled:opacity-40"
                >
                  <RefreshCw size={15} /> Tạo mẫu khác
                </button>
                <a
                  href={zaloHref}
                  target="_blank"
                  rel="noopener"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-br from-accent-light via-accent to-accent-dark text-bg-primary text-[12px] tracking-[0.2em] uppercase font-semibold hover:shadow-[0_15px_40px_-15px_rgba(201,169,110,0.7)] transition"
                >
                  <Zalo size={15} /> Đặt lịch qua Zalo
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
