import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Work', href: '#work' },
        { name: 'Skills', href: '#skills' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 999,
                padding: scrolled ? '1rem 2rem' : '2rem 3rem',
                background: scrolled ? 'rgba(10, 10, 10, 0.8)' : 'transparent',
                backdropFilter: scrolled ? 'blur(10px)' : 'none',
                borderBottom: scrolled ? '1px solid var(--card-border)' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.4s ease'
            }}
        >
            <div className="logo" style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                PORTFOLIO<span style={{ color: 'var(--accent-color)' }}>.</span>
            </div>

            {/* Desktop Nav */}
            <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }} className="desktop-nav">
                {navLinks.map((link) => (
                    <li key={link.name}>
                        <a
                            href={link.href}
                            style={{
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                position: 'relative'
                            }}
                            className="nav-link"
                        >
                            {link.name}
                        </a>
                    </li>
                ))}
            </ul>

            {/* Mobile Nav Toggle */}
            <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ fontSize: '1.5rem', cursor: 'pointer', display: 'none' }}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: '70%',
                            background: 'var(--bg-secondary)',
                            padding: '4rem 2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2rem',
                            boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
                            zIndex: 1000
                        }}
                    >
                        <div style={{ alignSelf: 'flex-end', fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => setIsOpen(false)}>
                            <FaTimes />
                        </div>
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                style={{ fontSize: '1.5rem', fontWeight: 700 }}
                            >
                                {link.name}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--accent-color);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
        </motion.nav>
    );
};

export default Navbar;
