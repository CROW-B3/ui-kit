'use client';

import { cn } from '../../lib/utils';

export interface ToggleSwitchProps {
  enabled: boolean;
  size?: 'sm' | 'default';
  onChange?: (newState: boolean) => void;
  'aria-label'?: string;
}

/**
 * An accessible toggle switch component
 * Supports keyboard navigation and multiple sizes
 * @param {ToggleSwitchProps} props - Component props
 * @param {boolean} props.enabled - Whether the toggle is enabled/checked
 * @param {'sm' | 'default'} [props.size] - Toggle size variant
 * @param {(newState: boolean) => void} [props.onChange] - Callback function when toggle is toggled, receives the new state
 * @returns {JSX.Element} The toggle switch component
 */
export function ToggleSwitch({
  enabled,
  size = 'default',
  onChange,
  'aria-label': ariaLabel,
}: ToggleSwitchProps) {
  const isSmall = size === 'sm';

  const handleToggle = () => {
    onChange?.(!enabled);
  };

  return (
    <span
      role="switch"
      aria-checked={enabled}
      aria-label={ariaLabel}
      onClick={handleToggle}
      onKeyDown={
        onChange
          ? e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggle();
              }
            }
          : undefined
      }
      tabIndex={onChange ? 0 : undefined}
      className={cn(
        'inline-block relative transition-colors duration-200',
        isSmall ? 'w-9 h-5 rounded-[10px] p-0.5' : 'w-11 h-6 rounded-xl p-0.5',
        enabled ? 'bg-emerald-500/30' : 'bg-gray-500/30',
        onChange && 'cursor-pointer'
      )}
    >
      <div
        className={cn(
          'rounded-full transition-all duration-200',
          isSmall ? 'w-4 h-4' : 'w-5 h-5',
          enabled ? 'bg-emerald-500' : 'bg-gray-600',
          enabled && (isSmall ? 'translate-x-4' : 'translate-x-5')
        )}
      />
    </span>
  );
}
