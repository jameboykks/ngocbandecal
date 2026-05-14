import { useRef } from 'react';

type Props = {
  max?: number;
  glare?: boolean;
  className?: string;
  children: React.ReactNode;
};

export default function Tilt({ max = 8, glare = true, className = '', children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * -2 * max;
    const ry = (px - 0.5) * 2 * max;
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(201,169,110,0.18), transparent 50%)`;
    }
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
    if (glareRef.current) glareRef.current.style.background = 'transparent';
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ transition: 'transform .25s cubic-bezier(.22,1,.36,1)', transformStyle: 'preserve-3d' }}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ transition: 'background .25s ease' }}
        />
      )}
    </div>
  );
}
