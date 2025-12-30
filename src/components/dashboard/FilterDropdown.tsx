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
  const [selectedValue, setSelectedValue] = useState(value || options[0]?.value);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

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
  };

  const handleToggle = () => {
    if (!isOpen) {
      updatePosition();
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className={cn('relative', className)}>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        className={cn(
          'h-[34px] px-3 flex items-center gap-2 rounded-lg transition-colors hover:bg-white/5',
          showBorder && 'border-r border-white/10 rounded-r-none pr-4'
        )}
        style={{ background: isOpen ? 'rgba(255, 255, 255, 0.05)' : 'transparent' }}
      >
        <span className="text-xs font-medium text-gray-300">
          {selectedOption?.label || label}
        </span>
        <ChevronDown
          size={12}
          className={cn('text-gray-500 transition-transform', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed min-w-[160px] py-1 rounded-lg z-[9999]"
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              background: 'rgba(20, 10, 35, 0.98)',
              border: '1px solid rgba(255, 255, 255, 0.10)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
            }}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className="w-full px-3 py-2 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span
                  className={cn(
                    'text-xs',
                    selectedValue === option.value ? 'text-white' : 'text-gray-400'
                  )}
                >
                  {option.label}
                </span>
                {selectedValue === option.value && <Check size={12} className="text-purple-400" />}
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}
