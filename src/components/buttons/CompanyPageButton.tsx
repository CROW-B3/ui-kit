import type { ReactNode } from 'react';
import { LuLink } from 'react-icons/lu';

interface CompanyPageButtonProps {
  platform: string;
  icon?: ReactNode;
  onClick?: () => void;
  connected?: boolean;
}

export function CompanyPageButton({
  platform,
  icon,
  onClick,
  connected = false,
}: CompanyPageButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full border transition-all ${
        connected
          ? 'bg-violet-500/10 border-violet-500/30 text-violet-300'
          : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-300'
      }`}
    >
      <div className="flex items-center gap-2">
        {icon && <span className="text-sm">{icon}</span>}
        <span className="text-sm">{platform}</span>
      </div>
      <LuLink className="text-[14px]" />
    </button>
  );
}
