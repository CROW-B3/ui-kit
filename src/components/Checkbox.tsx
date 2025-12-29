import React from 'react';
import { cn } from '../lib/utils';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode;
  labelClassName?: string;
  containerClassName?: string;
  checkboxClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';

  ref?: React.Ref<HTMLInputElement>;
}

export function Checkbox({
  label,
  className = '',
  labelClassName = '',
  containerClassName = '',
  checkboxClassName = '',
  size = 'md',
  variant = 'primary',
  ref,
  ...props
}: CheckboxProps) {
  const reactId = React.useId();
  const id = props.id ?? reactId;

  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const variantClasses = {
    primary:
      'border-gray-600 focus:ring-violet-500/50 checked:bg-violet-600 checked:border-violet-600',
    secondary:
      'border-gray-500 focus:ring-purple-500/50 checked:bg-purple-600 checked:border-purple-600',
  };

  const baseStyles =
    'appearance-none rounded-full border bg-transparent focus:ring-1 focus:ring-offset-0 transition-all cursor-pointer checked:shadow-[inset_0_0_0_2px_white]';

  return (
    <div className={cn('flex items-start gap-3', containerClassName)}>
      <div className={cn('flex items-center h-5', checkboxClassName)}>
        <input
          ref={ref}
          type="checkbox"
          id={id}
          className={cn(
            baseStyles,
            sizeClasses[size],
            variantClasses[variant],
            className
          )}
          {...props}
        />
      </div>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            'text-xs text-gray-500 leading-5 cursor-pointer',
            labelClassName
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
}
