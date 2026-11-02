// Floating portrait card: slide-in entrance, continuous float, mouse-driven
// 3D tilt, and an animated PD monogram badge (hover spin and pulsing ring) over
// the photo. Exactly 3 nested motion wrappers (entrance, float, tilt) to keep
// the tree clean.
import { motion as Motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

export default function IdentityCard({ pageHidden, isMobile }) {
  const reduce = useReducedMotion();
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const shiftX = useMotionValue(0);
  const shiftY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 150, damping: 20 });
  const springTiltY = useSpring(tiltY, { stiffness: 150, damping: 20 });
  const springShiftX = useSpring(shiftX, { stiffness: 150, damping: 20 });
  const springShiftY = useSpring(shiftY, { stiffness: 150, damping: 20 });

  const handleMove = (event) => {
    if (reduce || isMobile || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(-relY * 6);
    tiltY.set(relX * 6);
    shiftX.set(relX * 8);
    shiftY.set(relY * 8);
  };
  const handleLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    shiftX.set(0);
    shiftY.set(0);
  };

  const floatActive = !reduce && !pageHidden && !isMobile;
  const tiltStyle = reduce || isMobile
    ? {}
    : { x: springShiftX, y: springShiftY, rotateX: springTiltX, rotateY: springTiltY, transformPerspective: 900 };

  return (
    <Motion.aside
      className='identity-card'
      aria-label='Portrait'
      variants={reduce
        ? {}
        : {
            hidden: { opacity: 0, x: 60 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE, delay: 0.3 } },
          }}
      initial={reduce ? false : 'hidden'}
      whileInView={reduce ? undefined : 'visible'}
      viewport={{ once: true, margin: '-80px' }}
      whileHover={reduce ? undefined : { y: -4 }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <Motion.div
        className='identity-card-float'
        animate={floatActive ? { y: [-6, 6, -6] } : { y: 0 }}
        transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
      >
        <Motion.div className='identity-card-tilt' style={tiltStyle}>
          <div className='identity-photo-wrap'>
            <img
              className='identity-photo'
              src='/prathibha.jpg'
              alt='Portrait of Prathibha D'
              width='1200'
              height='1280'
              loading='lazy'
              decoding='async'
            />
            <div className='monogram-card-wrap'>
              <Motion.span
                className='monogram-card'
                aria-hidden='true'
                variants={reduce
                  ? {}
                  : {
                      hidden: { scale: 0.6 },
                      visible: { scale: 1, transition: { type: 'spring', stiffness: 200, damping: 14 } },
                    }}
                whileHover={reduce ? undefined : { rotate: 360, transition: { duration: 0.8, ease: 'easeInOut' } }}
              >PD</Motion.span>
              {!reduce && (
                <Motion.span
                  className='monogram-pulse'
                  aria-hidden='true'
                  animate={{ scale: [1, 1.5], opacity: [0.45, 0] }}
                  transition={{ duration: 1.2, ease: 'easeOut', repeat: Infinity, repeatDelay: 3.8 }}
                />
              )}
            </div>
          </div>
        </Motion.div>
      </Motion.div>
    </Motion.aside>
  );
}