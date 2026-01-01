'use client';

import { LuArrowUpRight } from 'react-icons/lu';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'rounded-full transition-all font-medium flex items-center justify-center gap-2 whitespace-nowrap',
  {
    variants: {
      variant: {
        primary:
          'bg-primary hover:bg-primary_hover text-white shadow-glow hover:shadow-glow-hover',
        solid: 'bg-purple-600 text-white hover:bg-purple-700',
        outline:
          'border border-white/30 text-white/90 hover:text-white hover:border-white/50 hover:bg-white/5',
        ghost:
          'bg-transparent border border-white/10 hover:border-white/20 text-gray-400 hover:text-white',
      },
      size: {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2.5 text-sm',
        lg: 'px-6 py-3 text-base',
        xl: 'px-10 py-2.5 text-sm',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-fit',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'md',
      fullWidth: false,
    },
  }
);

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  showArrow?: boolean;
  className?: string;
  arrowClassName?: string;
  arrowIcon?: React.ReactNode;
}

export function Button({
  children,
  onClick,
  href,
  variant = 'outline',
  size = 'md',
  showArrow = false,
  className = '',
  arrowClassName = '',
  arrowIcon,
}: ButtonProps) {
  const buttonContent = (
    <>
      {children}
      {showArrow &&
        (arrowIcon ? (
          <span
            className={cn(
              'inline-flex items-center justify-center w-4 h-4',
              arrowClassName
            )}
          >
            {arrowIcon}
          </span>
        ) : (
          <LuArrowUpRight className={cn('w-4 h-4', arrowClassName)} />
        ))}
    </>
  );

  const buttonClasses = cn(buttonVariants({ variant, size }), className);

  if (href) {
    const isExternal = href.startsWith('http');
    return (
      <a
        href={href}
        className={buttonClasses}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {buttonContent}
    </button>
  );
}
