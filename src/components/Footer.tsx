import React from 'react';
import { cn } from '../lib/utils';

export interface FooterLink {
  text: string;
  href: string;
  className?: string;
  target?: string;
  rel?: string;
}

export interface FooterProps {
  // Container customization
  className?: string;
  containerClassName?: string;

  // Invite section
  showInviteSection?: boolean;
  inviteContent?: React.ReactNode;
  invitePrefix?: string;
  inviteText?: string;
  inviteHref?: string;
  inviteLinkClassName?: string;
  inviteSpanClassName?: string;
  inviteSectionClassName?: string;
  onInviteClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;

  // Terms section
  showTermsSection?: boolean;
  termsContent?: React.ReactNode;
  termsPrefix?: string;
  termsLinks?: FooterLink[];
  termsSectionClassName?: string;
  termsTextClassName?: string;
  termsLinkClassName?: string;
  termsSeparator?: string;

  // Additional custom sections
  beforeContent?: React.ReactNode;
  afterContent?: React.ReactNode;
  children?: React.ReactNode;

  // Layout
  layout?: 'vertical' | 'horizontal';
  gap?: string;
  align?: 'left' | 'center' | 'right';
}

export function Footer({
  // Container
  className = '',
  containerClassName = '',

  // Invite section
  showInviteSection = true,
  inviteContent,
  invitePrefix = 'Have an invite?',
  inviteText = 'Accept invitation',
  inviteHref = '#',
  inviteLinkClassName = '',
  inviteSpanClassName = '',
  inviteSectionClassName = '',
  onInviteClick,

  // Terms section
  showTermsSection = true,
  termsContent,
  termsPrefix = 'By creating an account, you agree to',
  termsLinks = [
    { text: 'Terms', href: '#' },
    { text: 'Privacy Policy', href: '#' },
  ],
  termsSectionClassName = '',
  termsTextClassName = '',
  termsLinkClassName = '',
  termsSeparator = 'and',

  // Additional content
  beforeContent,
  afterContent,
  children,

  // Layout
  layout = 'vertical',
  gap = 'gap-2',
  align = 'center',
}: FooterProps) {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  const layoutClasses = {
    vertical: 'flex-col',
    horizontal: 'flex-row flex-wrap justify-center',
  };

  const renderInviteSection = () => {
    if (!showInviteSection) return null;

    if (inviteContent) {
      return <div className={inviteSectionClassName}>{inviteContent}</div>;
    }

    return (
      <a
        href={inviteHref}
        onClick={onInviteClick}
        className={cn(
          'text-xs text-gray-400 hover:text-white transition-colors',
          layout === 'vertical' && 'mb-2',
          inviteLinkClassName
        )}
      >
        {invitePrefix}{' '}
        <span
          className={cn(
            'text-violet-400 hover:text-violet-300',
            inviteSpanClassName
          )}
        >
          {inviteText}
        </span>
      </a>
    );
  };

  const renderTermsSection = () => {
    if (!showTermsSection) return null;

    if (termsContent) {
      return <div className={termsSectionClassName}>{termsContent}</div>;
    }

    return (
      <p
        className={cn(
          'text-[10px] text-gray-600 max-w-sm leading-relaxed',
          layout === 'horizontal' && 'mx-0',
          layout === 'vertical' && 'mx-auto',
          termsTextClassName
        )}
      >
        {termsPrefix}{' '}
        {termsLinks.map((link, index) => (
          <React.Fragment key={index}>
            <a
              className={cn(
                'hover:text-gray-400 underline decoration-gray-800 underline-offset-2 transition-colors',
                termsLinkClassName,
                link.className
              )}
              href={link.href}
              target={link.target}
              rel={link.rel}
            >
              {link.text}
            </a>
            {index < termsLinks.length - 1 && (
              <span>
                {index === termsLinks.length - 2 ? ` ${termsSeparator} ` : ', '}
              </span>
            )}
          </React.Fragment>
        ))}
        .
      </p>
    );
  };

  return (
    <footer
      className={cn(
        'w-full py-8 z-10 relative',
        alignmentClasses[align],
        className
      )}
    >
      <div
        className={cn('flex', layoutClasses[layout], gap, containerClassName)}
      >
        {beforeContent}
        {renderInviteSection()}
        {renderTermsSection()}
        {children}
        {afterContent}
      </div>
    </footer>
  );
}
