'use client';

import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ListItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  showChevron?: boolean;
  highlighted?: boolean;
  className?: string;
}

/**
 * A clickable list item component with optional highlighting
 * Shows a chevron icon on hover and supports highlighted state
 * @param {ListItemProps} props - Component props
 * @param {React.ReactNode} props.children - Item content
 * @param {() => void} [props.onClick] - Click handler
 * @param {string} [props.ariaLabel] - Accessibility label
 * @param {boolean} [props.showChevron=false] - Whether to show chevron indicator
 * @param {boolean} [props.highlighted=false] - Whether item is highlighted
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} The list item component
 */
export function ListItem({
  children,
  onClick,
  ariaLabel,
  showChevron = false,
  highlighted = false,
  className,
}: ListItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        'w-full px-2.5 sm:px-3 py-2.5 sm:py-3 rounded-lg text-left transition-all group',
        highlighted
          ? 'border-l-2 border-l-violet-500 bg-violet-500/[0.02] pl-3 sm:pl-3.5'
          : 'hover:bg-white/[0.02]',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">{children}</div>
        {showChevron && <ChevronIndicator />}
      </div>
    </button>
  );
}

function ChevronIndicator() {
  return (
    <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity mt-1 flex-shrink-0">
      <ChevronRight
        size={12}
        className="text-gray-600 sm:w-3.5 sm:h-3.5"
        strokeWidth={2}
      />
    </div>
  );
}
