'use client';

import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -10,
        overflow: 'hidden',
      }}
    >
      {/* Base black background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#000000',
        }}
      />

      {/* Main large elliptical gradient - centered beyond right edge */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(ellipse 70% 60% at 120% 50%, #9b7cb8 0%, #8b6ba8 8%, #7a5a98 18%, #6a4a88 28%, #5a3a78 38%, #4a2a68 48%, #3a1a58 58%, #2a0a48 68%, #1a0538 78%, #120430 82%, #0d0320 86%, #080218 90%, #040110 94%, #000000 98%)',
        }}
      />

      {/* Animated breathing overlay */}
      <motion.div
        animate={{
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(ellipse 60% 55% at 118% 50%, rgba(155, 124, 184, 0.3) 0%, rgba(107, 69, 152, 0.2) 30%, transparent 70%)',
        }}
      />
    </div>
  );
}
