'use client';

import { useState } from 'react';
import { cn } from '../../lib/utils';
import { CollapseToggleButton } from '../buttons/CollapseToggleButton';

export interface SidebarLogoProps {
  logoSrc: string;
  title?: string;
  subtitle?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function SidebarLogo({
  logoSrc,
  title = 'CROW',
  subtitle = 'CLIENT',
  isCollapsed = false,
  onToggleCollapse,
}: SidebarLogoProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        'relative h-[60px] flex items-center justify-between transition-all duration-300',
        isCollapsed ? 'gap-2' : 'gap-3'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo Container - When collapsed, swaps with button on hover */}
      <div
        className={cn(
          'h-[60px] w-[60px] flex items-center justify-center flex-shrink-0 relative transition-all duration-200',
          isCollapsed && isHovered ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
        )}
      >
        <img
          src={logoSrc}
          alt={`${title} Logo`}
          className="w-[58px] h-[60px] object-contain"
        />
      </div>

      {/* Collapse Button - Replaces logo when collapsed and hovered */}
      {isCollapsed && onToggleCollapse && (
        <div
          className={cn(
            'absolute left-0 h-[60px] w-[60px] flex items-center justify-center transition-all duration-200',
            isHovered ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
          )}
        >
          <CollapseToggleButton isCollapsed={isCollapsed} onToggle={onToggleCollapse} />
        </div>
      )}

      {/* Title and Subtitle Container - Fades with collapse */}
      <div
        className={cn(
          'flex flex-col flex-1 overflow-hidden transition-all duration-300',
          isCollapsed ? 'opacity-0 w-0 pointer-events-none' : 'opacity-100 w-auto'
        )}
      >
        <div
          className={cn(
            'text-white text-lg font-bold font-[Sora,sans-serif] leading-[18px] tracking-[0.45px] whitespace-nowrap',
            'transition-opacity duration-200'
          )}
        >
          {title}
        </div>
        <div
          className={cn(
            'text-gray-400 text-[9px] font-medium font-[Sora,sans-serif] uppercase leading-[13.5px] tracking-[0.9px] whitespace-nowrap',
            'transition-opacity duration-200'
          )}
        >
          {subtitle}
        </div>
      </div>

      {/* Collapse Button - Always visible on right when expanded */}
      {!isCollapsed && onToggleCollapse && (
        <div className="h-[60px] flex items-center justify-center flex-shrink-0 ml-17">
          <CollapseToggleButton isCollapsed={isCollapsed} onToggle={onToggleCollapse} />
        </div>
      )}
    </div>
  );
}
