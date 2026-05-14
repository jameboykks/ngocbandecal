import { useRef } from 'react';

type Props = {
  strength?: number;
  className?: string;
  children: React.ReactNode;
};

export default function Magnetic({ strength = 0.35, className = '', children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * strength;
    const y = (e.clientY - r.top - r.height / 2) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate3d(0,0,0)';
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ transition: 'transform .35s cubic-bezier(.22,1,.36,1)' }}
      className={className}
    >
      {children}
    </div>
  );
}
