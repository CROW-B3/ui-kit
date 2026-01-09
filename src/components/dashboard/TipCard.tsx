'use client';

import { Lightbulb } from 'lucide-react';

export interface TipCardProps {
  children: React.ReactNode;
}

/**
 * A tip card component for displaying helpful information or tips
 * Features a lightbulb icon and glass-morphism styling
 * @param {TipCardProps} props - Component props
 * @param {React.ReactNode} props.children - Tip text content
 * @returns {JSX.Element} The tip card component
 */
export function TipCard({ children }: TipCardProps) {
  return (
    <div
      className="inline-flex items-start gap-3 px-4 py-3 rounded-xl"
      style={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <Lightbulb size={16} className="text-gray-500 flex-shrink-0 mt-0.5" />
      <p className="text-xs text-gray-400 leading-relaxed">{children}</p>
    </div>
  );
}
