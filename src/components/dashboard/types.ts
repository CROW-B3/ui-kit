import type { ReactNode } from 'react';

export type SeverityLevel = 'high' | 'medium' | 'low';
export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface DateRangeOption {
  label: string;
  value: string;
}

export interface MetricItem {
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

export interface HeaderProps {
  orgName?: string;
  dateRange?: string;
  onDateRangeChange?: (value: string) => void;
  dateRangeOptions?: DateRangeOption[];
  userInitials?: string;
  showNotification?: boolean;
  onNotificationClick?: () => void;
  onAvatarClick?: () => void;
  minimal?: boolean;
  onMenuClick?: () => void;
  logoSrc?: string;
}

export interface NavItem {
  icon: string;
  label: string;
  href: string;
  submenu?: NavItem[];
}

export interface SidebarProps {
  navItems?: NavItem[];
  activeHref?: string;
  onNavigate?: (href: string) => void;
  showSettings?: boolean;
  logoSrc?: string;
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
  onNotificationsChange?: (enabled: boolean) => void;
  initialNotifications?: boolean;
  showChatHistory?: boolean;
  chatHistory?: ChatHistoryItem[];
  activeChatId?: string | null;
  chatHistoryExpanded?: boolean;
  onChatClick?: (id: string) => void;
  onChatHistoryToggle?: () => void;
  onChatRename?: (id: string, newTitle: string) => void;
  onChatDelete?: (id: string) => void;
}

export interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  variant?: 'light' | 'heavy';
}

export interface DashboardBackgroundProps {
  variant?: 'default' | 'minimal';
  noiseTextureSrc?: string;
  sidebarWidth?: number;
}

export interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
  userName?: string;
  onLogout?: () => void;
  onNotificationsChange?: (enabled: boolean) => void;
  initialNotifications?: boolean;
}

export interface ChatHistoryItem {
  id: string;
  title: string;
}

export interface ChatHistorySectionProps {
  items?: ChatHistoryItem[];
  activeItemId?: string | null;
  isExpanded?: boolean;
  isVisible?: boolean;
  onItemClick?: (id: string) => void;
  onToggleExpanded?: () => void;
  onRename?: (id: string, newTitle: string) => void;
  onDelete?: (id: string) => void;
  title?: string;
  emptyMessage?: string;
}

export interface MobileSidebarProps extends SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
