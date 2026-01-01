'use client';

import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface LogoProps {
  src: string;
  alt: string;
  text?: string;
  className?: string;
  textClassName?: string;
  imgClassName?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  position?: 'absolute' | 'relative' | 'static';
  disableAnimation?: boolean;
  animationVariant?: 'fade' | 'slide' | 'scale' | 'none';
  width?: number;
  height?: number;
}

export function Logo({
  src,
  alt,
  text,
  className = '',
  textClassName = '',
  imgClassName = '',
  size = 'md',
  position = 'static',
  disableAnimation = false,
  animationVariant = 'slide',
  width,
  height,
}: LogoProps) {
  const sizeClasses = {
    sm: 'h-12 w-12 sm:h-14 sm:w-14',
    md: 'h-16 w-16 sm:h-20 sm:w-20',
    lg: 'h-20 w-20 sm:h-24 sm:w-24',
    xl: 'h-24 w-24 sm:h-28 sm:w-28',
  };

  const textSizeClasses = {
    sm: 'text-sm sm:text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-xl sm:text-2xl',
    xl: 'text-2xl sm:text-3xl',
  };

  const animations = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    slide: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
    },
    none: {
      initial: {},
      animate: {},
    },
  } as const;

  const containerClasses = cn(
    position,
    position === 'absolute' && 'left-8 top-8 z-50',
    'flex items-center gap-3',
    className
  );

  const content = (
    <>
      <img
        src={src}
        alt={alt}
        {...(width && { width })}
        {...(height && { height })}
        className={cn(
          'object-contain',
          !width && !height && sizeClasses[size],
          imgClassName
        )}
      />
      {text && (
        <span
          className={cn(
            'font-semibold text-white',
            textSizeClasses[size],
            textClassName
          )}
        >
          {text}
        </span>
      )}
    </>
  );

  if (disableAnimation) {
    return <div className={containerClasses}>{content}</div>;
  }

  return (
    <motion.div
      className={containerClasses}
      initial={animations[animationVariant].initial}
      animate={animations[animationVariant].animate}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {content}
    </motion.div>
  );
}
