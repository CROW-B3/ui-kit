export const SIZING = {
  icons: {
    xs: { container: 'w-6 h-6', size: 14 },
    sm: { container: 'w-8 h-8', size: 16 },
    md: { container: 'w-10 h-10', size: 20 },
    lg: { container: 'w-12 h-12', size: 24 },
  },
  panels: {
    sm: 'w-[380px]',
    md: 'w-[480px]',
    lg: 'w-[560px]',
  },
  sidebars: {
    desktop: 'w-[247px]',
    mobile: 'w-[280px]',
  },
  buttons: {
    sm: 'h-[34px]',
    md: 'h-[41px]',
    lg: 'h-10',
  },
  toggles: {
    sm: {
      container: 'w-9 h-5 rounded-[10px] p-0.5',
      thumb: 'w-4 h-4',
      translateX: 'translate-x-4',
    },
    default: {
      container: 'w-11 h-6 rounded-xl p-0.5',
      thumb: 'w-5 h-5',
      translateX: 'translate-x-5',
    },
  },
};

export const SPACING = {
  padding: {
    xs: 'p-2',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  },
  gaps: {
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4',
  },
};
