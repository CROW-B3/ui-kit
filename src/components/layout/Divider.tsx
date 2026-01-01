import React from 'react';
import { cn } from '../../lib/utils';

export interface DividerProps {
  text?: string;
  className?: string;
  lineClassName?: string;
  textClassName?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'light' | 'dark';
}

export const Divider: React.FC<DividerProps> = ({
  text,
  className = '',
  lineClassName = '',
  textClassName = '',
  orientation = 'horizontal',
  variant = 'default',
}) => {
  const variantClasses = {
    default: 'via-gray-800',
    light: 'via-gray-700',
    dark: 'via-gray-900',
  };

  const lineStyles = cn(
    'bg-gradient-to-r from-transparent to-transparent opacity-50',
    variantClasses[variant],
    orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
    lineClassName
  );

  if (orientation === 'vertical') {
    return (
      <div
        className={cn(
          'flex flex-col items-center gap-3 px-2 h-full',
          className
        )}
      >
        <div className={lineStyles}></div>
        {text && (
          <span
            className={cn(
              'text-[10px] uppercase tracking-widest text-gray-600 font-medium shrink-0 [writing-mode:vertical-rl]',
              textClassName
            )}
          >
            {text}
          </span>
        )}
        <div className={lineStyles}></div>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-3 py-2 w-full', className)}>
      <div className={lineStyles}></div>
      {text && (
        <span
          className={cn(
            'text-[10px] uppercase tracking-widest text-gray-600 font-medium shrink-0',
            textClassName
          )}
        >
          {text}
        </span>
      )}
      <div className={lineStyles}></div>
    </div>
  );
};
