'use client';

import { cn } from '../../lib/utils';

export interface ToggleSwitchProps {
  enabled: boolean;
  size?: 'sm' | 'default';
  onChange?: (newState: boolean) => void;
  'aria-label'?: string;
}

const sizeStyles = {
  sm: {
    container: 'w-9 h-5 rounded-[10px] p-0.5',
    thumb: 'w-4 h-4',
    translateX: 'translate-x-4',
  },
  default: {
    container: 'w-11 h-6 rounded-xl p-0.5',
    thumb: 'w-5 h-5',
    translateX: 'translate-x-5',
  },
} as const;

export function ToggleSwitch({
  enabled,
  size = 'default',
  onChange,
  'aria-label': ariaLabel,
}: ToggleSwitchProps) {
  const styles = sizeStyles[size];

  const handleToggle = () => {
    onChange?.(!enabled);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && onChange) {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <span
      role="switch"
      aria-checked={enabled}
      aria-label={ariaLabel}
      onClick={handleToggle}
      onKeyDown={onChange ? handleKeyDown : undefined}
      tabIndex={onChange ? 0 : undefined}
      className={cn(
        'inline-block relative transition-colors duration-200',
        styles.container,
        enabled ? 'bg-emerald-500/30' : 'bg-gray-500/30',
        onChange && 'cursor-pointer'
      )}
    >
      <div
        className={cn(
          'rounded-full transition-all duration-200',
          styles.thumb,
          enabled ? 'bg-emerald-500' : 'bg-gray-600',
          enabled && styles.translateX
        )}
      />
    </span>
  );
}
