import type { Variants } from 'framer-motion';

// ─── Reduced-motion check ───────────────────────────────────────────────────
export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

// ─── Shared easing curves ────────────────────────────────────────────────────
export const ease = {
  luxury: [0.25, 0.1, 0.25, 1] as const,
  out: [0.0, 0.0, 0.2, 1] as const,
  in: [0.4, 0.0, 1, 1] as const,
  spring: { type: 'spring', stiffness: 300, damping: 30 } as const,
  gentleSpring: { type: 'spring', stiffness: 180, damping: 28 } as const,
};

// ─── Fade up (the workhorse) ─────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ─── Fade in ─────────────────────────────────────────────────────────────────
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

// ─── Slide in from left ───────────────────────────────────────────────────────
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ─── Slide in from right ──────────────────────────────────────────────────────
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ─── Scale in ────────────────────────────────────────────────────────────────
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ─── Stagger container ───────────────────────────────────────────────────────
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren, delayChildren },
  },
});

// ─── Word-by-word reveal for headings ────────────────────────────────────────
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 20, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ─── Clip-path reveal (image unveil) ─────────────────────────────────────────
export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    opacity: 1,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ─── Card hover (applied directly in whileHover) ─────────────────────────────
export const cardHover = {
  rest: { y: 0, boxShadow: '0 2px 8px rgba(7,91,59,0.06)' },
  hover: {
    y: -6,
    boxShadow: '0 20px 48px rgba(7,91,59,0.14)',
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ─── Button interactions ──────────────────────────────────────────────────────
export const buttonTap = { scale: 0.96 };
export const buttonHover = { scale: 1.03, y: -1 };

// ─── Shake (validation error) ────────────────────────────────────────────────
export const shake: Variants = {
  shake: {
    x: [0, -6, 6, -4, 4, -2, 2, 0],
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
};

// ─── Float loop (decorative elements) ────────────────────────────────────────
export const floatLoop = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: 'loop' as const,
      ease: 'easeInOut',
    },
  },
};

// ─── Draw line SVG ────────────────────────────────────────────────────────────
export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ─── Viewport defaults ───────────────────────────────────────────────────────
export const viewport = { once: true, margin: '-80px' };
export const viewportEager = { once: true, margin: '-20px' };
