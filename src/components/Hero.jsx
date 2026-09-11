import React from 'react';
import { motion } from 'framer-motion';
import TiltCard from './3D/TiltCard';
import { FaArrowRight } from 'react-icons/fa';

const Hero = () => {
    return (
        <section id="hero" className="section" style={{ height: '100vh', padding: 0, overflow: 'hidden' }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', height: '100%', position: 'relative', zIndex: 1 }}>

                {/* Text Content */}
                <div style={{ flex: 1, zIndex: 2 }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{
                            fontSize: '1.5rem',
                            color: 'var(--accent-color)',
                            marginBottom: '1rem',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            fontWeight: 600
                        }}
                    >
                        Creative Designer
                    </motion.h2>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={{
                            fontSize: 'clamp(3rem, 8vw, 6rem)',
                            lineHeight: 1,
                            marginBottom: '1.5rem',
                            color: 'var(--text-primary)'
                        }}
                    >
                        Visuals that <br />
                        <span className="text-accent-gradient">Defy Gravity.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        style={{
                            fontSize: '1.2rem',
                            color: 'var(--text-secondary)',
                            maxWidth: '500px',
                            marginBottom: '2.5rem',
                            lineHeight: 1.6
                        }}
                    >
                        I craft immersive digital experiences and 3D visuals that elevate brands and captivate audiences.
                    </motion.p>

                    <motion.a
                        href="#work"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '1rem 2rem',
                            background: 'var(--text-primary)',
                            color: 'var(--bg-color)',
                            borderRadius: '50px',
                            fontWeight: 600,
                            fontSize: '1.1rem'
                        }}
                        whileHover={{ scale: 1.05, gap: '15px' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View My Work <FaArrowRight />
                    </motion.a>
                </div>

                {/* 3D Visual */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }} className="hero-visual">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        style={{ position: 'relative' }}
                    >
                        {/* Abstract Background Glow */}
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '500px',
                            height: '500px',
                            background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
                            opacity: 0.2,
                            filter: 'blur(50px)',
                            zIndex: -1
                        }} />

                        <TiltCard
                            className="hero-card"
                            style={{
                                width: '400px',
                                height: '500px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '30px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Decorative Elements inside Card */}
                            <div style={{
                                position: 'absolute',
                                top: '-50px',
                                right: '-50px',
                                width: '200px',
                                height: '200px',
                                background: 'linear-gradient(135deg, var(--accent-color), transparent)',
                                borderRadius: '50%',
                                opacity: 0.5,
                                filter: 'blur(30px)'
                            }} />

                            <h3 style={{
                                fontSize: '8rem',
                                fontWeight: 800,
                                color: 'rgba(255,255,255,0.1)',
                                position: 'absolute',
                                bottom: '-20px',
                                left: '-20px',
                                lineHeight: 1,
                                zIndex: 0
                            }}>3D</h3>

                            <div style={{ zIndex: 1, textAlign: 'center' }}>
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    background: 'var(--accent-color)',
                                    borderRadius: '20px',
                                    margin: '0 auto 2rem',
                                    boxShadow: '0 0 30px var(--accent-glow)',
                                    transform: 'rotate(45deg)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <div style={{ width: '60%', height: '60%', border: '2px solid white', borderRadius: '10px' }} />
                                </div>
                                <h4 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Portfolio</h4>
                                <p style={{ color: 'var(--text-secondary)' }}>Interactive Experience</p>
                            </div>
                        </TiltCard>
                    </motion.div>
                </div>
            </div>

            <style>{`
        @media (max-width: 968px) {
          .hero-visual { display: none !important; }
          .container { text-align: center; justify-content: center; }
          h1 { font-size: 3.5rem !important; }
        }
      `}</style>
        </section>
    );
};

export default Hero;
