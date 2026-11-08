import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface MagneticProps {
  children: React.ReactElement<any>;
  strength?: number; // pull strength (default 0.3)
  range?: number; // activation distance in px (default 80)
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  strength = 0.35,
  range = 80,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();
  const [isCoarse, setIsCoarse] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)').matches : false
  );

  useEffect(() => {
    const media = window.matchMedia('(pointer: coarse)');
    const onChange = (e: MediaQueryListEvent) => setIsCoarse(e.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  if (shouldReduceMotion || isCoarse) {
    return children;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < range) {
      setPosition({
        x: distanceX * strength,
        y: distanceY * strength,
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 25, mass: 0.2 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};
