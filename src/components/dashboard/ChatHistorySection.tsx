'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import type { ChatHistoryItem, ChatHistorySectionProps } from './types';

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
  // Track newly added item for animation
  const [newItemId, setNewItemId] = useState<string | null>(null);
  const [canAnimate, setCanAnimate] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Track all seen item IDs to avoid re-animating
  const seenItemsRef = useRef<Set<string>>(new Set());

  // Enable animations only after initial load settles (prevents animation on refresh)
  useEffect(() => {
    // Mark all current items as seen immediately
    for (const item of items) {
      seenItemsRef.current.add(item.id);
    }
    // Wait before enabling animations for new items
    const timer = setTimeout(() => {
      setCanAnimate(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []); // Only run once on mount

  // Detect truly new items only after animation is enabled
  useEffect(() => {
    if (!canAnimate) {
      // Still track items as seen even before animation is enabled
      for (const item of items) {
        seenItemsRef.current.add(item.id);
      }
      return;
    }

    const seenItems = seenItemsRef.current;
    const firstItem = items[0];

    // Check if the first item is new (not seen before)
    if (firstItem && !seenItems.has(firstItem.id)) {
      setNewItemId(firstItem.id);
      seenItems.add(firstItem.id);
      const timer = setTimeout(() => setNewItemId(null), 350);
      return () => clearTimeout(timer);
    }

    // Add any other new items to seen set (without animating)
    for (const item of items) {
      seenItems.add(item.id);
    }
  }, [items, canAnimate]);

  // Close menu when clicking outside
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

  // Focus input when entering edit mode
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

  if (!isVisible) return null;

  return (
    <div
      className="px-4 mt-4 transition-opacity duration-300 ease-in-out"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {/* Header with collapse toggle */}
      <button
        type="button"
        onClick={onToggleExpanded}
        className="flex items-center justify-between w-full group"
      >
        <span
          className="text-[13px] font-normal"
          style={{ color: '#9CA3AF', lineHeight: '21px' }}
        >
          {title}
        </span>
        <ChevronDown
          size={16}
          className="text-[#4B5563] transition-transform duration-200"
          style={{
            transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
          }}
        />
      </button>

      {/* Chat list with collapse animation */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isExpanded ? `${Math.max(items.length * 42 + 16, 60)}px` : '0px',
          opacity: isExpanded ? 1 : 0,
        }}
      >
        <div className="mt-2 flex flex-col gap-1">
          {items.length === 0 ? (
            <p
              className="text-[12px] italic py-2"
              style={{ color: '#6B7280' }}
            >
              {emptyMessage}
            </p>
          ) : (
            items.map((item) => {
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
                  <button
                    type="button"
                    onClick={() => !isEditing && onItemClick?.(item.id)}
                    className="group relative flex items-center justify-between w-full rounded-lg transition-all duration-200 hover:bg-white/5"
                    style={{
                      height: 37,
                      background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                      boxShadow: isActive
                        ? '0px 1px 0px 1px rgba(255, 255, 255, 0.05) inset'
                        : 'none',
                      outline: isActive ? '1px rgba(255, 255, 255, 0.05) solid' : 'none',
                      outlineOffset: '-1px',
                      animation: isNew ? 'chatHistorySlideIn 0.3s ease-out forwards' : 'none',
                    }}
                  >
                    {isEditing ? (
                      <input
                        ref={inputRef}
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleRenameSubmit}
                        onKeyDown={handleRenameKeyDown}
                        className="text-[13px] font-bold bg-transparent border-none outline-none pl-3 pr-8 w-full"
                        style={{ color: '#E6E6E6', lineHeight: '21px' }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <span
                        className="text-[13px] font-bold truncate pl-3 pr-8 text-left"
                        style={{ color: '#E6E6E6', lineHeight: '21px', maxWidth: 198 }}
                      >
                        {item.title}
                      </span>
                    )}
                    {isActive && !isEditing && (
                      <div
                        className="absolute right-2 flex items-center justify-center w-[19px] h-[19px] cursor-pointer hover:bg-white/10 rounded"
                        onClick={(e) => handleMenuClick(e, item.id)}
                      >
                        <MoreHorizontal size={14} className="text-white" />
                      </div>
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {isMenuOpen && (
                    <div
                      className="absolute right-0 top-full mt-1 z-50 min-w-[140px] rounded-lg overflow-hidden"
                      style={{
                        background: 'rgba(30, 30, 30, 0.95)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => handleRenameStart(item)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-white/10 transition-colors"
                      >
                        <Pencil size={14} className="text-gray-400" />
                        <span className="text-[13px] text-gray-200">Rename</span>
                      </button>
                      <button
                        type="button"
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

      <style>{`
        @keyframes chatHistorySlideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
