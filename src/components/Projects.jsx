import { useCallback, useState } from 'react';
import { projects, filterProjects, ALL_PROJECTS } from '../data/portfolio';
import SectionHeading from './SectionHeading';
import ProjectCard from './ProjectCard';
import Reveal from './Reveal';

const categories = [ALL_PROJECTS, ...new Set(projects.map((project) => project.category))];

export default function Projects() {
  const [category, setCategory] = useState(ALL_PROJECTS);
  const [seenSlugs, setSeenSlugs] = useState(() => new Set());
  const visibleProjects = filterProjects(category);
  const count = visibleProjects.length;

  const markSeen = useCallback((slug) => {
    setSeenSlugs((prev) => (prev.has(slug) ? prev : new Set(prev).add(slug)));
  }, []);

  const handleCategoryChange = (next) => {
    setCategory(next);
    // Cards in the incoming category render immediately instead of re-animating
    // in, so a filter switch never leaves the grid mid-transition.
    setSeenSlugs((prev) => {
      const nextSet = new Set(prev);
      filterProjects(next).forEach((project) => nextSet.add(project.slug));
      return nextSet;
    });
  };

  return (
    <section id="projects" className="section container" tabIndex={-1}>
      <Reveal direction="up">
        <SectionHeading
          number="02"
          eyebrow="Selected work"
          title="Ideas, tested in practice."
          description={`${projects.length} projects at the intersection of machine learning, data, and usable software. Start with the featured work.`}
        />
      </Reveal>
      {/* Filter controls stay outside any animated wrapper: an ancestor that is
          transforming keeps the buttons moving, which blocks pointer activation. */}
      <div className="project-toolbar">
        <div className="filters" role="group" aria-label="Filter projects">
          {categories.map((item) => (
            <button key={item} type="button" aria-pressed={category === item} onClick={() => handleCategoryChange(item)}>
              {item}
            </button>
          ))}
        </div>
        <p className="result-count mono" role="status">
          {count} {count === 1 ? 'project' : 'projects'}
          {category !== ALL_PROJECTS && ` in ${category}`}
        </p>
      </div>
      {count === 0 ? (
        <p className="empty-state">No projects in this category yet.</p>
      ) : (
        <div className="projects-grid">
          {visibleProjects.map((project, index) => (
            <Reveal
              key={project.slug}
              direction="up"
              delay={Math.min(index * 80, 480)}
              visible={seenSlugs.has(project.slug) ? true : undefined}
              onReveal={() => markSeen(project.slug)}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
