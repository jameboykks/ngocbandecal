import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingSplash() {
  const [show, setShow] = useState(() => {
    const skipSplash = new URLSearchParams(window.location.search).has('skipSplash');
    return !skipSplash && !sessionStorage.getItem('nb_splash_seen');
  });

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem('nb_splash_seen', '1');
    }, 1800);
    return () => clearTimeout(t);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[100] bg-bg-primary flex items-center justify-center pointer-events-none"
        >
          {/* Gold sweep */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/15 to-transparent"
          />

          <div className="relative text-center">
            {/* Logo morph in */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: '0.5em', filter: 'blur(8px)' }}
              animate={{ opacity: 1, letterSpacing: '0.1em', filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-6xl md:text-8xl"
            >
              NGỌC <span className="text-gold-gradient">BÀN</span>
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-3 text-[10px] tracking-[0.5em] uppercase text-text-secondary"
            >
              Wrap Decal · Đà Nẵng
            </motion.div>

            {/* Underline draw */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 mx-auto h-px w-32 bg-gradient-to-r from-transparent via-accent to-transparent origin-center"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
