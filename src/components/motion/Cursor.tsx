import React, { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const Cursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'card' | 'arrow'>('default');
  const [visible, setVisible] = useState(false);
  const isVisibleRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  const [isCoarse, setIsCoarse] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)').matches : true
  );

  useEffect(() => {
    const media = window.matchMedia('(pointer: coarse)');
    const onChange = (e: MediaQueryListEvent) => setIsCoarse(e.matches);
    media.addEventListener('change', onChange);

    if (isCoarse || shouldReduceMotion) {
      return () => media.removeEventListener('change', onChange);
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setVisible(true);
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const card = target.closest('[data-cursor="view"]');
      const arrowTarget = target.closest('[data-cursor="arrow"]');
      const interactive = target.closest('button, a, input, select, textarea, [role="button"]');

      if (card) {
        setCursorType('card');
      } else if (arrowTarget) {
        setCursorType('arrow');
      } else if (interactive) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const onMouseLeave = () => {
      isVisibleRef.current = false;
      setVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isCoarse, shouldReduceMotion]);

  if (isCoarse || shouldReduceMotion || !visible) return null;

  const isCard = cursorType === 'card';
  const isPointer = cursorType === 'pointer';
  const isArrow = cursorType === 'arrow';

  return (
    <>
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[99999] pointer-events-none flex items-center justify-center font-sans font-semibold text-[10px] tracking-widest uppercase select-none"
        animate={{
          x: pos.x - (isCard ? 36 : isPointer ? 24 : isArrow ? 24 : 16),
          y: pos.y - (isCard ? 36 : isPointer ? 24 : isArrow ? 24 : 16),
          width: isCard ? 72 : isPointer ? 48 : isArrow ? 48 : 32,
          height: isCard ? 72 : isPointer ? 48 : isArrow ? 48 : 32,
          backgroundColor: isCard ? 'rgba(212, 175, 55, 0.95)' : isArrow ? 'rgba(7, 91, 59, 0.95)' : 'rgba(212, 175, 55, 0.1)',
          borderColor: isCard ? '#D4AF37' : isPointer ? '#D4AF37' : 'rgba(212, 175, 55, 0.6)',
          borderWidth: isCard ? 0 : 1.5,
          color: isCard ? '#06452F' : '#FFF9E9',
        }}
        transition={{
          type: 'spring',
          stiffness: 450,
          damping: 28,
          mass: 0.25,
        }}
        style={{
          borderRadius: '50%',
          backdropFilter: isCard || isArrow ? 'none' : 'blur(2px)',
        }}
      >
        {isCard && <span className="font-bold tracking-wider">VIEW</span>}
        {isArrow && <span className="text-sm text-[#D4AF37]">↗</span>}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[99999] pointer-events-none"
        animate={{
          x: pos.x - (isCard ? 0 : 3),
          y: pos.y - (isCard ? 0 : 3),
          opacity: isCard ? 0 : 1,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 900,
          damping: 38,
          mass: 0.1,
        }}
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
