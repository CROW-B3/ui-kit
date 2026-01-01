import type { ReactNode } from 'react';

interface PermissionToggleProps {
  icon: ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  expandable?: boolean;
  expanded?: boolean;
  children?: ReactNode;
  highlighted?: boolean;
}

export function PermissionToggle({
  icon,
  title,
  description,
  enabled,
  onToggle,
  expandable = false,
  expanded = false,
  children,
  highlighted = false,
}: PermissionToggleProps) {
  const borderClass = highlighted
    ? 'border-violet-500/30'
    : 'border-white/5 hover:border-white/10';

  return (
    <div
      className={`bg-white/[0.02] border ${borderClass} rounded-xl overflow-hidden transition-all duration-200`}
    >
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full ${
              highlighted ? 'bg-violet-500/10' : 'bg-white/5'
            } flex items-center justify-center ${
              highlighted ? 'text-violet-400' : 'text-gray-400'
            }`}
          >
            {icon}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-200">{title}</div>
            <div className="text-[10px] text-gray-500">{description}</div>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={enabled}
            onChange={e => onToggle(e.target.checked)}
            className="sr-only peer"
            aria-label={`Toggle ${title}`}
          />
          <div
            className={[
              'w-9 h-5 bg-gray-700 rounded-full',
              'peer peer-checked:bg-violet-600',
              'peer-focus-visible:outline-none peer-focus-visible:ring-2',
              'peer-focus-visible:ring-violet-500 peer-focus-visible:ring-offset-2',
              'peer-focus-visible:ring-offset-black',
              "after:content-[''] after:absolute after:top-[2px] after:left-[2px]",
              'after:bg-white after:border-gray-300 after:border',
              'after:rounded-full after:h-4 after:w-4 after:transition-all',
              'peer-checked:after:translate-x-full peer-checked:after:border-white',
            ].join(' ')}
          ></div>
        </label>
      </div>
      {expandable && expanded && enabled && (
        <div className="px-3 pb-3 pt-0 border-t border-white/5 bg-white/[0.01]">
          {children}
        </div>
      )}
    </div>
  );
}
