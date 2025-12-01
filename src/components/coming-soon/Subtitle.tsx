'use client';

import { motion } from 'framer-motion';

export function Subtitle() {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        bottom: '2vh',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 'clamp(0.75rem, 1vw, 0.95rem)',
        lineHeight: 1.6,
        color: 'rgba(255, 255, 255, 0.52)',
        textAlign: 'center',
        maxWidth: '50rem',
        padding: '0 2rem',
        fontWeight: 400,
        letterSpacing: '0.01em',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
        zIndex: 10,
      }}
    >
      We are thrilled to unveil CROW, our most advanced product yet,
      <br />
      blending superior reasoning with extensive pretraining knowledge.
    </motion.p>
  );
}
