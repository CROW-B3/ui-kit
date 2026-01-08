'use client';

import { Check, ChevronDown } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/utils';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  showBorder?: boolean;
}

export function FilterDropdown({
  label,
  options,
  value,
  onChange,
  className,
  showBorder = false,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    value || options[0]?.value
  );
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined && value !== selectedValue) {
      const timer = setTimeout(() => setSelectedValue(value), 0);
      return () => clearTimeout(timer);
    }
  }, [value, selectedValue]);

  const selectedOption = options.find(opt => opt.value === selectedValue);

  const updatePosition = useCallback(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left,
      });
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        buttonRef.current &&
        !buttonRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isOpen, updatePosition]);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const handleToggle = () => {
    if (!isOpen) {
      updatePosition();
      setFocusedIndex(0);
    }
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        updatePosition();
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        buttonRef.current?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => (prev < options.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : options.length - 1));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < options.length) {
          handleSelect(options[focusedIndex].value);
        }
        break;
      case 'Tab':
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
    }
  };

  return (
    <div className={cn('relative', className)}>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`${label} filter`}
        className={cn(
          'h-[34px] px-3 flex items-center gap-2 rounded-lg transition-colors hover:bg-white/5',
          showBorder && 'border-r border-white/10 rounded-r-none pr-4',
          isOpen ? 'bg-white/5' : 'bg-transparent'
        )}
      >
        <span className="text-xs font-medium text-gray-300">
          {selectedOption?.label || label}
        </span>
        <ChevronDown
          size={12}
          className={cn(
            'text-gray-500 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={dropdownRef}
            role="listbox"
            aria-label={`${label} options`}
            onKeyDown={handleKeyDown}
            className="fixed min-w-[160px] py-1 rounded-lg z-[9999] bg-[rgba(20,10,35,0.98)] border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
            }}
          >
            {options.map((option, index) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={selectedValue === option.value}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  'w-full px-3 py-2 flex items-center justify-between text-left transition-colors',
                  focusedIndex === index && 'bg-white/5',
                  focusedIndex !== index && 'hover:bg-white/5'
                )}
              >
                <span
                  className={cn(
                    'text-xs',
                    selectedValue === option.value
                      ? 'text-white'
                      : 'text-gray-400'
                  )}
                >
                  {option.label}
                </span>
                {selectedValue === option.value && (
                  <Check size={12} className="text-purple-400" />
                )}
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}
