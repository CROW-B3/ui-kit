import type { ReactNode } from 'react';

export interface DateRangeOption {
  label: string;
  value: string;
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
  /** Hide the left section (org name and date picker) - useful for minimal headers */
  minimal?: boolean;
  /** Callback when hamburger menu is clicked (mobile only) */
  onMenuClick?: () => void;
  /** Logo image source for mobile header */
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
  onThemeChange?: (theme: 'dark' | 'light') => void;
  onNotificationsChange?: (enabled: boolean) => void;
  initialTheme?: 'dark' | 'light';
  initialNotifications?: boolean;
  /** Chat history items to display (shown only on /ask-crow page) */
  chatHistory?: ChatHistoryItem[];
  /** ID of the currently active chat */
  activeChatId?: string | null;
  /** Whether the chat history list is expanded */
  chatHistoryExpanded?: boolean;
  /** Callback when a chat item is clicked */
  onChatClick?: (id: string) => void;
  /** Callback when chat history expand/collapse is toggled */
  onChatHistoryToggle?: () => void;
  /** Callback when a chat is renamed */
  onChatRename?: (id: string, newTitle: string) => void;
  /** Callback when a chat is deleted */
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
}

export interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
  userName?: string;
  onLogout?: () => void;
  onThemeChange?: (theme: 'dark' | 'light') => void;
  onNotificationsChange?: (enabled: boolean) => void;
  initialTheme?: 'dark' | 'light';
  initialNotifications?: boolean;
}

export interface ChatHistoryItem {
  id: string;
  title: string;
}

export interface ChatHistorySectionProps {
  /** List of chat history items to display */
  items?: ChatHistoryItem[];
  /** ID of the currently active chat item */
  activeItemId?: string | null;
  /** Whether the chat list is expanded */
  isExpanded?: boolean;
  /** Whether the section is visible (for fade in/out animations) */
  isVisible?: boolean;
  /** Callback when a chat item is clicked */
  onItemClick?: (id: string) => void;
  /** Callback when the expand/collapse toggle is clicked */
  onToggleExpanded?: () => void;
  /** Callback when rename is requested */
  onRename?: (id: string, newTitle: string) => void;
  /** Callback when delete is requested */
  onDelete?: (id: string) => void;
  /** Title text for the section header */
  title?: string;
  /** Message to show when there are no chat items */
  emptyMessage?: string;
}

export interface MobileSidebarProps extends SidebarProps {
  /** Whether the mobile sidebar is open */
  isOpen: boolean;
  /** Callback when the mobile sidebar should close */
  onClose: () => void;
}
