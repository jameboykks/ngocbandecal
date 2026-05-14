import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, animate } from 'framer-motion';

export default function Counter({ to, duration = 2, suffix = '' }: { to: number; duration?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [val, setVal] = useState(0);
  const mv = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: v => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration, mv]);

  return <span ref={ref}>{val.toLocaleString('vi-VN')}{suffix}</span>;
}
