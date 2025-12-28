'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  selectSize?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  id?: string;
  name?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  placeholder = 'Select...',
  error,
  selectSize = 'md',
  variant = 'default',
  defaultValue = '',
  onChange,
  className = '',
  id,
  name,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs h-8',
    md: 'px-4 py-2.5 text-sm h-10',
    lg: 'px-5 py-3 text-base h-12',
  };

  const variantClasses = {
    default: 'bg-white/[0.03] border border-white/10',
    outline: 'bg-transparent border border-white/20',
    ghost: 'bg-transparent border border-transparent hover:bg-white/5',
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
    <div className="relative w-full" ref={dropdownRef}>
      <input type="hidden" name={name} id={id} value={selectedValue} />

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
					w-full text-white rounded-full
					outline-none transition-all shadow-inner cursor-pointer
					flex items-center justify-between
					${variantClasses[variant]}
					${error ? '!border-red-500/50 focus:!border-red-500 focus:ring-1 focus:ring-red-500' : 'focus:border-violet-600 focus:ring-1 focus:ring-violet-600'}
					${sizeClasses[selectSize]}
					${className}
				`}
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
                className={`
									w-full text-left px-4 py-3 rounded-xl text-sm transition-all
									${
                    selectedValue === option.value
                      ? 'bg-violet-600/20 text-white'
                      : 'text-white hover:bg-white/5'
                  }
								`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && <p className="text-xs text-red-400 mt-2 pl-4">{error}</p>}
    </div>
  );
};

Select.displayName = 'Select';
