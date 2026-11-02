import { education } from '../data/portfolio';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

export default function Education() {
  return (
    <section id="education" className="section container">
      <Reveal direction="up">
        <SectionHeading number="05" eyebrow="Education" title="A strong foundation." />
      </Reveal>
      <div className="education-list">
        {education.map((item, index) => (
          <Reveal key={item.degree} direction="up" delay={index * 120} className="education-panel">
            <div>
              <p className="eyebrow">{item.years}</p>
              <h3>{item.degree}</h3>
              <p>{item.institution}{item.location && ` · ${item.location}`}</p>
            </div>
            <div className="cgpa"><strong>{item.result}</strong><span className="mono">{item.resultLabel}</span></div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
