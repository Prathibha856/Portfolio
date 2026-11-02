import { certifications } from '../data/portfolio';
import Reveal from './Reveal';

export default function Certifications() {
  if (!certifications.length) return null;

  return (
    <section id="certifications" className="section container">
      <Reveal direction="up">
        <div className="section-heading"><p className="eyebrow">Continued learning</p><h2>Certifications & training.</h2></div>
      </Reveal>
      <div className="achievements-grid">
        {certifications.map((item, index) => (
          <Reveal key={`${item.title}-${item.issuer}`} direction="up" delay={Math.min(index * 70, 420)}>
            <article>
              <p className="eyebrow">{item.issuer}</p><h3>{item.title}</h3>
              {item.date && <p>{item.date}</p>}
              {item.description && <p>{item.description}</p>}
              {item.url && <a className="text-link" href={item.url}>View credential <span aria-hidden="true">↗</span></a>}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}