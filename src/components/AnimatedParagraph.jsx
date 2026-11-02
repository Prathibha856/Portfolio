// Line-by-line reveal for paragraphs. Pre-split segments fade up from y:20.
// Visual spans are aria-hidden so they don't interrupt line reading; an
// sr-only span carries the full text for screen readers. This avoids using
// aria-label on <p> (which axe-core flags as a prohibited attribute).
import { Fragment } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

export default function AnimatedParagraph({ segments, ariaLabel, className = '', delay = 0, lead = false }) {
  const reduce = useReducedMotion();
  const full = ariaLabel ?? segments.join(' ');
  return (
    <Motion.p
      className={`about-paragraph ${lead ? 'lead' : ''} ${className}`}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : delay } } }}
      initial={reduce ? false : 'hidden'}
      whileInView={reduce ? undefined : 'visible'}
      viewport={{ once: true, margin: '-80px' }}
    >
      <span className='sr-only'>{full}</span>
      <span className='paragraph-lines' aria-hidden='true'>
        {segments.map((segment, i) => (
          <Fragment key={`line-${i}`}>
            {i > 0 && ' '}
            <Motion.span
              className='paragraph-line'
              variants={reduce ? {} : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
            >{segment}</Motion.span>
          </Fragment>
        ))}
      </span>
    </Motion.p>
  );
}
