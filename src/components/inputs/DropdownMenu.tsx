'use client';

import type { ComponentType } from 'react';
import { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

export interface DropdownMenuOption {
  type: string;
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  color?: string;
}

export interface DropdownMenuProps {
  isOpen: boolean;
  options: DropdownMenuOption[];
  onOptionSelect: (type: string) => void;
  onClose: () => void;
  className?: string;
  bgColor?: string;
  borderColor?: string;
}

export function DropdownMenu({
  isOpen,
  options,
  onOptionSelect,
  onClose,
  className = '',
  bgColor = 'rgba(20, 20, 20, 0.95)',
  borderColor = 'rgba(255, 255, 255, 0.1)',
}: DropdownMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className={cn(
        'absolute left-0 top-full mt-2 min-w-[180px] rounded-xl overflow-hidden',
        className
      )}
      style={{
        background: bgColor,
        border: `1px solid ${borderColor}`,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {options.map((option) => (
        <DropdownMenuOption
          key={option.type}
          option={option}
          onSelect={onOptionSelect}
        />
      ))}
    </div>
  );
}

interface DropdownMenuOptionProps {
  option: DropdownMenuOption;
  onSelect: (type: string) => void;
}

function DropdownMenuOption({ option, onSelect }: DropdownMenuOptionProps) {
  const IconComponent = option.icon;

  return (
    <button
      type="button"
      onClick={() => onSelect(option.type)}
      className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-white/10 transition-colors"
    >
      <IconComponent
        size={16}
        className={cn('transition-colors', option.color || 'text-gray-500')}
      />
      <span className="text-[13px] text-gray-200">{option.label}</span>
    </button>
  );
}
