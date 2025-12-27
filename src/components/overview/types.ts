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
