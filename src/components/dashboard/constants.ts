/**
 * Centralized configuration constants for dashboard components
 * Used across ui-kit and dashboard-client to maintain consistency
 */

import type { FilterOption } from './FilterDropdown';
import type { SeverityLevel, ConfidenceLevel, MetricItem } from './types';

// ===== SEVERITY CONFIGURATION =====
export const SEVERITY_CONFIG: Record<
  SeverityLevel,
  { label: string; color: string; bg: string; border: string }
> = {
  high: {
    label: 'HIGH',
    color: '#F87171',
    bg: 'rgba(239, 68, 68, 0.10)',
    border: 'rgba(239, 68, 68, 0.20)',
  },
  medium: {
    label: 'MEDIUM',
    color: '#FACC15',
    bg: 'rgba(234, 179, 8, 0.10)',
    border: 'rgba(234, 179, 8, 0.20)',
  },
  low: {
    label: 'LOW',
    color: '#60A5FA',
    bg: 'rgba(59, 130, 246, 0.10)',
    border: 'rgba(59, 130, 246, 0.20)',
  },
};

// ===== CONFIDENCE CONFIGURATION (Pattern/Default) =====
export const CONFIDENCE_CONFIG: Record<
  ConfidenceLevel,
  { label: string; color: string; bg: string; border: string }
> = {
  high: {
    label: 'High',
    color: '#4ADE80',
    bg: 'rgba(74, 222, 128, 0.10)',
    border: 'rgba(74, 222, 128, 0.20)',
  },
  medium: {
    label: 'Medium',
    color: '#FACC15',
    bg: 'rgba(234, 179, 8, 0.10)',
    border: 'rgba(234, 179, 8, 0.20)',
  },
  low: {
    label: 'Low',
    color: '#9CA3AF',
    bg: 'rgba(156, 163, 175, 0.10)',
    border: 'rgba(156, 163, 175, 0.20)',
  },
};

// ===== FILTER OPTIONS =====
export const DEFAULT_DATE_RANGE_OPTIONS: FilterOption[] = [
  { label: 'Date range', value: 'all' },
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 days', value: 'last_7_days' },
  { label: 'Last 30 days', value: 'last_30_days' },
];

export const DEFAULT_SEVERITY_OPTIONS: FilterOption[] = [
  { label: 'Severity: All', value: 'all' },
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' },
];

export const DEFAULT_SOURCE_OPTIONS: FilterOption[] = [
  { label: 'Source: All', value: 'all' },
  { label: 'Web', value: 'web' },
  { label: 'CCTV', value: 'cctv' },
  { label: 'Social', value: 'social' },
];

export const DEFAULT_STORE_OPTIONS: FilterOption[] = [
  { label: 'Store: All', value: 'all' },
  { label: 'NY-04', value: 'ny-04' },
  { label: 'LA-01', value: 'la-01' },
  { label: 'CH-02', value: 'ch-02' },
  { label: 'Global Web', value: 'global-web' },
];

export const DEFAULT_TIME_OPTIONS: FilterOption[] = [
  { label: 'Time: 7d', value: '7d' },
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 24h', value: '24h' },
  { label: 'Last 30d', value: '30d' },
];

export const DEFAULT_SORT_OPTIONS: FilterOption[] = [
  { label: 'Sort: Most recent', value: 'recent' },
  { label: 'Severity (High to Low)', value: 'severity-desc' },
  { label: 'Severity (Low to High)', value: 'severity-asc' },
  { label: 'Confidence', value: 'confidence' },
];

export const DEFAULT_SITE_OPTIONS: FilterOption[] = [
  { label: 'Site: Global', value: 'global' },
  { label: 'Store NY-04', value: 'ny-04' },
  { label: 'Store LA-02', value: 'la-02' },
  { label: 'Store LDN-02', value: 'ldn-02' },
];

export const DEFAULT_ROLE_OPTIONS: FilterOption[] = [
  { label: 'Role: All', value: 'all' },
  { label: 'Admin', value: 'admin' },
  { label: 'Manager', value: 'manager' },
  { label: 'Viewer', value: 'viewer' },
];

export const DEFAULT_STATUS_OPTIONS: FilterOption[] = [
  { label: 'Status: All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
];
