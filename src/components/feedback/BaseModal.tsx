'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MODAL_STYLES } from '../../lib/constants';

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  closeButtonAriaLabel?: string;
  closeButton?: React.ReactNode;
  maxWidth?: string;
  showBackdrop?: boolean;
}

export function BaseModal({
  isOpen,
  onClose,
  children,
  title,
  subtitle,
  closeButtonAriaLabel = 'Close modal',
  closeButton,
  maxWidth = 'max-w-md',
  showBackdrop = true,
}: BaseModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    }, 200);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          {showBackdrop && (
            <motion.div
              className="fixed inset-0 z-40"
              style={MODAL_STYLES.backdrop.style}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleBackdropClick}
            />
          )}

          {/* Modal Container */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className={`w-full ${maxWidth} rounded-2xl border border-white/[0.08] p-8 ${MODAL_STYLES.shadow}`}
              style={MODAL_STYLES.container.style}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: isClosing ? 0 : 1, scale: isClosing ? 0.95 : 1, y: isClosing ? 20 : 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 200, damping: 30 }}
            >
              {/* Header */}
              {(title || closeButton) && (
                <div className="flex items-center justify-between mb-6">
                  {title && (
                    <div>
                      <h2 className="text-xl font-bold text-white">{title}</h2>
                      {subtitle && (
                        <p className="text-xs font-normal mt-1 text-gray-400">{subtitle}</p>
                      )}
                    </div>
                  )}
                  {closeButton && (
                    <button
                      onClick={handleClose}
                      className="rounded-lg p-2 transition-colors"
                      aria-label={closeButtonAriaLabel}
                    >
                      {closeButton}
                    </button>
                  )}
                </div>
              )}

              {/* Content */}
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
