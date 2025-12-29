import React, { useState, useId } from 'react';
import { cn } from '../lib/utils';

export interface ToggleOptionProps {
  label: string;
  description?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'success' | 'warning';
  labelClassName?: string;
  descriptionClassName?: string;
  toggleClassName?: string;
  containerClassName?: string;
  layout?: 'horizontal' | 'vertical';
  icon?: React.ReactNode;
  id?: string;
}

export function ToggleOption({
  label,
  description,
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  size = 'md',
  variant = 'primary',
  labelClassName = '',
  descriptionClassName = '',
  toggleClassName = '',
  containerClassName = '',
  layout = 'horizontal',
  icon,
  id: providedId,
}: ToggleOptionProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const reactId = useId();
  const id = providedId ?? reactId;

  const isChecked =
    controlledChecked !== undefined ? controlledChecked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;
    const newValue = !isChecked;
    if (controlledChecked === undefined) {
      setInternalChecked(newValue);
    }
    onChange?.(newValue);
  };

  const sizeStyles = {
    sm: {
      toggle: 'w-8 h-5',
      circle: 'w-3 h-3',
      circleTranslate: 'translate-x-3.5',
      label: 'text-sm',
      description: 'text-[10px]',
      gap: 'gap-2',
    },
    md: {
      toggle: 'w-10 h-6',
      circle: 'w-4 h-4',
      circleTranslate: 'translate-x-4',
      label: 'text-base',
      description: 'text-xs',
      gap: 'gap-3',
    },
    lg: {
      toggle: 'w-12 h-7',
      circle: 'w-5 h-5',
      circleTranslate: 'translate-x-5',
      label: 'text-lg',
      description: 'text-sm',
      gap: 'gap-4',
    },
  };

  const variantStyles = {
    default: {
      active: 'bg-white/20',
      inactive: 'bg-white/10',
    },
    primary: {
      active: 'bg-violet-600',
      inactive: 'bg-white/10',
    },
    success: {
      active: 'bg-green-600',
      inactive: 'bg-white/10',
    },
    warning: {
      active: 'bg-yellow-600',
      inactive: 'bg-white/10',
    },
  };

  const layoutStyles = {
    horizontal: 'flex-row items-center',
    vertical: 'flex-col items-start',
  };

  return (
    <div
      className={cn(
        'flex',
        layoutStyles[layout],
        sizeStyles[size].gap,
        containerClassName
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={handleToggle}
        id={id}
        className={cn(
          'relative inline-flex items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-black',
          sizeStyles[size].toggle,
          isChecked
            ? variantStyles[variant].active
            : variantStyles[variant].inactive,
          disabled && 'opacity-50 cursor-not-allowed',
          !disabled && 'cursor-pointer',
          toggleClassName
        )}
      >
        <span
          className={cn(
            'inline-block rounded-full bg-white transform transition-transform duration-200',
            sizeStyles[size].circle,
            isChecked ? sizeStyles[size].circleTranslate : 'translate-x-1'
          )}
        />
      </button>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <label
            htmlFor={id}
            className={cn(
              'font-medium text-white cursor-pointer',
              sizeStyles[size].label,
              disabled && 'opacity-50 cursor-not-allowed',
              labelClassName
            )}
          >
            {label}
          </label>
        </div>
        {description && (
          <p
            className={cn(
              'text-gray-500 mt-1',
              sizeStyles[size].description,
              disabled && 'opacity-50',
              descriptionClassName
            )}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
