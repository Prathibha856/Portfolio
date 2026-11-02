import { useEffect, useRef, useState } from 'react';

const links = [ ['About', 'about'], ['Projects', 'projects'], ['Skills', 'skills'], ['Experience', 'experience'], ['Contact', 'contact'] ];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('');
  const navRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      if (visible.length) setActive(visible[0].target.id);
    }, { rootMargin: '-15% 0px -60% 0px' });
    links.forEach(([, id]) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const closeOutside = (event) => { if (!navRef.current?.contains(event.target)) setIsOpen(false); };
    const closeEscape = (event) => { if (event.key === 'Escape') { setIsOpen(false); toggleRef.current?.focus(); } };
    const desktop = window.matchMedia('(min-width: 761px)');
    const closeDesktop = () => { if (desktop.matches) setIsOpen(false); };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeEscape);
    desktop.addEventListener('change', closeDesktop);
    return () => { document.removeEventListener('pointerdown', closeOutside); document.removeEventListener('keydown', closeEscape); desktop.removeEventListener('change', closeDesktop); };
  }, [isOpen]);

  return (
    <header className='site-header'>
      <nav ref={navRef} className='container navbar' aria-label='Main navigation' onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false); }}>
        <a className='brand' href='#hero' aria-label='Prathibha D — home' onClick={() => setIsOpen(false)}><span className='brand-mark' aria-hidden='true'>p<span>.</span></span><span>Prathibha D<span className='brand-caption'>AI/ML & Data Science</span></span></a>
        <button ref={toggleRef} type='button' className='menu-toggle' aria-expanded={isOpen} aria-controls='main-navigation' onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Close' : 'Menu'} <span aria-hidden='true'>{isOpen ? '×' : '+'}</span></button>
        <ul id='main-navigation' className={'nav-links' + (isOpen ? ' is-open' : '')}>
          {links.map(([name, id]) => <li key={id}><a href={'#' + id} aria-current={active === id ? 'location' : undefined} onClick={() => { setIsOpen(false); document.getElementById(id)?.focus({ preventScroll: true }); }}>{name}{id === 'contact' && <span aria-hidden='true'> ↗</span>}</a></li>)}
        </ul>
      </nav>
    </header>
  );
}
