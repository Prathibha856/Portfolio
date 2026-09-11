import React from 'react';
import { motion } from 'framer-motion';
import TiltCard from './3D/TiltCard';

const About = () => {
    return (
        <section id="about" className="section">
            <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '4rem' }}>

                {/* Image / Avatar */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }} className="about-image">
                    <TiltCard
                        style={{
                            width: '350px',
                            height: '450px',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            boxShadow: 'var(--shadow-lg)',
                            position: 'relative'
                        }}
                    >
                        <div style={{
                            width: '100%',
                            height: '100%',
                            background: '#222',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#444',
                            fontSize: '1.5rem',
                            fontWeight: 'bold'
                        }}>
                            YOUR IMAGE
                        </div>
                        {/* Overlay Frame */}
                        <div style={{
                            position: 'absolute',
                            inset: '20px',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '15px',
                            pointerEvents: 'none'
                        }} />
                    </TiltCard>
                </div>

                {/* Text Content */}
                <div style={{ flex: 1 }}>
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        style={{ color: 'var(--accent-color)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}
                    >
                        About Me
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        style={{ fontSize: '3rem', margin: '1rem 0 2rem' }}
                    >
                        Design with <br /> <span className="text-gradient">Purpose & Passion.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}
                    >
                        I am a multidisciplinary designer focusing on UI/UX, branding, and 3D visuals.
                        My work bridges the gap between functional design and artistic expression, creating
                        digital products that look beautiful and work seamlessly.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}
                    >
                        With over 5 years of experience, I've helped startups and established brands
                        redefine their digital presence. I believe in the power of minimalism and
                        interactive storytelling.
                    </motion.p>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .container { flex-direction: column !important; text-align: center; }
          .about-image { margin-bottom: 3rem; }
        }
      `}</style>
        </section>
    );
};

export default About;
