import { useState, KeyboardEvent } from 'react';
import { LuX } from 'react-icons/lu';

interface TagInputProps {
  label: string;
  placeholder: string;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  helpText?: string;
}

export function TagInput({
  label,
  placeholder,
  tags,
  onTagsChange,
  helpText,
}: TagInputProps) {
  const [input, setInput] = useState('');

  const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim()) {
        onTagsChange([...tags, input.trim()]);
        setInput('');
      }
    }
  };

  const handleRemoveTag = (index: number) => {
    onTagsChange(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-gray-300 ml-1 block">
        {label}
      </label>
      <div className="w-full bg-white/5 border border-white/10 rounded-2xl px-3 py-2 flex flex-wrap gap-2 focus-within:border-violet-500/50 transition-colors shadow-inner min-h-[46px]">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-violet-500/20 border border-violet-500/20 text-violet-100 text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1"
          >
            {tag}
            <button
              onClick={() => handleRemoveTag(index)}
              className="hover:text-white text-violet-300 focus:outline-none"
            >
              <LuX className="text-[12px]" />
            </button>
          </span>
        ))}
        <input
          className="bg-transparent border-none focus:ring-0 text-sm p-0 text-gray-300 placeholder:text-gray-600 flex-grow min-w-[80px] h-6 self-center outline-none"
          placeholder={placeholder}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleAddTag}
        />
      </div>
      {helpText && <p className="text-[10px] text-gray-500 ml-1">{helpText}</p>}
    </div>
  );
}
