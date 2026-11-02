import { useEffect, useState } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import { profile } from '../data/portfolio';
import AnimatedHeading from './AnimatedHeading';
import MagneticButton from './MagneticButton';
import ProfileLinks from './ProfileLinks';
import Reveal from './Reveal';

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = (delay) => ({
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE, delay } },
});

export default function Hero() {
  const reduce = useReducedMotion();
  const [entranceDone, setEntranceDone] = useState(!!reduce);

  useEffect(() => {
    if (reduce) return undefined;
    const timer = setTimeout(() => setEntranceDone(true), 1800);
    return () => clearTimeout(timer);
  }, [reduce]);

  const willChange = entranceDone ? { willChange: 'auto' } : { willChange: 'transform, opacity' };

  return (
    <section id='hero' className='hero'>
      <div className='container'>
        <Motion.div
          className='hero-copy'
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0 } } }}
          initial={reduce ? false : 'hidden'}
          animate={reduce ? false : 'visible'}
          style={willChange}
        >
          <div className='hero-primary'>
            <Reveal direction='fade' duration={0}>
              <Motion.p className='eyebrow hero-eyebrow' variants={fadeUp(0)}>
                <span className='status-dot' aria-hidden='true' /> {profile.focus}
              </Motion.p>
            </Reveal>
            <Motion.p className='hero-intro' variants={fadeUp(0.15)}>Hi, I'm Prathibha D.</Motion.p>
            <AnimatedHeading
              as='h1'
              className='hero-heading'
              lines={[['Building', 'things', 'that', 'actually', 'work.']]}
              delay={280}
              stagger={70}
              emphasis={['actually']}
              triggerOnMount
            />
            <Motion.p className='hero-description' variants={fadeUp(0.7)}>{profile.introduction}</Motion.p>
          </div>
          <div className='hero-aside'>
            <Motion.div className='actions' variants={fadeUp(0.9)}>
              <MagneticButton href='#projects' className='button'>View Projects <span aria-hidden='true'>↗</span></MagneticButton>
              {profile.resumeUrl && (
                <MagneticButton href={profile.resumeUrl} className='button button-outline' download>
                  Download Resume <span aria-hidden='true'>↓</span>
                </MagneticButton>
              )}
            </Motion.div>
            <ProfileLinks />
          </div>
        </Motion.div>
      </div>
    </section>
  );
}
