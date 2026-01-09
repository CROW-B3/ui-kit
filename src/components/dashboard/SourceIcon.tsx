'use client';

import { Globe, MessageCircle, Video } from 'lucide-react';

export type SourceType = 'web' | 'cctv' | 'social';

export interface SourceIconProps {
  source: SourceType;
  size?: 'sm' | 'md';
}

const sourceConfig: Record<
  SourceType,
  { icon: typeof Globe; color: string; bg: string }
> = {
  web: { icon: Globe, color: '#60A5FA', bg: 'rgba(96, 165, 250, 0.15)' },
  cctv: { icon: Video, color: '#F87171', bg: 'rgba(248, 113, 113, 0.15)' },
  social: {
    icon: MessageCircle,
    color: '#A78BFA',
    bg: 'rgba(167, 139, 250, 0.15)',
  },
};

/**
 * An icon component that displays source type with color-coded styling
 * Used to distinguish between web, CCTV, and social media sources
 * @param {SourceIconProps} props - Component props
 * @param {'web' | 'cctv' | 'social'} props.source - Type of source
 * @param {'sm' | 'md'} [props.size='sm'] - Icon size variant
 * @returns {JSX.Element} The source icon component
 */
export function SourceIcon({ source, size = 'sm' }: SourceIconProps) {
  const config = sourceConfig[source];
  const IconComponent = config.icon;
  const sizeClasses = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  const iconSize = size === 'sm' ? 16 : 20;

  return (
    <div
      className={`${sizeClasses} rounded-lg flex items-center justify-center`}
      style={{ background: config.bg }}
    >
      <IconComponent size={iconSize} color={config.color} />
    </div>
  );
}
