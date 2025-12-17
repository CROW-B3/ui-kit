'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export interface SubtitleProps {
  children: ReactNode;
}

export function Subtitle({ children }: SubtitleProps) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
      style={{
        fontSize: 'clamp(0.75rem, 1vw, 0.95rem)',
        lineHeight: 1.4,
        color: 'rgba(255, 255, 255, 0.52)',
        textAlign: 'center',
        maxWidth: '50rem',
        margin: '0 auto',
        padding: '0 2rem',
        fontWeight: 400,
        letterSpacing: '0.01em',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
      }}
    >
      {children}
    </motion.p>
  );
}
