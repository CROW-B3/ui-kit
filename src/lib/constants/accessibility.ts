export const FOCUSABLE_ELEMENTS =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export const KEYBOARD_KEYS = {
  ESCAPE: 'Escape',
  ENTER: 'Enter',
  SPACE: ' ',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
};

export const KEYBOARD_PATTERNS = {
  isOpen: (key: string) =>
    key === KEYBOARD_KEYS.ENTER ||
    key === KEYBOARD_KEYS.SPACE ||
    key === KEYBOARD_KEYS.ARROW_DOWN,
  isClose: (key: string) => key === KEYBOARD_KEYS.ESCAPE,
  isNavigateDown: (key: string) => key === KEYBOARD_KEYS.ARROW_DOWN,
  isNavigateUp: (key: string) => key === KEYBOARD_KEYS.ARROW_UP,
  isNavigateHome: (key: string) => key === KEYBOARD_KEYS.HOME,
  isNavigateEnd: (key: string) => key === KEYBOARD_KEYS.END,
  isSelect: (key: string) =>
    key === KEYBOARD_KEYS.ENTER || key === KEYBOARD_KEYS.SPACE,
  isSubmit: (key: string) => key === KEYBOARD_KEYS.ENTER,
};
