'use client';

import { Check, Copy } from 'lucide-react';
import Image from 'next/image';

export interface MessageBubbleProps {
  content: string;
  role: 'user' | 'assistant';
  isCopied?: boolean;
  onCopy?: (content: string) => void;
  headerComponent?: React.ReactNode;
  avatarSrc?: string;
  avatarAlt?: string;
  assistantLabel?: string;
  className?: string;
}

function CopyButton({
  isCopied,
  onClick,
}: {
  isCopied: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute -bottom-3 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-black/70 border border-white/10"
      style={{ background: 'rgba(0, 0, 0, 0.5)' }}
      aria-label="Copy message"
    >
      {isCopied ? (
        <Check size={12} className="text-green-400" />
      ) : (
        <Copy size={12} className="text-gray-400" />
      )}
    </button>
  );
}

function AssistantHeader({
  avatarSrc,
  avatarAlt,
  label,
}: {
  avatarSrc?: string;
  avatarAlt?: string;
  label?: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-3">
      {avatarSrc && (
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center ring-1 ring-purple-500/30"
          style={{ background: 'rgba(0, 0, 0, 0.6)' }}
        >
          <Image
            src={avatarSrc}
            alt={avatarAlt || 'Assistant'}
            width={16}
            height={16}
            className="rounded-full"
          />
        </div>
      )}
      {label && (
        <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider">
          {label}
        </span>
      )}
    </div>
  );
}

export function MessageBubble({
  content,
  role,
  isCopied = false,
  onCopy,
  headerComponent,
  avatarSrc,
  avatarAlt,
  assistantLabel,
  className,
}: MessageBubbleProps) {
  const isUserMessage = role === 'user';
  const bubbleStyles = isUserMessage
    ? 'bg-gradient-to-br from-purple-600/30 to-purple-800/30 border border-purple-500/20'
    : 'bg-white/[0.05] border border-white/10';

  return (
    <div
      className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'} animate-fadeIn ${className || ''}`}
    >
      <div
        className={`group relative max-w-[85%] rounded-2xl px-4 py-3 ${bubbleStyles}`}
      >
        {!isUserMessage &&
          (headerComponent || (
            <AssistantHeader
              avatarSrc={avatarSrc}
              avatarAlt={avatarAlt}
              label={assistantLabel}
            />
          ))}

        <p className="text-[14px] text-gray-200 leading-[1.8] whitespace-pre-wrap">
          {content}
        </p>

        {onCopy && (
          <CopyButton isCopied={isCopied} onClick={() => onCopy(content)} />
        )}
      </div>
    </div>
  );
}
