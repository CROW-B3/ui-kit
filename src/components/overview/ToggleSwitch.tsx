'use client';

export interface ToggleSwitchProps {
  enabled: boolean;
  size?: 'sm' | 'default';
}

export function ToggleSwitch({ enabled, size = 'default' }: ToggleSwitchProps) {
  const isSmall = size === 'sm';
  const trackWidth = isSmall ? 36 : 44;
  const trackHeight = isSmall ? 20 : 24;
  const thumbSize = isSmall ? 16 : 20;
  const translateX = isSmall ? 16 : 20;

  return (
    <div
      style={{
        width: trackWidth,
        height: trackHeight,
        borderRadius: trackHeight / 2,
        background: enabled ? 'rgba(16, 185, 129, 0.3)' : 'rgba(107, 114, 128, 0.3)',
        padding: 2,
        transition: 'background 0.2s ease',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: thumbSize,
          height: thumbSize,
          borderRadius: thumbSize / 2,
          background: enabled ? '#10B981' : '#4B5563',
          transition: 'all 0.2s ease',
          transform: enabled ? `translateX(${translateX}px)` : 'translateX(0)',
        }}
      />
    </div>
  );
}
