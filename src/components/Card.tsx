'use client';

import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const cardVariants = cva(
  'relative p-8 flex flex-col h-full bg-black/40 backdrop-blur-sm group border-r border-white/10',
  {
    variants: {
      border: {
        first: 'border-l',
        none: 'border-r-0',
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
}: CardProps) {
  const borderVariant = isFirst ? 'first' : undefined;

  return (
    <motion.div
      className={cn(cardVariants({ border: borderVariant }), className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
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
