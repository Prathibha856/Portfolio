// About section — editorial 3-layer layout:
//   1. Heading (eyebrow + word-reveal title + self-drawing divider)
//   2. Narrative paragraphs + floating/tilted identity card
//   3. Three principle cards, a decorative quote, and a signature signoff
// Background dotted texture, scroll parallax on the narrative (>900px only).
import { motion as Motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import usePageHidden from '../hooks/usePageHidden';
import useMediaQuery from '../hooks/useMediaQuery';
import AnimatedHeading from './AnimatedHeading';
import AnimatedParagraph from './AnimatedParagraph';
import IdentityCard from './IdentityCard';
import PrincipleCard from './PrincipleCard';

const EASE = [0.22, 1, 0.36, 1];

const LEDE = [
  "I'm Prathibha, a Computer Science Engineering student",
  'focused on applied machine learning and data science.',
];
const WORK = [
  'My work connects a strong academic foundation with practical problems:',
  'detecting fraud, understanding customer churn, predicting bus crowd density,',
  'and making data easier to explore.',
];
const INTERNSHIP = [
  'A Data Analyst internship at Bold Analytics added real-world context —',
  'preprocessing, exploratory analysis, visualization, and reporting.',
  "I'm building toward a career where data and software solve meaningful problems together.",
];

const PRINCIPLES = [
  { number: '01', title: 'Understand before building', body: 'I read the data first, then write code.' },
  { number: '02', title: 'Explain the why', body: 'Models are only useful if people understand them.' },
  { number: '03', title: 'Ship with intent', body: 'Fast prototypes that solve real problems.' },
];

export default function About() {
  const reduce = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const wide = useMediaQuery('(min-width: 900px)');
  const pageHidden = usePageHidden();

  const { scrollY } = useScroll();
  const rawParallax = useTransform(scrollY, [0, 2000], [0, 100]);
  const narrativeParallaxY = useSpring(rawParallax, { stiffness: 80, damping: 22, mass: 0.6 });
  const parallaxEnabled = !!wide && !reduce;

  return (
    <section id='about' className='section about' tabIndex={-1}>
      <div className='about-bg' aria-hidden='true' />
      <div className='container'>
        <header className='about-head'>
          <Motion.p
            className='eyebrow'
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span>01 /</span> A little about me
          </Motion.p>
          <AnimatedHeading text='Curiosity, backed by practice.' delay={0.1} />
          <Motion.div
            className='about-divider'
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={reduce ? undefined : { scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: reduce ? 0 : 0.3 }}
            style={{ transformOrigin: 'left' }}
          />
        </header>

        <div className='about-main'>
          <Motion.div
            className='about-narrative'
            style={parallaxEnabled ? { y: narrativeParallaxY } : undefined}
          >
            <AnimatedParagraph segments={LEDE} lead delay={0} />
            <AnimatedParagraph segments={WORK} delay={0.3} />
            <AnimatedParagraph segments={INTERNSHIP} delay={0.7} />
          </Motion.div>
          <IdentityCard pageHidden={pageHidden} isMobile={isMobile} />
        </div>

        <Motion.ol
          className='about-principles'
          initial={reduce ? false : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : 0.15 } } }}
        >
          {PRINCIPLES.map((p, i) => (
            <PrincipleCard key={p.number} number={p.number} title={p.title} body={p.body} index={i} />
          ))}
        </Motion.ol>

        <Motion.figure
          className='deco-quote'
          initial={reduce ? false : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }}
        >
          <Motion.div
            className='deco-quote-mark-wrap'
            variants={reduce
              ? {}
              : { hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 180, damping: 14 } } }}
            whileHover={reduce ? undefined : { rotate: 5, transition: { type: 'spring', stiffness: 200, damping: 12 } }}
          >
            <svg className='deco-quote-mark' viewBox='0 0 60 48' aria-hidden='true'>
              <path d='M0 48V28C0 12 8 2 24 0v8C14 10 10 16 10 24h14v24H0zm36 0V28C36 12 44 2 60 0v8c-10 2-14 8-14 16h14v24H36z' fill='currentColor' />
            </svg>
          </Motion.div>
          <Motion.figcaption
            className='deco-quote-text'
            variants={reduce
              ? {}
              : { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: EASE, delay: 0.5 } } }}
          >
            “Understand the data. Build with purpose.”
          </Motion.figcaption>
        </Motion.figure>

        <Motion.div
          className='about-signoff'
          initial={reduce ? false : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
        >
          <div className='signoff-flourish'>
            <Motion.span
              className='signoff-line'
              variants={reduce
                ? {}
                : { hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.8, ease: 'easeOut' } } }}
              style={{ transformOrigin: 'left' }}
            />
            <Motion.span
              className='signoff-monogram'
              aria-hidden='true'
              variants={reduce
                ? {}
                : { hidden: { scale: 0.5 }, visible: { scale: 1, transition: { type: 'spring', stiffness: 200, damping: 12, delay: 0.3 } } }}
            >PD</Motion.span>
          </div>
          <Motion.p
            className='signoff-text'
            variants={reduce
              ? {}
              : { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5, delay: 0.9 } } }}
          >
            Learning deeply. Building thoughtfully.
          </Motion.p>
        </Motion.div>
      </div>
    </section>
  );
}