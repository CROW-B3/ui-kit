'use client';

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export interface PageHeaderProps {
  label?: string;
  title: string | ReactNode;
  description?: string | ReactNode;
  showDivider?: boolean;
  align?: 'left' | 'center' | 'right';
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  className?: string;
  labelClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  dividerClassName?: string;
}

export function PageHeader({
  label,
  title,
  description,
  showDivider = true,
  align = 'center',
  size = 'md',
  animate = true,
  className = '',
  labelClassName = '',
  titleClassName = '',
  descriptionClassName = '',
  dividerClassName = '',
}: PageHeaderProps) {
  const alignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  };

  const sizeClasses = {
    sm: {
      title: 'text-xl md:text-2xl',
      description: 'text-xs max-w-sm',
      label: 'text-[9px] mb-2',
    },
    md: {
      title: 'text-2xl md:text-3xl',
      description: 'text-xs max-w-xs',
      label: 'text-[10px] mb-3',
    },
    lg: {
      title: 'text-3xl md:text-4xl',
      description: 'text-sm max-w-md',
      label: 'text-[11px] mb-4',
    },
  };

  const Container = animate ? motion.div : 'div';
  const containerProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
      }
    : {};

  return (
    <Container
      className={cn('mb-6 flex flex-col', alignmentClasses[align], className)}
      {...containerProps}
    >
      {label && (
        <motion.span
          className={cn(
            'text-violet-400 font-bold tracking-[0.2em] uppercase',
            sizeClasses[size].label,
            labelClassName
          )}
          initial={animate ? { opacity: 0, y: -10 } : {}}
          animate={animate ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: 0.1,
            ease: [0.4, 0, 0.2, 1] as const,
          }}
        >
          {label}
        </motion.span>
      )}

      <motion.h1
        className={cn(
          'font-semibold text-white mb-2 tracking-tight',
          sizeClasses[size].title,
          titleClassName
        )}
        initial={animate ? { opacity: 0, y: -10 } : {}}
        animate={animate ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: [0.4, 0, 0.2, 1] as const,
        }}
      >
        {title}
      </motion.h1>

      {description && (
        <motion.p
          className={cn(
            'text-gray-500 mx-auto leading-relaxed',
            sizeClasses[size].description,
            align === 'left' && 'mx-0',
            align === 'right' && 'mx-0 ml-auto',
            descriptionClassName
          )}
          initial={animate ? { opacity: 0, y: -10 } : {}}
          animate={animate ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: 0.3,
            ease: [0.4, 0, 0.2, 1] as const,
          }}
        >
          {description}
        </motion.p>
      )}

      {showDivider && (
        <motion.div
          className={cn(
            'w-10 h-0.5 bg-gradient-to-r from-violet-600 to-purple-900 rounded-full mt-4 opacity-80',
            align === 'left' && 'mr-auto',
            align === 'right' && 'ml-auto',
            dividerClassName
          )}
          initial={animate ? { scaleX: 0 } : {}}
          animate={animate ? { scaleX: 1 } : {}}
          transition={{
            duration: 0.5,
            delay: 0.4,
            ease: [0.4, 0, 0.2, 1] as const,
          }}
        />
      )}
    </Container>
  );
}
