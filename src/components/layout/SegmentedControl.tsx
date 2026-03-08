import { useState } from 'react';
import { cn } from '../../lib/utils';

export interface SegmentedControlOption<T extends string = string> {
  label: string;
  value: T;
}

export interface SegmentedControlProps<T extends string = string> {
  options: SegmentedControlOption<T>[];
  defaultValue?: T;
  value?: T;
  onChange?: (value: T) => void;
  label?: string;
  description?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function SegmentedControl<T extends string = string>({
  options,
  defaultValue,
  value: controlledValue,
  onChange,
  label,
  description,
  className = '',
  size = 'md',
}: SegmentedControlProps<T>) {
  const [internalValue, setInternalValue] = useState<T>(
    defaultValue ?? options[0]?.value
  );

  const selected = controlledValue ?? internalValue;

  const handleToggle = (value: T) => {
    if (controlledValue === undefined) {
      setInternalValue(value);
    }
    onChange?.(value);
  };

  const sizeStyles = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-5 py-1.5 text-sm',
    lg: 'px-7 py-2 text-base',
  };

  if (!options || options.length === 0) return null;

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      {label && (
        <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">
          {label}
        </span>
      )}
      <div
        role="radiogroup"
        aria-label={label}
        className="flex items-center bg-white/[0.03] border border-white/10 rounded-full p-1 relative"
      >
        {options.map(option => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected === option.value}
            onClick={() => handleToggle(option.value)}
            className={cn(
              'font-medium transition-colors rounded-full relative z-10',
              sizeStyles[size],
              selected === option.value
                ? 'text-white bg-white/10 shadow-sm'
                : 'text-gray-400 hover:text-white'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
      {description && (
        <span className="text-[10px] text-violet-400/80">{description}</span>
      )}
    </div>
  );
}
