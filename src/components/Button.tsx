'use client';

import { LuArrowUpRight } from 'react-icons/lu';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const buttonVariants = cva(
  'px-4 py-2 rounded-full transition-all text-sm font-medium flex items-center justify-center gap-2 w-fit',
  {
    variants: {
      variant: {
        outline:
          'border border-white/30 text-white/90 hover:text-white hover:border-white/50 group-hover:bg-white/5',
        solid: 'bg-purple-600 text-white hover:bg-purple-700',
      },
    },
    defaultVariants: {
      variant: 'outline',
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
  showArrow = true,
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

  const buttonClasses = cn(buttonVariants({ variant }), className);

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
