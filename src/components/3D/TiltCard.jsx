import React from 'react';
import Tilt from 'react-parallax-tilt';

const TiltCard = ({ children, className = '', glare = true, max = 15, scale = 1.05, ...props }) => {
    return (
        <Tilt
            tiltMaxAngleX={max}
            tiltMaxAngleY={max}
            perspective={1000}
            scale={scale}
            transitionSpeed={1000}
            gyroscope={true}
            glareEnable={glare}
            glareMaxOpacity={0.3}
            glareColor="#ffffff"
            glarePosition="all"
            glareBorderRadius="15px"
            className={className}
            style={{ transformStyle: 'preserve-3d' }}
            {...props}
        >
            {children}
        </Tilt>
    );
};

export default TiltCard;
