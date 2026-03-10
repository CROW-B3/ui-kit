'use client';

import type { ReactNode } from 'react';
import { GlassPanel } from '../layout/GlassPanel';
import { SectionHeader } from '../layout/SectionHeader';
import type { SectionHeaderProps } from '../layout/SectionHeader';
import { cn } from '../../lib/utils';

export interface ListCardProps {
  title: string;
  viewAllHref?: string;
  viewAllText?: string;
  LinkComponent?: SectionHeaderProps['LinkComponent'];
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function ListCard({
  title,
  viewAllHref,
  viewAllText,
  LinkComponent,
  children,
  className = '',
  contentClassName = '',
}: ListCardProps) {
  return (
    <GlassPanel variant="heavy" className={cn('overflow-hidden', className)}>
      {LinkComponent && viewAllHref ? (
        <SectionHeader
          title={title}
          viewAllHref={viewAllHref}
          viewAllText={viewAllText}
          LinkComponent={LinkComponent}
        />
      ) : (
        <div className="px-3 sm:px-4 py-3 sm:py-4">
          <h3 className="text-sm font-semibold text-white">
            {title}
          </h3>
        </div>
      )}
      <div className={cn('p-3 sm:p-4 space-y-1', contentClassName)}>
        {children}
      </div>
    </GlassPanel>
  );
}
