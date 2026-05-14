import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
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

export default function Footer() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    const msg = `Tên: ${name}%0ASĐT: ${phone}%0AYêu cầu: Tư vấn dịch vụ Ngọc Bàn Decal`;
    window.open(`https://zalo.me/${SITE.hotlineRaw}?msg=${msg}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setName(''); setPhone('');
  };

  return (
    <footer className="bg-bg-primary border-t border-border-gold relative">
      <div className="container-x py-16">
        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          {/* Brand + form */}
          <div className="lg:col-span-5">
            <a href="#home" className="font-display text-4xl tracking-wider inline-block mb-4">
              NGỌC <span className="text-gold-gradient">BÀN</span>
            </a>
            <p className="text-sm text-text-secondary leading-relaxed mb-6 max-w-md">
              Trung tâm wrap decal, dán PPF, film cách nhiệt và chăm sóc xe ô tô chuyên nghiệp số 1 Đà Nẵng.
              Hơn 5.000 khách hàng đã tin tưởng đồng hành.
            </p>

            <form id="footer-form" onSubmit={submit} className="bg-bg-card border border-border-gold p-5">
              <div className="text-[11px] tracking-[0.25em] uppercase text-accent mb-3">Đăng Ký Nhận Tư Vấn</div>
              <div className="grid sm:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Họ và tên"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="bg-bg-primary border border-border-gold px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-accent outline-none transition"
                />
                <input
                  type="tel"
                  placeholder="Số điện thoại"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                  className="bg-bg-primary border border-border-gold px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-accent outline-none transition"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-br from-accent-light via-accent to-accent-dark text-bg-primary text-[12px] tracking-[0.2em] uppercase font-semibold hover:shadow-[0_10px_30px_-10px_rgba(201,169,110,0.7)] transition"
              >
                {sent ? 'Đã Gửi — Chờ Tư Vấn' : <>Gửi Yêu Cầu <Send size={14} /></>}
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-lg tracking-wider mb-5 text-text-primary">Liên Hệ</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li className="flex gap-3"><MapPin size={16} className="text-accent shrink-0 mt-0.5" />{SITE.address}</li>
              <li className="flex gap-3"><Phone size={16} className="text-accent shrink-0 mt-0.5" /><a href={`tel:${SITE.hotlineRaw}`} className="hover:text-accent">{SITE.hotline}</a></li>
              <li className="flex gap-3"><Mail size={16} className="text-accent shrink-0 mt-0.5" /><a href={`mailto:${SITE.email}`} className="hover:text-accent break-all">{SITE.email}</a></li>
              <li className="flex gap-3"><Clock size={16} className="text-accent shrink-0 mt-0.5" />{SITE.hours}</li>
            </ul>
            <div className="flex gap-2 mt-5">
              <a href={SITE.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="w-9 h-9 border border-border-gold flex items-center justify-center hover:border-accent hover:text-accent transition"><Facebook /></a>
              <a href={SITE.tiktok} target="_blank" rel="noopener" aria-label="TikTok" className="w-9 h-9 border border-border-gold flex items-center justify-center hover:border-accent hover:text-accent transition"><TikTok /></a>
              <a href={SITE.zalo} target="_blank" rel="noopener" aria-label="Zalo" className="w-9 h-9 border border-border-gold flex items-center justify-center hover:border-accent hover:text-accent transition"><Zalo /></a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display text-lg tracking-wider mb-5 text-text-primary">Dịch Vụ</h4>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li><Link to="/dich-vu/wrap-doi-mau" className="hover:text-accent">Wrap đổi màu</Link></li>
              <li><Link to="/dich-vu/dan-ppf" className="hover:text-accent">Dán PPF</Link></li>
              <li><Link to="/dich-vu/film-cach-nhiet" className="hover:text-accent">Film cách nhiệt</Link></li>
              <li><Link to="/dich-vu/tem-xe" className="hover:text-accent">Tem xe</Link></li>
              <li><Link to="/dich-vu/cham-soc-xe" className="hover:text-accent">Chăm sóc xe</Link></li>
              <li><Link to="/dich-vu/do-do-phu-kien" className="hover:text-accent">Đồ độ phụ kiện</Link></li>
              <li className="pt-2 border-t border-border-gold/40"><Link to="/blog" className="hover:text-accent">Blog kiến thức</Link></li>
              <li><Link to="/bang-gia" className="hover:text-accent">Bảng giá</Link></li>
            </ul>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-lg tracking-wider mb-5 text-text-primary">Bản Đồ</h4>
            <a
              href={SITE.maps}
              target="_blank"
              rel="noopener"
              className="block aspect-square overflow-hidden border border-border-gold hover:border-accent transition group"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3833.9!2d108.18!3d16.02!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjEgVGjDoG5oIFRow6FpLCBLaHXDqiBUcnVuZywgQ-G6qW0gTOG7hywgxJDDoCBO4bq1bmc!5e0!3m2!1svi!2s!4v1700000000000"
                className="w-full h-full grayscale-[80%] group-hover:grayscale-0 transition pointer-events-none"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ngọc Bàn Map"
              />
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-border-gold flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[12px] text-text-muted">
          <div>© {new Date().getFullYear()} {SITE.fullName}. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-accent">Chính sách bảo hành</a>
            <a href="#" className="hover:text-accent">Điều khoản</a>
            <a href="#" className="hover:text-accent">Bảo mật</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
