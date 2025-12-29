'use client';

import React, { useState, useRef, useEffect, useId } from 'react';
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
  value?: string;
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
  value,
  defaultValue = '',
  onChange,
  className = '',
  labelClassName = '',
  errorClassName = '',
  containerClassName = '',
  id: providedId,
  name,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [typeAheadBuffer, setTypeAheadBuffer] = useState('');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const typeAheadTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const reactId = useId();
  const id = providedId ?? reactId;
  const buttonId = `${id}-button`;
  const listboxId = `${id}-listbox`;
  const errorId = error ? `${id}-error` : undefined;

  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;
  const selectedIndex = options.findIndex(opt => opt.value === selectedValue);

  // Sync defaultValue changes in uncontrolled mode
  useEffect(() => {
    if (!isControlled && defaultValue !== undefined) {
      setInternalValue(defaultValue);
    }
  }, [defaultValue, isControlled]);

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

  // Close dropdown on outside click
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

  // Reset highlighted index when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
    }
  }, [isOpen, selectedIndex]);

  const handleSelect = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    setIsOpen(false);
    buttonRef.current?.focus();
    onChange?.(newValue);
  };

  const handleTypeAhead = (char: string) => {
    if (typeAheadTimeoutRef.current) {
      clearTimeout(typeAheadTimeoutRef.current);
    }
    const newBuffer = typeAheadBuffer + char.toLowerCase();
    setTypeAheadBuffer(newBuffer);

    const matchIndex = options.findIndex(opt =>
      opt.label.toLowerCase().startsWith(newBuffer)
    );

    if (matchIndex >= 0) {
      setHighlightedIndex(matchIndex);
    }

    typeAheadTimeoutRef.current = setTimeout(() => {
      setTypeAheadBuffer('');
    }, 500);
  };

  const handleButtonKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
      case 'ArrowUp':
        e.preventDefault();
        setIsOpen(true);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
          e.preventDefault();
          setIsOpen(true);
          handleTypeAhead(e.key);
        }
    }
  };

  const handleListboxKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < options.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Home':
        e.preventDefault();
        setHighlightedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setHighlightedIndex(options.length - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleSelect(options[highlightedIndex].value);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
          e.preventDefault();
          handleTypeAhead(e.key);
        }
    }
  };

  return (
    <div
      className={cn('relative w-full', containerClassName)}
      ref={dropdownRef}
    >
      {label && (
        <label
          id={buttonId}
          className={cn(
            'block text-sm font-medium text-gray-400 mb-2',
            labelClassName
          )}
        >
          {label}
        </label>
      )}

      <input type="hidden" name={name} id={id} value={selectedValue} />

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleButtonKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={label ? buttonId : undefined}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={errorId}
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
          aria-hidden="true"
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
          <div
            ref={listboxRef}
            role="listbox"
            id={listboxId}
            aria-labelledby={label ? buttonId : undefined}
            aria-activedescendant={
              highlightedIndex >= 0
                ? `${id}-option-${highlightedIndex}`
                : undefined
            }
            tabIndex={-1}
            onKeyDown={handleListboxKeyDown}
            className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-2 shadow-xl backdrop-blur-sm focus:outline-none"
          >
            {options.map((option, index) => (
              <div
                key={option.value}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={selectedValue === option.value}
                onClick={() => handleSelect(option.value)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={cn(
                  'w-full text-left px-4 py-3 rounded-xl transition-all cursor-pointer',
                  dropdownSizeClasses[selectSize],
                  selectedValue === option.value &&
                    'bg-violet-600/20 text-white',
                  highlightedIndex === index &&
                    selectedValue !== option.value &&
                    'bg-white/5',
                  selectedValue !== option.value &&
                    highlightedIndex !== index &&
                    'text-white hover:bg-white/5'
                )}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <p
          id={errorId}
          className={cn('mt-2 text-sm text-red-400', errorClassName)}
        >
          {error}
        </p>
      )}
    </div>
  );
};

Select.displayName = 'Select';
