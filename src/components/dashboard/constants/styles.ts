export const GLASS_STYLES = {
  light: {
    className: 'bg-white/[0.02] border-white/[0.06] backdrop-blur-sm',
    style: {
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.06)',
    },
  },
  heavy: {
    className: 'bg-white/[0.02] border-white/[0.08] backdrop-blur-md',
    style: {
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
    },
  },
};

export const MODAL_STYLES = {
  backdrop: {
    className: 'fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]',
    style: {
      background: 'rgba(0, 0, 0, 0.60)',
      backdropFilter: 'blur(4px)',
    },
  },
  container: {
    className:
      'bg-[rgba(10,5,20,0.98)] backdrop-blur-[20px] rounded-2xl border border-white/[0.08]',
    style: {
      background: 'rgba(10, 5, 20, 0.98)',
      borderColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  shadow:
    'shadow-[0px_24px_48px_rgba(0,0,0,0.5),0px_0px_1px_rgba(139,92,246,0.3)]',
};

export const DROPDOWN_STYLES = {
  container:
    'fixed min-w-[160px] py-1 rounded-lg bg-[rgba(20,10,35,0.98)] border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]',
  menuItem:
    'w-full px-3 py-2 flex items-center justify-between text-left transition-colors',
  menuItemHovered: 'bg-white/5',
};

export const BORDER_COLORS = {
  light: 'border-white/[0.06]',
  default: 'border-white/[0.08]',
  heavy: 'border-white/[0.10]',
};
