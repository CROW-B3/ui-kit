import React from 'react';
import { cn } from '../lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  labelClassName?: string;
  errorClassName?: string;
  containerClassName?: string;
  inputClassName?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  inputSize?: 'sm' | 'md' | 'lg';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      className = '',
      labelClassName = '',
      errorClassName = '',
      containerClassName = '',
      inputClassName = '',
      variant = 'primary',
      inputSize = 'md',
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'px-3 py-2 text-xs',
      md: 'px-4 py-2.5 text-sm',
      lg: 'px-5 py-3 text-base',
    };

    const variantClasses = {
      primary:
        'bg-white/[0.02] border-white/10 focus:border-violet-500/50 focus:ring-violet-500/50 focus:bg-white/[0.04]',
      secondary:
        'bg-white/[0.03] border-white/20 focus:border-purple-500/50 focus:ring-purple-500/50 focus:bg-white/[0.05]',
      outline:
        'bg-transparent border-gray-600 focus:border-violet-400 focus:ring-violet-400/30',
    };

    const baseStyles =
      'w-full border rounded-full text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-1 transition-all duration-300 shadow-inner autofill:bg-white/[0.02] autofill:text-gray-200 autofill:shadow-[inset_0_0_0_1000px_rgba(255,255,255,0.02)]';

    return (
      <div className={cn('group relative w-full', containerClassName)}>
        {label && (
          <label
            className={cn(
              'block text-sm font-medium text-gray-400 mb-2',
              labelClassName
            )}
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            baseStyles,
            sizeClasses[inputSize],
            variantClasses[variant],
            error
              ? 'border-red-500/50 focus:border-red-500/70 focus:ring-red-500/50'
              : '',
            inputClassName,
            className
          )}
          {...props}
        />
        {error && (
          <p className={cn('mt-2 text-sm text-red-400', errorClassName)}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
