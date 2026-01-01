import React from 'react';
import { cn } from '../../lib/utils';

export interface LinkGroupItem {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'muted';
  onClick?: () => void;
}

export interface LinkGroupProps {
  links: LinkGroupItem[];
  divider?: 'dot' | 'line' | 'none';
  spacing?: 'sm' | 'md' | 'lg';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

const variantStyles = {
  primary: 'text-gray-400 hover:text-white',
  secondary: 'text-gray-500 hover:text-gray-300',
  muted: 'text-gray-600 hover:text-gray-400',
};

const sizeStyles = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const spacingStyles = {
  sm: 'gap-3',
  md: 'gap-6',
  lg: 'gap-8',
};

const dividerStyles = {
  dot: 'w-1 h-1 rounded-full bg-white/10',
  line: 'w-px h-4 bg-white/10',
  none: 'hidden',
};

export function LinkGroup({
  links,
  divider = 'dot',
  spacing = 'md',
  size = 'sm',
  className = '',
}: LinkGroupProps) {
  return (
    <div
      className={cn(
        'flex items-center',
        spacingStyles[spacing],
        sizeStyles[size],
        className
      )}
    >
      {links.map((link, index) => (
        <React.Fragment key={link.href}>
          <a
            href={link.href}
            onClick={link.onClick}
            className={cn(
              variantStyles[link.variant || 'primary'],
              'transition-colors'
            )}
          >
            {link.label}
          </a>
          {index < links.length - 1 && divider !== 'none' && (
            <span className={dividerStyles[divider]} aria-hidden="true" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
