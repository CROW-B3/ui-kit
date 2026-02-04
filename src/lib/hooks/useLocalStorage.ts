import { useEffect, useState } from 'react';

/**
 * Custom hook for managing state synced with localStorage
 * Handles SSR-safe initialization and automatic persistence
 */
export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  const [isMounted, setIsMounted] = useState(false);
  const [value, setValue] = useState<T>(defaultValue);

  // Initialize from localStorage only on client
  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        setValue(JSON.parse(stored));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }
  }, [key]);

  // Sync to localStorage whenever value changes
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  }, [key, value, isMounted]);

  return [value, setValue];
}
