'use client';

import { X } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

import { FOCUSABLE_ELEMENTS } from '../../lib/constants/accessibility';

export interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  width?: 'sm' | 'md' | 'lg';
  showBackdrop?: boolean;
  className?: string;
}

const widthClasses = {
  sm: 'w-[380px]',
  md: 'w-[480px]',
  lg: 'w-[560px]',
};

export function SidePanel({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  width = 'md',
  showBackdrop = true,
  className,
}: SidePanelProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Focus trap
      if (e.key === 'Tab' && panelRef.current) {
        const focusableElements =
          panelRef.current.querySelectorAll(FOCUSABLE_ELEMENTS);
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.addEventListener('keydown', handleKeyDown);

      // Focus first focusable element in panel
      setTimeout(() => {
        if (panelRef.current) {
          const focusableElements =
            panelRef.current.querySelectorAll(FOCUSABLE_ELEMENTS);
          (focusableElements[0] as HTMLElement)?.focus();
        }
      }, 0);
    } else {
      // Restore focus to previous element
      previousActiveElement.current?.focus();
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  useEffect(() => {
    if (isOpen && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  return (
    <>
      {showBackdrop && (
        <div
          className={cn(
            'fixed inset-0 z-[200] transition-opacity duration-300',
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
          style={{
            background: 'rgba(0, 0, 0, 0.60)',
            backdropFilter: 'blur(4px)',
          }}
          onClick={onClose}
        />
      )}

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'side-panel-title' : undefined}
        className={cn(
          'fixed top-0 right-0 h-full z-[201] flex flex-col transition-transform duration-300 ease-out',
          widthClasses[width],
          isOpen ? 'translate-x-0' : 'translate-x-full',
          className
        )}
        style={{
          background:
            'linear-gradient(180deg, rgba(10, 5, 20, 0.98) 0%, rgba(5, 2, 12, 0.99) 100%)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '-20px 0 60px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div
          className="flex-shrink-0 flex items-start justify-between p-6 border-b"
          style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}
        >
          <div className="flex-1 min-w-0 pr-4">
            {title && (
              <h2
                id="side-panel-title"
                className="text-lg font-semibold truncate text-gray-100"
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm mt-1 truncate text-gray-500">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -m-2 rounded-lg transition-colors hover:bg-white/5"
            aria-label="Close panel"
          >
            <X size={20} color="#6B7280" />
          </button>
        </div>

        <div
          ref={scrollContainerRef}
          className="side-panel-content flex-1 overflow-y-auto overscroll-contain"
          data-lenis-prevent
        >
          {children}
        </div>
        <style>{`
          .side-panel-content {
            scroll-behavior: smooth;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .side-panel-content::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </>
  );
}
