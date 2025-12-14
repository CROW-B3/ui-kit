'use client';

import { LuArrowUpRight } from 'react-icons/lu';
import { useState } from 'react';

export interface InputFieldProps {
  placeholder?: string;
  onSubmit?: (value: string) => void;
  onChange?: (value: string) => void;
  value?: string;
  defaultValue?: string;
  showButton?: boolean;
  buttonIcon?: React.ReactNode;
  buttonPosition?: 'left' | 'right';
  variant?: 'transparent' | 'filled';
  size?: 'sm' | 'md' | 'lg';
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
    if (onSubmit && value) {
      onSubmit(value);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !disabled) {
      handleSubmit();
    }
  };

  // Size variants
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-4 text-sm',
    lg: 'px-8 py-5 text-base',
  };

  const buttonSizeClasses = {
    sm: 'p-1.5',
    md: 'p-2.5',
    lg: 'p-3',
  };

  const buttonPositionClasses = {
    left: 'left-2',
    right: 'right-2',
  };

  const paddingClasses = showButton
    ? buttonPosition === 'right'
      ? 'pr-14'
      : 'pl-14'
    : '';

  // Variant styles
  const variantClasses =
    variant === 'transparent'
      ? 'bg-transparent border border-white/20 focus:border-white/40'
      : 'bg-white/5 border border-white/10 focus:border-white/30';

  return (
    <div
      className={`relative w-full max-w-md ${containerClassName} ${className}`}
    >
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        disabled={disabled}
        className={`w-full ${sizeClasses[size]} ${paddingClasses} ${variantClasses} rounded-full text-white placeholder:text-white/50 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${inputClassName}`}
      />
      {showButton && (
        <button
          onClick={handleSubmit}
          disabled={disabled}
          className={`absolute ${buttonPositionClasses[buttonPosition]} top-1/2 -translate-y-1/2 ${buttonSizeClasses[size]} bg-purple-600 hover:bg-purple-700 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${buttonClassName}`}
        >
          {buttonIcon}
        </button>
      )}
    </div>
  );
}
