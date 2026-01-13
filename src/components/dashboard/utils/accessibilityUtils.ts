import { FOCUSABLE_ELEMENTS, KEYBOARD_KEYS } from '../constants/accessibility';

export const focusFirstElement = (container: HTMLElement | null): void => {
  if (!container) return;
  setTimeout(() => {
    const focusable = container.querySelector(
      FOCUSABLE_ELEMENTS
    ) as HTMLElement;
    focusable?.focus();
  }, 0);
};

export const focusLastElement = (container: HTMLElement | null): void => {
  if (!container) return;
  setTimeout(() => {
    const focusables = container.querySelectorAll(FOCUSABLE_ELEMENTS);
    const lastFocusable = focusables[focusables.length - 1] as HTMLElement;
    lastFocusable?.focus();
  }, 0);
};

export const getAllFocusableElements = (
  container: HTMLElement | null
): HTMLElement[] => {
  if (!container) return [];
  return Array.from(container.querySelectorAll(FOCUSABLE_ELEMENTS));
};

export const lockBodyScroll = (): (() => void) => {
  const originalOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';

  return () => {
    document.body.style.overflow = originalOverflow;
  };
};

export const isKeyboardEventOpen = (key: string): boolean => {
  return (
    key === KEYBOARD_KEYS.ENTER ||
    key === KEYBOARD_KEYS.SPACE ||
    key === KEYBOARD_KEYS.ARROW_DOWN
  );
};

export const isKeyboardEventClose = (key: string): boolean => {
  return key === KEYBOARD_KEYS.ESCAPE;
};

export const isKeyboardEventSelect = (key: string): boolean => {
  return key === KEYBOARD_KEYS.ENTER || key === KEYBOARD_KEYS.SPACE;
};

export const calculateNavigationIndex = (
  currentIndex: number,
  key: string,
  totalItems: number,
  direction: 'next' | 'previous' | 'home' | 'end'
): number => {
  switch (direction) {
    case 'next':
      return currentIndex < totalItems - 1 ? currentIndex + 1 : 0;
    case 'previous':
      return currentIndex > 0 ? currentIndex - 1 : totalItems - 1;
    case 'home':
      return 0;
    case 'end':
      return totalItems - 1;
    default:
      return currentIndex;
  }
};
