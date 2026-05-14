import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../data/site';

export default function MegaMenu() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(SERVICES[0]);

  return (
    <div
      onPointerEnter={() => setOpen(true)}
      onPointerLeave={() => setOpen(false)}
      className="relative"
    >
      <Link
        to="/dich-vu"
        className="text-[13px] uppercase tracking-[0.18em] text-text-secondary hover:text-accent transition py-2 inline-flex items-center gap-1"
      >
        Dịch vụ <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </Link>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[760px] bg-bg-secondary border border-border-gold shadow-[0_25px_60px_-30px_rgba(33,27,20,0.5)]"
          >
            <div className="grid grid-cols-12 gap-px bg-border-gold/40">
              {/* Services list */}
              <ul className="col-span-7 bg-bg-secondary p-3">
                {SERVICES.map(s => (
                  <li key={s.slug}>
                    <Link
                      to={`/dich-vu/${s.slug}`}
                      onPointerEnter={() => setHovered(s)}
                      onClick={() => setOpen(false)}
                      className={[
                        'flex items-center justify-between px-4 py-3 transition group',
                        hovered.slug === s.slug ? 'bg-bg-card text-accent' : 'text-text-primary hover:bg-bg-card',
                      ].join(' ')}
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-display text-xs text-accent w-7">{s.n}</span>
                        <span className="font-display text-base tracking-wider">{s.title}</span>
                      </span>
                      <ArrowUpRight size={14} className={`transition-all ${hovered.slug === s.slug ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Preview */}
              <div className="col-span-5 bg-bg-secondary p-3">
                <Link
                  to={`/dich-vu/${hovered.slug}`}
                  onClick={() => setOpen(false)}
                  className="block group"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={hovered.slug}
                        src={hovered.cover}
                        alt={hovered.title}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/95 via-bg-primary/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="text-[10px] tracking-[0.25em] uppercase text-accent mb-1">Từ {hovered.priceFrom}đ</div>
                      <div className="font-display text-lg tracking-wider text-text-primary">{hovered.title}</div>
                      <p className="text-xs text-text-secondary mt-1 line-clamp-2">{hovered.desc}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
