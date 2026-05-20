// Defer mounting heavy sections until they're near the viewport.
// Reserves space with `minHeight` so layout doesn't shift when content arrives.
// Use for: 3D configurator, large showcase galleries, anything that ships a
// big JS chunk or many MB of images and isn't above the fold.

import { useEffect, useRef, useState, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Distance from viewport (CSS units) at which to start mounting */
  rootMargin?: string;
  /** Reserved height while not mounted — prevents CLS */
  minHeight?: string;
  /** Optional placeholder rendered while waiting */
  placeholder?: ReactNode;
};

export default function LazyMount({
  children,
  rootMargin = '300px',
  minHeight = '600px',
  placeholder = null,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted || !ref.current || typeof IntersectionObserver === 'undefined') {
      // SSR or older browser — mount immediately
      if (!mounted) setMounted(true);
      return;
    }
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted, rootMargin]);

  return (
    <div ref={ref} style={{ minHeight: mounted ? undefined : minHeight }}>
      {mounted ? children : placeholder}
    </div>
  );
}
