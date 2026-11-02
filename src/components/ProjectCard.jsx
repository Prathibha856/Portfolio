import Pipeline from './Pipeline';

export default function ProjectCard({ project }) {
  return (
    <article className={`project-card ${project.featured ? 'featured' : ''}`}>
      <div className="project-topline">
        <span className="mono">{project.number} / {project.category}</span>
        {project.featured && <span className="featured-label">Featured</span>}
      </div>
      <div className="project-result"><strong>{project.metric}</strong><span>{project.metricLabel}</span></div>
      <Pipeline steps={project.pipeline} label={`${project.title} workflow`} />
      <div className="project-content">
        <h3><a href={`#/projects/${project.slug}`}>{project.title}</a></h3>
        {project.subtitle && <p className="project-subtitle">{project.subtitle}</p>}
        <p>{project.summary}</p>
        <ul className="tags" aria-label="Technologies">{project.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul>
        <a className="text-link" href={`#/projects/${project.slug}`} aria-label={`Explore ${project.title}`}>Explore project <span aria-hidden="true">↗</span></a>
      </div>
    </article>
  );
}
