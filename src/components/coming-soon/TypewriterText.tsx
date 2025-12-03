'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TypewriterTextProps {
  text: string;
}

export function TypewriterText({ text }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const delay = currentIndex === 0 ? 2500 : 150;
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.5 }}
      style={{
        fontSize: 'clamp(1rem, 2vw, 1.5rem)',
        fontWeight: 600,
        letterSpacing: '0.3em',
        color: '#8b7fb8',
        textAlign: 'center',
        fontFamily: '"Courier New", Courier, monospace',
        marginTop: '3rem',
        textTransform: 'uppercase',
      }}
    >
      <span
        style={{
          textShadow:
            '0 0 10px rgba(139, 127, 184, 0.5), 0 0 20px rgba(139, 127, 184, 0.3)',
        }}
      >
        {displayedText}
      </span>
      <span
        style={{
          opacity: showCursor ? 1 : 0,
          color: '#8b7fb8',
          marginLeft: '2px',
        }}
      >
        _
      </span>
    </motion.div>
  );
}
