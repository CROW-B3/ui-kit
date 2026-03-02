'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createHighlighter } from 'shiki';

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-dark-default'],
      langs: [],
    });
  }
  return highlighterPromise;
}

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
  const [highlightedHtml, setHighlightedHtml] = useState<string>('');

  useEffect(() => {
    let cancelled = false;
    setHighlightedHtml('');
    const highlightCode = async () => {
      try {
        const highlighter = await getHighlighter();
        if (cancelled) return;
        const loadedLangs = highlighter.getLoadedLanguages();
        if (!loadedLangs.includes(language)) {
          await highlighter.loadLanguage(language as never);
        }
        if (cancelled) return;
        const html = highlighter.codeToHtml(code, {
          lang: language,
          theme: 'github-dark-default',
        });
        if (!cancelled) setHighlightedHtml(html);
      } catch (err) {
        console.error('[CodeBlock] Syntax highlighting failed:', err);
        if (!cancelled) setHighlightedHtml('');
      }
    };
    highlightCode();
    return () => {
      cancelled = true;
    };
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      onCopy?.(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
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
                  <Check size={14} className="text-green-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Copy size={14} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      )}
      <div className="w-full bg-[#050508] border border-white/10 rounded-lg overflow-x-auto group-hover:border-violet-500/30 transition-colors [&_pre]:!bg-transparent [&_pre]:p-3 [&_pre]:m-0 [&_code]:text-xs [&_code]:leading-relaxed">
        {highlightedHtml ? (
          <div dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
        ) : (
          <pre className="text-xs text-gray-300 font-mono leading-relaxed whitespace-pre p-3">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
