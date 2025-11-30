'use client';

import { motion } from 'framer-motion';

export function HeroText() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
      style={{
        fontSize: 'clamp(8rem, 20vw, 20rem)',
        fontWeight: 900,
        lineHeight: 0.9,
        letterSpacing: '-0.02em',
        background:
          'linear-gradient(135deg, #2d1550 0%, #4a2571 30%, #6b4598 60%, #8b7fb8 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center',
        margin: 0,
        padding: 0,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
        filter: 'drop-shadow(0 0 80px rgba(139, 127, 184, 0.3))',
      }}
    >
      CROW
    </motion.h1>
  );
}
