import { useEffect, useState } from 'react';
import { Phone, MessageCircle, Calendar, Menu } from 'lucide-react';
import { SITE } from '../data/site';

const Zalo = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M12 2C6.48 2 2 5.94 2 10.8c0 2.74 1.45 5.18 3.71 6.79L4.93 21l3.62-1.83c1.07.31 2.22.48 3.45.48 5.52 0 10-3.94 10-8.85S17.52 2 12 2Z"/></svg>
);

export default function FloatingContact() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handler = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setShow(window.scrollY > 500);
        ticking = false;
      });
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      {/* Desktop floating buttons */}
      <div
        className={[
          'hidden md:flex fixed right-5 bottom-6 z-40 flex-col gap-3 transition-all duration-500',
          show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
        ].join(' ')}
      >
        <a href={SITE.zalo} target="_blank" rel="noopener" aria-label="Zalo"
          className="w-12 h-12 rounded-full bg-bg-card border border-accent text-accent flex items-center justify-center hover:bg-accent hover:text-bg-primary transition shadow-[0_10px_30px_-10px_rgba(201,169,110,0.5)]">
          <Zalo />
        </a>
        <a href={SITE.messenger} target="_blank" rel="noopener" aria-label="Messenger"
          className="w-12 h-12 rounded-full bg-bg-card border border-accent text-accent flex items-center justify-center hover:bg-accent hover:text-bg-primary transition shadow-[0_10px_30px_-10px_rgba(201,169,110,0.5)]">
          <MessageCircle size={20} />
        </a>
        <a href={`tel:${SITE.hotlineRaw}`} aria-label="Phone"
          className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-light via-accent to-accent-dark text-bg-primary flex items-center justify-center hover:scale-110 transition shadow-[0_10px_30px_-10px_rgba(201,169,110,0.7)] animate-pulse">
          <Phone size={20} />
        </a>
      </div>

      {/* Mobile bottom bar */}
      <div
        className={[
          'md:hidden fixed bottom-0 left-0 right-0 z-40 bg-bg-secondary border-t border-border-gold shadow-[0_-10px_30px_-24px_rgba(33,27,20,0.5)] transition-all duration-500',
          show ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none',
        ].join(' ')}
      >
        <div className="grid grid-cols-5 text-center text-text-secondary">
          <a href="#services" className="flex flex-col items-center gap-1 py-3 hover:text-accent transition">
            <Menu size={18} />
            <span className="text-[10px] uppercase tracking-wider">Menu</span>
          </a>
          <a href="#footer-form" className="flex flex-col items-center gap-1 py-3 hover:text-accent transition">
            <Calendar size={18} />
            <span className="text-[10px] uppercase tracking-wider">Đặt lịch</span>
          </a>
          <a href={`tel:${SITE.hotlineRaw}`} className="flex flex-col items-center gap-1 py-3 -mt-4 mx-1 bg-gradient-to-br from-accent-light via-accent to-accent-dark text-bg-primary rounded-full">
            <Phone size={20} />
            <span className="text-[10px] uppercase tracking-wider font-bold">Gọi</span>
          </a>
          <a href={SITE.messenger} target="_blank" rel="noopener" className="flex flex-col items-center gap-1 py-3 hover:text-accent transition">
            <MessageCircle size={18} />
            <span className="text-[10px] uppercase tracking-wider">Mess</span>
          </a>
          <a href={SITE.zalo} target="_blank" rel="noopener" className="flex flex-col items-center gap-1 py-3 hover:text-accent transition">
            <Zalo size={18} />
            <span className="text-[10px] uppercase tracking-wider">Zalo</span>
          </a>
        </div>
      </div>
    </>
  );
}
