import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import PageHero from '../components/PageHero';
import { SITE } from '../data/site';

const Facebook = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z"/></svg>
);
const TikTok = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.5 20.1a6.34 6.34 0 0 0 10.86-4.43V8.42a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.54-.18Z"/></svg>
);
const Zalo = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C6.48 2 2 5.94 2 10.8c0 2.74 1.45 5.18 3.71 6.79L4.93 21l3.62-1.83c1.07.31 2.22.48 3.45.48 5.52 0 10-3.94 10-8.85S17.52 2 12 2Z"/></svg>
);

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', service: '', msg: '' });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    const text = `Tên: ${form.name}%0ASĐT: ${form.phone}%0ADịch vụ: ${form.service || 'Chưa chọn'}%0AYêu cầu: ${form.msg || 'Tư vấn'}`;
    window.open(`https://zalo.me/${SITE.hotlineRaw}?msg=${text}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', phone: '', service: '', msg: '' });
  };

  return (
    <>
      <PageHero
        eyebrow="Liên Hệ"
        title="GẶP NHAU"
        highlight="TẠI ĐÀ NẴNG"
        subtitle="Ghé xưởng để xem trực tiếp chất liệu, trải nghiệm phòng demo, hoặc gọi ngay để được tư vấn miễn phí qua điện thoại."
        crumbs={[{ label: 'Liên hệ' }]}
      />

      <section className="section-y bg-bg-primary">
        <div className="container-x grid lg:grid-cols-12 gap-10">
          {/* Info */}
          <div className="lg:col-span-5">
            <div className="eyebrow mb-5">Thông Tin Liên Hệ</div>
            <h2 className="h-display text-4xl md:text-5xl mb-8">
              CÒN <span className="text-gold-gradient">CHỜ GÌ</span><br />MÀ KHÔNG GHÉ?
            </h2>

            <ul className="space-y-5 mb-10">
              <li className="flex gap-4">
                <div className="w-11 h-11 rounded-full border border-border-gold flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-accent" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.25em] uppercase text-text-muted mb-1">Địa chỉ</div>
                  <div className="text-text-primary">{SITE.address}</div>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-11 h-11 rounded-full border border-border-gold flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-accent" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.25em] uppercase text-text-muted mb-1">Hotline</div>
                  <a href={`tel:${SITE.hotlineRaw}`} className="text-text-primary hover:text-accent text-xl font-display tracking-wider">{SITE.hotline}</a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-11 h-11 rounded-full border border-border-gold flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-accent" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.25em] uppercase text-text-muted mb-1">Email</div>
                  <a href={`mailto:${SITE.email}`} className="text-text-primary hover:text-accent break-all">{SITE.email}</a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-11 h-11 rounded-full border border-border-gold flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-accent" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.25em] uppercase text-text-muted mb-1">Giờ làm việc</div>
                  <div className="text-text-primary">{SITE.hours}</div>
                </div>
              </li>
            </ul>

            <div className="flex gap-2">
              <a href={SITE.facebook} target="_blank" rel="noopener" className="w-10 h-10 border border-border-gold flex items-center justify-center hover:border-accent hover:text-accent transition" aria-label="Facebook"><Facebook /></a>
              <a href={SITE.tiktok} target="_blank" rel="noopener" className="w-10 h-10 border border-border-gold flex items-center justify-center hover:border-accent hover:text-accent transition" aria-label="TikTok"><TikTok /></a>
              <a href={SITE.zalo} target="_blank" rel="noopener" className="w-10 h-10 border border-border-gold flex items-center justify-center hover:border-accent hover:text-accent transition" aria-label="Zalo"><Zalo /></a>
            </div>

            <figure className="mt-10 overflow-hidden border border-border-gold bg-bg-contrast">
              <div className="relative aspect-[16/10]">
                <img
                  src="/images/ngoc-ban/studio-street-front.jpeg"
                  alt="Mặt tiền Ngọc Bàn Decal"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-contrast/65 via-transparent to-transparent" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-[10px] uppercase tracking-[0.26em] text-accent">Nhận diện mặt tiền</div>
                  <div className="mt-2 font-display text-2xl uppercase tracking-[0.08em] text-bg-primary">Ngọc Bàn Decal</div>
                </figcaption>
              </div>
            </figure>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <form onSubmit={submit} className="bg-bg-card border border-border-gold p-8">
              <div className="text-[11px] tracking-[0.25em] uppercase text-accent mb-2">Yêu Cầu Tư Vấn</div>
              <h3 className="font-display text-3xl tracking-wider mb-6">Gửi Yêu Cầu Cho Chúng Tôi</h3>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-[11px] tracking-[0.2em] uppercase text-text-secondary block mb-2">Họ và tên *</label>
                  <input
                    type="text" required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-bg-primary border border-border-gold px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-accent outline-none transition"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div>
                  <label className="text-[11px] tracking-[0.2em] uppercase text-text-secondary block mb-2">Số điện thoại *</label>
                  <input
                    type="tel" required
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-bg-primary border border-border-gold px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-accent outline-none transition"
                    placeholder="0xxx xxx xxx"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-[11px] tracking-[0.2em] uppercase text-text-secondary block mb-2">Dịch vụ quan tâm</label>
                <select
                  value={form.service}
                  onChange={e => setForm({ ...form, service: e.target.value })}
                  className="w-full bg-bg-primary border border-border-gold px-4 py-3 text-text-primary focus:border-accent outline-none"
                >
                  <option value="">Chọn dịch vụ...</option>
                  <option>Wrap đổi màu</option>
                  <option>Dán PPF</option>
                  <option>Film cách nhiệt</option>
                  <option>Tem xe</option>
                  <option>Chăm sóc xe</option>
                  <option>Đồ độ phụ kiện</option>
                  <option>Khác / Tư vấn tổng quát</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="text-[11px] tracking-[0.2em] uppercase text-text-secondary block mb-2">Yêu cầu / dòng xe</label>
                <textarea
                  rows={4}
                  value={form.msg}
                  onChange={e => setForm({ ...form, msg: e.target.value })}
                  className="w-full bg-bg-primary border border-border-gold px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-accent outline-none transition resize-none"
                  placeholder="Ví dụ: Honda CRV 2024, muốn wrap matte black toàn xe, xin báo giá..."
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-br from-accent-light via-accent to-accent-dark text-bg-primary text-[12px] tracking-[0.25em] uppercase font-bold hover:shadow-[0_15px_40px_-15px_rgba(201,169,110,0.7)] transition"
              >
                {sent ? '✓ Đã Gửi — Đang Mở Zalo' : <>Gửi Yêu Cầu Qua Zalo <Send size={14} /></>}
              </button>
              <p className="mt-3 text-xs text-text-muted text-center font-serif italic">
                * Form gửi qua Zalo để nhận tư vấn ngay lập tức.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-bg-secondary">
        <div className="container-x py-12">
          <div className="text-center mb-8">
            <div className="eyebrow mb-4 justify-center">Bản Đồ</div>
            <h3 className="h-display text-3xl md:text-4xl">GHÉ <span className="text-gold-gradient">XƯỞNG</span></h3>
          </div>
          <div className="aspect-[16/7] border border-border-gold overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3833.9!2d108.18!3d16.02!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjEgVGjDoG5oIFRow6FpLCBLaHXDqiBUcnVuZywgQ-G6qW0gTOG7hywgxJDDoCBO4bq1bmc!5e0!3m2!1svi!2s!4v1700000000000"
              className="w-full h-full grayscale-[60%] hover:grayscale-0 transition"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ngọc Bàn Map"
            />
          </div>
        </div>
      </section>
    </>
  );
}
