import React, { useMemo, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const ParticleIcon = ({ children, isPressed, pointerPos }) => {
  const controls = useAnimation();
  const ref = useRef(null);

  const initialX = useMemo(() => `${Math.random() * 100}%`, []);
  const initialY = useMemo(() => `${Math.random() * 100}%`, []);
  
  const randomPath = useMemo(() => {
    const duration = Math.random() * 25 + 15;
    const delay = Math.random() * 10;
    return {
      x: [`${Math.random() * 80 - 40}vw`, `${Math.random() * 80 - 40}vw`],
      y: [`${Math.random() * 80 - 40}vh`, `${Math.random() * 80 - 40}vh`],
      rotate: [0, Math.random() > 0.5 ? 360 : -360],
      scale: [1, 1.2, 1],
      transition: {
        duration,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
        delay,
      },
    };
  }, []);

  useEffect(() => {
    const pullAnimation = async () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const iconCenterX = rect.left + rect.width / 2;
        const iconCenterY = rect.top + rect.height / 2;
        
        await controls.start({
          x: pointerPos.x - iconCenterX,
          y: pointerPos.y - iconCenterY,
          scale: 1.5,
          transition: { type: 'spring', stiffness: 100, damping: 20, restDelta: 0.01 },
        });
      }
    };

    if (isPressed) {
      controls.stop();
      pullAnimation();
    } else {
      controls.start(randomPath);
    }
  }, [isPressed, pointerPos, controls, randomPath]);

  return (
    <motion.div
      ref={ref}
      className="absolute"
      style={{
        left: initialX,
        top: initialY,
      }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export default ParticleIcon;