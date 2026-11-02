import { useEffect, useRef, useState } from 'react';

/**
 * Reveal — wraps children and animates them into view on scroll.
 *
 * Props:
 *   direction: 'up' | 'down' | 'left' | 'right' | 'fade' (default 'up')
 *   delay:     milliseconds to delay the animation (default 0)
 *   duration:  milliseconds for the animation (default 700)
 *   once:      only animate the first time it enters view (default true)
 *   as:        HTML tag to render (default 'div')
 *   className: additional classes
 *   visible:   when true, renders revealed immediately and skips scroll
 *              detection (used to show re-listed items without re-animating)
 *   onReveal:  called the first time the element scrolls into view
 */
export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 700,
  once = true,
  as,
  className = '',
  visible: visibleProp,
  onReveal,
  ...rest
}) {
  const ref = useRef(null);
  const Component = as || 'div';
  const onRevealRef = useRef(onReveal);
  const [revealed, setRevealed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const forced = visibleProp === true;
  const visible = forced || revealed;

  useEffect(() => {
    onRevealRef.current = onReveal;
  }, [onReveal]);

  useEffect(() => {
    if (forced) return undefined;
    const el = ref.current;
    if (!el || revealed) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          onRevealRef.current?.();
          if (once) observer.disconnect();
        } else if (!once) {
          setRevealed(false);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, revealed, forced]);

  return (
    <Component
      ref={ref}
      className={`reveal reveal-${direction} ${visible ? 'reveal-visible' : ''} ${className}`}
      style={{
        '--reveal-delay': `${delay}ms`,
        '--reveal-duration': `${duration}ms`,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}
