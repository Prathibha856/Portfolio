import { motion as Motion } from 'framer-motion';
import { profile } from '../data/portfolio';

const listVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 1.1, staggerChildren: 0.1 } },
};

const linkVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function ProfileLinks() {
  const links = [
    { label: 'GitHub', href: profile.github },
    { label: 'LinkedIn', href: profile.linkedin },
    { label: 'Email', href: profile.email ? `mailto:${profile.email}` : null },
  ].filter((link) => link.href);

  if (!links.length) return null;

  return (
    <Motion.nav className='profile-links' aria-label='Professional links' variants={listVariants}>
      {links.map((link) => (
        <Motion.a key={link.label} href={link.href} variants={linkVariants}>
          {link.label} <span aria-hidden='true'>↗</span>
        </Motion.a>
      ))}
    </Motion.nav>
  );
}
