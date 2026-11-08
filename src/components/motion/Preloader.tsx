import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { EASE } from '../../animations';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const shouldReduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(() => !shouldReduceMotion);

  useEffect(() => {
    // If reduced motion, complete immediately
    if (shouldReduceMotion) {
      onComplete?.();
      return;
    }

    const duration = 1600; // 1.6s counting + 0.2s hold
    const startTime = performance.now();

    const animateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.round(easedProgress * 100);

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setTimeout(() => {
          setIsLoading(false);
          onComplete?.();
        }, 200);
      }
    };

    requestAnimationFrame(animateCount);
  }, [shouldReduceMotion, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: '0%' }}
          exit={{
            y: '-100%',
            transition: { duration: 0.9, ease: EASE.luxury },
          }}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#06301F] text-[#FAF6EA] select-none pointer-events-auto"
        >
          {/* Subtle geometric luxury pattern overlay */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D9B23C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Logo badge and title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE.luxury }}
            className="flex flex-col items-center gap-3 relative z-10"
          >
            <div className="w-16 h-16 rounded-full bg-[#0B5D3B] border-2 border-[#D9B23C] flex items-center justify-center shadow-xl">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C9 2 6.5 4 6.5 4L4 6l2 1-1 2 3-1 1 2-1 2 3-1 1 3h2l1-3 3 1-1-2 1-2 3 1-1-2 2-1-2.5-2S15 2 12 2Z"
                  fill="#D9B23C"
                />
                <path d="M8 14c0 3 1.5 6 4 7 2.5-1 4-4 4-7H8Z" fill="#D9B23C" opacity="0.85" />
              </svg>
            </div>

            <div className="text-center mt-2">
              <h1 className="font-serif font-bold text-3xl md:text-4xl tracking-widest text-[#D9B23C]">
                RAVORA
              </h1>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#FAF6EA]/80 mt-1 font-mono font-medium">
                Clothes &amp; Dry Clean
              </p>
            </div>
          </motion.div>

          {/* Gold Counter Progress Indicator */}
          <div className="absolute bottom-12 flex flex-col items-center gap-2 z-10">
            <span className="font-mono font-semibold text-2xl md:text-3xl text-[#D9B23C] tabular-nums tracking-wider">
              {count}%
            </span>
            <div className="w-40 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D9B23C] via-[#FAF6EA] to-[#D9B23C] transition-all duration-75 ease-out"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
