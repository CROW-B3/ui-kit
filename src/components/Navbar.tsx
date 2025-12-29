'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Logo, type LogoProps } from './Logo';
import { cn } from '../lib/utils';

export interface NavbarProps {
  logo?: {
    text?: string;
    href?: string;
    src?: string;
    alt?: string;
    logoProps?: Partial<LogoProps>;
  };
  rightContent?: React.ReactNode;
  centerContent?: React.ReactNode;
  variant?: 'default' | 'centered';
  animate?: boolean;
  className?: string;
  containerClassName?: string;
  logoContainerClassName?: string;
  rightContentClassName?: string;
  centerContentClassName?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full';
}

const MAX_WIDTH_CLASSES = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
} as const;

function CenteredNavbar({
  logo,
  rightContent,
  centerContent,
  animate,
  className,
  containerClassName,
  logoContainerClassName,
  rightContentClassName,
  centerContentClassName,
  maxWidth,
}: NavbarProps) {
  return (
    <motion.nav
      className={cn(
        'w-full flex items-center px-6 py-6 z-10 relative mx-auto',
        MAX_WIDTH_CLASSES[maxWidth!],
        containerClassName,
        className
      )}
      initial={animate ? { opacity: 0, y: -20 } : {}}
      animate={animate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.div
        initial={animate ? { opacity: 0, x: -20 } : {}}
        animate={animate ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Link
          href={logo?.href || '/'}
          className={cn('flex items-center gap-3', logoContainerClassName)}
        >
          <Logo
            src={logo?.src || '/favicon.webp'}
            alt={logo?.alt || 'Logo'}
            text={logo?.text}
            position="static"
            disableAnimation={!animate}
            {...logo?.logoProps}
          />
        </Link>
      </motion.div>

      {centerContent && (
        <motion.div
          className={cn(
            'absolute left-1/2 -translate-x-1/2 flex items-center gap-12',
            centerContentClassName
          )}
          initial={animate ? { opacity: 0, y: -10 } : {}}
          animate={animate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          {centerContent}
        </motion.div>
      )}

      {rightContent && (
        <motion.div
          className={cn(
            'ml-auto flex items-center gap-4 h-fit',
            rightContentClassName
          )}
          initial={animate ? { opacity: 0, x: 20 } : {}}
          animate={animate ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        >
          {rightContent}
        </motion.div>
      )}
    </motion.nav>
  );
}

function DefaultNavbar({
  logo,
  rightContent,
  animate,
  className,
  containerClassName,
  logoContainerClassName,
  rightContentClassName,
  maxWidth,
}: NavbarProps) {
  return (
    <motion.nav
      className={cn(
        'w-full flex justify-between items-center px-6 py-6 z-10 relative mx-auto',
        MAX_WIDTH_CLASSES[maxWidth!],
        containerClassName,
        className
      )}
      initial={animate ? { opacity: 0, y: -20 } : {}}
      animate={animate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.div
        initial={animate ? { opacity: 0, x: -20 } : {}}
        animate={animate ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Link
          href={logo?.href || '/'}
          className={cn('flex items-center gap-3', logoContainerClassName)}
        >
          <Logo
            src={logo?.src || '/favicon.webp'}
            alt={logo?.alt || 'Logo'}
            text={logo?.text}
            position="static"
            disableAnimation={!animate}
            {...logo?.logoProps}
          />
        </Link>
      </motion.div>

      {rightContent && (
        <motion.div
          className={cn(
            'flex items-center gap-4 text-sm h-fit',
            rightContentClassName
          )}
          initial={animate ? { opacity: 0, x: 20 } : {}}
          animate={animate ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          {rightContent}
        </motion.div>
      )}
    </motion.nav>
  );
}

export function Navbar({ variant = 'default', ...props }: NavbarProps) {
  if (variant === 'centered') {
    return <CenteredNavbar variant={variant} {...props} />;
  }

  return <DefaultNavbar variant={variant} {...props} />;
}

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  className = '',
  variant = 'primary',
}) => {
  const variantClasses = {
    primary: 'text-white hover:text-violet-400',
    secondary: 'text-purple-400 hover:text-purple-200',
    ghost: 'text-gray-400 hover:text-white',
  };

  return (
    <Link
      href={href}
      className={cn(
        'transition-colors font-medium flex items-center',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </Link>
  );
};
