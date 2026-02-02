'use client';

import { ArrowRight } from 'lucide-react';

export interface SectionHeaderProps {
  title: string;
  viewAllHref?: string;
  viewAllText?: string;
  onViewAllClick?: () => void;
  LinkComponent?: React.ComponentType<{
    href: string;
    className?: string;
    children: React.ReactNode;
  }>;
}

interface ViewAllLinkProps {
  href?: string;
  text: string;
  onClick?: () => void;
  LinkComponent?: SectionHeaderProps['LinkComponent'];
}

const linkClassName =
  'flex items-center gap-1 hover:opacity-80 transition-opacity';

function ViewAllLinkContent({ text }: { text: string }) {
  return (
    <>
      <span className="text-[10px] sm:text-xs text-violet-400">{text}</span>
      <ArrowRight
        size={12}
        className="text-violet-400 sm:w-3.5 sm:h-3.5"
        strokeWidth={2}
      />
    </>
  );
}

function ViewAllLink({ href, text, onClick, LinkComponent }: ViewAllLinkProps) {
  const content = <ViewAllLinkContent text={text} />;

  if (LinkComponent && href) {
    return (
      <LinkComponent href={href} className={linkClassName}>
        {content}
      </LinkComponent>
    );
  }

  if (href) {
    return (
      <a href={href} className={linkClassName}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={linkClassName}>
      {content}
    </button>
  );
}

export function SectionHeader({
  title,
  viewAllHref,
  viewAllText = 'View all',
  onViewAllClick,
  LinkComponent,
}: SectionHeaderProps) {
  const showViewAll = viewAllHref || onViewAllClick;

  return (
    <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between bg-white/[0.01] border-b border-white/[0.06]">
      <h3 className="text-xs sm:text-sm font-semibold text-white">{title}</h3>

      {showViewAll && (
        <ViewAllLink
          href={viewAllHref}
          text={viewAllText}
          onClick={onViewAllClick}
          LinkComponent={LinkComponent}
        />
      )}
    </div>
  );
}
