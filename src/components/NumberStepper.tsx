import { useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { FiMinus } from 'react-icons/fi';
import { cn } from '../lib/utils';

export interface NumberStepperProps {
  defaultValue?: number;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  label?: string;
  description?: string;
  className?: string;
  formatDisplay?: (value: number) => string;
  size?: 'sm' | 'md' | 'lg';
}

export function NumberStepper({
  defaultValue = 1,
  value: controlledValue,
  min = 1,
  max = 100,
  step = 1,
  onChange,
  label,
  description,
  className = '',
  formatDisplay = value => value.toString(),
  size = 'md',
}: NumberStepperProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const currentValue = controlledValue ?? internalValue;

  const handleIncrement = () => {
    if (currentValue < max) {
      const newValue = Math.min(currentValue + step, max);
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    }
  };

  const handleDecrement = () => {
    if (currentValue > min) {
      const newValue = Math.max(currentValue - step, min);
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    }
  };

  const sizeStyles = {
    sm: {
      button: 'w-6 h-6',
      text: 'text-xs min-w-[1.25rem]',
      icon: 'text-xs',
      gap: 'gap-2',
    },
    md: {
      button: 'w-8 h-8',
      text: 'text-sm min-w-[1.5rem]',
      icon: 'text-sm',
      gap: 'gap-4',
    },
    lg: {
      button: 'w-10 h-10',
      text: 'text-base min-w-[2rem]',
      icon: 'text-base',
      gap: 'gap-6',
    },
  };

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      {label && (
        <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">
          {label}
        </span>
      )}
      <div
        className={cn(
          'flex items-center bg-white/[0.03] border border-white/10 rounded-full p-1 px-2',
          sizeStyles[size].gap
        )}
      >
        <button
          type="button"
          onClick={handleDecrement}
          disabled={currentValue <= min}
          className={cn(
            'flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed',
            sizeStyles[size].button
          )}
          aria-label="Decrease value"
        >
          <FiMinus className={sizeStyles[size].icon} />
        </button>
        <span
          className={cn(
            'font-medium text-white text-center',
            sizeStyles[size].text
          )}
        >
          {formatDisplay(currentValue)}
        </span>
        <button
          type="button"
          onClick={handleIncrement}
          disabled={currentValue >= max}
          className={cn(
            'flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed',
            sizeStyles[size].button
          )}
          aria-label="Increase value"
        >
          <IoIosAdd className={sizeStyles[size].icon} />
        </button>
      </div>
      {description && (
        <span className="text-[10px] text-gray-600">{description}</span>
      )}
    </div>
  );
}
