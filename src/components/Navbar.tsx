import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { SITE } from '../data/site';
import MegaMenu from './MegaMenu';
import Magnetic from './Magnetic';

const LINKS = [
  { to: '/', label: 'Trang chủ' },
  { to: '/bang-gia', label: 'Bảng giá' },
  { to: '/tac-pham', label: 'Tác phẩm' },
  { to: '/blog', label: 'Blog' },
  { to: '/lien-he', label: 'Liên hệ' },
];

const MOBILE_LINKS = [
  { to: '/', label: 'Trang chủ' },
  { to: '/dich-vu', label: 'Dịch vụ' },
  { to: '/bang-gia', label: 'Bảng giá' },
  { to: '/tac-pham', label: 'Tác phẩm' },
  { to: '/blog', label: 'Blog' },
  { to: '/lien-he', label: 'Liên hệ' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handler = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 16);
        ticking = false;
      });
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <nav
        className={[
          'sticky top-0 z-40 transition-all duration-300',
          scrolled
            ? 'bg-bg-primary/95 border-b border-border-gold/30 py-3 shadow-[0_10px_35px_-28px_rgba(33,27,20,0.55)] backdrop-blur-md'
            : 'bg-transparent py-5',
        ].join(' ')}
      >
        <div className="container-x flex items-center justify-between">
          <Link to="/" className="font-display text-3xl tracking-wider">
            NGỌC <span className="text-gold-gradient">BÀN</span>
          </Link>

          <ul className="hidden lg:flex items-center gap-8">
            <li>
              <NavLink to="/" end className={({ isActive }) => `text-[13px] uppercase tracking-[0.18em] hover:text-accent transition relative group py-2 ${isActive ? 'text-accent' : 'text-text-secondary'}`}>
                {({ isActive }) => (<>Trang chủ<span className={`absolute left-0 -bottom-0.5 h-px bg-accent transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} /></>)}
              </NavLink>
            </li>
            <li><MegaMenu /></li>
            {LINKS.slice(1).map(l => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `text-[13px] uppercase tracking-[0.18em] hover:text-accent transition relative group py-2 ${isActive ? 'text-accent' : 'text-text-secondary'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {l.label}
                      <span className={`absolute left-0 -bottom-0.5 h-px bg-accent transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Magnetic strength={0.25} className="hidden md:block">
              <a
                href={`tel:${SITE.hotlineRaw}`}
                data-cursor="link"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-gradient-to-br from-accent-light via-accent to-accent-dark text-bg-primary font-semibold text-[12px] tracking-[0.2em] uppercase hover:shadow-[0_10px_30px_-10px_rgba(201,169,110,0.7)] transition"
              >
                <Phone size={14} /> Đặt Lịch
              </a>
            </Magnetic>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 text-text-primary"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={[
          'fixed inset-0 z-50 lg:hidden transition-all duration-300',
          open ? 'opacity-100 visible' : 'opacity-0 invisible',
        ].join(' ')}
      >
        <div className="absolute inset-0 bg-bg-primary/98" onClick={() => setOpen(false)} />
        <div className="relative h-full flex flex-col items-center justify-center gap-7 px-6">
          <button onClick={() => setOpen(false)} className="absolute top-6 right-6 p-2 text-text-primary" aria-label="Close">
            <X size={28} />
          </button>
          <div className="font-display text-4xl tracking-wider mb-4">
            NGỌC <span className="text-gold-gradient">BÀN</span>
          </div>
          {MOBILE_LINKS.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                [
                  'text-2xl font-display tracking-wider transition',
                  isActive ? 'text-accent' : 'text-text-primary hover:text-accent',
                ].join(' ')
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href={`tel:${SITE.hotlineRaw}`}
            className="mt-6 inline-flex items-center gap-2 px-8 py-4 rounded-sm bg-gradient-to-br from-accent-light via-accent to-accent-dark text-bg-primary font-semibold tracking-[0.2em] uppercase"
          >
            <Phone size={16} /> {SITE.hotline}
          </a>
        </div>
      </div>
    </>
  );
}
