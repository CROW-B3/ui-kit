import type { LucideIcon } from 'lucide-react';
import {
  AlertCircle,
  Bell,
  CheckCircle,
  Clock,
  Globe,
  Home,
  LayoutGrid,
  LogOut,
  MessageSquare,
  Package,
  Search,
  Settings,
  TrendingUp,
  User,
  Users,
  Zap,
} from 'lucide-react';

export const ICON_REGISTRY: Record<string, LucideIcon> = {
  grid_view: LayoutGrid,
  chat_bubble: MessageSquare,
  timeline: TrendingUp,
  group: Users,
  package: Package,
  settings: Settings,
  bell: Bell,
  notifications: Bell,
  search: Search,
  home: Home,
  logout: LogOut,
  user: User,
  globe: Globe,
  zap: Zap,
  alert: AlertCircle,
  check: CheckCircle,
  clock: Clock,
};

export const getIcon = (iconName: string): LucideIcon | undefined => {
  return ICON_REGISTRY[iconName];
};
