'use client';

import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
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

      {isOpen && (
        <div
          className="absolute top-full left-0 mt-1 min-w-[160px] py-1 rounded-lg z-[100]"
          style={{
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
        </div>
      )}
    </div>
  );
}
