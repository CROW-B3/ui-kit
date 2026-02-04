'use client';

import { Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface AttachmentButtonProps {
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}

export function AttachmentButton({
  onClick,
  className = '',
  ariaLabel = 'Attach file or link',
}: AttachmentButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'p-1 rounded-lg hover:bg-white/10 transition-colors',
        className
      )}
      aria-label={ariaLabel}
    >
      <Plus
        size={24}
        className="text-gray-500 hover:text-gray-300 transition-colors"
        strokeWidth={2}
      />
    </button>
  );
}
