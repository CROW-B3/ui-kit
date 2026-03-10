import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Custom hook for managing modal close animation
 * Handles the animation delay and state management for smooth modal exits
 */
export function useModalAnimation(onClose: () => void, duration: number = 200) {
  const [isClosing, setIsClosing] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    closeTimeoutRef.current = setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, duration);
  }, [onClose, duration]);

  return { isClosing, handleClose };
}
