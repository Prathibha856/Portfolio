import { experience } from '../data/portfolio';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

export default function Experience() {
  return (
    <section id="experience" className="section container" tabIndex={-1}>
      <Reveal direction="up">
        <SectionHeading title="Experience" />
      </Reveal>
      <div className="experience-list">
        {experience.map((role, index) => (
          <Reveal key={role.role} direction="up" delay={150 + index * 80}>
            <article className="experience-row">
              <div className="experience-date mono"><span className="timeline-dot" aria-hidden="true" />{role.dates}</div>
              <div>
                <p className="eyebrow">{role.company}{role.location && ` · ${role.location}`}</p>
                <h3>{role.role}</h3>
                {role.tags?.length > 0 && (
                  <ul className="tags" aria-label={`${role.role} — role tags`}>
                    {role.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                )}
                <p>{role.summary}</p>
              </div>
              <ul className="responsibilities">{role.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
