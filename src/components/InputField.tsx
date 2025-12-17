'use client';

import { LuArrowUpRight } from 'react-icons/lu';
import { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const inputVariants = cva(
  'w-full rounded-full text-white placeholder:text-white/50 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        transparent:
          'bg-transparent border border-white/20 focus:border-white/40',
        filled: 'bg-white/5 border border-white/10 focus:border-white/30',
      },
      size: {
        sm: 'px-4 py-2 text-xs',
        md: 'px-6 py-4 text-sm',
        lg: 'px-8 py-5 text-base',
      },
      buttonPosition: {
        left: 'pl-14',
        right: 'pr-14',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'transparent',
      size: 'md',
      buttonPosition: 'none',
    },
  }
);

const buttonVariants = cva(
  'absolute top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      size: {
        sm: 'p-1.5',
        md: 'p-2.5',
        lg: 'p-3',
      },
      position: {
        left: 'left-2',
        right: 'right-2',
      },
    },
    defaultVariants: {
      size: 'md',
      position: 'right',
    },
  }
);

export interface InputFieldProps
  extends Omit<VariantProps<typeof inputVariants>, 'buttonPosition'> {
  placeholder?: string;
  onSubmit?: (value: string) => void;
  onChange?: (value: string) => void;
  value?: string;
  defaultValue?: string;
  showButton?: boolean;
  buttonIcon?: React.ReactNode;
  buttonPosition?: 'left' | 'right';
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  containerClassName?: string;
  disabled?: boolean;
  type?: string;
}

export function InputField({
  placeholder = 'Ask CROW Anything...',
  onSubmit,
  onChange,
  value: controlledValue,
  defaultValue = '',
  showButton = true,
  buttonIcon = <LuArrowUpRight className="w-4 h-4 text-white" />,
  buttonPosition = 'right',
  variant = 'transparent',
  size = 'md',
  className = '',
  inputClassName = '',
  buttonClassName = '',
  containerClassName = '',
  disabled = false,
  type = 'text',
}: InputFieldProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleSubmit = () => {
    if (onSubmit && value.trim()) {
      onSubmit(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !disabled) {
      handleSubmit();
    }
  };

  return (
    <div
      className={cn('relative w-full max-w-md', containerClassName, className)}
    >
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={cn(
          inputVariants({
            variant,
            size,
            buttonPosition: showButton ? buttonPosition : 'none',
          }),
          inputClassName
        )}
      />
      {showButton && (
        <button
          onClick={handleSubmit}
          disabled={disabled}
          className={cn(
            buttonVariants({ size, position: buttonPosition }),
            buttonClassName
          )}
        >
          {buttonIcon}
        </button>
      )}
    </div>
  );
}
