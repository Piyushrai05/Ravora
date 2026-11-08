import React, { useEffect, useState, useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { VIEWPORT } from '../../animations';

interface CounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export const Counter: React.FC<CounterProps> = ({
  value,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [count, setCount] = useState(() => (shouldReduceMotion ? value : 0));
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, VIEWPORT);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current || shouldReduceMotion) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo function: 1 - Math.pow(2, -10 * progress)
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = ease * value;

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, value, duration, shouldReduceMotion]);

  const formatted = decimals > 0
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString('en-IN');

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};
