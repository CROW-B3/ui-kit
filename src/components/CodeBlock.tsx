import { useState } from 'react';
import { LuCopy, LuCheck } from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';

interface CodeBlockProps {
  code: string;
  language?: string;
  showCopy?: boolean;
  className?: string;
  onCopy?: (success: boolean) => void;
}

export function CodeBlock({
  code,
  language = 'typescript',
  showCopy = true,
  className = '',
  onCopy,
}: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      onCopy?.(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      onCopy?.(false);
    }
  };

  return (
    <div className={`relative group ${className}`}>
      {showCopy && (
        <div className="absolute top-2 right-2 z-10">
          <button
            onClick={handleCopy}
            className="p-1 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-white/10"
            aria-label="Copy code"
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
      )}
      <div className="w-full bg-[#050508] border border-white/10 rounded-lg p-3 overflow-x-auto group-hover:border-violet-500/30 transition-colors">
        <pre className="text-xs text-gray-300 font-mono leading-relaxed whitespace-pre">
          {code}
        </pre>
      </div>
    </div>
  );
}
