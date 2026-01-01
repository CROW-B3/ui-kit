interface SyncStatusCardProps {
  lastSync?: string;
  mentions?: number;
  status?: 'ready' | 'syncing' | 'error';
}

export function SyncStatusCard({
  lastSync = '2 min ago',
  mentions = 1284,
  status = 'ready',
}: SyncStatusCardProps) {
  const statusConfig = {
    ready: {
      label: 'SYNC READY',
      color: 'bg-violet-400',
      borderColor: 'border-violet-500/30',
      bgColor: 'bg-violet-500/5',
      textColor: 'text-violet-300',
    },
    syncing: {
      label: 'SYNCING',
      color: 'bg-blue-400',
      borderColor: 'border-blue-500/30',
      bgColor: 'bg-blue-500/5',
      textColor: 'text-blue-300',
    },
    error: {
      label: 'ERROR',
      color: 'bg-red-400',
      borderColor: 'border-red-500/30',
      bgColor: 'bg-red-500/5',
      textColor: 'text-red-300',
    },
  };

  const currentStatus = statusConfig[status];

  return (
    <div className="mt-auto bg-[#0a0a0f]/60 rounded-xl p-3 border border-white/5 flex flex-col gap-2">
      <div className="flex items-center justify-between text-[11px] text-gray-400">
        <span>
          Last sync: <span className="text-gray-300">{lastSync}</span>
        </span>
        <span>
          Mentions:{' '}
          <span className="text-gray-300">{mentions.toLocaleString()}</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div
          className={`px-2 py-0.5 rounded-full border ${currentStatus.borderColor} text-[10px] font-bold tracking-wider ${currentStatus.textColor} uppercase ${currentStatus.bgColor} flex items-center gap-1.5`}
        >
          <div
            className={`w-1.5 h-1.5 rounded-full ${currentStatus.color} shadow-[0_0_5px_rgba(167,139,250,0.5)]`}
          ></div>
          {currentStatus.label}
        </div>
      </div>
    </div>
  );
}
