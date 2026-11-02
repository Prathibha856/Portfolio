import { achievements } from '../data/portfolio';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

export default function Achievements() {
  return (
    <section id="achievements" className="section container achievements-section">
      <Reveal direction="up">
        <SectionHeading number="06" eyebrow="Beyond the classroom" title="Consistency meets curiosity." />
      </Reveal>
      <div className="achievements-grid">
        {achievements.map((item, index) => (
          <Reveal key={item.title} direction="up" delay={index * 100}>
            <article className={index === 0 ? 'achievement-primary' : ''}>
              <span className="achievement-index mono" aria-hidden="true">0{index + 1}</span>
              <p className="eyebrow">{item.label}</p><h3>{item.title}</h3>
              {item.description && <p>{item.description}</p>}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}