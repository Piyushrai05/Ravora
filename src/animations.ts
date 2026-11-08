/**
 * Shared animation configurations, easings and transitions inspired by GenZ Way / locomotive luxury aesthetics.
 */

export const EASE = {
  // Custom luxury cubic-bezier (genzway / locomotive style)
  luxury: [0.76, 0, 0.24, 1] as const,
  // Smooth spring for interactive elements
  smoothSpring: { type: 'spring', stiffness: 260, damping: 24 } as const,
  // Snappy spring for magnetic and cursor
  snappySpring: { type: 'spring', stiffness: 450, damping: 30 } as const,
  // Exponential ease for stats count up
  easeOutExpo: [0.16, 1, 0.3, 1] as const,
  // General ease out
  easeOut: [0.25, 0.1, 0.25, 1] as const,
};

export const TRANSITION = {
  fast: { duration: 0.3, ease: EASE.easeOut },
  normal: { duration: 0.6, ease: EASE.luxury },
  slow: { duration: 0.9, ease: EASE.luxury },
  revealer: { duration: 1.1, ease: EASE.luxury },
};

export const VIEWPORT = {
  once: true,
  margin: '0px 0px -100px 0px' as const,
};
