// One principle card. On-scroll entrance (slide-up + fade), then hover lifts
// the card, grows a left accent bar, and shifts the number to --green.
// Renders as <li> so it is a valid direct child of the <ol.about-principles>
// list while keeping the inner <article> for landmark semantics.
import { motion as Motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

export default function PrincipleCard({ number, title, body, index = 0 }) {
  const reduce = useReducedMotion();
  return (
    <Motion.li
      className='principle-item'
      variants={reduce
        ? {}
        : {
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: reduce ? 0 : index * 0.15 } },
          }}
      whileHover={reduce ? undefined : { y: -6 }}
    >
      <article className='principle-card'>
        <span className='principle-bar' aria-hidden='true' />
        <span className='principle-number mono' aria-hidden='true'>{number}</span>
        <h3>{title}</h3>
        <p>{body}</p>
      </article>
    </Motion.li>
  );
}
