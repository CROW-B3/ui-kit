interface ConnectionStatusProps {
  heartbeat?: string;
  streams?: string;
  isConnected?: boolean;
}

export function ConnectionStatus({
  heartbeat,
  streams,
  isConnected = false,
}: ConnectionStatusProps) {
  return (
    <div className="flex items-center gap-5">
      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
          Heartbeat:
        </span>
        <span className="text-xs text-gray-400 font-mono">
          {heartbeat || (isConnected ? 'Active' : '—')}
        </span>
      </div>
      <div className="h-3 w-px bg-white/10"></div>
      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
          Streams:
        </span>
        <span className="text-xs text-gray-400 font-mono">
          {streams || (isConnected ? '2' : '—')}
        </span>
      </div>
    </div>
  );
}
