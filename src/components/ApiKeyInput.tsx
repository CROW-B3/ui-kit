import { useState } from 'react';
import { LuEye, LuEyeOff, LuCopy, LuCheck } from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';

interface ApiKeyInputProps {
  apiKey: string;
  label?: string;
  onCopy?: (success: boolean) => void;
}

export function ApiKeyInput({
  apiKey,
  label = 'API Key',
  onCopy,
}: ApiKeyInputProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setIsCopied(true);
      onCopy?.(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      onCopy?.(false);
    }
  };

  const displayValue = isRevealed ? apiKey : '••••••••••••••••••';

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-gray-200 block px-1">
        {label}
      </label>
      <div className="relative">
        <input
          className="w-full bg-white/[0.02] border border-white/10 text-gray-200 px-3 py-2 pr-20 rounded-full text-sm focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all font-mono tracking-widest cursor-default"
          readOnly
          type="text"
          value={displayValue}
          aria-label={label}
        />
        <div className="absolute inset-y-0 right-2 flex items-center gap-0.5">
          <button
            onClick={() => setIsRevealed(!isRevealed)}
            aria-label={isRevealed ? 'Hide' : 'Reveal'}
            className="p-1.5 text-gray-500 hover:text-white transition-colors rounded-full hover:bg-white/10"
          >
            {isRevealed ? (
              <LuEyeOff className="text-[16px]" />
            ) : (
              <LuEye className="text-[16px]" />
            )}
          </button>
          <button
            onClick={handleCopy}
            aria-label="Copy"
            className="p-1.5 text-gray-500 hover:text-white transition-colors rounded-full hover:bg-white/10"
          >
            <AnimatePresence mode="wait">
              {isCopied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <LuCheck className="text-[14px] text-green-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <LuCopy className="text-[14px]" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </div>
  );
}
