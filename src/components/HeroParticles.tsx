import { useEffect, useRef } from 'react';

/**
 * Lightweight Canvas2D particle field — gold sparks drifting upward,
 * with mouse repulsion and gentle connection lines forming an automotive grid feel.
 */
export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    const COUNT = window.innerWidth < 768 ? 22 : 45;
    const particles: P[] = [];
    const init = () => {
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.15,
          vy: -Math.random() * 0.25 - 0.05,
          r: Math.random() * 1.5 + 0.4,
          a: Math.random() * 0.5 + 0.25,
        });
      }
    };

    resize(); init();
    window.addEventListener('resize', () => { resize(); init(); });

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => { mouse.active = false; mouse.x = -9999; mouse.y = -9999; };
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);

    // Pause loop when canvas is out of view
    let visible = true;
    const obs = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    obs.observe(canvas);

    let raf = 0;
    let lastTime = 0;
    const TARGET_FPS = 45; // throttle from 60 to 45 — saves CPU, still smooth
    const FRAME_MS = 1000 / TARGET_FPS;

    const loop = (now: number = 0) => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      if (now - lastTime < FRAME_MS) return;
      lastTime = now;

      ctx.clearRect(0, 0, w, h);

      // Connection lines first (under particles)
      const maxDist = 95;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * 0.15;
            ctx.strokeStyle = `rgba(201,169,110,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Particles
      for (const p of particles) {
        // mouse repulsion
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 14000) {
            const f = (1 - d2 / 14000) * 1.2;
            p.vx += (dx / Math.sqrt(d2 + 1)) * f * 0.04;
            p.vy += (dy / Math.sqrt(d2 + 1)) * f * 0.04;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.vy -= 0.005; // slight upward drift

        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        // No shadowBlur — too expensive. Use color alpha for glow feel.
        ctx.fillStyle = `rgba(223,198,147,${p.a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden />;
}
