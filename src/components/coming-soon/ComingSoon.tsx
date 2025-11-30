'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ComingSoon() {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'COMING SOON';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

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
          animation: 'blink 1s step-end infinite',
        }}
      >
        _
      </span>
    </motion.div>
  );
}
