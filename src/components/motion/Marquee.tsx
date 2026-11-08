import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface MarqueeProps {
  items?: string[];
  speed?: number; // duration in seconds
  className?: string;
}

const DEFAULT_ITEMS = [
  'Dry Cleaning',
  '✦',
  'Premium Laundry',
  '✦',
  'Steam Ironing',
  '✦',
  'Shoe & Bag Care',
  '✦',
  'Doorstep Pickup & Delivery',
  '✦',
  'Hygienic Fabric Wash',
  '✦',
];

export const Marquee: React.FC<MarqueeProps> = ({
  items = DEFAULT_ITEMS,
  speed = 28,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Duplicate items 4 times to guarantee seamless loop on any ultra-wide screen
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`relative w-full overflow-hidden select-none py-4 bg-[#06301F] border-y border-[#D9B23C]/30 group ${className}`}
    >
      <motion.div
        className="flex whitespace-nowrap items-center will-change-transform"
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: ['0%', '-50%'],
              }
        }
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: speed,
          ease: 'linear',
        }}
        whileHover={shouldReduceMotion ? {} : { animationPlayState: 'paused' }}
        style={{ width: 'fit-content' }}
      >
        {repeatedItems.map((item, idx) => {
          const isStar = item === '✦';
          const isAlternate = idx % 4 === 0;

          return (
            <span
              key={idx}
              className={`inline-flex items-center mx-4 md:mx-6 text-sm md:text-base tracking-[0.15em] uppercase font-medium ${
                isStar
                  ? 'text-[#D9B23C] text-xs'
                  : isAlternate
                  ? 'font-serif italic font-normal text-[#FAF6EA] normal-case text-base md:text-lg tracking-normal'
                  : 'text-[#D9B23C]'
              }`}
            >
              {item}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
};
