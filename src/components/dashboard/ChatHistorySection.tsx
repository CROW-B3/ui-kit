'use client';

import type { ChatHistoryItem, ChatHistorySectionProps } from './types';
import { ChevronDown, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

export type { ChatHistoryItem, ChatHistorySectionProps };

export function ChatHistorySection({
  items = [],
  activeItemId,
  isExpanded = true,
  isVisible = true,
  onItemClick,
  onToggleExpanded,
  onRename,
  onDelete,
  title = 'Chat History',
  emptyMessage = 'No chats yet. Start a conversation!',
}: ChatHistorySectionProps) {
  const [newItemId, setNewItemId] = useState<string | null>(null);
  const [canAnimate, setCanAnimate] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const seenItemsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    for (const item of items) {
      seenItemsRef.current.add(item.id);
    }
    const timer = setTimeout(() => {
      setCanAnimate(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!canAnimate) {
      for (const item of items) {
        seenItemsRef.current.add(item.id);
      }
      return;
    }

    const seenItems = seenItemsRef.current;
    const firstItem = items[0];

    if (firstItem && !seenItems.has(firstItem.id)) {
      seenItems.add(firstItem.id);
      const timer = setTimeout(() => setNewItemId(firstItem.id), 0);
      const resetTimer = setTimeout(() => setNewItemId(null), 350);
      return () => {
        clearTimeout(timer);
        clearTimeout(resetTimer);
      };
    }

    for (const item of items) {
      seenItems.add(item.id);
    }
  }, [items, canAnimate]);

  useEffect(() => {
    if (!openMenuId) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuId]);

  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingId]);

  const handleMenuClick = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === itemId ? null : itemId);
  };

  const handleMenuKeyDown = (e: React.KeyboardEvent, itemId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      setOpenMenuId(openMenuId === itemId ? null : itemId);
    }
  };

  const handleRenameStart = (item: ChatHistoryItem) => {
    setEditingId(item.id);
    setEditValue(item.title);
    setOpenMenuId(null);
  };

  const handleRenameSubmit = () => {
    if (editingId && editValue.trim()) {
      onRename?.(editingId, editValue.trim());
    }
    setEditingId(null);
    setEditValue('');
  };

  const handleRenameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRenameSubmit();
    } else if (e.key === 'Escape') {
      setEditingId(null);
      setEditValue('');
    }
  };

  const handleDelete = (id: string) => {
    setOpenMenuId(null);
    onDelete?.(id);
  };

  return (
    <div
      className={cn(
        'px-4 mt-4 transition-all duration-300 ease-in-out overflow-hidden',
        isVisible ? 'opacity-100 animate-fadeInDown max-h-[500px]' : 'opacity-0 max-h-0 pointer-events-none'
      )}
    >
      <button
        type="button"
        onClick={onToggleExpanded}
        className="flex items-center justify-between w-full group"
        aria-label={`${title} section`}
        aria-expanded={isExpanded}
      >
        <span className="text-[13px] font-normal text-gray-400 leading-[21px]">
          {title}
        </span>
        <ChevronDown
          size={16}
          className={cn(
            'text-gray-600 transition-transform duration-200',
            !isExpanded && '-rotate-90'
          )}
        />
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isExpanded
            ? `${Math.max(items.length * 42 + 16, 60)}px`
            : '0px',
          opacity: isExpanded ? 1 : 0,
        }}
      >
        <div className="mt-2 flex flex-col gap-1">
          {items.length === 0 ? (
            <p className="text-xs italic py-2 text-gray-500">{emptyMessage}</p>
          ) : (
            items.map(item => {
              const isActive = item.id === activeItemId;
              const isNew = item.id === newItemId;
              const isEditing = editingId === item.id;
              const isMenuOpen = openMenuId === item.id;

              return (
                <div
                  key={item.id}
                  className="relative"
                  ref={isMenuOpen ? menuRef : undefined}
                >
                  <div
                    role="button"
                    tabIndex={isEditing ? -1 : 0}
                    onClick={() => !isEditing && onItemClick?.(item.id)}
                    onKeyDown={(e) => {
                      if (!isEditing && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        onItemClick?.(item.id);
                      }
                    }}
                    className={cn(
                      'group relative flex items-center justify-between w-full rounded-lg transition-all duration-200',
                      'h-[37px] hover:bg-white/5 cursor-pointer',
                      isActive &&
                        'bg-white/[0.08] shadow-[inset_0px_1px_0px_1px_rgba(255,255,255,0.05)] outline outline-1 outline-white/[0.05] -outline-offset-1',
                      isNew &&
                        'animate-[chatHistorySlideIn_0.3s_ease-out_forwards]'
                    )}
                  >
                    {isEditing ? (
                      <input
                        ref={inputRef}
                        type="text"
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        onBlur={handleRenameSubmit}
                        onKeyDown={handleRenameKeyDown}
                        className="text-[13px] font-bold bg-transparent border-none outline-none pl-3 pr-8 w-full text-gray-200 leading-[21px]"
                        onClick={e => e.stopPropagation()}
                      />
                    ) : (
                      <span className="text-[13px] font-bold truncate pl-3 pr-8 text-left text-gray-200 leading-[21px] max-w-[198px]">
                        {item.title}
                      </span>
                    )}
                    {isActive && !isEditing && (
                      <button
                        type="button"
                        className="absolute right-2 flex items-center justify-center w-[19px] h-[19px] cursor-pointer hover:bg-white/10 rounded"
                        onClick={e => handleMenuClick(e, item.id)}
                        onKeyDown={e => handleMenuKeyDown(e, item.id)}
                        aria-label="Chat options"
                        aria-haspopup="menu"
                        aria-expanded={isMenuOpen}
                      >
                        <MoreHorizontal size={14} className="text-white" />
                      </button>
                    )}
                  </div>

                  {isMenuOpen && (
                    <div
                      role="menu"
                      className="absolute right-0 top-full mt-1 z-50 min-w-[140px] rounded-lg overflow-hidden bg-[rgba(30,30,30,0.95)] border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                    >
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => handleRenameStart(item)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-white/10 transition-colors"
                      >
                        <Pencil size={14} className="text-gray-400" />
                        <span className="text-[13px] text-gray-200">
                          Rename
                        </span>
                      </button>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => handleDelete(item.id)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-red-500/20 transition-colors"
                      >
                        <Trash2 size={14} className="text-red-400" />
                        <span className="text-[13px] text-red-400">Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
