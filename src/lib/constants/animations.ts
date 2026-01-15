export const ANIMATION_PRESETS = {
  transitions: {
    fast: 'transition-all duration-150',
    normal: 'transition-all duration-200',
    slow: 'transition-all duration-300',
  },
  colorTransitions: {
    fast: 'transition-colors duration-150',
    normal: 'transition-colors duration-200',
    slow: 'transition-colors duration-300',
  },
  transformTransitions: {
    fast: 'transition-transform duration-150',
    normal: 'transition-transform duration-200',
    slow: 'transition-transform duration-300',
  },
  opacityTransitions: {
    fast: 'transition-opacity duration-150',
    normal: 'transition-opacity duration-200',
    slow: 'transition-opacity duration-300',
  },
  easing: {
    smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
    standard: 'cubic-bezier(0.22, 1, 0.36, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  motion: {
    dropdown: 'cubic-bezier(0.16, 1, 0.3, 1)',
    spring: 'spring',
  },
};

export const MOTION_VARIANTS = {
  dropdown: {
    hidden: { opacity: 0, scale: 0.96, translateY: 8 },
    visible: { opacity: 1, scale: 1, translateY: 0 },
    exit: { opacity: 0, scale: 0.96, translateY: 8 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 12 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};
