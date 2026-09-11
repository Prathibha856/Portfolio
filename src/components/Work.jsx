import React from 'react';
import { motion } from 'framer-motion';
import TiltCard from './3D/TiltCard';
import { FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
    {
        id: 1,
        title: 'Neon Brand Identity',
        category: 'Branding',
        color: '#FF0055'
    },
    {
        id: 2,
        title: 'Fintech Dashboard',
        category: 'UI/UX Design',
        color: '#00CCFF'
    },
    {
        id: 3,
        title: 'Abstract 3D Art',
        category: 'Illustration',
        color: '#FFCC00'
    },
    {
        id: 4,
        title: 'Eco E-Commerce',
        category: 'Web Design',
        color: '#00FF99'
    }
];

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
        >
            <TiltCard
                className="project-card"
                style={{
                    background: 'var(--card-bg)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '1px solid var(--card-border)',
                    height: '400px',
                    position: 'relative',
                    cursor: 'pointer'
                }}
                glareMaxOpacity={0.4}
            >
                {/* Placeholder Image Area */}
                <div style={{
                    height: '70%',
                    background: `linear-gradient(135deg, #222, ${project.color}22)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: project.color,
                        opacity: 0.2,
                        filter: 'blur(20px)'
                    }} />
                    <span style={{ position: 'absolute', color: 'rgba(255,255,255,0.1)', fontSize: '5rem', fontWeight: 800 }}>
                        0{project.id}
                    </span>
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem', position: 'relative', zIndex: 2, background: 'var(--bg-secondary)' }}>
                    <span style={{
                        fontSize: '0.8rem',
                        color: project.color,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontWeight: 600
                    }}>
                        {project.category}
                    </span>
                    <h3 style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>{project.title}</h3>

                    <div style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        opacity: 0.5,
                        transition: 'opacity 0.3s'
                    }}>
                        <FaExternalLinkAlt />
                    </div>
                </div>
            </TiltCard>
        </motion.div>
    );
};

const Work = () => {
    return (
        <section id="work" className="section">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ fontSize: '3rem', marginBottom: '1rem' }}
                    >
                        Selected Works
                    </motion.h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        A collection of projects that define my style and capabilities.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Work;
