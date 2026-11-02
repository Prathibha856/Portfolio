import AnimatedHeading from './AnimatedHeading';

export default function SectionHeading({ number, eyebrow, title, description }) {
  return (
    <div className="section-heading">
      {eyebrow && <p className="eyebrow">{number && <span>{number} /</span>} {eyebrow}</p>}
      <AnimatedHeading as='h2' text={title} className='section-title' tabIndex={-1} />
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
