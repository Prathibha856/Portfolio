import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaDribbble, FaBehance, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
    return (
        <section id="contact" className="section" style={{ minHeight: '80vh' }}>
            <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{ color: 'var(--accent-color)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}
                >
                    Get in Touch
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', margin: '1rem 0 3rem' }}
                >
                    Let's create something <br /> <span className="text-accent-gradient">extraordinary.</span>
                </motion.h2>

                <motion.a
                    href="mailto:hello@example.com"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        display: 'inline-block',
                        padding: '1.5rem 3rem',
                        background: 'var(--accent-color)',
                        color: '#fff',
                        borderRadius: '50px',
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        marginBottom: '4rem',
                        boxShadow: 'var(--shadow-glow)'
                    }}
                >
                    Start a Project
                </motion.a>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                    {[FaDribbble, FaBehance, FaInstagram, FaLinkedin].map((Icon, index) => (
                        <motion.a
                            key={index}
                            href="#"
                            whileHover={{ y: -5, color: 'var(--accent-color)' }}
                            style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}
                        >
                            <Icon />
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Contact;
