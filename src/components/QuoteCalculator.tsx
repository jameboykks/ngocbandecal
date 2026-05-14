import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Phone } from 'lucide-react';
import { SITE } from '../data/site';

const TYPES = [
  { id: 'sedan', name: 'Sedan / 4 chỗ', mult: 1 },
  { id: 'suv5', name: 'SUV / 5 chỗ', mult: 1.15 },
  { id: 'suv7', name: 'SUV / 7 chỗ', mult: 1.35 },
  { id: 'pickup', name: 'Pickup / Bán tải', mult: 1.25 },
  { id: 'lux', name: 'Xe sang (Mer/BMW/Audi)', mult: 1.6 },
  { id: 'super', name: 'Siêu xe (Porsche/RR)', mult: 2.2 },
];

const SERVICES = [
  { id: 'wrap', name: 'Wrap đổi màu', base: 8000000 },
  { id: 'ppf', name: 'Dán PPF bảo vệ sơn', base: 15000000 },
  { id: 'film', name: 'Film cách nhiệt', base: 5000000 },
  { id: 'detail', name: 'Chăm sóc / Detailing', base: 1500000 },
  { id: 'tem', name: 'Tem xe / Decal sườn', base: 2000000 },
];

const MATS: Record<string, { id: string; name: string; mult: number }[]> = {
  wrap: [
    { id: 'avery', name: 'Avery Standard', mult: 1 },
    { id: 'teckwrap', name: 'Teckwrap Premium', mult: 1.4 },
    { id: '3m', name: '3M Pro USA', mult: 1.7 },
  ],
  ppf: [
    { id: 'std', name: 'PPF Standard', mult: 1 },
    { id: '3mpro', name: '3M Pro Series', mult: 1.6 },
    { id: 'premium', name: 'Premium TPU', mult: 2.2 },
  ],
  film: [
    { id: 'normal', name: 'Film thường', mult: 1 },
    { id: 'ceramax', name: 'Ceramax', mult: 1.8 },
    { id: 'crystalline', name: '3M Crystalline', mult: 2.8 },
  ],
  detail: [
    { id: 'basic', name: 'Đánh bóng cơ bản', mult: 1 },
    { id: 'ceramic', name: 'Phủ Ceramic 9H', mult: 2.2 },
    { id: 'full', name: 'Detailing toàn diện', mult: 3.5 },
  ],
  tem: [
    { id: 'sm', name: 'Tem sườn nhỏ', mult: 1 },
    { id: 'full', name: 'Tem sườn lớn', mult: 2 },
    { id: 'custom', name: 'Custom design', mult: 3 },
  ],
};

const fmt = (n: number) => n.toLocaleString('vi-VN') + 'đ';

export default function QuoteCalculator() {
  const [step, setStep] = useState(0);
  const [type, setType] = useState(TYPES[0]);
  const [svc, setSvc] = useState(SERVICES[0]);
  const [mat, setMat] = useState(MATS[SERVICES[0].id][0]);

  const range = useMemo(() => {
    const base = svc.base * mat.mult * type.mult;
    return [Math.round(base * 0.85), Math.round(base * 1.2)];
  }, [type, svc, mat]);

  const next = () => setStep(s => Math.min(s + 1, 3));
  const back = () => setStep(s => Math.max(s - 1, 0));
  const reset = () => { setStep(0); setType(TYPES[0]); setSvc(SERVICES[0]); setMat(MATS[SERVICES[0].id][0]); };

  const STEPS = ['Dòng xe', 'Dịch vụ', 'Chất liệu', 'Báo giá'];

  return (
    <section className="section-y bg-bg-primary relative">
      <div className="absolute inset-0 radial-glow opacity-50" />
      <div className="container-x relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="eyebrow mb-5 justify-center">Tính Giá Nhanh</div>
          <h2 className="h-display text-5xl md:text-6xl lg:text-7xl mb-5">
            BÁO GIÁ <span className="text-gold-gradient">NGAY</span> TRONG<br />30 GIÂY
          </h2>
          <p className="font-serif italic text-lg text-text-secondary">
            Trả lời 3 câu hỏi nhanh — nhận khoảng giá tham khảo ngay lập tức. Không cần đợi tư vấn viên.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-bg-card border border-border-gold p-8 md:p-12">
          {/* Stepper */}
          <div className="flex items-center justify-between mb-10">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div className={[
                    'w-9 h-9 rounded-full border flex items-center justify-center font-display text-sm transition',
                    i < step ? 'bg-accent border-accent text-bg-primary' :
                    i === step ? 'border-accent text-accent bg-accent/10' :
                    'border-border-gold text-text-muted',
                  ].join(' ')}>
                    {i < step ? <Check size={14} /> : i + 1}
                  </div>
                  <div className={[
                    'mt-2 text-[10px] tracking-[0.2em] uppercase',
                    i <= step ? 'text-accent' : 'text-text-muted',
                  ].join(' ')}>{s}</div>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={[
                    'flex-1 h-px mx-3 mb-5 transition',
                    i < step ? 'bg-accent' : 'bg-border-gold',
                  ].join(' ')} />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-[260px]"
            >
              {step === 0 && (
                <div>
                  <h3 className="font-display text-2xl tracking-wider mb-6">Xe của bạn thuộc dòng nào?</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {TYPES.map(t => (
                      <button
                        key={t.id}
                        onClick={() => { setType(t); next(); }}
                        data-cursor="link"
                        className={[
                          'flex items-center justify-between px-5 py-4 border text-left transition',
                          type.id === t.id ? 'border-accent bg-accent/10 text-accent' : 'border-border-gold text-text-primary hover:border-accent hover:text-accent',
                        ].join(' ')}
                      >
                        <span className="font-display tracking-wider">{t.name}</span>
                        <ArrowRight size={14} className="text-accent" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h3 className="font-display text-2xl tracking-wider mb-6">Bạn quan tâm dịch vụ nào?</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {SERVICES.map(s => (
                      <button
                        key={s.id}
                        onClick={() => { setSvc(s); setMat(MATS[s.id][0]); next(); }}
                        data-cursor="link"
                        className={[
                          'flex items-center justify-between px-5 py-4 border text-left transition',
                          svc.id === s.id ? 'border-accent bg-accent/10 text-accent' : 'border-border-gold text-text-primary hover:border-accent hover:text-accent',
                        ].join(' ')}
                      >
                        <span className="font-display tracking-wider">{s.name}</span>
                        <ArrowRight size={14} className="text-accent" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="font-display text-2xl tracking-wider mb-6">Chọn chất liệu</h3>
                  <div className="space-y-3">
                    {MATS[svc.id].map(m => (
                      <button
                        key={m.id}
                        onClick={() => { setMat(m); next(); }}
                        data-cursor="link"
                        className={[
                          'w-full flex items-center justify-between px-5 py-4 border text-left transition',
                          mat.id === m.id ? 'border-accent bg-accent/10 text-accent' : 'border-border-gold text-text-primary hover:border-accent hover:text-accent',
                        ].join(' ')}
                      >
                        <span className="font-display tracking-wider">{m.name}</span>
                        <span className="text-xs text-text-secondary">×{m.mult.toFixed(2)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="text-center">
                  <div className="text-[11px] tracking-[0.3em] uppercase text-accent mb-2">Khoảng giá tham khảo</div>
                  <div className="font-display text-4xl md:text-6xl text-gold-gradient mb-2">
                    {fmt(range[0])} – {fmt(range[1])}
                  </div>
                  <p className="font-serif italic text-text-secondary mb-8">
                    Cho {type.name} · {svc.name} · {mat.name}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    <a
                      href={`tel:${SITE.hotlineRaw}`}
                      data-cursor="link"
                      className="flex items-center justify-center gap-2 py-4 bg-gradient-to-br from-accent-light via-accent to-accent-dark text-bg-primary text-[12px] tracking-[0.25em] uppercase font-bold hover:shadow-[0_15px_40px_-15px_rgba(201,169,110,0.7)] transition"
                    >
                      <Phone size={14} /> Gọi Báo Giá Chính Xác
                    </a>
                    <a
                      href={`${SITE.zalo}?msg=Xin%20báo%20giá:%20${encodeURIComponent(type.name)}%20-%20${encodeURIComponent(svc.name)}%20-%20${encodeURIComponent(mat.name)}`}
                      target="_blank" rel="noopener"
                      data-cursor="link"
                      className="flex items-center justify-center gap-2 py-4 border border-border-gold text-text-primary text-[12px] tracking-[0.25em] uppercase hover:border-accent hover:text-accent transition"
                    >
                      Chat Zalo Tư Vấn
                    </a>
                  </div>
                  <button
                    onClick={reset}
                    className="text-xs text-text-secondary hover:text-accent transition tracking-[0.18em] uppercase"
                  >
                    ← Tính lại từ đầu
                  </button>
                  <p className="mt-6 text-xs text-text-muted font-serif italic max-w-md mx-auto">
                    * Giá là khoảng ước lượng dựa trên chất liệu và dòng xe phổ biến. Giá thực tế có thể thay đổi theo độ phức tạp và yêu cầu cụ thể.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {step > 0 && step < 3 && (
            <div className="mt-8 flex justify-between">
              <button
                onClick={back}
                className="inline-flex items-center gap-2 text-[12px] tracking-[0.25em] uppercase text-text-secondary hover:text-accent transition"
              >
                <ArrowLeft size={14} /> Quay lại
              </button>
              <span className="text-xs text-text-muted">Bước {step + 1} / {STEPS.length}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
