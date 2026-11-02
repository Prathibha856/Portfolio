import { useRef } from 'react';
import { motion as Motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

export default function MagneticButton({ href, className, children, download }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  const handlePointerMove = (event) => {
    if (reduce || event.pointerType !== 'mouse') return;
    const rect = ref.current.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    if (Math.hypot(relX, relY) > 100) {
      x.set(0);
      y.set(0);
      return;
    }
    x.set(relX * 0.3);
    y.set(relY * 0.3);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Motion.a
      ref={ref}
      href={href}
      download={download || undefined}
      className={className}
      style={{ x: springX, y: springY }}
      whileHover={reduce ? undefined : { scale: 1.03 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </Motion.a>
  );
}
