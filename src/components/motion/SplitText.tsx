import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE, VIEWPORT } from '../../animations';

interface SplitTextProps {
  text: string;
  italicWord?: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  italicWord,
  className = '',
  delay = 0,
  stagger = 0.08,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(' ');

  if (shouldReduceMotion) {
    return (
      <span className={className}>
        {words.map((word, i) => {
          const isItalic = italicWord && word.toLowerCase().includes(italicWord.toLowerCase());
          return (
            <span
              key={i}
              className={isItalic ? 'font-serif italic text-[#D4AF37] mr-2 inline-block' : 'mr-2 inline-block'}
            >
              {word}
            </span>
          );
        })}
      </span>
    );
  }

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, i) => {
        const isItalic = italicWord && word.toLowerCase().includes(italicWord.toLowerCase());
        return (
          <span key={i} className="inline-block overflow-hidden pb-1 mr-2.5 align-top">
            <motion.span
              initial={{ y: '115%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={VIEWPORT}
              transition={{
                duration: 0.8,
                delay: delay + i * stagger,
                ease: EASE.luxury,
              }}
              className={`inline-block ${
                isItalic ? 'font-serif italic text-[#D4AF37] font-normal' : ''
              }`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
};
