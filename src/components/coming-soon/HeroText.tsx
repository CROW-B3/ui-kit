'use client';

import { motion } from 'framer-motion';

export function HeroText() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
      style={{
        fontSize: 'clamp(9rem, 22vw, 22rem)',
        fontWeight: 650,
        lineHeight: 0.9,
        letterSpacing: '0.01em',
        background:
          'linear-gradient(70deg, #1B0637 0%, #210E3C 10%, #24113F 20%, #2E1A4B 35%, #3A2559 45%, #563F77 65%, #604882 80%, #765F97 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center',
        margin: 0,
        marginTop: '-5vh',
        padding: 0,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
        filter: 'drop-shadow(0 0 80px rgba(87, 84, 96, 0.3))',
      }}
    >
      CROW
    </motion.h1>
  );
}
