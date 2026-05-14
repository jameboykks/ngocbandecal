import { MapPin, Mail, Clock, Phone } from 'lucide-react';
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

export default function TopBar() {
  return (
    <div className="hidden lg:block bg-bg-secondary border-b border-border-gold/40 relative z-30">
      <div className="container-x flex items-center justify-between text-[12px] text-text-secondary py-2.5">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5"><MapPin size={13} className="text-accent" />{SITE.address}</span>
          <span className="flex items-center gap-1.5"><Mail size={13} className="text-accent" />{SITE.email}</span>
          <span className="flex items-center gap-1.5"><Clock size={13} className="text-accent" />{SITE.hours}</span>
        </div>
        <div className="flex items-center gap-5">
          <a href={`tel:${SITE.hotlineRaw}`} className="flex items-center gap-1.5 text-text-primary font-medium hover:text-accent transition">
            <Phone size={13} className="text-accent" />{SITE.hotline}
          </a>
          <div className="flex items-center gap-3 pl-5 border-l border-border-gold/40">
            <a href={SITE.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="hover:text-accent transition"><Facebook /></a>
            <a href={SITE.tiktok} target="_blank" rel="noopener" aria-label="TikTok" className="hover:text-accent transition"><TikTok /></a>
            <a href={SITE.zalo} target="_blank" rel="noopener" aria-label="Zalo" className="hover:text-accent transition"><Zalo /></a>
          </div>
        </div>
      </div>
    </div>
  );
}
