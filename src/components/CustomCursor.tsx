import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<'default' | 'link' | 'view'>('default');
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    document.body.style.cursor = 'none';

    let rx = 0, ry = 0; // ring position (smoothed)
    let mx = 0, my = 0; // mouse position
    let raf = 0;
    let running = false;

    const stopWhenSettled = () => {
      const dx = mx - rx, dy = my - ry;
      if (Math.abs(dx) < 0.3 && Math.abs(dy) < 0.3) {
        running = false;
        return true;
      }
      return false;
    };

    const tick = () => {
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      if (stopWhenSettled()) return;
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const move = (e: PointerEvent) => {
      mx = e.clientX; my = e.clientY;
      setHidden(false);
      if (dot.current) dot.current.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
      start();
    };
    const leave = () => setHidden(true);

    const detect = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest('[data-cursor="view"]')) setVariant('view');
      else if (t.closest('a, button, [role=button], input, select, textarea, [data-cursor="link"]')) setVariant('link');
      else setVariant('default');
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', detect);
    window.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', detect);
      window.removeEventListener('pointerleave', leave);
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <div className={`pointer-events-none fixed inset-0 z-[90] hidden lg:block ${hidden ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}>
      <div
        ref={dot}
        className="absolute top-0 left-0 w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(201,169,110,0.8)]"
      />
      <div
        ref={ring}
        className={[
          'absolute top-0 left-0 rounded-full border border-accent transition-all duration-300 flex items-center justify-center text-[9px] tracking-[0.3em] uppercase font-bold text-bg-primary',
          variant === 'view' ? 'w-20 h-20 bg-accent/90 -ml-7 -mt-7' :
          variant === 'link' ? 'w-12 h-12 bg-accent/15 -ml-1.5 -mt-1.5' :
          'w-9 h-9',
        ].join(' ')}
      >
        {variant === 'view' && <span>Xem</span>}
      </div>
    </div>
  );
}
