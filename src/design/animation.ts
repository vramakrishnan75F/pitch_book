export const animation = {
  duration: {
    fast: '120ms',
    normal: '220ms',
    slow: '320ms',
  },
  easing: {
    standard: 'ease',
    emphasized: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
  },
  hover: {
    scale: 'scale(1.01)',
  },
  pressed: {
    scale: 'scale(0.99)',
  },
  fade: {
    from: 0,
    to: 1,
  },
  slide: {
    distance: '8px',
  },
} as const
