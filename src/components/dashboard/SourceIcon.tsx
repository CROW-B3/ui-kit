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
