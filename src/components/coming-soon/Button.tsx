'use client';

import { LuArrowUpRight } from 'react-icons/lu';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'outline' | 'solid';
  showArrow?: boolean;
  className?: string;
  arrowClassName?: string;
}

export function Button({
  children,
  onClick,
  href,
  variant = 'outline',
  showArrow = true,
  className = '',
  arrowClassName = '',
}: ButtonProps) {
  const baseClasses =
    'px-4 py-2 rounded-full transition-all text-sm font-medium flex items-center gap-2 w-fit';

  const variantClasses =
    variant === 'outline'
      ? 'border border-white/30 text-white/90 hover:text-white hover:border-white/50 group-hover:bg-white/5'
      : 'bg-purple-600 text-white hover:bg-purple-700';

  const buttonContent = (
    <>
      {children}
      {showArrow && <LuArrowUpRight className={`w-4 h-4 ${arrowClassName}`} />}
    </>
  );

  const buttonClasses = `${baseClasses} ${variantClasses} ${className}`;

  if (href) {
    return (
      <a href={href} className={buttonClasses}>
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
