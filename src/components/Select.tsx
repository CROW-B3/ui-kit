'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  error?: string;
  selectSize?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline';
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
  containerClassName?: string;
  id?: string;
  name?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  placeholder = 'Select...',
  label,
  error,
  selectSize = 'md',
  variant = 'primary',
  defaultValue = '',
  onChange,
  className = '',
  labelClassName = '',
  errorClassName = '',
  containerClassName = '',
  id,
  name,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-base',
  };

  const dropdownSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const variantClasses = {
    primary:
      'bg-white/[0.02] border-white/10 focus:border-violet-500/50 focus:ring-violet-500/50 focus:bg-white/[0.04]',
    secondary:
      'bg-white/[0.03] border-white/20 focus:border-purple-500/50 focus:ring-purple-500/50 focus:bg-white/[0.05]',
    outline:
      'bg-transparent border-gray-600 focus:border-violet-400 focus:ring-violet-400/30',
  };

  const selectedOption = options.find(opt => opt.value === selectedValue);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onChange?.(value);
  };

  return (
    <div
      className={cn('relative w-full', containerClassName)}
      ref={dropdownRef}
    >
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

      <input type="hidden" name={name} id={id} value={selectedValue} />

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full border rounded-full text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-1 transition-all duration-300 shadow-inner cursor-pointer flex items-center justify-between',
          variantClasses[variant],
          error
            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500'
            : '',
          sizeClasses[selectSize],
          className
        )}
      >
        <span className={selectedValue ? 'text-white' : 'text-gray-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2">
          <div className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-2 shadow-xl backdrop-blur-sm">
            {options.map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={cn(
                  'w-full text-left px-4 py-3 rounded-xl transition-all',
                  dropdownSizeClasses[selectSize],
                  selectedValue === option.value
                    ? 'bg-violet-600/20 text-white'
                    : 'text-white hover:bg-white/5'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && (
        <p className={cn('mt-2 text-sm text-red-400', errorClassName)}>
          {error}
        </p>
      )}
    </div>
  );
};

Select.displayName = 'Select';
