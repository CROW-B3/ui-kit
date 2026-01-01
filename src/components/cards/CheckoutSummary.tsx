import React from 'react';
import { cn } from '../../lib/utils';

export interface SummaryItem {
  label: string;
  value: string | number;
  valueClassName?: string;
  highlightValue?: boolean;
}

export interface CheckoutAction {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
}

export interface CheckoutSummaryProps {
  items: SummaryItem[];
  total?: {
    label?: string;
    amount: string;
    period?: string;
    currency?: string;
  };
  primaryAction?: CheckoutAction;
  secondaryActions?: {
    left?: string;
    right?: string;
    onLeftClick?: () => void;
    onRightClick?: () => void;
  };
  className?: string;
  itemsClassName?: string;
  totalClassName?: string;
  actionsClassName?: string;
  variant?: 'default' | 'dark' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  position?: 'fixed' | 'sticky' | 'static';
}

export function CheckoutSummary({
  items,
  total,
  primaryAction,
  secondaryActions,
  className = '',
  itemsClassName = '',
  totalClassName = '',
  actionsClassName = '',
  variant = 'dark',
  size = 'md',
  position = 'sticky',
}: CheckoutSummaryProps) {
  const variantStyles = {
    default: 'bg-white border-gray-200',
    dark: 'bg-black/95 backdrop-blur-lg border-white/10',
    glass: 'bg-white/5 backdrop-blur-xl border-white/20',
  };

  const positionStyles = {
    fixed: 'fixed bottom-0 left-0 right-0 z-50',
    sticky: 'sticky bottom-0 z-40',
    static: 'relative',
  };

  const sizeStyles = {
    sm: {
      container: 'px-4 py-3',
      itemPadding: 'px-4',
      labelText: 'text-[10px]',
      valueText: 'text-sm',
      totalAmount: 'text-xl',
      totalPeriod: 'text-sm',
      button: 'px-6 py-2.5 text-sm',
      dividerHeight: 'h-9',
      gap: 'gap-4',
    },
    md: {
      container: 'px-5 py-4',
      itemPadding: 'px-5',
      labelText: 'text-[10px]',
      valueText: 'text-sm',
      totalAmount: 'text-2xl',
      totalPeriod: 'text-sm',
      button: 'px-6 py-2.5 text-sm',
      dividerHeight: 'h-10',
      gap: 'gap-5',
    },
    lg: {
      container: 'px-6 py-5',
      itemPadding: 'px-6',
      labelText: 'text-xs',
      valueText: 'text-base',
      totalAmount: 'text-3xl',
      totalPeriod: 'text-base',
      button: 'px-8 py-3 text-base',
      dividerHeight: 'h-12',
      gap: 'gap-6',
    },
  };

  return (
    <div
      className={cn(
        'border border-white/10 rounded-2xl',
        variantStyles[variant],
        positionStyles[position],
        className
      )}
    >
      <div className={cn('max-w-6xl mx-auto', sizeStyles[size].container)}>
        <div
          className={cn(
            'flex items-center justify-between',
            sizeStyles[size].gap
          )}
        >
          <div className={cn('flex items-center', itemsClassName)}>
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <div
                  className={cn(
                    'flex flex-col gap-1 first:pl-0',
                    sizeStyles[size].itemPadding
                  )}
                >
                  <span
                    className={cn(
                      'uppercase tracking-wider text-gray-500 font-medium',
                      sizeStyles[size].labelText
                    )}
                  >
                    {item.label}
                  </span>
                  <span
                    className={cn(
                      'font-medium',
                      sizeStyles[size].valueText,
                      item.highlightValue ? 'text-violet-400' : 'text-gray-300',
                      item.valueClassName
                    )}
                  >
                    {item.value}
                  </span>
                </div>
                {index < items.length - 1 && (
                  <div
                    className={cn(
                      'w-px bg-white/10',
                      sizeStyles[size].dividerHeight
                    )}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className={cn('flex items-center', sizeStyles[size].gap)}>
            {total && (
              <>
                <div
                  className={cn(
                    'w-px bg-white/10',
                    sizeStyles[size].dividerHeight
                  )}
                />
                <div
                  className={cn(
                    'flex flex-col gap-1',
                    sizeStyles[size].itemPadding,
                    totalClassName
                  )}
                >
                  <span
                    className={cn(
                      'uppercase tracking-wider text-gray-500 font-medium',
                      sizeStyles[size].labelText
                    )}
                  >
                    {total.label || 'ESTIMATED TOTAL'}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span
                      className={cn(
                        'font-bold text-white',
                        sizeStyles[size].totalAmount
                      )}
                    >
                      {total.amount}
                    </span>
                    {total.period && (
                      <span
                        className={cn(
                          'text-gray-400',
                          sizeStyles[size].totalPeriod
                        )}
                      >
                        /{total.period}
                      </span>
                    )}
                  </div>
                </div>
              </>
            )}

            {primaryAction && (
              <>
                <div
                  className={cn(
                    'w-px bg-white/10',
                    sizeStyles[size].dividerHeight
                  )}
                />
                <div
                  className={cn(
                    'flex flex-col gap-2',
                    sizeStyles[size].itemPadding,
                    actionsClassName
                  )}
                >
                  <button
                    type="button"
                    onClick={primaryAction.onClick}
                    className={cn(
                      'rounded-xl font-medium transition-all duration-200 flex items-center gap-2',
                      sizeStyles[size].button,
                      primaryAction.variant === 'secondary'
                        ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                        : 'bg-violet-600 hover:bg-violet-700 text-white shadow-lg hover:shadow-xl'
                    )}
                  >
                    {primaryAction.text}
                    {primaryAction.icon}
                  </button>

                  {secondaryActions && (
                    <div className="flex items-center justify-between gap-4 text-xs">
                      {secondaryActions.left && (
                        <button
                          type="button"
                          onClick={secondaryActions.onLeftClick}
                          className="text-gray-500 hover:text-gray-300 transition-colors"
                        >
                          {secondaryActions.left}
                        </button>
                      )}
                      {secondaryActions.right && (
                        <button
                          type="button"
                          onClick={secondaryActions.onRightClick}
                          className="text-gray-500 hover:text-gray-300 transition-colors"
                        >
                          {secondaryActions.right}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
