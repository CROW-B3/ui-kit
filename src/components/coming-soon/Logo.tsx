'use client';

import { motion } from 'framer-motion';

export function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed left-8 top-8 z-50"
    >
      <img
        src="/favicon.webp"
        alt="CROW Logo"
        width={80}
        height={80}
        className="h-16 w-16 object-contain sm:h-20 sm:w-20"
      />
    </motion.div>
  );
}
