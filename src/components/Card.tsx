'use client';

import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const cardVariants = cva(
  'relative p-8 flex flex-col h-full backdrop-blur-sm group border-white/10 overflow-visible',
  {
    variants: {
      border: {
        all: 'border',
        top: 'border-t',
        bottom: 'border-b',
        left: 'border-l',
        right: 'border-r',
        'top-bottom': 'border-t border-b',
        'left-right': 'border-l border-r',
        'top-left': 'border-t border-l',
        'top-right': 'border-t border-r',
        'bottom-left': 'border-b border-l',
        'bottom-right': 'border-b border-r',
        none: '',
      },
    },
    defaultVariants: {
      border: 'none',
    },
  }
);

const contentVariants = cva('', {
  variants: {
    align: {
      left: 'text-left',
      center: 'text-center',
    },
  },
  defaultVariants: {
    align: 'left',
  },
});

const descriptionVariants = cva('text-sm leading-relaxed mb-8', {
  variants: {
    layout: {
      feature: '',
      documentation: 'flex-grow',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
    },
  },
  defaultVariants: {
    layout: 'feature',
    align: 'left',
  },
});

export interface CardProps extends VariantProps<typeof cardVariants> {
  title: string;
  description: string;
  icon?: React.ReactNode;
  button?: React.ReactNode;
  index: number;
  isFirst?: boolean;
  isLast?: boolean;
  layout?: 'feature' | 'documentation';
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  iconClassName?: string;
  contentAlign?: 'left' | 'center';
}

export function Card({
  title,
  description,
  icon,
  button,
  index,
  isFirst = false,
  isLast = false,
  layout = 'feature',
  className = '',
  titleClassName = '',
  descriptionClassName = '',
  iconClassName = '',
  contentAlign = 'left',
  border,
}: CardProps) {
  // Use explicit border prop if provided, otherwise fall back to legacy isFirst/isLast logic
  const borderVariant =
    border || (isFirst ? 'left-right' : isLast ? 'right' : 'right');

  return (
    <motion.div
      className={cn(
        cardVariants({ border: borderVariant }),
        className,
        'relative'
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Top border on hover */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Bottom border on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Corner squares - appear on hover */}
      {/* Top-left corner */}
      <div className="absolute top-[1px] left-0 w-3 h-3 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Top-right corner */}
      <div className="absolute top-[1px] right-0 w-3 h-3 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Bottom-left corner */}
      <div className="absolute bottom-[1px] left-0 w-3 h-3 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Bottom-right corner */}
      <div className="absolute bottom-[1px] right-0 w-3 h-3 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {layout === 'documentation' && icon && (
        <div
          className={cn('flex items-center justify-center mb-6', iconClassName)}
        >
          <div className="text-white/80">{icon}</div>
        </div>
      )}

      <h3
        className={cn(
          'text-2xl font-semibold text-white mb-3',
          contentVariants({ align: contentAlign }),
          titleClassName
        )}
      >
        {title}
      </h3>

      <p
        className={cn(
          descriptionVariants({ layout, align: contentAlign }),
          descriptionClassName
        )}
      >
        {description}
      </p>

      {layout === 'feature' && icon && (
        <div
          className={cn(
            'flex-grow flex items-center justify-center my-8',
            iconClassName
          )}
        >
          <div className="w-full h-28 flex items-center justify-center">
            {icon}
          </div>
        </div>
      )}

      {button && <div className="flex justify-center">{button}</div>}
    </motion.div>
  );
}
