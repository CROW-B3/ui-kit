'use client';

import { useState, KeyboardEvent } from 'react';
import { LuX } from 'react-icons/lu';

interface EmailTagInputProps {
  emails: string[];
  onEmailsChange: (emails: string[]) => void;
  error?: string;
}

export function EmailTagInput({
  emails,
  onEmailsChange,
  error,
}: EmailTagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addEmail();
    } else if (
      e.key === 'Backspace' &&
      inputValue === '' &&
      emails.length > 0
    ) {
      removeEmail(emails.length - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.includes(',') || value.includes(' ')) {
      const emailToAdd = value.replace(/[,\s]/g, '').trim();
      if (emailToAdd && !emails.includes(emailToAdd)) {
        onEmailsChange([...emails, emailToAdd]);
        setInputValue('');
      } else {
        setInputValue('');
      }
    } else {
      setInputValue(value);
    }
  };

  const addEmail = () => {
    const trimmedEmail = inputValue.trim();
    if (trimmedEmail && !emails.includes(trimmedEmail)) {
      onEmailsChange([...emails, trimmedEmail]);
      setInputValue('');
    }
  };

  const removeEmail = (index: number) => {
    onEmailsChange(emails.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-gray-300 ml-1 block">
        Email addresses
      </label>
      <div
        className={`w-full bg-white/5 border ${
          error ? 'border-red-500/50' : 'border-white/10'
        } rounded-2xl px-3 py-2 flex flex-wrap gap-2 focus-within:border-violet-500/50 transition-colors shadow-inner min-h-[52px] items-center`}
      >
        {emails.map((email, index) => (
          <span
            key={index}
            className="bg-violet-500/20 border border-violet-500/20 text-violet-100 text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1"
          >
            {email}
            <button
              type="button"
              onClick={() => removeEmail(index)}
              className="hover:text-white text-violet-300 focus:outline-none flex items-center"
            >
              <LuX className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none focus:ring-0 text-sm p-0 text-gray-300 placeholder:text-gray-600 flex-grow min-w-[120px] h-6"
          placeholder={emails.length === 0 ? 'name@company.com' : ''}
        />
      </div>
      <p className="text-[10px] text-gray-500 ml-1">
        Press Enter, Space, or Comma to add multiple emails.
      </p>
      {error && <p className="text-[10px] text-red-400 ml-1">{error}</p>}
    </div>
  );
}
