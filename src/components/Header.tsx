'use client';

import { cn } from '../lib/utils';

export interface HeaderProps {
  orgName?: string;
  dateRange?: string;
  onDateRangeClick?: () => void;
  userInitials?: string;
  showNotification?: boolean;
  onNotificationClick?: () => void;
}

export function Header({
  orgName = 'Global Retail Ops',
  dateRange = 'Last 7 days',
  onDateRangeClick,
  userInitials = 'SJ',
  showNotification = true,
  onNotificationClick,
}: HeaderProps) {
  return (
    <header className="h-16 flex items-center justify-between px-8 bg-transparent shrink-0 z-20">
      {/* Left side: Org name and date range */}
      <div className="flex items-center gap-6">
        <span className="text-sm font-medium text-white tracking-wide">{orgName}</span>
        <div className="h-4 w-px bg-white/10"></div>
        <button
          onClick={onDateRangeClick}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px] text-gray-400">
            calendar_today
          </span>
          <span className="text-xs font-medium text-gray-300">{dateRange}</span>
          <span className="material-symbols-outlined text-[16px] text-gray-500">
            expand_more
          </span>
        </button>
      </div>

      {/* Right side: Notification and avatar */}
      <div className="flex items-center gap-4">
        <button
          onClick={onNotificationClick}
          className="text-gray-500 hover:text-white transition-colors relative"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          {showNotification && (
            <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-violet-500 rounded-full border border-[#030005]"></span>
          )}
        </button>
        <div className="w-8 h-8 rounded-full bg-violet-900/40 flex items-center justify-center text-xs font-semibold text-white border border-white/10 ring-2 ring-black">
          {userInitials}
        </div>
      </div>
    </header>
  );
}
