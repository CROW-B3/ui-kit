import React from 'react';
import { motion } from 'framer-motion';

export interface OrderSummaryItem {
  label: string;
  value: string | number;
  valueClassName?: string;
}

export interface OrderSummaryCardProps {
  title?: string;
  items: OrderSummaryItem[];
  subtotal?: {
    label: string;
    amount: string | number;
  };
  tax?: {
    label: string;
    amount: string | number;
    isCalculating?: boolean;
  };
  total: {
    label: string;
    amount: string | number;
  };
  footer?: React.ReactNode;
  onChangePlan?: () => void;
  className?: string;
  delay?: number;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  title = 'Order summary',
  items,
  subtotal,
  tax,
  total,
  footer,
  onChangePlan,
  className = '',
  delay = 0.3,
}) => {
  return (
    <motion.div
      className={`bg-white/[0.02] border border-white/10 rounded-2xl p-7 shadow-card-glow backdrop-blur-sm sticky top-6 max-w-sm mx-auto ${className}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-7">
        <h2 className="text-base font-medium text-white">{title}</h2>
        {onChangePlan && (
          <button
            type="button"
            className="text-[10px] text-violet-400 hover:text-violet-300 transition-colors"
            onClick={onChangePlan}
          >
            Change plan
          </button>
        )}
      </div>

      {/* Summary Items */}
      <div className="space-y-5 mb-7">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-xs text-gray-400">{item.label}</span>
            <span
              className={
                item.valueClassName || 'text-xs text-white font-medium'
              }
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div className="h-px bg-white/5 w-full mb-7"></div>

      {/* Pricing Details */}
      <div className="space-y-5 mb-7">
        {subtotal && (
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">{subtotal.label}</span>
            <span className="text-xs text-white">{subtotal.amount}</span>
          </div>
        )}
        {tax && (
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">{tax.label}</span>
            <span
              className={
                tax.isCalculating
                  ? 'text-xs text-gray-500 italic'
                  : 'text-xs text-white'
              }
            >
              {tax.amount}
            </span>
          </div>
        )}
        <div className="flex justify-between items-center pt-2">
          <span className="text-xs text-white font-medium">{total.label}</span>
          <span className="text-base text-white font-semibold tracking-tight">
            {total.amount}
          </span>
        </div>
      </div>

      {/* Footer */}
      {footer && (
        <div className="flex items-center justify-center pt-4 border-t border-white/5">
          <div className="text-[10px] text-gray-600 mt-5 font-medium">
            {footer}
          </div>
        </div>
      )}
    </motion.div>
  );
};
