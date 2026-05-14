import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { SITE } from '../data/site';

const Zalo = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.48 2 2 5.94 2 10.8c0 2.74 1.45 5.18 3.71 6.79L4.93 21l3.62-1.83c1.07.31 2.22.48 3.45.48 5.52 0 10-3.94 10-8.85S17.52 2 12 2Z"/></svg>
);

export default function CTA() {
  return (
    <section id="contact" className="section-y bg-bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 radial-glow" />
      <div
        className="absolute inset-0 opacity-[0.07] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/ngoc-ban/portfolio/p039.webp')" }}
      />
      <div className="container-x relative z-10 text-center max-w-4xl mx-auto">
        <div className="eyebrow mb-6 justify-center">Đặt Lịch Ngay Hôm Nay</div>
        <h2 className="h-display text-5xl md:text-7xl lg:text-8xl mb-8">
          SẴN SÀNG <span className="text-gold-gradient">THAY ĐỔI</span><br />DIỆN MẠO XE CỦA BẠN?
        </h2>
        <p className="font-serif italic text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
          Liên hệ ngay để được tư vấn miễn phí và nhận báo giá chi tiết. Đội ngũ Ngọc Bàn luôn sẵn sàng
          phục vụ 24/24 cho khách hàng cần gấp.
        </p>

        <a
          href={`tel:${SITE.hotlineRaw}`}
          className="block font-display text-6xl md:text-8xl lg:text-9xl text-gold-gradient mb-12 hover:tracking-[0.05em] transition-all duration-500"
        >
          {SITE.hotline}
        </a>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl mx-auto">
          <a
            href={`tel:${SITE.hotlineRaw}`}
            className="flex items-center justify-center gap-2 py-4 bg-gradient-to-br from-accent-light via-accent to-accent-dark text-bg-primary text-[12px] tracking-[0.2em] uppercase font-semibold hover:shadow-[0_15px_40px_-15px_rgba(201,169,110,0.7)] transition"
          >
            <Phone size={16} /> Gọi Ngay
          </a>
          <a
            href={SITE.zalo}
            target="_blank"
            rel="noopener"
            className="flex items-center justify-center gap-2 py-4 border border-border-gold text-text-primary text-[12px] tracking-[0.2em] uppercase hover:border-accent hover:text-accent transition"
          >
            <Zalo /> Zalo
          </a>
          <a
            href={SITE.messenger}
            target="_blank"
            rel="noopener"
            className="flex items-center justify-center gap-2 py-4 border border-border-gold text-text-primary text-[12px] tracking-[0.2em] uppercase hover:border-accent hover:text-accent transition"
          >
            <MessageCircle size={16} /> Messenger
          </a>
          <a
            href="#footer-form"
            className="flex items-center justify-center gap-2 py-4 border border-border-gold text-text-primary text-[12px] tracking-[0.2em] uppercase hover:border-accent hover:text-accent transition"
          >
            <Calendar size={16} /> Đặt Lịch
          </a>
        </div>
      </div>
    </section>
  );
}
