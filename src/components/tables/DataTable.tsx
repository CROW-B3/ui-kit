'use client';

import { cn } from '../../lib/utils';

export interface Column<T> {
  label: string;
  width: string;
  render: (item: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  mobileRender: (item: T) => React.ReactNode;
  className?: string;
  rowClassName?: string;
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  onRowClick,
  mobileRender,
  className = '',
  rowClassName = '',
}: DataTableProps<T>) {
  return (
    <>
      {/* Desktop view */}
      <div
        className={cn('hidden md:block relative z-10 w-full rounded-xl overflow-hidden', className)}
        style={{
          background: 'rgba(10, 5, 20, 0.40)',
          boxShadow: '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
          outline: '1px rgba(255, 255, 255, 0.08) solid',
          outlineOffset: '-1px',
          backdropFilter: 'blur(8px)',
        }}
      >
        {/* Header */}
        <div
          className="h-[44px] flex items-center px-6 border-b"
          style={{
            background: 'rgba(255, 255, 255, 0.01)',
            borderColor: 'rgba(255, 255, 255, 0.08)',
          }}
        >
          {columns.map((col) => (
            <div
              key={col.label}
              className={cn('text-[10px] font-semibold uppercase tracking-[0.5px]', col.width)}
              style={{ color: '#6B7280' }}
            >
              {col.label}
            </div>
          ))}
        </div>

        {/* Rows */}
        <div>
          {data.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onRowClick?.(item)}
              className={cn(
                'w-full flex items-center px-6 text-left transition-colors hover:bg-white/[0.02]',
                index > 0 && 'border-t',
                rowClassName
              )}
              style={{
                minHeight: '68px',
                borderColor: index > 0 ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
              }}
            >
              {columns.map((col) => (
                <div key={col.label} className={col.width}>
                  {col.render(item)}
                </div>
              ))}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile view */}
      <div className="md:hidden space-y-3">
        {data.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onRowClick?.(item)}
            className="w-full p-4 rounded-lg text-left transition-colors hover:bg-white/[0.05]"
            style={{
              background: 'rgba(10, 5, 20, 0.40)',
              outline: '1px rgba(255, 255, 255, 0.08) solid',
              outlineOffset: '-1px',
              backdropFilter: 'blur(8px)',
            }}
          >
            {mobileRender(item)}
          </button>
        ))}
      </div>
    </>
  );
}
