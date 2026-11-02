import { useSyncExternalStore } from 'react';
import Layout from './components/Layout';
import CursorGlow from './components/CursorGlow';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import ProjectDetail from './components/ProjectDetail';
import { projects } from './data/portfolio';

function subscribe(callback) {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
}

function closeProject() {
  window.history.replaceState(window.history.state, '', '#projects');
  window.dispatchEvent(new Event('hashchange'));
}

function App() {
  const hash = useSyncExternalStore(subscribe, () => window.location.hash, () => '');
  const isProjectRoute = hash.startsWith('#/projects/');
  const project = projects.find((item) => hash === `#/projects/${item.slug}`);

  return (
    <Preloader>
      <CursorGlow />
      <Layout>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Education />
        <Achievements />
        <Certifications />
        <Contact />
        {isProjectRoute && (
          <ProjectDetail key={project?.slug ?? 'unknown'} project={project} onClose={closeProject} />
        )}
      </Layout>
    </Preloader>
  );
}

export default App;