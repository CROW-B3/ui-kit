'use client';

import React, { ReactNode, useState } from 'react';
import { cn } from '../../lib/utils';

interface NavTooltipProps {
  children: ReactNode;
  content: string;
  enabled?: boolean;
  side?: 'right' | 'left' | 'top' | 'bottom';
}

export function NavTooltip({ children, content, enabled = true, side = 'right' }: NavTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (!enabled) return;
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const positionClasses = {
    right: 'left-[88px] top-1/2 -translate-y-1/2',
    left: 'right-[88px] top-1/2 -translate-y-1/2',
    top: 'bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2',
    bottom: 'top-[calc(100%+8px)] left-1/2 -translate-x-1/2',
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {enabled && isVisible && (
        <div
          className={cn(
            'absolute z-100 px-2 py-1.5 whitespace-nowrap',
            'bg-[rgba(30,30,30,0.95)] border border-white/10 rounded-md',
            'text-xs text-gray-200 font-medium',
            'animate-tooltipFadeIn pointer-events-none',
            positionClasses[side]
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
