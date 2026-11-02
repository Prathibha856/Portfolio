import { motion as Motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { skillGroups } from '../data/portfolio';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const EASE = [0.22, 1, 0.36, 1];

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const tagListVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.12, staggerChildren: 0.04 } },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.28, ease: EASE } },
};

// The lift lives on the inner panel rather than on a `whileHover` variant:
// a `whileHover` label makes the card a "controlling variants" node, which
// excludes it from the grid's variant tree and kills the stagger.
function SkillCard({ group, index }) {
  const reduce = useReducedMotion();
  const hoverTarget = useMotionValue(0);
  const lift = useSpring(hoverTarget, { stiffness: 320, damping: 26 });

  return (
    <Motion.article
      className='skill-card'
      variants={cardVariants}
      onHoverStart={() => hoverTarget.set(reduce ? 0 : -4)}
      onHoverEnd={() => hoverTarget.set(0)}
    >
      <Motion.div className='skill-card-panel' style={{ y: lift }}>
        <div className='skill-card-head'>
          <span className='mono skill-number'>0{index + 1}</span>
          <h3>{group.name}</h3>
          <p>{group.description}</p>
        </div>
        <Motion.ul className='tags' variants={tagListVariants}>
          {group.items.map((skill) => (
            <Motion.li key={skill} variants={tagVariants}>{skill}</Motion.li>
          ))}
        </Motion.ul>
      </Motion.div>
    </Motion.article>
  );
}

export default function Skills() {
  const reduce = useReducedMotion();
  return (
    <section id='skills' className='skills-band' tabIndex={-1}>
      <div className='section container skills-layout'>
        <Reveal direction='up'>
          <SectionHeading title='Skills' />
        </Reveal>
        <Motion.div
          className='skill-grid'
          variants={gridVariants}
          initial={reduce ? false : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.15 }}
        >
          {skillGroups.map((group, index) => (
            <SkillCard key={group.name} group={group} index={index} />
          ))}
        </Motion.div>
      </div>
    </section>
  );
}
