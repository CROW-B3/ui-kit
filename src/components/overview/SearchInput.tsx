'use client';

import { useState } from 'react';
import { Search, ArrowRight, Mic } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface SearchInputProps {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  showMicButton?: boolean;
  disabled?: boolean;
  className?: string;
  helperText?: string;
}

export function SearchInput({
  placeholder = 'Search...',
  value: controlledValue,
  defaultValue = '',
  onChange,
  onSubmit,
  showMicButton = true,
  disabled = false,
  className,
  helperText,
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue ?? internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleSubmit = () => {
    if (onSubmit && value.trim() && !disabled) {
      onSubmit(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn(
          'relative flex items-center rounded-full overflow-hidden h-[48px] sm:h-[54px]',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        style={{
          background: '#0E0A15',
          boxShadow: '0px 4px 6px -4px rgba(0, 0, 0, 0.10)',
          border: '1px solid rgba(255, 255, 255, 0.10)',
        }}
      >
        <SearchIcon />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={cn(
            'w-full h-full pl-[53px] bg-transparent',
            'text-white text-sm placeholder:text-gray-500',
            'focus:outline-none',
            'disabled:cursor-not-allowed',
            showMicButton ? 'pr-24' : 'pr-14'
          )}
        />
        <ActionButtons
          showMicButton={showMicButton}
          disabled={disabled}
          onSubmit={handleSubmit}
        />
      </div>

      {helperText && (
        <p className="text-[10px] text-gray-600 mt-2 sm:mt-3 text-center">
          {helperText}
        </p>
      )}
    </div>
  );
}

function SearchIcon() {
  return (
    <div className="absolute left-4 flex items-center justify-center">
      <Search
        size={24}
        className="text-gray-500"
        strokeWidth={2}
      />
    </div>
  );
}

interface ActionButtonsProps {
  showMicButton: boolean;
  disabled: boolean;
  onSubmit: () => void;
}

function ActionButtons({
  showMicButton,
  disabled,
  onSubmit,
}: ActionButtonsProps) {
  return (
    <div className="absolute right-2 sm:right-3 flex items-center gap-1 sm:gap-2">
      {showMicButton && (
        <button
          type="button"
          disabled={disabled}
          className={cn(
            'w-9 h-9 flex items-center justify-center rounded-full',
            'hover:bg-white/5 transition-colors',
            'disabled:cursor-not-allowed'
          )}
          aria-label="Voice input"
        >
          <Mic
            size={20}
            className="text-gray-500"
            strokeWidth={2}
          />
        </button>
      )}

      <button
        type="button"
        onClick={onSubmit}
        disabled={disabled}
        className={cn(
          'w-9 h-9 flex items-center justify-center rounded-full',
          'transition-colors',
          'disabled:cursor-not-allowed disabled:opacity-50'
        )}
        style={{
          background: '#7C3AED',
          boxShadow: '0px 0px 10px rgba(124, 58, 237, 0.30)',
        }}
        aria-label="Submit"
      >
        <ArrowRight
          size={18}
          className="text-white"
          strokeWidth={2}
        />
      </button>
    </div>
  );
}
