import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageTransition() {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setShow(true);
    const t = setTimeout(() => setShow(false), 700);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[95] bg-bg-primary pointer-events-none origin-left"
        >
          <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-r from-transparent via-accent/20 to-accent/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="font-display text-5xl text-gold-gradient tracking-widest">
              NGỌC BÀN
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
