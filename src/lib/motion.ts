/**
 * Shared motion configurations, easings and durations for RAVORA.
 * Tune all global animation speeds in this single file.
 */

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;
export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  fast: 0.4,
  normal: 0.8,
  slow: 1.2,
} as const;

export const SPRINGS = {
  smooth: { type: 'spring', stiffness: 260, damping: 24 } as const,
  snappy: { type: 'spring', stiffness: 450, damping: 30 } as const,
  magnetic: { type: 'spring', stiffness: 350, damping: 25, mass: 0.2 } as const,
};

export const VIEWPORT_CONFIG = {
  once: true,
  margin: '0px 0px -80px 0px' as const,
};
