import React from 'react';
import { motion } from 'framer-motion';
import { FaPaintBrush, FaCode, FaBezierCurve, FaLayerGroup, FaMobileAlt, FaCube } from 'react-icons/fa';

const skills = [
    { name: 'Branding', icon: <FaLayerGroup /> },
    { name: 'UI Design', icon: <FaBezierCurve /> },
    { name: 'UX Research', icon: <FaMobileAlt /> },
    { name: 'Illustration', icon: <FaPaintBrush /> },
    { name: '3D Modeling', icon: <FaCube /> },
    { name: 'Frontend', icon: <FaCode /> },
];

const Skills = () => {
    return (
        <section id="skills" className="section" style={{ background: 'var(--bg-secondary)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ fontSize: '3rem', marginBottom: '1rem' }}
                    >
                        Capabilities
                    </motion.h2>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '2rem'
                }}>
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10, color: 'var(--accent-color)' }}
                            style={{
                                background: 'var(--bg-color)',
                                padding: '2rem',
                                borderRadius: '15px',
                                textAlign: 'center',
                                border: '1px solid var(--card-border)',
                                boxShadow: 'var(--shadow-sm)',
                                cursor: 'default'
                            }}
                        >
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                                {skill.icon}
                            </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{skill.name}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
