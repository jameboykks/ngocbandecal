import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.005 });
  return <motion.div className="scroll-progress" style={{ scaleX: x }} />;
}
