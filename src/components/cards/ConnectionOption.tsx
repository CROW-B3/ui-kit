import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { LuChevronRight } from 'react-icons/lu';

export type ConnectionOptionStatus =
  | 'not_started'
  | 'in_progress'
  | 'connected';

interface ConnectionOptionProps {
  icon: ReactNode;
  title: string;
  description: string;
  status: ConnectionOptionStatus;
  onClick?: () => void;
  animationDelay?: number;
}

const statusConfig: Record<
  ConnectionOptionStatus,
  { label: string; className: string }
> = {
  not_started: {
    label: 'Not Started',
    className: 'text-gray-600 border-white/5 bg-black/20 rounded-lg',
  },
  in_progress: {
    label: 'In Progress',
    className: 'text-yellow-400 border-yellow-500/20 bg-yellow-500/10',
  },
  connected: {
    label: 'Connected',
    className: 'text-green-400 border-green-500/20 bg-green-500/10',
  },
};

export function ConnectionOption({
  icon,
  title,
  description,
  status,
  onClick,
  animationDelay = 0,
}: ConnectionOptionProps) {
  const statusInfo = statusConfig[status];

  return (
    <motion.button
      type="button"
      className="w-full flex items-center justify-between p-4 sm:p-5 border-b border-white/5 last:border-b-0 hover:bg-white/[0.03] transition-all group text-left cursor-pointer"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: animationDelay }}
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-white/5 flex flex-shrink-0 items-center justify-center text-violet-400 group-hover:text-violet-300 group-hover:bg-violet-500/10 transition-colors border border-white/5">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium text-white group-hover:text-violet-200 transition-colors">
            {title}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 pl-2">
        <span
          className={`hidden sm:inline-block text-[10px] font-bold tracking-widest uppercase border px-2 py-1 rounded ${statusInfo.className}`}
        >
          {statusInfo.label}
        </span>
        <LuChevronRight className="text-gray-600 group-hover:text-white transition-colors text-[20px]" />
      </div>
    </motion.button>
  );
}
