import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './Navbar';
import { motion, useScroll, useSpring } from 'framer-motion';

const Layout = ({ children }) => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <div className="app-container">
            <motion.div
                className="progress-bar"
                style={{
                    scaleX,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'var(--accent-color)',
                    transformOrigin: '0%',
                    zIndex: 1000
                }}
            />
            <Navbar />
            <main>{children}</main>

            <footer style={{
                textAlign: 'center',
                padding: 'var(--spacing-md)',
                borderTop: '1px solid var(--card-border)',
                color: 'var(--text-secondary)',
                marginTop: 'var(--spacing-xl)'
            }}>
                <p>© {new Date().getFullYear()} Creative Portfolio. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;
