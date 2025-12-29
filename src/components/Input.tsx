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
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  ref?: React.Ref<HTMLInputElement>;
}

export function Input({
  label,
  error,
  className = '',
  labelClassName = '',
  errorClassName = '',
  containerClassName = '',
  inputClassName = '',
  variant = 'primary',
  inputSize = 'md',
  icon,
  iconPosition = 'right',
  ref,
  ...props
}: InputProps) {
  const reactId = React.useId();
  const id = props.id ?? reactId;

  const sizeClasses = {
    sm: {
      input: 'px-3 py-2 text-xs',
      inputWithIcon: iconPosition === 'left' ? 'pl-9' : 'pr-9',
      iconSize: 'w-4 h-4',
      iconLeft: 'left-3',
      iconRight: 'right-3',
    },
    md: {
      input: 'px-4 py-2.5 text-sm',
      inputWithIcon: iconPosition === 'left' ? 'pl-10' : 'pr-10',
      iconSize: 'w-5 h-5',
      iconLeft: 'left-3.5',
      iconRight: 'right-3.5',
    },
    lg: {
      input: 'px-5 py-3 text-base',
      inputWithIcon: iconPosition === 'left' ? 'pl-12' : 'pr-12',
      iconSize: 'w-6 h-6',
      iconLeft: 'left-4',
      iconRight: 'right-4',
    },
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
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div
            className={cn(
              'absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-white pointer-events-none z-10',
              iconPosition === 'left'
                ? sizeClasses[inputSize].iconLeft
                : sizeClasses[inputSize].iconRight
            )}
          >
            <span className={sizeClasses[inputSize].iconSize}>{icon}</span>
          </div>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            baseStyles,
            sizeClasses[inputSize].input,
            icon && sizeClasses[inputSize].inputWithIcon,
            variantClasses[variant],
            error
              ? 'border-red-500/50 focus:border-red-500/70 focus:ring-red-500/50'
              : '',
            inputClassName,
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className={cn('mt-2 text-sm text-red-400', errorClassName)}>
          {error}
        </p>
      )}
    </div>
  );
}
