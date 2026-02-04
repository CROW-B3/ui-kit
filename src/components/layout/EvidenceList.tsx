'use client';

import { ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface EvidenceItem {
  id: string;
  type: 'screenshot' | 'log' | 'video' | 'document' | string;
  title: string;
  timestamp?: string;
  preview?: string;
  onItemClick?: (item: EvidenceItem) => void;
}

export interface EvidenceListProps {
  items: EvidenceItem[];
  onItemClick?: (item: EvidenceItem) => void;
  className?: string;
}

const evidenceTypeStyles: Record<string, { bgClass: string; textClass: string; label: string }> = {
  screenshot: { bgClass: 'bg-blue-500/20', textClass: 'text-blue-400', label: 'IMG' },
  video: { bgClass: 'bg-red-500/20', textClass: 'text-red-400', label: 'VID' },
  log: { bgClass: 'bg-green-500/20', textClass: 'text-green-400', label: 'LOG' },
  document: { bgClass: 'bg-purple-500/20', textClass: 'text-purple-400', label: 'DOC' },
};

export function EvidenceList({
  items,
  onItemClick,
  className = '',
}: EvidenceListProps) {
  const getEvidenceStyle = (type: string) => {
    return evidenceTypeStyles[type.toLowerCase()] || evidenceTypeStyles.document;
  };

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item) => (
        <EvidenceListItem
          key={item.id}
          item={item}
          style={getEvidenceStyle(item.type)}
          onClick={onItemClick || item.onItemClick}
        />
      ))}
    </div>
  );
}

interface EvidenceListItemProps {
  item: EvidenceItem;
  style: { bgClass: string; textClass: string; label: string };
  onClick?: (item: EvidenceItem) => void;
}

function EvidenceListItem({ item, style, onClick }: EvidenceListItemProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(item)}
      className="w-full p-3 rounded-lg text-left transition-colors hover:bg-white/[0.03]"
      style={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn('w-4 h-4 rounded flex items-center justify-center', style.bgClass)}>
            <span className={cn('text-[8px]', style.textClass)}>
              {style.label}
            </span>
          </div>
          <span className="text-sm font-medium" style={{ color: '#E5E7EB' }}>
            {item.title}
          </span>
        </div>
        <ExternalLink size={14} color="#6B7280" />
      </div>
      {item.timestamp && (
        <p className="text-xs mt-1 ml-6" style={{ color: '#6B7280' }}>
          {item.timestamp}
        </p>
      )}
    </button>
  );
}
