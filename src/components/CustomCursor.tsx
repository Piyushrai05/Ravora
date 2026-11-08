import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    // Only run on desktop with fine pointer and no reduced-motion preference
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setVisible(true);
      }
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      setHovering(
        !!(target.closest('a') || target.closest('button') || target.closest('[data-cursor]'))
      );
    };

    const leave = () => {
      isVisibleRef.current = false;
      setVisible(false);
    };

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    document.addEventListener('mouseleave', leave);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      document.removeEventListener('mouseleave', leave);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden lg:block"
        animate={{
          x: pos.x - (hovering ? 20 : 16),
          y: pos.y - (hovering ? 20 : 16),
          width: hovering ? 40 : 32,
          height: hovering ? 40 : 32,
          borderColor: hovering ? '#D4AF37' : '#075B3B',
          opacity: 0.7,
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 28, mass: 0.4 }}
        style={{
          borderRadius: '50%',
          border: '1.5px solid #075B3B',
          mixBlendMode: 'difference',
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden lg:block"
        animate={{ x: pos.x - 3, y: pos.y - 3 }}
        transition={{ type: 'spring', stiffness: 900, damping: 35, mass: 0.1 }}
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: '#D4AF37',
        }}
      />
    </>
  );
};
