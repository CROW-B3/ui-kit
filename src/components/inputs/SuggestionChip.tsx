'use client';

import { cn } from '../../lib/utils';

export interface SuggestionChipProps {
  suggestions: string[];
  onSuggestionClick?: (suggestion: string) => void;
  className?: string;
  buttonSize?: string;
  textSize?: string;
  ariaLabelPrefix?: string;
}

function Chip({
  text,
  onClick,
  buttonSize,
  textSize,
  ariaLabel,
}: {
  text: string;
  onClick: () => void;
  buttonSize?: string;
  textSize?: string;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        buttonSize || 'h-7 sm:h-[30px] px-2.5 sm:px-3',
        'rounded-lg',
        'bg-white/[0.03] border border-white/5',
        'hover:bg-white/[0.05] transition-colors'
      )}
    >
      <span
        className={cn(textSize || 'text-[10px] sm:text-xs', 'text-gray-300')}
      >
        {text}
      </span>
    </button>
  );
}

export function SuggestionChip({
  suggestions,
  onSuggestionClick,
  className,
  buttonSize,
  textSize,
  ariaLabelPrefix = 'Suggestion',
}: SuggestionChipProps) {
  if (suggestions.length === 0) return null;

  return (
    <div
      className={cn('flex items-center gap-1.5 sm:gap-2 flex-wrap', className)}
    >
      {suggestions.map(suggestion => (
        <Chip
          key={suggestion}
          text={suggestion}
          onClick={() => onSuggestionClick?.(suggestion)}
          buttonSize={buttonSize}
          textSize={textSize}
          ariaLabel={`${ariaLabelPrefix}: ${suggestion}`}
        />
      ))}
    </div>
  );
}
