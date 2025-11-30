'use client';

import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Base gradient background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 40%, #2d1b4e 100%)',
          }}
        />

        {/* Animated gradient overlay */}
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 70% 50%, rgba(107, 69, 152, 0.3) 0%, transparent 50%)',
          }}
        />
      </div>
    </>
  );
}
