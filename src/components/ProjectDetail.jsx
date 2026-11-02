import { useEffect, useRef } from 'react';
import Pipeline from './Pipeline';
import { projects } from '../data/portfolio';

export default function ProjectDetail({ project, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousTitle = document.title;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.title = `${project?.title ?? 'Project not found'} | Prathibha D`;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
      document.title = previousTitle;
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus !== document.body) previousFocus.focus({ preventScroll: true });
      else document.querySelector('#projects h2')?.focus({ preventScroll: true });
    };
  }, [project]);

  const handleKeyDown = (event) => {
    if (event.key !== 'Tab') return;
    const dialog = dialogRef.current;
    const focusable = [...dialog.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  };

  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby="project-detail-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === dialogRef.current) onClose(); }}
      onKeyDown={handleKeyDown}
    >
      <div className="dialog-toolbar">
        <span className="mono">Project notes / {project?.number ?? 'Not found'}</span>
        <button
          type="button"
          className="close-button"
          onClick={onClose}
          autoFocus
          aria-label="Close project details"
        >
          Close <span aria-hidden="true">×</span>
        </button>
      </div>
      {project ? (
        <div className="dialog-content">
          <p className="eyebrow">{project.category}</p>
          <h2 id="project-detail-title">{project.title}</h2>
          {project.subtitle && <p className="dialog-subtitle">{project.subtitle}</p>}
          <p className="dialog-summary">{project.summary}</p>
          <Pipeline steps={project.pipeline} label={`${project.title} workflow`} />
          <dl className="project-notes">
            <div><dt>01 / The problem</dt><dd>{project.problem}</dd></div>
            <div><dt>02 / The approach</dt><dd>{project.approach}</dd></div>
            <div><dt>03 / The result</dt><dd>{project.result}</dd></div>
          </dl>
          <h3 className="stack-heading">Technology stack</h3>
          <ul className="tags">
            {project.technologies.map((tech) => <li key={tech}>{tech}</li>)}
          </ul>
          {(project.github || project.demo) && (
            <div className="actions">
              {project.github && (
                <a className="button" href={project.github} target="_blank" rel="noreferrer">
                  Source code ↗
                </a>
              )}
              {project.demo && (
                <a className="button button-outline" href={project.demo} target="_blank" rel="noreferrer">
                  Live demo ↗
                </a>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="dialog-content">
          <p className="eyebrow">Unknown project</p>
          <h2 id="project-detail-title">That project isn’t here.</h2>
          <p>Close this view to explore the {projects.length} portfolio projects.</p>
        </div>
      )}
    </dialog>
  );
}