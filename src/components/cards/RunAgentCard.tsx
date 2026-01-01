import { LuCopy } from 'react-icons/lu';

interface RunAgentCardProps {
  command: string;
  description?: string;
  title?: string;
  onCopy?: (success: boolean) => void;
}

export function RunAgentCard({
  command,
  description = 'Run this command on your local CCTV server to initiate the secure handshake.',
  title = 'Run agent',
  onCopy,
}: RunAgentCardProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      onCopy?.(true);
    } catch (err) {
      onCopy?.(false);
    }
  };

  return (
    <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col gap-3 h-full">
      <h3 className="text-xs font-semibold text-violet-200/70 tracking-tight uppercase">
        {title}
      </h3>
      <div className="flex-grow flex flex-col justify-start">
        <div className="w-full bg-[#050508] border border-white/10 rounded-lg p-3 flex items-center justify-between group-hover:border-violet-500/30 transition-colors overflow-hidden">
          <code className="text-xs text-gray-300 font-mono whitespace-nowrap overflow-x-auto pb-1 -mb-1 scrollbar-hide mr-2">
            {command}
          </code>
          <div className="bg-[#050508] pl-2 sticky right-0">
            <button
              type="button"
              onClick={handleCopy}
              className="text-gray-500 hover:text-white transition-colors"
              aria-label="Copy command to clipboard"
            >
              <LuCopy className="text-[14px]" />
            </button>
          </div>
        </div>
        <p className="text-[10px] text-gray-600 mt-2 leading-tight">
          {description}
        </p>
      </div>
    </div>
  );
}
