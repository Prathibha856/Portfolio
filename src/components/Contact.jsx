import { profile } from '../data/portfolio';
import ProfileLinks from './ProfileLinks';
import Reveal from './Reveal';

export default function Contact() {
  return (
    <section id='contact' className='contact-band' tabIndex={-1}>
      <div className='container contact-grid'>
        <Reveal direction="up">
          <div>
            <p className='eyebrow'>Let's connect</p>
            <h2>Good questions.<br /><em>Meaningful solutions.</em></h2>
            <p>Interested in my work? Let's talk about applied machine learning, data science, and opportunities to learn and contribute.</p>
          </div>
        </Reveal>
        <Reveal direction="up" delay={200} className='contact-actions'>
          <p className='mono'>
            Prathibha D<br />
            AI/ML · Data Science<br />
            Software Development
            {profile.location && <><br />{profile.location}</>}
            {profile.phone && <><br /><a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a></>}
            {profile.email && <><br /><a href={`mailto:${profile.email}`}>{profile.email}</a></>}
          </p>
          {profile.email && <a className='button button-light' href={'mailto:' + profile.email}>Get in touch <span aria-hidden='true'>↗</span></a>}
          <ProfileLinks />
          {profile.resumeUrl && <a className='text-link' href={profile.resumeUrl} download>Download resume ↓</a>}
        </Reveal>
      </div>
    </section>
  );
}